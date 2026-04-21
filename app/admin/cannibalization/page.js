"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getGlobalCannibalizationMap } from "../../../lib/cannibalization";

const TIER_COLORS = {
  MEGA: "#2563EB", LARGE: "#10B981", MEDIUM: "#F59E0B", NICHE: "#8B5CF6",
};
const CARD_COLORS = {
  "ALL 카드": "#2563EB",
  "YOU Prime 일상팩": "#7C3AED",
  "YOU Prime 가족팩": "#7C3AED",
  "NEED Pay": "#059669",
  "NEED Autoslim": "#D97706",
  "NEED AutoSlim": "#D97706",
  "NEED Edu": "#DC2626",
};

const fmt = (n) => typeof n === "number" ? n.toLocaleString("ko-KR") : (n || 0);

export default function CannibalizationDashboard() {
  const [conflicts, setConflicts] = useState([]);
  const [minCards, setMinCards] = useState(2);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setConflicts(getGlobalCannibalizationMap());
  }, []);

  const filtered = useMemo(() => {
    return conflicts.filter(c => {
      if (c.cardCount < minCards) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!c.term.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [conflicts, minCards, search]);

  const stats = useMemo(() => {
    const total = conflicts.length;
    const by2 = conflicts.filter(c => c.cardCount >= 2).length;
    const by3 = conflicts.filter(c => c.cardCount >= 3).length;
    const by4 = conflicts.filter(c => c.cardCount >= 4).length;
    const uniqueCards = new Set();
    conflicts.forEach(c => c.matches.forEach(m => uniqueCards.add(m.card)));
    return { total, by2, by3, by4, uniqueCards: uniqueCards.size };
  }, [conflicts]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F7FA",
      color: "#1E293B",
      fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Top Bar */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", padding: "14px 24px" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 900, color: "#1E293B",
            }}>KB</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1E293B" }}>
                KB <span style={{ color: "#F97316" }}>AI Brandformance</span> Engine
              </div>
              <div style={{ fontSize: 9, color: "#64748B", letterSpacing: 2, fontWeight: 700 }}>
                ADMIN · CANNIBALIZATION
              </div>
            </div>
          </a>
          <a href="/" style={{ fontSize: 12, color: "#64748B", textDecoration: "none", fontWeight: 600 }}>← 홈으로</a>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px 60px" }}>
        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#DC2626", fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            🔀 관리자 대시보드
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#1E293B", marginBottom: 6 }}>
            카드 간 기회 중복 분석
          </div>
          <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
            같은 키워드가 여러 카드에 매핑되어 있는 경우를 감지하고, tier·검색량 기준으로 최적 카드를 자동 추천합니다.
          </div>
        </div>

        {/* 상단 스탯 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12, marginBottom: 18,
        }}>
          <StatCard label="전체 중복 키워드" value={`${stats.total}개`} color="#DC2626" icon="🔀" />
          <StatCard label="2+ 카드 중복" value={`${stats.by2}`} color="#F59E0B" icon="⚠️" />
          <StatCard label="3+ 카드 중복" value={`${stats.by3}`} color="#DC2626" icon="🚨" />
          <StatCard label="관련 카드 수" value={`${stats.uniqueCards}`} color="#2563EB" icon="💳" />
        </div>

        {/* 필터 바 */}
        <div style={{
          background: "#FFFFFF", borderRadius: 12,
          border: "1px solid #E5E7EB", padding: "14px 18px", marginBottom: 18,
          display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#1E293B" }}>최소 중복 카드 수</span>
          <div style={{ display: "flex", gap: 4 }}>
            {[2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setMinCards(n)}
                style={{
                  padding: "6px 14px", borderRadius: 7,
                  border: "none",
                  background: minCards === n ? "#EA580C" : "#F3F4F6",
                  color: minCards === n ? "#FFFFFF" : "#374151",
                  fontSize: 11, fontWeight: 800, cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >{n}개 이상</button>
            ))}
          </div>

          <div style={{ width: 1, height: 24, background: "#E5E7EB" }} />

          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 키워드 검색"
            style={{
              flex: 1, minWidth: 200,
              padding: "7px 12px", borderRadius: 7,
              border: "1px solid #E5E7EB", background: "#FFFFFF",
              fontSize: 12, outline: "none",
            }}
          />

          <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600, marginLeft: "auto" }}>
            {filtered.length}개 결과
          </span>
        </div>

        {/* 중복 키워드 목록 */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 20px",
            background: "#FFFFFF", borderRadius: 14,
            border: "1px solid #E5E7EB",
          }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>✨</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
              해당 조건의 중복 키워드가 없습니다
            </div>
            <div style={{ fontSize: 11, color: "#64748B" }}>
              필터를 조정하거나 검색어를 변경해보세요
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((conflict, i) => (
              <ConflictRow key={i} conflict={conflict} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 12,
      border: "1px solid #E5E7EB",
      padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9,
        background: `${color}15`, color: color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 900, color: color, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 10, color: "#64748B", fontWeight: 600, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

function ConflictRow({ conflict }) {
  const [expanded, setExpanded] = useState(false);
  const recCard = conflict.recommendation;
  const recCardColor = CARD_COLORS[recCard.card] || "#6B7280";

  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 12,
      border: "1px solid #E5E7EB",
      overflow: "hidden",
    }}>
      {/* Header row */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "14px 18px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 14,
          transition: "background 0.15s",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1E293B" }}>
              "{conflict.term}"
            </span>
            <span style={{
              padding: "2px 8px", borderRadius: 12,
              background: conflict.cardCount >= 3 ? "#FEE2E2" : "#FEF3C7",
              color: conflict.cardCount >= 3 ? "#B91C1C" : "#92400E",
              fontSize: 10, fontWeight: 800,
            }}>
              {conflict.cardCount}개 카드 중복
            </span>
            <span style={{ fontSize: 10, color: "#64748B" }}>
              · {conflict.matches.length}개 기회
            </span>
          </div>
          <div style={{ fontSize: 10.5, color: "#64748B" }}>
            {conflict.matches.slice(0, 3).map((m, i) => (
              <span key={i}>{i > 0 && " · "}{m.card}</span>
            ))}
            {conflict.matches.length > 3 && <span> · 외 {conflict.matches.length - 3}</span>}
          </div>
        </div>
        <div style={{
          textAlign: "right", flexShrink: 0,
          padding: "6px 12px", borderRadius: 8,
          background: `${recCardColor}12`,
          border: `1px solid ${recCardColor}30`,
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: recCardColor, letterSpacing: 0.5 }}>
            ✓ 권장 카드
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: recCardColor }}>
            {recCard.card}
          </div>
          <div style={{ fontSize: 9, color: "#64748B", marginTop: 2 }}>
            {recCard.tier} · 연 {fmt(recCard.volume)}
          </div>
        </div>
        <div style={{
          fontSize: 12, color: "#9CA3AF",
          transform: expanded ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.2s",
        }}>▼</div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div style={{
          padding: "0 18px 16px 18px",
          borderTop: "1px dashed #F3F4F6",
        }}>
          <div style={{ fontSize: 10, color: "#64748B", fontWeight: 700, marginTop: 12, marginBottom: 8, letterSpacing: 0.5 }}>
            이 키워드에 매핑된 모든 기회
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {conflict.matches.map((m, i) => {
              const isRec = m.oppId === recCard.oppId;
              const mCardColor = CARD_COLORS[m.card] || "#6B7280";
              return (
                <div
                  key={i}
                  style={{
                    padding: "10px 12px", borderRadius: 8,
                    background: isRec ? "#F0FDF4" : "#F9FAFB",
                    border: `1px solid ${isRec ? "#A7F3D0" : "#E5E7EB"}`,
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{
                    fontSize: 9, fontWeight: 800, color: "#FFFFFF",
                    background: TIER_COLORS[m.tier] || "#6B7280",
                    padding: "2px 7px", borderRadius: 4,
                    flexShrink: 0,
                  }}>{m.tier}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1E293B", marginBottom: 2 }}>
                      {isRec && <span style={{ color: "#047857", marginRight: 4 }}>✓</span>}
                      <span style={{ color: mCardColor, fontWeight: 800 }}>{m.card}</span>
                      <span style={{ color: "#64748B", fontWeight: 400 }}> — {m.oppTitle}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#64748B" }}>
                      ID: {m.oppId} · 연 {fmt(m.volume)}회
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
