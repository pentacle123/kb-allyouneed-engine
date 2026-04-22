/**
 * 월별 검색 트렌드 자동 생성 유틸
 * lib/generateMonthlyTrend.js
 * 
 * 사용법:
 * import { generateMonthlyTrend } from '@/lib/generateMonthlyTrend';
 * 
 * const trend = generateMonthlyTrend(35000, { type: 'yearstart_peak' });
 * // [7292, 5833, 5250, 2042, 1750, 1750, 1458, 1458, 2042, 2333, 2625, 4083]
 */

const SEASONALITY_PATTERNS = {
  // 연중 안정적 (기본값)
  flat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  
  // 1-3월 피크 (연말정산·카드 교체·신년 결심·영유 등록)
  yearstart_peak: [2.5, 2.0, 1.8, 0.7, 0.6, 0.6, 0.5, 0.5, 0.7, 0.8, 0.9, 1.4],
  
  // 6·12월 피크 (자동차세 1·6·12월)
  semi_annual: [2.8, 0.7, 0.7, 0.6, 0.6, 1.8, 0.7, 0.7, 0.6, 0.6, 0.7, 2.5],
  
  // 11-12월 피크 (재수학원·타이어 교체·연말 결산)
  yearend_peak: [0.8, 0.9, 0.9, 0.8, 0.8, 0.7, 0.7, 0.8, 0.9, 1.2, 2.5, 2.0],
  
  // 3·9월 피크 (신학기 - 학원·유치원·자녀용품)
  school_semester: [0.9, 1.5, 2.5, 0.9, 0.8, 0.7, 0.6, 1.0, 2.2, 1.0, 0.9, 1.0],
  
  // 여름 피크 (냉방비·여행·여름 앞 다이어트)
  summer_peak: [0.7, 0.6, 0.7, 0.8, 1.2, 1.6, 2.2, 2.1, 1.3, 0.9, 0.8, 0.9],
  
  // 겨울 피크 (난방비·겨울 타이어·연말 가족 외식)
  winter_peak: [1.8, 1.5, 1.0, 0.7, 0.6, 0.6, 0.7, 0.7, 0.8, 1.0, 1.3, 1.9],
  
  // 2-4월 피크 (신차 출고 시즌)
  spring_car: [1.1, 1.8, 2.2, 1.6, 1.0, 0.7, 0.6, 0.6, 0.7, 0.8, 0.9, 1.0],
  
  // 하락 추세 (매월 15% 씩)
  declining: [1.6, 1.4, 1.3, 1.1, 1.0, 1.0, 0.9, 0.9, 0.8, 0.7, 0.7, 0.6],
  
  // 상승 추세 (Claude Pro +2,050%, AI 교육 +49% 등 폭증 카테고리)
  surging: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0, 1.2, 1.4, 1.6, 1.9, 2.2],
  
  // 급등 (신규 출시·트렌드 폭발)
  explosive: [0.1, 0.2, 0.3, 0.5, 0.8, 1.2, 1.6, 2.0, 2.2, 1.7, 1.3, 1.1],
  
  // 주기성 (계절별 반복, 유튜브·OTT 구독 등)
  cyclical: [1.2, 1.0, 0.9, 0.9, 1.0, 1.1, 1.3, 1.2, 1.0, 0.9, 1.0, 1.5],
  
  // 월초 피크 (급여일·자동결제)
  month_start: [1.3, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.3]
};

/**
 * 기회의 annualVolume과 seasonality 타입을 기반으로 월별 분포 생성
 * 
 * @param {number} annualVolume - 연간 검색량
 * @param {Object} seasonality - { type: string, peakMonths?: number[], description?: string }
 * @returns {number[]} 12개월 검색량 배열 (1월 → 12월)
 */
export function generateMonthlyTrend(annualVolume, seasonality = { type: 'flat' }) {
  const pattern = SEASONALITY_PATTERNS[seasonality.type] || SEASONALITY_PATTERNS.flat;
  
  // 패턴의 합이 12가 되도록 정규화 (평균이 1.0이 되도록)
  const sum = pattern.reduce((a, b) => a + b, 0);
  const normalizedPattern = pattern.map(v => v * 12 / sum);
  
  const base = annualVolume / 12;
  return normalizedPattern.map(m => Math.round(base * m));
}

/**
 * 사용 가능한 seasonality 타입 목록
 */
export const SEASONALITY_TYPES = Object.keys(SEASONALITY_PATTERNS);

/**
 * seasonality 타입별 설명
 */
export const SEASONALITY_DESCRIPTIONS = {
  flat: "연중 안정적",
  yearstart_peak: "1-3월 피크 (연말정산·신년 결심·신학기 준비)",
  semi_annual: "1·6·12월 피크 (자동차세 등 반기 결제)",
  yearend_peak: "11-12월 피크 (재수학원·연말 교체·겨울 준비)",
  school_semester: "3·9월 피크 (신학기 등록 시즌)",
  summer_peak: "여름 피크 (냉방·여행·다이어트)",
  winter_peak: "겨울 피크 (난방·타이어·연말 행사)",
  spring_car: "2-4월 피크 (신차 출고 시즌)",
  declining: "하락 추세",
  surging: "상승 추세 (Claude Pro·AI 교육 등)",
  explosive: "급등 (신규 출시·트렌드 폭발)",
  cyclical: "주기성 (OTT·구독)",
  month_start: "월초 피크 (급여일·자동결제)"
};

/**
 * 기회 ID → 추천 seasonality 타입 매핑
 * (72개 기회에 일괄 적용할 때 참조)
 */
export const OPPORTUNITY_SEASONALITY_MAP = {
  // ========== ALL 카드 ==========
  "P1-2": { type: "flat", description: "실적 계산 피로 연중 균등" },
  "P1-3": { type: "flat", description: "상테크 졸업 연중 균등" },
  "P1-4": { type: "flat", description: "서브카드 검색 연중" },
  "P1-5": { type: "yearstart_peak", description: "2026 카드 추천 1-3월 피크" },
  "P1-6": { type: "flat", description: "고소비자 카드 연중" },
  
  "P2-1": { type: "flat", description: "네이버플러스 자동결제 매월 고정" },
  "P2-2": { type: "flat", description: "쿠팡와우 자동결제 고정" },
  "P2-3": { type: "flat", description: "컬리·요기패스 월 고정" },
  "P2-4": { type: "flat", description: "이중 할인 구조 연중" },
  "P2-5": { type: "yearstart_peak", description: "연초 자동납부 정리기" },
  
  "P3-1": { type: "flat", description: "유튜브 프리미엄 구독 연중" },
  "P3-2": { type: "surging", description: "VPN 단속 이후 공식 전환 증가" },
  "P3-3": { type: "surging", description: "넷플릭스 가격 인상 +286%" },
  "P3-4": { type: "cyclical", description: "OTT 갱신 주기" },
  "P3-5": { type: "explosive", description: "유튜브 프리미엄 라이트 신출시" },
  "P3-6": { type: "yearstart_peak", description: "구독료 다이어트 연초" },
  
  "P4-1": { type: "surging", description: "AI 구독 +733% 폭증" },
  "P4-2": { type: "explosive", description: "Claude Pro +2,050%" },
  "P4-3": { type: "cyclical", description: "알리 대형 세일기 (1111·618·블프)" },
  "P4-4": { type: "cyclical", description: "직구 세일기 주기성" },
  "P4-5": { type: "summer_peak", description: "여행 시즌 + 일상 해외 결제" },
  "P4-6": { type: "surging", description: "개발자 AI 스택 확산" },
  
  "P5-1": { type: "yearstart_peak", description: "연말정산 1월 10배 피크" },
  "P5-2": { type: "school_semester", description: "3·9월 신학기 청소년 카드 발급" },
  "P5-3": { type: "school_semester", description: "초등 입학 신학기" },
  "P5-4": { type: "yearstart_peak", description: "신혼 재테크 연초" },
  "P5-5": { type: "school_semester", description: "가족카드 재발급 3·9월" },
  
  // ========== NEED AutoSlim ==========
  "AUTOSLIM-COVER-A1-1": { type: "spring_car", description: "2-4월 신차 출고 피크" },
  "AUTOSLIM-COVER-A2-1": { type: "flat", description: "주유·정비 연중 안정" },
  "AUTOSLIM-COVER-A3-1": { type: "semi_annual", description: "여름·겨울 앞 정비" },
  "AUTOSLIM-COVER-A4-1": { type: "flat", description: "LPG 충전 연중" },
  "AUTOSLIM-ACCENT-1": { type: "spring_car", description: "신차 구매 전 정보 탐색" },
  "AUTOSLIM-ACCENT-2": { type: "semi_annual", description: "자동차세 1·6·12월" },
  "AUTOSLIM-ACCENT-3": { type: "spring_car", description: "신차 견적 2-4월" },
  "AUTOSLIM-ACCENT-4": { type: "spring_car", description: "신차 출고 직후" },
  "AUTOSLIM-ACCENT-5": { type: "winter_peak", description: "겨울 타이어 11-12월" },
  
  // ========== NEED Pay ==========
  "PAY-COVER-P1-1": { type: "flat", description: "네이버 일상 결제" },
  "PAY-COVER-P2-1": { type: "yearstart_peak", description: "연초 구독 다이어트" },
  "PAY-COVER-P3-1": { type: "cyclical", description: "MZ 쇼핑 세일 주기" },
  "PAY-COVER-P4-1": { type: "flat", description: "페이 일상 결제" },
  "PAY-ACCENT-1": { type: "flat", description: "페이 선택 피로 연중" },
  "PAY-ACCENT-2": { type: "yearstart_peak", description: "연초 카드 정리기" },
  "PAY-ACCENT-3": { type: "flat", description: "네이버플러스 업그레이드 연중" },
  "PAY-ACCENT-4": { type: "surging", description: "토스페이 +31% 성장" },
  "PAY-ACCENT-5": { type: "flat", description: "배달·새벽배송 정기" },
  
  // ========== NEED Edu ==========
  "EDU-COVER-K1-1": { type: "school_semester", description: "영유 2-3월 등록 피크" },
  "EDU-COVER-K2-1": { type: "school_semester", description: "예체능 3·9월 등록" },
  "EDU-COVER-K3-1": { type: "yearend_peak", description: "재수학원 11-12월 피크" },
  "EDU-COVER-A1-1": { type: "yearstart_peak", description: "토익 1-3월·9-11월" },
  "EDU-COVER-A2-1": { type: "surging", description: "AI 교육 +49% 폭증" },
  "EDU-COVER-A3-1": { type: "yearstart_peak", description: "공시·자격증 연초 결심" },
  "EDU-ACCENT-1": { type: "school_semester", description: "학원가 정보 2-3월" },
  "EDU-ACCENT-2": { type: "yearstart_peak", description: "성인 취미 연초" },
  "EDU-ACCENT-3": { type: "yearend_peak", description: "수능 후 11-12월" },
  "EDU-ACCENT-4": { type: "yearstart_peak", description: "화상영어 1-3월" },
  
  // ========== YOU Prime 가족팩 ==========
  "FAMILY-COVER-1-1": { type: "flat", description: "맞벌이 일상 아웃소싱" },
  "FAMILY-COVER-2-1": { type: "yearstart_peak", description: "가계 통합 연초" },
  "FAMILY-COVER-3-1": { type: "school_semester", description: "학령기 신학기" },
  "FAMILY-COVER-4-1": { type: "flat", description: "새벽배송 주간 고정" },
  "FAMILY-ACCENT-1": { type: "summer_peak", description: "여름 냉방비 피크" }, // or winter_peak
  "FAMILY-ACCENT-2": { type: "flat", description: "어린이보험 가입 연중" },
  "FAMILY-ACCENT-3": { type: "surging", description: "쿠팡 로켓프레시 +117%" },
  "FAMILY-ACCENT-4": { type: "cyclical", description: "코스트코 월 1-2회" },
  "FAMILY-ACCENT-5": { type: "surging", description: "세탁·청소 아웃소싱 +20%+" },
  
  // ========== YOU Prime 일상팩 ==========
  "DAILY-COVER-1-1": { type: "summer_peak", description: "주말 차박·드라이브 여름" },
  "DAILY-COVER-2-1": { type: "yearstart_peak", description: "필라테스 1월·9월 결심" },
  "DAILY-COVER-3-1": { type: "surging", description: "재택근무 2026.3 역대 최대" },
  "DAILY-COVER-4-1": { type: "flat", description: "반려동물 매월 고정" },
  "DAILY-ACCENT-1": { type: "surging", description: "전기차 확산 +25%" },
  "DAILY-ACCENT-2": { type: "flat", description: "배달 매주 루틴" },
  "DAILY-ACCENT-3": { type: "summer_peak", description: "다이어트 식단 5-7월" },

  // ========== Phase 8-1 신규 기회 ==========
  "P1-7": { type: "school_semester", description: "이사·신학기 2-3월·9월 피크" },
  "P3-7": { type: "yearend_peak", description: "연말·연초 구독 점검기" },
  "P5-6": { type: "flat", description: "부모 돌봄 연중 안정" },
  "DAILY-COVER-5": { type: "flat", description: "하이퍼로컬 연중, 점심·저녁 시간대 피크" },
  "FAMILY-COVER-5": { type: "flat", description: "반려동물 월 고정 지출" },
  "FAMILY-COVER-6": { type: "flat", description: "맞벌이 루틴 연중 안정" },
  "PAY-COVER-P5": { type: "yearstart_peak", description: "12-1월 해외여행 성수기" }
};

/**
 * 모든 opportunity에 자동으로 monthlyTrend 주입하는 헬퍼
 * 
 * @example
 * import { enrichWithMonthlyTrend } from '@/lib/generateMonthlyTrend';
 * const enrichedOpportunities = enrichWithMonthlyTrend(ALL_CARD_OPPORTUNITIES);
 */
export function enrichWithMonthlyTrend(opportunities) {
  return opportunities.map(opp => ({
    ...opp,
    monthlyTrend: opp.monthlyTrend || generateMonthlyTrend(
      opp.annualVolume,
      OPPORTUNITY_SEASONALITY_MAP[opp.id] || { type: 'flat' }
    ),
    seasonality: opp.seasonality || OPPORTUNITY_SEASONALITY_MAP[opp.id] || { 
      type: 'flat', 
      description: '연중 안정' 
    }
  }));
}

export default generateMonthlyTrend;
