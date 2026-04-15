"use client";

import { useState } from "react";

const CARDS = {
  ALL: { name: "ALL", color: "#2563EB", tagline: "고민없이 받는 혜택", annual: "2만", emoji: "💳" },
  YOU: { name: "YOU Prime", color: "#7C3AED", tagline: "나에게 딱 맞춘 혜택", annual: "3만", emoji: "👤" },
  PAY: { name: "NEED Pay", color: "#059669", tagline: "간편결제 집중 혜택", annual: "1.9만", emoji: "📱" },
  AUTO: { name: "NEED Autoslim", color: "#D97706", tagline: "자동차 집중 혜택", annual: "2만", emoji: "🚗" },
  EDU: { name: "NEED Edu", color: "#DC2626", tagline: "교육 집중 혜택", annual: "2.5만", emoji: "📚" },
};

const CATEGORIES = {
  all: {
    key: "all",
    label: "A. ALL 카드",
    title: "ALL 카드",
    emoji: "💳",
    subtitle: "ALL 카드의 USP 자산에서 출발한 기회",
    emojis: ["💳", "🎬", "🛒", "✈️", "📶"],
    color: "#2563EB",
    colorSoft: "#DBEAFE",
    count: 11,
    annual: "연간 3.1억+ 회",
    headerMeta: "연회비 2만원 · 전월 40만+ · 가족카드 무료",
    headerSub: "국내 1% · 해외 2% · 쇼핑멤버십 50% · OTT 10% · 통신 5%",
    previews: [
      "🛒 쿠팡·네이버 멤버십을 반값에 유지하고 싶은 사람",
      "🎬 넷플릭스 해지 직전, \"싸게 유지\"를 원하는 사람",
      "✈️ 트래블카드 말고, 365일 쓰는 해외 카드가 필요한 사람",
    ],
    groups: [
      {
        label: "USP에서 출발한 기회",
        items: [
          { emoji: "🛒", usp: "쇼핑멤버십 50%", target: "쿠팡·네이버 쇼핑 이용자", vol: "월 2,035만", demo: "여 57%, 30-40대", insight: "쿠팡 와우(7,890원) + 네이버플러스(4,900원) = 월 12,790원. 50% 할인으로 연 76,740원 절약. 연회비 대비 3.8배 이득." },
          { emoji: "🎬", usp: "OTT 10%", target: "넷플릭스·유튜브·티빙 구독자", vol: "월 990만", demo: "30-40대 남녀", insight: "'해지'(월 10,500)보다 '싸게 유지'(월 43,700)가 4배 많은 시장. ALL 카드는 \"해지하지 않아도 되는 이유\"." },
          { emoji: "✈️", usp: "해외 이용 2%", target: "해외여행 준비자 전체", vol: "월 107만", demo: "여 64%, 30대", insight: "트래블카드가 해외카드 시장을 점령. 하지만 '365일 쓰는 카드'라는 포지셔닝은 트래블카드가 못 하는 영역." },
          { emoji: "📶", usp: "이동통신 5%", target: "통신비 절약 관심자", vol: "월 30만", demo: "남 56%, 40-50대", insight: "ALL 카드의 유일한 남성 진입로. 가족카드(무료)로 한 가정에 2장(엄마+아빠) 침투 가능." },
          { emoji: "💳", usp: "국내 전 가맹점 1%", target: "카드 선택 피로자", vol: "월 7만", demo: "여 55%, 25-30대", insight: "카드고릴라에서 1시간 비교 vs 그냥 전부 1%. '고민없이'가 곧 USP." },
        ],
      },
      {
        label: "소비자 맥락에서 발견한 기회",
        items: [
          { emoji: "🗺️", usp: "해외여행 준비 과정 침투", target: "항공권 예약 → 숙소 비교 → \"해외 결제 카드\" 고민", vol: "월 107만+", demo: "여 64%, 30대", insight: "트래블카드가 시장 점령. '여행 갔다 와서도 계속 쓰는 카드'는 아무도 안 하고 있음." },
          { emoji: "🔔", usp: "구독 해지 고민 순간 침투", target: "넷플릭스/유튜브 가격 확인 → \"싸게 보는 법\" → 해지 직전", vol: "월 43,736", demo: "30-40대", insight: "해지 버튼 누르기 직전이 카드 침투 최적 타이밍." },
          { emoji: "🔄", usp: "카드 교체/첫 발급 시점 침투", target: "신용카드 추천 → 디시/뽐뿌 → 카드고릴라", vol: "월 68,000+", demo: "여 55%, 20-30대", insight: "\"어디서 얼마 할인인지 따지기 싫은\" 사람에게 \"전부 1%\" 메시지." },
        ],
      },
    ],
    insights: [
      { discovery: "\"고정비 통합 절약\" 메시지를 아무도 하지 않고 있다", detail: "와우+네이버+넷플릭스+유튜브+통신비 = 월 91,190원. ALL 카드로 연 14만원 절약. 이 '통합 절약' 메시지를 하는 카드사가 시장에 없음.", tag: "블루오션" },
      { discovery: "넷플릭스→할인카드 여정에 신한카드는 있고, KB는 없다", detail: "소비자가 이미 걷고 있는 '넷플릭스 가격 → 싸게 보는 법 → 할인카드' 여정 끝에 경쟁사만 존재. KB ALL 카드가 부재.", tag: "경쟁사 선점" },
      { discovery: "통신비가 ALL 카드의 유일한 남성 침투로", detail: "ALL 카드 모든 자산이 여성 55-70%인데, 통신비만 남 56%, 40-50대 66%. 가족카드(무료)로 한 가정에 2장 침투할 수 있는 구조.", tag: "침투 전략" },
    ],
  },
  you: {
    key: "you",
    label: "B. YOU Prime",
    title: "YOU Prime 카드",
    emoji: "👤",
    subtitle: "일상팩·가족팩에서 출발한 기회",
    emojis: ["💪", "⛽", "🛍️", "☕", "🏠"],
    color: "#7C3AED",
    colorSoft: "#F3E8FF",
    count: 9,
    annual: "연간 1.2억+ 회",
    headerMeta: "연회비 3만원 · 전월 40만+ · 가족카드 7,000원",
    headerSub: "일상팩: 주유/배달/통신/보험/App 10% · 가족팩: 생활요금/장보기/케어 10%",
    previews: [
      "💪 필라테스 \"비싼 이유\"를 납득하는 과정에 있는 30대 여성",
      "🛒 마켓컬리로 매주 장보는 40대 엄마",
      "⛽ 유가 급등에 주유 할인을 찾는 40대 남성",
    ],
    groups: [
      {
        label: "일상팩에서 출발한 기회",
        items: [
          { emoji: "⛽", usp: "주유 10%", target: "출퇴근 운전자 — 유가 급등에 주유 할인을 찾는 사람", vol: "월 42,510", demo: "남 70%, 40대 38%", insight: "주유소 가격 검색 폭발 성장(+1,623%). 유가 상승기에 자동으로 수요 급등하는 구조." },
          { emoji: "🛵", usp: "배달 10%", target: "배달앱 헤비유저", vol: "월 211,100", demo: "전 연령", insight: "배달의민족+쿠팡이츠 합산 월 37.6만. 매일 시키는 배달에서 10% 할인의 체감 효과." },
          { emoji: "💪", usp: "자기관리 5%", target: "필라테스·요가·헬스장 이용자", vol: "월 14,252", demo: "여 78%, 25-40대", insight: "필라테스 가격 여정: 효과 확인 → 가격 → \"비싼 이유\" 납득. 비용 정당화 과정에 카드 할인 침투." },
          { emoji: "📱", usp: "통신/보험/App 10%", target: "생활 고정비 자동납부자", vol: "월 58,800+", demo: "30-40대", insight: "통신+보험+앱 결제가 자동이체. 한 번 설정하면 매달 자동으로 10% 할인." },
        ],
      },
      {
        label: "가족팩에서 출발한 기회",
        items: [
          { emoji: "🛒", usp: "온라인장보기 10%", target: "마켓컬리·오아시스로 매주 장보는 엄마", vol: "월 930,799", demo: "여 84%, 40대 36%", insight: "마켓컬리(월 80만)가 압도적 진입점. 이미 루틴화된 소비에서 10% 할인은 매주 체감하는 절약." },
          { emoji: "☕", usp: "학원·대형마트·카페 5%", target: "학부모의 일상 동선", vol: "월 29,896", demo: "여 74%, 30-40대", insight: "스타벅스 신메뉴(월 27,343) 급성장(+157%). 학원 픽업 후 카페, 마트 장보기 — 엄마의 일상 동선 전체 할인." },
          { emoji: "🏠", usp: "생활요금·일상케어 10%", target: "아파트 관리비를 고민하는 가정", vol: "월 9,053", demo: "남 53%, 30-40대", insight: "관리비 절약 검색 성장 중(+24%). 전기세+관리비 자동이체로 10% 할인하면 매월 체감." },
        ],
      },
    ],
    insights: [
      { discovery: "일상팩 안에서 성별이 극단적으로 갈린다", detail: "주유(남 70%) vs 필라테스(여 78%) vs 요가(여 89%). 같은 팩이지만 남녀가 완전히 다른 자산을 씀. 단일 페르소나 광고 불가.", tag: "타겟 반전" },
      { discovery: "가족팩의 마켓컬리(여 84%) = NEED Edu 타겟과 동일인", detail: "YOU Prime 가족팩 + NEED Edu + ALL = 40대 엄마의 모든 지출을 커버하는 3장 세트. 한 명에게 3장 제안 가능.", tag: "크로스셀" },
    ],
  },
  need: {
    key: "need",
    label: "C. NEED",
    title: "NEED 카드",
    emoji: "🎯",
    subtitle: "Pay·Autoslim·Edu 특화 기회",
    emojis: ["📱", "🔋", "🚗", "📚", "💊"],
    color: "#DC2626",
    colorSoft: "#FEE2E2",
    count: 12,
    annual: "연간 2.5억+ 회",
    headerMeta: "NEED Pay (1.9만) · NEED Autoslim (2만) · NEED Edu (2.5만)",
    headerSub: "📱 간편결제 15% · 🔋 충전소 5% · 📚 교육 5~10%",
    multiColor: ["#059669", "#D97706", "#DC2626"],
    previews: [
      "📱 카카오페이를 새로 쓰기 시작한 40-50대",
      "🔋 전기차 충전카드를 비교하는 신규 EV 오너",
      "📚 학원비를 조회하지만 \"할인\"은 검색하지 않는 40대 엄마",
    ],
    groups: [
      {
        label: "NEED Pay: 디지털 결제 생활자",
        items: [
          { emoji: "📱", usp: "간편결제 15%/10%", target: "네이버페이·카카오페이·삼성페이 이용자", vol: "월 1,543,466", demo: "남녀 반반, 30-40대", insight: "카카오페이(남 65%, 40-50대 79%) 폭발 성장(+70%). 진짜 타겟은 MZ가 아니라 40-50대 신규 이용자." },
          { emoji: "🎬", usp: "디지털콘텐츠 30%", target: "OTT·멤버십 구독자 — ALL보다 3배 높은 할인", vol: "월 990만", demo: "30-40대", insight: "ALL OTT 10% vs NEED Pay 30% = 3배 차이. OTT 절약이 핵심이면 NEED Pay가 더 강력." },
          { emoji: "👗", usp: "온라인패션몰 5%", target: "무신사·W컨셉 등 온라인 패션 쇼핑객", vol: "월 97", demo: "10-20대 76%", insight: "무신사 할부 검색자가 10-20대 76%. NEED Pay의 유일한 \"젊은 층\" 침투 자산." },
        ],
      },
      {
        label: "NEED Autoslim: 자동차 소유자",
        items: [
          { emoji: "⛽", usp: "주유소/충전소 5%", target: "자동차 소유자 + 전기차 이용자", vol: "월 57,543", demo: "남 70%, 40대", insight: "전기차 충전카드 폭발 성장(+555%, 월 15,033). \"주유 할인 카드\"에서 \"충전 할인 카드\"로 수요 이동 중." },
          { emoji: "🛡️", usp: "자동차보험 2만원", target: "자동차보험 비교·갱신 검색자", vol: "월 82,343", demo: "남 61%, 30-40대", insight: "자동차보험 비교(CPC $10.55)는 가장 비싼 광고시장. 이 여정에 '카드 할인' 개념 자체가 부재 = 블루오션." },
          { emoji: "🚗", usp: "오토 슬림 할부 최대 2만원", target: "자동차 할부 구매자", vol: "월 663", demo: "남 61%, 30대 47%", insight: "할부+주유+보험 = 자동차 소유의 3대 고정비. NEED Autoslim 한 장으로 전부 커버." },
        ],
      },
      {
        label: "NEED Edu: 교육+생활",
        items: [
          { emoji: "📚", usp: "교육업종 5~10%", target: "학원비 관리 학부모", vol: "월 2,553", demo: "여 80%, 40대 53%", insight: "학원비 여정 전체에 '할인' 개념이 0개. 학원 \"선택 가이드\" 안에서 결제 팁으로 침투." },
          { emoji: "💊", usp: "생활영역 5%", target: "병원·약국·커피 일상 이용자", vol: "월 27,945", demo: "여 59%, 30-40대", insight: "병원·약국은 비자발적 지출. 카드 할인의 체감 가치가 자발적 소비보다 높음." },
        ],
      },
    ],
    insights: [
      { discovery: "전기차 충전카드 시장 폭발(+555%) — Autoslim의 숨은 자산", detail: "소비자는 \"전기차 전용카드\"만 인지. Autoslim이 충전소를 커버하는 걸 모름.", tag: "숨은 자산" },
      { discovery: "자동차보험 비교 여정에 \"카드 할인\" 개념이 존재하지 않는다", detail: "매달 79,500명이 보험 비교. 연 95만 번 검색에서 '카드로 2만원 할인'이 인식 바깥.", tag: "블루오션" },
      { discovery: "간편결제 성장은 \"중장년층 유입\"에서 오고 있다", detail: "카카오페이 40-50대 79%, 성장 +70%. MZ 타겟팅이 아니라 40-50대에게 소구.", tag: "타겟 반전" },
      { discovery: "학원비 여정 200개 경로에 \"할인\"이 단 하나도 없다", detail: "\"학원비 할인카드\"가 아니라 \"학원 선택 가이드\" 콘텐츠 안에서 카드를 침투.", tag: "진입 전략" },
    ],
  },
};

const TAG_COLORS = {
  "블루오션": { bg: "#DBEAFE", color: "#1D4ED8", border: "#93C5FD" },
  "경쟁사 선점": { bg: "#FEE2E2", color: "#B91C1C", border: "#FCA5A5" },
  "크로스셀": { bg: "#F3E8FF", color: "#7C3AED", border: "#C4B5FD" },
  "침투 전략": { bg: "#D1FAE5", color: "#047857", border: "#6EE7B7" },
  "숨은 자산": { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  "타겟 반전": { bg: "#FFE4E6", color: "#BE123C", border: "#FDA4AF" },
  "진입 전략": { bg: "#E0E7FF", color: "#3730A3", border: "#A5B4FC" },
};

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

function Hero() {
  return (
    <div style={{
      background: "linear-gradient(160deg, #0F172A 0%, #1E293B 40%, #1E3A5F 100%)",
      padding: "40px 20px 32px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #2563EB15, transparent)" }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED10, transparent)" }} />
      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
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
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#F1F5F9", lineHeight: 1.3, marginBottom: 4, letterSpacing: -0.5 }}>
          ALL·YOU·NEED
        </h1>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#60A5FA", marginBottom: 16 }}>
          AI Brandformance Engine
        </div>
        <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6, marginBottom: 20 }}>
          소비자 검색 데이터에서 발견한 기회를 카드 자산과 연결하고,<br />
          숏폼 콘텐츠 전략으로 전환합니다
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "발견된 기회", value: "32개", color: "#60A5FA" },
            { label: "연간 검색량", value: "4.2억+", color: "#34D399" },
            { label: "카드 라인", value: "5개", color: "#FBBF24" },
            { label: "인사이트", value: "8가지", color: "#F87171" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "10px 14px", borderRadius: 12,
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              flex: "1 1 calc(50% - 5px)", minWidth: 120,
            }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
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
        padding: "24px 22px",
        marginBottom: 16,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* 좌상단 그라디언트 장식 */}
      {!isMulti ? (
        <div style={{
          position: "absolute", top: -60, left: -60, width: 180, height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cat.color}18, transparent 70%)`,
        }} />
      ) : (
        <>
          <div style={{ position: "absolute", top: -50, left: -50, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${cat.multiColor[0]}20, transparent 70%)` }} />
          <div style={{ position: "absolute", top: -40, left: 40, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${cat.multiColor[1]}18, transparent 70%)` }} />
          <div style={{ position: "absolute", top: -30, left: 120, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${cat.multiColor[2]}15, transparent 70%)` }} />
        </>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 이모지 5개 */}
        <div style={{ fontSize: 24, marginBottom: 14, letterSpacing: 2 }}>
          {cat.emojis.join(" ")}
        </div>

        {/* 라벨 + 타이틀 */}
        <div style={{ fontSize: 11, fontWeight: 800, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
          {cat.label}
        </div>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 14, lineHeight: 1.5 }}>
          {cat.subtitle}
        </div>

        {/* 통계 배지 */}
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
              fontSize: 12, color: "#374151", lineHeight: 1.5,
              padding: "10px 12px", borderRadius: 10,
              background: "#F9FAFB", border: "1px solid #F3F4F6",
            }}>{p}</div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          fontSize: 13, fontWeight: 800, color: cat.color,
          display: "flex", alignItems: "center", gap: 4,
        }}>
          기회 보기 <span style={{ transition: "transform 0.2s" }}>→</span>
        </div>
      </div>
    </div>
  );
}

function OpportunityCard({ item, color, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: "#FFFFFF", borderRadius: 14,
        border: isOpen ? `2px solid ${color}40` : "1px solid #E5E7EB",
        cursor: "pointer", transition: "all 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${color}20, ${color}08)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0, border: `1px solid ${color}20`,
        }}>{item.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: color, fontWeight: 700, marginBottom: 4 }}>{item.usp}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.4 }}>{item.target}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: color, fontWeight: 700 }}>{item.vol}</span>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{item.demo}</span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#9CA3AF", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▼</div>
      </div>
      {isOpen && (
        <div style={{ padding: "0 18px 16px 68px", animation: "fadeSlide 0.3s ease" }}>
          <div style={{
            padding: "12px 14px", borderRadius: 10,
            background: `linear-gradient(135deg, ${color}08, transparent)`,
            border: `1px solid ${color}15`,
            fontSize: 12.5, lineHeight: 1.7, color: "#374151",
          }}>
            <span style={{ fontWeight: 700, color: color }}>💡 발견: </span>{item.insight}
          </div>
        </div>
      )}
    </div>
  );
}

function InsightCard({ item, color }) {
  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 14,
      border: "1px solid #E5E7EB", overflow: "hidden",
      marginBottom: 10,
    }}>
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          <TagBadge tag={item.tag} />
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111827", lineHeight: 1.5, marginBottom: 10 }}>
          {item.discovery}
        </div>
        <div style={{
          padding: "10px 14px", borderRadius: 10,
          background: `linear-gradient(135deg, ${color}06, transparent)`,
          border: `1px solid ${color}12`,
          fontSize: 12, lineHeight: 1.7, color: "#4B5563",
        }}>
          {item.detail}
        </div>
      </div>
    </div>
  );
}

function DetailView({ cat, onBack }) {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      {/* 뒤로가기 */}
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

      {/* 헤더 */}
      <div style={{
        padding: "22px 22px", borderRadius: 18,
        background: `linear-gradient(135deg, ${cat.color}08, ${cat.color}02)`,
        border: `1px solid ${cat.color}18`,
        marginBottom: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}>{cat.emoji}</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}>{cat.title}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{cat.subtitle}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4, fontWeight: 600 }}>{cat.headerMeta}</div>
        <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 14 }}>{cat.headerSub}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{
            padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
            background: cat.color + "15", color: cat.color,
          }}>{cat.count}개 기회</span>
          <span style={{
            padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
            background: "#FFFFFF", color: "#374151", border: "1px solid #E5E7EB",
          }}>{cat.annual}</span>
        </div>
      </div>

      {/* 그룹별 기회 목록 */}
      {cat.groups.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 28 }}>
          <div style={{
            fontSize: 11, fontWeight: 800, color: cat.color,
            letterSpacing: 1, textTransform: "uppercase", marginBottom: 12,
            paddingLeft: 4,
          }}>
            — {group.label} ({group.items.length}) —
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {group.items.map((item, i) => {
              const key = `${gi}-${i}`;
              return (
                <OpportunityCard
                  key={key}
                  item={item}
                  color={cat.color}
                  isOpen={openKey === key}
                  onToggle={() => setOpenKey(openKey === key ? null : key)}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* 교차 인사이트 */}
      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <div style={{
          padding: "16px 18px", borderRadius: 14, marginBottom: 14,
          background: "linear-gradient(135deg, #FEF2F2, #FFF7ED)",
          border: "1px solid #FECACA",
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#DC2626", letterSpacing: 1, marginBottom: 6 }}>
            💡 데이터가 말해주는 교차 인사이트
          </div>
          <div style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.6 }}>
            {cat.title}와 직접 관련된, 데이터에서만 보이는 발견 {cat.insights.length}개
          </div>
        </div>
        {cat.insights.map((item, i) => (
          <InsightCard key={i} item={item} color={cat.color} />
        ))}
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
        button:hover { opacity: 0.88; }
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
