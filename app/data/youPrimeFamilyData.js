/**
 * KB ALL·YOU·NEED AI Brandformance Engine
 * YOU Prime 가족팩 데이터 — v2.0 (2026.04.20)
 * 
 * 핵심: "엄마·아빠 공동 소비 페르소나" — 가족 생활 6개 영역 크로스 활용자
 * 가족팩 6개 영역: 생활요금 / 온라인장보기 / 일상케어 / 학원 / 대형마트 / 카페
 * 
 * 구조:
 * - USP_ASSETS: 6개 영역별 혜택 자산
 * - PERSONAS: COVER 4개 (엄마·아빠 공동 소비)
 * - OPPORTUNITIES: 9개 기회 (COVER 4 + ACCENT 5)
 */

// ============================================================================
// USP 자산 (YOU Prime 가족팩 — 6개 영역)
// ============================================================================

export const YOU_PRIME_FAMILY_USPS = [
  {
    id: "family-utilities",
    icon: "💡",
    title: "생활요금 10%",
    conditions: "아파트 관리비·전기·가스·수도 자동납부 10% · 월 1만원 한도",
    copy: "매달 고정 지출, 조용히 돌아오는 10%",
    strategy: "전기요금 70만 + 가계부 53만 + 관리비 검색 시장. 자동납부 락인",
    color: "#F59E0B"
  },
  {
    id: "family-groceries",
    icon: "🛒",
    title: "온라인 장보기 10%",
    conditions: "쿠팡 로켓프레시·마켓컬리·SSG·오아시스 10% · 월 1만원 한도",
    copy: "주간 장보기, 매달 1만원 환급",
    strategy: "마켓컬리 1,077만+쿠팡 로켓프레시 +117% 폭증 = 주간 루틴 침투",
    color: "#10B981"
  },
  {
    id: "family-care",
    icon: "🧺",
    title: "일상케어 10%",
    conditions: "세탁·청소·키즈카페·미용실·병원 10% · 월 1만원 한도",
    copy: "맞벌이 시간빈곤, 가족이 맡기는 10%",
    strategy: "크린토피아 282만+미소 79만+청소연구소 22만+키즈카페 246만",
    color: "#EC4899"
  },
  {
    id: "family-academy",
    icon: "📚",
    title: "학원 10%",
    conditions: "학습지·학원·예체능 10% · 월 1만원 한도 (NEED Edu와 별도)",
    copy: "학령기 가족의 학원비도 10%",
    strategy: "학습지 113만 + 학원 검색 + 일상케어 결합",
    color: "#8B5CF6"
  },
  {
    id: "family-mart",
    icon: "📦",
    title: "대형마트 10%",
    conditions: "이마트·롯데마트·코스트코·홈플러스 10% · 월 1만원 한도",
    copy: "코스트코·이마트 주말 장보기도 10%",
    strategy: "코스트코 1,689만 + 이마트 + SSG 416만 시장",
    color: "#3B82F6"
  },
  {
    id: "family-cafe",
    icon: "☕",
    title: "카페 10%",
    conditions: "스타벅스·투썸·이디야·키즈카페 10% · 월 1만원 한도",
    copy: "주말 가족 카페, 아이와 함께 10%",
    strategy: "키즈카페 246만 + 카페 일상 소비 결합",
    color: "#EF4444"
  }
];

// ============================================================================
// 페르소나 (COVER 4 — 엄마·아빠 공동 소비)
// ============================================================================

export const YOU_PRIME_FAMILY_PERSONAS = [
  {
    id: "FAMILY-COVER-1",
    icon: "⏰",
    title: "맞벌이 시간빈곤 부부",
    subtitle: "세탁·청소·키즈카페 외주 의존 — 돈으로 시간 사는 가족",
    description: "크린토피아 282만 + 미소 79만 + 청소연구소 22만 + 키즈카페 246만 = 일상케어 외주 629만 검색. 30-40대 맞벌이 부부가 시간 부족을 돈으로 메우는 구조. 일상케어 10%가 핵심 혜택.",
    linkedUSP: ["family-care", "family-groceries", "family-cafe"],
    annualSearchVolume: 6290000,
    opportunityCount: 1,
    color: "#EC4899",
    demoTags: ["30-40대 맞벌이", "자녀 1-2명", "외주 서비스 이용자", "시간 > 돈 가치관"]
  },
  {
    id: "FAMILY-COVER-2",
    icon: "📊",
    title: "살림 통합 관리형 부부",
    subtitle: "생활요금·장보기·관리비 한 카드 통합",
    description: "전기요금 70만 + 가계부 53만 + SSG 416만 = 자동납부·고정비 관리 시장 539만+. 가계부 앱 + 아파트 관리비 자동결제 + 주간 장보기 통합 관리하는 30-40대 엄마 주도 구조.",
    linkedUSP: ["family-utilities", "family-groceries", "family-mart"],
    annualSearchVolume: 5390000,
    opportunityCount: 1,
    color: "#F59E0B",
    demoTags: ["30-40대 엄마 주도", "아파트 거주", "가계부 앱 사용", "고정비 통합"]
  },
  {
    id: "FAMILY-COVER-3",
    icon: "📚",
    title: "학령기 가족",
    subtitle: "학습지·학원·일상케어 로테이션",
    description: "학습지 113만 + 학원 검색 + 일상케어 결합. 초등~중등 자녀 가정이 학원·학습지 정기 결제 + 일상 병원·미용실·키즈카페 결합 이용.",
    linkedUSP: ["family-academy", "family-care", "family-cafe"],
    annualSearchVolume: 3600000,
    opportunityCount: 1,
    color: "#8B5CF6",
    demoTags: ["30-50대 부모", "초등~중등 자녀", "학원 2개+ 병행", "주말 카페 외출"]
  },
  {
    id: "FAMILY-COVER-4",
    icon: "🛒",
    title: "스마트 장보기 전환 가족",
    subtitle: "쿠팡 로켓프레시 +117% 폭증, 마켓컬리 1,077만",
    description: "쿠팡 로켓프레시 +117% 폭증, 마켓컬리 1,077만 검색. 전통 마트에서 온라인·새벽배송으로 전환 중인 가족. 주간 장보기 루틴 온라인 이동.",
    linkedUSP: ["family-groceries", "family-mart"],
    annualSearchVolume: 20000000,
    opportunityCount: 1,
    color: "#10B981",
    demoTags: ["30-40대 가족", "온라인 장보기 전환", "주간 정기 결제", "편의성 민감"]
  },
  {
    id: "FAMILY-COVER-5",
    icon: "🐕",
    title: "반려동물과 사는 가족",
    subtitle: "또 다른 가족, 사료·병원·미용 월 정기 지출",
    description: "30-40대 기혼·싱글 양쪽에 걸친 새 세그먼트. 반려동물이 가족이자 월 지출 20-30만. 펫보험 +8% 성장 시장.",
    linkedUSP: ["family-groceries", "family-care", "family-utilities"],
    annualSearchVolume: 534000,
    opportunityCount: 1,
    color: "#10B981",
    demoTags: ["30-40대 기혼·싱글", "반려동물 동거", "월 지출 20-30만", "펫보험 대상"]
  },
  {
    id: "FAMILY-COVER-6",
    icon: "⚡",
    title: "워킹맘·워킹대디",
    subtitle: "시간이 없는 당신을 위한 압축 혜택",
    description: "유치원 알리장·반찬 배달·새벽배송·가사도우미로 매일 루틴을 압축하는 맞벌이 부모. FAMILY-COVER-1의 '외주 서비스'와 차별 — '매일 반복되는 가족 루틴' 관점.",
    linkedUSP: ["family-groceries", "family-care", "family-academy"],
    annualSearchVolume: 882580,
    opportunityCount: 1,
    color: "#8B5CF6",
    demoTags: ["맞벌이 30-40대 부모", "유치원·초등 자녀", "매일 루틴 압축 니즈", "시간 > 돈"]
  }
];

// ============================================================================
// 기회 9개 (COVER 4 + ACCENT 5)
// ============================================================================

export const YOU_PRIME_FAMILY_OPPORTUNITIES = [
  // ========== 🔵 COVER 페르소나 기회 4개 ==========
  {
    id: "FAMILY-COVER-1-1",
    personaId: "FAMILY-COVER-1",
    icon: "⏰",
    tier: "MEGA",
    card: "YOU Prime 가족팩",
    hookType: "COVER",
    title: "맞벌이 시간빈곤 부부 — 돈으로 시간 사는 가족",
    subtitle: "크린토피아·미소·청소연구소·키즈카페 629만 검색 시장",
    description: "크린토피아 282만 + 미소 79만 + 청소연구소 22만 + 키즈카페 246만 = 일상케어 외주 629만. 30-40대 맞벌이 부부가 시간 부족을 돈으로 메우는 구조. 가족팩 6개 영역 중 4개(일상케어·장보기·마트·카페) 자연 크로스.",
    annualVolume: 6290000,
    monthlyVolume: 524167,
    who: {
      tags: ["30-40대 맞벌이", "자녀 1-2명", "외주 서비스 이용자", "시간 > 돈 가치관"],
      dataEvidence: "크린토피아·미소·청소연구소 이용자 30-40대 맞벌이 70%+"
    },
    what: {
      tags: ["일상케어 10%", "세탁·청소·키즈카페 통합 환급"],
      dataEvidence: "월 세탁 10만+청소 20만+키즈카페 5만 = 35만 × 10% = 3.5만 → 캡 1만"
    },
    when: {
      tags: ["주말 외주 서비스 이용", "평일 퇴근 후 세탁소 픽업"],
      dataEvidence: "크린토피아 검색 주말 피크, 미소 검색 평일 저녁 피크"
    },
    where: {
      tags: ["크린토피아·미소·청소연구소 앱", "키즈카페 앱", "맘카페"],
      dataEvidence: "미소 MAU 150만+, 청소연구소 MAU 80만+"
    },
    why: {
      tags: ["시간 빈곤 심화", "'돈으로 시간 사는' 합리화", "부부 가사 분담 피로"],
      dataEvidence: "'외주 서비스' 검색 +35% 급증"
    },
    how: {
      tags: ["'시간을 사는 가족' 스토리텔링", "맞벌이 부부 브이로그"],
      dataEvidence: "맞벌이 라이프스타일 콘텐츠 공유율 22%"
    },
    pathFinder: ["크린토피아 가격", "미소 청소 후기", "청소연구소", "YOU Prime 가족팩"],
    cluster: ["크린토피아", "미소", "청소연구소", "키즈카페", "맞벌이"],
    relatedKeywords: [
      { term: "크린토피아", volume: 2820000, trend: 0.08 },
      { term: "키즈카페", volume: 2460000, trend: 0.12 },
      { term: "미소 청소", volume: 790000, trend: 0.18 },
      { term: "청소연구소", volume: 220000, trend: 0.22 }
    ],
    contentHook: "돈으로 시간 사는 가족, 매달 1만원 돌아옵니다",
    painPoints: ["시간 빈곤 피로", "가사 분담 갈등", "외주 서비스 고정비"],
    uspConnection: "일상케어 10% + 카페 10% + 대형마트 10% (시간빈곤 가족 4개 영역 커버)"
  },
  {
    id: "FAMILY-COVER-2-1",
    personaId: "FAMILY-COVER-2",
    icon: "📊",
    tier: "MEGA",
    card: "YOU Prime 가족팩",
    hookType: "COVER",
    title: "살림 통합 관리형 부부 — 고정비 한 카드 통합",
    subtitle: "전기요금 70만+가계부 53만+SSG 416만, 엄마 주도 관리",
    description: "가계부 앱 + 아파트 관리비 자동결제 + 주간 장보기 통합 관리하는 30-40대 엄마 주도 구조. 생활요금·장보기·대형마트 3개 영역 10% × 월 1만 = 월 3만 환급 가능.",
    annualVolume: 5390000,
    monthlyVolume: 449167,
    who: {
      tags: ["30-40대 엄마 주도", "아파트 거주", "가계부 앱 사용", "고정비 통합"],
      dataEvidence: "가계부 앱 MAU 1,100만+, 여성 60%+"
    },
    what: {
      tags: ["생활요금 10% + 장보기 10% + 대형마트 10%", "자동납부 락인"],
      dataEvidence: "월 관리비 30만 + 장보기 50만 + 마트 20만 = 월 3만 환급"
    },
    when: {
      tags: ["매달 고정 결제일", "연초 가계부 세팅"],
      dataEvidence: "가계부 앱 1월 신규 사용자 2배"
    },
    where: {
      tags: ["뱅크샐러드·브로콜리·편한가계부", "아파트 관리비 자동납부"],
      dataEvidence: "가계부 앱 월 MAU 1,100만+"
    },
    why: {
      tags: ["가계 통합 관리 욕구", "여러 카드 분산 피로"],
      dataEvidence: "'가계부 카드 추천' 검색 +28%"
    },
    how: {
      tags: ["'살림 통합 카드' 포지셔닝", "가계부 앱 광고 제휴"],
      dataEvidence: "가계부 앱 내 카드 추천 CTR 높음"
    },
    pathFinder: ["아파트 관리비 자동납부", "가계부 카드 추천", "SSG 할인", "YOU Prime 가족팩"],
    cluster: ["가계부", "아파트 관리비", "SSG", "생활요금", "자동납부"],
    relatedKeywords: [
      { term: "SSG", volume: 4160000, trend: -0.03 },
      { term: "전기요금", volume: 700000, trend: 0.15 },
      { term: "가계부", volume: 530000, trend: 0.08 }
    ],
    contentHook: "엄마가 정리하는 가계, 매달 3만원 돌아옵니다",
    painPoints: ["여러 카드 분산 피로", "고정비 관리 복잡성"],
    uspConnection: "생활요금 10% + 온라인 장보기 10% + 대형마트 10% (3개 영역 통합)"
  },
  {
    id: "FAMILY-COVER-3-1",
    personaId: "FAMILY-COVER-3",
    icon: "📚",
    tier: "LARGE",
    card: "YOU Prime 가족팩",
    hookType: "COVER",
    title: "학령기 가족 — 학습지·학원·일상케어 로테이션",
    subtitle: "초등~중등 자녀 가정의 교육 + 생활 결합",
    description: "학습지 113만 + 학원 검색 + 일상케어 결합. 초등~중등 자녀 가정이 학원·학습지 정기 결제 + 일상 병원·미용실·키즈카페 결합 이용. 가족팩의 학원 축 + 일상케어 축 크로스.",
    annualVolume: 3600000,
    monthlyVolume: 300000,
    who: {
      tags: ["30-50대 부모", "초등~중등 자녀", "학원 2개+ 병행", "주말 카페 외출"],
      dataEvidence: "학습지 검색 학부모 90%+"
    },
    what: {
      tags: ["학원 10% + 일상케어 10% + 카페 10%", "3개 영역 통합"],
      dataEvidence: "월 학원 50만 + 미용실 10만 + 카페 10만 = 월 3만 환급"
    },
    when: {
      tags: ["학기 중 주 2-3회 학원", "주말 가족 외출"],
      dataEvidence: "학원비 자동결제 매월 고정"
    },
    where: {
      tags: ["학습지 방문·온라인", "동네 학원", "키즈카페·패밀리 카페"],
      dataEvidence: "학습지 구독 가정 500만+"
    },
    why: {
      tags: ["교육 + 생활 통합 관리", "자녀 중심 지출 최적화"],
      dataEvidence: "학부모 카드 추천 검색 지속"
    },
    how: {
      tags: ["'학령기 가족 필수 카드' 메시지", "학부모 카페 제휴"],
      dataEvidence: "맘카페 학부모 카드 포스팅 지속 증가"
    },
    pathFinder: ["학습지 추천", "초등 학원", "가족 카드", "YOU Prime 가족팩"],
    cluster: ["학습지", "학원", "일상케어", "학령기 가족"],
    relatedKeywords: [
      { term: "학습지", volume: 1130000, trend: 0.05 },
      { term: "초등 학원", volume: 650000, trend: 0.08 }
    ],
    contentHook: "학원·학습지·미용실, 학령기 가족의 통합 카드",
    painPoints: ["교육 + 생활 분산 결제", "자녀 중심 지출 관리"],
    uspConnection: "학원 10% + 일상케어 10% + 카페 10% (학령기 가족 3개 영역)"
  },
  {
    id: "FAMILY-COVER-4-1",
    personaId: "FAMILY-COVER-4",
    icon: "🛒",
    tier: "MEGA",
    card: "YOU Prime 가족팩",
    hookType: "COVER",
    title: "스마트 장보기 전환 가족 — 마켓컬리 1,077만 + 쿠팡 로켓프레시 +117%",
    subtitle: "전통 마트 → 온라인·새벽배송 전환 중",
    description: "마켓컬리 1,077만 + 쿠팡 로켓프레시 +117% 급성장. 전통 마트에서 온라인·새벽배송으로 전환 중인 가족. 주간 장보기 루틴 온라인 이동. 장보기 + 대형마트 2개 영역 통합.",
    annualVolume: 20000000,
    monthlyVolume: 1666667,
    who: {
      tags: ["30-40대 가족", "온라인 장보기 전환", "주간 정기 결제", "편의성 민감"],
      dataEvidence: "마켓컬리 MAU 900만+, 쿠팡 로켓프레시 +117%"
    },
    what: {
      tags: ["온라인 장보기 10% + 대형마트 10%", "주간 정기 환급"],
      dataEvidence: "월 50만 × 10% = 5만 → 캡 1만"
    },
    when: {
      tags: ["주 1-2회 정기 주문", "새벽배송 전일 저녁"],
      dataEvidence: "마켓컬리 주문 주간 피크 화·목"
    },
    where: {
      tags: ["마켓컬리·쿠팡 로켓프레시·SSG·오아시스"],
      dataEvidence: "마켓컬리 MAU 900만+, 쿠팡 로켓프레시 MAU 1,500만+"
    },
    why: {
      tags: ["주간 장보기 루틴 온라인 이동", "마트 시간 절약"],
      dataEvidence: "온라인 장보기 전환 연 +30%"
    },
    how: {
      tags: ["'주간 정기 루틴 = 매달 1만원' 광고", "새벽배송 리뷰어 협업"],
      dataEvidence: "장보기 앱 내 카드 광고 CTR 5%+"
    },
    pathFinder: ["마켓컬리 할인", "쿠팡 로켓프레시", "새벽배송 카드", "YOU Prime 가족팩"],
    cluster: ["마켓컬리", "쿠팡 로켓프레시", "SSG", "오아시스", "새벽배송"],
    relatedKeywords: [
      { term: "마켓컬리", volume: 10770000, trend: 0.08 },
      { term: "쿠팡 로켓프레시", volume: 5200000, trend: 1.17 },
      { term: "SSG", volume: 4160000, trend: -0.03 }
    ],
    contentHook: "주간 장보기 루틴, 매달 1만원이 조용히 돌아옵니다",
    painPoints: ["마트 시간 소요", "새벽배송 고정비", "여러 앱 분산"],
    uspConnection: "온라인 장보기 10% + 대형마트 10% (스마트 장보기 가족)"
  },
  {
    id: "FAMILY-COVER-5",
    personaId: "FAMILY-COVER-5",
    icon: "🐕",
    tier: "LARGE",
    card: "YOU Prime 가족팩",
    hookType: "COVER",
    title: "또 다른 가족을 위한 YOU",
    subtitle: "반려견·반려묘도 가족, 사료·병원·미용 통합 혜택",
    description: "펫보험 연 44만+ (+8%) · 반려견 59만 · 반려묘 3.3만 검색. 30-40대 기혼·1인가구 양쪽에 걸친 새 세그먼트. 반려동물 월 고정 지출을 가족팩 영역으로 흡수.",
    annualVolume: 534000,
    monthlyVolume: 44500,
    seasonality: { type: "flat", description: "연중 안정, 사료·의료비 정기 결제" },
    who: {
      tags: ["30-40대 기혼·싱글", "반려동물과 동거", "반려동물 월 지출 20-30만", "펫보험 대상"],
      dataEvidence: "펫보험 가입자 대부분 30-40대, +8% 트렌드"
    },
    what: {
      tags: ["사료·용품 온라인쇼핑 10%", "동물병원·미용 일상케어 10%", "펫보험 자동납부"],
      dataEvidence: "월 사료 15만 + 병원·미용 10만 + 보험 3만 = 월 28만 × 10% = 2.8만 → 캡 1만"
    },
    when: {
      tags: ["사료 정기 구매", "월 1회 미용·분기별 병원", "펫보험 월납"],
      dataEvidence: "펫프렌즈 정기 구독 증가, 펫보험 가입 +8% 지속"
    },
    where: {
      tags: ["펫프렌즈·어바웃펫", "동물병원", "펫 미용샵", "펫보험 가입 페이지"],
      dataEvidence: "펫프렌즈 MAU 150만+"
    },
    why: {
      tags: ["반려동물이 가족", "고정 지출 혜택 니즈", "'우리 아이' 케어 의식"],
      dataEvidence: "반려동물 시장 연 10% 성장"
    },
    how: {
      tags: ["'또 다른 가족' 스토리텔링", "펫 인플루언서 협업"],
      dataEvidence: "펫 콘텐츠 공유율 15-20%"
    },
    pathFinder: ["펫보험 비교", "반려견 사료", "동물병원 비용", "YOU Prime 가족팩"],
    cluster: ["펫보험", "반려견", "반려묘", "반려동물"],
    relatedKeywords: [
      { term: "펫보험", volume: 443970, trend: 0.08 },
      { term: "반려견", volume: 590000 },
      { term: "반려동물 사료", volume: 3630 }
    ],
    contentHook: "또 다른 가족을 위한 YOU",
    painPoints: ["반려동물 고정 지출 급증", "펫 특화 카드 부재", "'우리 아이' 혜택 사각지대"],
    uspConnection: "온라인쇼핑 10% + 일상케어 10% + 생활요금 10% (반려동물 3대 영역)"
  },
  {
    id: "FAMILY-COVER-6",
    personaId: "FAMILY-COVER-6",
    icon: "⚡",
    tier: "LARGE",
    card: "YOU Prime 가족팩",
    hookType: "COVER",
    title: "시간이 없는 당신을 위한 압축 혜택",
    subtitle: "유치원 알림장·반찬 배달·새벽배송을 매일 쓰는 맞벌이 부모",
    description: "유치원 알리미 34만 + 새벽배송 32만 + 반찬 배달 13만 + 가사도우미 10만 = 연 88만 검색. 시간 빈곤 맞벌이 부모가 '매일 반복 루틴'을 압축하는 서비스 조합. FAMILY-COVER-1과 달리 '매일의 루틴' 축.",
    annualVolume: 882580,
    monthlyVolume: 73548,
    seasonality: { type: "flat", description: "연중 안정, 신학기 3·9월 소폭 상승" },
    who: {
      tags: ["맞벌이 30-40대 부모", "유치원·초등 자녀", "매일 루틴 압축 니즈"],
      dataEvidence: "유치원 알리미 검색 학부모 90%+, 새벽배송 맞벌이 50%+ 추정"
    },
    what: {
      tags: ["반찬 배달·새벽배송 장보기 10%", "학원 자동결제 10%", "가사도우미 일상케어 10%"],
      dataEvidence: "월 장보기 40만 + 학원 30만 + 가사 10만 = 월 80만 × 평균 10% = 월 8만 → 캡 월 3만(3개 영역)"
    },
    when: {
      tags: ["평일 저녁 식사 준비", "주간 정기 장보기", "월 1-2회 가사도우미"],
      dataEvidence: "새벽배송 주문 평일 저녁, 유치원 알리미 오후 3-5시 피크"
    },
    where: {
      tags: ["유치원 알리미 앱", "마켓컬리·쿠팡 새벽배송", "반찬 배달 플랫폼"],
      dataEvidence: "유치원 알리미 MAU 약 170만, 새벽배송 MAU 2,400만"
    },
    why: {
      tags: ["퇴근 후 저녁 준비 시간 부족", "'좋은 부모 콤플렉스' vs 현실"],
      dataEvidence: "'반찬 배달' 검색 평일 저녁 피크, 맞벌이 육아 스트레스 콘텐츠 조회 증가"
    },
    how: {
      tags: ["'퇴근 후 저녁' 브이로그 크리에이터", "맘카페 워킹맘 게시판 제휴"],
      dataEvidence: "워킹맘 브이로그 평균 완청률 85%+"
    },
    pathFinder: ["유치원 알리미", "반찬 배달", "가사도우미 비용", "YOU Prime 가족팩"],
    cluster: ["유치원 알리미", "반찬 배달", "새벽배송", "가사도우미"],
    relatedKeywords: [
      { term: "유치원 알리미", volume: 337240 },
      { term: "새벽배송", volume: 315910 },
      { term: "반찬 배달", volume: 126230 },
      { term: "가사도우미", volume: 103200, trend: 0.04 }
    ],
    contentHook: "시간이 없는 당신을 위한 압축 혜택",
    painPoints: ["퇴근 후 저녁 준비 시간 부족", "아이 학교 소통 + 일 병행 피로", "가사 외주 고정비 누적"],
    uspConnection: "온라인 장보기 10% + 일상케어 10% + 학원 10% (루틴 3대 영역)"
  },

  // ========== 🟠 ACCENT 기회 5개 ==========
  {
    id: "FAMILY-ACCENT-1",
    personaId: "ACCENT",
    icon: "💡",
    tier: "LARGE",
    card: "YOU Prime 가족팩",
    hookType: "ACCENT",
    title: "계절성 생활요금 위기",
    subtitle: "여름 냉방·겨울 난방비 폭증 시즌 타깃",
    description: "전기요금 70만 검색, 7-8월(냉방비)·12-2월(난방비) 피크. 계절 폭증 시즌 카드 혜택 관심 급증. 자동납부 락인 기회.",
    annualVolume: 700000,
    monthlyVolume: 58333,
    who: {
      tags: ["아파트 거주 가족", "월 관리비 30만+"],
      dataEvidence: "전기요금 검색 여름·겨울 3-4배 폭증"
    },
    what: {
      tags: ["생활요금 10% 환급", "자동납부 설정 유도"],
      dataEvidence: "월 30만 × 10% = 3만 → 캡 1만"
    },
    when: {
      tags: ["7-8월 냉방비", "12-2월 난방비"],
      dataEvidence: "계절 검색 피크 시 카드 검색 동반 증가"
    },
    where: {
      tags: ["아파트 관리비 앱", "전기요금 조회 사이트"],
      dataEvidence: "한전 관리비 조회 월 수백만"
    },
    why: {
      tags: ["계절 요금 충격", "자동납부 락인 유도"],
      dataEvidence: "'전기요금 폭탄' 검색 여름·겨울 급증"
    },
    how: {
      tags: ["시즌 타깃 광고", "자동납부 설정 가이드"],
      dataEvidence: "시즌 광고 전환율 +40%"
    },
    pathFinder: ["전기요금", "관리비", "여름 냉방비", "YOU Prime 가족팩"],
    cluster: ["전기요금", "관리비", "냉방비", "난방비"],
    relatedKeywords: [
      { term: "전기요금", volume: 700000, trend: 0.15 }
    ],
    contentHook: "여름·겨울 폭탄 요금, 10% 조용히 돌아옵니다",
    painPoints: ["계절 요금 충격", "자동납부 혜택 정보 부족"],
    uspConnection: "생활요금 10% (자동납부 락인)"
  },
  {
    id: "FAMILY-ACCENT-2",
    personaId: "ACCENT",
    icon: "👶",
    tier: "MEDIUM",
    card: "YOU Prime 가족팩",
    hookType: "ACCENT",
    title: "어린이보험 격전지 — CPC $8.09 고비용 시장",
    subtitle: "어린이보험 19.2만 검색, CPC 고비용 = 카드 결제 유도",
    description: "어린이보험 19.2만 검색 + CPC $8.09 = 매우 경쟁적 시장. 보험 가입 후 월 납입금 자동결제 시 카드 유도 기회.",
    annualVolume: 192000,
    monthlyVolume: 16000,
    who: {
      tags: ["0-6세 자녀 부모", "보험 가입 고려자"],
      dataEvidence: "어린이보험 검색 부모 주도 90%+"
    },
    what: {
      tags: ["보험료 자동결제 → 실적 + 환급"],
      dataEvidence: "보험은 일상케어 영역 아니지만 자동납부 시 실적 인정"
    },
    when: {
      tags: ["임신·출산 직후 보험 가입기"],
      dataEvidence: "어린이보험 검색 임신기 집중"
    },
    where: {
      tags: ["보험사 홈페이지", "임산부 카페"],
      dataEvidence: "어린이보험 비교 블로그 활성"
    },
    why: {
      tags: ["보험 + 카드 혜택 결합 니즈"],
      dataEvidence: "'어린이보험 카드' 검색 +18%"
    },
    how: {
      tags: ["임산부 타깃 광고", "보험 가입 가이드 콘텐츠"],
      dataEvidence: "임산부 맞춤 광고 전환율 높음"
    },
    pathFinder: ["어린이보험 비교", "태아보험", "어린이보험 자동납부", "YOU Prime 가족팩"],
    cluster: ["어린이보험", "태아보험", "보험 가입"],
    relatedKeywords: [
      { term: "어린이보험", volume: 192000, trend: 0.12 }
    ],
    contentHook: "어린이보험 월납 자동결제 + 가족팩 혜택",
    painPoints: ["보험 + 카드 혜택 정보 부족", "가입 후 관리"],
    uspConnection: "실적 적립 + 생활요금 자동납부 연계"
  },
  {
    id: "FAMILY-ACCENT-3",
    personaId: "ACCENT",
    icon: "🌙",
    tier: "LARGE",
    card: "YOU Prime 가족팩",
    hookType: "ACCENT",
    title: "새벽배송 급성장자 — 쿠팡 로켓프레시 +117%",
    subtitle: "새벽배송 루틴화 가족 — 새 습관, 새 혜택",
    description: "쿠팡 로켓프레시 +117% 폭증, 컬리 새벽배송 지속 성장. 새벽배송 가입 신규 유저 대상 카드 등록 유도. 장보기 영역 직접 혜택.",
    annualVolume: 5200000,
    monthlyVolume: 433333,
    who: {
      tags: ["신규 새벽배송 이용자", "맞벌이 가족"],
      dataEvidence: "쿠팡 로켓프레시 신규 가입 +117%"
    },
    what: {
      tags: ["새벽배송 10% 환급", "정기 주문 최적화"],
      dataEvidence: "월 30만 × 10% = 3만 → 캡 1만"
    },
    when: {
      tags: ["평일 저녁 주문", "주 1-2회 정기"],
      dataEvidence: "새벽배송 주문 평일 저녁 피크"
    },
    where: {
      tags: ["쿠팡·마켓컬리·SSG 앱"],
      dataEvidence: "새벽배송 MAU 2,400만+"
    },
    why: {
      tags: ["새 습관 형성기", "혜택 정보 수용 창"],
      dataEvidence: "신규 가입자 첫 3개월 유지율 결정"
    },
    how: {
      tags: ["신규 새벽배송 유저 타깃 광고"],
      dataEvidence: "신규 유저 광고 전환율 2배"
    },
    pathFinder: ["쿠팡 로켓프레시", "새벽배송 비교", "컬리 새벽배송", "YOU Prime 가족팩"],
    cluster: ["쿠팡 로켓프레시", "새벽배송", "마켓컬리 새벽배송"],
    relatedKeywords: [
      { term: "쿠팡 로켓프레시", volume: 5200000, trend: 1.17 }
    ],
    contentHook: "새벽배송 루틴, 매달 1만원 환급",
    painPoints: ["새벽배송 고정비", "카드 혜택 정보 부족"],
    uspConnection: "온라인 장보기 10%"
  },
  {
    id: "FAMILY-ACCENT-4",
    personaId: "ACCENT",
    icon: "📦",
    tier: "MEGA",
    card: "YOU Prime 가족팩",
    hookType: "ACCENT",
    title: "코스트코 대용량 충성층 — 연 1,689만 검색",
    subtitle: "월 1-2회 대량 장보기 가족의 고액 결제",
    description: "코스트코 1,689만 검색 = 대형마트 최대 브랜드. 회원제 연회비 + 월 1-2회 대량 결제 50-100만. 대형마트 10% 캡 완전 활용.",
    annualVolume: 16890000,
    monthlyVolume: 1407500,
    who: {
      tags: ["코스트코 회원 240만+", "대가족·대량 소비자"],
      dataEvidence: "코스트코 검색 30-40대 60%+"
    },
    what: {
      tags: ["대형마트 10% 환급", "월 1만 한도 꽉 채움"],
      dataEvidence: "월 80만 × 10% = 8만 → 캡 1만"
    },
    when: {
      tags: ["월 1-2회 대량 장보기", "주말 가족 외출"],
      dataEvidence: "코스트코 방문 주말 80%+"
    },
    where: {
      tags: ["코스트코 매장 15개", "코스트코 앱"],
      dataEvidence: "코스트코 연 방문자 3,500만+"
    },
    why: {
      tags: ["대량 구매 가격 경쟁력", "대가족 니즈"],
      dataEvidence: "코스트코 충성도 업계 최고"
    },
    how: {
      tags: ["코스트코 회원 타깃 광고", "대량 장보기 시뮬레이션"],
      dataEvidence: "코스트코 카드 리뷰 콘텐츠 인기"
    },
    pathFinder: ["코스트코 회원", "코스트코 가격", "코스트코 추천 상품", "YOU Prime 가족팩"],
    cluster: ["코스트코", "대형마트", "이마트", "트레이더스"],
    relatedKeywords: [
      { term: "코스트코", volume: 16890000, trend: 0.08 }
    ],
    contentHook: "코스트코 월 100만, 10% 돌아옵니다",
    painPoints: ["대량 결제 혜택 부족", "연회비 + 결제 이중 부담"],
    uspConnection: "대형마트 10%"
  },
  {
    id: "FAMILY-ACCENT-5",
    personaId: "ACCENT",
    icon: "🧺",
    tier: "LARGE",
    card: "YOU Prime 가족팩",
    hookType: "ACCENT",
    title: "세탁·청소 대행 아웃소싱 급성장",
    subtitle: "미소 +18%, 청소연구소 +22% — 신규 아웃소싱 세대",
    description: "미소 79만 +18%, 청소연구소 22만 +22%. 세탁 대행·청소 대행 아웃소싱이 30-40대 맞벌이 새 루틴. COVER 1과 중복되지만 단독 타깃으로도 강력.",
    annualVolume: 1010000,
    monthlyVolume: 84167,
    who: {
      tags: ["30-40대 맞벌이", "세탁·청소 아웃소싱 신규"],
      dataEvidence: "미소·청소연구소 신규 이용자 +20%+"
    },
    what: {
      tags: ["세탁·청소 대행 10% 환급"],
      dataEvidence: "월 10-20만 × 10% = 1-2만 → 캡 1만"
    },
    when: {
      tags: ["매주 세탁·2주 1회 청소 루틴"],
      dataEvidence: "미소 주간 정기 예약 비율 40%+"
    },
    where: {
      tags: ["미소·청소연구소·날라고 앱"],
      dataEvidence: "미소 MAU 150만+"
    },
    why: {
      tags: ["가사 아웃소싱 보편화", "시간 > 돈"],
      dataEvidence: "아웃소싱 시장 연 30% 성장"
    },
    how: {
      tags: ["미소 앱 제휴", "청소연구소 리뷰어 협업"],
      dataEvidence: "아웃소싱 서비스 광고 전환율 7%+"
    },
    pathFinder: ["미소 청소 후기", "청소연구소 가격", "세탁 대행", "YOU Prime 가족팩"],
    cluster: ["미소", "청소연구소", "세탁 대행", "청소 대행"],
    relatedKeywords: [
      { term: "미소 청소", volume: 790000, trend: 0.18 },
      { term: "청소연구소", volume: 220000, trend: 0.22 }
    ],
    contentHook: "미소·청소연구소 10%, 맞벌이의 한 장",
    painPoints: ["아웃소싱 고정비", "카드 혜택 정보 부족"],
    uspConnection: "일상케어 10%"
  }
];

// ============================================================================
// 교차 인사이트
// ============================================================================

export const YOU_PRIME_FAMILY_CROSS_INSIGHTS = [
  {
    id: "family-cross-1",
    icon: "⚡",
    card: "YOU Prime 가족팩",
    hookType: "Positioning-hook",
    title: "가족팩 DNA = '6개 영역 골고루' = 맞벌이·살림·학령기 통합",
    description: "YOU Prime 가족팩은 NEED 카드처럼 한 영역 집중이 아닌, 6개 영역 모두 5-10천원씩 최대 월 6만원 환급 설계. 진짜 타깃은 6개 영역 모두 쓰는 '멀티 라이프스타일' 가족.",
    implication: "'6개 영역 다 채우는 사람의 카드' 메시지 중심"
  },
  {
    id: "family-cross-2",
    icon: "⚡",
    card: "YOU Prime 가족팩",
    hookType: "Segment-hook",
    title: "맞벌이 시간빈곤 = 일상케어 외주 629만 급증 시장",
    description: "크린토피아+미소+청소연구소+키즈카페 = 629만 검색. 30-40대 맞벌이가 돈으로 시간 사는 구조. 가족팩의 일상케어 축이 가장 큰 기회.",
    implication: "일상케어를 가족팩의 메인 USP로 부각"
  },
  {
    id: "family-cross-3",
    icon: "⚡",
    card: "YOU Prime 가족팩",
    hookType: "Surge-hook",
    title: "쿠팡 로켓프레시 +117% 폭증 = 온라인 장보기 시장 재편",
    description: "주간 장보기 전통 마트에서 새벽배송으로 이동 중. 신규 유저 대상 카드 등록이 LTV 최적.",
    implication: "새벽배송 신규 가입 시즌 집중 타깃"
  }
];

// ============================================================================
// 전체 export
// ============================================================================

export const youPrimeFamilyData = {
  meta: {
    cardId: "YOU-PRIME-FAMILY",
    cardName: "YOU Prime 가족팩",
    cardTagline: "6개 영역 골고루, 가족 생활 전부를 커버",
    annualFee: 30000,
    monthlyRequirement: 400000,
    familyCard: "7,000원",
    version: "2.0",
    lastUpdate: "2026-04-20"
  },
  usps: YOU_PRIME_FAMILY_USPS,
  personas: YOU_PRIME_FAMILY_PERSONAS,
  opportunities: YOU_PRIME_FAMILY_OPPORTUNITIES,
  crossInsights: YOU_PRIME_FAMILY_CROSS_INSIGHTS
};

// ============================================================================
// 유틸 함수
// ============================================================================

export function getOpportunitiesByPersona(personaId) {
  return YOU_PRIME_FAMILY_OPPORTUNITIES.filter(o => o.personaId === personaId);
}

export function getCoverOpportunities() {
  return YOU_PRIME_FAMILY_OPPORTUNITIES.filter(o => o.hookType === "COVER");
}

export function getAccentOpportunities() {
  return YOU_PRIME_FAMILY_OPPORTUNITIES.filter(o => o.hookType === "ACCENT");
}

export function getOpportunityById(id) {
  return YOU_PRIME_FAMILY_OPPORTUNITIES.find(o => o.id === id);
}

export function getPersonaById(id) {
  return YOU_PRIME_FAMILY_PERSONAS.find(p => p.id === id);
}

export function getUSPById(id) {
  return YOU_PRIME_FAMILY_USPS.find(u => u.id === id);
}

export function getTotalAnnualVolume() {
  return YOU_PRIME_FAMILY_OPPORTUNITIES.reduce((sum, o) => sum + o.annualVolume, 0);
}

export function getOpportunityCount() {
  return YOU_PRIME_FAMILY_OPPORTUNITIES.length;
}

export default youPrimeFamilyData;
