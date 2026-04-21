/**
 * KB ALL·YOU·NEED AI Brandformance Engine
 * ALL 카드 데이터 — v2.0 (2026.04.20)
 * 
 * 구조:
 * - USP_ASSETS: 4개 핵심 혜택 자산
 * - PERSONAS: 5개 타깃 페르소나 (P1-P5)
 * - OPPORTUNITIES: 28개 기회 카드 (Trip.com 상세 페이지용)
 */

// ============================================================================
// USP 자산 (카드 핵심 혜택 4종)
// ============================================================================

export const ALL_CARD_USPS = [
  {
    id: "usp-domestic-1pct",
    icon: "💳",
    title: "국내 1% 무실적·무한도",
    conditions: "전월 실적 조건 없음 · 월 할인 한도 없음",
    copy: "매달 실적 체크 스트레스 끝",
    strategy: "실적 피로 시장(연 228만) 진입점. '조건 없음'이 최상위 유저의 종착지.",
    color: "#3B82F6"
  },
  {
    id: "usp-shopping-membership",
    icon: "🛒",
    title: "쇼핑 멤버십 50%",
    conditions: "네이버플러스·쿠팡와우·컬리패스·요기패스 자동납부 시 · 월 3,000원 캡",
    copy: "멤버십 반값 유지, 생활 고정비 다이어트",
    strategy: "네이버플러스 178만+쿠팡와우 25.5만 거대 시장. '캡 때문에 쿠팡와우는 38%'가 정직.",
    color: "#F97316"
  },
  {
    id: "usp-ott-10pct",
    icon: "🎬",
    title: "OTT 10%",
    conditions: "넷플릭스·유튜브 프리미엄·티빙·웨이브·쿠팡플레이·디즈니+ 공식 홈페이지 자동납부 · 월 3,000원 캡",
    copy: "구독 해지 직전, 한 번 더 붙잡는 10%",
    strategy: "구독료 저항(넷플릭스 가격 인상 +286%, 유튜브 프리미엄 우회 372만) 시장의 합법 해법.",
    color: "#EC4899"
  },
  {
    id: "usp-overseas-2pct",
    icon: "✈️",
    title: "해외 2%",
    conditions: "해외 가맹점·해외 사이트 직구 결제 · 월 4만원 캡",
    copy: "트래블카드는 여행용, ALL은 365일 해외 카드",
    strategy: "AI 구독 폭증(Claude +2,050%, ChatGPT +40%) + 직구 시장. 트래블카드와 보완 포지션.",
    color: "#10B981"
  }
];

// ============================================================================
// 페르소나 5개
// ============================================================================

export const ALL_CARD_PERSONAS = [
  {
    id: "P1",
    icon: "😮‍💨",
    title: "실적체크 피로형",
    subtitle: "조건 없는 1%에 정착하는 사람",
    description: "체리피커·상테크 7년 차, 매달 40만 채웠나 계산하는 피로 누적. ALL 카드 국내 1% 무실적·무한도가 종착지.",
    linkedUSP: ["usp-domestic-1pct"],
    annualSearchVolume: 2280000,
    opportunityCount: 7,
    color: "#3B82F6",
    demoTags: ["25-45세", "남녀 혼합", "신용카드 2장+", "연 2,500만+ 카드 지출"]
  },
  {
    id: "P2",
    icon: "🛍️",
    title: "쿠팡·네이버 멤버십 반값 유지형",
    subtitle: "월 12,790원을 반값에 묶는 사람",
    description: "쿠팡와우 7,890원 + 네이버플러스 4,900원 = 월 12,790원. 이걸 반값으로 유지하려는 생활 고정비 관리자.",
    linkedUSP: ["usp-shopping-membership"],
    annualSearchVolume: 3205000,
    opportunityCount: 5,
    color: "#F97316",
    demoTags: ["30-50대", "여성 60%", "맞벌이·1인가구", "월 쇼핑 30만+"]
  },
  {
    id: "P3",
    icon: "📺",
    title: "넷플릭스 싸게 유지형",
    subtitle: "해지 버튼 직전에 한 번 더 생각하는 사람",
    description: "넷플릭스 가격 인상 3번째, 유튜브 프리미엄 우회 VPN 막힌 2026. 구독료 저항층이 찾는 합법 할인 경로.",
    linkedUSP: ["usp-ott-10pct"],
    annualSearchVolume: 5780000,
    opportunityCount: 7,
    color: "#EC4899",
    demoTags: ["20-40대", "여성 55%", "OTT 2-4개 구독", "월 구독료 5만+"]
  },
  {
    id: "P4",
    icon: "🌍",
    title: "365일 해외 카드형",
    subtitle: "AI 구독·직구가 일상인 사람",
    description: "ChatGPT·Claude·Midjourney + 테무·알리·아마존 직구. 트래블카드와 다른 '일상 해외 결제' 카드 수요.",
    linkedUSP: ["usp-overseas-2pct"],
    annualSearchVolume: 1647000,
    opportunityCount: 6,
    color: "#10B981",
    demoTags: ["20-40대", "남성 60%", "직구·AI 유저", "월 해외결제 20만+"]
  },
  {
    id: "P5",
    icon: "👨‍👩‍👧",
    title: "가족 혜택 확장형",
    subtitle: "가족 4인 전원 1% 받는 법을 찾는 사람",
    description: "연말정산 실적 합산, 자녀 첫 체크카드, 아이 용돈 카드(+88%). 가족 단위로 혜택을 확장하려는 가장·배우자.",
    linkedUSP: ["usp-domestic-1pct", "usp-shopping-membership"],
    annualSearchVolume: 86000,
    opportunityCount: 6,
    color: "#8B5CF6",
    demoTags: ["35-55세", "남녀 혼합", "기혼·자녀 있음", "가족카드 기발급"]
  }
];

// ============================================================================
// 기회 28개
// ============================================================================

export const ALL_CARD_OPPORTUNITIES = [
  // ========== P1. 실적체크 피로형 (6개) ==========
  {
    id: "P1-1",
    personaId: "P1",
    icon: "🎯",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Value-hook",
    title: "체리피커 7년 차, 결국 정착한 카드",
    subtitle: "혜택 최적화에 지친 최상위 유저의 종착지",
    description: "체리피커 연 10만+ 검색. 7년간 카드 갈아타며 혜택 최적화한 최상위 유저도 결국 '조건 없는 1%'에 정착한다. '무엇을 더 깎을까'가 아니라 '무엇을 더 이상 계산 안 할까'가 핵심.",
    annualVolume: 110000,
    monthlyVolume: 9170,
    who: {
      tags: ["체리피커 7년+", "신용카드 3-5장 보유", "30-40대 남녀"],
      dataEvidence: "체리피커(100,680) + 체리피킹 카드(444) 중복 검색자"
    },
    what: {
      tags: ["조건 없는 1% 캐시백", "실적·한도 스트레스 제로"],
      dataEvidence: "ALL 카드 국내 1% 무실적·무한도 = 체리피커 종착지"
    },
    when: {
      tags: ["기존 메인 카드 혜택 축소 시점", "카드 교체 고려기"],
      dataEvidence: "평균 카드 교체 주기 3-4년, 체리피커는 1-2년"
    },
    where: {
      tags: ["카드고릴라", "뽐뿌·디시 카드갤", "블로그 카드 후기"],
      dataEvidence: "카드고릴라 월 170만 검색 중 체리피커 유입 비율 약 10%"
    },
    why: {
      tags: ["혜택 계산 피로", "조건 없는 단순함 추구"],
      dataEvidence: "체리피커 관련 페인포인트 검색 35% 증가"
    },
    how: {
      tags: ["'복잡한 혜택' vs 'ALL의 단순함' 비교 콘텐츠", "체리피커 포기 인터뷰"],
      dataEvidence: "카드 비교 유튜브 평균 조회수 5만+"
    },
    pathFinder: ["체리피커", "신용카드 추천", "카드고릴라 1티어", "무실적 카드", "ALL 카드"],
    cluster: ["체리피커", "체리슈머", "상테크", "카드 최적화", "체리피킹 카드"],
    relatedKeywords: [
      { term: "체리피커", volume: 100680, trend: 0.15 },
      { term: "체리피킹 카드", volume: 444, trend: 0.08 }
    ],
    contentHook: "7년 체리피커가 결국 돌아온 카드",
    painPoints: ["매달 실적 체크 피로", "카드 혜택 비교 지침", "조건 맞추기 위한 편법 사용 죄책감"],
    uspConnection: "국내 1% 무실적·무한도",
    competition: {
      ranking: [
        { name: "카드고릴라", type: "카드 비교 플랫폼", share: "1위", volume: 2036100 },
        { name: "신용카드 추천 (자연 검색)", type: "정보 허브", share: "2위", volume: 587880 },
        { name: "뽐뿌 카드정보", type: "커뮤니티", share: "3위", volume: 250000 },
        { name: "KB국민카드 브랜드 검색", type: "카드사", share: "인지도 낮음", volume: 45000 }
      ],
      insight: "체리피커 검색 여정 1순위가 카드고릴라. KB는 카드고릴라 '1티어 무실적 카드' 섹션 상위 노출 확보 + 체리피커 졸업 후기 콘텐츠로 검색 여정 종점 확보 가능."
    }
  },
  {
    id: "P1-2",
    personaId: "P1",
    icon: "🧮",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Relief-hook",
    title: "\"40만원 채웠나?\" 매달 계산 지친 사람에게",
    subtitle: "이 결제는 실적 들어갈까 고민 자체를 없앤 카드",
    description: "전월실적 못 채우면(1,248) + 신용카드 실적 못 채우면(2,153) + 무실적 카드(5,530). 매달 '이 결제가 실적에 들어갈까' 계산하는 피로가 누적되면 사람들은 '조건 없는' 카드로 이동한다.",
    annualVolume: 37000,
    monthlyVolume: 3083,
    who: {
      tags: ["카드 실적 피로 누적자", "매달 실적 계산러", "30-40대"],
      dataEvidence: "전월실적 없는 카드(12,810) + 무실적 카드(5,530) 검색자 교집합"
    },
    what: {
      tags: ["실적 조건 없는 카드", "무한도 1%"],
      dataEvidence: "전월실적 없음 조항 = 매달 계산 필요 없음"
    },
    when: {
      tags: ["월말 카드 실적 체크 시점", "결제 직전 망설임"],
      dataEvidence: "실적 관련 검색 월말 25-31일 피크"
    },
    where: {
      tags: ["카드사 앱 실적 조회 화면", "네이버 카페 카드 정보"],
      dataEvidence: "KB Pay 실적 조회 월 350만 접속"
    },
    why: {
      tags: ["실적 계산 피로", "놓친 실적에 대한 죄책감"],
      dataEvidence: "실적 꼼수(13,840) 검색 연 +22%"
    },
    how: {
      tags: ["'매달 계산 끝' 캠페인", "실적 피로 공감 숏폼"],
      dataEvidence: "실적 관련 공감 영상 평균 완청률 78%"
    },
    pathFinder: ["전월실적 못채우면", "무실적 카드", "실적 없는 체크카드", "ALL 카드"],
    cluster: ["전월실적", "무실적", "실적 꼼수", "카드 실적", "실적 포함"],
    relatedKeywords: [
      { term: "전월실적 없는 카드", volume: 12810 },
      { term: "무실적 카드", volume: 5530 },
      { term: "전월실적 없는 신용카드", volume: 10420 },
      { term: "실적 뜻", volume: 9260 }
    ],
    contentHook: "실적 계산, 이제 그만",
    painPoints: ["매달 40만 채우기 스트레스", "실적 못 채우면 혜택 0원", "실적 계산 꼼수 쓰는 자신 혐오"],
    uspConnection: "전월실적 없음 조항"
  },
  {
    id: "P1-3",
    personaId: "P1",
    icon: "🎫",
    tier: "NICHE",
    card: "ALL",
    hookType: "Retire-hook",
    title: "상테크 졸업 — 상품권 쌓아두는 시대의 끝",
    subtitle: "편법 없이도 1%는 그대로",
    description: "상테크(12,540) + 상테크 카드(6,390). 상품권 편법으로 실적 채우던 시절의 종언. 조건 없는 1% 카드가 상테크를 '필요 없게' 만든다.",
    annualVolume: 21000,
    monthlyVolume: 1750,
    who: {
      tags: ["상테크 3년+ 실행자", "상품권 카드 2장 이상", "30-40대"],
      dataEvidence: "상테크 연 12,540 + 상품권 관련 연 25만+"
    },
    what: {
      tags: ["상품권 편법 없이 1% 유지", "편법 피로 해소"],
      dataEvidence: "국내 1% 무실적 조항 = 상테크 불필요"
    },
    when: {
      tags: ["상품권 결제 카드 단종·혜택 축소 시점", "상테크 번거로움 임계점"],
      dataEvidence: "상품권 카드 혜택 축소 공지 시 상테크 졸업 검색 급증"
    },
    where: {
      tags: ["뽐뿌 상테크 게시판", "디시 카드갤"],
      dataEvidence: "상테크 정보 공유 커뮤니티 활성"
    },
    why: {
      tags: ["편법 피로", "세금 리스크 인지"],
      dataEvidence: "상품권 실적 차단 이슈 관련 검색 폭증"
    },
    how: {
      tags: ["'상테크 졸업' 브랜디드 콘텐츠", "단순함의 가치 강조"],
      dataEvidence: "상테크 졸업 관련 콘텐츠 수요 검증됨"
    },
    pathFinder: ["상테크", "상테크 카드", "상품권 편법 끝", "ALL 카드"],
    cluster: ["상테크", "상품권", "실적 꼼수", "세금 리스크", "편법 피로"],
    relatedKeywords: [
      { term: "상테크", volume: 12540 },
      { term: "상테크 카드", volume: 6390 }
    ],
    contentHook: "상테크 없이도 1%는 그대로",
    painPoints: ["상품권 쌓아두는 번거로움", "세금 리스크 걱정", "편법 중독 자기혐오"],
    uspConnection: "국내 1% 무실적 조항"
  },
  {
    id: "P1-4",
    personaId: "P1",
    icon: "🔁",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Positioning-hook",
    title: "메인카드 못 바꾸는 당신의 서브카드",
    subtitle: "메인은 그대로, ALL은 1%만 조용히 얹는다",
    description: "서브카드·투카드 맥락 + 무실적 서브카드 검색. 이미 메인 카드를 쓰지만 '조건 없는 1%'를 추가로 얹기 위한 서브카드 수요가 명확히 존재.",
    annualVolume: 36000,
    monthlyVolume: 3000,
    who: {
      tags: ["메인카드 유지 + 서브 추가 수요", "30-50대 남녀"],
      dataEvidence: "서브카드 추천(13,240) + 투카드(4,580) + 무실적 서브카드(2,850)"
    },
    what: {
      tags: ["부담 없는 서브", "실적 안 채워도 1% 유지"],
      dataEvidence: "무실적·무한도 = 서브카드 최적"
    },
    when: {
      tags: ["메인 카드 혜택 축소 시점", "서브 추가 고려기"],
      dataEvidence: "메인 카드 혜택 축소 공지 직후 서브카드 검색 급증"
    },
    where: {
      tags: ["카드고릴라 서브카드 섹션", "뽐뿌 추천글"],
      dataEvidence: "서브카드 추천 블로그 월 300만 PV"
    },
    why: {
      tags: ["메인 교체 부담", "추가 혜택 소싱"],
      dataEvidence: "메인 교체 시 포인트·혜택 손실 우려 주요 페인"
    },
    how: {
      tags: ["'조용한 서브' 포지셔닝", "메인 카드와의 조합 시나리오"],
      dataEvidence: "카드 조합 시나리오 콘텐츠 평균 저장률 12%"
    },
    pathFinder: ["서브카드 추천", "무실적 서브카드", "투카드 조합", "ALL 카드"],
    cluster: ["서브카드", "투카드", "카드 조합", "메인 카드", "서브용"],
    relatedKeywords: [
      { term: "서브카드 추천", volume: 13240 },
      { term: "투카드", volume: 4580 },
      { term: "무실적 서브카드", volume: 2850 }
    ],
    contentHook: "메인은 지키고, ALL은 조용히 얹는다",
    painPoints: ["메인 교체 시 기존 혜택 손실", "실적 분산 고민", "서브카드 실적 맞추기 부담"],
    uspConnection: "무실적·무한도 = 서브카드 최적 구조"
  },
  {
    id: "P1-5",
    personaId: "P1",
    icon: "🏆",
    tier: "MEGA",
    card: "ALL",
    hookType: "Authority-hook",
    title: "2026 카드고릴라 1티어, 이유는 '조건 없음'",
    subtitle: "카드 고민을 끝낼 한 가지 기준",
    description: "카드고릴라(203.6만) + 2026 신용카드 추천(10,200) + 2026 체크카드 추천(10,056). '2026 올해의 카드' 검색 행동에서 '조건 없음'이 결정적 차별점.",
    annualVolume: 2056000,
    monthlyVolume: 171333,
    who: {
      tags: ["신규·교체 발급 고려자", "카드 추천 콘텐츠 소비자"],
      dataEvidence: "카드고릴라 월 170만 + 카드 추천 검색 월 20만+"
    },
    what: {
      tags: ["연도 베스트 카드", "올해의 신용카드"],
      dataEvidence: "2026 추천 콘텐츠 1분기 집중"
    },
    when: {
      tags: ["1-3월 신년 카드 교체기", "카드 만료 알림 시점"],
      dataEvidence: "1-3월 카드 추천 검색 평월 대비 3.2배"
    },
    where: {
      tags: ["카드고릴라", "네이버 블로그", "유튜브 카드 리뷰"],
      dataEvidence: "카드고릴라 월 170만 PV"
    },
    why: {
      tags: ["혜택 복잡성 피로", "단순한 기준 필요"],
      dataEvidence: "'카드 추천' 관련 고민 검색 35% 증가"
    },
    how: {
      tags: ["'2026 1티어 카드' 스폰서", "카드고릴라 공식 리뷰 협업"],
      dataEvidence: "카드고릴라 상위 노출 광고 CTR 평균 3.5%"
    },
    pathFinder: ["2026 신용카드 추천", "카드고릴라", "올해의 카드", "ALL 카드"],
    cluster: ["카드고릴라", "2026 신용카드", "베스트 카드", "올해의 카드"],
    relatedKeywords: [
      { term: "카드고릴라", volume: 2036100 },
      { term: "2026 신용카드 추천", volume: 10200 },
      { term: "2026 체크카드 추천", volume: 10056 }
    ],
    contentHook: "2026, 카드 고민을 끝낼 한 가지 기준",
    painPoints: ["매년 바뀌는 카드 혜택 피로", "비교 정보 과잉", "결국 뭘 골라야 할지 모름"],
    uspConnection: "전 USP 종합 포지셔닝"
  },
  {
    id: "P1-6",
    personaId: "P1",
    icon: "💰",
    tier: "NICHE",
    card: "ALL",
    hookType: "Value-hook",
    title: "월 200만원 쓰는 고소비자 전용 계산법",
    subtitle: "월 300만 쓰면 연 36만 돌려받는 유일한 구조",
    description: "무제한 적립 카드(1,960) + 적립 한도 없는 신용카드(1,440) + 할인 한도 없는 카드(928). 월 고액 지출자에게 '한도 없음'이 실제 의미 있는 차이.",
    annualVolume: 20000,
    monthlyVolume: 1667,
    who: {
      tags: ["월 200만+ 카드 고소비자", "고소득 전문직·자영업자"],
      dataEvidence: "무제한 적립 카드 검색 소득 상위 20% 편중"
    },
    what: {
      tags: ["월 할인 한도 없음", "무제한 1% 적립"],
      dataEvidence: "월 3백만 × 1% = 월 3만, 연 36만"
    },
    when: {
      tags: ["세금·아파트 관리비·의료비 등 고액 결제 시점", "사업자 경비 집중"],
      dataEvidence: "고액 결제 월 중순~말 집중"
    },
    where: {
      tags: ["블로그 고소비자 카드 비교", "세무사·재테크 커뮤니티"],
      dataEvidence: "재테크 커뮤니티 카드 비교글 인게이지먼트 높음"
    },
    why: {
      tags: ["한도에 막혀서 혜택 손실", "고액 결제 시 실질 혜택 0"],
      dataEvidence: "한도 초과 경험 시 카드 교체 검색 40% 증가"
    },
    how: {
      tags: ["월 300만 시뮬레이터", "고소비자 후기 영상"],
      dataEvidence: "카드 시뮬레이터 콘텐츠 평균 체류 3분+"
    },
    pathFinder: ["무제한 적립 카드", "적립 한도 없는 신용카드", "고액 결제 카드", "ALL 카드"],
    cluster: ["무제한 적립", "적립 한도", "할인 한도 없음", "고소비자 카드"],
    relatedKeywords: [
      { term: "무제한 적립 카드", volume: 1960 },
      { term: "적립 한도 없는 신용카드", volume: 1440 },
      { term: "할인 한도 없는 카드", volume: 928 }
    ],
    contentHook: "월 300만 쓰면 연 36만 돌려받는 유일한 구조",
    painPoints: ["한도 초과 후 혜택 0원", "카드사 캡 정책 실망", "고소비자용 카드 부재"],
    uspConnection: "월 할인 한도 없음 조항"
  },
  {
    id: "P1-7",
    personaId: "P1",
    icon: "📦",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Reset-hook",
    title: "새 주소, 새 카드로 고정비 한번에 리셋",
    subtitle: "이사·신학기에 카드 교체가 가장 쉬운 이유",
    description: "이사 인터넷 이전, 공과금 정산, 신학기 준비물 등 '전환 비용이 큰 순간'은 카드 교체의 골든 윈도우. 기존 자동납부 리셋 타이밍에 ALL 카드로 이관 유도.",
    annualVolume: 60000,
    monthlyVolume: 5000,
    seasonality: { type: "school_semester", peakMonths: [2, 3, 9], description: "2-3월·9월 이사·신학기 피크" },
    who: {
      tags: ["이사 예정자", "신학기 부모", "20-40대 가족·1인가구"],
      dataEvidence: "이사 인터넷 이전 설치 키워드 클러스터 + 신학기 준비물 2월 3,900회 피크"
    },
    what: {
      tags: ["전체 자동납부 통합 리셋", "ALL 카드 1% 무실적"],
      dataEvidence: "전환 비용 큰 시점에 한 번에 정리 가능 = 카드 이관 전환율 3배+"
    },
    when: {
      tags: ["2-3월 이사 성수기", "3월·9월 신학기", "이사 D-30 준비기"],
      dataEvidence: "신학기 준비물 트렌드 +112%, 이사 인터넷 트렌드 +26%"
    },
    where: {
      tags: ["이사 후기 블로그", "아파트 커뮤니티", "맘카페 신학기 게시판"],
      dataEvidence: "이사 정보 커뮤니티 월 수백만 PV"
    },
    why: {
      tags: ["한 번에 정리하고 싶은 충동", "기존 카드 혜택 축소 체감"],
      dataEvidence: "이사시 결제 수단 통합 검색 증가 패턴"
    },
    how: {
      tags: ["'새 주소 = 새 카드' 캠페인", "이사 체크리스트 콘텐츠 제휴"],
      dataEvidence: "시즌 캠페인 CPA 평월 대비 40% 낮음"
    },
    pathFinder: ["이사 인터넷 이전", "공과금 자동이체", "신학기 카드 추천", "ALL 카드"],
    cluster: ["이사 인터넷", "공과금 정산", "신학기 준비물", "자동납부 리셋"],
    relatedKeywords: [
      { term: "이사 인터넷", volume: 6017, trend: 0.26 },
      { term: "신학기 준비물", volume: 4065, trend: 1.12 },
      { term: "이사 공과금 정산", volume: 2000 }
    ],
    contentHook: "새 주소, 새 카드로 한번에",
    painPoints: ["이사 후 카드·자동납부 이전 번거로움", "신학기 고정비 급증", "혜택 비교 없이 기존 카드 그대로"],
    uspConnection: "국내 1% 무실적 + 자동납부 다중 통합 구조"
  },

  // ========== P2. 쿠팡·네이버 멤버십 반값 유지형 (5개) ==========
  {
    id: "P2-1",
    personaId: "P2",
    icon: "🛒",
    tier: "MEGA",
    card: "ALL",
    hookType: "Value-hook",
    title: "네이버플러스 4,900원 → 2,450원 진짜 반값",
    subtitle: "월 4,900원 멤버십이 2,450원이 되는 유일한 합법 경로",
    description: "네이버 멤버십 240만+ 네이버플러스 혜택 3.7만. 4,900원 캡에 딱 맞아떨어져서 실제로 진짜 반값이 되는 유일 구조.",
    annualVolume: 2620000,
    monthlyVolume: 218333,
    who: {
      tags: ["네이버쇼핑 헤비 유저", "네이버플러스 멤버", "30-50대 여성 60%"],
      dataEvidence: "네이버플러스 가입자 +76% 증가, 여성 비율 높음"
    },
    what: {
      tags: ["멤버십 50% 할인", "월 2,450원 실질 부담"],
      dataEvidence: "ALL 카드 쇼핑멤버십 50% + 월 3,000원 캡 = 정확히 반값"
    },
    when: {
      tags: ["매월 자동결제일", "멤버십 갱신 알림"],
      dataEvidence: "멤버십 자동결제일 전후 할인 정보 검색 피크"
    },
    where: {
      tags: ["네이버 멤버십 결제 화면", "유튜브 멤버십 소개"],
      dataEvidence: "네이버 멤버십 결제 페이지 월 80만 방문"
    },
    why: {
      tags: ["멤버십 유지 부담", "포인트·혜택은 놓치기 싫음"],
      dataEvidence: "멤버십 해지 고민 검색 월 10만+"
    },
    how: {
      tags: ["'진짜 반값' 시각 광고", "월 자동납부 설정 가이드"],
      dataEvidence: "멤버십 할인 콘텐츠 저장률 15%+"
    },
    pathFinder: ["네이버 멤버십", "네이버플러스 혜택", "멤버십 반값", "ALL 카드"],
    cluster: ["네이버플러스", "네이버 멤버십", "멤버십 할인", "자동납부 카드"],
    relatedKeywords: [
      { term: "네이버 멤버십", volume: 2401200 },
      { term: "네이버플러스 혜택", volume: 36600 },
      { term: "네이버플러스 가격", volume: 3130 }
    ],
    contentHook: "4,900원 → 2,450원, 진짜 반값의 유일한 합법 경로",
    painPoints: ["멤버십 비용 누적 부담", "혜택은 필요해서 해지 불가", "할인 정보 없음"],
    uspConnection: "쇼핑멤버십 50% 자동납부 (캡 내 정확히 반값)"
  },
  {
    id: "P2-2",
    personaId: "P2",
    icon: "🚚",
    tier: "LARGE",
    card: "ALL",
    hookType: "Retention-hook",
    title: "쿠팡와우 해지 vs 유지, 카드가 결정을 바꾼다",
    subtitle: "매일 해지 고민 중이라면 — 매달 3천 원 돌려받는 법",
    description: "와우 멤버십 가격(186,590) + 와우 해지(83,410) + 와우 멤버십(76,670). 7,890원 vs 3,000원 캡이라 38%만 할인되는 한계, 그러나 해지 직전 유저에겐 결정적.",
    annualVolume: 290000,
    monthlyVolume: 24167,
    who: {
      tags: ["쿠팡와우 멤버 (5,000만+)", "가격 인상 후 해지 고민자"],
      dataEvidence: "쿠팡와우 가격 인상 후 해지 검색 +170%"
    },
    what: {
      tags: ["와우 월 3,000원 환급", "실질 유지 비용 4,890원"],
      dataEvidence: "ALL 쇼핑멤버십 캡 3,000원 = 와우 7,890원의 38%"
    },
    when: {
      tags: ["쿠팡와우 가격 인상 직후", "자동결제일 전 해지 고민기"],
      dataEvidence: "와우 해지 검색 월 자동결제일 3-5일 전 피크"
    },
    where: {
      tags: ["쿠팡 앱 멤버십 관리", "네이버 블로그 와우 해지 후기"],
      dataEvidence: "와우 해지 후기 블로그 월 500만 PV"
    },
    why: {
      tags: ["가격 인상 누적 불만", "필요하지만 비싼 피로"],
      dataEvidence: "와우 가격 불만 검색 +42%"
    },
    how: {
      tags: ["해지 vs 유지 계산기", "'3천원 돌려받는 법' 가이드"],
      dataEvidence: "비교 계산기 콘텐츠 체류 평균 4분+"
    },
    pathFinder: ["쿠팡와우 가격", "쿠팡와우 해지", "와우 할인", "ALL 카드"],
    cluster: ["쿠팡와우", "와우 해지", "와우 가격 인상", "와우 멤버십"],
    relatedKeywords: [
      { term: "와우 멤버십 가격", volume: 186590 },
      { term: "와우 멤버십 해지", volume: 83410 },
      { term: "와우 멤버십", volume: 76670 }
    ],
    contentHook: "해지 직전, 매달 3천 원 돌려받는 법",
    painPoints: ["가격 인상 누적", "해지 시 무료배송 박탈", "대체 서비스 부재"],
    uspConnection: "쇼핑멤버십 50% (캡 제한 걸리나 3천 원 실수령 정직 소구)"
  },
  {
    id: "P2-3",
    personaId: "P2",
    icon: "🥬",
    tier: "NICHE",
    card: "ALL",
    hookType: "Hidden-hook",
    title: "컬리패스·요기패스도 반값, 잘 안 알려진 혜택",
    subtitle: "네이버플러스만큼 조용히 절약되는 두 멤버십",
    description: "컬리 멤버십·요기패스 할인 대상 포함이지만 알려지지 않음. 새벽배송·배달 중심 30-40대 여성이 핵심 타깃.",
    annualVolume: 15000,
    monthlyVolume: 1250,
    who: {
      tags: ["컬리패스·요기패스 멤버", "30-40대 여성"],
      dataEvidence: "컬리·요기요 프리미엄 멤버 여성 비율 65%+"
    },
    what: {
      tags: ["다중 멤버십 동시 할인", "통합 캡 내 유연 조합"],
      dataEvidence: "ALL 카드 쇼핑멤버십 50% 대상 = 네이버+쿠팡+컬리+요기 동시"
    },
    when: {
      tags: ["멤버십 2-3개 동시 가입 시점"],
      dataEvidence: "여러 멤버십 관리 검색 월 5만+"
    },
    where: {
      tags: ["컬리·요기요 앱 멤버십 화면"],
      dataEvidence: "멤버십 혜택 블로그 리뷰 지속 증가"
    },
    why: {
      tags: ["여러 멤버십 고정비 누적", "숨은 할인 발굴 욕구"],
      dataEvidence: "'멤버십 정리' 검색 +32%"
    },
    how: {
      tags: ["'아무도 모르는 반값' 콘텐츠", "멤버십 가입 루트 가이드"],
      dataEvidence: "꿀팁 콘텐츠 저장률 18%"
    },
    pathFinder: ["컬리 멤버십", "요기패스", "다중 멤버십 할인", "ALL 카드"],
    cluster: ["컬리 멤버십", "요기패스", "멤버십 정리", "자동납부"],
    relatedKeywords: [
      { term: "컬리 멤버십", volume: 8500 },
      { term: "요기패스", volume: 6500 }
    ],
    contentHook: "네이버·쿠팡만? 컬리·요기요도 반값",
    painPoints: ["여러 멤버십 고정비 누적", "숨은 할인 정보 부족"],
    uspConnection: "쇼핑멤버십 50% (여러 서비스 대상, 통합 캡 내 유연 조합)"
  },
  {
    id: "P2-4",
    personaId: "P2",
    icon: "🎁",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Combo-hook",
    title: "네이버플러스 + 넷플릭스 동시 할인 구조",
    subtitle: "네이버플러스로 넷플릭스 보는 사람의 카드 선택",
    description: "네이버플러스 넷플릭스 혜택(24만 검색). 네이버플러스의 OTT 1개 무료 혜택 + ALL 카드 OTT 10% = 이중 할인 결합.",
    annualVolume: 240000,
    monthlyVolume: 20000,
    who: {
      tags: ["네이버플러스 멤버 중 넷플릭스 혜택 선택자", "30-40대 가족·커플"],
      dataEvidence: "네이버플러스 가입자 중 OTT 혜택 선택 65%+"
    },
    what: {
      tags: ["멤버십 반값 + OTT 10%", "이중 할인 구조"],
      dataEvidence: "쇼핑멤버십 50% + OTT 10% 통합 캡 내 결합"
    },
    when: {
      tags: ["네이버플러스 가입·갱신 시점", "OTT 혜택 선택 시"],
      dataEvidence: "네이버플러스 OTT 혜택 선택 화면 월 30만 방문"
    },
    where: {
      tags: ["네이버플러스 가입 화면", "유튜브 가입 가이드"],
      dataEvidence: "네이버플러스 혜택 가이드 콘텐츠 지속 인기"
    },
    why: {
      tags: ["멤버십과 OTT 비용 동시 절약 욕구"],
      dataEvidence: "멤버십+OTT 동시 할인 검색 +28%"
    },
    how: {
      tags: ["'이중 할인' 시뮬레이션", "한 장으로 관리하는 법"],
      dataEvidence: "조합 콘텐츠 공유율 12%"
    },
    pathFinder: ["네이버플러스 넷플릭스", "네이버 멤버십 넷플릭스", "멤버십 OTT 할인", "ALL 카드"],
    cluster: ["네이버플러스 OTT", "넷플릭스 혜택", "멤버십 결합"],
    relatedKeywords: [
      { term: "네이버 멤버십 넷플릭스", volume: 241310 },
      { term: "네이버 플러스 넷플릭스", volume: 144290 },
      { term: "네이버플러스 넷플릭스", volume: 54570 }
    ],
    contentHook: "멤버십도 반값, OTT도 10% — 이중 할인",
    painPoints: ["멤버십 비용 + OTT 비용 누적", "혜택 조합 정보 부족"],
    uspConnection: "쇼핑멤버십 50% + OTT 10% 중복 (통합 캡 내 결합)"
  },
  {
    id: "P2-5",
    personaId: "P2",
    icon: "🔄",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Consolidation-hook",
    title: "자동납부 5종 한 장으로 정리하기",
    subtitle: "멤버십 × 2 + OTT × 2 + 통신사 = 매달 3천원 자동 리턴",
    description: "구독료 관리 + 정기결제 관련 검색 4만+. 여러 카드에 흩어진 자동납부를 한 장에 모으면 캡 최대 활용.",
    annualVolume: 40000,
    monthlyVolume: 3333,
    who: {
      tags: ["자동납부 3개 이상 보유자", "생활 고정비 관리형"],
      dataEvidence: "자동납부 관리 검색 30-50대 남녀 균등"
    },
    what: {
      tags: ["자동납부 통합 관리", "3개 USP 동시 캡 활용"],
      dataEvidence: "쇼핑멤버십 + OTT + 통신 = 월 3천원 × 3 = 9천원 최대"
    },
    when: {
      tags: ["연초 가계부 정리", "카드 혜택 점검기"],
      dataEvidence: "1월 자동납부 정리 검색 3.5배 피크"
    },
    where: {
      tags: ["가계부 앱 고정비 화면", "자동납부 관리 블로그"],
      dataEvidence: "가계부 앱 월 500만+ MAU"
    },
    why: {
      tags: ["여러 카드 결제 피로", "통합 관리 욕구"],
      dataEvidence: "'카드 하나로 정리' 검색 +41%"
    },
    how: {
      tags: ["5종 자동납부 체크리스트", "한 장 통합 가이드"],
      dataEvidence: "체크리스트 콘텐츠 평균 체류 5분+"
    },
    pathFinder: ["자동납부 카드 추천", "정기결제 관리", "구독료 정리", "ALL 카드"],
    cluster: ["자동납부", "정기결제", "구독료 관리", "가계부"],
    relatedKeywords: [
      { term: "자동납부 카드", volume: 12300 },
      { term: "정기결제 관리", volume: 8900 }
    ],
    contentHook: "5종 자동납부 한 장으로 매달 9천원 리턴",
    painPoints: ["여러 카드 흩어진 결제", "고정비 파악 어려움", "할인 기회 누락"],
    uspConnection: "자동납부 3종 통합 구조 총정리"
  },

  // ========== P3. 넷플릭스 싸게 유지형 (6개) ==========
  {
    id: "P3-1",
    personaId: "P3",
    icon: "📺",
    tier: "MEGA",
    card: "ALL",
    hookType: "Legal-hook",
    title: "유튜브 프리미엄 14,900원, 합법 할인 경로",
    subtitle: "우회·공유 없이 공식 결제로 할인받는 법",
    description: "유튜브 프리미엄 싸게(61만) + 할인(27만) + 저렴하게(2만). 우회·가족공유 단속 후 유일한 합법 경로.",
    annualVolume: 1380000,
    monthlyVolume: 115000,
    who: {
      tags: ["유튜브 프리미엄 유저 1,200만+", "우회 경로 탐색자", "20-40대"],
      dataEvidence: "유튜브 프리미엄 가격 월 92,000 검색"
    },
    what: {
      tags: ["공식 경로 10% 할인", "합법 · 장기 지속"],
      dataEvidence: "ALL OTT 10% (공식 홈페이지 자동납부 조건)"
    },
    when: {
      tags: ["VPN 우회 단속 뉴스 직후", "가족공유 차단 시점"],
      dataEvidence: "구글 VPN 단속 뉴스 시 검색 폭증"
    },
    where: {
      tags: ["유튜브 프리미엄 가입 페이지", "유튜브 우회 커뮤니티"],
      dataEvidence: "유튜브 프리미엄 가입 월 100만+"
    },
    why: {
      tags: ["우회 불안", "적발 리스크"],
      dataEvidence: "우회 계정 차단 사례 증가"
    },
    how: {
      tags: ["우회 vs 공식 리스크 비교", "'월 1,490원 절약' 계산"],
      dataEvidence: "합법 vs 우회 비교 영상 평균 조회수 10만+"
    },
    pathFinder: ["유튜브 프리미엄 싸게", "유튜브 프리미엄 할인", "공식 결제", "ALL 카드"],
    cluster: ["유튜브 프리미엄", "유튜브 할인", "공식 경로", "합법 할인"],
    relatedKeywords: [
      { term: "유튜브 프리미엄 싸게", volume: 611660 },
      { term: "유튜브 프리미엄 할인", volume: 268090 },
      { term: "유튜브 프리미엄 저렴하게", volume: 20580 },
      { term: "유튜브 프리미엄 결제", volume: 34540 }
    ],
    contentHook: "우회 없이도 1,490원 돌려받는 공식 경로",
    painPoints: ["VPN 불안", "가족공유 차단", "월 14,900원 부담"],
    uspConnection: "OTT 10% (공식 홈페이지 자동납부 조건 정확히 충족)"
  },
  {
    id: "P3-2",
    personaId: "P3",
    icon: "🚫",
    tier: "LARGE",
    card: "ALL",
    hookType: "Trend-hook",
    title: "VPN 막힌 2026, 공식 할인 채널의 부활",
    subtitle: "구글 VPN 단속 시작, 공유 계정 막혔다 — 다음은?",
    description: "유튜브 프리미엄 우회 연 37만 검색. 구글의 VPN·가족공유 단속 강화로 우회 수단 축소. 공식 할인 경로만 남는다.",
    annualVolume: 372000,
    monthlyVolume: 31000,
    who: {
      tags: ["VPN 우회 유저", "가족공유 멤버", "우회 계정 차단 경험자"],
      dataEvidence: "유튜브 프리미엄 우회 연 37만 + 가족공유 차단 검색"
    },
    what: {
      tags: ["우회 없는 합법 10% 할인"],
      dataEvidence: "ALL OTT 10% = 합법 경로 유일한 대안"
    },
    when: {
      tags: ["VPN 단속 뉴스 시점", "우회 계정 차단 경험 후"],
      dataEvidence: "단속 뉴스 직후 공식 전환 검색 급증"
    },
    where: {
      tags: ["디시 유튜브 갤", "우회 커뮤니티 전환 공지"],
      dataEvidence: "우회 커뮤니티에서 공식 전환 공유 증가"
    },
    why: {
      tags: ["우회 리스크 임계점", "적발·차단 두려움"],
      dataEvidence: "우회 차단 경험자 40% 공식 전환"
    },
    how: {
      tags: ["'우회 유저 컴백' 스토리", "ALL 카드 합법 할인 튜토리얼"],
      dataEvidence: "전환 스토리 콘텐츠 공유율 15%"
    },
    pathFinder: ["유튜브 프리미엄 우회", "VPN 막힘", "공식 할인", "ALL 카드"],
    cluster: ["유튜브 우회", "VPN 단속", "가족공유 차단", "공식 전환"],
    relatedKeywords: [
      { term: "유튜브 프리미엄 우회", volume: 372270 }
    ],
    contentHook: "우회 막힌 2026, 공식 할인이 다시 살아난다",
    painPoints: ["VPN 차단 경험", "가족공유 정지", "우회 계정 적발 불안"],
    uspConnection: "OTT 10% (합법 경로 유일한 대안)"
  },
  {
    id: "P3-3",
    personaId: "P3",
    icon: "📈",
    tier: "NICHE",
    card: "ALL",
    hookType: "Resistance-hook",
    title: "넷플릭스 가격 인상 3번째, 이번엔 다르게",
    subtitle: "또 오른 넷플릭스, 해지 말고 월 1,350원 깎는 법",
    description: "넷플릭스 가격 인상(1.8만, +286% 폭증). 2026년 세 번째 인상. 해지 vs 유지 기로에서 10% 할인이 결정 변수.",
    annualVolume: 18000,
    monthlyVolume: 1500,
    who: {
      tags: ["넷플릭스 장기 구독자", "가격 인상 불만층"],
      dataEvidence: "넷플릭스 가격 인상 검색 +286%"
    },
    what: {
      tags: ["월 1,350원 환급", "인상분 상쇄"],
      dataEvidence: "프리미엄 17,000원 × 10% = 1,700원 (캡 내)"
    },
    when: {
      tags: ["가격 인상 공지 직후", "갱신월 결제 전"],
      dataEvidence: "인상 공지 직후 해지 검색 3배 폭증"
    },
    where: {
      tags: ["넷플릭스 결제 페이지", "가격 인상 뉴스 댓글"],
      dataEvidence: "가격 인상 기사 댓글 500개+"
    },
    why: {
      tags: ["반복 인상 피로", "해지 vs 유지 갈등"],
      dataEvidence: "해지 후 재가입 패턴 연 20% 증가"
    },
    how: {
      tags: ["'인상 다시 제로로' 캠페인", "실질 가격 계산기"],
      dataEvidence: "가격 계산기 콘텐츠 평균 체류 4분+"
    },
    pathFinder: ["넷플릭스 가격 인상", "넷플릭스 해지", "넷플릭스 할인", "ALL 카드"],
    cluster: ["넷플릭스 가격", "가격 인상", "구독료 저항"],
    relatedKeywords: [
      { term: "넷플릭스 가격 인상", volume: 18010, trend: 2.86 }
    ],
    contentHook: "인상 3번째, 이번엔 해지 말고 10% 돌려받기",
    painPoints: ["반복 가격 인상 분노", "해지 고민 피로", "대체 OTT 부재"],
    uspConnection: "OTT 10% (넷플릭스 공식 홈페이지 결제 조건)",
    competition: {
      ranking: [
        { name: "넷플릭스 할인 (자연 검색)", type: "정보 허브", share: "1위", volume: 64870 },
        { name: "넷플릭스 싸게", type: "정보 검색", share: "2위", volume: 16870 },
        { name: "신한카드 B라운드", type: "경쟁 카드사", share: "3위", volume: 12000 },
        { name: "넷플릭스 할인카드", type: "비교 검색", share: "4위", volume: 10750 },
        { name: "KB국민카드 (OTT 혜택)", type: "카드사", share: "인지도 낮음", volume: 3000 }
      ],
      insight: "넷플릭스 가격 인상 이후 '할인 카드' 검색 여정에 KB 부재. 신한카드가 'OTT 월 15%' 포지션 선점 중. ALL 카드 OTT 10%는 '무실적·무한도' 차별점으로 공략."
    }
  },
  {
    id: "P3-4",
    personaId: "P3",
    icon: "🎭",
    tier: "MEGA",
    card: "ALL",
    hookType: "Portfolio-hook",
    title: "티빙·웨이브·쿠팡플레이 4개 동시 관리법",
    subtitle: "OTT 3-4개 구독자가 한 카드로 통합 할인",
    description: "티빙 요금제(114만) + 넷플릭스 요금제(225만) + 디즈니플러스(3만) + 웨이브·쿠팡플레이. OTT 포트폴리오 시대의 통합 관리.",
    annualVolume: 3500000,
    monthlyVolume: 291667,
    who: {
      tags: ["OTT 3-4개 구독자", "콘텐츠 헤비 유저", "20-40대"],
      dataEvidence: "OTT 3개 이상 구독자 약 40%"
    },
    what: {
      tags: ["6종 OTT 동시 10% 할인", "월 3,000원 캡 최대 활용"],
      dataEvidence: "넷플·유튜브·티빙·웨이브·쿠팡플·디즈니+ = 월 5-8만 구독료"
    },
    when: {
      tags: ["신규 OTT 가입·갱신", "연말 OTT 정리"],
      dataEvidence: "OTT 가입 검색 매년 11-2월 피크"
    },
    where: {
      tags: ["각 OTT 결제 페이지", "OTT 추천 블로그"],
      dataEvidence: "OTT 비교 블로그 월 200만+ PV"
    },
    why: {
      tags: ["구독 포트폴리오 피로", "통합 절약 니즈"],
      dataEvidence: "OTT 정리 검색 +38%"
    },
    how: {
      tags: ["OTT 포트폴리오 관리법", "한 카드 통합 가이드"],
      dataEvidence: "관리법 콘텐츠 저장률 20%"
    },
    pathFinder: ["OTT 요금제", "넷플릭스 티빙 비교", "OTT 정리", "ALL 카드"],
    cluster: ["OTT", "구독 포트폴리오", "스트리밍 서비스"],
    relatedKeywords: [
      { term: "넷플릭스 요금제", volume: 2247800 },
      { term: "티빙 요금제", volume: 1138800 },
      { term: "디즈니플러스 구독", volume: 30810 }
    ],
    contentHook: "OTT 4개, 한 카드로 매달 3천원 환급",
    painPoints: ["OTT 4개 = 월 5-8만 부담", "각 서비스별 할인 혼란", "해지 순서 고민"],
    uspConnection: "OTT 10% (넷플릭스/티빙/유튜브 프리미엄 등 6종 동시 대응)"
  },
  {
    id: "P3-5",
    personaId: "P3",
    icon: "🆕",
    tier: "LARGE",
    card: "ALL",
    hookType: "Newstrend-hook",
    title: "유튜브 프리미엄 라이트 8,500원 한국 신출시 분석",
    subtitle: "2026.1 신출시, 라이트 vs 정규 어떤 게 이득?",
    description: "유튜브 프리미엄 라이트(46.3만). 2026.1 국내 출시 후 검색 폭증. 라이트도 공식 결제 시 ALL 카드 10% 적용.",
    annualVolume: 465000,
    monthlyVolume: 38750,
    who: {
      tags: ["유튜브 프리미엄 가격 부담층", "라이트 관심 신규"],
      dataEvidence: "라이트 출시 후 검색 3배 폭증"
    },
    what: {
      tags: ["라이트 8,500원 - 10% = 7,650원", "저가 진입"],
      dataEvidence: "라이트는 기본 가격이 낮아 캡 미도달 10% 완전 적용"
    },
    when: {
      tags: ["라이트 신규 가입 결정기", "정규에서 라이트 다운그레이드"],
      dataEvidence: "출시 직후 1-3개월 집중 검색"
    },
    where: {
      tags: ["유튜브 프리미엄 가입 페이지", "라이트 리뷰 유튜브"],
      dataEvidence: "라이트 리뷰 영상 조회수 10만+"
    },
    why: {
      tags: ["프리미엄 정규 가격 부담", "저가 대안 탐색"],
      dataEvidence: "가격 대안 검색 +45%"
    },
    how: {
      tags: ["라이트 vs 정규 비교", "10% 할인 적용법"],
      dataEvidence: "비교 콘텐츠 평균 체류 3분+"
    },
    pathFinder: ["유튜브 프리미엄 라이트", "라이트 가격", "라이트 할인", "ALL 카드"],
    cluster: ["유튜브 프리미엄 라이트", "프리미엄 가격", "라이트 vs 정규"],
    relatedKeywords: [
      { term: "유튜브 프리미엄 라이트", volume: 463420 }
    ],
    contentHook: "라이트 8,500원, 공식 10% 더 깎는 법",
    painPoints: ["정규 부담", "라이트 혜택 불명확", "할인 적용 여부 의문"],
    uspConnection: "OTT 10% (어느 쪽이든 공식 결제 시 10% 적용)"
  },
  {
    id: "P3-6",
    personaId: "P3",
    icon: "💊",
    tier: "NICHE",
    card: "ALL",
    hookType: "Diet-hook",
    title: "구독료 다이어트 — OTT 3개 할인 체크리스트",
    subtitle: "매달 7만원 빠져나가는 4개 구독, 하나로 1만원 줄이기",
    description: "유튜브 프리미엄 구독(46,400) + 구독 저항 맥락. 구독료 통제가 라이프스타일 트렌드.",
    annualVolume: 45000,
    monthlyVolume: 3750,
    who: {
      tags: ["구독 4개+ 유저", "구독료 다이어트 실행자"],
      dataEvidence: "구독료 검색 월말 피크"
    },
    what: {
      tags: ["체크리스트로 통합 할인", "월 1만원 절약"],
      dataEvidence: "OTT 6종 동시 10% = 월 최대 3,000원(캡)"
    },
    when: {
      tags: ["가계부 정리 연초", "급여 삭감·실적 부담기"],
      dataEvidence: "구독료 다이어트 1-3월 피크"
    },
    where: {
      tags: ["가계부 앱", "유튜브 구독료 다이어트 영상"],
      dataEvidence: "구독료 다이어트 영상 월 100만+"
    },
    why: {
      tags: ["구독 총액 파악 어려움", "통제감 회복 욕구"],
      dataEvidence: "'구독료 얼마' 검색 +30%"
    },
    how: {
      tags: ["OTT 3개 할인 체크리스트", "매달 자동 정산"],
      dataEvidence: "체크리스트 콘텐츠 저장률 18%"
    },
    pathFinder: ["구독료 다이어트", "OTT 정리", "구독 관리", "ALL 카드"],
    cluster: ["구독료", "구독 다이어트", "OTT 정리"],
    relatedKeywords: [
      { term: "유튜브 프리미엄 구독", volume: 46400 }
    ],
    contentHook: "매달 7만 구독, 한 카드로 1만 되돌려",
    painPoints: ["구독 누적 피로", "총액 파악 어려움", "통제감 상실"],
    uspConnection: "OTT 10% 통합 운영"
  },
  {
    id: "P3-7",
    personaId: "P3",
    icon: "🔄",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Diet-hook",
    title: "정기적 구독 다이어트 파트너",
    subtitle: "'안 쓰는 구독 있나?' 계절마다 한번씩 점검",
    description: "구독 해지 고민을 '계절 루틴'으로 포지셔닝. 분기별로 구독 리스트 점검 → 불필요한 것 해지 + 핵심 구독만 ALL 카드 10%로 유지. '해지 유도'가 아닌 '스마트 유지'.",
    annualVolume: 100000,
    monthlyVolume: 8333,
    seasonality: { type: "yearend_peak", peakMonths: [12, 1, 2], description: "연말·연초 가계 점검기 피크" },
    who: {
      tags: ["OTT 3개+ 유저", "가계부 작성자", "30-40대 고정비 관리층"],
      dataEvidence: "넷플릭스 해지 연 98K, 구독 관련 검색 연초 피크"
    },
    what: {
      tags: ["분기별 구독 점검 루틴", "핵심 3개만 ALL로 유지"],
      dataEvidence: "분기 점검으로 구독 2-3개 해지 평균 월 3만 절약 + ALL 10%로 추가 절약"
    },
    when: {
      tags: ["1월 신년 결심기", "4·7·10월 분기 점검", "결제일 직전"],
      dataEvidence: "구독 해지 검색 12-2월·결제일 전후 피크"
    },
    where: {
      tags: ["가계부 앱", "토스 카드 가계부", "유튜브 구독 다이어트"],
      dataEvidence: "구독 다이어트 영상 월 조회 100만+"
    },
    why: {
      tags: ["구독 피로 누적", "해지 vs 유지 반복 고민", "'안 쓰는데 빠지는 돈'"],
      dataEvidence: "'구독료 얼마' 검색 +30%"
    },
    how: {
      tags: ["'분기 구독 점검' 체크리스트", "구독 다이어트 가이드 콘텐츠"],
      dataEvidence: "체크리스트 콘텐츠 저장률 20%+"
    },
    pathFinder: ["구독 해지 고민", "구독 다이어트", "핵심 구독만 할인", "ALL 카드"],
    cluster: ["구독 해지", "구독 다이어트", "OTT 정리", "넷플릭스 해지"],
    relatedKeywords: [
      { term: "넷플릭스 해지", volume: 97860 },
      { term: "유튜브 프리미엄 해지", volume: 30000 },
      { term: "티빙 해지", volume: 15000 }
    ],
    contentHook: "안 쓰는 구독 다 빼고, 핵심만 10% 할인으로",
    painPoints: ["구독 누적 부담", "해지 vs 유지 반복 갈등", "구독 관리 도구 부족"],
    uspConnection: "OTT 10% (핵심 유지 구독 대상)"
  },

  // ========== P4. 365일 해외 카드형 (6개) ==========
  {
    id: "P4-1",
    personaId: "P4",
    icon: "🤖",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "AI-hook",
    title: "ChatGPT + Claude + Midjourney 한 카드로",
    subtitle: "AI 3종 월 60달러, 수수료 상쇄 + 0.65% 환급",
    description: "ChatGPT 할인(4.3만) + Claude 할인(1만, +733%) + Gemini 할인(1.5만) + 미드저니 할인(6,420) + Claude 구독 할인(968, +625%).",
    annualVolume: 30000,
    monthlyVolume: 2500,
    who: {
      tags: ["AI 구독 헤비 유저 (2-3종)", "개발자·크리에이터·마케터", "20-40대 남성 60%"],
      dataEvidence: "Claude 관련 +733% 폭증"
    },
    what: {
      tags: ["해외 2% 실질 0.65% 상쇄", "AI 3종 월 50-80달러"],
      dataEvidence: "해외 결제 수수료 1.35% - 환급 2% = +0.65%"
    },
    when: {
      tags: ["AI 구독 시작기", "해외 수수료 확인 시점"],
      dataEvidence: "AI 구독 +200% 증가"
    },
    where: {
      tags: ["OpenAI·Anthropic·Midjourney 결제", "개발자 커뮤니티"],
      dataEvidence: "AI 구독 결제 페이지 월 수십만 방문"
    },
    why: {
      tags: ["해외 수수료 부담", "구독 총액 증가"],
      dataEvidence: "해외 결제 수수료 검색 +80%"
    },
    how: {
      tags: ["AI 구독 3종 관리법", "수수료 상쇄 계산기"],
      dataEvidence: "AI 구독 가이드 저장률 22%"
    },
    pathFinder: ["ChatGPT 구독", "Claude 할인", "미드저니 할인", "ALL 카드"],
    cluster: ["AI 구독", "ChatGPT Plus", "Claude Pro", "Midjourney"],
    relatedKeywords: [
      { term: "ChatGPT 할인", volume: 42970 },
      { term: "Claude 할인", volume: 9990, trend: 7.33 },
      { term: "Gemini 할인", volume: 14860 },
      { term: "미드저니 할인", volume: 6420 }
    ],
    contentHook: "AI 3종 월 60달러, 수수료 상쇄 + 0.65% 환급",
    painPoints: ["해외 결제 수수료 매번 부담", "구독 3개 총액 부담", "환율 변동 불안"],
    uspConnection: "해외 2% (실질 0.65% 상쇄 후 플러스)"
  },
  {
    id: "P4-2",
    personaId: "P4",
    icon: "🚀",
    tier: "MEDIUM",
    card: "ALL",
    hookType: "Surge-hook",
    title: "Claude Pro 가격 검색 +2,050% — 시장이 움직인다",
    subtitle: "2025년 말 시작된 Claude 결제 수요, 카드사가 아직 안 잡은 틈",
    description: "Claude Pro 할인(789, +2,050%) + Claude 가격(15,280, +482%) + Claude Pro(18,190, +412%). 2026 초 폭증 중인 신규 카테고리.",
    annualVolume: 16000,
    monthlyVolume: 1333,
    who: {
      tags: ["Claude 신규 유저", "ChatGPT → Claude 전환자"],
      dataEvidence: "Claude Pro 검색 +2,050% 폭증"
    },
    what: {
      tags: ["Anthropic 해외 결제 수수료 상쇄", "월 20달러 구독"],
      dataEvidence: "Claude Pro 20달러 × 해외 2% 환급"
    },
    when: {
      tags: ["Claude 4 신모델 출시 직후", "Claude 전환 결정기"],
      dataEvidence: "출시 뉴스 직후 검색 10배 폭증"
    },
    where: {
      tags: ["Anthropic 결제 페이지", "AI 비교 콘텐츠"],
      dataEvidence: "Claude 비교 콘텐츠 월 30만+"
    },
    why: {
      tags: ["해외 결제 수수료 부담", "신규 서비스 결제 경험 부족"],
      dataEvidence: "Claude 결제 방법 검색 +200%"
    },
    how: {
      tags: ["'Claude 결제 최적 카드' 가이드", "수수료 비교"],
      dataEvidence: "Claude 결제 가이드 저장률 25%"
    },
    pathFinder: ["Claude Pro 할인", "Claude 가격", "Anthropic 결제", "ALL 카드"],
    cluster: ["Claude", "Anthropic", "AI 구독"],
    relatedKeywords: [
      { term: "Claude Pro 할인", volume: 789, trend: 20.5 },
      { term: "Claude 가격", volume: 15280, trend: 4.82 },
      { term: "Claude Pro", volume: 18190, trend: 4.12 }
    ],
    contentHook: "Claude 결제 수요 +2,050%, 아직 카드사가 안 잡은 틈",
    painPoints: ["Claude 결제 방법 혼란", "수수료 부담", "기존 카드 환급 없음"],
    uspConnection: "해외 2% (Anthropic 해외결제 수수료 상쇄)"
  },
  {
    id: "P4-3",
    personaId: "P4",
    icon: "🎁",
    tier: "NICHE",
    card: "ALL",
    hookType: "Stacking-hook",
    title: "알리 카드할인 진짜 되는 카드",
    subtitle: "알리에서 '카드할인' 체크박스 뜨는 카드, 따로 있다",
    description: "알리 카드할인(13,320, +350%) + 알리 결제 할인(3,560, +290%). 알리익스프레스 내 카드 결제 할인 적용 카드 선별.",
    annualVolume: 15000,
    monthlyVolume: 1250,
    who: {
      tags: ["알리익스프레스 헤비 유저", "직구 월 2회+"],
      dataEvidence: "알리 쿠폰 월 34만+"
    },
    what: {
      tags: ["알리 자체 할인 + ALL 카드 2% 이중", "중복 할인 구조"],
      dataEvidence: "알리 결제 시 카드사별 할인 이벤트 중복 적용"
    },
    when: {
      tags: ["알리 대형 세일 기간", "쿠폰 적용 결제 시점"],
      dataEvidence: "1111·618·블프 세일기 검색 5배 폭증"
    },
    where: {
      tags: ["알리 결제 화면", "직구 커뮤니티 카드 정보"],
      dataEvidence: "알리 카드 정보 커뮤니티 활성"
    },
    why: {
      tags: ["중복 할인 최대화", "세일기 추가 할인 욕구"],
      dataEvidence: "'알리 카드할인' 검색 +350%"
    },
    how: {
      tags: ["세일기 이중 할인 가이드", "카드 체크박스 뜨는 조건"],
      dataEvidence: "세일 가이드 콘텐츠 저장률 30%"
    },
    pathFinder: ["알리 카드할인", "알리 결제 할인", "알리 쿠폰", "ALL 카드"],
    cluster: ["알리익스프레스", "직구 할인", "해외쇼핑 카드"],
    relatedKeywords: [
      { term: "알리 카드할인", volume: 13320, trend: 3.5 },
      { term: "알리 결제 할인", volume: 3560, trend: 2.9 }
    ],
    contentHook: "알리 세일기, 카드할인 체크박스 뜨는 카드",
    painPoints: ["카드 할인 대상 여부 불명확", "세일기 할인 조합 혼란"],
    uspConnection: "해외 2% (알리 결제 시 중복 할인 구조)"
  },
  {
    id: "P4-4",
    personaId: "P4",
    icon: "📦",
    tier: "MEGA",
    card: "ALL",
    hookType: "Routine-hook",
    title: "테무·알리·아마존 월 20만원 직구러의 카드",
    subtitle: "직구 월 20만이면 연 1만 5천원 돌려받는 구조",
    description: "알리 쿠폰(34만) + 테무 쿠폰(40만) + 아마존 직구(12만). 직구 일상화된 20-40대 핵심 타깃.",
    annualVolume: 830000,
    monthlyVolume: 69167,
    who: {
      tags: ["직구 월 2-4회 이상", "20-40대 남녀"],
      dataEvidence: "직구 이용자 연 1,000만 추산"
    },
    what: {
      tags: ["해외 2% 환급", "실적 40만 쉽게 충족"],
      dataEvidence: "월 40만 캡 → 연 최대 48만 환급"
    },
    when: {
      tags: ["세일기 집중 직구", "매주 주말 쇼핑 루틴"],
      dataEvidence: "주말 직구 검색 평월 대비 1.5배"
    },
    where: {
      tags: ["테무·알리 앱 결제", "아마존 한국 결제"],
      dataEvidence: "직구 앱 월 MAU 2,000만+"
    },
    why: {
      tags: ["가격 경쟁력 직구 지속", "환급으로 추가 절약"],
      dataEvidence: "직구 시장 연 30% 성장"
    },
    how: {
      tags: ["'직구 월 20만 = 연 환급' 캠페인", "직구 카드 비교"],
      dataEvidence: "직구 카드 비교 콘텐츠 월 50만 PV"
    },
    pathFinder: ["테무 쿠폰", "알리 쿠폰", "아마존 직구", "ALL 카드"],
    cluster: ["직구", "테무", "알리익스프레스", "아마존"],
    relatedKeywords: [
      { term: "테무 쿠폰", volume: 397290 },
      { term: "알리 쿠폰", volume: 343830 },
      { term: "아마존 직구", volume: 121150 }
    ],
    contentHook: "직구 월 20만 = 연 1만 5천 환급",
    painPoints: ["해외 결제 수수료 누적", "환급 카드 정보 부족", "실적 미달 걱정"],
    uspConnection: "해외 2% (전월 40만 쉽게 충족, 월 4만 캡 충분)"
  },
  {
    id: "P4-5",
    personaId: "P4",
    icon: "✈️",
    tier: "LARGE",
    card: "ALL",
    hookType: "Positioning-hook",
    title: "트래블카드는 여행용, ALL은 365일용",
    subtitle: "여행 카드 vs 메인 카드 — 해외결제는 양쪽 다 잡는다",
    description: "트래블카드(74.5만) + 하나 트래블로그(9.2만) + 토스뱅크 체크카드(12.9만). 트래블과 충돌 아닌 보완 포지션.",
    annualVolume: 750000,
    monthlyVolume: 62500,
    who: {
      tags: ["트래블카드 보유자", "365일 메인 해외 결제 수요자"],
      dataEvidence: "트래블카드 월 62K 검색"
    },
    what: {
      tags: ["여행용 트래블 + 365일 메인 ALL", "이중 포지셔닝"],
      dataEvidence: "트래블카드 + 메인카드 2장 보유 비율 35%"
    },
    when: {
      tags: ["트래블카드 실적 불가 시점", "일상 AI·직구 결제"],
      dataEvidence: "트래블카드 실적 미적립 불만 증가"
    },
    where: {
      tags: ["트래블카드 후기 블로그", "해외 결제 비교 유튜브"],
      dataEvidence: "해외 카드 비교 월 300만 PV"
    },
    why: {
      tags: ["트래블카드만으론 부족", "일상 해외 결제 실적 부재"],
      dataEvidence: "'트래블카드 부족' 검색 증가"
    },
    how: {
      tags: ["트래블 vs ALL 포지셔닝 비교", "'365일 쓰는 해외 카드' 캠페인"],
      dataEvidence: "카드 포지셔닝 비교 콘텐츠 공유율 18%"
    },
    pathFinder: ["트래블카드", "하나 트래블로그", "해외 카드 추천", "ALL 카드"],
    cluster: ["트래블카드", "해외 카드", "일상 해외 결제"],
    relatedKeywords: [
      { term: "트래블카드", volume: 745040 },
      { term: "하나 트래블로그", volume: 92240 },
      { term: "토스뱅크 체크카드", volume: 128710 }
    ],
    contentHook: "트래블은 여행용, ALL은 365일 해외용",
    painPoints: ["트래블카드 실적 미적립", "일상 해외 결제 카드 부재"],
    uspConnection: "해외 2% 포지셔닝 차별화 (트래블과 충돌 아닌 보완)"
  },
  {
    id: "P4-6",
    personaId: "P4",
    icon: "👨‍💻",
    tier: "NICHE",
    card: "ALL",
    hookType: "Niche-hook",
    title: "Cursor·Perplexity 개발자 AI 구독 스택",
    subtitle: "개발자 월 50-80달러 AI 구독의 최적 카드",
    description: "Cursor 할인(1,099, +62%) + Perplexity 구독(1,150, +162%). 개발자·지식노동자의 AI 스택 확산.",
    annualVolume: 6000,
    monthlyVolume: 500,
    who: {
      tags: ["개발자·지식노동자", "AI 스택 유저", "20-30대 남성"],
      dataEvidence: "Cursor/Perplexity 유저 20-30대 남성 편중"
    },
    what: {
      tags: ["개발자 AI 3-5종 환급", "월 50-80달러 구독 관리"],
      dataEvidence: "해외 2% + 월 4만 캡"
    },
    when: {
      tags: ["개발자 신규 AI 구독 시점", "AI 툴 업그레이드"],
      dataEvidence: "개발자 AI 툴 연 신규 도입 +150%"
    },
    where: {
      tags: ["Cursor·Perplexity 결제", "개발자 커뮤니티 GeekNews"],
      dataEvidence: "개발자 커뮤니티 AI 스택 공유 활성"
    },
    why: {
      tags: ["AI 스택 누적 비용", "해외 결제 수수료"],
      dataEvidence: "개발자 AI 구독 비용 월 평균 60달러"
    },
    how: {
      tags: ["개발자 AI 스택 관리법", "카드 환급 계산"],
      dataEvidence: "개발자 AI 콘텐츠 체류 5분+"
    },
    pathFinder: ["Cursor 할인", "Perplexity 구독", "개발자 AI 카드", "ALL 카드"],
    cluster: ["Cursor", "Perplexity", "개발자 AI"],
    relatedKeywords: [
      { term: "Cursor 할인", volume: 1099, trend: 0.62 },
      { term: "Perplexity 구독", volume: 1150, trend: 1.62 }
    ],
    contentHook: "개발자 AI 스택, 카드로 월 1달러 되찾기",
    painPoints: ["AI 스택 비용 누적", "수수료 부담", "회사 카드 vs 개인 카드 갈등"],
    uspConnection: "해외 2% (개발자 타깃 세분화)"
  },

  // ========== P5. 가족 혜택 확장형 (5개) ==========
  {
    id: "P5-1",
    personaId: "P5",
    icon: "🧾",
    tier: "NICHE",
    card: "ALL",
    hookType: "Season-hook",
    title: "연말정산 1월, 가족카드 실적 합산의 기술",
    subtitle: "부부 합산 실적으로 40만 조건 편하게, 1%는 가족 전원",
    description: "가족카드 연말정산(32,410). 1월 10배 시즌 폭증. 실적 합산 구조 이해 = 카드 전환 결정.",
    annualVolume: 35000,
    monthlyVolume: 2917,
    who: {
      tags: ["30-50대 기혼 근로자", "가족카드 미사용자"],
      dataEvidence: "연말정산 시즌 가족카드 검색 10배"
    },
    what: {
      tags: ["가족 실적 합산", "가족 1% 환급"],
      dataEvidence: "가족카드 무료·무제한 + 실적 합산 조항"
    },
    when: {
      tags: ["1-3월 연말정산 시즌"],
      dataEvidence: "1월 검색 평월 대비 10배"
    },
    where: {
      tags: ["국세청 홈택스", "연말정산 가이드 블로그"],
      dataEvidence: "연말정산 관련 콘텐츠 1월 월 200만 PV"
    },
    why: {
      tags: ["세금 공제 극대화", "가족 합산 혜택 궁금증"],
      dataEvidence: "'가족카드 실적' 연말 피크"
    },
    how: {
      tags: ["연말정산 체크리스트", "가족 합산 시뮬레이터"],
      dataEvidence: "연말정산 콘텐츠 체류 7분+"
    },
    pathFinder: ["가족카드 연말정산", "신용카드 공제", "가족 합산", "ALL 카드"],
    cluster: ["가족카드", "연말정산", "신용카드 공제"],
    relatedKeywords: [
      { term: "가족카드 연말정산", volume: 32410 }
    ],
    contentHook: "연말정산 1월, 가족 4인 1% 전원 구조",
    painPoints: ["실적 합산 방법 모름", "가족카드 절차 복잡"],
    uspConnection: "가족카드 무료·무제한 (실적 합산)"
  },
  {
    id: "P5-2",
    personaId: "P5",
    icon: "🧑‍🎓",
    tier: "NICHE",
    card: "ALL",
    hookType: "Youth-hook",
    title: "자녀 첫 체크카드, 혜택도 1% 그대로",
    subtitle: "고등학생 자녀에게도 무실적 1% 적립",
    description: "청소년 체크카드(16,910, +41%). 자녀 첫 카드는 부모 결정. 혜택 구조가 중요 판단 기준.",
    annualVolume: 17000,
    monthlyVolume: 1417,
    who: {
      tags: ["중고생·대학생 자녀 부모", "첫 카드 선택 시점"],
      dataEvidence: "청소년 체크카드 검색 +41%"
    },
    what: {
      tags: ["자녀 카드도 본인 동일 1%", "무실적 유지"],
      dataEvidence: "가족카드 본인 혜택 동일 적용 조항"
    },
    when: {
      tags: ["중학교 입학·고등학교 입학·대학 입학"],
      dataEvidence: "학년 시작 3월 검색 3배 피크"
    },
    where: {
      tags: ["네이버 맘카페", "청소년 금융 블로그"],
      dataEvidence: "맘카페 청소년 카드 포스팅 월 1만+"
    },
    why: {
      tags: ["자녀 금융교육", "실적 걱정 없이 혜택 유지"],
      dataEvidence: "청소년 금융교육 관심 증가"
    },
    how: {
      tags: ["자녀 첫 카드 가이드", "부모·자녀 혜택 동일 비교"],
      dataEvidence: "자녀 금융교육 콘텐츠 저장률 22%"
    },
    pathFinder: ["청소년 체크카드", "자녀 체크카드", "첫 카드 추천", "ALL 카드"],
    cluster: ["청소년 체크카드", "자녀 카드", "금융교육"],
    relatedKeywords: [
      { term: "청소년 체크카드", volume: 16910, trend: 0.41 }
    ],
    contentHook: "고등학생 자녀도 무실적 1% 적립",
    painPoints: ["자녀용 카드 혜택 제한", "금융교육 도구 부족"],
    uspConnection: "가족카드 (본인 혜택 동일 적용 조항 정확히 활용)"
  },
  {
    id: "P5-3",
    personaId: "P5",
    icon: "🏦",
    tier: "NICHE",
    card: "ALL",
    hookType: "Growth-hook",
    title: "아이 용돈카드 +88% 성장, 엄마들이 선택하는 기준",
    subtitle: "아이도 카드 쓰면 1% 돌려받는다 — 교육 도구 + 가계 절약",
    description: "아이 용돈 카드(10,530, +88% 폭증). 초등·중학 자녀에게 용돈카드 주는 트렌드 급성장.",
    annualVolume: 11000,
    monthlyVolume: 917,
    who: {
      tags: ["초등·중학 자녀 엄마", "30-40대 여성"],
      dataEvidence: "아이 용돈 카드 검색 +88%"
    },
    what: {
      tags: ["자녀 용돈 결제도 1% 환급", "부모 실적 합산"],
      dataEvidence: "가족카드 + 국내 1% 결합"
    },
    when: {
      tags: ["초등 입학·중학 진학", "용돈 제도 시작 시점"],
      dataEvidence: "용돈 카드 3월·9월 검색 피크"
    },
    where: {
      tags: ["맘카페 육아 게시판", "유튜브 금융교육 채널"],
      dataEvidence: "아이 용돈 카드 정보 맘카페 집중"
    },
    why: {
      tags: ["자녀 금융 습관 형성", "부모 가계 합산 욕구"],
      dataEvidence: "용돈 카드 관심 증가"
    },
    how: {
      tags: ["아이 용돈 카드 가이드", "금융교육 시나리오"],
      dataEvidence: "금융교육 콘텐츠 저장률 25%"
    },
    pathFinder: ["아이 용돈 카드", "초등 용돈", "자녀 용돈 카드", "ALL 카드"],
    cluster: ["아이 용돈", "자녀 용돈 카드", "금융교육"],
    relatedKeywords: [
      { term: "아이 용돈 카드", volume: 10530, trend: 0.88 }
    ],
    contentHook: "아이 용돈도 1% 돌아오는 가족카드",
    painPoints: ["아이 용돈 카드 정보 부족", "혜택 유지 걱정"],
    uspConnection: "가족카드 (자녀 금융교육 + 본인 실적 합산)"
  },
  {
    id: "P5-4",
    personaId: "P5",
    icon: "💑",
    tier: "NICHE",
    card: "ALL",
    hookType: "Couple-hook",
    title: "신혼부부 생활비 카드, 1%가 가족으로 확장되는 법",
    subtitle: "부부 월 400만 지출이면 연 48만 돌려받는 구조",
    description: "신혼부부 생활비 카드(3,050, +29%). 결혼 1-3년 차 생활비 통합 관리 수요.",
    annualVolume: 3000,
    monthlyVolume: 250,
    who: {
      tags: ["결혼 1-3년 차 부부", "30-40대 맞벌이"],
      dataEvidence: "신혼부부 재테크 검색 +29%"
    },
    what: {
      tags: ["부부 합산 연 48만 환급", "생활비 통합 1%"],
      dataEvidence: "월 400만 × 1% = 월 4만, 연 48만"
    },
    when: {
      tags: ["결혼 직후 가계 구축기", "가계부 앱 설치 시점"],
      dataEvidence: "결혼 1년차 가계부 검색 피크"
    },
    where: {
      tags: ["맘카페 신혼 게시판", "뱅크샐러드 앱"],
      dataEvidence: "신혼 생활비 블로그 월 100만 PV"
    },
    why: {
      tags: ["부부 지출 통합 욕구", "혜택 극대화"],
      dataEvidence: "신혼 재테크 관심 증가"
    },
    how: {
      tags: ["신혼 재테크 가이드", "부부 카드 시나리오"],
      dataEvidence: "신혼 재테크 콘텐츠 저장률 28%"
    },
    pathFinder: ["신혼부부 생활비 카드", "신혼 재테크", "부부 카드", "ALL 카드"],
    cluster: ["신혼부부", "생활비 카드", "부부 재테크"],
    relatedKeywords: [
      { term: "신혼부부 생활비 카드", volume: 3050, trend: 0.29 }
    ],
    contentHook: "부부 월 400만 = 연 48만 돌려받기",
    painPoints: ["부부 지출 분산", "가계 통합 혼란"],
    uspConnection: "가족카드 + 국내 1% 무한도 결합 (월 할인 한도 없음 × 가족 확장)"
  },
  {
    id: "P5-5",
    personaId: "P5",
    icon: "👨‍👩‍👧‍👦",
    tier: "NICHE",
    card: "ALL",
    hookType: "Extension-hook",
    title: "가족 4인 총 월 400만, 전원 1% 받는 유일한 법",
    subtitle: "부모+자녀 4장, 연회비 0원, 1%는 그대로",
    description: "가족카드 추천(20,180) + 가족카드(55,480 중 일부). 3-4인 가족의 카드 전략 주목도.",
    annualVolume: 20000,
    monthlyVolume: 1667,
    who: {
      tags: ["3-4인 가족의 가장·배우자", "35-55세"],
      dataEvidence: "가족카드 추천 검색 지속"
    },
    what: {
      tags: ["가족 4장 연회비 무료", "전원 1% 동일"],
      dataEvidence: "가족카드 무제한 발급 + 무료 조항"
    },
    when: {
      tags: ["자녀 대학 진학", "배우자 카드 재발급"],
      dataEvidence: "가족카드 재발급 3월·9월 피크"
    },
    where: {
      tags: ["맘카페 가족 금융 게시판", "부부 재테크 카페"],
      dataEvidence: "가족 금융 콘텐츠 수요 높음"
    },
    why: {
      tags: ["가족 통합 관리", "카드 4장 유지비 제로"],
      dataEvidence: "가족카드 관련 '연회비' 검색 페어링"
    },
    how: {
      tags: ["4인 가족 카드 시나리오", "연회비 무료 증명"],
      dataEvidence: "가족 시나리오 콘텐츠 체류 5분+"
    },
    pathFinder: ["가족카드 추천", "4인 가족 카드", "가족 재테크", "ALL 카드"],
    cluster: ["가족카드", "4인 가족", "가족 재테크"],
    relatedKeywords: [
      { term: "가족카드 추천", volume: 20180 }
    ],
    contentHook: "가족 4인 전원 1%, 연회비 0원",
    painPoints: ["가족 카드 분산 관리", "연회비 누적 부담"],
    uspConnection: "가족카드 무료·무제한 + 국내 1% 풀 결합"
  },
  {
    id: "P5-6",
    personaId: "P5",
    icon: "🏥",
    tier: "LARGE",
    card: "ALL",
    hookType: "Care-hook",
    title: "부모의 시간을 관리하는 카드",
    subtitle: "요양·간병·건강검진, 부모 돌봄비를 한 카드로",
    description: "요양병원 연 37만 검색 시장. 40-50대가 부모 세대의 의료·요양 비용을 관리하는 구조. 가족카드 무료 + 1% 적립으로 부모 돌봄비를 가계 합산 관리.",
    annualVolume: 375000,
    monthlyVolume: 31250,
    seasonality: { type: "flat", description: "연중 안정적, 부모 건강 이슈 시 급증" },
    who: {
      tags: ["40-50대 자녀", "부모 돌봄 의사결정자", "기혼·부모 부양 세대"],
      dataEvidence: "요양병원 검색 40-50대 주도 추정"
    },
    what: {
      tags: ["가족카드로 부모 의료비 합산", "1% 적립 + 실적 합산"],
      dataEvidence: "가족카드 무료·무제한 + 국내 1% 무실적"
    },
    when: {
      tags: ["부모 건강 이슈 발생 시", "건강검진 예약 시", "요양원 결정기"],
      dataEvidence: "요양병원 검색 연 37만 지속"
    },
    where: {
      tags: ["맘카페 부모 돌봄 게시판", "요양병원 비교 사이트", "건강검진 예약 플랫폼"],
      dataEvidence: "부모 돌봄 정보 블로그 지속 증가"
    },
    why: {
      tags: ["부모 돌봄 비용 급증", "가계 통합 관리 욕구", "'내 소비와 분리되는 돈' 관리"],
      dataEvidence: "부모 의료비 관련 검색 지속 상승"
    },
    how: {
      tags: ["40-50대 자녀 타깃 광고", "부모 돌봄 가이드 콘텐츠"],
      dataEvidence: "부모 돌봄 관련 콘텐츠 체류 5분+"
    },
    pathFinder: ["요양병원 비교", "간병인 비용", "건강검진 패키지", "ALL 카드"],
    cluster: ["요양병원", "간병", "건강검진", "부모 돌봄"],
    relatedKeywords: [
      { term: "요양병원", volume: 369770 },
      { term: "건강검진 패키지", volume: 4260, trend: 0.21 }
    ],
    contentHook: "부모의 시간을 관리하는 카드",
    painPoints: ["부모 돌봄비 급증 부담", "가계 통합 관리 어려움", "카드 혜택 사각지대"],
    uspConnection: "가족카드 무료·무제한 + 국내 1% 무실적 (가족 확장 극단)"
  }
];

// ============================================================================
// 교차 인사이트 (랜딩 페이지·섹션 하단 표시용)
// ============================================================================

export const ALL_CARD_CROSS_INSIGHTS = [
  {
    id: "cross-1",
    icon: "⚡",
    card: "ALL",
    hookType: "Positioning-hook",
    title: "'고정비 통합 절약' 메시지를 아무도 하지 않고 있다",
    description: "와우+네이버+넷플릭스+유튜브+통신비 = 월 91,190원. ALL 카드로 연 14만원 절약. 이 '통합 절약' 메시지를 하는 카드사가 시장에 없음.",
    implication: "개별 혜택 나열이 아닌 '생활 고정비 통합 다이어트' 프레임"
  },
  {
    id: "cross-2",
    icon: "⚡",
    card: "ALL",
    hookType: "Counter-hook",
    title: "넷플릭스 → 할인카드 여정에 KB는 없고 신한카드만 있다",
    description: "소비자가 이미 '넷플릭스 가격 → 싸게 보는 법 → 할인카드' 여정을 걷고 있음. 그 끝에 신한카드만 나옴. KB 부재.",
    implication: "OTT 혜택 콘텐츠·SEO 강화로 검색 여정 막판 진입"
  },
  {
    id: "cross-3",
    icon: "⚡",
    card: "ALL",
    hookType: "Gateway-hook",
    title: "통신비가 ALL 카드의 유일한 남성 침투 경로",
    description: "ALL 카드 모든 자산이 여성 55-70%인데, 통신비만 남 56%, 40-50대 66%. 가족카드(무료)로 한 가정에 2장 침투 가능.",
    implication: "통신비 축을 '아빠 카드' 게이트웨이로 활용, 여성 중심 구조 보완"
  }
];

// ============================================================================
// 전체 export
// ============================================================================

export const allCardData = {
  meta: {
    cardId: "ALL",
    cardName: "ALL 카드",
    cardTagline: "고민없이 받는 혜택 — 365일 쓰는 카드",
    annualFee: 20000,
    monthlyRequirement: 400000,
    familyCard: "무료",
    version: "2.0",
    lastUpdate: "2026-04-20",
    whyTitle: "실적 피로 없는 '정착의 카드'",
    whyDescription: "7년간 카드 갈아탄 체리피커도 결국 돌아오는 곳. 매월 실적 체크 스트레스 없이 '한 장으로 365일' 쓸 수 있는 상시 혜택 구조가 ALL 카드의 정체성.",
    coreValueProps: [
      { title: "조건 없는 1%", description: "국내 모든 가맹점 · 전월 실적·월 한도 無" },
      { title: "365일 · 5개 영역", description: "쇼핑멤버십·OTT·통신·해외·일상 필수 5축 커버" },
      { title: "가족 확장", description: "가족카드 무료 · 최대 5장까지 · 실적 합산 가능" }
    ]
  },
  usps: ALL_CARD_USPS,
  personas: ALL_CARD_PERSONAS,
  opportunities: ALL_CARD_OPPORTUNITIES,
  crossInsights: ALL_CARD_CROSS_INSIGHTS
};

// ============================================================================
// 유틸 함수
// ============================================================================

export function getOpportunitiesByPersona(personaId) {
  return ALL_CARD_OPPORTUNITIES.filter(o => o.personaId === personaId);
}

export function getOpportunityById(id) {
  return ALL_CARD_OPPORTUNITIES.find(o => o.id === id);
}

export function getPersonaById(id) {
  return ALL_CARD_PERSONAS.find(p => p.id === id);
}

export function getUSPById(id) {
  return ALL_CARD_USPS.find(u => u.id === id);
}

export function getTotalAnnualVolume() {
  return ALL_CARD_OPPORTUNITIES.reduce((sum, o) => sum + o.annualVolume, 0);
}

export function getOpportunityCount() {
  return ALL_CARD_OPPORTUNITIES.length;
}

// 기본 export (default)
export default allCardData;
