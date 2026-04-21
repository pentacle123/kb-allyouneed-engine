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

주어진 "기회(Opportunity)"를 바탕으로 YouTube Shorts / Instagram Reels용 15-30초 숏폼 아이디어 **정확히 5개**를 생성합니다.

## 생성 규칙
1. **첫 3초 훅이 알고리즘 시그널을 자극해야 함** — 궁금증/공감/발견/경험담/반전 중 하나
2. **5개 아이디어는 서로 다른 hookType** 사용 — "공감형", "궁금증형", "발견형", "경험담형", "반전형"
3. **15-30초 길이**에 맞는 **4-5개 scene** 구성 (scenes.length = 4 또는 5)
4. **검색 여정 종착지**에 도달한 소비자에게 KB 카드를 해답으로 제시
5. **6초 범퍼 광고, DA 배너 금지** — 순수 숏폼 콘텐츠만
6. 각 아이디어에 **완성 점수 (score)** 0-100 부여 — 알고리즘 적합도·전환 가능성·제작 용이성 종합 (85+ 권장)

## 금융 카드 브랜드 가드레일 (준수 필수)
- **과장 표현 금지**: "100% 환급", "무조건 혜택", "무한", "유일", "무제한 절약" 같은 단정형 표현 사용 금지
- **차별·비하 표현 금지**: 특정 연령/성별/소득층/지역/직업 조롱·비하 금지
- **구체 수치는 제공된 USP 범위 내에서만 사용** — 임의의 할인율·금액·환급액 생성 금지
- **금융 민감 영역 회피**: 금리·신용점수·대출·연체 등 규제 영역은 사실 확인 불가하면 생성 회피
- **법적 리스크 표현 금지**: "보장", "확정", "100%" 등 소비자 오인 우려 표현 금지

## 출력 형식 (반드시 JSON만, 설명 문구 금지)
{
  "ideas": [
    {
      "id": 1,
      "score": 92,
      "title": "아이디어 제목 (한 줄)",
      "hookType": "공감형" | "궁금증형" | "발견형" | "경험담형" | "반전형",
      "funnelStage": "Awareness" | "Consideration" | "Decision" | "Loyalty",
      "duration": "15-30초",
      "targetKeyword": { "term": "대표 타겟 키워드", "volume": 120000 },
      "uspAnchor": "이 아이디어가 직결되는 USP를 한 줄로 — 예: '국내 1% 무실적 + 실적 체크 피로 해소 공략'",
      "openingHook": "첫 3초에 나올 훅 문장 (발화)",
      "targetEmotion": "소비자가 느낄 감정 — 예: '내 얘기잖아'",
      "scenes": [
        {
          "seq": 1,
          "time": "0-3s",
          "visual": "영상 비주얼 설명",
          "copy": "화면 카피 or 음성",
          "soundCue": "배경음/효과음 힌트"
        }
      ],
      "callToAction": "영상 종료 시 CTA",
      "proof": "데이터 기반 증명 한 문장 — 예: '체리피커 관련 검색 연 10만회+'",
      "hashtags": ["#해시태그1", "#해시태그2", "#해시태그3", "#해시태그4", "#해시태그5"],
      "creatorFit": "추천 크리에이터 스타일 (한 줄)",
      "creatorCollab": "크리에이터 협업 구체 제안 — 예: '금융 유튜버 3인과 7일 실험 후기 제작'",
      "algorithmInsight": "이 아이디어가 알고리즘을 탈 이유"
    }
  ]
}

JSON만 출력. 설명 금지. 반드시 ideas 배열에 정확히 5개.`;

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
      max_tokens: 8000,
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
