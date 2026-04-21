/**
 * 카니발라이제이션 감지 유틸
 * 같은 키워드가 여러 카드에 매핑되어 있는지 감지 + 우선순위 추천
 */

import { allCardData } from "../app/data/allCardData";
import { youPrimeDailyData } from "../app/data/youPrimeDailyData";
import { youPrimeFamilyData } from "../app/data/youPrimeFamilyData";
import { needEduData } from "../app/data/needEduData";
import { needPayData } from "../app/data/needPayData";
import { needAutoSlimData } from "../app/data/needAutoSlimData";

const ALL_DATA = [
  allCardData,
  youPrimeDailyData,
  youPrimeFamilyData,
  needEduData,
  needPayData,
  needAutoSlimData,
];

const TIER_WEIGHT = { MEGA: 4, LARGE: 3, MEDIUM: 2, NICHE: 1 };

// 너무 일반적인 용어는 노이즈이므로 매칭에서 제외
const STOPWORDS = new Set([
  "카드", "할인", "추천", "비교", "가격", "후기",
  "ALL 카드", "NEED Pay", "NEED AutoSlim", "NEED Edu",
  "YOU Prime", "YOU Prime 일상팩", "YOU Prime 가족팩",
]);

function normalize(term) {
  if (!term) return "";
  return String(term).trim().toLowerCase();
}

function buildKeywordIndex() {
  const index = new Map();

  ALL_DATA.forEach(dataFile => {
    if (!dataFile || !dataFile.opportunities) return;
    dataFile.opportunities.forEach(opp => {
      const allTerms = [
        ...(opp.relatedKeywords?.map(k => k.term) || []),
        ...(opp.cluster || []),
        ...(opp.pathFinder || []),
      ];

      allTerms.forEach(term => {
        const normalized = normalize(term);
        if (!normalized) return;
        if (STOPWORDS.has(term) || STOPWORDS.has(normalized)) return;

        if (!index.has(normalized)) index.set(normalized, []);
        const entry = {
          card: dataFile.meta?.cardName || opp.card || "Unknown",
          cardId: dataFile.meta?.cardId || "",
          oppId: opp.id,
          oppTitle: opp.title,
          tier: opp.tier,
          volume: opp.annualVolume || 0,
          term, // 원본 term
        };
        // 동일 opp에 대해 중복 term이 여러 필드에 있으면 1회만
        const arr = index.get(normalized);
        if (!arr.some(e => e.oppId === entry.oppId)) {
          arr.push(entry);
        }
      });
    });
  });

  return index;
}

let cachedIndex = null;
function getIndex() {
  if (!cachedIndex) cachedIndex = buildKeywordIndex();
  return cachedIndex;
}

function pickBestCard(candidates) {
  return [...candidates].sort((a, b) => {
    const tierDiff = (TIER_WEIGHT[b.tier] || 0) - (TIER_WEIGHT[a.tier] || 0);
    if (tierDiff !== 0) return tierDiff;
    return (b.volume || 0) - (a.volume || 0);
  })[0];
}

/**
 * 특정 기회에서 타 카드와 겹치는 키워드 탐지.
 * @returns [{ term, conflicts: [...], recommendation }]
 */
export function detectCannibalization(opportunity) {
  if (!opportunity) return [];
  const index = getIndex();
  const warnings = [];
  const seen = new Set();

  const myTerms = [
    ...(opportunity.relatedKeywords?.map(k => k.term) || []),
    ...(opportunity.cluster || []),
  ];

  myTerms.forEach(term => {
    const normalized = normalize(term);
    if (!normalized || seen.has(normalized)) return;
    if (STOPWORDS.has(term) || STOPWORDS.has(normalized)) return;
    seen.add(normalized);

    const matches = index.get(normalized) || [];
    const conflicts = matches.filter(m =>
      m.oppId !== opportunity.id && m.card !== opportunity.card
    );

    if (conflicts.length > 0) {
      const myEntry = {
        card: opportunity.card,
        oppId: opportunity.id,
        oppTitle: opportunity.title,
        tier: opportunity.tier,
        volume: opportunity.annualVolume || 0,
      };
      warnings.push({
        term,
        conflicts,
        recommendation: pickBestCard([myEntry, ...conflicts]),
      });
    }
  });

  return warnings;
}

/**
 * 전체 중복 맵 반환 (관리자 대시보드용).
 * @returns [{ term, cardCount, matches, recommendation }]
 */
export function getGlobalCannibalizationMap() {
  const index = getIndex();
  const conflicts = [];

  for (const [term, matches] of index.entries()) {
    const uniqueCards = new Set(matches.map(m => m.cardId || m.card));
    if (uniqueCards.size > 1) {
      conflicts.push({
        term: matches[0].term || term,
        cardCount: uniqueCards.size,
        matches,
        recommendation: pickBestCard(matches),
      });
    }
  }

  return conflicts.sort((a, b) => {
    if (b.cardCount !== a.cardCount) return b.cardCount - a.cardCount;
    return b.matches.length - a.matches.length;
  });
}
