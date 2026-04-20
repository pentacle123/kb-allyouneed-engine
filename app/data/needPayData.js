/**
 * KB ALL·YOU·NEED AI Brandformance Engine
 * NEED Pay 데이터 — v2.0 (2026.04.20)
 * 
 * 구조:
 * - USP_ASSETS: 4개 핵심 혜택 자산
 * - PERSONAS: COVER 4개 (메인 타깃)
 * - OPPORTUNITIES: 9개 기회 카드 (COVER 4 + ACCENT 5)
 */

// ============================================================================
// USP 자산 (NEED Pay 핵심 혜택)
// ============================================================================

export const NEED_PAY_USPS = [
  {
    id: "pay-simple-payment",
    icon: "💳",
    title: "간편결제 15% / 10%",
    conditions: "네이버페이·카카오페이·페이코·토스페이 15% · KB Pay 10% · 월 3,000원 한도",
    copy: "어느 페이든 한 카드로, 매달 3천원 환급",
    strategy: "페이 시장 2,143만 검색 포괄. 페이 '택1' 피로층 해방 포지션",
    color: "#8B5CF6"
  },
  {
    id: "pay-digital-content",
    icon: "🎬",
    title: "디지털콘텐츠·멤버십 30%",
    conditions: "OTT·음악·게임·웹툰·멤버십 정기결제 30% · 월 3,000원 한도",
    copy: "OTT·멤버십 5종도 한 장에, 월 3천원",
    strategy: "ALL 카드 10% 대비 3배 — 구독 3개 이상 유저 확실한 이득",
    color: "#EC4899"
  },
  {
    id: "pay-naver-plus",
    icon: "🟢",
    title: "네이버플러스 결합 40%",
    conditions: "네이버페이 × KB Pay × 네이버플러스 3중 결합 시 실질 40% 환급",
    copy: "네이버 생태계 40%, 시장 유일 조합",
    strategy: "네이버플러스 178만 × 네이버페이 1,067만 교집합 = 국내 최대 이중 할인",
    color: "#10B981"
  },
  {
    id: "pay-online-fashion",
    icon: "👗",
    title: "온라인 패션몰 5%",
    conditions: "무신사·29CM·에이블리·지그재그·W컨셉 5종 · 월 3,000원 한도",
    copy: "MZ 쇼핑 5대몰, 한 카드로 5%",
    strategy: "온라인 패션몰 5종 5,777만 검색 — MZ 침투 유일 자산",
    color: "#F97316"
  }
];

// ============================================================================
// 페르소나 (COVER 4)
// ============================================================================

export const NEED_PAY_PERSONAS = [
  {
    id: "PAY-COVER-P1",
    icon: "🟢",
    title: "네이버 생태계 40% 해커",
    subtitle: "네이버페이 × 네이버플러스 × KB Pay, 3중 결합 활용자",
    description: "네이버플러스 178만 × 네이버페이 1,067만 교집합 타깃. 네이버 생태계를 이미 일상화한 사용자가 KB Pay를 더해 40% 실질 환급 구조를 구축하는 고수 유저.",
    linkedUSP: ["pay-naver-plus", "pay-simple-payment"],
    annualSearchVolume: 12450000,
    opportunityCount: 1,
    color: "#10B981",
    demoTags: ["30-50대 남녀", "네이버플러스 멤버", "네이버쇼핑 월 3회+", "할인 조합 고수"]
  },
  {
    id: "PAY-COVER-P2",
    icon: "🎬",
    title: "구독 고정비 다이어터",
    subtitle: "OTT·멤버십 5종을 한 카드로 30% 환급",
    description: "OTT 6종(넷플릭스·유튜브 프리미엄·티빙·웨이브·쿠팡플레이·디즈니+) 1억 4천만 검색 시장. 구독 3개+ 유저가 ALL 카드 10% 대비 3배 환급받는 확실한 이득 구조.",
    linkedUSP: ["pay-digital-content"],
    annualSearchVolume: 140000000,
    opportunityCount: 1,
    color: "#EC4899",
    demoTags: ["20-40대", "OTT 3개+ 구독", "월 구독료 5만+", "구독 다이어트 실행"]
  },
  {
    id: "PAY-COVER-P3",
    icon: "👗",
    title: "MZ 쇼핑러 × KB Pay 20%",
    subtitle: "무신사·29CM·에이블리·지그재그·W컨셉 × KB Pay",
    description: "5대 온라인 패션몰 5,777만 검색. 20-30대 MZ의 핵심 쇼핑 영역. 온라인 패션몰 5% + KB Pay 15% 결합 시 실질 20% 환급 구조. NEED Pay의 유일한 MZ 침투 자산.",
    linkedUSP: ["pay-online-fashion", "pay-simple-payment"],
    annualSearchVolume: 57770000,
    opportunityCount: 1,
    color: "#F97316",
    demoTags: ["20-30대 MZ", "여성 65%+", "패션몰 월 2-3회 쇼핑", "MZ 트렌드 민감"]
  },
  {
    id: "PAY-COVER-P4",
    icon: "💳",
    title: "페이 생활자 — 어느 페이든 10%",
    subtitle: "페이 '택1' 피로에서 벗어난 통합 사용자",
    description: "페이 시장 2,143만 검색. 네이버페이·카카오페이·페이코·토스페이·KB Pay 중 상황별 사용. 어느 페이를 쓰든 10-15% 환급받는 페이 중립 카드 수요.",
    linkedUSP: ["pay-simple-payment"],
    annualSearchVolume: 21430000,
    opportunityCount: 1,
    color: "#8B5CF6",
    demoTags: ["30-50대", "페이 3개+ 보유", "오프라인·온라인 혼용", "페이 택1 피로층"]
  }
];

// ============================================================================
// 기회 9개 (COVER 4 + ACCENT 5)
// ============================================================================

export const NEED_PAY_OPPORTUNITIES = [
  // ========== 🔵 COVER 페르소나 기회 4개 ==========
  {
    id: "PAY-COVER-P1-1",
    personaId: "PAY-COVER-P1",
    icon: "🟢",
    tier: "MEGA",
    card: "NEED Pay",
    hookType: "COVER",
    title: "네이버 생태계 40% 해커",
    subtitle: "네이버페이 × 네이버플러스 × KB Pay 3중 결합",
    description: "네이버플러스 178만 × 네이버페이 1,067만 교집합 = 국내 최대 이중 할인 시장. 네이버 생태계를 일상화한 고수 유저가 KB Pay를 더해 실질 40% 환급 구조 구축. 타 카드사가 잡지 못한 조합.",
    annualVolume: 12450000,
    monthlyVolume: 1037500,
    who: {
      tags: ["30-50대 남녀", "네이버플러스 멤버 (978만)", "네이버쇼핑 월 3회+", "할인 조합 고수"],
      dataEvidence: "네이버플러스 178만 × 네이버페이 1,067만 교집합자 약 500만 추정"
    },
    what: {
      tags: ["네이버플러스 5% + 네이버페이 적립 + KB Pay 15%", "실질 40% 환급"],
      dataEvidence: "간편결제 15% + 네이버플러스 쇼핑멤버십 결합 + 네이버페이 적립 누적"
    },
    when: {
      tags: ["매일 네이버쇼핑 결제", "주간 정기 구매 루틴"],
      dataEvidence: "네이버쇼핑 일 사용자 3,000만+, 결제 빈도 주 3-5회"
    },
    where: {
      tags: ["네이버 스마트스토어", "네이버 쇼핑·네이버 플러스 페이지", "KB Pay 앱"],
      dataEvidence: "네이버 쇼핑 월 검색 1,000만+"
    },
    why: {
      tags: ["혜택 조합 극대화 욕구", "여러 페이 분산 사용 피로", "'네이버 생태계 락인' 의식"],
      dataEvidence: "네이버플러스 + 페이 결합 검색 +45% 증가"
    },
    how: {
      tags: ["'40% 해커' 시뮬레이터 콘텐츠", "네이버 생태계 가이드 SEO"],
      dataEvidence: "네이버 생태계 콘텐츠 평균 체류 5분+"
    },
    pathFinder: ["네이버페이 혜택", "네이버플러스 멤버십", "KB Pay 결합", "NEED Pay"],
    cluster: ["네이버페이", "네이버플러스", "KB Pay", "네이버 생태계", "페이 결합"],
    relatedKeywords: [
      { term: "네이버페이", volume: 10670000, trend: 0.12 },
      { term: "네이버플러스", volume: 1780000, trend: 0.23 },
      { term: "네이버플러스 멤버십", volume: 405000, trend: 0.28 }
    ],
    contentHook: "네이버 생태계 40% 해커 — 시장 유일 조합",
    painPoints: ["여러 페이 분산 관리", "혜택 조합 복잡성", "네이버플러스 혜택 최대 활용 정보 부족"],
    uspConnection: "네이버플러스 결합 40% (네이버페이 × KB Pay × 네이버플러스 3중 결합)"
  },
  {
    id: "PAY-COVER-P2-1",
    personaId: "PAY-COVER-P2",
    icon: "🎬",
    tier: "MEGA",
    card: "NEED Pay",
    hookType: "COVER",
    title: "구독 고정비 다이어터",
    subtitle: "OTT·멤버십 5종을 한 카드로 30% 환급",
    description: "OTT 6종(넷플릭스 225만+유튜브 프리미엄 1,091만+티빙 114만+웨이브·쿠팡플레이·디즈니+) 1억 4천만 검색 시장. 구독 3개+ 유저가 ALL 카드 10% 대비 3배 환급받는 확실한 이득 구조.",
    annualVolume: 140000000,
    monthlyVolume: 11666667,
    who: {
      tags: ["20-40대", "OTT 3개+ 구독", "월 구독료 5만+", "구독 다이어트 실행"],
      dataEvidence: "OTT 3개 이상 구독자 약 40% (1,600만명+)"
    },
    what: {
      tags: ["디지털콘텐츠·멤버십 30% 환급", "ALL 카드 10% 대비 3배", "월 3,000원 한도"],
      dataEvidence: "유튜브 프리미엄 14,900원 × 30% = 4,470원 → 캡 3,000원"
    },
    when: {
      tags: ["신규 OTT 가입·갱신", "연말 구독 정리", "가계부 작성 시점"],
      dataEvidence: "1-3월 구독 다이어트 검색 3배 피크"
    },
    where: {
      tags: ["각 OTT 결제 페이지", "유튜브 구독료 다이어트 영상", "가계부 앱"],
      dataEvidence: "OTT 비교 블로그 월 200만+ PV, 구독 다이어트 영상 월 100만+"
    },
    why: {
      tags: ["구독 총액 누적 부담", "통제감 회복 욕구", "'해지 vs 유지' 반복 고민"],
      dataEvidence: "'구독료 얼마' 검색 +30%, 해지 검색 지속 증가"
    },
    how: {
      tags: ["'5종 구독 30% 환급' 시뮬레이터", "구독 다이어트 체크리스트"],
      dataEvidence: "구독 다이어트 콘텐츠 저장률 22%+"
    },
    pathFinder: ["유튜브 프리미엄 할인", "넷플릭스 할인", "구독료 다이어트", "NEED Pay"],
    cluster: ["OTT", "구독료", "유튜브 프리미엄", "넷플릭스", "디지털콘텐츠"],
    relatedKeywords: [
      { term: "유튜브 프리미엄 가격", volume: 1091050, trend: 0.12 },
      { term: "넷플릭스 요금제", volume: 2247800, trend: 0.05 },
      { term: "티빙 요금제", volume: 1138800, trend: 0.08 },
      { term: "유튜브 프리미엄 싸게", volume: 611660, trend: 0.15 },
      { term: "유튜브 프리미엄 우회", volume: 372270, trend: -0.1 }
    ],
    contentHook: "OTT 5종 매달 3천원, 구독 다이어트의 종점",
    painPoints: ["구독 누적 총액 부담", "해지·유지 반복 고민", "ALL 10% 부족 체감"],
    uspConnection: "디지털콘텐츠·멤버십 30% (ALL 대비 3배, 월 3,000원 캡)"
  },
  {
    id: "PAY-COVER-P3-1",
    personaId: "PAY-COVER-P3",
    icon: "👗",
    tier: "MEGA",
    card: "NEED Pay",
    hookType: "COVER",
    title: "MZ 쇼핑러 × KB Pay 20%",
    subtitle: "무신사·29CM·에이블리·지그재그·W컨셉 × KB Pay",
    description: "5대 온라인 패션몰 5,777만 검색. 20-30대 MZ의 핵심 쇼핑 영역. 온라인 패션몰 5% + KB Pay 15% 결합 시 실질 20% 환급. NEED Pay의 유일한 MZ 침투 자산 — 타 혜택은 모두 30-40대 중심.",
    annualVolume: 57770000,
    monthlyVolume: 4814167,
    who: {
      tags: ["20-30대 MZ", "여성 65%+", "패션몰 월 2-3회 쇼핑", "MZ 트렌드 민감"],
      dataEvidence: "온라인 패션몰 5종 검색자 20-30대 비중 80%+"
    },
    what: {
      tags: ["온라인 패션몰 5% + KB Pay 15% = 20%", "MZ 전용 실질 환급"],
      dataEvidence: "월 20만 × 20% = 4만원 환급 잠재"
    },
    when: {
      tags: ["월급일 직후 쇼핑", "시즌오프·블프 세일", "무신사 28데이 행사"],
      dataEvidence: "무신사 28데이·29CM 블프 시즌 검색 3-5배 폭증"
    },
    where: {
      tags: ["무신사·29CM·에이블리·지그재그·W컨셉 앱", "무신사 스토어·29CM 오프라인"],
      dataEvidence: "무신사 MAU 1,200만+, 29CM MAU 400만+"
    },
    why: {
      tags: ["MZ 쇼핑 루틴 고정", "혜택 검색 피로", "'카드 발급 귀찮지만 할인은 필요'"],
      dataEvidence: "MZ 대상 카드 발급 전환율 3-5% (높음)"
    },
    how: {
      tags: ["MZ 패션 커뮤니티 제휴 프로모션", "인플루언서 20% 할인 후기"],
      dataEvidence: "MZ 패션 인플루언서 광고 CTR 평균 대비 4-6배"
    },
    pathFinder: ["무신사 할인", "29CM 쿠폰", "에이블리 할인", "NEED Pay"],
    cluster: ["무신사", "29CM", "에이블리", "지그재그", "W컨셉", "MZ 쇼핑"],
    relatedKeywords: [
      { term: "무신사", volume: 45000000, trend: 0.08 },
      { term: "에이블리", volume: 5500000, trend: 0.15 },
      { term: "29CM", volume: 3200000, trend: 0.12 },
      { term: "지그재그", volume: 2500000, trend: 0.05 },
      { term: "W컨셉", volume: 1570000, trend: -0.03 }
    ],
    contentHook: "무신사·29CM·에이블리, MZ 5대몰 한 카드로 20%",
    painPoints: ["할인 코드·멤버십 이중 관리 피로", "카드 발급 귀찮음", "실질 환급 부족"],
    uspConnection: "온라인 패션몰 5% + KB Pay 15% = 실질 20% (MZ 타깃 유일 조합)"
  },
  {
    id: "PAY-COVER-P4-1",
    personaId: "PAY-COVER-P4",
    icon: "💳",
    tier: "MEGA",
    card: "NEED Pay",
    hookType: "COVER",
    title: "페이 생활자 — 어느 페이든 10%",
    subtitle: "페이 '택1' 피로에서 벗어난 통합 사용자",
    description: "페이 시장 2,143만 검색. 네이버페이·카카오페이·페이코·토스페이·KB Pay 중 상황별 사용자. '이 페이는 이 가게에서만' 피로를 '어느 페이든 한 카드로 10-15%' 구조로 해방.",
    annualVolume: 21430000,
    monthlyVolume: 1785833,
    who: {
      tags: ["30-50대", "페이 3개+ 보유", "오프라인·온라인 혼용", "페이 택1 피로층"],
      dataEvidence: "간편결제 이용자 4,300만명 중 2개+ 보유 80%+"
    },
    what: {
      tags: ["간편결제 15% (타사 페이)", "KB Pay 10%", "월 3,000원 한도"],
      dataEvidence: "월 20만 × 15% = 3만원 → 캡 3,000원 완전 활용"
    },
    when: {
      tags: ["일상 결제 전반", "오프라인 매장 QR 결제", "온라인 주문 결제"],
      dataEvidence: "페이 일 평균 사용 4-6회"
    },
    where: {
      tags: ["편의점 QR 결제", "카페 페이 결제", "음식점·배달 앱"],
      dataEvidence: "페이 결제 가맹점 300만+"
    },
    why: {
      tags: ["페이별 할인 혜택 파편화", "매번 '어느 페이 쓸까' 피로", "통합 관리 욕구"],
      dataEvidence: "'페이 통합 카드' 검색 +38%"
    },
    how: {
      tags: ["'페이 택1 끝' 캠페인", "페이 3종 비교 콘텐츠"],
      dataEvidence: "페이 비교 콘텐츠 체류 평균 3-4분"
    },
    pathFinder: ["간편결제 혜택", "페이 비교", "카드 페이 할인", "NEED Pay"],
    cluster: ["간편결제", "네이버페이", "카카오페이", "페이코", "토스페이", "KB Pay"],
    relatedKeywords: [
      { term: "카카오페이", volume: 4500000, trend: 0.18 },
      { term: "토스페이", volume: 3800000, trend: 0.31 },
      { term: "페이코", volume: 1200000, trend: -0.05 },
      { term: "간편결제", volume: 850000, trend: 0.2 }
    ],
    contentHook: "페이 택1, 이제 끝 — 어느 페이든 한 카드로",
    painPoints: ["페이별 가맹점 파편화", "혜택 비교 피로", "카드 × 페이 조합 복잡성"],
    uspConnection: "간편결제 15% / KB Pay 10% — 페이 중립 통합 구조"
  },

  // ========== 🟠 ACCENT 기회 5개 ==========
  {
    id: "PAY-ACCENT-1",
    personaId: "ACCENT",
    icon: "😌",
    tier: "MEDIUM",
    card: "NEED Pay",
    hookType: "ACCENT",
    title: "페이 택1 해방자 — 페이 비교 피로층",
    subtitle: "'이 페이는 이 가게에서만' 피로의 종점",
    description: "페이별 할인이 가맹점마다 달라서 매번 '어느 페이 써야 할인될까' 고민하는 피로층. NEED Pay는 페이 중립 설계 — 어느 페이를 써도 기본 10%+ 환급.",
    annualVolume: 450000,
    monthlyVolume: 37500,
    who: {
      tags: ["페이 3개+ 보유 피로층", "가맹점별 페이 선택 지친 세그먼트"],
      dataEvidence: "'페이 통합'·'페이 정리' 검색 +38%"
    },
    what: {
      tags: ["페이 중립 10-15% 환급", "가맹점 구분 無"],
      dataEvidence: "NEED Pay USP = 페이 종류 불문 혜택 적용"
    },
    when: {
      tags: ["오프라인 매장 결제 순간", "페이 선택 망설이는 1-2초"],
      dataEvidence: "QR 결제 순간 페이 선택 시간 평균 3-5초"
    },
    where: {
      tags: ["편의점·카페·음식점 카운터", "페이 비교 블로그"],
      dataEvidence: "페이 선택 피로 포스팅 지속 증가"
    },
    why: {
      tags: ["의사결정 피로", "'더 나은 페이가 있을까' 불안"],
      dataEvidence: "페이 선택 피로 관련 커뮤니티 토론 활성"
    },
    how: {
      tags: ["'페이 택1 끝' 심플한 비주얼", "QR 결제 순간 훅 광고"],
      dataEvidence: "단순 메시지 광고 클릭률 +40%"
    },
    pathFinder: ["페이 비교", "페이 통합 카드", "간편결제 피로", "NEED Pay"],
    cluster: ["페이 비교", "페이 피로", "페이 통합"],
    relatedKeywords: [
      { term: "페이 비교", volume: 320000 },
      { term: "간편결제 피로", volume: 130000 }
    ],
    contentHook: "페이 택1 피로, 이제 끝",
    painPoints: ["매번 어느 페이 쓸까 고민", "가맹점별 할인 차이", "복잡한 혜택 구조"],
    uspConnection: "간편결제 15% / KB Pay 10% — 페이 중립성"
  },
  {
    id: "PAY-ACCENT-2",
    personaId: "ACCENT",
    icon: "🔄",
    tier: "MEDIUM",
    card: "NEED Pay",
    hookType: "ACCENT",
    title: "KB Pay 생태계 유입자 — 내부 전환",
    subtitle: "KB 고객인데 KB Pay를 안 쓰는 1천만 명",
    description: "KB국민카드 고객 중 KB Pay 미사용자 약 1,000만명. NEED Pay 발급 시 KB Pay 10% 혜택 + 타 페이 15%로 KB Pay 전환 동기 제공. 내부 전환 중요 타깃.",
    annualVolume: 780000,
    monthlyVolume: 65000,
    who: {
      tags: ["KB국민카드 기존 고객", "KB Pay 미사용자", "타 페이 유저"],
      dataEvidence: "KB 고객 2,200만 × KB Pay MAU 비율 50%"
    },
    what: {
      tags: ["KB Pay 전환 10% + 타 페이 15%", "이중 혜택 제공"],
      dataEvidence: "내부 전환자 대상 전환 이후 KB Pay MAU 유지율 75%+"
    },
    when: {
      tags: ["카드 업그레이드·갱신기", "KB 앱 내 프로모션 노출"],
      dataEvidence: "카드 갱신기 신규 앱 연동율 40%+"
    },
    where: {
      tags: ["KB국민카드 앱 내 배너", "KB국민은행 앱 연계 알림"],
      dataEvidence: "KB 앱 MAU 1,800만+"
    },
    why: {
      tags: ["'이미 KB인데 뭐 더?' 관성", "페이 전환 귀찮음"],
      dataEvidence: "내부 고객 업셀 전환율 평균 5-8%"
    },
    how: {
      tags: ["앱 내 개인화 프로모션", "카드 갱신 시 NEED Pay 추천"],
      dataEvidence: "개인화 오퍼 전환율 평균 12%+"
    },
    pathFinder: ["KB Pay 혜택", "KB국민카드 추천", "KB 페이 전환", "NEED Pay"],
    cluster: ["KB Pay", "KB 페이", "KB 앱", "KB국민카드"],
    relatedKeywords: [
      { term: "KB Pay", volume: 450000, trend: 0.22 },
      { term: "KB국민카드", volume: 320000, trend: 0.05 }
    ],
    contentHook: "KB 고객이신가요? KB Pay 10% + 타 페이 15%",
    painPoints: ["페이 전환 번거로움", "기존 습관 관성"],
    uspConnection: "KB Pay 10% + 간편결제 15% (내부 크로스셀)"
  },
  {
    id: "PAY-ACCENT-3",
    personaId: "ACCENT",
    icon: "📈",
    tier: "MEDIUM",
    card: "NEED Pay",
    hookType: "ACCENT",
    title: "네이버플러스 미가입 네이버페이 유저",
    subtitle: "업그레이드 넛지 — 네이버 생태계 40% 완성 유도",
    description: "네이버페이 1,067만 유저 중 네이버플러스 미가입자 약 60% (640만명). NEED Pay + 네이버페이 + 네이버플러스 가입 유도하면 실질 40% 환급 완성.",
    annualVolume: 2400000,
    monthlyVolume: 200000,
    who: {
      tags: ["네이버페이만 쓰는 사용자", "네이버플러스 미가입"],
      dataEvidence: "네이버페이 1,067만 × 네이버플러스 978만 차이 = 약 89만 갭"
    },
    what: {
      tags: ["네이버플러스 + KB Pay 결합 40%", "업그레이드 유도"],
      dataEvidence: "3종 결합 시 실질 환급 40%"
    },
    when: {
      tags: ["네이버 쇼핑 결제 직후", "네이버플러스 혜택 알림"],
      dataEvidence: "네이버쇼핑 결제 후 혜택 팝업 CTR 높음"
    },
    where: {
      tags: ["네이버 쇼핑 결제 페이지", "네이버플러스 가입 화면"],
      dataEvidence: "네이버플러스 가입 페이지 월 30만+ 방문"
    },
    why: {
      tags: ["네이버플러스 가입 번거로움", "월 4,900원 부담", "혜택 불명확"],
      dataEvidence: "네이버플러스 가입 망설임 검색 +22%"
    },
    how: {
      tags: ["3종 결합 시뮬레이터", "월 4,900원 → 실질 반값 강조"],
      dataEvidence: "결합 시뮬레이션 콘텐츠 전환율 8-10%"
    },
    pathFinder: ["네이버페이 혜택", "네이버플러스 가입", "네이버 결합 할인", "NEED Pay"],
    cluster: ["네이버페이", "네이버플러스 가입", "네이버 혜택"],
    relatedKeywords: [
      { term: "네이버플러스 가격", volume: 3130, trend: 0.18 },
      { term: "네이버플러스 혜택", volume: 36600, trend: 0.28 }
    ],
    contentHook: "네이버페이만 쓰세요? 3종 결합하면 40%",
    painPoints: ["네이버플러스 가입 망설임", "혜택 조합 정보 부족"],
    uspConnection: "네이버플러스 결합 40% (미가입자 업그레이드 유도)"
  },
  {
    id: "PAY-ACCENT-4",
    personaId: "ACCENT",
    icon: "🆕",
    tier: "MEDIUM",
    card: "NEED Pay",
    hookType: "ACCENT",
    title: "토스프라임 +31% 급성장자",
    subtitle: "페이 시장 신규 지배자 등장, NEED Pay로 먼저 잡는다",
    description: "토스페이 380만 검색 +31% 성장, 토스프라임 급성장. 2026 페이 시장 재편 중. NEED Pay는 페이 중립 설계라 토스 생태계 확산에도 자동 수혜.",
    annualVolume: 3800000,
    monthlyVolume: 316667,
    who: {
      tags: ["토스 유저 MAU 2,000만", "토스프라임 가입자 증가세"],
      dataEvidence: "토스페이 검색 +31%, 토스프라임 가입자 2025년 300만+ 추정"
    },
    what: {
      tags: ["토스페이 15% 환급", "토스 생태계 커버"],
      dataEvidence: "토스페이 가맹점 급속 확대"
    },
    when: {
      tags: ["토스 앱 내 결제 순간", "토스프라임 가입·갱신 시점"],
      dataEvidence: "토스 앱 일 사용 3-5회"
    },
    where: {
      tags: ["토스 앱", "토스 가맹점 오프라인·온라인"],
      dataEvidence: "토스 월 MAU 1,900만+"
    },
    why: {
      tags: ["페이 시장 신규 대안 탐색", "기존 페이 피로"],
      dataEvidence: "신규 페이 서비스 선호 증가"
    },
    how: {
      tags: ["토스 커뮤니티 제휴", "토스페이 + NEED Pay 콤보"],
      dataEvidence: "신규 페이 광고 CTR 기존 대비 2-3배"
    },
    pathFinder: ["토스페이 혜택", "토스프라임", "토스페이 카드", "NEED Pay"],
    cluster: ["토스페이", "토스프라임", "토스"],
    relatedKeywords: [
      { term: "토스페이", volume: 3800000, trend: 0.31 },
      { term: "토스프라임", volume: 450000, trend: 0.42 }
    ],
    contentHook: "토스페이도 15% — 페이 시장 재편의 승자",
    painPoints: ["신규 페이 혜택 불명확", "기존 페이 vs 토스 갈등"],
    uspConnection: "간편결제 15% (토스페이 포함 전 페이 커버)"
  },
  {
    id: "PAY-ACCENT-5",
    personaId: "ACCENT",
    icon: "🍽️",
    tier: "MEDIUM",
    card: "NEED Pay",
    hookType: "ACCENT",
    title: "배달·새벽배송 2대 멤버십 가족",
    subtitle: "배민클럽 + 컬리멤버스 30% × 2 = 연 7.2만 환급",
    description: "디지털콘텐츠·멤버십 30% 혜택에 배민클럽(월 3,990)·컬리멤버스(월 4,500)도 포함. OTT만 쓰는 게 아닌 배달·새벽배송 멤버십 2종 보유 가족이 추가 환급 기회.",
    annualVolume: 2100000,
    monthlyVolume: 175000,
    who: {
      tags: ["맞벌이·1인가구", "배민클럽+컬리멤버스 이중 구독자"],
      dataEvidence: "배민클럽 구독 350만+, 컬리멤버스 150만+ 추정"
    },
    what: {
      tags: ["배민클럽 30%", "컬리멤버스 30%", "월 3,000원 캡 채움"],
      dataEvidence: "배민클럽 3,990 × 30% = 1,197 + 컬리멤버스 4,500 × 30% = 1,350"
    },
    when: {
      tags: ["배달 주문 루틴", "새벽배송 정기 결제일"],
      dataEvidence: "배달 앱 월 사용 8-12회, 새벽배송 월 2-3회"
    },
    where: {
      tags: ["배달의민족 앱", "마켓컬리 앱"],
      dataEvidence: "배민 MAU 2,000만+, 컬리 MAU 900만+"
    },
    why: {
      tags: ["배달·새벽배송 멤버십 고정비 누적", "시간 빈곤 맞벌이 니즈"],
      dataEvidence: "멤버십 2종 동시 구독자 증가 추세"
    },
    how: {
      tags: ["'배민 + 컬리 = 한 카드' 스토리텔링", "맞벌이 타깃 광고"],
      dataEvidence: "맞벌이 라이프스타일 콘텐츠 공유율 18%"
    },
    pathFinder: ["배민클럽 할인", "컬리멤버스 할인", "배달 멤버십 카드", "NEED Pay"],
    cluster: ["배민클럽", "컬리멤버스", "배달 멤버십", "새벽배송"],
    relatedKeywords: [
      { term: "배민클럽", volume: 1200000, trend: 0.15 },
      { term: "컬리멤버스", volume: 320000, trend: 0.22 }
    ],
    contentHook: "배민 + 컬리 멤버십 30%, 맞벌이 가족의 한 장",
    painPoints: ["멤버십 2종 고정비", "시간 빈곤 맞벌이", "배달·배송 혜택 부족"],
    uspConnection: "디지털콘텐츠·멤버십 30% (배달·새벽배송 멤버십 포함)"
  }
];

// ============================================================================
// 교차 인사이트
// ============================================================================

export const NEED_PAY_CROSS_INSIGHTS = [
  {
    id: "pay-cross-1",
    icon: "⚡",
    card: "NEED Pay",
    hookType: "Positioning-hook",
    title: "네이버 생태계 40%는 국내 유일 조합 — 시장 선점 기회",
    description: "네이버플러스 178만 × 네이버페이 1,067만 교집합 타깃에게 KB Pay 15% + 네이버플러스 결합 5% = 실질 40% 환급을 제공할 수 있는 카드는 NEED Pay가 유일. 타 카드사 기획 부재.",
    implication: "'네이버 생태계 40%' 포지셔닝을 NEED Pay의 메인 축으로"
  },
  {
    id: "pay-cross-2",
    icon: "⚡",
    card: "NEED Pay",
    hookType: "Differentiation-hook",
    title: "디지털콘텐츠 30% = ALL 카드 10%의 3배 — 구독 3개+ 유저 분기점",
    description: "OTT 2개 이하 유저는 ALL 카드 10%로 충분, 3개+ 유저는 NEED Pay 30%가 확실한 이득. ALL vs NEED Pay 선택 기준이 '구독 개수'로 명확히 갈림.",
    implication: "구독 개수 시뮬레이터로 ALL → NEED Pay 업셀"
  },
  {
    id: "pay-cross-3",
    icon: "⚡",
    card: "NEED Pay",
    hookType: "MZ-gateway-hook",
    title: "온라인 패션몰 5종 = NEED 시리즈 유일한 MZ 진입로",
    description: "무신사 4,500만+29CM 320만+에이블리 550만+지그재그 250만+W컨셉 157만 = 5,777만 검색. MZ는 NEED Edu·AutoSlim에 관심 없음. NEED Pay의 온라인 패션몰 5%가 MZ 침투 유일 자산.",
    implication: "MZ 대상 마케팅은 NEED Pay의 온라인 패션몰 축에 집중"
  }
];

// ============================================================================
// 전체 export
// ============================================================================

export const needPayData = {
  meta: {
    cardId: "NEED-PAY",
    cardName: "NEED Pay",
    cardTagline: "페이 생활 전부, 한 장으로",
    annualFee: 20000,
    monthlyRequirement: 400000,
    familyCard: "무료",
    version: "2.0",
    lastUpdate: "2026-04-20"
  },
  usps: NEED_PAY_USPS,
  personas: NEED_PAY_PERSONAS,
  opportunities: NEED_PAY_OPPORTUNITIES,
  crossInsights: NEED_PAY_CROSS_INSIGHTS
};

// ============================================================================
// 유틸 함수
// ============================================================================

export function getOpportunitiesByPersona(personaId) {
  return NEED_PAY_OPPORTUNITIES.filter(o => o.personaId === personaId);
}

export function getCoverOpportunities() {
  return NEED_PAY_OPPORTUNITIES.filter(o => o.hookType === "COVER");
}

export function getAccentOpportunities() {
  return NEED_PAY_OPPORTUNITIES.filter(o => o.hookType === "ACCENT");
}

export function getOpportunityById(id) {
  return NEED_PAY_OPPORTUNITIES.find(o => o.id === id);
}

export function getPersonaById(id) {
  return NEED_PAY_PERSONAS.find(p => p.id === id);
}

export function getUSPById(id) {
  return NEED_PAY_USPS.find(u => u.id === id);
}

export function getTotalAnnualVolume() {
  return NEED_PAY_OPPORTUNITIES.reduce((sum, o) => sum + o.annualVolume, 0);
}

export function getOpportunityCount() {
  return NEED_PAY_OPPORTUNITIES.length;
}

export default needPayData;
