import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60; // Vercel serverless timeout (seconds)

const SYSTEM_PROMPT = `당신은 KB국민카드의 숏폼 콘텐츠 전략 전문가입니다.

주어진 "기회(Opportunity)"를 바탕으로 YouTube Shorts / Instagram Reels용 15-30초 숏폼 아이디어 3개를 생성합니다.

## 생성 규칙
1. **첫 3초 훅이 알고리즘 시그널을 자극해야 함** — 궁금증/공감/발견 중 하나
2. **페인포인트 기반 오프닝** — "내 얘기잖아" 반응을 유도
3. **15-30초 길이**에 맞는 5-7개 scene 구성
4. **검색 여정 종착지**에 도달한 소비자에게 KB 카드를 해답으로 제시
5. **6초 범퍼 광고, DA 배너 금지** — 순수 숏폼 콘텐츠 아이디어만
6. 각 scene에 time/visual/copy/soundCue 포함

## 출력 형식 (반드시 JSON만, 설명 문구 금지)
{
  "ideas": [
    {
      "id": 1,
      "title": "아이디어 제목 (한 줄)",
      "hookType": "공감형" | "발견형" | "궁금증형",
      "duration": "15-30초",
      "openingHook": "첫 3초에 나올 훅 문장",
      "targetEmotion": "소비자가 느낄 감정 (예: '내 얘기잖아')",
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
      "hashtags": ["#해시태그1", "#해시태그2", "#해시태그3"],
      "creatorFit": "추천 크리에이터 스타일",
      "algorithmInsight": "이 아이디어가 알고리즘을 탈 이유"
    }
  ]
}

JSON만 출력. 설명 금지. 반드시 ideas 배열에 3개.`;

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { success: false, error: "ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const { opportunity, cardMeta = {}, persona = {} } = await request.json();
    if (!opportunity) {
      return NextResponse.json(
        { success: false, error: "opportunity 데이터가 없습니다." },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userPrompt = `## 기회 정보
- **카드**: ${cardMeta.cardName || opportunity.card || ""} ${cardMeta.cardTagline ? `(${cardMeta.cardTagline})` : ""}
- **페르소나**: ${persona.title || ""} — ${persona.subtitle || ""}
- **기회 제목**: ${opportunity.title}
- **설명**: ${opportunity.description || opportunity.subtitle || ""}
- **페인포인트**: ${(opportunity.painPoints || []).join(" / ")}
- **USP 연결**: ${opportunity.uspConnection || ""}
- **콘텐츠 훅 후보**: ${opportunity.contentHook || ""}
- **검색 여정**: ${(opportunity.pathFinder || opportunity.pathJourney || []).join(" → ")}
- **관련 키워드**: ${(opportunity.relatedKeywords || []).map(k => `${k.term}(${k.volume?.toLocaleString()})`).join(", ")}
- **알고리즘 시그널**: ${opportunity.algorithmSignal || ""}
- **연간 검색량**: ${(opportunity.annualVolume || opportunity.annualVol || 0).toLocaleString()}회

위 정보를 바탕으로 숏폼 아이디어 3개를 JSON으로 생성하세요.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    // Extract text from response
    const rawText = (message.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    // Clean and parse JSON
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
