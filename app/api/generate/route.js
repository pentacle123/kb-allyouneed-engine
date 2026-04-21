import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const PERSPECTIVE_INSTRUCTIONS = {
  auto:    "AI 자동추천 — 기회의 핵심 가치를 최대한 다양한 앵글로 공략.",
  context: "A. 소비자 맥락 조합 — 페인포인트·데모그래픽·생활 루틴 맥락에서 공감형 진입.",
  journey: "B. 검색 여정 앵글 — PathFinder 단계별로 소비자가 도달하는 순간을 포착.",
  cross:   "C. 크로스 카테고리 — 이 기회를 다른 카드·페르소나와 교차시켜 새로운 내러티브 발굴.",
};

const SYSTEM_PROMPT = `당신은 KB국민카드의 숏폼 콘텐츠 전략 전문가입니다.
주어진 기회를 바탕으로 YouTube Shorts / Instagram Reels용 15-30초 숏폼 아이디어 **정확히 5개**를 생성합니다.

## 규칙
1. 첫 3초 훅이 알고리즘을 자극 (궁금증/공감/발견 중 하나)
2. 5개 아이디어는 서로 다른 hookType: "공감형", "궁금증형", "발견형", "경험담형", "반전형"
3. 각 아이디어에 4개 scene (15-30초)
4. 각 아이디어에 완성 점수 (score) 0-100 부여 (85-95 범위 권장)
5. 범퍼 광고·DA 배너 금지, 순수 숏폼만

## 가드레일
- 과장·단정 표현 금지 ("100%", "무조건", "무한", "유일", "보장")
- 차별·비하 금지
- 구체 수치는 제공된 USP 범위만 (임의 할인율·환급액 생성 금지)
- 금리·신용·대출 등 금융 민감 영역 회피

## 출력 (JSON만, 설명 문구 금지)
{
  "ideas": [
    {
      "id": 1,
      "score": 92,
      "title": "아이디어 제목",
      "hookType": "공감형",
      "funnelStage": "Awareness",
      "duration": "15-30초",
      "targetKeyword": { "term": "키워드", "volume": 120000 },
      "uspAnchor": "USP 한 줄",
      "openingHook": "첫 3초 훅 문장",
      "targetEmotion": "타겟 감정",
      "scenes": [
        { "seq": 1, "time": "0-3s", "visual": "비주얼", "copy": "카피", "soundCue": "사운드" }
      ],
      "callToAction": "CTA",
      "proof": "증명 한 줄",
      "hashtags": ["#태그1", "#태그2", "#태그3"],
      "creatorFit": "크리에이터 스타일",
      "creatorCollab": "협업 제안",
      "algorithmInsight": "알고리즘 시그널"
    }
  ]
}

반드시 ideas 배열 5개. JSON만 출력.`;

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { success: false, error: "ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const { opportunity, cardMeta = {}, persona = {}, perspective = "auto" } = await request.json();
    if (!opportunity) {
      return NextResponse.json(
        { success: false, error: "opportunity 데이터가 없습니다." },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const perspectiveInstruction = PERSPECTIVE_INSTRUCTIONS[perspective] || PERSPECTIVE_INSTRUCTIONS.auto;

    const userPrompt = `## 관점 (Perspective)
${perspectiveInstruction}

## 기회 정보
- **카드**: ${cardMeta.cardName || opportunity.card || ""} ${cardMeta.cardTagline ? `(${cardMeta.cardTagline})` : ""}
- **페르소나**: ${persona.title || ""} — ${persona.subtitle || ""}
- **기회 제목**: ${opportunity.title}
- **설명**: ${opportunity.description || opportunity.subtitle || ""}
- **페인포인트**: ${(opportunity.painPoints || []).join(" / ")}
- **USP 연결**: ${opportunity.uspConnection || ""}
- **콘텐츠 훅 후보**: ${opportunity.contentHook || ""}
- **검색 여정**: ${(opportunity.pathFinder || opportunity.pathJourney || []).join(" → ")}
- **관련 키워드**: ${(opportunity.relatedKeywords || []).map(k => `${k.term}(${(k.volume || 0).toLocaleString()})`).join(", ")}
- **시즌성**: ${opportunity.seasonality?.description || "연중 안정"}
- **알고리즘 시그널**: ${opportunity.algorithmSignal || ""}
- **연간 검색량**: ${(opportunity.annualVolume || opportunity.annualVol || 0).toLocaleString()}회
${opportunity.competition?.insight ? `- **경쟁 환경**: ${opportunity.competition.insight}` : ""}

위 정보와 관점을 반영해 숏폼 아이디어 **정확히 5개**를 JSON으로 생성하세요.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 5000,
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

    const parsed = JSON.parse(jsonMatch[0]);
    const ideas = parsed.ideas || [];

    return NextResponse.json({ success: true, data: { ideas } });
  } catch (error) {
    console.error("[/api/generate] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "알 수 없는 오류" },
      { status: 500 }
    );
  }
}
