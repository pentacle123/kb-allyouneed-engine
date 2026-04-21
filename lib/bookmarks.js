/**
 * 기회 북마크 유틸 — localStorage 기반
 * 추후 Supabase 연동 시 서버 저장으로 전환 가능
 */

const STORAGE_KEY = "kb-ayn-bookmarks";

export function getBookmarks() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function isBookmarked(opportunityId) {
  return getBookmarks().some(b => b.id === opportunityId);
}

export function addBookmark(opportunity) {
  if (typeof window === "undefined") return;
  const bookmarks = getBookmarks();
  if (bookmarks.some(b => b.id === opportunity.id)) return;

  bookmarks.push({
    id: opportunity.id,
    title: opportunity.title,
    card: opportunity.card,
    hookType: opportunity.hookType,
    tier: opportunity.tier,
    annualVolume: opportunity.annualVolume || opportunity.annualVol || 0,
    monthlyVolume: opportunity.monthlyVolume || opportunity.monthlyVol || 0,
    icon: opportunity.icon,
    personaId: opportunity.personaId,
    savedAt: new Date().toISOString(),
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  window.dispatchEvent(new CustomEvent("bookmarks-updated"));
}

export function removeBookmark(opportunityId) {
  if (typeof window === "undefined") return;
  const bookmarks = getBookmarks().filter(b => b.id !== opportunityId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  window.dispatchEvent(new CustomEvent("bookmarks-updated"));
}

export function clearBookmarks() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("bookmarks-updated"));
}

// 전체 opportunity 데이터에서 북마크 ID로 완전한 객체 찾기
export function hydrateBookmarks(allOpportunities) {
  const bookmarks = getBookmarks();
  return bookmarks.map(b => {
    const full = allOpportunities.find(o => o.id === b.id);
    return full ? { ...full, savedAt: b.savedAt } : b;
  });
}
