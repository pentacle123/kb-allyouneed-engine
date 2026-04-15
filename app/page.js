"use client";

import { useState } from "react";

const CARDS = {
  ALL: { name: "ALL", color: "#2563EB", tagline: "고민없이 받는 혜택", annual: "2만", emoji: "💳" },
  YOU: { name: "YOU Prime", color: "#7C3AED", tagline: "나에게 딱 맞춘 혜택", annual: "3만", emoji: "👤" },
  PAY: { name: "NEED Pay", color: "#059669", tagline: "간편결제 집중 혜택", annual: "1.9만", emoji: "📱" },
  AUTO: { name: "NEED Autoslim", color: "#D97706", tagline: "자동차 집중 혜택", annual: "2만", emoji: "🚗" },
  EDU: { name: "NEED Edu", color: "#DC2626", tagline: "교육 집중 혜택", annual: "2.5만", emoji: "📚" },
};

const CAT_A = {
  title: "USP 자산에서 출발한 기회",
  subtitle: "카드 혜택이 필요한 삶을 사는 사람 전체가 기회",
  count: 15,
  annual: "연간 약 4.2억 회+",
  color: "#2563EB",
  icon: "💎",
  items: [
    { card: "ALL", usp: "쇼핑멤버십 50%", target: "쿠팡·네이버 쇼핑 이용자", vol: "월 2,035만", demo: "여 57%, 30-40대", insight: "쿠팡 로켓와우(7,890원) + 네이버플러스(4,900원) = 월 12,790원. 50% 할인으로 연 76,740원 절약. 연회비 2만원 대비 3.8배 이득." },
    { card: "ALL", usp: "OTT 10%", target: "넷플릭스·유튜브·티빙 구독자", vol: "월 990만", demo: "30-40대 남녀", insight: "유튜브 프리미엄 싸게(월 40,273) → 넷플릭스 싸게 보는 법(월 3,463). '해지'보다 '싸게 유지'가 4배 많은 시장." },
    { card: "ALL", usp: "해외 이용 2%", target: "해외여행 준비자 전체", vol: "월 107만", demo: "여 64%, 30대", insight: "일본 여행(월 293,733) + 유럽 여행(월 45,586). 트래블카드가 시장을 점령한 사이, '365일 쓰는 카드'라는 빈자리." },
    { card: "ALL", usp: "이동통신 5%", target: "통신비 절약 관심자", vol: "월 30만", demo: "남 56%, 40-50대", insight: "ALL 카드의 유일한 남성 진입로. 가족카드(무료)로 한 가정에 2장(엄마+아빠) 침투 가능." },
    { card: "ALL", usp: "국내 전 가맹점 1%", target: "카드 선택 피로자", vol: "월 7만", demo: "여 55%, 25-30대", insight: "신용카드 추천 → 디시/뽐뿌 → 카드고릴라. 카드 고르기 자체가 스트레스인 사람들에게 '고민 끝' 메시지." },
    { card: "YOU", usp: "일상팩 주유 10%", target: "출퇴근 운전자", vol: "월 42,510", demo: "남 70%, 40대", insight: "주유소 가격 검색 폭발 성장(+1,623%). 유가 상승기에 주유 할인 카드 수요 급등하는 구조." },
    { card: "YOU", usp: "일상팩 자기관리 5%", target: "필라테스·요가·헬스장 이용자", vol: "월 14,252", demo: "여 78%, 25-40대", insight: "필라테스 가격(월 7,176)의 핵심 여정: 효과 확인 → 가격 → '비싼 이유' 납득. 비용 정당화 과정에 카드 할인 침투." },
    { card: "YOU", usp: "가족팩 온라인장보기 10%", target: "마켓컬리·오아시스 이용자", vol: "월 930,799", demo: "여 84%, 40대", insight: "마켓컬리(월 804,766)가 가족팩의 압도적 진입점. '온라인 장보기'가 아니라 '마켓컬리'로 직접 검색하는 구조." },
    { card: "YOU", usp: "가족팩 학원·카페 5%", target: "학부모 + 카페 이용자", vol: "월 29,896", demo: "여 74%, 30-40대", insight: "스타벅스 신메뉴(월 27,343) 급성장(+157%). 카페 할인은 일상적 반복 소비라서 체감 절약이 큼." },
    { card: "PAY", usp: "간편결제 15%/10%", target: "네이버페이·카카오페이·삼성페이 이용자", vol: "월 1,543,466", demo: "남녀 반반, 30-40대", insight: "카카오페이(남 65%, 40-50대 79%) 폭발 성장(+70%). 간편결제 진짜 타겟은 MZ가 아니라 40-50대 신규 이용자." },
    { card: "PAY", usp: "디지털콘텐츠 30%", target: "OTT·멤버십 구독자", vol: "월 990만", demo: "30-40대", insight: "ALL OTT 10%의 3배. OTT 절약이 핵심 니즈라면 NEED Pay가 더 강력한 제안. 카드 간 차별화 포인트." },
    { card: "AUTO", usp: "주유/충전소 5%", target: "자동차 소유자 + 전기차 이용자", vol: "월 57,543", demo: "남 70%, 40대", insight: "전기차 충전카드 폭발 성장(+555%, 월 15,033). '주유 할인 카드'에서 '충전 할인 카드'로 수요 이동 중." },
    { card: "AUTO", usp: "자동차보험 2만원", target: "자동차보험 비교·갱신 검색자", vol: "월 82,343", demo: "남 61%, 30-40대", insight: "자동차보험 비교(CPC $10.55)는 가장 비싼 광고시장 중 하나. 이 여정에 '카드 할인' 개념 자체가 부재 = 블루오션." },
    { card: "EDU", usp: "교육업종 5~10%", target: "학원비 관리 학부모", vol: "월 2,553", demo: "여 80%, 40대 53%", insight: "학원비 여정 전체에 '할인' 개념이 존재하지 않음. 학원 '선택 가이드' 안에서 결제 수단으로 침투해야 하는 구조." },
    { card: "EDU", usp: "생활영역 5%", target: "병원·약국·커피 이용자", vol: "월 27,945", demo: "여 59%, 30-40대", insight: "스타벅스(월 27,343) + 약국 할인(월 106, 성장 +21%). 병원·약국은 비자발적 지출이라 카드 할인의 체감 가치가 높음." },
  ]
};

const CAT_B = {
  title: "소비자 삶의 맥락에서 발견한 기회",
  subtitle: "카드를 검색하지 않지만, 카드가 필요한 순간에 있는 사람들",
  count: 9,
  annual: "연간 약 1.5억 회+",
  color: "#7C3AED",
  icon: "🔍",
  items: [
    { context: "해외여행 준비 과정", moment: "항공권 예약 → 숙소 비교 → '해외 결제 카드' 고민", vol: "월 107만+", cards: ["ALL"], insight: "트래블카드가 해외카드 시장을 점령. 하지만 '여행 갔다 와서도 계속 쓰는 카드'는 아무도 안 하고 있음." },
    { context: "구독 해지 고민 순간", moment: "넷플릭스/유튜브 가격 확인 → '싸게 보는 법' → 해지 직전", vol: "월 43,736", cards: ["ALL", "PAY"], insight: "'해지'(월 10,500)보다 '싸게 유지'(월 43,700)가 4배 많음. 해지 버튼을 누르기 직전이 카드 침투 최적 타이밍." },
    { context: "자기관리 시작 시점", moment: "필라테스/요가 효과 검색 → 가격 확인 → '비싼 이유' 납득 과정", vol: "월 14,252", cards: ["YOU"], insight: "여 78-89%, 25-40대. '비용 정당화' 과정에서 '자기관리 5% 할인'이 자연스럽게 들어갈 수 있는 구조." },
    { context: "자동차보험 갱신 시점", moment: "보험 비교 → 다이렉트 비교 → 보험다모아 → 최저가 선택", vol: "월 82,343", cards: ["AUTO"], insight: "매달 8.2만 명이 보험을 비교하는데, 이 여정 어디에도 '카드로 2만원 할인'이라는 경로가 없음. 순수 블루오션." },
    { context: "전기차 전환/충전 시점", moment: "전기차 충전카드 종류 비교 → 할인카드 선택 → 충전 앱 등록", vol: "월 15,033", cards: ["AUTO"], insight: "전기차 충전카드 폭발 성장(+555%). 기존 카드들이 '주유'에 갇힌 사이 NEED Autoslim이 '충전소 포함'으로 차별화 가능." },
    { context: "학원 선택 과정", moment: "학원비 조회 → 학원비 알리미/나이스 → 대치동/노원구 학원 비교", vol: "월 2,553", cards: ["EDU"], insight: "학원비 여정 200개 경로 중 '할인' 경로 0개. '학원 선택 가이드' 콘텐츠 안에서 결제 팁으로 침투하는 전략 필요." },
    { context: "온라인 장보기 루틴", moment: "마켓컬리/오아시스 정기 이용 → 배송 대기 → 재주문", vol: "월 930,799", cards: ["YOU"], insight: "마켓컬리(여 84%, 40대 36%). 이미 루틴화된 소비에서 '10% 할인'은 매주 체감하는 절약." },
    { context: "주유비 급등 시점", moment: "주유소 가격 검색 → 저렴한 주유소 → 주유 할인 방법", vol: "월 42,510", cards: ["YOU", "AUTO"], insight: "주유소 가격 검색 폭발 성장(+1,623%). YOU Prime 일상팩(10%) vs NEED Autoslim(5%) 중 주유 비중에 따라 선택." },
    { context: "카드 교체/첫 발급 시점", moment: "신용카드 추천 → 디시/뽐뿌 → 카드고릴라 → 캐시백 확인", vol: "월 68,000+", cards: ["ALL"], insight: "20-30대 여성 55%. '어디서 얼마 할인인지 따지기 싫은' 사람에게 '전부 1%' 메시지가 가장 강력." },
  ]
};

const CAT_C = {
  title: "데이터가 말해주는 교차 기회",
  subtitle: "광고주도 생각하지 못한, 데이터에서만 보이는 발견",
  count: 8,
  annual: "카드 간 시너지",
  color: "#DC2626",
  icon: "⚡",
  items: [
    { discovery: "\"고정비 통합 절약\" 메시지를 아무도 하지 않고 있다", cards: ["ALL"], detail: "와우 7,890 + 네이버 4,900 + 넷플릭스 13,500 + 유튜브 14,900 + 통신비 50,000 = 월 91,190원. ALL 카드로 연 14만원 절약. 이 '통합 절약' 메시지를 하는 카드사가 시장에 없음.", tag: "블루오션" },
    { discovery: "넷플릭스→할인카드 여정에 신한카드는 있고, KB는 없다", cards: ["ALL"], detail: "소비자가 이미 '넷플릭스 가격 → 싸게 보는 법 → 할인카드'를 검색하는 여정이 존재. 그 끝에 나오는 건 '신한카드 넷플릭스 할인'. KB ALL 카드가 부재.", tag: "경쟁사 선점" },
    { discovery: "40대 엄마가 ALL·YOU·NEED 전체 카드의 교차점", cards: ["ALL", "YOU", "EDU"], detail: "넷플릭스 할인카드(40대 49%) = 마켓컬리(40대 36%) = 학원비(40대 53%) = 같은 사람. 이 한 명에게 ALL(구독료) + YOU 가족팩(장보기) + NEED Edu(학원비) 3장 세트 제안 가능.", tag: "크로스셀" },
    { discovery: "통신비가 ALL 카드의 유일한 남성 진입로", cards: ["ALL"], detail: "ALL 카드 모든 자산이 여성 55-70%인데, 통신비만 남 56%, 40-50대 66%. 가족카드(무료)로 한 가정에 2장(엄마+아빠) 침투할 수 있는 구조.", tag: "침투 전략" },
    { discovery: "전기차 충전카드 시장이 폭발하는데, NEED Autoslim이 커버한다", cards: ["AUTO"], detail: "전기차 충전카드(+555% 성장) 시장에서 KB EVO 같은 전용카드만 인지. NEED Autoslim의 '충전소 5%'가 전기차를 포함한다는 사실을 소비자가 모름.", tag: "숨은 자산" },
    { discovery: "자동차보험 비교 여정에 '카드 할인' 개념이 존재하지 않는다", cards: ["AUTO"], detail: "매달 79,500명이 자동차보험을 비교. 이 여정에 '결제 카드 바꾸면 2만원 할인'이라는 옵션이 인식 바깥. 연 95만 번의 검색에서 완전한 블루오션.", tag: "블루오션" },
    { discovery: "간편결제 성장은 '중장년층 유입'에서 오고 있다", cards: ["PAY"], detail: "카카오페이(남 65%, 40-50대 79%, 성장 +70%). 간편결제 15% 할인은 'MZ 디지털 네이티브'보다 '간편결제를 새로 쓰기 시작한 40-50대'에게 더 매력적.", tag: "타겟 반전" },
    { discovery: "학원비 여정 200개 경로에 '할인'이 단 하나도 없다", cards: ["EDU"], detail: "학원비 검색자는 '절약'이 아니라 '조회/비교'를 함. '학원비 할인카드'라고 소구해도 그 검색 자체를 안 함. 학원 '선택 가이드' 콘텐츠 안에서 결제 팁으로 침투 필요.", tag: "진입 전략" },
  ]
};

function CardBadge({ card }) {
  const c = CARDS[card];
  if (!c) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: c.color + "18", color: c.color,
      padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
      border: `1px solid ${c.color}30`, whiteSpace: "nowrap",
    }}>
      {c.emoji} {c.name}
    </span>
  );
}

function TagBadge({ tag }) {
  const colors = {
    "블루오션": { bg: "#DBEAFE", color: "#1D4ED8", border: "#93C5FD" },
    "경쟁사 선점": { bg: "#FEE2E2", color: "#B91C1C", border: "#FCA5A5" },
    "크로스셀": { bg: "#F3E8FF", color: "#7C3AED", border: "#C4B5FD" },
    "침투 전략": { bg: "#D1FAE5", color: "#047857", border: "#6EE7B7" },
    "숨은 자산": { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
    "타겟 반전": { bg: "#FFE4E6", color: "#BE123C", border: "#FDA4AF" },
    "진입 전략": { bg: "#E0E7FF", color: "#3730A3", border: "#A5B4FC" },
  };
  const s = colors[tag] || { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" };
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 4,
      fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{tag}</span>
  );
}

function USPCard({ item, idx, isOpen, onToggle }) {
  const c = CARDS[item.card];
  return (
    <div onClick={onToggle} style={{
      background: "var(--card-bg)", borderRadius: 16,
      border: isOpen ? `2px solid ${c.color}40` : "1px solid var(--border)",
      cursor: "pointer", transition: "all 0.3s ease",
      overflow: "hidden",
    }}>
      <div style={{ padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${c.color}20, ${c.color}08)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0, border: `1px solid ${c.color}20`,
        }}>{c.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
            <CardBadge card={item.card} />
            <span style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 600 }}>{item.usp}</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.4 }}>{item.target}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: c.color, fontWeight: 700 }}>{item.vol}</span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{item.demo}</span>
          </div>
        </div>
        <div style={{ fontSize: 14, color: "var(--text-dim)", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▼</div>
      </div>
      {isOpen && (
        <div style={{
          padding: "0 20px 18px 70px",
          animation: "fadeSlide 0.3s ease",
        }}>
          <div style={{
            padding: "12px 16px", borderRadius: 10,
            background: `linear-gradient(135deg, ${c.color}08, transparent)`,
            border: `1px solid ${c.color}12`,
            fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)",
          }}>
            <span style={{ fontWeight: 700, color: c.color }}>💡 발견:</span> {item.insight}
          </div>
        </div>
      )}
    </div>
  );
}

function ContextCard({ item, idx, isOpen, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      background: "var(--card-bg)", borderRadius: 16,
      border: isOpen ? "2px solid #7C3AED40" : "1px solid var(--border)",
      cursor: "pointer", transition: "all 0.3s ease", overflow: "hidden",
    }}>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          {item.cards.map(c => <CardBadge key={c} card={c} />)}
          <span style={{ fontSize: 12, color: "#7C3AED", fontWeight: 700, marginLeft: "auto" }}>{item.vol}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.4 }}>{item.context}</div>
        <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4 }}>{item.moment}</div>
        {isOpen && (
          <div style={{
            marginTop: 12, padding: "12px 16px", borderRadius: 10,
            background: "linear-gradient(135deg, #7C3AED08, transparent)",
            border: "1px solid #7C3AED12",
            fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)",
            animation: "fadeSlide 0.3s ease",
          }}>
            <span style={{ fontWeight: 700, color: "#7C3AED" }}>💡 발견:</span> {item.insight}
          </div>
        )}
      </div>
    </div>
  );
}

function InsightCard({ item, idx, isOpen, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      background: "var(--card-bg)", borderRadius: 16,
      border: isOpen ? "2px solid #DC262640" : "1px solid var(--border)",
      cursor: "pointer", transition: "all 0.3s ease", overflow: "hidden",
    }}>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <TagBadge tag={item.tag} />
          {item.cards.map(c => <CardBadge key={c} card={c} />)}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.5 }}>{item.discovery}</div>
        {isOpen && (
          <div style={{
            marginTop: 12, padding: "12px 16px", borderRadius: 10,
            background: "linear-gradient(135deg, #DC262608, transparent)",
            border: "1px solid #DC262612",
            fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)",
            animation: "fadeSlide 0.3s ease",
          }}>
            {item.detail}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryBlock({ cat, type }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? cat.items : cat.items.slice(0, 3);

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20,
        padding: "20px 24px", borderRadius: 16,
        background: `linear-gradient(135deg, ${cat.color}06, ${cat.color}02)`,
        border: `1px solid ${cat.color}15`,
      }}>
        <div style={{ fontSize: 32 }}>{cat.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: cat.color, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>
            {type === "A" ? "A" : type === "B" ? "B" : "C"}. {cat.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8 }}>{cat.subtitle}</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: cat.color + "15", color: cat.color,
            }}>{cat.count}개 기회</span>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: "var(--stat-bg)", color: "var(--text-secondary)",
            }}>{cat.annual}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {shown.map((item, i) => (
          type === "A" ? (
            <USPCard key={i} item={item} idx={i} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ) : type === "B" ? (
            <ContextCard key={i} item={item} idx={i} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ) : (
            <InsightCard key={i} item={item} idx={i} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          )
        ))}
      </div>

      {cat.items.length > 3 && (
        <button onClick={() => setExpanded(!expanded)} style={{
          display: "block", width: "100%", marginTop: 12,
          padding: "12px", borderRadius: 12, border: `1px dashed ${cat.color}30`,
          background: "transparent", color: cat.color, cursor: "pointer",
          fontSize: 13, fontWeight: 700, transition: "all 0.2s",
        }}>
          {expanded ? "접기 ▲" : `전체 ${cat.items.length}개 기회 보기 ▼`}
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState("discover");
  const [filter, setFilter] = useState("all");

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');
        :root {
          --bg: #F8F9FB;
          --card-bg: #FFFFFF;
          --text: #111827;
          --text-secondary: #374151;
          --text-dim: #9CA3AF;
          --border: #E5E7EB;
          --stat-bg: #F3F4F6;
          --hero-bg: linear-gradient(160deg, #0F172A 0%, #1E293B 40%, #1E3A5F 100%);
          --hero-text: #F1F5F9;
          --hero-dim: #94A3B8;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        button:hover { opacity: 0.85; }
      `}</style>

      {/* HERO */}
      <div style={{
        background: "var(--hero-bg)",
        padding: "40px 20px 32px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60, width: 200, height: 200,
          borderRadius: "50%", background: "radial-gradient(circle, #2563EB15, transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: -40, width: 160, height: 160,
          borderRadius: "50%", background: "radial-gradient(circle, #7C3AED10, transparent)",
        }} />

        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 900, color: "#1E293B",
            }}>KB</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--hero-dim)", letterSpacing: 2, textTransform: "uppercase" }}>
              KB국민카드 × Pentacle
            </span>
          </div>

          <h1 style={{
            fontSize: 26, fontWeight: 900, color: "var(--hero-text)",
            lineHeight: 1.3, marginBottom: 4, letterSpacing: -0.5,
          }}>
            ALL·YOU·NEED
          </h1>
          <div style={{
            fontSize: 14, fontWeight: 700, color: "#60A5FA",
            marginBottom: 16,
          }}>
            AI Brandformance Engine
          </div>
          <p style={{ fontSize: 12, color: "var(--hero-dim)", lineHeight: 1.6, marginBottom: 20 }}>
            소비자 검색 데이터에서 발견한 기회를 카드 자산과 연결하고,<br />
            숏폼 콘텐츠 전략으로 전환합니다
          </p>

          {/* Stats */}
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
                <div style={{ fontSize: 10, color: "var(--hero-dim)", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAV TABS */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "var(--card-bg)", borderBottom: "1px solid var(--border)",
        padding: "0 16px",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {[
            { id: "discover", label: "기회 발견", icon: "🔍" },
            { id: "cards", label: "카드 자산", icon: "💳" },
            { id: "insights", label: "핵심 인사이트", icon: "⚡" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id)} style={{
              padding: "14px 16px", border: "none", background: "none",
              cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
              color: view === tab.id ? "#2563EB" : "var(--text-dim)",
              borderBottom: view === tab.id ? "2px solid #2563EB" : "2px solid transparent",
              transition: "all 0.2s",
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px 60px" }}>

        {view === "discover" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <CategoryBlock cat={CAT_A} type="A" />
            <CategoryBlock cat={CAT_B} type="B" />
            <CategoryBlock cat={CAT_C} type="C" />
          </div>
        )}

        {view === "cards" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ marginBottom: 16, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[{ id: "all", label: "전체" }, ...Object.entries(CARDS).map(([k, v]) => ({ id: k, label: v.name }))].map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "1px solid var(--border)",
                  background: filter === f.id ? "#2563EB" : "var(--card-bg)",
                  color: filter === f.id ? "#fff" : "var(--text-secondary)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                }}>{f.label}</button>
              ))}
            </div>

            {Object.entries(CARDS)
              .filter(([k]) => filter === "all" || filter === k)
              .map(([key, card]) => (
              <div key={key} style={{
                marginBottom: 20, padding: "20px", borderRadius: 16,
                background: "var(--card-bg)", border: `1px solid ${card.color}20`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}CC)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
                  }}>{card.emoji}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>{card.name} 카드</div>
                    <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{card.tagline} · 연회비 {card.annual}원</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {CAT_A.items.filter(i => i.card === key).map((item, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", borderRadius: 10,
                      background: `${card.color}06`, border: `1px solid ${card.color}10`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{item.usp}</span>
                        <span style={{ fontSize: 11, color: card.color, fontWeight: 700 }}>{item.vol}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{item.target} · {item.demo}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "insights" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{
              padding: "20px", borderRadius: 16, marginBottom: 24,
              background: "linear-gradient(135deg, #FEF2F2, #FFF7ED)",
              border: "1px solid #FECACA",
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#DC2626", letterSpacing: 1, marginBottom: 8 }}>
                ⚡ 광고주가 몰랐던 8가지
              </div>
              <div style={{ fontSize: 13, color: "#7F1D1D", lineHeight: 1.6 }}>
                ListeningMind 검색 데이터에서 발견한, 카드 기획 단계에서 예상하지 못한 소비자 행동과 기회입니다.
                이 인사이트가 숏폼 콘텐츠 전략의 출발점이 됩니다.
              </div>
            </div>

            {CAT_C.items.map((item, i) => (
              <InsightCard key={i} item={item} idx={i} isOpen={true} onToggle={() => {}} />
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{
        padding: "20px", textAlign: "center",
        borderTop: "1px solid var(--border)",
        background: "var(--card-bg)",
      }}>
        <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 1, fontWeight: 600 }}>
          PENTACLE × AI &nbsp;·&nbsp; ALGORITHM PERFORMANCE PLATFORM
        </div>
      </div>
    </div>
  );
}
