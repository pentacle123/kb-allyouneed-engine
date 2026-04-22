/**
 * KB ALL·YOU·NEED AI Brandformance Engine
 * NEED AutoSlim 데이터 — v2.0 (2026.04.20)
 * 
 * 구조:
 * - USP_ASSETS: 4개 핵심 혜택 자산
 * - PERSONAS: COVER 4개 (메인 타깃)
 * - OPPORTUNITIES: 9개 기회 카드 (COVER 4 + ACCENT 5)
 */

import { enrichWithMonthlyTrend } from '@/lib/generateMonthlyTrend';

// ============================================================================
// USP 자산 (NEED AutoSlim 핵심 혜택)
// ============================================================================

export const NEED_AUTOSLIM_USPS = [
  {
    id: "autoslim-installment",
    icon: "🚗",
    title: "오토 슬림할부 할인",
    conditions: "할부 잔액 有: 월 최대 20,000원 (연 24만) · 할부 잔액 無: 월 최대 5,000원",
    copy: "신차 할부 5년, 매달 2만원씩 돌아옵니다",
    strategy: "이 카드의 설계 의도 타깃 — 신차 구매 후 5년간 할부 잔액을 들고 있는 사람",
    color: "#3B82F6"
  },
  {
    id: "autoslim-fuel",
    icon: "⛽",
    title: "주유·충전 5%",
    conditions: "SK·GS 주유소 + LPG 충전소 · 월 1만원 한도",
    copy: "매달 주유비의 5%, 조용히 돌아옵니다",
    strategy: "주유소 연 627만 검색 시장 침투 + LPG 숨은 블루오션 (83.8만)",
    color: "#F59E0B"
  },
  {
    id: "autoslim-insurance",
    icon: "🛡️",
    title: "자동차보험 연 2만원",
    conditions: "자동차보험료 자동납부 시 연 2만원 환급",
    copy: "보험 갱신일, 조용한 2만원",
    strategy: "자동차보험 연 202만 검색 시장. KB손해보험 665만 기존 고객에 내부 크로스셀",
    color: "#10B981"
  },
  {
    id: "autoslim-speedmate",
    icon: "🔧",
    title: "SK스피드메이트 현장할인 (실적無 연 1회)",
    conditions: "전월 실적 조건 없음 · 엔진오일 3만원 + 타이어 30% + 에어컨필터·부동액 1만씩",
    copy: "1년에 한 번, 엔진오일은 카드가 냅니다",
    strategy: "스피드메이트 연 105만 검색, 숨은 KSP — 현재 마케팅 거의 없음",
    color: "#EF4444"
  }
];

// ============================================================================
// 페르소나 (COVER 4)
// ============================================================================

export const NEED_AUTOSLIM_PERSONAS = [
  {
    id: "AUTOSLIM-COVER-A1",
    icon: "🚗",
    title: "오토슬림 신차 구매 직장인",
    subtitle: "신차 할부 5년, 매달 2만원이 돌아옵니다",
    description: "30-40대 직장인, 첫 차 or 업그레이드 구매. 오토 슬림할부 잔액 보유로 월 최대 2만원 × 60개월 = 연 최대 24만원 혜택. 이 카드의 설계 의도 타깃.",
    linkedUSP: ["autoslim-installment", "autoslim-fuel", "autoslim-insurance", "autoslim-speedmate"],
    annualSearchVolume: 5130000,
    opportunityCount: 1,
    color: "#3B82F6",
    demoTags: ["30-40대", "첫 차·업그레이드", "월 지출 160만+", "스포티지·쏘렌토·카니발·G80 검색자"]
  },
  {
    id: "AUTOSLIM-COVER-A2",
    icon: "⛽",
    title: "중장기 내연기관차 실용주의",
    subtitle: "차에 들어가는 돈, 조용히 5%씩 되돌려",
    description: "40-50대 자차 5년 이상 소유자. 주유·정비·보험 갱신이 연간 고정비로 자리 잡은 중장년. 할부 없이도 주유 5% + 스피드메이트 + 보험 2만 = 연 18만원.",
    linkedUSP: ["autoslim-fuel", "autoslim-insurance", "autoslim-speedmate"],
    annualSearchVolume: 7100000,
    opportunityCount: 1,
    color: "#F59E0B",
    demoTags: ["40-50대", "자차 5년+", "주유 월 2회+", "보험 갱신 민감"]
  },
  {
    id: "AUTOSLIM-COVER-A3",
    icon: "🔧",
    title: "정비·소모품 교체 정기 유저",
    subtitle: "1년에 한 번, 엔진오일은 카드가 냅니다",
    description: "30-50대 차 관리 민감형. 엔진오일 5-10천km 주기, 타이어 4-5년 주기, 여름·겨울 앞 점검. 스피드메이트 현장할인(실적 無) 연 7-10만원 + 주유 12만 = 연 19-22만원.",
    linkedUSP: ["autoslim-speedmate", "autoslim-fuel"],
    annualSearchVolume: 1530000,
    opportunityCount: 1,
    color: "#EF4444",
    demoTags: ["30-50대", "자차 관리 민감", "보배드림·오토갤", "예방 정비 중시"]
  },
  {
    id: "AUTOSLIM-COVER-A4",
    icon: "🔵",
    title: "LPG 차주 숨은 블루오션",
    subtitle: "LPG 차주를 위한, 국내 유일한 카드 혜택",
    description: "택시·영업·상용·장애인 LPG 승용차 소유자. 전국 등록 LPG 차량 약 186만대. LPG 충전 5%(연 12만) 혜택을 LPG 차주에게 명시 소구한 카드 없음. 완전 블루오션.",
    linkedUSP: ["autoslim-fuel", "autoslim-insurance", "autoslim-speedmate"],
    annualSearchVolume: 838000,
    opportunityCount: 1,
    color: "#06B6D4",
    demoTags: ["LPG 차주 186만대", "택시·영업·상용·장애인", "경제성 민감", "경쟁자 전무"]
  }
];

// ============================================================================
// 기회 9개 (COVER 4 + ACCENT 5)
// ============================================================================

const _RAW_NEED_AUTOSLIM_OPPORTUNITIES = [
  // ========== 🔵 COVER 페르소나 기회 4개 ==========
  {
    id: "AUTOSLIM-COVER-A1-1",
    personaId: "AUTOSLIM-COVER-A1",
    icon: "🚗",
    tier: "MEGA",
    card: "NEED AutoSlim",
    hookType: "COVER",
    title: "오토슬림 신차 구매 직장인",
    subtitle: "신차 할부 5년, 매달 2만원이 돌아옵니다",
    description: "신차 234만 + 자동차 할부 166만 + 신차 할부 113만 = 연 513만 교집합 검색. 30-40대 첫 차·업그레이드 구매자가 오토 슬림할부 잔액 보유 시 월 최대 2만원 × 60개월 = 연 최대 24만원 환급. 신차 구매 여정의 종착지.",
    annualVolume: 5130000,
    monthlyVolume: 427500,
    who: {
      tags: ["30-40대 직장인", "첫 차 or 업그레이드", "월 지출 160만+", "스포티지·쏘렌토·카니발·G80 검색자"],
      dataEvidence: "신차 검색 234만 + 스포티지·쏘렌토·카니발 브랜드 검색 병행자"
    },
    what: {
      tags: ["오토 슬림할부 잔액 유지", "월 2만원 × 60개월 환급", "주유 5% + 보험 2만 결합"],
      dataEvidence: "오토 슬림할부 할인 + 주유 5% + 보험 2만 + 엔진오일 3만 = 연 41만원"
    },
    when: {
      tags: ["신차 계약 직후", "딜러 상담 할부 협상 시", "출고 후 첫 카드 결제"],
      dataEvidence: "2-4월 신차 피크 시즌, 봄철·가을 신차 발표 시기 광고 유리"
    },
    where: {
      tags: ["다나와 신차 견적", "카눈·겟차 견적 비교", "딜러 상담실", "카드고릴라 자동차 카드"],
      dataEvidence: "다나와·카눈·겟차가 신차 구매 여정 디지털 필수 경유지"
    },
    why: {
      tags: ["큰돈 쓰는 불안감", "할부 상품 혼란", "삼성카드 다이렉트 오토 대안 모색"],
      dataEvidence: "'신차 할부 방법'·'오토할부 vs 카드할부 차이' 커뮤니티 다수"
    },
    how: {
      tags: ["견적 플랫폼 제휴 배너", "'월 2만원 돌려드립니다' 시뮬레이터", "딜러 리플렛"],
      dataEvidence: "카드 시뮬레이터 콘텐츠 평균 체류 3분+, 딜러 접점 전환율 높음"
    },
    pathFinder: ["신차", "자동차 할부", "신차 할부 금리 비교", "자동차 카드 할부", "NEED AutoSlim"],
    cluster: ["신차", "자동차 할부", "신차 할부", "오토할부", "다이렉트 오토", "스포티지·쏘렌토·카니발"],
    relatedKeywords: [
      { term: "신차", volume: 2340000, trend: -0.15 },
      { term: "자동차 할부", volume: 1660000, trend: 0.09 },
      { term: "신차 할부", volume: 1130000, trend: 0.12 },
      { term: "kb 오토할부", volume: 7690, trend: 0.15 },
      { term: "신차 카드 슬림 할부", volume: 241, trend: 2.09 }
    ],
    contentHook: "신차 할부 5년, 매달 2만원이 돌아옵니다",
    painPoints: ["할부 상품 복잡성 혼란", "큰돈 쓰는 의사결정 불안", "할부 vs 캐시백 비교 피로"],
    uspConnection: "오토 슬림할부 할인 (잔액有 월 2만 × 60개월 = 연 24만) + 주유 5% + 보험 2만 + 스피드메이트 = 연 41만원"
  },
  {
    id: "AUTOSLIM-COVER-A2-1",
    personaId: "AUTOSLIM-COVER-A2",
    icon: "⛽",
    tier: "MEGA",
    card: "NEED AutoSlim",
    hookType: "COVER",
    title: "중장기 내연기관차 주유·정비 실용주의",
    subtitle: "차에 들어가는 돈, 조용히 5%씩 되돌려드립니다",
    description: "주유소 627만 + SK주유소 30.5만 + GS칼텍스 52.5만 = 연 710만 검색. 40-50대 자차 5년+ 소유자에게 주유·정비·보험은 연간 고정비. 할부 없이도 주유 5%(연 12만) + 스피드메이트(연 4만) + 보험 2만 = 연 18만원.",
    annualVolume: 7100000,
    monthlyVolume: 591667,
    who: {
      tags: ["40-50대 중장년", "자차 5년+ 소유", "주유 월 2회 이상", "실용주의 소비"],
      dataEvidence: "주유소 관련 검색 40-50대 비중 55%+ 추정"
    },
    what: {
      tags: ["주유 5% 환급", "스피드메이트 연 1회", "자동차보험 연 2만"],
      dataEvidence: "할부 잔액 無 기준 주유 12만 + 스피드메이트 4만 + 보험 2만 = 연 18만"
    },
    when: {
      tags: ["매주 주유 루틴", "연 1-2회 보험 갱신", "계절별 정비 시점"],
      dataEvidence: "주유 검색 주중 평일 출퇴근 시간 피크"
    },
    where: {
      tags: ["SK주유소·GS칼텍스 앱", "보험 갱신 페이지", "네이버 주유소 최저가"],
      dataEvidence: "GS칼텍스 검색 +180% 급증 = 주유 생태계 디지털화 신호"
    },
    why: {
      tags: ["'차가 있는 만큼 손해 보고 있다' 심리", "고정비 누적 피로", "숨은 혜택 발굴 욕구"],
      dataEvidence: "주유소 최저가 검색 +540% 급증 = 가격 민감도 증가"
    },
    how: {
      tags: ["주유 루틴 시각화", "'매달 조용히 돌아오는 5%' 키비주얼", "보험 갱신 타이밍 캠페인"],
      dataEvidence: "주유 할인 콘텐츠 저장률 15%+ (카드 업계 평균)"
    },
    pathFinder: ["주유소 최저가", "싸고 좋은 주유소", "자동차보험 비교", "자동차 카드 추천"],
    cluster: ["주유소", "SK주유소", "GS칼텍스", "자동차보험 비교", "주유 할인"],
    relatedKeywords: [
      { term: "주유소", volume: 6273400, trend: 4.23 },
      { term: "자동차보험", volume: 2027600, trend: 0.0 },
      { term: "자동차보험 비교", volume: 1012100, trend: 0.05 },
      { term: "GS칼텍스", volume: 524990, trend: 1.8 },
      { term: "SK 주유소", volume: 305720, trend: 0.96 },
      { term: "다이렉트 자동차보험", volume: 476710, trend: 0.09 }
    ],
    contentHook: "차에 들어가는 돈, 조용히 5%씩 되돌려드립니다",
    painPoints: ["차가 오래 될수록 지출만 늘어", "보험료 매년 인상", "정비비 예측 불가"],
    uspConnection: "주유 5% (월 1만 한도) + 자동차보험 연 2만 + SK스피드메이트 연 1회 (실적無)"
  },
  {
    id: "AUTOSLIM-COVER-A3-1",
    personaId: "AUTOSLIM-COVER-A3",
    icon: "🔧",
    tier: "LARGE",
    card: "NEED AutoSlim",
    hookType: "COVER",
    title: "정비·소모품 교체 정기 유저",
    subtitle: "1년에 한 번, 엔진오일은 카드가 냅니다",
    description: "스피드메이트 105만 + 엔진오일 교환 22.6만 + 타이어 교체 25.9만 = 연 153만 검색. 30-50대 차 관리 민감형 — '예방 정비가 중요하다' 인식. 스피드메이트 현장할인은 실적 조건 없음 + 엔진오일 3만 + 타이어 30% 등 연 7-10만원.",
    annualVolume: 1530000,
    monthlyVolume: 127500,
    who: {
      tags: ["30-50대 예방 정비 중시", "자차 3-10년 소유", "보배드림·오토갤 활성 유저"],
      dataEvidence: "스피드메이트 직접 검색 연 105만 = 정비 주기 민감 차주"
    },
    what: {
      tags: ["스피드메이트 실적 조건 無", "엔진오일 3만 + 타이어 30% + 에어컨필터·부동액 1만"],
      dataEvidence: "SK스피드메이트 현장할인 실적 無 연 1회 = 카드 업계 유일 구조"
    },
    when: {
      tags: ["엔진오일 교환 주기 5-10천km", "타이어 4-5년 교체", "여름·겨울 앞 점검"],
      dataEvidence: "여름(7-8월)·겨울(11-12월) 정비 관련 검색 3배 피크"
    },
    where: {
      tags: ["스피드메이트 매장", "보배드림 정비 게시판", "오토갤러리 정보 공유"],
      dataEvidence: "스피드메이트 가맹점 전국 500개+, 검색 연 105만"
    },
    why: {
      tags: ["'엔진오일 가는데 왜 이렇게 비쌀까' 부담", "'믿을 만한 정비소' 찾기 피로"],
      dataEvidence: "정비 비용 검색에 '비싸다·바가지' 연관어 다수"
    },
    how: {
      tags: ["'1년에 한 번, 엔진오일은 카드가' 캠페인", "정비 주기 맞춤 리타깃팅"],
      dataEvidence: "정비 콘텐츠 시즌 맞춤 광고 CTR 평균 대비 2.5배"
    },
    pathFinder: ["엔진오일 교환", "스피드메이트 가격", "타이어 교체 시기", "NEED AutoSlim"],
    cluster: ["스피드메이트", "엔진오일", "타이어 교체", "자동차 정비", "정비 주기"],
    relatedKeywords: [
      { term: "스피드메이트", volume: 1050570, trend: -0.24 },
      { term: "엔진오일", volume: 890630, trend: -0.15 },
      { term: "타이어 교체", volume: 258990, trend: -0.38 },
      { term: "엔진오일 교환", volume: 225750, trend: -0.14 },
      { term: "자동차 정비", volume: 158370, trend: -0.14 }
    ],
    contentHook: "1년에 한 번, 엔진오일은 카드가 냅니다",
    painPoints: ["정비 비용 누적 부담", "타이어 교체 타이밍 불안", "실적 채워야 하는 카드 피로"],
    uspConnection: "SK스피드메이트 현장할인 (실적 조건 없음, 연 1회 최대 7-10만원)"
  },
  {
    id: "AUTOSLIM-COVER-A4-1",
    personaId: "AUTOSLIM-COVER-A4",
    icon: "🔵",
    tier: "LARGE",
    card: "NEED AutoSlim",
    hookType: "COVER",
    title: "LPG 차주 숨은 블루오션",
    subtitle: "LPG 차주를 위한, 국내 유일한 카드 혜택",
    description: "LPG 충전소 55.8만 + LPG 가격 28만 = 연 83.8만+ 검색. 전국 등록 LPG 차량 약 186만대. NEED AutoSlim 5% 혜택에 LPG 충전소가 포함되지만 어떤 카드사도 LPG 차주 전용 소구를 하지 않음. 완전 블루오션.",
    annualVolume: 838000,
    monthlyVolume: 69833,
    who: {
      tags: ["택시·영업용·상용차 소유자", "장애인·국가유공자 LPG 승용차", "연비·경제성 민감"],
      dataEvidence: "LPG 차량 186만대 = 택시 25만+ 영업용 80만+ 일반 80만+"
    },
    what: {
      tags: ["LPG 충전 5% (월 1만 한도)", "스피드메이트 + 보험 결합"],
      dataEvidence: "LPG 월 충전 20만 × 5% = 월 1만 한도 꽉 채움"
    },
    when: {
      tags: ["매일~주 2-3회 LPG 충전", "LPG 가격 시세 매일 확인"],
      dataEvidence: "LPG 가격 검색 +482% 급증 = 가격 민감도 최고"
    },
    where: {
      tags: ["LPG 충전소 앱", "LPG 차량 커뮤니티", "택시 기사 카페"],
      dataEvidence: "LPG 충전소 밀도 낮아 위치 검색 빈번"
    },
    why: {
      tags: ["'LPG 차는 늘 빼고 본다' 소외감", "연비 절감 열망", "보조금·세제 혜택 관심"],
      dataEvidence: "LPG 차주는 카드 혜택 소구에서 일관되게 배제됨"
    },
    how: {
      tags: ["'LPG 차주를 위한 유일한 카드' 포지셔닝", "택시 커뮤니티 제휴", "LPG 앱 내 배너"],
      dataEvidence: "블루오션 선점 광고 기존 경쟁자 대비 효율 2-3배"
    },
    pathFinder: ["LPG 충전소", "LPG 가격", "LPG 차량 카드", "NEED AutoSlim"],
    cluster: ["LPG", "LPG 충전소", "LPG 가격", "LPG 차주", "택시·영업용"],
    relatedKeywords: [
      { term: "lpg 충전소", volume: 558770, trend: 0.05 },
      { term: "lpg 가격", volume: 280400, trend: 4.82 }
    ],
    contentHook: "LPG 차주를 위한, 국내 유일한 카드 혜택",
    painPoints: ["카드 혜택 소구에서 늘 배제", "LPG 충전소 인프라 부족", "경제성 vs 혜택 딜레마"],
    uspConnection: "주유·충전 5% (LPG 충전소 포함, 월 1만 한도) — 경쟁자 無 블루오션"
  },

  // ========== 🟠 ACCENT 기회 5개 ==========
  {
    id: "AUTOSLIM-ACCENT-1",
    personaId: "ACCENT",
    icon: "🤔",
    tier: "MEDIUM",
    card: "NEED AutoSlim",
    hookType: "ACCENT",
    title: "오토할부 vs 카드할부 혼란 해소자",
    subtitle: "복잡한 할부를 슬림하게 — 카드 하나로 결제부터 혜택까지",
    description: "'오토할부 단점', '오토할부 vs 카드할부 차이', '자동차 할부 꿀팁' 등 소비자의 근본적 금융 리터러시 부족이 검색 클러스터 형성. KB가 '가장 쉬운 설명자' 포지셔닝 가능. '슬림(날씬한/간결한)' 용어가 페인포인트 해소 메타포.",
    annualVolume: 300000,
    monthlyVolume: 25000,
    who: {
      tags: ["신차 첫 구매자", "할부 상품 혼란층", "디시·클리앙 정보 탐색자"],
      dataEvidence: "'오토할부 vs 카드할부 차이' 검색 지속 증가"
    },
    what: {
      tags: ["할부 상품 해설 콘텐츠", "'슬림 할부' 용어 의미 교육"],
      dataEvidence: "금융 리터러시 향상 콘텐츠 공유율 높음"
    },
    when: {
      tags: ["신차 계약 직전 1-2주", "할부 상품 비교 시점"],
      dataEvidence: "계약 직전 커뮤니티 정보 탐색 급증"
    },
    where: {
      tags: ["디시 자동차갤", "클리앙 자동차 게시판", "네이버 카페 신차 정보"],
      dataEvidence: "자동차 커뮤니티 할부 관련 질문 월 수백 건"
    },
    why: {
      tags: ["복잡한 할부 상품 불안", "편법·꼼수 없는 단순한 설명 필요"],
      dataEvidence: "'할부 꿀팁' 검색에 '쉽게·알기 쉬운' 연관어 다수"
    },
    how: {
      tags: ["'오토할부 교과서' 콘텐츠 시리즈", "인포그래픽·유튜브 해설"],
      dataEvidence: "교육 콘텐츠 브랜드 호감도 +25% 개선 효과"
    },
    pathFinder: ["오토할부 단점", "오토할부 vs 카드할부 차이", "자동차 할부 꿀팁", "NEED AutoSlim"],
    cluster: ["오토할부", "카드할부", "자동차 할부 차이", "할부 단점", "할부 꿀팁"],
    relatedKeywords: [
      { term: "오토 할부", volume: 18780, trend: 0.5 },
      { term: "다이렉트 오토", volume: 18190, trend: 0.17 },
      { term: "자동차 할부금", volume: 20720, trend: 0.4 }
    ],
    contentHook: "복잡한 할부를 슬림하게 — 카드 하나로 결제부터 혜택까지",
    painPoints: ["할부 상품 복잡성", "편법·꼼수 없는 설명 부재", "전문 용어 장벽"],
    uspConnection: "KB '오토슬림' 네이밍 = '슬림(간결·단순)' 약속의 메타포"
  },
  {
    id: "AUTOSLIM-ACCENT-2",
    personaId: "ACCENT",
    icon: "📅",
    tier: "LARGE",
    card: "NEED AutoSlim",
    hookType: "ACCENT",
    title: "자동차세 납부 시즌 6월·12월 피크",
    subtitle: "자동차세 무이자 할부 + NEED AutoSlim 이중 혜택",
    description: "자동차세 연 108만 검색, 6·12·1월 피크 (1월 44만). NEED AutoSlim에 자동차세 직접 혜택은 없지만, 무이자 할부 + 고액 결제 유입 기회. 시즌 트래픽 유입으로 카드 주요 혜택 인지도 상승.",
    annualVolume: 1087200,
    monthlyVolume: 90600,
    who: {
      tags: ["전 연령 차량 소유자", "1-2기 자동차세 납부자", "연납 할인 활용자"],
      dataEvidence: "자동차세 검색 전 연령 균등"
    },
    what: {
      tags: ["무이자 할부 연계 프로모션", "고액 결제 시 자동 할부 안내"],
      dataEvidence: "자동차세 평균 30-60만원 → 3-6개월 무이자 니즈"
    },
    when: {
      tags: ["1월 연납 할인 (44만 검색)", "6월 1기 납부 (20만)", "12월 2기 납부 (20만)"],
      dataEvidence: "1·6·12월 검색 폭증, 평월 대비 3-10배"
    },
    where: {
      tags: ["위택스", "지방세 납부 홈페이지", "카드사 앱 무이자 할부"],
      dataEvidence: "위택스 월 방문자 시즌 500만+"
    },
    why: {
      tags: ["고액 일시 부담", "한 번에 내기 부담스러운 액수", "연납 할인 vs 분납 고민"],
      dataEvidence: "'자동차세 할부' 검색 시즌 피크"
    },
    how: {
      tags: ["1월 연납 광고 집중", "'자동차세 때 무이자로' 캠페인", "SMS 납부 리마인더"],
      dataEvidence: "시즌 타깃 광고 CPA 평월 대비 60% 낮음"
    },
    pathFinder: ["자동차세 납부", "자동차세 할부", "자동차세 무이자", "NEED AutoSlim"],
    cluster: ["자동차세", "자동차세 납부", "자동차세 연납", "자동차세 할부"],
    relatedKeywords: [
      { term: "자동차세", volume: 1087200, trend: -0.82 }
    ],
    contentHook: "자동차세 30만원, 6개월 무이자로 나누세요",
    painPoints: ["고액 일시 납부 부담", "연납 vs 분납 고민", "카드 무이자 정보 부족"],
    uspConnection: "무이자 할부 연계 시즌 캠페인 (직접 혜택 아님)"
  },
  {
    id: "AUTOSLIM-ACCENT-3",
    personaId: "ACCENT",
    icon: "🔍",
    tier: "MEDIUM",
    card: "NEED AutoSlim",
    hookType: "ACCENT",
    title: "다나와·카눈·겟차 견적 플랫폼 제휴",
    subtitle: "견적 받고 바로 오토슬림, 매달 2만원 돌려드립니다",
    description: "다나와 신차 견적·카눈 신차 견적·겟차 케어 등이 신차 구매 여정 디지털 필수 경유지. 케이카(K Car)는 이미 삼성카드 다이렉트 오토와 결합 — KB는 어떤 파트너 확보할지 전략 필요.",
    annualVolume: 200000,
    monthlyVolume: 16667,
    who: {
      tags: ["신차 견적 플랫폼 이용자", "온라인 견적 비교 20-40대"],
      dataEvidence: "다나와 신차 견적 등 3대 플랫폼 합산 월 5만+"
    },
    what: {
      tags: ["견적 플랫폼 제휴 배너", "원클릭 카드 발급 + 할부 연계"],
      dataEvidence: "삼성카드 다이렉트 오토 × 케이카 결합이 시장 선도"
    },
    when: {
      tags: ["견적 비교 단계 (계약 2-4주 전)", "최종 딜러 선택 시점"],
      dataEvidence: "견적 플랫폼 → 딜러 전환율 30%+"
    },
    where: {
      tags: ["다나와 자동차", "카눈", "겟차", "케이카 대체 파트너"],
      dataEvidence: "다나와 자동차 검색 월 50만+"
    },
    why: {
      tags: ["견적 단계에서 결제 카드 고민 시작", "원클릭 편의성 기대"],
      dataEvidence: "견적 플랫폼 내 카드 정보 콘텐츠 CTR 높음"
    },
    how: {
      tags: ["플랫폼 제휴 배너", "딥링크 캠페인", "원클릭 발급 플로우 구축"],
      dataEvidence: "제휴 플랫폼 광고 전환율 일반 광고 대비 3-5배"
    },
    pathFinder: ["다나와 신차 견적", "카눈 견적", "겟차", "NEED AutoSlim"],
    cluster: ["다나와", "카눈", "겟차", "신차 견적 비교", "온라인 견적"],
    relatedKeywords: [
      { term: "다나와 신차 견적", volume: 80000 },
      { term: "카눈 신차견적", volume: 50000 },
      { term: "겟차 신차견적", volume: 30000 }
    ],
    contentHook: "견적 받고 바로 오토슬림, 매달 2만원 돌려드립니다",
    painPoints: ["견적 → 계약 간극", "카드 발급 번거로움", "원클릭 경험 부재"],
    uspConnection: "오토 슬림할부 + 주유 5% 패키지 원클릭 제안"
  },
  {
    id: "AUTOSLIM-ACCENT-4",
    personaId: "ACCENT",
    icon: "🆕",
    tier: "MEDIUM",
    card: "NEED AutoSlim",
    hookType: "ACCENT",
    title: "신차 출고 직후 길들이기·썬팅 탐색자",
    subtitle: "신차 뽑으셨나요? 첫 엔진오일은 저희가 냅니다",
    description: "'신차 출고 후 할일', '신차 길들이기', '신차 썬팅', '신차 인수 절차' 등 정보 탐색 왕성. 신차 출고 직후 = 카드 사용 시작 시점 = 스피드메이트 첫 엔진오일·에어컨필터 교체 혜택 활용.",
    annualVolume: 150000,
    monthlyVolume: 12500,
    who: {
      tags: ["신차 출고 직후 1-2주", "첫 차 오너 감성 충만", "SNS 인증 성향"],
      dataEvidence: "'신차 출고 후 할일' 검색 클러스터 활성"
    },
    what: {
      tags: ["출고 직후 스피드메이트 첫 방문", "무료 엔진오일 3만원 혜택"],
      dataEvidence: "신차 출고 후 첫 엔진오일 교환 1-3개월 내 일반적"
    },
    when: {
      tags: ["출고 후 1-2주 (정보 탐색 피크)", "첫 엔진오일 교환 1-3개월 내"],
      dataEvidence: "출고 후 정보 탐색 '할일 리스트' 검색 집중"
    },
    where: {
      tags: ["딜러 출고 리플렛", "보배드림 신차 게시판", "유튜브 신차 인수 영상"],
      dataEvidence: "'신차 뽑고 이것만 하세요' 영상 평균 조회 10만+"
    },
    why: {
      tags: ["'이제 뭘 해야 하지?' 공허함", "정보 조각 수집 피로"],
      dataEvidence: "신차 출고 후 정보 과잉·혼란 표현 다수"
    },
    how: {
      tags: ["'신차 출고 체크리스트' 콘텐츠", "딜러 제휴 리플렛", "출고 후 SMS 안내"],
      dataEvidence: "체크리스트 콘텐츠 저장률 30%+ 높음"
    },
    pathFinder: ["신차 출고 후 할일", "신차 길들이기", "신차 썬팅 추천", "NEED AutoSlim"],
    cluster: ["신차 출고", "신차 길들이기", "신차 인수 절차", "신차 썬팅"],
    relatedKeywords: [
      { term: "신차 출고", volume: 80000 },
      { term: "신차 길들이기", volume: 30000 },
      { term: "신차 썬팅", volume: 40000 }
    ],
    contentHook: "신차 뽑으셨나요? 첫 엔진오일은 저희가 냅니다",
    painPoints: ["신차 출고 후 할일 혼란", "첫 정비 시점 판단 어려움"],
    uspConnection: "SK스피드메이트 현장할인 (실적 無, 엔진오일 3만원)"
  },
  {
    id: "AUTOSLIM-ACCENT-5",
    personaId: "ACCENT",
    icon: "🛞",
    tier: "LARGE",
    card: "NEED AutoSlim",
    hookType: "ACCENT",
    title: "타이어 교체 긴급 대응자",
    subtitle: "타이어 4짝 갈 때, KB가 한 짝 값 깎아드려요",
    description: "타이어 116만 + 타이어 교체 25.9만 = 연 151.8만 검색. 스피드메이트 직도입 타이어 30% 할인 혜택은 대부분 모름. 정확한 구매 의도(CEP)를 가진 순간 직접 공략.",
    annualVolume: 1424030,
    monthlyVolume: 118669,
    who: {
      tags: ["타이어 교체 주기 도래 (4-5년)", "안전 민감 차주"],
      dataEvidence: "타이어 교체 검색 지속 대량"
    },
    what: {
      tags: ["스피드메이트 직도입 타이어 30%", "실적 조건 없음"],
      dataEvidence: "타이어 4짝 50만원 × 30% = 15만원 할인"
    },
    when: {
      tags: ["타이어 마모 발견 직후", "겨울·여름 앞 교체 시즌", "차검 점검 후"],
      dataEvidence: "11-12월 겨울 타이어 교체 피크"
    },
    where: {
      tags: ["스피드메이트 매장", "타이어뱅크·한국타이어 직영", "보배드림 정비 후기"],
      dataEvidence: "타이어 교체 검색 → 매장 방문 전환율 40%+"
    },
    why: {
      tags: ["타이어 가격 최근 급등", "안전 vs 비용 딜레마", "정비소 바가지 우려"],
      dataEvidence: "타이어 가격 검색 +10%, 비용 부담 표현 증가"
    },
    how: {
      tags: ["'4짝 갈 때, 한 짝 값 깎기' 시각 광고", "타이어 주기 리타깃팅"],
      dataEvidence: "주기 맞춤 리타깃 CTR 일반 대비 2.5배"
    },
    pathFinder: ["타이어 교체", "타이어 가격", "스피드메이트 타이어", "NEED AutoSlim"],
    cluster: ["타이어", "타이어 교체", "타이어 교체 시기", "스피드메이트"],
    relatedKeywords: [
      { term: "타이어", volume: 1165040, trend: -0.32 },
      { term: "타이어 교체", volume: 258990, trend: -0.38 }
    ],
    contentHook: "타이어 4짝 갈 때, KB가 한 짝 값 깎아드려요",
    painPoints: ["타이어 가격 부담", "안전 vs 비용 갈등", "정비소 바가지 불안"],
    uspConnection: "SK스피드메이트 직도입 타이어 30% 할인 (실적 조건 無)"
  }
];

export const NEED_AUTOSLIM_OPPORTUNITIES = enrichWithMonthlyTrend(_RAW_NEED_AUTOSLIM_OPPORTUNITIES);

// ============================================================================
// 교차 인사이트
// ============================================================================

export const NEED_AUTOSLIM_CROSS_INSIGHTS = [
  {
    id: "autoslim-cross-1",
    icon: "⚡",
    card: "NEED AutoSlim",
    hookType: "Positioning-hook",
    title: "삼성카드 '다이렉트 오토'가 카테고리 독점 (연 8.7만 검색 +134%)",
    description: "자동차 카드 검색 대부분이 삼성카드 중심. KB '오토슬림'은 브랜드 인지도 약세(연 4,870). 삼성은 '할부만 되는 카드' 포지션, KB는 '할부 + 차생활 전부 되는 카드'로 차별화 가능.",
    implication: "용어 해설·교과서 콘텐츠로 포지셔닝 재건"
  },
  {
    id: "autoslim-cross-2",
    icon: "⚡",
    card: "NEED AutoSlim",
    hookType: "Hidden-hook",
    title: "LPG 차주 186만 대, 어떤 카드사도 LPG 전용 소구 안 함",
    description: "LPG 충전소 55.8만 + LPG 가격 28만 = 연 83.8만 검색. NEED AutoSlim 5%는 LPG 충전소 포함하지만, 현재 카드 마케팅에서 LPG 차주 타깃은 완전 부재. 블루오션 선점 기회.",
    implication: "'LPG 차주를 위한 국내 유일 카드' 포지셔닝"
  },
  {
    id: "autoslim-cross-3",
    icon: "⚡",
    card: "NEED AutoSlim",
    hookType: "Leverage-hook",
    title: "스피드메이트 105만 검색 = 실적 조건 없는 숨은 KSP",
    description: "스피드메이트 현장할인(엔진오일 3만·타이어 30%·에어컨필터 1만 등)은 전월 실적 조건 없이 연 1회 제공. 현재 마케팅에서 거의 언급 안 됨. 신규 발급 유도 핵심 훅으로 활용 가능.",
    implication: "'1년에 한 번, 엔진오일은 카드가' 캠페인 메인 축"
  }
];

// ============================================================================
// 전체 export
// ============================================================================

export const needAutoSlimData = {
  meta: {
    cardId: "NEED-AUTOSLIM",
    cardName: "NEED AutoSlim",
    cardTagline: "할부부터 차생활까지, 슬림하게",
    annualFee: 20000,
    monthlyRequirement: 400000,
    familyCard: "무료",
    version: "2.0",
    lastUpdate: "2026-04-20"
  },
  usps: NEED_AUTOSLIM_USPS,
  personas: NEED_AUTOSLIM_PERSONAS,
  opportunities: NEED_AUTOSLIM_OPPORTUNITIES,
  crossInsights: NEED_AUTOSLIM_CROSS_INSIGHTS
};

// ============================================================================
// 유틸 함수
// ============================================================================

export function getOpportunitiesByPersona(personaId) {
  return NEED_AUTOSLIM_OPPORTUNITIES.filter(o => o.personaId === personaId);
}

export function getCoverOpportunities() {
  return NEED_AUTOSLIM_OPPORTUNITIES.filter(o => o.hookType === "COVER");
}

export function getAccentOpportunities() {
  return NEED_AUTOSLIM_OPPORTUNITIES.filter(o => o.hookType === "ACCENT");
}

export function getOpportunityById(id) {
  return NEED_AUTOSLIM_OPPORTUNITIES.find(o => o.id === id);
}

export function getPersonaById(id) {
  return NEED_AUTOSLIM_PERSONAS.find(p => p.id === id);
}

export function getUSPById(id) {
  return NEED_AUTOSLIM_USPS.find(u => u.id === id);
}

export function getTotalAnnualVolume() {
  return NEED_AUTOSLIM_OPPORTUNITIES.reduce((sum, o) => sum + o.annualVolume, 0);
}

export function getOpportunityCount() {
  return NEED_AUTOSLIM_OPPORTUNITIES.length;
}

export default needAutoSlimData;
