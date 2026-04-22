import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

// 통합 사전 생성 엔드포인트:
//   1) 아이디어 3개 생성 (~25s)
//   2) 각 아이디어의 스토리보드를 Promise.all로 병렬 생성 (~25s)
//   3) 한 번에 반환 → 프론트에서 sessionStorage 캐싱

const IDEAS_SYSTEM = `당신은 KB국민카드 숏폼 전문가. 주어진 기회로 15-30초 숏폼 아이디어 **3개** 생성.

## 규칙
- 각 아이디어 서로 다른 hookType: "공감형", "궁금증형", "발견형" 중 택
- 각 아이디어 4개 scene
- score 0-100 (85-95 권장)
- 과장·단정·차별 표현 금지, 구체 수치는 USP 범위만, 금융 민감영역 회피

## JSON만 출력 (설명 금지)
{"ideas":[
{"id":1,"score":92,"title":"제목","hookType":"공감형","funnelStage":"Awareness","duration":"15-30초","targetKeyword":{"term":"키워드","volume":120000},"uspAnchor":"USP 한 줄","openingHook":"3초 훅","targetEmotion":"감정","scenes":[{"seq":1,"time":"0-3s","visual":"비주얼","copy":"카피","soundCue":"사운드"}],"callToAction":"CTA","proof":"증명","hashtags":["#t1","#t2","#t3"],"creatorFit":"스타일","creatorCollab":"협업","algorithmInsight":"시그널"}
]}

반드시 ideas 3개. JSON만.`;

const SB_SYSTEM = `당신은 KB국민카드 숏폼 스토리보드 전문가. 주어진 아이디어를 YouTube Shorts + Instagram Reels로 각색 + 4블록 팩트시트 생성.

가드레일: 과장 금지, 차별 금지, USP 범위만, 금융 민감영역 회피.

JSON만 출력:
{"youtube_shorts":{"title":"...","hook":"...","scenes":[{"seq":1,"time":"0-3s","visual":"...","copy":"..."}],"proof":"...","cta":"...","hashtags":["#..."],"bestTimeToPost":"...","targetDemo":"..."},"instagram_reels":{"title":"...","hook":"...","scenes":[...],"proof":"...","cta":"...","hashtags":[...],"bestTimeToPost":"...","targetDemo":"..."},"miniFacts":[{"icon":"🎯","label":"타깃","content":"..."}],"factSheet":{"card_facts":{"cardName":"...","items":[{"label":"핵심 USP","value":"..."},{"label":"실적 조건","value":"..."},{"label":"연회비","value":"..."}],"sourceLink":"https://card.kbcard.com/..."},"savings_example":{"usage":"...","monthly":"...","annual":"...","asOf":"2026-04 기준"},"search_evidence":{"main":[{"term":"...","volume":100000}],"related":[{"term":"...","volume":10000}],"source":"Google Trends · Naver DataLab (2026-04)"},"kb_connection":{"applicationUrl":"https://card.kbcard.com/...","qrAvailable":true,"issuanceTime":"심사 후 약 3-5영업일"}},"ad_targeting":["...","...","...","..."]}

JSON만.`;

function extractJSON(rawText) {
  const cleaned = rawText
    .replace(/```json|```/g, "")
    .replace(/<cite[^>]*>([\s\S]*?)<\/cite>/g, "$1")
    .trim();
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("JSON 파싱 실패");
  return JSON.parse(m[0]);
}

async function generateIdeas(client, opportunity, cardMeta, persona) {
  const topKeywords = (opportunity.relatedKeywords || []).slice(0, 3)
    .map(k => `${k.term}(${(k.volume || 0).toLocaleString()})`).join(", ");
  const userPrompt = `카드: ${cardMeta.cardName || opportunity.card || ""}
페르소나: ${persona.title || ""}
기회: ${opportunity.title}
USP: ${opportunity.uspConnection || ""}
페인: ${(opportunity.painPoints || []).slice(0, 3).join(" / ")}
키워드: ${topKeywords}
콘텐츠 훅: ${opportunity.contentHook || ""}

위 정보로 숏폼 아이디어 3개 JSON 생성.`;

  const msg = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 3500,
    system: IDEAS_SYSTEM,
    messages: [{ role: "user", content: userPrompt }],
  });
  const txt = (msg.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  return extractJSON(txt).ideas || [];
}

async function generateStoryboard(client, opportunity, idea, cardMeta, persona) {
  const userPrompt = `카드: ${cardMeta.cardName || ""}
기회: ${opportunity.title}
연 검색량: ${(opportunity.annualVolume || 0).toLocaleString()}회
키워드: ${(opportunity.relatedKeywords || []).slice(0, 3).map(k => `${k.term}(${(k.volume||0).toLocaleString()})`).join(", ")}

아이디어:
- 제목: ${idea.title}
- 훅타입: ${idea.hookType}
- 오프닝: ${idea.openingHook}
- USP: ${idea.uspAnchor}
- 씬: ${(idea.scenes || []).map(s => s.visual || s.copy).join(" | ")}
- CTA: ${idea.callToAction}

이 아이디어로 YT Shorts + IG Reels 각색 + 4블록 팩트시트 + 광고 타겟팅 JSON.`;
  const msg = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4500,
    system: SB_SYSTEM,
    messages: [{ role: "user", content: userPrompt }],
  });
  const txt = (msg.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  return extractJSON(txt);
}

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ success: false, error: "ANTHROPIC_API_KEY 미설정" }, { status: 500 });
    }
    const { opportunity, cardMeta = {}, persona = {} } = await request.json();
    if (!opportunity) {
      return NextResponse.json({ success: false, error: "opportunity 누락" }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Step 1: 아이디어 생성
    const ideas = await generateIdeas(client, opportunity, cardMeta, persona);
    if (!ideas.length) {
      return NextResponse.json({ success: false, error: "아이디어 생성 실패" }, { status: 500 });
    }

    // Step 2: 스토리보드 병렬 생성 (graceful)
    const sbResults = await Promise.allSettled(
      ideas.map(idea => generateStoryboard(client, opportunity, idea, cardMeta, persona))
    );
    const storyboards = {};
    sbResults.forEach((r, i) => {
      const id = ideas[i].id || (i + 1);
      if (r.status === "fulfilled") storyboards[id] = r.value;
      else storyboards[id] = { error: r.reason?.message || "스토리보드 생성 실패" };
    });

    return NextResponse.json({
      success: true,
      data: { ideas, storyboards },
      meta: { generatedAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error("[/api/generate-with-storyboards] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "알 수 없는 오류" },
      { status: 500 }
    );
  }
}
