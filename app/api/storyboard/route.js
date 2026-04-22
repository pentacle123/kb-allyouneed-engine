import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const SYSTEM_PROMPT = `KB국민카드 숏폼 스토리보드 전문가. 아이디어를 YT Shorts + IG Reels 각색 + 팩트시트 + 광고 타겟팅 JSON으로 생성.

규칙: 과장·차별 금지, USP 범위만, 금융민감영역 회피. 씬 4개, 해시태그 3개.

JSON만:
{"youtube_shorts":{"title":"","hook":"","scenes":[{"seq":1,"time":"0-3s","visual":"","copy":""}],"proof":"","cta":"","hashtags":["#..."],"bestTimeToPost":"","targetDemo":""},"instagram_reels":{"title":"","hook":"","scenes":[{"seq":1,"time":"","visual":"","copy":""}],"proof":"","cta":"","hashtags":["#..."],"bestTimeToPost":"","targetDemo":""},"miniFacts":[{"icon":"🎯","label":"타깃","content":""},{"icon":"📸","label":"크리에이티브","content":""},{"icon":"📊","label":"데이터","content":""},{"icon":"🎬","label":"씬","content":""}],"factSheet":{"card_facts":{"cardName":"","items":[{"label":"핵심 USP","value":""},{"label":"실적 조건","value":""},{"label":"연회비","value":""}],"sourceLink":"https://card.kbcard.com/"},"savings_example":{"usage":"","monthly":"","annual":"","asOf":"2026-04 기준"},"search_evidence":{"main":[{"term":"","volume":0}],"related":[{"term":"","volume":0}],"source":"Google Trends · Naver DataLab"},"kb_connection":{"applicationUrl":"https://card.kbcard.com/","qrAvailable":true,"issuanceTime":"심사 후 3-5영업일"}},"ad_targeting":["","","",""]}

JSON만.`;

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { success: false, error: "ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const { opportunity, idea, cardMeta = {}, persona = {} } = await request.json();
    if (!opportunity || !idea) {
      return NextResponse.json(
        { success: false, error: "opportunity와 idea 모두 필요합니다." },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userPrompt = `## 기회 정보
- 카드: ${cardMeta.cardName || opportunity.card || ""} ${cardMeta.cardTagline ? `(${cardMeta.cardTagline})` : ""}
- 페르소나: ${persona.title || ""} — ${persona.subtitle || ""}
- 기회 제목: ${opportunity.title}
- USP 연결: ${opportunity.uspConnection || ""}
- 관련 키워드: ${(opportunity.relatedKeywords || []).slice(0, 5).map(k => `${k.term}(${(k.volume||0).toLocaleString()})`).join(", ")}
- 연간 검색량: ${(opportunity.annualVolume || 0).toLocaleString()}회

## 선택된 아이디어
- 제목: ${idea.title}
- 유형: ${idea.hookType || ""} · ${idea.funnelStage || ""}
- 오프닝 훅: ${idea.openingHook || ""}
- USP 앵커: ${idea.uspAnchor || ""}
- 타겟 키워드: ${idea.targetKeyword?.term || ""}
- 씬: ${(idea.scenes || []).map(s => s.visual || s.copy).join(" | ")}
- CTA: ${idea.callToAction || ""}
- 크리에이터 협업: ${idea.creatorCollab || ""}

이 아이디어를 YouTube Shorts + Instagram Reels 2개 플랫폼에 맞게 각색한 스토리보드 + 팩트시트 + 광고 타겟팅을 JSON으로 생성하세요.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = (message.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const cleaned = rawText
      .replace(/```json|```/g, "")
      .replace(/<cite[^>]*>([\s\S]*?)<\/cite>/g, "$1")
      .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: "AI 응답을 JSON으로 파싱할 수 없습니다.", raw: cleaned.substring(0, 300) },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      // 토큰 제한으로 JSON이 잘렸을 가능성 → 중괄호 복구 시도
      let attempt = jsonMatch[0];
      const opens = (attempt.match(/\{/g) || []).length;
      const closes = (attempt.match(/\}/g) || []).length;
      if (opens > closes) attempt = attempt + "}".repeat(opens - closes);
      try { parsed = JSON.parse(attempt); }
      catch {
        return NextResponse.json(
          { success: false, error: `AI 응답 JSON 파싱 실패 (토큰 잘림 가능): ${parseErr.message}`, raw: cleaned.substring(0, 400) },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("[/api/storyboard] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "알 수 없는 오류" },
      { status: 500 }
    );
  }
}
