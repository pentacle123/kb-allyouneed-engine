import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

// Fallback (API 키 없거나 검색 실패 시)
const FALLBACK_BY_DOMAIN = {
  finance: [
    { channelTitle: "슈카월드", subscriberCount: 2400000, description: "경제·재테크 해설", tier: "MEGA" },
    { channelTitle: "신사임당", subscriberCount: 1800000, description: "재테크·창업·부업", tier: "MEGA" },
    { channelTitle: "돈쭐러TV", subscriberCount: 450000, description: "신용카드·재테크 리뷰", tier: "MACRO" },
    { channelTitle: "카드고수", subscriberCount: 120000, description: "카드 혜택 비교", tier: "MACRO" },
    { channelTitle: "짠테크 일상", subscriberCount: 85000, description: "생활비 절약·카드 팁", tier: "MICRO" },
  ],
  pet: [
    { channelTitle: "강형욱의 보듬TV", subscriberCount: 2100000, description: "반려견 훈련·라이프", tier: "MEGA" },
    { channelTitle: "댕문가", subscriberCount: 450000, description: "반려견 행동·케어", tier: "MACRO" },
    { channelTitle: "랜선이모", subscriberCount: 280000, description: "반려동물 일상 브이로그", tier: "MACRO" },
    { channelTitle: "수구리네", subscriberCount: 95000, description: "반려묘 일상·용품 리뷰", tier: "MICRO" },
  ],
  "working-mom": [
    { channelTitle: "워킹맘다이어리", subscriberCount: 180000, description: "맞벌이 육아·가사 일상", tier: "MACRO" },
    { channelTitle: "일하는엄마 미림", subscriberCount: 95000, description: "워킹맘 시간관리·절약", tier: "MICRO" },
    { channelTitle: "현실워킹맘", subscriberCount: 45000, description: "퇴근 후 저녁 브이로그", tier: "MICRO" },
  ],
  "single-life": [
    { channelTitle: "자취생김씨", subscriberCount: 340000, description: "1인가구 자취 브이로그", tier: "MACRO" },
    { channelTitle: "혼자사는 방송", subscriberCount: 180000, description: "1인가구 라이프·셀프케어", tier: "MACRO" },
    { channelTitle: "직장인의 하루", subscriberCount: 85000, description: "20-30대 직장인 일상", tier: "MICRO" },
  ],
  travel: [
    { channelTitle: "여행에 미치다", subscriberCount: 1200000, description: "해외여행 정보·후기", tier: "MEGA" },
    { channelTitle: "꼬뇽", subscriberCount: 680000, description: "해외여행 브이로그", tier: "MACRO" },
    { channelTitle: "원지의 디스커버리", subscriberCount: 450000, description: "해외 현지 라이프", tier: "MACRO" },
  ],
  "ott-digital": [
    { channelTitle: "디지털 인사이트", subscriberCount: 320000, description: "OTT·구독 서비스 리뷰", tier: "MACRO" },
    { channelTitle: "넷플릭스 가이드", subscriberCount: 180000, description: "넷플릭스·OTT 추천", tier: "MACRO" },
    { channelTitle: "구독 다이어트", subscriberCount: 55000, description: "구독 관리·절약 팁", tier: "MICRO" },
  ],
  parenting: [
    { channelTitle: "베이비스토리", subscriberCount: 1100000, description: "육아 정보·꿀팁", tier: "MEGA" },
    { channelTitle: "맘스다이어리", subscriberCount: 320000, description: "엄마 라이프·육아", tier: "MACRO" },
    { channelTitle: "키즈카페TV", subscriberCount: 95000, description: "자녀 교육·놀이", tier: "MICRO" },
  ],
  "senior-care": [
    { channelTitle: "효도하는법", subscriberCount: 180000, description: "부모 돌봄·시니어 라이프", tier: "MACRO" },
    { channelTitle: "건강한노후", subscriberCount: 95000, description: "시니어 건강·돌봄 가이드", tier: "MICRO" },
  ],
  hyperlocal: [
    { channelTitle: "동네 브이로거", subscriberCount: 220000, description: "동네 맛집·카페 탐방", tier: "MACRO" },
    { channelTitle: "내 근처 라이프", subscriberCount: 85000, description: "하이퍼로컬 데일리", tier: "MICRO" },
  ],
  general: [
    { channelTitle: "돈쭐러TV", subscriberCount: 450000, description: "신용카드·재테크 리뷰", tier: "MACRO" },
    { channelTitle: "카드고수", subscriberCount: 120000, description: "카드 혜택 비교", tier: "MACRO" },
    { channelTitle: "짠테크 일상", subscriberCount: 85000, description: "생활비 절약·카드 팁", tier: "MICRO" },
  ],
};

function pickFallback(domain, reason) {
  const list = FALLBACK_BY_DOMAIN[domain] || FALLBACK_BY_DOMAIN.general;
  return list.map(c => ({ ...c, matchScore: 75, matchReason: reason || `${domain} 도메인 샘플` }));
}

// 1단계: 콘텐츠 맥락 분석 (Claude)
async function analyzeContext(client, opportunity, idea, cardMeta) {
  const prompt = `당신은 YouTube 크리에이터 매칭 전문가입니다.
아래 숏폼 아이디어를 분석해서, 이 영상을 잘 만들 크리에이터의 프로필을 도출하세요.

## 숏폼 정보
- 카드: ${cardMeta?.cardName || opportunity.card}
- 기회: ${opportunity.title}
- 페인포인트: ${(opportunity.painPoints || []).join(" / ")}
- 아이디어 제목: ${idea?.title || ""}
- 오프닝 훅: ${idea?.openingHook || ""}
- Hook Type: ${idea?.hookType || ""}

## 도출
- domain: finance | pet | working-mom | single-life | travel | ott-digital | parenting | senior-care | hyperlocal | general 중 1
- genre: 구체 콘텐츠 장르 (예: "신용카드 리뷰", "반려견 일상")
- search_queries: YouTube 검색 쿼리 3-4개 (opportunity 키워드 그대로 X, 크리에이터 장르 용어로 변환)
- avoid_keywords: 제외할 단어 3-5개 (도메인 밖 동음이의어)
- rationale: 왜 이 장르가 맞는지 한 줄

JSON만 출력:
{"domain":"...","genre":"...","creator_profile":{"age_range":"30-40대","content_style":"정보 전달형","subscriber_tier":["MICRO","MACRO"]},"search_queries":["...","...","..."],"avoid_keywords":["...","..."],"rationale":"..."}`;

  const msg = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1200,
    messages: [{ role: "user", content: prompt }],
  });
  const text = (msg.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("context analysis JSON 파싱 실패");
  return JSON.parse(m[0]);
}

// 2단계: YouTube 검색
async function searchCandidates(youtubeKey, queries) {
  const seen = new Set();
  const candidates = [];

  for (const query of (queries || []).slice(0, 4)) {
    try {
      const url = new URL(`${YOUTUBE_API_BASE}/search`);
      url.searchParams.set("part", "snippet");
      url.searchParams.set("q", query);
      url.searchParams.set("type", "channel");
      url.searchParams.set("maxResults", "8");
      url.searchParams.set("regionCode", "KR");
      url.searchParams.set("relevanceLanguage", "ko");
      url.searchParams.set("order", "relevance");
      url.searchParams.set("key", youtubeKey);
      const res = await fetch(url.toString());
      if (!res.ok) continue;
      const data = await res.json();
      (data.items || []).forEach(item => {
        const channelId = item.snippet?.channelId;
        if (!channelId || seen.has(channelId)) return;
        seen.add(channelId);
        candidates.push({ channelId, discoveredFrom: query });
      });
    } catch (e) {
      // continue
    }
  }
  if (candidates.length === 0) return [];

  // 채널 상세 (구독자, 영상수 등)
  const ids = candidates.map(c => c.channelId).slice(0, 30).join(",");
  try {
    const u = new URL(`${YOUTUBE_API_BASE}/channels`);
    u.searchParams.set("part", "snippet,statistics");
    u.searchParams.set("id", ids);
    u.searchParams.set("key", youtubeKey);
    const res = await fetch(u.toString());
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || [])
      .map(ch => {
        const subs = parseInt(ch.statistics?.subscriberCount || "0", 10);
        const videos = parseInt(ch.statistics?.videoCount || "0", 10);
        const origin = candidates.find(c => c.channelId === ch.id);
        return {
          channelId: ch.id,
          channelTitle: ch.snippet?.title,
          description: (ch.snippet?.description || "").slice(0, 300),
          thumbnail: ch.snippet?.thumbnails?.default?.url,
          subscriberCount: subs,
          videoCount: videos,
          tier: subs >= 1000000 ? "MEGA" : subs >= 100000 ? "MACRO" : subs >= 10000 ? "MICRO" : "NANO",
          discoveredFrom: origin?.discoveredFrom,
        };
      })
      .filter(c => c.videoCount >= 5 && c.subscriberCount >= 1000);
  } catch {
    return [];
  }
}

// 3단계: 의미 검증 (Claude)
async function validateMatches(client, candidates, context, opportunity, idea) {
  const list = candidates.slice(0, 12);
  const prompt = `YouTube 크리에이터 매칭 검증 전문가입니다. 아래 숏폼에 적합한 크리에이터를 선별하세요.

## 숏폼
- 장르: ${context.genre}
- 도메인: ${context.domain}
- 아이디어: ${idea?.title || ""}
- 카드: ${opportunity.card}

## 부적합 키워드 (이 단어가 채널 설명에 있으면 부적합)
${(context.avoid_keywords || []).join(", ")}

## 후보 ${list.length}개
${list.map((c, i) => `${i + 1}. "${c.channelTitle}" (${c.tier}, 구독 ${c.subscriberCount.toLocaleString()}, 영상 ${c.videoCount})\n   설명: ${c.description || "(없음)"}\n   발견쿼리: "${c.discoveredFrom}"`).join("\n")}

## 출력 (JSON만)
{"matches":[{"channelTitle":"...","isMatch":true,"matchScore":85,"matchReason":"적합 이유 한 줄","collaborationAngle":"협업 앵글 한 줄"}, ...]}

규칙:
- isMatch=true 5개 이상이면 matchScore 상위 5개
- 부적합 키워드가 설명·제목에 있으면 isMatch=false
- 부적합한 채널은 isMatch=false 명시
- matchScore: 도메인 적합도 50% + 활성도 20% + 스타일 30%

JSON만.`;

  const msg = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2500,
    messages: [{ role: "user", content: prompt }],
  });
  const text = (msg.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("validation JSON 파싱 실패");
  const parsed = JSON.parse(m[0]);
  const matches = (parsed.matches || []).filter(x => x.isMatch).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 5);
  // 원본 후보 데이터 병합
  return matches.map(v => {
    const c = list.find(x => x.channelTitle === v.channelTitle);
    return c ? { ...c, matchScore: v.matchScore, matchReason: v.matchReason, collaborationAngle: v.collaborationAngle } : null;
  }).filter(Boolean);
}

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ success: false, error: "ANTHROPIC_API_KEY 미설정" }, { status: 500 });
    }
    const body = await request.json();
    const { opportunity, idea, cardMeta = {} } = body;
    if (!opportunity) {
      return NextResponse.json({ success: false, error: "opportunity 필요" }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const youtubeKey = process.env.YOUTUBE_API_KEY;

    // 1단계: 컨텍스트
    let context;
    try {
      context = await analyzeContext(client, opportunity, idea || {}, cardMeta);
    } catch (e) {
      // 1단계 실패 → fallback general
      return NextResponse.json({
        success: true,
        creators: pickFallback("general", "맥락 분석 실패 — 기본 추천"),
        context: { domain: "general", genre: "기본 추천", rationale: e.message },
        source: "fallback-context-failed",
      });
    }

    // YouTube API 키 없으면 도메인 fallback
    if (!youtubeKey) {
      return NextResponse.json({
        success: true,
        creators: pickFallback(context.domain, `${context.genre} 도메인 샘플`),
        context,
        source: "fallback-no-api-key",
      });
    }

    // 2단계: 검색
    const candidates = await searchCandidates(youtubeKey, context.search_queries);
    if (candidates.length === 0) {
      return NextResponse.json({
        success: true,
        creators: pickFallback(context.domain, "검색 결과 없음 — 도메인 샘플"),
        context,
        source: "fallback-no-results",
      });
    }

    // 3단계: 검증
    let matched;
    try {
      matched = await validateMatches(client, candidates, context, opportunity, idea || {});
    } catch (e) {
      // 검증 실패 → 후보 상위 5개 그대로
      matched = candidates.slice(0, 5).map(c => ({ ...c, matchScore: 60, matchReason: "검증 단계 실패 — 검색 상위" }));
    }

    if (matched.length === 0) {
      return NextResponse.json({
        success: true,
        creators: pickFallback(context.domain, "검증 후 적합 채널 없음 — 도메인 샘플"),
        context,
        source: "fallback-no-validated",
        totalCandidates: candidates.length,
      });
    }

    return NextResponse.json({
      success: true,
      creators: matched,
      context,
      source: "youtube-api-verified",
      totalCandidates: candidates.length,
    });
  } catch (error) {
    console.error("[/api/youtube] error:", error);
    return NextResponse.json({ success: false, error: error.message || "알 수 없는 오류" }, { status: 500 });
  }
}

// 기존 GET 호환 (단순 검색) — 사용 안 하면 제거 가능
export async function GET(request) {
  return NextResponse.json({ success: false, error: "POST를 사용하세요. body: { opportunity, idea, cardMeta }" }, { status: 405 });
}
