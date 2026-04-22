"use client";

import React, { useState, useEffect } from "react";
import { hydrateBookmarks, removeBookmark, clearBookmarks } from "../../lib/bookmarks";
import { allCardData } from "../data/allCardData";
import { youPrimeDailyData } from "../data/youPrimeDailyData";
import { youPrimeFamilyData } from "../data/youPrimeFamilyData";
import { needEduData } from "../data/needEduData";
import { needPayData } from "../data/needPayData";
import { needAutoSlimData } from "../data/needAutoSlimData";

const ALL_DATA_FILES = [
  allCardData,
  youPrimeDailyData,
  youPrimeFamilyData,
  needEduData,
  needPayData,
  needAutoSlimData,
];

const ALL_OPPORTUNITIES = ALL_DATA_FILES.flatMap(f => f.opportunities || []);

const TIER_COLORS = {
  MEGA: "#2563EB", LARGE: "#10B981", MEDIUM: "#F59E0B", NICHE: "#8B5CF6",
};

function findCardMeta(cardName) {
  const file = ALL_DATA_FILES.find(f =>
    f.meta?.cardName === cardName ||
    cardName?.startsWith(f.meta?.cardName || "")
  );
  return file?.meta || { cardName, cardTagline: "" };
}

function findPersona(opp) {
  for (const file of ALL_DATA_FILES) {
    const p = file.personas?.find(pers => pers.id === opp.personaId);
    if (p) return p;
  }
  return { title: "", subtitle: "", color: "#3B82F6" };
}

const fmt = (n) => typeof n === "number" ? n.toLocaleString("ko-KR") : (n || 0);

export default function WorkbenchPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [batchIdeas, setBatchIdeas] = useState({});
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, current: "" });

  useEffect(() => {
    const load = () => setBookmarks(hydrateBookmarks(ALL_OPPORTUNITIES));
    load();
    window.addEventListener("bookmarks-updated", load);
    return () => window.removeEventListener("bookmarks-updated", load);
  }, []);

  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === bookmarks.length) setSelected(new Set());
    else setSelected(new Set(bookmarks.map(b => b.id)));
  };

  const handleBatchGenerate = async () => {
    if (selected.size === 0) return;
    const selectedOpps = bookmarks.filter(b => selected.has(b.id));
    setGenerating(true);
    setProgress({ done: 0, total: selectedOpps.length, current: "" });
    const results = {};

    for (let i = 0; i < selectedOpps.length; i++) {
      const opp = selectedOpps[i];
      setProgress({ done: i, total: selectedOpps.length, current: opp.title });
      try {
        const cardMeta = findCardMeta(opp.card);
        const persona = findPersona(opp);
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ opportunity: opp, cardMeta, persona }),
        });
        const result = await res.json();
        if (result.success) results[opp.id] = result.data.ideas;
        else results[opp.id] = [{ error: result.error || "생성 실패" }];
      } catch (e) {
        results[opp.id] = [{ error: e.message }];
      }
      setBatchIdeas({ ...results });
    }

    setProgress({ done: selectedOpps.length, total: selectedOpps.length, current: "" });
    setGenerating(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F7FA",
      color: "#1E293B",
      fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Top Bar */}
      <div style={{
        background: "#FFFFFF", borderBottom: "1px solid #E5E7EB",
        padding: "14px 24px",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <a href="/" style={{
            display: "flex", alignItems: "center", gap: 12,
            textDecoration: "none",
          }}>
            <div style={{
              width: 38, height: 38,
              background: "#FFFFFF", overflow: "hidden",
              position: "relative", flexShrink: 0,
            }}>
              <img
                src="/kb-symbol.png"
                alt="KB"
                style={{ position: "absolute", left: -4, top: "50%", transform: "translateY(-50%)", height: 50, width: "auto", maxWidth: "none" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1E293B" }}>
                KB <span style={{ color: "#FFB71B" }}>AI Brandformance</span> Engine
              </div>
              <div style={{ fontSize: 9, color: "#64748B", letterSpacing: 2, fontWeight: 700 }}>
                ALGORITHM PERFORMANCE PLATFORM
              </div>
            </div>
          </a>
          <a href="/" style={{
            fontSize: 12, color: "#64748B", textDecoration: "none", fontWeight: 600,
          }}>← 홈으로</a>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px 60px" }}>
        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#1E293B", marginBottom: 6 }}>
            ⭐ 내 워크벤치
          </div>
          <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
            북마크한 기회를 한 번에 관리하고 AI 숏폼 아이디어를 일괄 생성합니다
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 20px",
            background: "#FFFFFF", borderRadius: 16,
            border: "1px solid #E5E7EB",
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>☆</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>
              북마크한 기회가 없습니다
            </div>
            <div style={{ fontSize: 12, color: "#64748B", marginBottom: 20 }}>
              기회 분석 페이지에서 ⭐ 북마크를 눌러보세요
            </div>
            <a href="/" style={{
              display: "inline-block", padding: "10px 20px", borderRadius: 10,
              background: "#2563EB", color: "#FFFFFF",
              fontSize: 12, fontWeight: 700, textDecoration: "none",
            }}>홈으로 돌아가기</a>
          </div>
        ) : (
          <>
            {/* Action Bar */}
            <div style={{
              background: "#FFFFFF", borderRadius: 14,
              border: "1px solid #E5E7EB", padding: "14px 18px",
              marginBottom: 18,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <button
                  onClick={toggleAll}
                  style={{
                    padding: "7px 14px", borderRadius: 8,
                    border: "1px solid #E5E7EB", background: "#FFFFFF",
                    color: "#374151", fontSize: 12, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {selected.size === bookmarks.length ? "전체 해제" : "전체 선택"}
                </button>
                <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>
                  {selected.size} / {bookmarks.length}개 선택
                </span>
                {bookmarks.length > 0 && (
                  <button
                    onClick={() => { if (confirm("모든 북마크를 삭제하시겠습니까?")) clearBookmarks(); }}
                    style={{
                      padding: "7px 12px", borderRadius: 8,
                      border: "1px solid #FECACA", background: "#FEF2F2",
                      color: "#B91C1C", fontSize: 11, fontWeight: 700, cursor: "pointer",
                    }}
                  >전체 삭제</button>
                )}
              </div>
              <button
                onClick={handleBatchGenerate}
                disabled={selected.size === 0 || generating}
                style={{
                  padding: "10px 18px", borderRadius: 10,
                  border: "none",
                  background: selected.size === 0 || generating
                    ? "#E5E7EB"
                    : "linear-gradient(135deg, #FB923C, #EA580C)",
                  color: selected.size === 0 || generating ? "#9CA3AF" : "#FFFFFF",
                  fontSize: 12, fontWeight: 800,
                  cursor: selected.size === 0 || generating ? "not-allowed" : "pointer",
                  boxShadow: selected.size > 0 && !generating ? "0 4px 12px rgba(234, 88, 12, 0.25)" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                {generating
                  ? `생성 중... (${progress.done}/${progress.total})`
                  : `🎬 선택한 ${selected.size}개 AI 아이디어 일괄 생성`}
              </button>
            </div>

            {/* 생성 중 progress */}
            {generating && (
              <div style={{
                padding: "14px 18px", marginBottom: 18, borderRadius: 12,
                background: "linear-gradient(135deg, #FFF7ED, #FEF3C7)",
                border: "1px solid #FDBA74",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{
                  width: 22, height: 22,
                  border: "3px solid #FED7AA", borderTopColor: "#EA580C",
                  borderRadius: "50%", animation: "spin 0.8s linear infinite",
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#7C2D12", marginBottom: 2 }}>
                    Claude가 아이디어 생성 중 · {progress.done + 1}/{progress.total}
                  </div>
                  {progress.current && (
                    <div style={{ fontSize: 11, color: "#9A3412", lineHeight: 1.5 }}>
                      현재: {progress.current}
                    </div>
                  )}
                </div>
                <div style={{
                  flex: "0 0 200px",
                  height: 6, borderRadius: 3,
                  background: "#FED7AA", overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${(progress.done / Math.max(progress.total, 1)) * 100}%`,
                    background: "#EA580C",
                    transition: "width 0.3s",
                  }} />
                </div>
              </div>
            )}

            {/* Bookmark Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: 14,
            }}>
              {bookmarks.map(b => {
                const isSelected = selected.has(b.id);
                const tierColor = TIER_COLORS[b.tier] || "#6B7280";
                const ideas = batchIdeas[b.id];
                return (
                  <div
                    key={b.id}
                    style={{
                      background: "#FFFFFF", borderRadius: 14,
                      border: isSelected ? "2px solid #FB923C" : "1px solid #E5E7EB",
                      padding: "16px 18px",
                      boxShadow: isSelected ? "0 4px 12px rgba(234, 88, 12, 0.12)" : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(b.id)}
                        style={{ marginTop: 4, width: 16, height: 16, flexShrink: 0, cursor: "pointer" }}
                      />
                      <div style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 4, alignItems: "center" }}>
                          {b.tier && (
                            <span style={{
                              fontSize: 9, fontWeight: 800, color: "#FFFFFF",
                              background: tierColor, padding: "2px 7px", borderRadius: 4,
                            }}>{b.tier}</span>
                          )}
                          <span style={{ fontSize: 10, color: "#64748B", fontWeight: 600 }}>{b.card}</span>
                          <span style={{ fontSize: 9, color: "#9CA3AF" }}>· {b.id}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", lineHeight: 1.4, marginBottom: 5 }}>
                          {b.title}
                        </div>
                        <div style={{ fontSize: 10.5, color: "#64748B" }}>
                          연 {fmt(b.annualVolume)}회 · 월 {fmt(b.monthlyVolume)}회
                        </div>
                      </div>
                      <button
                        onClick={() => removeBookmark(b.id)}
                        style={{
                          padding: "4px 8px", borderRadius: 6,
                          border: "none", background: "transparent",
                          color: "#9CA3AF", fontSize: 11, fontWeight: 600,
                          cursor: "pointer",
                        }}
                        title="북마크 삭제"
                      >✕</button>
                    </div>

                    {/* 생성된 AI 아이디어 미리보기 */}
                    {ideas && (
                      <div style={{
                        marginTop: 12, paddingTop: 12,
                        borderTop: "1px dashed #F3F4F6",
                      }}>
                        {ideas[0]?.error ? (
                          <div style={{
                            fontSize: 11, color: "#B91C1C",
                            padding: "8px 10px", borderRadius: 6,
                            background: "#FEF2F2", border: "1px solid #FECACA",
                          }}>
                            ⚠️ {ideas[0].error}
                          </div>
                        ) : (
                          <>
                            <div style={{ fontSize: 11, fontWeight: 800, color: "#C2410C", marginBottom: 8 }}>
                              🎬 AI 아이디어 {ideas.length}개
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              {ideas.slice(0, 2).map((idea, i) => (
                                <div key={i} style={{
                                  padding: "8px 10px", borderRadius: 8,
                                  background: "#FFF7ED", border: "1px solid #FED7AA",
                                }}>
                                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7C2D12", marginBottom: 3, lineHeight: 1.4 }}>
                                    {idea.title}
                                  </div>
                                  {idea.openingHook && (
                                    <div style={{ fontSize: 10, color: "#9A3412", fontStyle: "italic", lineHeight: 1.5 }}>
                                      "{idea.openingHook}"
                                    </div>
                                  )}
                                </div>
                              ))}
                              {ideas.length > 2 && (
                                <div style={{ fontSize: 10, color: "#9A3412", textAlign: "center" }}>
                                  외 {ideas.length - 2}개
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
