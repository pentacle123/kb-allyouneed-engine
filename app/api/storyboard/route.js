import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const SYSTEM_PROMPT = `당신은 KB국민카드의 플랫폼별 숏폼 스토리보드 전문가입니다.

주어진 "AI 생성 아이디어" 1개를 **YouTube Shorts**와 **Instagram Reels** 각 플랫폼 특성에 맞게 각색한 스토리보드 2개 + 콘텐츠 팩트시트 + 광고 타겟팅을 생성합니다.

## 플랫폼 특성
- **YouTube Shorts**: 최대 60초 · 9:16 · 강한 훅 + 정보성 밀도 · 완청률 중요 · 검색 유입
- **Instagram Reels**: 최대 90초 · 9:16 · 감성·브이로그 톤 · 공유율 중요 · 팔로우 유입

## 금융 카드 브랜드 가드레일
- 과장 표현 금지 (100% 환급, 무조건 등)
- 차별·비하 표현 금지
- 구체 수치는 제공된 USP 범위 내
- 금융 민감 영역 회피 (금리·신용·대출·연체)

## 출력 형식 (반드시 JSON만)
{
  "youtube_shorts": {
    "title": "YouTube Shorts용 제목",
    "hook": "첫 3초 훅 문장",
    "scenes": [
      { "seq": 1, "time": "0-3s", "visual": "영상 설명", "copy": "화면 카피" }
    ],
    "proof": "데이터 근거 한 문장",
    "cta": "종료 CTA",
    "hashtags": ["#...", "#..."],
    "bestTimeToPost": "업로드 최적 시간",
    "targetDemo": "타겟 인구통계"
  },
  "instagram_reels": {
    "title": "Instagram Reels용 제목",
    "hook": "첫 3초 훅",
    "scenes": [ ... ],
    "proof": "...",
    "cta": "...",
    "hashtags": [ ... ],
    "bestTimeToPost": "...",
    "targetDemo": "..."
  },
  "miniFacts": [
    { "icon": "🎯", "label": "타깃", "content": "한 줄 요약" },
    { "icon": "📸", "label": "크리에이티브", "content": "한 줄" },
    { "icon": "📊", "label": "데이터→그래픽", "content": "한 줄" },
    { "icon": "🎬", "label": "씬 구성", "content": "한 줄" }
  ],
  "factSheet": {
    "card_facts": {
      "cardName": "정확한 카드명",
      "items": [
        { "label": "핵심 USP", "value": "..." },
        { "label": "실적 조건", "value": "전월 실적 30만원 이상 등" },
        { "label": "연회비", "value": "국내 1만원 / 해외 1.2만원 등" }
      ],
      "sourceLink": "https://card.kbcard.com/..."
    },
    "savings_example": {
      "usage": "월 30만원 사용 가정",
      "monthly": "월 약 1.2만원 적립",
      "annual": "연 약 14.4만원 절감",
      "asOf": "2026-04 기준"
    },
    "search_evidence": {
      "main": [
        { "term": "메인 키워드", "volume": 100680 }
      ],
      "related": [
        { "term": "연관 키워드", "volume": 12000 }
      ],
      "source": "Google Trends · Naver DataLab (2026-04)"
    },
    "kb_connection": {
      "applicationUrl": "https://card.kbcard.com/...",
      "qrAvailable": true,
      "issuanceTime": "심사 후 약 3-5영업일"
    }
  },
  "ad_targeting": [
    "연령·성별 타겟",
    "관심사",
    "시간대",
    "시즌"
  ]
}

JSON만 출력. 설명 금지.`;

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
      max_tokens: 6500,
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
