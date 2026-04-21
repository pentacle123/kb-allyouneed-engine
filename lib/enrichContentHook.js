/**
 * Content Hook Enrichment Utility
 * 각 opportunity에 algorithmSignal + contentHookEvidence 필드를 자동 생성.
 * 이미 해당 필드가 있으면 그대로 유지.
 */

// ── 알고리즘 시그널 자동 생성 ──
function generateAlgorithmSignal(opp) {
  const signals = [];

  // 1) 페인포인트 → 공감 알고리즘
  if (opp.painPoints && opp.painPoints.length > 0) {
    signals.push(`페인포인트 "${opp.painPoints[0]}" → 공감 알고리즘 자극 (내 얘기잖아 반응)`);
  }

  // 2) 시즌성 → 추천 알고리즘
  const seasonalityType = opp.seasonality?.type;
  if (seasonalityType === "surging" || seasonalityType === "explosive") {
    signals.push("상승 트렌드 카테고리 = 추천 알고리즘 풀 확장 중");
  } else if (seasonalityType === "yearstart_peak") {
    signals.push("1-3월 피크 = 연초 검색 급증 타이밍 진입 유리");
  } else if (seasonalityType === "yearend_peak") {
    signals.push("11-12월 피크 = 연말 의사결정 시점 노출 유리");
  } else if (seasonalityType === "school_semester") {
    signals.push("신학기 피크 = 3·9월 학부모 유입 집중");
  } else if (seasonalityType === "winter_peak" || seasonalityType === "summer_peak") {
    signals.push("계절 피크 = 시즌 연동 추천 가능");
  } else if (seasonalityType === "semi_annual") {
    signals.push("반기 피크 = 1·6·12월 고정 수요 확보");
  } else if (seasonalityType === "spring_car") {
    signals.push("2-4월 신차 피크 = 자동차 구매 의사결정 시즌");
  }

  // 3) 규모 티어 → 풀 크기
  if (opp.tier === "MEGA") {
    signals.push("MEGA 규모(연 100만+) = 알고리즘 풀 최상위");
  } else if (opp.tier === "LARGE") {
    signals.push("LARGE 규모(연 10만+) = 충분한 타겟 풀");
  }

  // 4) PathFinder 마지막 단계 = 전환 임박
  if (opp.pathFinder && opp.pathFinder.length >= 3) {
    signals.push(`검색 여정 종착지 포지션 (${opp.pathFinder[opp.pathFinder.length - 1]}) → 전환 임박 소비자`);
  }

  return signals.length > 0
    ? signals.join(" · ")
    : "검색 여정의 종착지 포지셔닝으로 알고리즘 추천 대상 확보";
}

// ── DATA EVIDENCE 자동 생성 ──
function generateHookEvidence(opp) {
  const parts = [];

  // 1) 상위 3개 키워드
  if (opp.relatedKeywords && opp.relatedKeywords.length > 0) {
    const kw = opp.relatedKeywords
      .slice(0, 3)
      .map(k => {
        const trendStr = k.trend ? ` (${k.trend > 0 ? "+" : ""}${(k.trend * 100).toFixed(0)}%)` : "";
        return `${k.term} 연 ${k.volume.toLocaleString()}회${trendStr}`;
      })
      .join(" · ");
    parts.push(kw);
  }

  // 2) 페르소나 인구 규모
  if (opp.annualVolume) {
    parts.push(`타겟 연간 검색 ${opp.annualVolume.toLocaleString()}회`);
  }

  // 3) 인구통계 (who.dataEvidence)
  if (opp.who?.dataEvidence) {
    parts.push(opp.who.dataEvidence);
  }

  return parts.length > 0
    ? parts.join(" | ")
    : `연간 ${(opp.annualVolume || 0).toLocaleString()}회 검색 시장 기반`;
}

// ── 단일 opportunity enrich ──
export function enrichContentHook(opp) {
  return {
    ...opp,
    algorithmSignal: opp.algorithmSignal || generateAlgorithmSignal(opp),
    contentHookEvidence: opp.contentHookEvidence || generateHookEvidence(opp),
  };
}

// ── 배열 일괄 enrich ──
export function enrichAll(opportunities) {
  return opportunities.map(enrichContentHook);
}
