"use client";

import { useState } from "react";

const CARDS = {
  ALL: { name: "ALL", color: "#2563EB", tagline: "고민없이 받는 혜택", annual: "2만", emoji: "💳" },
  YOU: { name: "YOU Prime", color: "#7C3AED", tagline: "나에게 딱 맞춘 혜택", annual: "3만", emoji: "👤" },
  PAY: { name: "NEED Pay", color: "#059669", tagline: "간편결제 집중 혜택", annual: "1.9만", emoji: "📱" },
  AUTO: { name: "NEED Autoslim", color: "#D97706", tagline: "자동차 집중 혜택", annual: "2만", emoji: "🚗" },
  EDU: { name: "NEED Edu", color: "#DC2626", tagline: "교육 집중 혜택", annual: "2.5만", emoji: "📚" },
};

// ============================================================
// 기회 데이터 — 32개 (카드별 구조화)
// ============================================================

const ALL_DATA = {
  key: "all",
  label: "A. ALL 카드",
  title: "ALL 카드",
  emoji: "💳",
  subtitle: "고민없이 받는 혜택 — 365일 쓰는 카드",
  emojis: ["🛒", "🎬", "✈️", "📶", "💳"],
  color: "#2563EB",
  count: 11,
  annual: "연간 3.1억+ 회",
  headerMeta: "연회비 2만원 · 전월 40만+ · 가족카드 무료",
  uspPills: ["국내 1%", "해외 2%", "쇼핑멤버십 50%", "OTT 10%", "통신 5%"],
  previews: [
    { emoji: "🛒", text: "쿠팡·네이버 멤버십을 반값에 유지하고 싶은 사람" },
    { emoji: "🎬", text: "넷플릭스 해지 직전, \"싸게 유지\"를 원하는 사람" },
    { emoji: "✈️", text: "트래블카드 말고, 365일 쓰는 해외 카드가 필요한 사람" },
  ],
  groups: [
    {
      label: "USP에서 출발한 기회",
      type: "usp",
      items: [
        {
          emoji: "🛒",
          title: "쿠팡·네이버 멤버십을 반값에 유지하고 싶은 사람",
          card: "ALL", usp: "쇼핑 멤버십 50%",
          monthlyVol: "월 2,035만", annualVol: "연 2.4억",
          gender: "여 57%", age: "30-40대",
          profile: "쿠팡 와우 회원 약 1,400만 명 추정",
          keywords: ["쿠팡(월 1,914만)", "네이버플러스 멤버십(월 18.1만)", "쿠팡 멤버십 가격(월 3,986)"],
          tags: ["쿠팡", "네이버플러스", "로켓와우", "멤버십 가격", "멤버십 해지"],
          insight: "쿠팡 와우(7,890원) + 네이버플러스(4,900원) = 월 12,790원. 50% 할인으로 연 76,740원 절약. 연회비 2만원 대비 3.8배 이득.",
          shortformIdeas: [
            "쿠팡 와우 반값으로 유지하는 법",
            "멤버십 해지 전에 이것만 확인해봐",
            "네이버플러스 50% 할인, 진짜 되나?",
          ],
        },
        {
          emoji: "🎬",
          title: "넷플릭스 해지 직전, \"싸게 유지\"를 원하는 사람",
          card: "ALL", usp: "OTT 10%",
          monthlyVol: "월 990만", annualVol: "연 1.19억",
          gender: "30-40대 남녀", age: "40대 27%",
          profile: "OTT 3개 이상 구독 중인 가구 급증",
          keywords: ["넷플릭스(월 680만)", "유튜브 프리미엄(월 210만)", "티빙·쿠팡플레이(월 100만)"],
          tags: ["넷플릭스", "유튜브 프리미엄", "티빙", "쿠팡플레이", "디즈니플러스", "OTT 해지"],
          insight: "'해지' 검색(월 10,500)보다 '싸게 유지' 검색(월 43,700)이 4배 많은 시장. ALL 카드는 \"해지하지 않아도 되는 이유\".",
          shortformIdeas: [
            "넷플릭스 해지 전에 이 카드 확인해봐",
            "유튜브 프리미엄 싸게 보는 진짜 방법",
            "OTT 5개 구독 중인데 얼마 아낄 수 있을까",
          ],
        },
        {
          emoji: "✈️",
          title: "트래블카드 말고 365일 쓰는 해외 카드가 필요한 사람",
          card: "ALL", usp: "해외 이용 2%",
          monthlyVol: "월 107만", annualVol: "연 1,280만",
          gender: "여 64%", age: "30대 37%",
          profile: "일본·유럽 여행 준비자 + 해외 직구 이용자",
          keywords: ["일본 여행(월 29.3만)", "유럽 여행(월 4.5만)", "해외결제 수수료"],
          tags: ["일본 여행", "유럽 여행", "해외결제 수수료", "트래블카드 비교", "해외여행 준비물"],
          insight: "트래블카드가 해외카드 시장을 점령. 하지만 '365일 쓰다가 여행 갈 때 더 좋은 카드'라는 포지셔닝은 아무도 안 하고 있음.",
          shortformIdeas: [
            "여행 갈 때만 꺼내는 카드 vs 매일 쓰는 카드",
            "일본 여행 카드 수수료 계산해봤다",
            "트래블카드 vs 신용카드 해외에서 뭐가 이득?",
          ],
        },
        {
          emoji: "📶",
          title: "통신비를 줄이고 싶은 40대 가장",
          card: "ALL", usp: "이동통신 5%",
          monthlyVol: "월 30만", annualVol: "연 360만",
          gender: "남 56%", age: "40-50대 66%",
          profile: "가족 통신비 월 15-20만원 지출 가구",
          keywords: ["SKT 요금제(월 5.8만)", "KT 요금제(월 3.2만)", "알뜰폰(월 2.1만)"],
          tags: ["SKT 요금제", "KT 요금제", "알뜰폰", "통신비 할인", "가족 통신비"],
          insight: "ALL 카드의 유일한 남성 진입로. 가족카드(무료)로 한 가정에 2장(엄마+아빠) 침투 가능.",
          shortformIdeas: [
            "우리 가족 통신비 월 20만원, 카드로 연 12만원 돌려받는 법",
            "SKT 요금제 바꾸기 귀찮은 사람을 위한 다른 방법",
            "아빠 카드 하나로 가족 통신비 전부 할인",
          ],
        },
        {
          emoji: "💳",
          title: "카드 고르다 지쳐서 그냥 다 되는 카드가 필요한 사람",
          card: "ALL", usp: "국내 전 가맹점 1%",
          monthlyVol: "월 7만", annualVol: "연 84만",
          gender: "여 55%", age: "25-30대",
          profile: "사회초년생 + 카드고릴라 비교 피로층",
          keywords: ["신용카드 추천(월 3.2만)", "카드고릴라(월 1.5만)", "첫 카드"],
          tags: ["신용카드 추천", "카드고릴라", "신용카드 비교", "첫 카드", "사회초년생 카드"],
          insight: "카드고릴라에서 1시간 비교 vs 그냥 전부 1%. 카드 고르기 자체가 스트레스인 사람에게 '고민 끝' 메시지.",
          shortformIdeas: [
            "카드고릴라 1시간 vs 그냥 전부 1%, 뭐가 이득?",
            "사회초년생 첫 카드 3분 결정법",
            "카드 혜택 따지기 싫은 사람을 위한 카드",
          ],
        },
      ],
    },
    {
      label: "소비자 맥락에서 발견한 기회",
      type: "context",
      items: [
        {
          emoji: "🗺️",
          title: "해외여행 준비 과정에서 \"결제 카드\" 고민하는 순간",
          card: "ALL", usp: "여정 침투 · 해외 2%",
          monthlyVol: "월 107만+", annualVol: "연 1,280만+",
          gender: "여 64%", age: "30대",
          profile: "항공권 예약 → 숙소 비교 → 결제 카드 고민",
          keywords: ["일본 여행 준비물", "해외여행 필수품", "여행 카드 추천"],
          tags: ["일본 여행", "유럽 여행", "해외여행 준비물", "해외 결제", "여행 카드"],
          insight: "트래블카드가 시장 점령. '여행 갔다 와서도 계속 쓰는 카드'는 아무도 안 하고 있음.",
          shortformIdeas: [
            "해외여행 카드 고를 때 진짜 중요한 것",
            "여행 3박4일 말고 365일을 보자",
          ],
        },
        {
          emoji: "🔔",
          title: "구독 해지 버튼을 누르기 직전의 순간",
          card: "ALL", usp: "여정 침투 · OTT 10%",
          monthlyVol: "월 43,736", annualVol: "연 52만",
          gender: "30-40대", age: "30대 32%",
          profile: "OTT 헤비 구독자의 주기적 해지 고민층",
          keywords: ["넷플릭스 해지(월 10.5K)", "싸게 보는 법(월 43.7K)"],
          tags: ["넷플릭스 해지", "유튜브 해지", "싸게 보는 법", "OTT 정리"],
          insight: "해지 직전이 카드 침투 최적 타이밍. 이 순간에 \"해지하지 않아도 되는 이유\"를 제시.",
          shortformIdeas: [
            "해지 버튼 누르기 전에 딱 이것만",
            "넷플릭스 해지 말고 이 카드로 바꿔봐",
          ],
        },
        {
          emoji: "🔄",
          title: "카드 교체/첫 발급을 고민하는 순간",
          card: "ALL", usp: "여정 침투 · 국내 1%",
          monthlyVol: "월 68,000+", annualVol: "연 82만",
          gender: "여 55%", age: "20-30대",
          profile: "디시/뽐뿌/카드고릴라 비교 소비자",
          keywords: ["신용카드 추천", "카드고릴라", "캐시백 카드"],
          tags: ["신용카드 추천", "카드 비교", "카드고릴라", "캐시백"],
          insight: "\"어디서 얼마 할인인지 따지기 싫은\" 사람에게 \"전부 1%\" 메시지가 가장 강력.",
          shortformIdeas: [
            "카드 고르다 지쳤으면 이걸로 끝",
            "전부 1%가 진짜 이득인 이유",
          ],
        },
      ],
    },
  ],
  insights: [
    {
      tag: "블루오션",
      discovery: "\"고정비 통합 절약\" 메시지를 아무도 하지 않고 있다",
      detail: "와우 7,890 + 네이버 4,900 + 넷플릭스 13,500 + 유튜브 14,900 + 통신비 50,000 = 월 91,190원. ALL 카드로 전부 결제 시 연 14만원 절약. 이 '통합 절약' 메시지를 하는 카드사가 시장에 없음.",
      shortformIdeas: [
        "매달 자동으로 빠져나가는 9만원 얼마나 아낄 수 있을까",
        "구독료+통신비+쇼핑 한 장으로 줄이기",
      ],
    },
    {
      tag: "경쟁사 선점",
      discovery: "넷플릭스→할인카드 여정에 KB는 없고 신한카드만 있다",
      detail: "소비자가 이미 '넷플릭스 가격 → 싸게 보는 법 → 할인카드'를 걷는 여정이 존재. 그 끝에 '신한카드 넷플릭스 할인'만 나옴. KB ALL 카드가 이 여정에 완전히 부재.",
      shortformIdeas: [
        "넷플릭스 할인카드 비교 신한 vs KB",
      ],
    },
    {
      tag: "침투 전략",
      discovery: "통신비가 ALL 카드의 유일한 남성 침투 경로",
      detail: "ALL 카드 모든 자산이 여성 55-70%인데, 통신비만 남 56%, 40-50대 66%. 가족카드(무료)로 한 가정에 2장(엄마+아빠) 침투 가능.",
      shortformIdeas: [],
    },
  ],
};

const YOU_DATA = {
  key: "you",
  label: "B. YOU Prime",
  title: "YOU Prime 카드",
  emoji: "👤",
  subtitle: "나에게 딱 맞춘 혜택 — 일상팩·가족팩",
  emojis: ["⛽", "💪", "🛒", "☕", "🏠"],
  color: "#7C3AED",
  count: 9,
  annual: "연간 1.2억+ 회",
  headerMeta: "연회비 3만원 · 전월 40만+ · 가족카드 7,000원",
  uspPills: ["주유 10%", "배달 10%", "자기관리 5%", "장보기 10%", "카페 5%"],
  previews: [
    { emoji: "💪", text: "필라테스 \"비싼 이유\"를 납득하는 과정에 있는 30대 여성" },
    { emoji: "🛒", text: "마켓컬리로 매주 장보는 40대 엄마" },
    { emoji: "⛽", text: "유가 급등에 주유 할인을 찾는 40대 남성" },
  ],
  groups: [
    {
      label: "일상팩에서 출발한 기회",
      type: "usp",
      items: [
        {
          emoji: "⛽",
          title: "유가 급등에 주유 할인을 찾는 출퇴근 운전자",
          card: "YOU", usp: "일상팩 주유 10%",
          monthlyVol: "월 42,510", annualVol: "연 51만",
          gender: "남 70%", age: "40대 38%",
          profile: "유가 상승기 주유 할인 탐색자",
          keywords: ["주유소 가격(월 32K)", "셀프 주유(월 8K)", "기름값(월 2.5K)"],
          tags: ["주유소 가격", "주유 할인", "셀프 주유", "유가 전망", "기름값"],
          insight: "주유소 가격 검색 폭발 성장(+1,623%). 유가 상승기에 자동으로 수요 급등하는 구조.",
          shortformIdeas: [
            "기름값 비쌀 때 주유비 아끼는 진짜 방법",
            "주유 할인 카드 비교, 어떤 게 제일 많이 돌려받나",
            "출퇴근 주유비 월 20만원, 10% 돌려받기",
          ],
        },
        {
          emoji: "🛵",
          title: "배달을 자주 시키는 1-2인 가구 또는 맞벌이",
          card: "YOU", usp: "일상팩 배달 10%",
          monthlyVol: "월 376,266", annualVol: "연 451만",
          gender: "전 연령", age: "20-40대",
          profile: "배달앱 주 3회+ 이용 가구",
          keywords: ["배달의민족(월 21.1만)", "쿠팡이츠(월 16.5만)", "배달비"],
          tags: ["배달의민족", "쿠팡이츠", "배달 할인", "배달비", "배달 쿠폰"],
          insight: "배달의민족(월 211,100) + 쿠팡이츠(월 165,166). 매일 시키는 배달에서 10% 할인은 월 2-3만원 체감.",
          shortformIdeas: [
            "배달 자주 시키면 이 카드가 답",
            "배달비 아까운 사람을 위한 카드 비교",
            "배민 쿠팡이츠 할인 최대로 받는 법",
          ],
        },
        {
          emoji: "💪",
          title: "필라테스 \"비싼 이유\"를 납득하는 과정에 있는 30대 여성",
          card: "YOU", usp: "일상팩 자기관리 5%",
          monthlyVol: "월 14,252", annualVol: "연 17만",
          gender: "여 78%", age: "25-40대",
          profile: "필라테스 10회권 구매 고민층",
          keywords: ["필라테스 가격(월 7.2K)", "필라테스 비싼 이유(월 3.1K)", "요가 초보"],
          tags: ["필라테스 가격", "필라테스 비싼 이유", "요가 초보", "헬스장 가격", "자기관리 루틴"],
          insight: "필라테스 가격 여정: 효과 확인 → 가격 → \"비싼 이유\" 납득. 비용 정당화 과정에 카드 할인이 자연스럽게 침투 가능.",
          shortformIdeas: [
            "필라테스 월 20만원 비싸다고? 5% 돌려받으면",
            "운동 시작할 때 같이 만들면 좋은 카드",
            "자기관리 비용 아끼는 현실적 방법",
          ],
        },
        {
          emoji: "📱",
          title: "통신·보험·앱을 자동이체하는 생활 고정비 납부자",
          card: "YOU", usp: "일상팩 통신/보험/App 10%",
          monthlyVol: "월 58,800+", annualVol: "연 70만",
          gender: "남 63%", age: "30대",
          profile: "고정비 자동이체 설정자",
          keywords: ["SKT 요금제", "보험료 자동이체", "앱 결제"],
          tags: ["SKT 요금제", "보험료", "앱 결제", "자동이체", "고정비"],
          insight: "통신+보험+앱 결제를 자동이체로 한 번 설정하면 매달 자동 10% 할인. 설정 후 잊어도 되는 구조.",
          shortformIdeas: [
            "한 번 설정하면 매달 자동 할인",
            "고정비 자동이체 10% 돌려받는 법",
          ],
        },
      ],
    },
    {
      label: "가족팩에서 출발한 기회",
      type: "usp",
      items: [
        {
          emoji: "🛒",
          title: "마켓컬리로 매주 장보는 40대 엄마",
          card: "YOU", usp: "가족팩 온라인장보기 10%",
          monthlyVol: "월 930,799", annualVol: "연 1.1억",
          gender: "여 84%", age: "40대 36%",
          profile: "새벽배송 루틴 구축 가정주부",
          keywords: ["마켓컬리(월 80.5만)", "오아시스(월 12.3만)", "새벽배송"],
          tags: ["마켓컬리", "오아시스", "온라인 장보기", "새벽배송", "신선식품"],
          insight: "마켓컬리(월 804,766)가 압도적 진입점. 이미 루틴화된 주간 소비에서 10% 할인은 매주 체감하는 절약.",
          shortformIdeas: [
            "마켓컬리 매주 장보면 연 얼마 아낄 수 있을까",
            "온라인 장보기 할인 최대로 받는 카드",
            "새벽배송 결제만 바꿨더니 월 3만원 절약",
          ],
        },
        {
          emoji: "☕",
          title: "학원 픽업 후 카페, 마트 — 엄마의 일상 동선 전체 할인",
          card: "YOU", usp: "가족팩 학원/대형마트/카페 5%",
          monthlyVol: "월 29,896", annualVol: "연 36만",
          gender: "여 74%", age: "30-40대",
          profile: "학부모 + 카페/마트 이용자",
          keywords: ["스타벅스 신메뉴(월 27.3K, +157%)", "이마트 행사", "홈플러스"],
          tags: ["스타벅스", "이마트 행사", "홈플러스", "학원비", "대형마트 휴무일"],
          insight: "스타벅스 신메뉴(월 27,343) 급성장(+157%). 학원 픽업 → 카페 → 마트 장보기 — 엄마의 하루 동선 전체가 할인 대상.",
          shortformIdeas: [
            "학원 픽업하고 스타벅스 가는 엄마를 위한 카드",
            "이마트 행사일에 이 카드 쓰면 5% 추가 할인",
            "엄마의 하루 동선 전체 할인 카드",
          ],
        },
        {
          emoji: "🏠",
          title: "아파트 관리비·전기세를 고민하는 가정",
          card: "YOU", usp: "가족팩 생활요금/일상케어 10%",
          monthlyVol: "월 9,053", annualVol: "연 11만",
          gender: "남 53%", age: "30-40대 66%",
          profile: "아파트 거주 가정",
          keywords: ["아파트 관리비(월 6.2K, +21%)", "전기세 절약", "생활요금"],
          tags: ["아파트 관리비", "관리비 절약", "전기세 절약", "생활요금", "자동납부"],
          insight: "관리비 검색 성장(+21%). 관리비+전기세 자동이체로 10% 할인. 월 30만원 관리비 기준 연 36만원 절약.",
          shortformIdeas: [
            "관리비 줄이는 의외의 방법",
            "전기세+관리비 자동이체하면 연 얼마 돌아올까",
          ],
        },
      ],
    },
  ],
  insights: [
    {
      tag: "타겟 반전",
      discovery: "일상팩 안에서 성별이 극단적으로 갈린다",
      detail: "주유(남 70%) vs 필라테스(여 78%) vs 요가(여 89%). 같은 팩이지만 실제로는 남녀가 완전히 다른 자산을 씀. 콘텐츠도 남녀 분리 타겟팅 필요.",
      shortformIdeas: [
        "같은 카드 다른 타겟 — 남자편/여자편",
      ],
    },
    {
      tag: "크로스셀",
      discovery: "가족팩의 마켓컬리(여 84%) = NEED Edu 타겟과 동일인",
      detail: "YOU Prime 가족팩(장보기) + NEED Edu(학원비) + ALL(구독료) = 40대 엄마의 모든 지출을 커버하는 3장 세트. 한 명에게 3장 제안 가능.",
      shortformIdeas: [
        "40대 엄마를 위한 KB 3종 세트",
      ],
    },
  ],
};

const NEED_DATA = {
  key: "need",
  label: "C. NEED",
  title: "NEED 카드",
  emoji: "🎯",
  subtitle: "Pay·Autoslim·Edu 특화 기회",
  emojis: ["📱", "🔋", "🛡️", "📚", "💊"],
  color: "#DC2626",
  multiColor: ["#059669", "#D97706", "#DC2626"],
  count: 12,
  annual: "연간 2.5억+ 회",
  headerMeta: "NEED Pay (1.9만) · NEED Autoslim (2만) · NEED Edu (2.5만)",
  uspPills: ["간편결제 15%", "OTT 30%", "충전소 5%", "보험 2만원", "교육 10%"],
  previews: [
    { emoji: "📱", text: "카카오페이를 새로 쓰기 시작한 40-50대" },
    { emoji: "🔋", text: "전기차 충전카드를 비교하는 신규 EV 오너" },
    { emoji: "📚", text: "학원비를 조회하지만 \"할인\"은 검색하지 않는 40대 엄마" },
  ],
  groups: [
    {
      label: "NEED Pay: 디지털 결제 생활자",
      type: "usp",
      items: [
        {
          emoji: "📱",
          title: "카카오페이를 새로 쓰기 시작한 40-50대",
          card: "PAY", usp: "간편결제 15%/10%",
          monthlyVol: "월 1,543,466", annualVol: "연 1.85억",
          gender: "남녀 반반", age: "카카오페이 40-50대 79%",
          profile: "간편결제 신규 유입 중장년층",
          keywords: ["카카오페이(+70%)", "네이버페이", "삼성페이"],
          tags: ["네이버페이", "카카오페이", "삼성페이", "페이코", "간편결제"],
          insight: "카카오페이(남 65%, 40-50대 79%) 폭발 성장(+70%). 간편결제의 진짜 타겟은 MZ가 아니라 40-50대 신규 이용자.",
          shortformIdeas: [
            "카카오페이 쓸 때 15% 돌려받는 카드",
            "간편결제 할 때마다 할인받는 법",
            "아버지 카카오페이 시작했는데 이 카드 추천",
          ],
        },
        {
          emoji: "🎬",
          title: "ALL보다 3배 높은 OTT 할인이 필요한 구독 헤비유저",
          card: "PAY", usp: "디지털콘텐츠/멤버십 30%",
          monthlyVol: "월 990만", annualVol: "연 1.19억",
          gender: "30-40대 남녀", age: "30-40대",
          profile: "OTT 3개 이상 구독 가구",
          keywords: ["넷플릭스", "유튜브 프리미엄", "티빙"],
          tags: ["넷플릭스", "유튜브 프리미엄", "티빙", "디즈니플러스", "멤버십"],
          insight: "ALL OTT 10% vs NEED Pay 30% = 3배 차이. OTT 절약이 핵심 니즈라면 NEED Pay가 더 강력. 구독 3개 이상이면 확실히 이득.",
          shortformIdeas: [
            "OTT 3개 이상 구독 중이면 이 카드",
            "넷플릭스+유튜브+디즈니 30% 할인 계산해봤다",
            "ALL 10% vs NEED Pay 30%, 뭐가 이득?",
          ],
        },
        {
          emoji: "👗",
          title: "무신사·W컨셉에서 쇼핑하는 10-20대",
          card: "PAY", usp: "온라인패션몰 5%",
          monthlyVol: "월 97", annualVol: "—",
          gender: "10-20대 76%", age: "10-20대",
          profile: "온라인 패션 쇼핑 Z세대",
          keywords: ["무신사 할부", "W컨셉", "온라인 패션"],
          tags: ["무신사", "W컨셉", "온라인 패션", "무신사 할부", "패션 쇼핑"],
          insight: "무신사 할부 검색자가 10-20대 76%. NEED Pay의 유일한 \"젊은 층\" 침투 자산. 간편결제 15%와 조합하면 온라인 쇼핑 전체 할인.",
          shortformIdeas: [
            "무신사 결제할 때 5% 더 아끼는 법",
            "패션 앱 쇼핑 할인 카드 비교",
          ],
        },
      ],
    },
    {
      label: "NEED Autoslim: 자동차 소유자",
      type: "usp",
      items: [
        {
          emoji: "🔋",
          title: "전기차 충전카드를 비교하는 신규 EV 오너",
          card: "AUTO", usp: "주유소/충전소 5%",
          monthlyVol: "월 15,033", annualVol: "연 18만 (+555%)",
          gender: "남 72%", age: "40대 41%",
          profile: "전기차 신규 구매자",
          keywords: ["전기차 충전카드", "환경부 카드", "신한 EV"],
          tags: ["전기차 충전카드", "전기차 충전 할인", "환경부 카드", "신한 EV", "삼성 ID EV"],
          insight: "전기차 충전카드 폭발 성장(+555%). 소비자는 \"전기차 전용카드\"만 인지. NEED Autoslim이 충전소 5%를 커버하는 걸 모름.",
          shortformIdeas: [
            "전기차 충전카드 비교했는데 의외의 카드가",
            "EV 전용카드 vs 일반카드 충전 할인 비교",
            "전기차 충전+할부+보험 한 장으로",
          ],
        },
        {
          emoji: "🛡️",
          title: "자동차보험 비교하면서 \"카드 할인\"은 생각도 못하는 사람",
          card: "AUTO", usp: "자동차보험 2만원 청구할인",
          monthlyVol: "월 82,343", annualVol: "연 99만",
          gender: "남 61%", age: "30-40대 64%",
          profile: "보험 갱신·비교 시즌 검색자",
          keywords: ["자동차보험 비교(CPC $10.55)", "보험다모아", "다이렉트 보험"],
          tags: ["자동차보험 비교", "보험다모아", "다이렉트 보험", "자동차보험 갱신", "보험료 절약"],
          insight: "자동차보험 비교(CPC $10.55)는 가장 비싼 광고시장. 매달 79,500명이 보험 비교하면서 '카드로 2만원 할인'이라는 옵션을 아예 모름. 완전한 블루오션.",
          shortformIdeas: [
            "자동차보험 비교할 때 놓치는 한 가지",
            "보험 갱신할 때 결제 카드만 바꿔도 2만원",
            "보험다모아에서 안 알려주는 절약 팁",
          ],
        },
        {
          emoji: "⛽",
          title: "주유비를 매달 내는 내연기관 차량 소유자",
          card: "AUTO", usp: "주유소/충전소 5%",
          monthlyVol: "월 42,510", annualVol: "연 51만",
          gender: "남 70%", age: "40대 38%",
          profile: "출퇴근 주유 이용자",
          keywords: ["주유소 가격", "기름값", "셀프 주유"],
          tags: ["주유소 가격", "기름값", "셀프 주유", "유가 전망", "주유 할인"],
          insight: "YOU Prime 일상팩(10%) vs NEED Autoslim(5%). 주유만 보면 YOU가 2배지만, Autoslim은 할부+보험까지 커버. 자동차 관련 지출 전체를 한 장으로.",
          shortformIdeas: [
            "주유 할인만 보면 YOU, 자동차 전체 비용이면 NEED",
            "자동차 유지비 총정리 — 할부+주유+보험 한 장",
          ],
        },
        {
          emoji: "🚗",
          title: "자동차 할부금을 내고 있는 신차 구매자",
          card: "AUTO", usp: "오토 슬림 할부 최대 2만원",
          monthlyVol: "월 663", annualVol: "연 8,000",
          gender: "남 61%", age: "30대 47%",
          profile: "신차 구매자 + 할부 이용자",
          keywords: ["자동차 할부", "신차 구매", "차 할부"],
          tags: ["자동차 할부", "자동차 할부 카드", "신차 구매", "차 할부"],
          insight: "할부+주유+보험 = 자동차 소유의 3대 고정비. NEED Autoslim 한 장으로 전부 커버. 연간 최대 48만원 할인 가능.",
          shortformIdeas: [
            "신차 할부 낼 때 이 카드 쓰면 2만원 할인",
            "자동차 3대 고정비 한 장으로 줄이기",
          ],
        },
      ],
    },
    {
      label: "NEED Edu: 교육+생활",
      type: "usp",
      items: [
        {
          emoji: "📚",
          title: "학원비를 조회하지만 \"할인\"은 검색하지 않는 40대 엄마",
          card: "EDU", usp: "교육업종 5~10%",
          monthlyVol: "월 2,553", annualVol: "연 31,000",
          gender: "여 80%", age: "40대 53%",
          profile: "학원비 관리 학부모",
          keywords: ["학원비 알리미", "대치동 학원비", "초등 영어학원"],
          tags: ["학원비", "학원비 알리미", "대치동 학원비", "학원 추천", "초등 영어학원"],
          insight: "학원비 여정 200개 경로 중 '할인' 경로 0개. 사람들은 학원비를 \"절약\"이 아니라 \"조회/비교\"함. 학원 선택 가이드 안에서 결제 팁으로 침투.",
          shortformIdeas: [
            "학원비 비교할 때 몰랐던 한 가지",
            "대치동 학원비 월 100만원, 10% 돌려받으면",
            "학원비 조회는 하면서 할인은 왜 안 찾을까",
          ],
        },
        {
          emoji: "💊",
          title: "병원·약국·커피를 매일 이용하는 생활 소비자",
          card: "EDU", usp: "생활영역 5%",
          monthlyVol: "월 27,945", annualVol: "연 34만",
          gender: "여 59%", age: "30-40대",
          profile: "소아과·약국·카페 루틴 이용자",
          keywords: ["소아과 예약", "약국 할인", "스타벅스"],
          tags: ["소아과 예약", "약국 할인", "스타벅스", "병원비", "커피"],
          insight: "병원·약국은 비자발적 지출이라 카드 할인의 체감 가치가 높음. \"아프면 어차피 가야 하는데 5% 돌려받자.\"",
          shortformIdeas: [
            "병원비도 카드로 5% 할인 되는 거 알아?",
            "소아과 다니는 엄마를 위한 카드",
            "약국+병원+카페 다 5% 할인",
          ],
        },
      ],
    },
  ],
  insights: [
    {
      tag: "숨은 자산",
      discovery: "전기차 충전카드 시장 폭발(+555%) — Autoslim의 숨은 자산",
      detail: "소비자는 \"전기차 전용카드\"(신한EV, 삼성ID EV)만 인지. NEED Autoslim이 충전소를 커버한다는 사실 자체를 모름.",
      shortformIdeas: [
        "전기차 전용카드 말고 이것도 충전 할인 된다",
      ],
    },
    {
      tag: "블루오션",
      discovery: "자동차보험 비교 여정에 \"카드 할인\" 개념이 존재하지 않는다",
      detail: "매달 79,500명이 보험 비교. 연 95만 번의 검색에서 '카드로 2만원 할인'이 완전히 인식 바깥.",
      shortformIdeas: [
        "자동차보험 비교할 때 모두가 놓치는 것",
      ],
    },
    {
      tag: "진입 전략",
      discovery: "학원비 여정 200개 경로에 \"할인\"이 단 하나도 없다",
      detail: "\"학원비 할인카드\"라고 소구해도 그 검색을 안 함. 학원 \"선택 가이드\" 콘텐츠 안에서 카드를 침투시켜야.",
      shortformIdeas: [
        "학원 선택 가이드 — 결제는 이 카드로",
      ],
    },
  ],
};

const CATEGORIES = { all: ALL_DATA, you: YOU_DATA, need: NEED_DATA };

const TAG_COLORS = {
  "블루오션": { bg: "#DBEAFE", color: "#1D4ED8", border: "#93C5FD" },
  "경쟁사 선점": { bg: "#FEE2E2", color: "#B91C1C", border: "#FCA5A5" },
  "크로스셀": { bg: "#F3E8FF", color: "#7C3AED", border: "#C4B5FD" },
  "침투 전략": { bg: "#D1FAE5", color: "#047857", border: "#6EE7B7" },
  "숨은 자산": { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  "타겟 반전": { bg: "#FFE4E6", color: "#BE123C", border: "#FDA4AF" },
  "진입 전략": { bg: "#E0E7FF", color: "#3730A3", border: "#A5B4FC" },
};

// ============================================================
// 컴포넌트
// ============================================================

function TagBadge({ tag }) {
  const s = TAG_COLORS[tag] || { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" };
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 4,
      fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{tag}</span>
  );
}

function PillTag({ children, color }) {
  return (
    <span style={{
      display: "inline-block", padding: "4px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600,
      background: color + "14",
      color: color,
      border: `1px solid ${color}30`,
    }}>{children}</span>
  );
}

function StatBadge({ children, color }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 9px", borderRadius: 6,
      fontSize: 11, fontWeight: 700,
      background: color + "12",
      color: color,
    }}>{children}</span>
  );
}

function IdeaChip({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "9px 12px", borderRadius: 10,
      background: "#F0FDF4", border: "1px solid #BBF7D0",
      fontSize: 12, color: "#166534", lineHeight: 1.4,
      marginBottom: 6,
    }}>
      <span style={{ fontSize: 13 }}>🎬</span>
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
}

function DetailSection({ icon, title, color, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6, marginBottom: 8,
        fontSize: 11, fontWeight: 800, color: color, letterSpacing: 0.5,
        textTransform: "uppercase",
      }}>
        <span style={{ fontSize: 13 }}>{icon}</span>
        {title}
      </div>
      <div style={{
        paddingLeft: 4, borderLeft: `2px solid ${color}20`,
        paddingLeft: 12,
      }}>
        {children}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div style={{
      background: "linear-gradient(160deg, #0F172A 0%, #1E293B 40%, #1E3A5F 100%)",
      padding: "40px 20px 36px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, #2563EB18, transparent)" }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED12, transparent)" }} />
      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 900, color: "#1E293B",
          }}>KB</div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 2, textTransform: "uppercase" }}>
            KB국민카드 × Pentacle
          </span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#F1F5F9", lineHeight: 1.25, marginBottom: 4, letterSpacing: -0.5 }}>
          ALL·YOU·NEED
        </h1>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#60A5FA", marginBottom: 14 }}>
          AI Brandformance Engine
        </div>
        <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6, marginBottom: 18 }}>
          소비자 검색 데이터에서 발견한 기회를 카드 자산과 연결하고,<br />
          숏폼 콘텐츠 전략으로 전환합니다
        </p>

        {/* USP 아이콘 */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap",
        }}>
          {["🛒", "🎬", "✈️", "⛽", "🛡️", "📚"].map((e, i) => (
            <div key={i} style={{
              width: 34, height: 34, borderRadius: 10,
              background: "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
              border: "1px solid rgba(255,255,255,0.1)",
            }}>{e}</div>
          ))}
        </div>

        {/* 핵심 스탯 2개 */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{
            flex: 1, padding: "14px 16px", borderRadius: 14,
            background: "rgba(96,165,250,0.12)",
            border: "1px solid rgba(96,165,250,0.25)",
          }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#60A5FA", lineHeight: 1 }}>32개</div>
            <div style={{ fontSize: 11, color: "#CBD5E1", fontWeight: 600, marginTop: 4 }}>발견된 기회</div>
          </div>
          <div style={{
            flex: 1, padding: "14px 16px", borderRadius: 14,
            background: "rgba(52,211,153,0.12)",
            border: "1px solid rgba(52,211,153,0.25)",
          }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#34D399", lineHeight: 1 }}>4.2억+</div>
            <div style={{ fontSize: 11, color: "#CBD5E1", fontWeight: 600, marginTop: 4 }}>연간 검색량</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopNav({ active, onChange }) {
  const tabs = [
    { id: "discover", label: "기회 발견", ready: true },
    { id: "content", label: "콘텐츠 전략", ready: false },
    { id: "creator", label: "크리에이터 매칭", ready: false },
  ];
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#FFFFFF", borderBottom: "1px solid #E5E7EB",
      padding: "0 16px",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => tab.ready && onChange(tab.id)}
            disabled={!tab.ready}
            style={{
              padding: "14px 16px", border: "none", background: "none",
              cursor: tab.ready ? "pointer" : "not-allowed",
              fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
              color: active === tab.id ? "#2563EB" : tab.ready ? "#9CA3AF" : "#D1D5DB",
              borderBottom: active === tab.id ? "2px solid #2563EB" : "2px solid transparent",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {tab.label}
            {!tab.ready && (
              <span style={{
                fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                background: "#F3F4F6", color: "#9CA3AF",
              }}>준비 중</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ cat, onClick }) {
  const isMulti = Array.isArray(cat.multiColor);
  return (
    <div
      onClick={onClick}
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        border: `1px solid ${cat.color}20`,
        padding: "0",
        marginBottom: 16,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* 상단 컬러 액센트 */}
      <div style={{
        height: 4,
        background: isMulti
          ? `linear-gradient(90deg, ${cat.multiColor[0]}, ${cat.multiColor[1]}, ${cat.multiColor[2]})`
          : `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`,
      }} />

      <div style={{ padding: "22px 22px", position: "relative" }}>
        {/* 좌상단 배경 장식 */}
        {!isMulti && (
          <div style={{
            position: "absolute", top: -40, left: -40, width: 160, height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cat.color}14, transparent 70%)`,
            pointerEvents: "none",
          }} />
        )}

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* 이모지 5개 */}
          <div style={{ fontSize: 22, marginBottom: 14, letterSpacing: 2 }}>
            {cat.emojis.join(" ")}
          </div>

          {/* 라벨 + 서브 */}
          <div style={{ fontSize: 11, fontWeight: 800, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
            {cat.label}
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 14, lineHeight: 1.5 }}>
            {cat.subtitle}
          </div>

          {/* 통계 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <span style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: cat.color + "15", color: cat.color,
            }}>{cat.count}개 기회</span>
            <span style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: "#F3F4F6", color: "#374151",
            }}>{cat.annual}</span>
          </div>

          {/* 미리보기 3개 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
            {cat.previews.map((p, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 12px", borderRadius: 10,
                background: "#F9FAFB", border: "1px solid #F3F4F6",
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{p.emoji}</span>
                <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{p.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            fontSize: 13, fontWeight: 800, color: cat.color,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            기회 보기 <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpportunityCard({ item, isOpen, onToggle }) {
  const color = CARDS[item.card]?.color || "#2563EB";
  const cardName = CARDS[item.card]?.name || item.card;
  return (
    <div
      onClick={onToggle}
      style={{
        background: "#FFFFFF", borderRadius: 14,
        border: isOpen ? `1px solid ${color}40` : "1px solid #E5E7EB",
        cursor: "pointer", transition: "all 0.3s ease",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* 좌측 컬러바 */}
      <div style={{
        width: 4, flexShrink: 0,
        background: color,
      }} />

      <div style={{ flex: 1, padding: "16px 18px 16px 16px" }}>
        {/* 상단: 이모지 + 타이틀 + 펼침 */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0, border: `1px solid ${color}20`,
          }}>{item.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", lineHeight: 1.35 }}>
              {item.title}
            </div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4, fontWeight: 600 }}>
              <span style={{ color: color }}>{cardName}</span> · {item.usp}
            </div>
          </div>
          <div style={{
            fontSize: 11, color: "#9CA3AF",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s",
            marginTop: 4,
          }}>▼</div>
        </div>

        {/* 스탯 배지 */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          <StatBadge color={color}>{item.monthlyVol} 검색</StatBadge>
          <StatBadge color="#6B7280">{item.gender}</StatBadge>
          <StatBadge color="#6B7280">{item.age}</StatBadge>
        </div>

        {/* Pill tags */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {item.tags.map((t, i) => (
            <PillTag key={i} color={color}>{t}</PillTag>
          ))}
        </div>

        {/* 펼친 상세 */}
        {isOpen && (
          <div style={{
            marginTop: 16, paddingTop: 16,
            borderTop: `1px dashed ${color}30`,
            animation: "fadeSlide 0.3s ease",
          }}>
            {/* 기회 크기 */}
            <DetailSection icon="📊" title="기회 크기" color={color}>
              <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7 }}>
                <div><strong>월간:</strong> {item.monthlyVol} &nbsp;·&nbsp; <strong>연간:</strong> {item.annualVol}</div>
                <div style={{ color: "#6B7280", marginTop: 4 }}>
                  <strong>핵심 키워드:</strong> {item.keywords.join(", ")}
                </div>
              </div>
            </DetailSection>

            {/* 소비자 프로필 */}
            <DetailSection icon="👥" title="소비자 프로필" color={color}>
              <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7 }}>
                <div>{item.gender} · {item.age}</div>
                <div style={{ color: "#6B7280", marginTop: 2 }}>{item.profile}</div>
              </div>
            </DetailSection>

            {/* 핵심 발견 */}
            <DetailSection icon="💡" title="핵심 발견" color={color}>
              <div style={{
                fontSize: 12.5, color: "#374151", lineHeight: 1.7,
                padding: "10px 12px", borderRadius: 8,
                background: `${color}06`,
              }}>
                {item.insight}
              </div>
            </DetailSection>

            {/* 숏폼 아이디어 */}
            {item.shortformIdeas && item.shortformIdeas.length > 0 && (
              <DetailSection icon="🎬" title="숏폼 아이디어" color={color}>
                <div style={{ marginTop: 4 }}>
                  {item.shortformIdeas.map((idea, i) => (
                    <IdeaChip key={i}>{idea}</IdeaChip>
                  ))}
                </div>
              </DetailSection>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InsightCard({ item, isOpen, onToggle }) {
  const color = "#DC2626";
  return (
    <div
      onClick={onToggle}
      style={{
        background: "#FFFFFF", borderRadius: 14,
        border: isOpen ? `1px solid ${color}40` : "1px solid #E5E7EB",
        cursor: "pointer", transition: "all 0.3s ease",
        overflow: "hidden", marginBottom: 10,
        display: "flex",
      }}
    >
      <div style={{
        width: 4, flexShrink: 0,
        background: `linear-gradient(180deg, #DC2626, #F59E0B)`,
      }} />
      <div style={{ flex: 1, padding: "16px 18px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          <TagBadge tag={item.tag} />
          <div style={{ marginLeft: "auto", fontSize: 11, color: "#9CA3AF",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s",
          }}>▼</div>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: "#111827", lineHeight: 1.5, marginBottom: 10 }}>
          {item.discovery}
        </div>
        <div style={{
          padding: "10px 12px", borderRadius: 8,
          background: "linear-gradient(135deg, #FEF2F204, transparent)",
          border: "1px solid #FECACA40",
          fontSize: 12, lineHeight: 1.7, color: "#4B5563",
        }}>
          {item.detail}
        </div>

        {isOpen && item.shortformIdeas && item.shortformIdeas.length > 0 && (
          <div style={{
            marginTop: 14, paddingTop: 14,
            borderTop: "1px dashed #FECACA",
            animation: "fadeSlide 0.3s ease",
          }}>
            <DetailSection icon="🎬" title="숏폼 아이디어" color={color}>
              <div style={{ marginTop: 4 }}>
                {item.shortformIdeas.map((idea, i) => (
                  <IdeaChip key={i}>{idea}</IdeaChip>
                ))}
              </div>
            </DetailSection>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionDivider({ label, color, count }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      marginTop: 28, marginBottom: 14,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 800, color: color,
        letterSpacing: 1, textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        — {label} {count != null && `(${count})`} —
      </div>
      <div style={{ flex: 1, height: 1, background: `${color}15` }} />
    </div>
  );
}

function DetailView({ cat, onBack }) {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 0", marginBottom: 14,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 12, fontWeight: 700, color: "#6B7280",
        }}
      >
        ← 전체 기회로 돌아가기
      </button>

      {/* 상세 헤더 */}
      <div style={{
        padding: "0", borderRadius: 18,
        background: "#FFFFFF",
        border: `1px solid ${cat.color}20`,
        marginBottom: 20,
        overflow: "hidden",
      }}>
        <div style={{
          height: 4,
          background: Array.isArray(cat.multiColor)
            ? `linear-gradient(90deg, ${cat.multiColor[0]}, ${cat.multiColor[1]}, ${cat.multiColor[2]})`
            : `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`,
        }} />
        <div style={{ padding: "22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26,
            }}>{cat.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#111827", lineHeight: 1.2 }}>{cat.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>{cat.subtitle}</div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 12, fontWeight: 600 }}>
            {cat.headerMeta}
          </div>

          {/* USP pill tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {cat.uspPills.map((p, i) => (
              <PillTag key={i} color={cat.color}>{p}</PillTag>
            ))}
          </div>

          {/* 통계 */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: cat.color + "15", color: cat.color,
            }}>{cat.count}개 기회</span>
            <span style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: "#F3F4F6", color: "#374151",
            }}>{cat.annual}</span>
          </div>
        </div>
      </div>

      {/* 그룹별 기회 */}
      {cat.groups.map((group, gi) => (
        <div key={gi}>
          <SectionDivider label={group.label} color={cat.color} count={group.items.length} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {group.items.map((item, i) => {
              const key = `g${gi}-${i}`;
              return (
                <OpportunityCard
                  key={key}
                  item={item}
                  isOpen={openKey === key}
                  onToggle={() => setOpenKey(openKey === key ? null : key)}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* 교차 인사이트 */}
      <SectionDivider label="데이터가 말해주는 교차 인사이트" color="#DC2626" count={cat.insights.length} />
      <div>
        {cat.insights.map((item, i) => {
          const key = `i-${i}`;
          return (
            <InsightCard
              key={key}
              item={item}
              isOpen={openKey === key}
              onToggle={() => setOpenKey(openKey === key ? null : key)}
            />
          );
        })}
      </div>
    </div>
  );
}

function MainView({ onSelect }) {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{
        fontSize: 11, fontWeight: 800, color: "#9CA3AF", letterSpacing: 1,
        textTransform: "uppercase", marginBottom: 14, paddingLeft: 4,
      }}>
        카드별 기회 맵
      </div>
      <CategoryCard cat={CATEGORIES.all} onClick={() => onSelect("all")} />
      <CategoryCard cat={CATEGORIES.you} onClick={() => onSelect("you")} />
      <CategoryCard cat={CATEGORIES.need} onClick={() => onSelect("need")} />
    </div>
  );
}

export default function Home() {
  const [topTab, setTopTab] = useState("discover");
  const [currentView, setCurrentView] = useState("main");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8F9FB",
      color: "#111827",
      fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button:hover { opacity: 0.9; }
      `}</style>

      <Hero />
      <TopNav active={topTab} onChange={setTopTab} />

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px 60px" }}>
        {currentView === "main" ? (
          <MainView onSelect={setCurrentView} />
        ) : (
          <DetailView
            cat={CATEGORIES[currentView]}
            onBack={() => setCurrentView("main")}
          />
        )}
      </div>

      <div style={{
        padding: "20px", textAlign: "center",
        borderTop: "1px solid #E5E7EB",
        background: "#FFFFFF",
      }}>
        <div style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: 1, fontWeight: 600 }}>
          PENTACLE × AI &nbsp;·&nbsp; ALGORITHM PERFORMANCE PLATFORM
        </div>
      </div>
    </div>
  );
}
