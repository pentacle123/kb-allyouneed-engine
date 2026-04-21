import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const PERSPECTIVE_INSTRUCTIONS = {
  auto:    "AI 자동추천 — 기회의 핵심 가치를 최대한 다양한 앵글로 공략.",
  context: "A. 소비자 맥락 조합 — 페인포인트·데모그래픽·생활 루틴 맥락에서 공감형 진입.",
  journey: "B. 검색 여정 앵글 — PathFinder 단계별로 소비자가 도달하는 순간을 포착.",
  cross:   "C. 크로스 카테고리 — 이 기회를 다른 카드·페르소나와 교차시켜 새로운 내러티브 발굴.",
};

const SYSTEM_PROMPT = `당신은 KB국민카드 숏폼 전문가. 주어진 기회로 15-30초 숏폼 아이디어 **3개** 생성.

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

    const topKeywords = (opportunity.relatedKeywords || []).slice(0, 3)
      .map(k => `${k.term}(${(k.volume || 0).toLocaleString()})`).join(", ");
    const userPrompt = `관점: ${perspectiveInstruction}

카드: ${cardMeta.cardName || opportunity.card || ""}
페르소나: ${persona.title || ""}
기회: ${opportunity.title}
USP: ${opportunity.uspConnection || ""}
페인: ${(opportunity.painPoints || []).slice(0, 3).join(" / ")}
키워드: ${topKeywords}
콘텐츠 훅: ${opportunity.contentHook || ""}

위 정보로 숏폼 아이디어 3개 JSON 생성.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 3500,
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
