/**
 * KB ALL·YOU·NEED AI Brandformance Engine
 * NEED Edu 데이터 — v2.0 (2026.04.20)
 * 
 * 핵심 리포지셔닝: "학부모 카드 → 평생 학습자 카드"
 * 
 * 구조:
 * - USP_ASSETS: 3개 핵심 혜택 자산
 * - PERSONAS: COVER 6개 (자녀 교육 3 + 성인 자기계발 3)
 * - OPPORTUNITIES: 10개 기회 카드 (COVER 6 + ACCENT 4)
 */

import { enrichWithMonthlyTrend } from '@/lib/generateMonthlyTrend';

// ============================================================================
// USP 자산 (NEED Edu 핵심 혜택)
// ============================================================================

export const NEED_EDU_USPS = [
  {
    id: "edu-academy",
    icon: "📚",
    title: "학원·교육 10%",
    conditions: "학원·어학원·학습지·온라인 강의 10% · 월 3,000원 한도",
    copy: "자녀 교육부터 내 공부까지, 한 카드",
    strategy: "학원 시장 자녀+성인 1,500만+ 검색 통합 소구",
    color: "#8B5CF6"
  },
  {
    id: "edu-culture",
    icon: "🎨",
    title: "문화·예술 교육 10%",
    conditions: "피아노·미술·발레·태권도·문화센터 10% · 월 3,000원 한도",
    copy: "예체능도 한 카드로 10%",
    strategy: "예체능 교육 시장 192만 검색 + 성인 취미 확장",
    color: "#F59E0B"
  },
  {
    id: "edu-online-learning",
    icon: "💻",
    title: "온라인 강의 10%",
    conditions: "해커스·시원스쿨·인프런·패스트캠퍼스 등 · 월 3,000원 한도",
    copy: "직장인 자기계발 온라인도 10%",
    strategy: "AI 리스킬링 +49% 폭증 + 온라인 강의 플랫폼 확산",
    color: "#06B6D4"
  }
];

// ============================================================================
// 페르소나 (COVER 6 = 자녀 교육 3 + 성인 자기계발 3)
// ============================================================================

export const NEED_EDU_PERSONAS = [
  // 🟦 자녀 교육 축 (3)
  {
    id: "EDU-COVER-K1",
    icon: "👶",
    title: "미취학 영유 맘",
    subtitle: "영어유치원·어린이집·문화센터 전방위 결제",
    description: "영어유치원 월 150-200만원 고정 지출. 어린이집 70만 + 유치원 49만 + 문화센터 23만 검색. 0-6세 자녀 교육에 몰입한 30대 후반 엄마가 핵심 타깃.",
    linkedUSP: ["edu-academy", "edu-culture"],
    annualSearchVolume: 1420000,
    opportunityCount: 1,
    color: "#EC4899",
    demoTags: ["30대 후반 엄마", "0-6세 자녀", "영어유치원 관심", "월 교육비 200만+"]
  },
  {
    id: "EDU-COVER-K2",
    icon: "🎨",
    title: "예체능 올인 부모",
    subtitle: "태권도·피아노·미술·발레 로테이션",
    description: "태권도 101만 + 피아노 35만 + 미술 35만 + 발레 21만. 초등 자녀의 예체능 학원 2-3개 병행. 예체능에 월 50-100만 투자하는 부모.",
    linkedUSP: ["edu-culture", "edu-academy"],
    annualSearchVolume: 1920000,
    opportunityCount: 1,
    color: "#F59E0B",
    demoTags: ["30-40대 부모", "초등 자녀 1-2명", "예체능 2개+ 병행", "교육비 민감도 중"]
  },
  {
    id: "EDU-COVER-K3",
    icon: "📖",
    title: "수능 재수 가정",
    subtitle: "재수학원 월 200-400만원 고정 지출",
    description: "재수학원 11-12월 피크 시 검색 3-4배. 월 200-400만원 고정 지출 가정. 1년간 집중 지출하는 경로에 카드 진입 기회.",
    linkedUSP: ["edu-academy"],
    annualSearchVolume: 450000,
    opportunityCount: 1,
    color: "#EF4444",
    demoTags: ["40-50대 부모", "재수생 자녀", "월 고정비 300만+", "11-12월 집중"]
  },
  // 🟩 성인 자기계발 축 (3)
  {
    id: "EDU-COVER-A1",
    icon: "💼",
    title: "토익·영어 스펙 준비 직장인",
    subtitle: "해커스·시원스쿨·화상영어 루틴",
    description: "토익 636만 + 영어회화 248만 + 해커스 214만 + 시원스쿨 75만 + 화상영어 25.5만 = 연 1,198만 검색. 20-30대 직장인 자기계발 핵심 시장.",
    linkedUSP: ["edu-online-learning", "edu-academy"],
    annualSearchVolume: 11980000,
    opportunityCount: 1,
    color: "#3B82F6",
    demoTags: ["20-30대 직장인", "이직·승진 준비", "온라인 강의 + 오프라인", "월 교육비 10-20만"]
  },
  {
    id: "EDU-COVER-A2",
    icon: "🤖",
    title: "AI 리스킬링러",
    subtitle: "AI 교육 +49% 폭증, 인프런·패스트캠퍼스",
    description: "AI 교육 16.7만 +49% 급성장, 인프런 185만, 프롬프트 엔지니어링 13.4만, n잡 +133%. 2026 최고 폭증 카테고리. 30-40대 전문직의 AI 전환 욕구.",
    linkedUSP: ["edu-online-learning"],
    annualSearchVolume: 2110000,
    opportunityCount: 1,
    color: "#10B981",
    demoTags: ["30-40대 전문직", "AI 툴 학습", "인프런·패스트캠퍼스", "커리어 전환 고민"]
  },
  {
    id: "EDU-COVER-A3",
    icon: "📑",
    title: "공시·자격증 수험생",
    subtitle: "공인중개사·공무원·자격증·바리스타",
    description: "공인중개사 99만 + 자격증 88만 + 메가공무원 79만 + 바리스타 46만 + 독서실 57만 = 연 380만. 20-40대 자격증 준비 세그먼트 다양.",
    linkedUSP: ["edu-academy", "edu-online-learning"],
    annualSearchVolume: 3800000,
    opportunityCount: 1,
    color: "#8B5CF6",
    demoTags: ["20-40대", "자격증·공시 준비", "독서실 이용자", "월 수험비 20-50만"]
  }
];

// ============================================================================
// 기회 10개 (COVER 6 + ACCENT 4)
// ============================================================================

const _RAW_NEED_EDU_OPPORTUNITIES = [
  // ========== 🔵 COVER 자녀 교육 축 (3개) ==========
  {
    id: "EDU-COVER-K1-1",
    personaId: "EDU-COVER-K1",
    icon: "👶",
    tier: "MEGA",
    card: "NEED Edu",
    hookType: "COVER",
    title: "미취학 영유 맘 — 영어유치원 월 200만 고정",
    subtitle: "0-6세 자녀 교육에 몰입한 30대 후반 엄마",
    description: "영어유치원 월 150-200만 고정 지출. 어린이집 70만 + 유치원 49만 + 문화센터 23만 검색. 카드 결제 한도가 크고, 자녀 교육 전방위 소비를 한 카드에 집중하려는 핵심 고액 타깃.",
    annualVolume: 1420000,
    monthlyVolume: 118333,
    who: {
      tags: ["30대 후반 엄마", "0-6세 자녀", "영어유치원 관심", "월 교육비 200만+"],
      dataEvidence: "영유(영어유치원) 관련 검색 여성 85%+, 30대 후반 비중 60%+"
    },
    what: {
      tags: ["영어유치원·어린이집·문화센터 10%", "월 3,000원 캡 완전 활용"],
      dataEvidence: "월 200만 × 10% = 월 20만 → 캡 3,000원(한도 꽉 채움)"
    },
    when: {
      tags: ["2-3월 신학기 등록기", "가을 재등록·추가 결제"],
      dataEvidence: "영유 검색 2-3월 평월 대비 4배 폭증"
    },
    where: {
      tags: ["맘카페 영유반 게시판", "키즈앱·패드 커뮤니티", "영어유치원 대기 카페"],
      dataEvidence: "맘카페 영유 관련 포스팅 월 5만+"
    },
    why: {
      tags: ["영어교육 조기투자 심리", "월 고정비 관리 욕구", "다중 결제 통합 니즈"],
      dataEvidence: "영유 투자 합리화 콘텐츠 공유율 높음"
    },
    how: {
      tags: ["'영유 맘 필수 카드' 포지셔닝", "맘카페 제휴 리뷰", "키즈 인플루언서 협업"],
      dataEvidence: "맘카페 카드 추천 블로그 지속 인기"
    },
    pathFinder: ["영어유치원", "어린이집 비교", "문화센터 프로그램", "NEED Edu"],
    cluster: ["영어유치원", "영유", "어린이집", "유치원", "문화센터"],
    relatedKeywords: [
      { term: "영어유치원", volume: 850000, trend: 0.12 },
      { term: "어린이집", volume: 702000, trend: 0.05 },
      { term: "유치원", volume: 492000, trend: 0.08 },
      { term: "문화센터", volume: 231000, trend: 0.15 }
    ],
    contentHook: "영유 월 200만, 매달 3천원 돌려받는 유일한 카드",
    painPoints: ["영유 고액 부담 심리", "여러 결제 분산", "카드 혜택 부족 체감"],
    uspConnection: "학원·교육 10% + 문화·예술 교육 10% 결합 (유아 전방위 커버)"
  },
  {
    id: "EDU-COVER-K2-1",
    personaId: "EDU-COVER-K2",
    icon: "🎨",
    tier: "MEGA",
    card: "NEED Edu",
    hookType: "COVER",
    title: "예체능 올인 부모 — 태권도·피아노·미술 로테이션",
    subtitle: "월 50-100만 예체능 고정 지출",
    description: "태권도 101만 + 피아노 35만 + 미술 35만 + 발레 21만 = 연 192만 검색. 초등 자녀 2-3개 예체능 병행. '공부만큼 예체능'이라는 교육 철학 가진 30-40대 부모.",
    annualVolume: 1920000,
    monthlyVolume: 160000,
    who: {
      tags: ["30-40대 부모", "초등 자녀 1-2명", "예체능 2개+ 병행"],
      dataEvidence: "예체능 학원 관련 검색 부모 주도 80%+"
    },
    what: {
      tags: ["예체능 학원 월 50-100만 10%", "다중 학원 한 카드 통합"],
      dataEvidence: "태권도 + 피아노 2개 월 40만 × 10% = 4만 → 캡 3,000원"
    },
    when: {
      tags: ["신학기 등록", "학원 변경·추가", "발표회·시험 시즌"],
      dataEvidence: "학원 등록 3월·9월 피크"
    },
    where: {
      tags: ["맘카페 학원 정보", "아파트 단지 학원 커뮤니티"],
      dataEvidence: "아파트 단지 기반 학원 선택 비중 65%"
    },
    why: {
      tags: ["예체능 로테이션 관리 피로", "여러 학원 결제 분산"],
      dataEvidence: "'학원 카드 추천' 검색 증가"
    },
    how: {
      tags: ["'예체능 2-3개, 한 카드로' 메시지", "부모 인플루언서 협업"],
      dataEvidence: "예체능 학원 리뷰 콘텐츠 공유율 15%+"
    },
    pathFinder: ["태권도 학원", "피아노 학원", "미술 학원", "NEED Edu"],
    cluster: ["태권도", "피아노", "미술", "발레", "예체능 학원"],
    relatedKeywords: [
      { term: "태권도", volume: 1010000, trend: 0.08 },
      { term: "피아노 학원", volume: 350000, trend: 0.05 },
      { term: "미술 학원", volume: 350000, trend: 0.03 },
      { term: "발레 학원", volume: 210000, trend: 0.1 }
    ],
    contentHook: "태권도 + 피아노 + 미술, 한 카드로 10%",
    painPoints: ["예체능 고정비 부담", "여러 학원 결제 관리", "혜택 분산"],
    uspConnection: "문화·예술 교육 10% (태권도·피아노·미술·발레 포함)"
  },
  {
    id: "EDU-COVER-K3-1",
    personaId: "EDU-COVER-K3",
    icon: "📖",
    tier: "LARGE",
    card: "NEED Edu",
    hookType: "COVER",
    title: "수능 재수 가정 — 월 200-400만 1년 집중",
    subtitle: "재수학원 11-12월 피크, 1년 집중 지출",
    description: "재수학원 11-12월 피크 시 검색 3-4배. 월 200-400만원 고정 지출. 재수 1년은 가정 총 교육비 2천만+. 카드 한도·혜택이 결정적.",
    annualVolume: 450000,
    monthlyVolume: 37500,
    who: {
      tags: ["40-50대 부모", "재수생 자녀", "월 고정비 300만+"],
      dataEvidence: "재수학원 관련 검색 40-50대 부모 주도"
    },
    what: {
      tags: ["재수학원 월 300만 × 10% = 30만 → 캡 3,000원", "연 재수비 4만 환급"],
      dataEvidence: "재수 1년 기준 월 3,000원 × 12 = 36,000원"
    },
    when: {
      tags: ["수능 직후 11-12월", "다음해 2-3월 등록", "재수 시작 4-6월"],
      dataEvidence: "재수학원 검색 11월 평월 대비 3.5배"
    },
    where: {
      tags: ["재수학원 입시설명회", "부모 카페 재수 게시판"],
      dataEvidence: "종로·대성 등 대형 재수학원 등록 월 수천"
    },
    why: {
      tags: ["1년 집중 지출 최적화", "큰 금액 카드 혜택 민감"],
      dataEvidence: "재수 지출 관련 카드 검색 증가"
    },
    how: {
      tags: ["11-12월 집중 광고", "재수학원 제휴 등록 프로모션"],
      dataEvidence: "수능 후 11-12월 특수 광고 전환율 높음"
    },
    pathFinder: ["재수학원 비교", "재수학원 등록", "종로학원·대성학원", "NEED Edu"],
    cluster: ["재수학원", "재수", "수능 재수", "대성학원", "종로학원"],
    relatedKeywords: [
      { term: "재수학원", volume: 320000, trend: 0.08 },
      { term: "재수", volume: 180000, trend: 0.05 }
    ],
    contentHook: "재수 1년 2천만, 매달 3천원씩 돌아옵니다",
    painPoints: ["1년 고정비 2천만+", "카드 혜택 부족", "여러 결제 통합 니즈"],
    uspConnection: "학원·교육 10% (재수학원 포함)"
  },

  // ========== 🔵 COVER 성인 자기계발 축 (3개) ==========
  {
    id: "EDU-COVER-A1-1",
    personaId: "EDU-COVER-A1",
    icon: "💼",
    tier: "MEGA",
    card: "NEED Edu",
    hookType: "COVER",
    title: "토익·영어 스펙 준비 직장인 — 연 1,198만 검색",
    subtitle: "'학부모 카드 → 평생 학습자 카드' 리포지셔닝",
    description: "토익 636만 + 영어회화 248만 + 해커스 214만 + 시원스쿨 75만 + 화상영어 25.5만. 20-30대 직장인 자기계발 핵심 시장. 이직·승진·유학 준비의 공통 관문.",
    annualVolume: 11980000,
    monthlyVolume: 998333,
    who: {
      tags: ["20-30대 직장인", "이직·승진 준비", "온라인 강의 + 오프라인", "월 교육비 10-20만"],
      dataEvidence: "토익 검색자 20-30대 75%+"
    },
    what: {
      tags: ["해커스·시원스쿨·온라인 강의 10%", "오프라인 학원도 10%"],
      dataEvidence: "온라인 강의 + 오프라인 학원 통합 혜택"
    },
    when: {
      tags: ["승진·이직 결심 시점", "연말 연초 자기계발 시즌"],
      dataEvidence: "토익 검색 1-3월·9-11월 피크"
    },
    where: {
      tags: ["해커스·시원스쿨 앱", "인프런·패스트캠퍼스", "강남·종로 오프라인 학원"],
      dataEvidence: "해커스 MAU 400만+"
    },
    why: {
      tags: ["학부모 카드로 인식되기 싫음", "자기계발도 같은 카드로"],
      dataEvidence: "'평생 학습' 키워드 검색 +35%"
    },
    how: {
      tags: ["'학부모 아닌 평생 학습자' 리포지셔닝", "직장인 콘텐츠 광고"],
      dataEvidence: "자기계발 관련 콘텐츠 체류 5분+"
    },
    pathFinder: ["토익 공부", "해커스 토익", "영어회화 학원", "NEED Edu"],
    cluster: ["토익", "영어회화", "해커스", "시원스쿨", "화상영어"],
    relatedKeywords: [
      { term: "토익", volume: 6360000, trend: 0.03 },
      { term: "영어회화", volume: 2480000, trend: 0.15 },
      { term: "해커스", volume: 2140000, trend: 0.08 },
      { term: "시원스쿨", volume: 750000, trend: 0.12 },
      { term: "화상영어", volume: 255000, trend: 0.22 }
    ],
    contentHook: "토익도 해커스도, 평생 학습자의 한 카드",
    painPoints: ["'학부모 카드' 이미지 반감", "직장인 자기계발 카드 부재"],
    uspConnection: "학원·교육 10% + 온라인 강의 10% (성인 자기계발 전방위)"
  },
  {
    id: "EDU-COVER-A2-1",
    personaId: "EDU-COVER-A2",
    icon: "🤖",
    tier: "LARGE",
    card: "NEED Edu",
    hookType: "COVER",
    title: "AI 리스킬링러 — 2026 최고 폭증 카테고리",
    subtitle: "AI 교육 +49%, 인프런 185만, n잡 +133%",
    description: "AI 교육 16.7만 +49% 급성장, 인프런 185만, 프롬프트 엔지니어링 13.4만, n잡 +133%. 2026 커리어 전환 키워드. 30-40대 전문직의 AI 전환 욕구가 폭발.",
    annualVolume: 2110000,
    monthlyVolume: 175833,
    who: {
      tags: ["30-40대 전문직", "AI 툴 학습", "인프런·패스트캠퍼스", "커리어 전환 고민"],
      dataEvidence: "AI 교육 검색 30-40대 70%+"
    },
    what: {
      tags: ["인프런·패스트캠퍼스 10%", "AI 부트캠프 10%"],
      dataEvidence: "인프런 평균 강의 10만원 × 10% = 10,000"
    },
    when: {
      tags: ["AI 뉴스 폭증 시기", "이직 결심 시점", "신기술 공개 직후"],
      dataEvidence: "AI 관련 검색 지속 급증"
    },
    where: {
      tags: ["인프런·패스트캠퍼스·유데미", "AI 부트캠프", "링크드인 자기계발"],
      dataEvidence: "인프런 월 MAU 200만+"
    },
    why: {
      tags: ["AI 도태 공포", "커리어 전환 필요성", "n잡 준비"],
      dataEvidence: "'AI 교육'·'AI 리스킬링' 검색 지속 증가"
    },
    how: {
      tags: ["'AI 리스킬링 카드' 포지셔닝", "직장인 AI 커뮤니티 제휴"],
      dataEvidence: "AI 교육 광고 CTR 교육 카테고리 최고"
    },
    pathFinder: ["AI 교육", "인프런", "패스트캠퍼스", "프롬프트 엔지니어링", "NEED Edu"],
    cluster: ["AI 교육", "인프런", "패스트캠퍼스", "리스킬링", "n잡"],
    relatedKeywords: [
      { term: "인프런", volume: 1850000, trend: 0.38 },
      { term: "AI 교육", volume: 167000, trend: 0.49 },
      { term: "프롬프트 엔지니어링", volume: 134000, trend: 0.62 }
    ],
    contentHook: "AI 리스킬링, 2026 가장 필요한 10% 카드",
    painPoints: ["AI 도태 공포", "고액 부트캠프 부담", "자기계발 카드 부재"],
    uspConnection: "온라인 강의 10% (AI 교육·인프런·패스트캠퍼스)"
  },
  {
    id: "EDU-COVER-A3-1",
    personaId: "EDU-COVER-A3",
    icon: "📑",
    tier: "MEGA",
    card: "NEED Edu",
    hookType: "COVER",
    title: "공시·자격증 수험생 — 공인중개사·공무원·바리스타",
    subtitle: "연 380만 검색, 20-40대 수험생 세그먼트",
    description: "공인중개사 99만 + 자격증 88만 + 메가공무원 79만 + 바리스타 46만 + 독서실 57만 = 연 380만. 20-40대 자격증 준비 다양한 세그먼트 통합.",
    annualVolume: 3800000,
    monthlyVolume: 316667,
    who: {
      tags: ["20-40대", "자격증·공시 준비", "독서실 이용자", "월 수험비 20-50만"],
      dataEvidence: "공시·자격증 검색 20-40대 80%+"
    },
    what: {
      tags: ["공시·자격증 학원 10%", "독서실 이용료 10%"],
      dataEvidence: "월 30만 × 10% = 3만 → 캡 3,000원"
    },
    when: {
      tags: ["시험 3-6개월 전 집중기", "연초 결심기"],
      dataEvidence: "자격증 검색 1-3월 피크"
    },
    where: {
      tags: ["메가공무원·해커스공무원·박문각", "지역 독서실", "수험 카페"],
      dataEvidence: "메가공무원 MAU 100만+"
    },
    why: {
      tags: ["장기 수험비 부담", "고정 지출 혜택 니즈"],
      dataEvidence: "수험생 카드 검색 증가"
    },
    how: {
      tags: ["수험생 커뮤니티 제휴", "독서실 쿠폰북 협업"],
      dataEvidence: "수험 커뮤니티 광고 전환율 6%+"
    },
    pathFinder: ["공인중개사", "공무원 학원", "자격증", "NEED Edu"],
    cluster: ["공인중개사", "공무원", "자격증", "바리스타", "독서실"],
    relatedKeywords: [
      { term: "공인중개사", volume: 990000, trend: 0.08 },
      { term: "자격증", volume: 880000, trend: 0.05 },
      { term: "메가공무원", volume: 790000, trend: 0.02 },
      { term: "바리스타", volume: 460000, trend: 0.12 },
      { term: "독서실", volume: 570000, trend: -0.05 }
    ],
    contentHook: "공시·자격증 준비, 한 카드로 10%",
    painPoints: ["장기 수험비 부담", "학원·독서실 분산 결제"],
    uspConnection: "학원·교육 10% + 온라인 강의 10% (공시·자격증 학원 포함)"
  },

  // ========== 🟠 ACCENT 기회 4개 ==========
  {
    id: "EDU-ACCENT-1",
    personaId: "ACCENT",
    icon: "🏫",
    tier: "MEDIUM",
    card: "NEED Edu",
    hookType: "ACCENT",
    title: "대치·목동 학원 정보 사냥꾼",
    subtitle: "학원가 정보 탐색자 — 학원 선택 전 카드 결정",
    description: "대치동 25만 + 목동·중계·평촌 등 학원가 집중. 학원 선택 전 정보 탐색 단계에서 카드 결정. 고액 학원비 지출 사전 타깃.",
    annualVolume: 380000,
    monthlyVolume: 31667,
    who: {
      tags: ["초중고 학부모", "대치·목동·중계·평촌 지역", "월 학원비 100만+"],
      dataEvidence: "대치동 학원 검색자 30-40대 부모 80%+"
    },
    what: {
      tags: ["학원가 진입 시 카드 결정", "10% 환급 학원 검색"],
      dataEvidence: "학원 등록 전 카드 검색 비율 25%"
    },
    when: {
      tags: ["학원 상담 전", "신학기·방학 등록"],
      dataEvidence: "학원 검색 2-3월·7-8월 피크"
    },
    where: {
      tags: ["학원가 블로그", "학원 정보 카페", "학원 엄마 커뮤니티"],
      dataEvidence: "대치동 학원 정보 블로그 월 50만 PV"
    },
    why: {
      tags: ["월 학원비 100만+ 최적화 욕구", "혜택 극대화"],
      dataEvidence: "고액 학원비 카드 관련 검색 증가"
    },
    how: {
      tags: ["학원가 지역 타깃 광고", "학원 상담 리플렛 협업"],
      dataEvidence: "지역 타깃 광고 전환율 1.5배"
    },
    pathFinder: ["대치동 학원", "목동 학원", "학원 추천", "NEED Edu"],
    cluster: ["대치동", "목동", "중계동", "평촌 학원"],
    relatedKeywords: [
      { term: "대치동 학원", volume: 250000, trend: 0.05 },
      { term: "목동 학원", volume: 120000, trend: 0.03 }
    ],
    contentHook: "대치·목동 학원, 한 카드로 10%",
    painPoints: ["고액 학원비 부담", "카드 혜택 비교 피로"],
    uspConnection: "학원·교육 10% (대형 학원 포함)"
  },
  {
    id: "EDU-ACCENT-2",
    personaId: "ACCENT",
    icon: "🎭",
    tier: "MEDIUM",
    card: "NEED Edu",
    hookType: "ACCENT",
    title: "예체능 자기계발 성인 — 필라테스·바리스타",
    subtitle: "'어린이 카드'가 아닌 '평생 학습' 포지셔닝 연결",
    description: "필라테스 273만 + 바리스타 45만. 성인 예체능 취미도 '교육·문화' 카테고리로 혜택 확장. 성인 자기계발 리포지셔닝 보강.",
    annualVolume: 3180000,
    monthlyVolume: 265000,
    who: {
      tags: ["30-40대 여성·남성 혼합", "취미 자기계발 실행자"],
      dataEvidence: "필라테스 273만 = 성인 자기관리 대표 지표"
    },
    what: {
      tags: ["필라테스·바리스타·취미 학원 10%"],
      dataEvidence: "문화·예술 교육 10% 적용"
    },
    when: {
      tags: ["연초 결심", "직장 저녁 시간", "주말 취미"],
      dataEvidence: "필라테스 검색 1월·9월 피크"
    },
    where: {
      tags: ["필라테스 스튜디오", "바리스타 학원", "취미 클래스 앱"],
      dataEvidence: "필라테스 스튜디오 전국 5,000개+"
    },
    why: {
      tags: ["자기 투자 욕구", "교육 아닌 취미로 인식"],
      dataEvidence: "성인 취미 교육 시장 연 20% 성장"
    },
    how: {
      tags: ["'성인 취미도 교육' 리포지셔닝", "필라테스 유튜버 협업"],
      dataEvidence: "취미 콘텐츠 공유율 12%"
    },
    pathFinder: ["필라테스", "바리스타 학원", "취미 클래스", "NEED Edu"],
    cluster: ["필라테스", "바리스타", "취미 교육", "성인 예체능"],
    relatedKeywords: [
      { term: "필라테스", volume: 2730000, trend: 0.15 },
      { term: "바리스타", volume: 450000, trend: 0.12 }
    ],
    contentHook: "필라테스·바리스타, 성인 취미도 10%",
    painPoints: ["성인 취미 카드 부재", "'어린이 카드' 이미지 반감"],
    uspConnection: "문화·예술 교육 10% (성인 취미 포함)"
  },
  {
    id: "EDU-ACCENT-3",
    personaId: "ACCENT",
    icon: "📅",
    tier: "MEDIUM",
    card: "NEED Edu",
    hookType: "ACCENT",
    title: "수능 11-12월 집중 마케팅",
    subtitle: "수능 직후 재수 결정 시즌의 광고 윈도우",
    description: "수능 직후 11-12월 재수 결정 시즌. 재수학원 등록 3-4배 폭증. 이 시즌에만 집중 광고로 1년 고정 고객 확보.",
    annualVolume: 400000,
    monthlyVolume: 33333,
    who: {
      tags: ["수능 직후 재수 결심 가정", "40-50대 부모"],
      dataEvidence: "11-12월 재수학원 검색 4배 폭증"
    },
    what: {
      tags: ["시즌 한정 등록 혜택", "재수학원 10%"],
      dataEvidence: "재수 1년 고정 이용자"
    },
    when: {
      tags: ["11-12월 수능 직후", "1-2월 재수 입학"],
      dataEvidence: "11-12월 검색량 평월의 4배"
    },
    where: {
      tags: ["재수학원 입시설명회", "부모 카페"],
      dataEvidence: "종로·대성 등 설명회 월 수천명"
    },
    why: {
      tags: ["시즌 집중 결정", "1년 카드 선택 중요"],
      dataEvidence: "재수 카드 선택 1회성 큰 결정"
    },
    how: {
      tags: ["11-12월 시즌 광고 집중", "재수학원 제휴 패키지"],
      dataEvidence: "시즌 광고 CPA 50% 낮음"
    },
    pathFinder: ["재수학원 등록", "재수 결정", "수능 후 재수", "NEED Edu"],
    cluster: ["재수학원", "수능 재수", "11월 재수"],
    relatedKeywords: [
      { term: "재수 결정", volume: 45000, trend: 0.08 }
    ],
    contentHook: "수능 후 재수, 1년 카드 선택의 골든 시즌",
    painPoints: ["재수 1년 카드 선택 부담", "정보 부족"],
    uspConnection: "학원·교육 10% (재수학원 시즌 캠페인)"
  },
  {
    id: "EDU-ACCENT-4",
    personaId: "ACCENT",
    icon: "💻",
    tier: "MEDIUM",
    card: "NEED Edu",
    hookType: "ACCENT",
    title: "화상영어 플랫폼 협업",
    subtitle: "CPC $8.96 고비용 시장, 직접 제휴로 CPC 우회",
    description: "화상영어 25.5만 검색, CPC $8.96 고비용. 직접 광고 대신 화상영어 플랫폼(링글·튜터링·야나두) 제휴로 카드 발급 유도. 플랫폼별 전용 10% 혜택 패키지.",
    annualVolume: 255000,
    monthlyVolume: 21250,
    who: {
      tags: ["화상영어 이용자 20-40대", "직장인·대학생"],
      dataEvidence: "화상영어 MAU 50만+"
    },
    what: {
      tags: ["화상영어 플랫폼 10%", "플랫폼 전용 패키지"],
      dataEvidence: "링글 월 60만원 × 10% = 6만 → 캡 3,000원"
    },
    when: {
      tags: ["영어 공부 결심기", "이직·유학 준비"],
      dataEvidence: "화상영어 검색 1-3월·9-11월 피크"
    },
    where: {
      tags: ["링글·튜터링·야나두 앱", "영어 유튜브 채널"],
      dataEvidence: "링글 MAU 20만+"
    },
    why: {
      tags: ["화상영어 고액 구독료 부담", "월정액 혜택 니즈"],
      dataEvidence: "화상영어 가격 검색 증가"
    },
    how: {
      tags: ["플랫폼 전용 딥링크", "영어 크리에이터 협업"],
      dataEvidence: "플랫폼 제휴 광고 전환율 8%+"
    },
    pathFinder: ["화상영어", "링글", "튜터링", "NEED Edu"],
    cluster: ["화상영어", "링글", "튜터링", "야나두"],
    relatedKeywords: [
      { term: "화상영어", volume: 255000, trend: 0.22 }
    ],
    contentHook: "링글·튜터링도 10% — 화상영어 월정액의 종점",
    painPoints: ["화상영어 고액 구독료", "카드 혜택 정보 부족"],
    uspConnection: "온라인 강의 10% (화상영어 플랫폼 포함)"
  }
];

export const NEED_EDU_OPPORTUNITIES = enrichWithMonthlyTrend(_RAW_NEED_EDU_OPPORTUNITIES);

// ============================================================================
// 교차 인사이트
// ============================================================================

export const NEED_EDU_CROSS_INSIGHTS = [
  {
    id: "edu-cross-1",
    icon: "⚡",
    card: "NEED Edu",
    hookType: "Repositioning-hook",
    title: "'학부모 카드 → 평생 학습자 카드' 리포지셔닝 필수",
    description: "NEED Edu가 기존에 학부모 중심으로 인식되지만, 실제 검색 시장은 성인 자기계발(토익 636만+인프런 185만+공시 380만)이 자녀 교육 시장(420만) 대비 3-4배. 리포지셔닝으로 잠재 시장 3배 확대.",
    implication: "메인 메시지를 '평생 학습자의 카드'로 전환. 성인 타깃 축에 마케팅 배분 증가."
  },
  {
    id: "edu-cross-2",
    icon: "⚡",
    card: "NEED Edu",
    hookType: "Surge-hook",
    title: "AI 리스킬링 +49% 폭증 = 2026 최대 기회 카테고리",
    description: "AI 교육 16.7만 +49% 급성장, 프롬프트 엔지니어링 +62%, n잡 +133%. 2026 커리어 전환 키워드 1위. 초기 선점 중요.",
    implication: "'AI 리스킬링 카드' 포지셔닝으로 브랜드 선점 가능"
  },
  {
    id: "edu-cross-3",
    icon: "⚡",
    card: "NEED Edu",
    hookType: "Season-hook",
    title: "11-12월 재수 시즌 = 1년 고정 고객 확보 윈도우",
    description: "재수학원 등록 11-12월 3-4배 폭증. 한 번 결정하면 1년 고정 이용. 이 시즌 집중 광고로 LTV 높은 고객 확보 가능.",
    implication: "11-12월 시즌 광고 예산 집중 + 재수학원 제휴 패키지"
  }
];

// ============================================================================
// 전체 export
// ============================================================================

export const needEduData = {
  meta: {
    cardId: "NEED-EDU",
    cardName: "NEED Edu",
    cardTagline: "자녀 교육부터 내 공부까지 — 평생 학습자의 카드",
    annualFee: 20000,
    monthlyRequirement: 400000,
    familyCard: "무료",
    version: "2.0",
    lastUpdate: "2026-04-20"
  },
  usps: NEED_EDU_USPS,
  personas: NEED_EDU_PERSONAS,
  opportunities: NEED_EDU_OPPORTUNITIES,
  crossInsights: NEED_EDU_CROSS_INSIGHTS
};

// ============================================================================
// 유틸 함수
// ============================================================================

export function getOpportunitiesByPersona(personaId) {
  return NEED_EDU_OPPORTUNITIES.filter(o => o.personaId === personaId);
}

export function getCoverOpportunities() {
  return NEED_EDU_OPPORTUNITIES.filter(o => o.hookType === "COVER");
}

export function getAccentOpportunities() {
  return NEED_EDU_OPPORTUNITIES.filter(o => o.hookType === "ACCENT");
}

export function getOpportunityById(id) {
  return NEED_EDU_OPPORTUNITIES.find(o => o.id === id);
}

export function getPersonaById(id) {
  return NEED_EDU_PERSONAS.find(p => p.id === id);
}

export function getUSPById(id) {
  return NEED_EDU_USPS.find(u => u.id === id);
}

export function getTotalAnnualVolume() {
  return NEED_EDU_OPPORTUNITIES.reduce((sum, o) => sum + o.annualVolume, 0);
}

export function getOpportunityCount() {
  return NEED_EDU_OPPORTUNITIES.length;
}

export default needEduData;
