/**
 * KB ALL·YOU·NEED AI Brandformance Engine
 * YOU Prime 일상팩 데이터 — v2.0 (2026.04.20)
 * 
 * 핵심: "1인 라이프스타일 크로스 페르소나" — 일상 6개 영역 골고루 활용자
 * 일상팩 6개 영역: 주유 / 배달 / 통신·보험·App / 온라인쇼핑 / 편의점 / 취미·자기관리
 * 
 * 구조:
 * - USP_ASSETS: 6개 영역별 혜택 자산
 * - PERSONAS: COVER 4개 (1인 가구 라이프스타일)
 * - OPPORTUNITIES: 7개 기회 (COVER 4 + ACCENT 3)
 */

// ============================================================================
// USP 자산 (YOU Prime 일상팩 — 6개 영역)
// ============================================================================

export const YOU_PRIME_DAILY_USPS = [
  {
    id: "daily-fuel",
    icon: "⛽",
    title: "주유 10%",
    conditions: "SK·GS·현대오일뱅크 주유소 10% · 월 1만원 한도",
    copy: "출퇴근 주유비, 매달 1만원 환급",
    strategy: "주유소 627만 검색 + 전기차 충전 확장",
    color: "#F59E0B"
  },
  {
    id: "daily-delivery",
    icon: "🛵",
    title: "배달 10%",
    conditions: "배달의민족·쿠팡이츠·요기요 10% · 월 1만원 한도",
    copy: "1인 가구 배달 루틴, 매달 1만원",
    strategy: "배민·쿠팡이츠 월 376만 검색 = 1인 가구 핵심 루틴",
    color: "#EF4444"
  },
  {
    id: "daily-telecom-app",
    icon: "📱",
    title: "통신·보험·App 10%",
    conditions: "통신비·자동차보험·실손보험·App 결제 10% · 월 1만원 한도",
    copy: "매달 고정 결제, 자동 환급",
    strategy: "통신비 자동납부 + App 결제 통합 락인",
    color: "#3B82F6"
  },
  {
    id: "daily-online-shop",
    icon: "🛒",
    title: "온라인쇼핑 10%",
    conditions: "쿠팡·네이버쇼핑·11번가·G마켓 10% · 월 1만원 한도",
    copy: "쿠팡·네이버 월 쇼핑, 1만원 환급",
    strategy: "쿠팡 월 380만+ 검색 + 네이버쇼핑 결합",
    color: "#10B981"
  },
  {
    id: "daily-convenience",
    icon: "🏪",
    title: "편의점 10%",
    conditions: "CU·GS25·세븐일레븐·이마트24 10% · 월 1만원 한도",
    copy: "1인 가구 편의점 루틴 10%",
    strategy: "편의점 일상 결제 락인",
    color: "#8B5CF6"
  },
  {
    id: "daily-self-care",
    icon: "🧘",
    title: "취미·자기관리 5%",
    conditions: "필라테스·헬스장·미용실·OTT·학원 5% · 월 1만원 한도",
    copy: "필라테스·미용실 자기관리도 5%",
    strategy: "필라테스 273만+미용실 1,445만 = 1,800만+ 시장",
    color: "#EC4899"
  }
];

// ============================================================================
// 페르소나 (COVER 4 — 1인 가구 라이프스타일)
// ============================================================================

export const YOU_PRIME_DAILY_PERSONAS = [
  {
    id: "DAILY-COVER-1",
    icon: "🚗",
    title: "차 있는 1인가구",
    subtitle: "내 반경은 내가 정한다 — 경차·차박·가성비 싱글",
    description: "경차·소형SUV·중고차 소유 20후~40대 싱글. 주말 근교 차박·당일 드라이브·택배 싣고 오기. 차박 74만 + 원룸 55만 + 자취 28.9만 + 경차 차박 클러스터 = 교차 모집단 약 100만+. 6개 영역 자연 커버.",
    linkedUSP: ["daily-fuel", "daily-convenience", "daily-delivery", "daily-online-shop", "daily-telecom-app"],
    annualSearchVolume: 1000000,
    opportunityCount: 1,
    color: "#F59E0B",
    demoTags: ["20후~40대 싱글", "경차·소형SUV·중고차", "주말 차박·드라이브", "자취·원룸 거주"]
  },
  {
    id: "DAILY-COVER-2",
    icon: "🧘",
    title: "필라테스·미용실 자기관리 1인가구",
    subtitle: "나에게 투자하는 사람의 카드가 따로 있다",
    description: "20후~30대 여성 중심, 주 2-3회 필라테스·월 1-2회 미용실·집에선 홈트·다이어트 식단. 필라테스 273만 + 미용실 1,445만 + 홈트 98만 = 합 1,800만+ (일상팩 취미·자기관리 영역 최대).",
    linkedUSP: ["daily-self-care", "daily-delivery", "daily-online-shop", "daily-convenience"],
    annualSearchVolume: 18000000,
    opportunityCount: 1,
    color: "#EC4899",
    demoTags: ["20후~30대 여성 중심", "주 2-3회 필라테스", "홈트·다이어트", "자기투자 라이프"]
  },
  {
    id: "DAILY-COVER-3",
    icon: "💻",
    title: "풀재택 IT 전문직 1인가구",
    subtitle: "집에서 일하는데 카드는 '외근 카드'면 안 되잖아요",
    description: "30대 중심 IT 개발자·디자이너·스타트업·프리랜서·크리에이터. 집이 곧 사무실. 재택근무 17만 (2026.3 월 30,700 역대 최대 폭증 🔥) + 풀재택·리모트 워크 클러스터. 2026 재택 제도 재확산.",
    linkedUSP: ["daily-telecom-app", "daily-delivery", "daily-convenience", "daily-online-shop", "daily-self-care"],
    annualSearchVolume: 170000,
    opportunityCount: 1,
    color: "#3B82F6",
    demoTags: ["30대 IT 전문직", "풀재택·리모트", "홈오피스 구축", "집=비즈니스 인프라"]
  },
  {
    id: "DAILY-COVER-4",
    icon: "🐕",
    title: "반려동물과 사는 1인가구",
    subtitle: "혼자 사는 건 아니잖아요 — 반려 가족이 있는 1인 생활",
    description: "20후~40 1인 가구 + 반려견·반려묘 동거. 반려동물이 가족이자 월 지출 20-30%. 반려견 59만 + 반려묘 3.3만 + 1인가구·원룸 교차 = 약 30-50만. 6개 영역 자연 커버 + 반려동물보험 연결점.",
    linkedUSP: ["daily-online-shop", "daily-self-care", "daily-delivery", "daily-telecom-app"],
    annualSearchVolume: 500000,
    opportunityCount: 1,
    color: "#10B981",
    demoTags: ["20후~40 1인 가구", "반려견·반려묘 동거", "반려동물 월 지출 20-30%", "펫보험 대상"]
  }
];

// ============================================================================
// 기회 7개 (COVER 4 + ACCENT 3)
// ============================================================================

export const YOU_PRIME_DAILY_OPPORTUNITIES = [
  // ========== 🔵 COVER 페르소나 기회 4개 ==========
  {
    id: "DAILY-COVER-1-1",
    personaId: "DAILY-COVER-1",
    icon: "🚗",
    tier: "LARGE",
    card: "YOU Prime 일상팩",
    hookType: "COVER",
    title: "차 있는 1인가구 — 내 반경은 내가 정한다",
    subtitle: "경차·차박·가성비 싱글, 5개 영역 자연 커버",
    description: "경차·소형SUV·중고차 소유 20후~40대 싱글. 주말 근교 차박·당일 드라이브·택배 싣고 오기. 차박 74만 + 원룸·자취 55만 = 모집단 100만+. 주유+편의점+배달+온라인쇼핑+App 5개 영역 자연 크로스.",
    annualVolume: 1000000,
    monthlyVolume: 83333,
    who: {
      tags: ["20후~40대 싱글", "경차·소형SUV·중고차", "주말 차박·드라이브", "자취·원룸 거주"],
      dataEvidence: "차박·자취·경차 교차 검색자 약 100만+"
    },
    what: {
      tags: ["주유 10%", "편의점 10%", "온라인쇼핑 10%", "통신·App 10%", "취미 5%"],
      dataEvidence: "5개 영역 × 월 1만 = 월 5만 환급, 연 60만 잠재"
    },
    when: {
      tags: ["주말 근교 차박·드라이브", "평일 퇴근길 편의점", "주간 쿠팡 주문"],
      dataEvidence: "주말 차박 검색 금·토 피크"
    },
    where: {
      tags: ["SK·GS 주유소", "고속도로 편의점", "쿠팡·캠핑 용품 온라인"],
      dataEvidence: "차박 커뮤니티 활성 (네이버 카페 500만+ 회원)"
    },
    why: {
      tags: ["'차 하나로 생활 반경 10배'", "가성비 평탄화 싱글"],
      dataEvidence: "'경차 차박' 검색 연 +45%"
    },
    how: {
      tags: ["차박·드라이브 크리에이터 협업", "유튜브 차박 채널 타깃"],
      dataEvidence: "차박 유튜브 채널 평균 구독 10만+"
    },
    pathFinder: ["경차 차박", "주말 드라이브 코스", "원룸 자취 살림", "YOU Prime 일상팩"],
    cluster: ["차박", "경차", "자취", "원룸", "주말 드라이브"],
    relatedKeywords: [
      { term: "차박", volume: 740000, trend: 0.22 },
      { term: "원룸", volume: 550000, trend: 0.05 },
      { term: "자취", volume: 289000, trend: 0.08 }
    ],
    contentHook: "차 하나 있으면 생활 반경 10배, 카드도 그만큼 넓어야",
    painPoints: ["주유비 + 차박 용품 고정 지출", "6개 영역 카드 분산"],
    uspConnection: "주유 10% + 편의점 10% + 온라인쇼핑 10% + 통신·App 10% + 취미 5% (5개 영역 자연 커버)"
  },
  {
    id: "DAILY-COVER-2-1",
    personaId: "DAILY-COVER-2",
    icon: "🧘",
    tier: "MEGA",
    card: "YOU Prime 일상팩",
    hookType: "COVER",
    title: "필라테스·미용실 자기관리 1인가구 — 1,800만+ 시장",
    subtitle: "나에게 투자하는 사람의 카드가 따로 있다",
    description: "20후~30대 여성 중심, 주 2-3회 필라테스·월 1-2회 미용실·집에선 홈트·다이어트 식단. 필라테스 273만 + 미용실 1,445만 + 홈트 98만 = 합 1,800만+. 일상팩 취미·자기관리 영역 최대 시장.",
    annualVolume: 18000000,
    monthlyVolume: 1500000,
    who: {
      tags: ["20후~30대 여성 중심", "주 2-3회 필라테스", "홈트·다이어트", "자기투자 라이프"],
      dataEvidence: "필라테스·미용실 검색 여성 80%+, 20-30대 70%+"
    },
    what: {
      tags: ["취미·자기관리 5%", "배달 10%", "온라인쇼핑 10%", "편의점 10%"],
      dataEvidence: "필라테스 20만 × 5% + 미용실 10만 × 5% + 다이어트 식단 배달 = 월 2-3만 환급"
    },
    when: {
      tags: ["주 2-3회 필라테스", "월 1-2회 미용실", "매일 홈트·식단"],
      dataEvidence: "필라테스 검색 1월·9월 결심기 피크"
    },
    where: {
      tags: ["필라테스 스튜디오 전국 5,000개+", "미용실", "무신사·룰루레몬", "다이어트 식단 배달 앱"],
      dataEvidence: "필라테스 스튜디오 전국 5,000개+"
    },
    why: {
      tags: ["자기 투자 욕구", "'나에게 쓰는 돈' 합리화"],
      dataEvidence: "'나를 위한 소비' 검색 +28%"
    },
    how: {
      tags: ["필라테스·뷰티 인플루언서 협업", "자기관리 브이로그 제휴"],
      dataEvidence: "뷰티·헬스 인플루언서 광고 CTR 평균 4-6배"
    },
    pathFinder: ["필라테스 가격", "미용실 추천", "홈트 루틴", "YOU Prime 일상팩"],
    cluster: ["필라테스", "미용실", "홈트", "다이어트 식단", "자기관리"],
    relatedKeywords: [
      { term: "미용실", volume: 14450000, trend: 0.05 },
      { term: "필라테스", volume: 2730000, trend: 0.15 },
      { term: "홈트", volume: 980000, trend: 0.12 }
    ],
    contentHook: "나에게 투자하는 사람의 카드가 따로 있다",
    painPoints: ["자기관리 고정 지출", "여러 영역 분산", "혜택 부족 체감"],
    uspConnection: "취미·자기관리 5% + 배달 10% + 온라인쇼핑 10% + 편의점 10% (자기관리 라이프 4개 영역)"
  },
  {
    id: "DAILY-COVER-3-1",
    personaId: "DAILY-COVER-3",
    icon: "💻",
    tier: "MEDIUM",
    card: "YOU Prime 일상팩",
    hookType: "COVER",
    title: "풀재택 IT 전문직 1인가구 — 재택근무 월 30,700 역대 최대",
    subtitle: "집에서 일하는데 카드는 '외근 카드'면 안 되잖아요",
    description: "30대 중심 IT 개발자·디자이너·스타트업·프리랜서·크리에이터. 집이 곧 사무실. 재택근무 17만 (2026.3 월 30,700 역대 최대 폭증 🔥). 2026 재택 제도 재확산 트렌드. App·배달·편의점·온라인쇼핑 5개 영역 풀 활용.",
    annualVolume: 170000,
    monthlyVolume: 14167,
    who: {
      tags: ["30대 IT 전문직", "풀재택·리모트", "홈오피스 구축", "집=비즈니스 인프라"],
      dataEvidence: "재택근무 검색 2026.3 월 30,700 역대 최대"
    },
    what: {
      tags: ["App·통신 10%", "배달 10%", "편의점 10%", "온라인쇼핑 10%", "취미 5%"],
      dataEvidence: "5개 영역 풀 활용, 월 최대 5만 환급"
    },
    when: {
      tags: ["매일 평일 9-6 재택 근무", "점심·저녁 배달", "야근 편의점"],
      dataEvidence: "재택근무자 배달 일 2회+ 이용 40%"
    },
    where: {
      tags: ["집 책상", "근처 편의점·카페", "쿠팡·SSG 온라인"],
      dataEvidence: "재택근무자 소비 반경 반경 1km 이내"
    },
    why: {
      tags: ["'외근 카드 아닌 내 카드' 니즈", "재택 특화 혜택 부재"],
      dataEvidence: "'재택근무 카드' 검색 +55%"
    },
    how: {
      tags: ["재택근무 크리에이터 협업", "홈오피스 브이로그 타깃"],
      dataEvidence: "재택 라이프스타일 콘텐츠 공유율 18%"
    },
    pathFinder: ["재택근무", "리모트 워크", "홈오피스 구축", "YOU Prime 일상팩"],
    cluster: ["재택근무", "리모트", "홈오피스", "프리랜서"],
    relatedKeywords: [
      { term: "재택근무", volume: 170000, trend: 0.8 }
    ],
    contentHook: "집에서 일하는데 카드는 '외근 카드'면 안 되잖아요",
    painPoints: ["재택 특화 카드 부재", "주유 혜택 쓸 일 없음"],
    uspConnection: "App·통신 10% + 배달 10% + 편의점 10% + 온라인쇼핑 10% + 취미 5% (재택 5개 영역)"
  },
  {
    id: "DAILY-COVER-4-1",
    personaId: "DAILY-COVER-4",
    icon: "🐕",
    tier: "LARGE",
    card: "YOU Prime 일상팩",
    hookType: "COVER",
    title: "반려동물과 사는 1인가구",
    subtitle: "혼자 사는 건 아니잖아요 — 반려 가족이 있는 1인 생활",
    description: "20후~40 1인 가구 + 반려견·반려묘 동거. 반려동물이 가족이자 월 지출 20-30%. 반려견 59만 + 반려묘 3.3만 + 1인가구·원룸 교차 = 약 30-50만. 사료·용품 온라인쇼핑 + 병원·미용 자기관리 영역 중심.",
    annualVolume: 500000,
    monthlyVolume: 41667,
    who: {
      tags: ["20후~40 1인 가구", "반려견·반려묘 동거", "월 지출 20-30%", "펫보험 대상"],
      dataEvidence: "반려견 59만 + 반려묘 3.3만 × 1인가구 교차"
    },
    what: {
      tags: ["온라인쇼핑 10% (사료·용품)", "취미·자기관리 5% (병원·미용)", "App·펫보험"],
      dataEvidence: "월 사료·용품 15만 + 병원·미용 10만 = 월 2.5만 환급"
    },
    when: {
      tags: ["사료·패드 정기 결제", "월 1회 미용·분기별 병원"],
      dataEvidence: "반려동물 정기결제 증가 추세"
    },
    where: {
      tags: ["펫프렌즈·어바웃펫 앱", "동물병원", "펫샵·미용실"],
      dataEvidence: "펫프렌즈 MAU 150만+"
    },
    why: {
      tags: ["반려동물이 가족", "고정 지출 혜택 니즈"],
      dataEvidence: "반려동물 시장 연 10% 성장"
    },
    how: {
      tags: ["펫 인플루언서 협업", "반려동물 브이로그 타깃"],
      dataEvidence: "펫 콘텐츠 공유율 15-20%"
    },
    pathFinder: ["반려견 사료", "반려동물 보험", "동물병원 비용", "YOU Prime 일상팩"],
    cluster: ["반려견", "반려묘", "반려동물", "펫보험"],
    relatedKeywords: [
      { term: "반려견", volume: 590000, trend: 0.05 },
      { term: "반려묘", volume: 33000, trend: 0.08 }
    ],
    contentHook: "혼자 사는 건 아니잖아요 — 반려 가족이 있는 1인 생활",
    painPoints: ["반려동물 고정 지출 부담", "펫 특화 카드 부재"],
    uspConnection: "온라인쇼핑 10% + 취미·자기관리 5% + App 10% (반려동물 라이프)"
  },

  // ========== 🟠 ACCENT 기회 3개 ==========
  {
    id: "DAILY-ACCENT-1",
    personaId: "ACCENT",
    icon: "⚡",
    tier: "MEGA",
    card: "YOU Prime 일상팩",
    hookType: "ACCENT",
    title: "전기차 전환자 — 기름값에서 해방된 사람",
    subtitle: "2026 전기차 확산기, 충전비도 10% 돌아오는 카드",
    description: "전기차 관련 170만+ / 중고전기차 15만+ / 하이브리드 9.2만 / 환경부 카드 40만+. 2026 전기차 확산기. 주유 영역 혜택이 충전에도 적용되면 강력 차별화. 환경부 충전카드 개편 이후 대체 수요 명확.",
    annualVolume: 1700000,
    monthlyVolume: 141667,
    who: {
      tags: ["전기차 소유·구매 검토자", "환경부 충전카드 대체 니즈", "내연차·전기차 혼합 가구"],
      dataEvidence: "전기차 검색 남성 60%+, 30-50대 70%"
    },
    what: {
      tags: ["주유 10% + 충전 10% (확인 필요)", "환경부 카드 대체"],
      dataEvidence: "월 충전 10만 × 10% = 1만원 한도"
    },
    when: {
      tags: ["전기차 구매 직후", "환경부 카드 개편기"],
      dataEvidence: "전기차 구매 검색 상반기 피크"
    },
    where: {
      tags: ["전기차 충전소", "전기차 커뮤니티", "환경부 카드 발급"],
      dataEvidence: "전기차 커뮤니티 네이버 카페 100만+"
    },
    why: {
      tags: ["기름값 해방 욕구", "충전비 혜택 부재"],
      dataEvidence: "전기차 충전 혜택 검색 +45%"
    },
    how: {
      tags: ["'기름값 끝, 충전비도 10%' 캠페인", "전기차 커뮤니티 제휴"],
      dataEvidence: "전기차 오너 콘텐츠 공유율 높음"
    },
    pathFinder: ["전기차 혜택", "전기차 충전카드", "환경부 카드 대체", "YOU Prime 일상팩"],
    cluster: ["전기차", "중고전기차", "하이브리드", "환경부 카드"],
    relatedKeywords: [
      { term: "전기차", volume: 1700000, trend: 0.25 },
      { term: "중고전기차", volume: 150000, trend: 0.35 },
      { term: "환경부 카드", volume: 400000, trend: 0.15 }
    ],
    contentHook: "기름값은 끝, 충전비도 10% 돌아오는 카드",
    painPoints: ["충전비 혜택 부재", "환경부 카드 개편 혼란"],
    uspConnection: "주유 10% (전기차 충전소 적용 여부 상품설명서 확인)"
  },
  {
    id: "DAILY-ACCENT-2",
    personaId: "ACCENT",
    icon: "🍕",
    tier: "LARGE",
    card: "YOU Prime 일상팩",
    hookType: "ACCENT",
    title: "배달비 분노 헤비 유저 — 구독 피로·가격 분노층",
    subtitle: "배달비 분노가 월마다? 카드 하나로 1만원 되돌려",
    description: "쿠팡이츠 와우 구독료 부담·배민클럽 탈퇴 검토자·배달비 인상 분노층. 2025-2026 배달비 부담이 사회적 이슈. 월 10만 배달비 사용자가 월 한도 1만 꽉 채우는 전형.",
    annualVolume: 450000,
    monthlyVolume: 37500,
    who: {
      tags: ["배달 월 10만+ 사용자", "배민클럽·쿠팡이츠 구독 피로층"],
      dataEvidence: "배달비 관련 불만 검색 +42%"
    },
    what: {
      tags: ["배달 10%", "월 1만 환급 완전 활용"],
      dataEvidence: "월 배달 10만 × 10% = 1만 → 캡 꽉 참"
    },
    when: {
      tags: ["평일 저녁·주말", "배달비 인상 공지 직후"],
      dataEvidence: "배달비 인상 공지 시 분노 검색 급증"
    },
    where: {
      tags: ["배달의민족·쿠팡이츠·요기요 앱"],
      dataEvidence: "배달 앱 MAU 통합 3,000만+"
    },
    why: {
      tags: ["배달비 누적 분노", "구독 피로 임계점"],
      dataEvidence: "'배달비 분노' 검색 증가"
    },
    how: {
      tags: ["'배달비 분노 = 월 1만원 환급' 직설적 메시지"],
      dataEvidence: "분노 공감 광고 CTR 높음"
    },
    pathFinder: ["배달비 분노", "배민클럽 탈퇴", "쿠팡이츠 와우 대안", "YOU Prime 일상팩"],
    cluster: ["배달비 분노", "배민클럽", "쿠팡이츠 와우", "구독 피로"],
    relatedKeywords: [
      { term: "배달비", volume: 300000, trend: 0.3 },
      { term: "배민클럽", volume: 1200000, trend: 0.15 }
    ],
    contentHook: "배달비 분노가 월마다? 카드 하나로 1만원 되돌려",
    painPoints: ["배달비 누적 부담", "구독 피로", "혜택 부재"],
    uspConnection: "배달 10% (월 1만 캡 완전 활용)"
  },
  {
    id: "DAILY-ACCENT-3",
    personaId: "ACCENT",
    icon: "🥗",
    tier: "MEDIUM",
    card: "YOU Prime 일상팩",
    hookType: "ACCENT",
    title: "다이어트 식단 배달러 — 건강 투자 싱글",
    subtitle: "샐러드·단백질 배달도 10% — 몸에 좋은 돈, 카드에도 좋은 돈",
    description: "다이어트음식 53만 + 샐러드배달 5.5만 + 단백질식단 8만 = 연 67만 검색. COVER 2(필라테스 자기관리)와 자연 연결되는 페르소나 + 기회 크로스. '건강식 = 자기관리 투자' 프리미엄 포지셔닝.",
    annualVolume: 670000,
    monthlyVolume: 55833,
    who: {
      tags: ["20-30대 자기관리 싱글", "다이어트·단백질식단 정기 배달"],
      dataEvidence: "다이어트음식 배달 20-30대 여성 70%"
    },
    what: {
      tags: ["배달 10% + 자기관리 5%", "이중 혜택"],
      dataEvidence: "COVER 2와 크로스 = 배달 + 자기관리 양쪽 환급"
    },
    when: {
      tags: ["점심·저녁 정기 식단 배달", "연초 결심기·여름 앞"],
      dataEvidence: "다이어트 식단 검색 1월·5-7월 피크"
    },
    where: {
      tags: ["다노·빅씨스·바로밀 앱", "그릭요거트·샐러드 브랜드"],
      dataEvidence: "다이어트 식단 배달 브랜드 월 MAU 100만+"
    },
    why: {
      tags: ["건강 투자 정당화", "배달 + 자기관리 통합 혜택"],
      dataEvidence: "'다이어트 식단 배달' 검색 +35%"
    },
    how: {
      tags: ["다이어트 식단 브랜드 제휴", "COVER 2 연계 스토리텔링"],
      dataEvidence: "자기관리 + 식단 결합 콘텐츠 공유율 18%"
    },
    pathFinder: ["다이어트 식단 배달", "샐러드 배달", "단백질 식단", "YOU Prime 일상팩"],
    cluster: ["다이어트음식", "샐러드배달", "단백질식단", "다노"],
    relatedKeywords: [
      { term: "다이어트음식", volume: 530000, trend: 0.15 },
      { term: "샐러드배달", volume: 55000, trend: 0.25 },
      { term: "단백질식단", volume: 80000, trend: 0.18 }
    ],
    contentHook: "몸에 좋은 돈, 카드에도 좋은 돈",
    painPoints: ["건강식 고정비", "배달 + 자기관리 분산 혜택"],
    uspConnection: "배달 10% + 취미·자기관리 5% (이중 혜택, COVER 2 크로스)"
  }
];

// ============================================================================
// 교차 인사이트
// ============================================================================

export const YOU_PRIME_DAILY_CROSS_INSIGHTS = [
  {
    id: "daily-cross-1",
    icon: "⚡",
    card: "YOU Prime 일상팩",
    hookType: "Positioning-hook",
    title: "일상팩 DNA = NEED와 정반대 — '한 영역 집중' 아닌 '6개 골고루'",
    description: "NEED는 한 영역 집중 타깃, YOU Prime 일상팩은 6개 영역 모두 골고루 쓰는 1인 라이프스타일 타깃. 월 최대 6만 환급은 6개 영역 모두 채워야 달성 가능한 설계.",
    implication: "타깃 구분 명확: '이거 저거 다 하는 사람'의 카드로 포지셔닝"
  },
  {
    id: "daily-cross-2",
    icon: "⚡",
    card: "YOU Prime 일상팩",
    hookType: "Segment-hook",
    title: "일상팩 안에서 성별·세그먼트 극단적으로 갈림",
    description: "차 있는 1인가구(남성 65%) vs 필라테스·미용실(여성 80%) vs 재택 IT(남녀 혼합) vs 반려동물(여성 55%). 같은 일상팩이지만 페르소나별 타깃 완전히 다른 자산 사용.",
    implication: "페르소나별 별도 콘텐츠·광고 크리에이티브 필요"
  },
  {
    id: "daily-cross-3",
    icon: "⚡",
    card: "YOU Prime 일상팩",
    hookType: "Surge-hook",
    title: "재택근무 2026.3 월 30,700 역대 최대 폭증",
    description: "재택 제도 재확산 트렌드. 재택근무 기반 라이프스타일 페르소나가 폭증 중. 주유 없이도 5개 영역 풀 활용하는 설계.",
    implication: "재택근무자 특화 콘텐츠 · 홈오피스 제휴 우선 전개"
  }
];

// ============================================================================
// 전체 export
// ============================================================================

export const youPrimeDailyData = {
  meta: {
    cardId: "YOU-PRIME-DAILY",
    cardName: "YOU Prime 일상팩",
    cardTagline: "6개 영역 골고루, 1인 라이프스타일 전부를 커버",
    annualFee: 30000,
    monthlyRequirement: 400000,
    familyCard: "7,000원",
    version: "2.0",
    lastUpdate: "2026-04-20"
  },
  usps: YOU_PRIME_DAILY_USPS,
  personas: YOU_PRIME_DAILY_PERSONAS,
  opportunities: YOU_PRIME_DAILY_OPPORTUNITIES,
  crossInsights: YOU_PRIME_DAILY_CROSS_INSIGHTS
};

// ============================================================================
// 유틸 함수
// ============================================================================

export function getOpportunitiesByPersona(personaId) {
  return YOU_PRIME_DAILY_OPPORTUNITIES.filter(o => o.personaId === personaId);
}

export function getCoverOpportunities() {
  return YOU_PRIME_DAILY_OPPORTUNITIES.filter(o => o.hookType === "COVER");
}

export function getAccentOpportunities() {
  return YOU_PRIME_DAILY_OPPORTUNITIES.filter(o => o.hookType === "ACCENT");
}

export function getOpportunityById(id) {
  return YOU_PRIME_DAILY_OPPORTUNITIES.find(o => o.id === id);
}

export function getPersonaById(id) {
  return YOU_PRIME_DAILY_PERSONAS.find(p => p.id === id);
}

export function getUSPById(id) {
  return YOU_PRIME_DAILY_USPS.find(u => u.id === id);
}

export function getTotalAnnualVolume() {
  return YOU_PRIME_DAILY_OPPORTUNITIES.reduce((sum, o) => sum + o.annualVolume, 0);
}

export function getOpportunityCount() {
  return YOU_PRIME_DAILY_OPPORTUNITIES.length;
}

export default youPrimeDailyData;
