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
    "benefit_facts": [
      { "label": "카드명", "value": "..." },
      { "label": "핵심 USP", "value": "..." },
      { "label": "실적 조건", "value": "..." }
    ],
    "search_facts": [
      { "label": "메인 키워드", "value": "예: 체리피커 · 연 100,680회" },
      { "label": "연관 키워드", "value": "..." }
    ],
    "shooting_timing": "촬영 최적 타이밍 한 줄",
    "connection": "KB 카드 연결 방법 한 줄"
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
      max_tokens: 4500,
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
    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error("[/api/storyboard] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "알 수 없는 오류" },
      { status: 500 }
    );
  }
}
