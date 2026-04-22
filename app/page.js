"use client";

import React, { useState, useEffect } from "react";
import { addBookmark, removeBookmark, isBookmarked, getBookmarks } from "../lib/bookmarks";
import {
  ALL_CARD_USPS,
  ALL_CARD_PERSONAS,
  ALL_CARD_OPPORTUNITIES,
  getOpportunitiesByPersona,
  getOpportunityById,
  getPersonaById,
  getTotalAnnualVolume,
  getOpportunityCount,
} from "./data/allCardData";
import * as autoslim from "./data/needAutoSlimData";
import * as needpay from "./data/needPayData";
import * as neededu from "./data/needEduData";
import * as youfamily from "./data/youPrimeFamilyData";
import * as youdaily from "./data/youPrimeDailyData";
import { generateMonthlyTrend } from "../lib/generateMonthlyTrend";
import { enrichContentHook } from "../lib/enrichContentHook";
import { detectCannibalization } from "../lib/cannibalization";

// ══════════════════════════════════════════════════════════════
// KB ALL·YOU·NEED AI Brandformance Engine v3.0
// 5-stage Navigation: Hub → Category → Analysis → Ideas → Storyboard
// ══════════════════════════════════════════════════════════════

const C = {
  bg: "#F5F7FA", card: "#FFFFFF", surface: "#F8FAFC",
  border: "#E2E8F0",
  text: "#1E293B", textSoft: "#64748B",
  accent: "#10B981", warn: "#EF4444",
};

const CARDS = {
  ALL:  { name: "ALL",           color: "#2563EB", tagline: "고민없이 받는 혜택", emoji: "💳" },
  YOU:  { name: "YOU Prime",     color: "#7C3AED", tagline: "나에게 딱 맞춘 혜택", emoji: "👤" },
  PAY:  { name: "NEED Pay",      color: "#059669", tagline: "간편결제 집중 혜택", emoji: "📱" },
  AUTO: { name: "NEED Autoslim", color: "#D97706", tagline: "자동차 집중 혜택",   emoji: "🚗" },
  EDU:  { name: "NEED Edu",      color: "#DC2626", tagline: "교육 집중 혜택",     emoji: "📚" },
};

const LEVEL_COLORS = { MEGA: "#2563EB", LARGE: "#10B981", MEDIUM: "#F59E0B", NICHE: "#8B5CF6" };

// ── format ──
const fmt = (n) => typeof n === "number" ? n.toLocaleString("ko-KR") : n;

// ══════════════════════════════════════════════════════════════
// DATA: 32 Opportunities
// ══════════════════════════════════════════════════════════════

const OPPS = [
  // ─────────── A. ALL 카드 ───────────
  {
    id: "all-1", category: "all", subgroup: "USP에서 출발한 기회", card: "ALL", level: "MEGA",
    icon: "🛒", title: "쿠팡·네이버 멤버십을 반값에 유지하고 싶은 사람",
    usp: "쇼핑 멤버십 50%",
    hookType: "Value-hook", hookLabel: "멤버십 반값 유지",
    strategyCopy: "쿠팡 와우(7,890) + 네이버플러스(4,900) = 월 12,790원. 50% 할인으로 연 76,740원 절약. 연회비 대비 3.8배 이득.",
    monthlyVol: 20350000, annualVol: 244200000,
    peakMonths: [75, 70, 65, 60, 65, 60, 70, 75, 65, 80, 90, 100], peakSeason: "연말 11-1월",
    demographics: "여 57% · 30대 34%, 40대 28%",
    keyInsight: "쿠팡 와우 회원 약 1,400만 명. 해지 검색보다 '싸게 유지' 검색이 4배 많음.",
    pathJourney: ["쿠팡 와우 가격", "쿠팡 와우 해지", "멤버십 할인카드", "카드 추천", "카드 발급"],
    pathInsight: "가격 확인 → 해지 고민 → 할인 탐색 → 카드 발견. '해지'보다 '유지'가 4배.",
    clusterInsight: "쿠팡 클러스터에서 '와우 멤버십'과 '가격'이 양대 허브. 할인카드 노드는 아직 약함 = 침투 기회.",
    topKeywords: [
      { keyword: "쿠팡", vol: 19140266 },
      { keyword: "네이버플러스 멤버십", vol: 181000 },
      { keyword: "쿠팡 멤버십 가격", vol: 3986 },
      { keyword: "네이버플러스 해지", vol: 736 },
      { keyword: "멤버십 할인카드", vol: 2200 },
    ],
    contentHook: "쿠팡 와우 7,890원, 반값으로 유지하는 법이 있다면?",
    dataProof: "쿠팡 월 1,914만, 네이버플러스 월 18.1만. 와우 해지(736) vs 싸게 유지(43,700) = 4배.",
    painPoints: ["멤버십비가 아깝다", "해지하자니 아쉽고 유지하자니 부담", "할인받을 방법을 모르겠다"],
    uspConnection: "ALL 카드 쇼핑멤버십 50% 할인 (네이버플러스 + 쿠팡 와우 자동납부)",
    context: {
      who:   { tags: ["쿠팡 와우 회원", "네이버 쇼핑 이용자", "30-40대 여성"], evidence: "쿠팡 와우 약 1,400만 회원. 여성 57%, 30대 34%, 40대 28%." },
      what:  { tags: ["멤버십 비용 절감", "해지 방지", "통합 할인"], evidence: "멤버십 가격 검색 4,722/월. '해지'(736)보다 '싸게 유지'(43,700)가 4배." },
      when:  { tags: ["멤버십 갱신 시점", "가격 인상 직후", "연말 결산"], evidence: "쿠팡 와우 가격 인상 시 검색 폭발(+6,620%). 연말 카드 정리 시즌." },
      where: { tags: ["쿠팡 앱", "네이버 쇼핑", "카드고릴라"], evidence: "멤버십 해지 페이지, 카드 비교 사이트가 핵심 접점." },
      why:   { tags: ["비용 절감", "혜택 유지", "가성비"], evidence: "50% 할인 시 연 76,740원 절약. 연회비 2만원 대비 3.8배." },
      how:   { tags: ["멤버십 반값 계산", "해지 전 체크리스트", "통합 절약 시뮬레이터"], evidence: "통합 절약(와우+네이버+OTT+통신) 메시지를 하는 카드사가 현재 없음." },
    },
    shortformIdeas: ["쿠팡 와우 반값으로 유지하는 법", "멤버십 해지 전에 이것만 확인해봐", "네이버플러스 50% 할인, 진짜 되나?"],
  },
  {
    id: "all-2", category: "all", subgroup: "USP에서 출발한 기회", card: "ALL", level: "MEGA",
    icon: "🎬", title: "넷플릭스 해지 직전, \"싸게 유지\"를 원하는 사람",
    usp: "OTT 10%",
    hookType: "Retention-hook", hookLabel: "해지 직전 침투",
    strategyCopy: "'해지' 검색(10,500)보다 '싸게 유지'(43,700)가 4배 많은 시장. ALL 카드는 \"해지하지 않아도 되는 이유\".",
    monthlyVol: 9900000, annualVol: 118800000,
    peakMonths: [70, 65, 60, 55, 60, 65, 70, 75, 70, 80, 85, 90], peakSeason: "연말 11-12월",
    demographics: "30-40대 남녀, 40대 27%",
    keyInsight: "해지 버튼 직전의 순간이 최적 침투 타이밍.",
    pathJourney: ["넷플릭스 가격 확인", "유튜브 프리미엄 싸게", "OTT 해지 방법", "할인카드 검색", "카드 발급"],
    pathInsight: "가격 확인 → 싸게 유지 방법 → 해지 고민 → 할인카드 발견.",
    clusterInsight: "OTT 클러스터에서 '싸게 보는 법'과 '해지'가 분리된 두 허브. 할인카드는 '싸게 보는 법' 쪽에만 연결.",
    topKeywords: [
      { keyword: "넷플릭스", vol: 6800000 },
      { keyword: "유튜브 프리미엄", vol: 2100000 },
      { keyword: "티빙", vol: 580000 },
      { keyword: "넷플릭스 해지", vol: 10500 },
      { keyword: "유튜브 프리미엄 싸게", vol: 40273 },
    ],
    contentHook: "넷플릭스 해지 버튼 누르기 전에 딱 이것만 확인해봐",
    dataProof: "넷플릭스 월 680만, 유튜브 프리미엄 월 210만. 해지 10,500 vs 싸게 유지 43,700 = 4배.",
    painPoints: ["구독료가 계속 오른다", "해지하기엔 아쉽다", "어떻게 싸게 볼지 모르겠다"],
    uspConnection: "ALL 카드 OTT 10% 할인 (자동납부)",
    context: {
      who:   { tags: ["OTT 3개+ 구독자", "30-40대 남녀", "해지 고민층"], evidence: "넷플릭스 680만, 유튜브 프리미엄 210만 규모. 40대 27%." },
      what:  { tags: ["OTT 구독료 절감", "해지하지 않고 싸게", "여러 OTT 동시 할인"], evidence: "'싸게 유지' 검색이 '해지' 검색의 4배." },
      when:  { tags: ["월말 결제일 직전", "가격 인상 뉴스 직후", "연말 구독 정리"], evidence: "넷플릭스 가격 인상 뉴스 시 '해지' 검색 급증." },
      where: { tags: ["넷플릭스 계정 페이지", "유튜브 프리미엄 해지 페이지", "OTT 가격 비교 블로그"], evidence: "해지 페이지가 핵심 접점." },
      why:   { tags: ["돈 아까움", "혜택 유지", "자동 할인"], evidence: "OTT 4개 기준 월 5만원+. 10% 할인 시 연 6만원 절약." },
      how:   { tags: ["해지 직전 구출 콘텐츠", "OTT 통합 절약 시뮬레이터", "싸게 유지 가이드"], evidence: "해지 페이지 직전 타겟팅 = 전환 임박 소비자." },
    },
    shortformIdeas: ["넷플릭스 해지 전에 이 카드 확인해봐", "유튜브 프리미엄 싸게 보는 진짜 방법", "OTT 5개 구독 중인데 얼마 아낄 수 있을까"],
  },
  {
    id: "all-3", category: "all", subgroup: "USP에서 출발한 기회", card: "ALL", level: "LARGE",
    icon: "✈️", title: "트래블카드 말고 365일 쓰는 해외 카드가 필요한 사람",
    usp: "해외 이용 2%",
    hookType: "Positioning-hook", hookLabel: "트래블카드 대안",
    strategyCopy: "트래블카드가 해외카드 시장을 점령. '365일 쓰다가 여행 갈 때도 좋은 카드'라는 포지셔닝은 아무도 안 함.",
    monthlyVol: 1070000, annualVol: 12840000,
    peakMonths: [80, 70, 65, 70, 75, 85, 90, 95, 80, 75, 70, 85], peakSeason: "여름·겨울 방학",
    demographics: "여 64% · 30대 37%",
    keyInsight: "트래블카드 vs 365일 카드의 포지셔닝 공백.",
    pathJourney: ["일본 여행 준비물", "해외결제 수수료", "트래블카드 비교", "해외 카드 추천", "카드 발급"],
    pathInsight: "여행 준비 → 결제 카드 고민 → 트래블카드 비교 → 365일 카드 발견.",
    clusterInsight: "해외카드 클러스터는 '트래블카드' 중심. '365일 메인카드'는 빈 노드.",
    topKeywords: [
      { keyword: "일본 여행", vol: 293733 },
      { keyword: "유럽 여행", vol: 45586 },
      { keyword: "해외결제 수수료", vol: 18000 },
      { keyword: "트래블카드 비교", vol: 12000 },
      { keyword: "해외여행 준비물", vol: 68000 },
    ],
    contentHook: "여행 갈 때만 꺼내는 카드 vs 매일 쓰는 카드, 뭐가 이득?",
    dataProof: "일본 여행 29.3만/월, 유럽 여행 4.5만/월. 트래블카드 점유율 높지만 '365일' 포지셔닝은 공백.",
    painPoints: ["여행 때만 카드 하나 더 만들기 귀찮다", "환전 수수료가 아깝다", "어떤 카드가 진짜 이득인지 모르겠다"],
    uspConnection: "ALL 카드 해외 2% 할인 (전 가맹점, VISA)",
    context: {
      who:   { tags: ["여성 64%", "30대 37%", "해외여행 준비자", "해외 직구 이용자"], evidence: "일본 여행 검색 여성 64%. 30대가 37%로 가장 높음." },
      what:  { tags: ["해외 결제 혜택", "365일 메인카드", "환전 없이"], evidence: "해외결제 수수료 월 18,000 검색." },
      when:  { tags: ["여행 3개월 전", "항공권 예약 직후", "출국 1주일 전"], evidence: "여행 3개월 전 카드 발급 검색 급증." },
      where: { tags: ["네이버 여행", "트립어드바이저", "카드고릴라"], evidence: "여행 블로그와 카드 비교 사이트가 접점." },
      why:   { tags: ["통합 혜택", "연회비 대비 가치", "메인카드화"], evidence: "트래블카드는 여행 후 방치. ALL은 365일 혜택." },
      how:   { tags: ["365일 vs 3박4일 비교", "일본 카드 수수료 계산", "트래블 vs 메인 대결"], evidence: "트래블카드 대비 포지셔닝 명확화." },
    },
    shortformIdeas: ["여행 갈 때만 꺼내는 카드 vs 매일 쓰는 카드", "일본 여행 카드 수수료 계산해봤다", "트래블카드 vs 신용카드 해외에서 뭐가 이득?"],
  },
  {
    id: "all-4", category: "all", subgroup: "USP에서 출발한 기회", card: "ALL", level: "MEDIUM",
    icon: "📶", title: "통신비를 줄이고 싶은 40대 가장",
    usp: "이동통신 5%",
    hookType: "Entry-hook", hookLabel: "남성 진입로",
    strategyCopy: "ALL 카드의 유일한 남성 진입로. 가족카드(무료)로 한 가정에 2장 침투 가능.",
    monthlyVol: 300000, annualVol: 3600000,
    peakMonths: [60, 60, 65, 60, 60, 55, 55, 60, 60, 65, 70, 80], peakSeason: "연말 정리 시즌",
    demographics: "남 56% · 40-50대 66%",
    keyInsight: "ALL 카드 모든 자산이 여성 55-70%인데, 통신비만 남성 우세.",
    pathJourney: ["SKT 요금제", "통신비 절약", "가족 결합", "통신비 할인카드", "카드 발급"],
    pathInsight: "요금제 확인 → 절약 방법 → 할인카드 탐색. 가족 단위 진입.",
    clusterInsight: "통신비 클러스터는 '요금제 변경'과 '알뜰폰'이 주류. '카드 할인' 노드는 약함.",
    topKeywords: [
      { keyword: "SKT 요금제", vol: 58000 },
      { keyword: "KT 요금제", vol: 32000 },
      { keyword: "알뜰폰", vol: 21000 },
      { keyword: "통신비 할인", vol: 8500 },
      { keyword: "가족 통신비", vol: 3200 },
    ],
    contentHook: "우리 가족 통신비 월 20만원, 카드로 연 12만원 돌려받는 법",
    dataProof: "SKT 요금제 월 5.8만, KT 3.2만. 남 56%, 40-50대 66%로 남성 진입로.",
    painPoints: ["가족 통신비가 부담", "요금제 바꾸기 귀찮다", "할인 방법을 모르겠다"],
    uspConnection: "ALL 카드 통신 5% (자동납부)",
    context: {
      who:   { tags: ["40-50대 남성", "가장", "가족 통신비 납부자"], evidence: "남 56%, 40-50대 66%. 가장 역할." },
      what:  { tags: ["통신비 절감", "가족 결합", "간편 절약"], evidence: "통신비 할인 8,500/월." },
      when:  { tags: ["요금제 변경 시즌", "연말 가족 정산", "매월 고지서 도착일"], evidence: "통신사 요금제 개편 시 검색 급증." },
      where: { tags: ["통신사 홈페이지", "요금제 비교 사이트", "가족 결합 안내"], evidence: "통신사 앱 내 결제 설정이 접점." },
      why:   { tags: ["가족 전체 할인", "자동이체 편의성", "가족카드 무료"], evidence: "가정당 2장(부부) 침투 가능. 연 12만원+." },
      how:   { tags: ["아빠 카드 하나로 전 가족 통신 할인", "요금제 유지하며 절약", "가족카드 발급법"], evidence: "남성 타겟 '귀찮음 해결' 앵글." },
    },
    shortformIdeas: ["우리 가족 통신비 월 20만원, 카드로 연 12만원 돌려받는 법", "SKT 요금제 바꾸기 귀찮은 사람을 위한 다른 방법", "아빠 카드 하나로 가족 통신비 전부 할인"],
  },
  {
    id: "all-5", category: "all", subgroup: "USP에서 출발한 기회", card: "ALL", level: "MEDIUM",
    icon: "💳", title: "카드 고르다 지쳐서 그냥 다 되는 카드가 필요한 사람",
    usp: "국내 전 가맹점 1%",
    hookType: "Simplicity-hook", hookLabel: "고민 끝",
    strategyCopy: "카드고릴라에서 1시간 비교 vs 그냥 전부 1%. 카드 고르기 자체가 스트레스인 사람에게 '고민 끝' 메시지.",
    monthlyVol: 70000, annualVol: 840000,
    peakMonths: [60, 55, 55, 55, 60, 60, 60, 65, 65, 70, 75, 80], peakSeason: "연말 카드 정리",
    demographics: "여 55% · 25-30대",
    keyInsight: "카드 비교 피로층 = 사회초년생 + 복잡한 혜택 싫어하는 사람.",
    pathJourney: ["신용카드 추천", "카드고릴라", "카드 비교", "캐시백 카드", "카드 발급"],
    pathInsight: "추천 검색 → 비교 사이트 → 피로감 → 단순한 카드 선택.",
    clusterInsight: "카드 추천 클러스터에 '비교'와 '피로'가 공존. '단순함' 소구가 빈 노드.",
    topKeywords: [
      { keyword: "신용카드 추천", vol: 32000 },
      { keyword: "카드고릴라", vol: 15000 },
      { keyword: "첫 카드", vol: 8500 },
      { keyword: "사회초년생 카드", vol: 5200 },
      { keyword: "신용카드 비교", vol: 6800 },
    ],
    contentHook: "카드고릴라 1시간 vs 그냥 전부 1%, 뭐가 이득?",
    dataProof: "신용카드 추천 3.2만/월, 카드고릴라 1.5만/월. 여 55%, 25-30대.",
    painPoints: ["카드 혜택이 너무 복잡하다", "어디서 얼마 할인인지 따지기 싫다", "첫 카드라 뭘 골라야 할지 모른다"],
    uspConnection: "ALL 카드 국내 1% (전 가맹점 자동, 조건 없음)",
    context: {
      who:   { tags: ["사회초년생", "카드 비교 피로층", "25-30대 여성"], evidence: "여 55%, 25-30대. 첫 카드 선택 시점." },
      what:  { tags: ["단순함", "고민 없음", "모든 곳에서"], evidence: "'신용카드 추천' 월 32,000." },
      when:  { tags: ["취업 직후", "첫 월급", "연말 카드 정리"], evidence: "사회초년생 카드 월 5.2K 검색." },
      where: { tags: ["카드고릴라", "디시/뽐뿌", "네이버 카페"], evidence: "비교 사이트와 커뮤니티." },
      why:   { tags: ["복잡함 회피", "확실한 혜택", "어디서나"], evidence: "전 가맹점 무조건 1%. 조건 없음." },
      how:   { tags: ["3분 결정법", "비교 안 하는 카드", "처음 카드 가이드"], evidence: "'고민 끝' 메시지가 피로층에게 강력." },
    },
    shortformIdeas: ["카드고릴라 1시간 vs 그냥 전부 1%, 뭐가 이득?", "사회초년생 첫 카드 3분 결정법", "카드 혜택 따지기 싫은 사람을 위한 카드"],
  },
  // ALL 맥락 3개
  {
    id: "all-6", category: "all", subgroup: "소비자 맥락에서 발견한 기회", card: "ALL", level: "LARGE",
    icon: "🗺️", title: "해외여행 준비 과정에서 \"결제 카드\" 고민하는 순간",
    usp: "여정 침투 · 해외 2%",
    hookType: "Journey-hook", hookLabel: "여행 준비 여정",
    strategyCopy: "항공권 예약 → 숙소 비교 → '해외 결제 카드' 고민. 이 여정 안에 자연스럽게 카드 침투.",
    monthlyVol: 1070000, annualVol: 12840000,
    peakMonths: [80, 70, 65, 70, 75, 85, 90, 95, 80, 75, 70, 85], peakSeason: "여름·겨울 방학",
    demographics: "여 64% · 30대",
    keyInsight: "'여행 갔다 와서도 계속 쓰는 카드'는 아무도 안 함.",
    pathJourney: ["일본 여행 준비물", "항공권 예약", "호텔 비교", "해외 결제 카드", "카드 발급"],
    pathInsight: "여행 준비의 마지막 관문이 '결제 카드'. 이 타이밍에 침투.",
    clusterInsight: "여행 준비 클러스터에서 '카드'는 가장 마지막 노드. 예약 완료 직후가 기회.",
    topKeywords: [
      { keyword: "일본 여행 준비물", vol: 68000 },
      { keyword: "해외여행 필수품", vol: 32000 },
      { keyword: "여행 카드 추천", vol: 12000 },
      { keyword: "해외 결제 카드", vol: 8500 },
      { keyword: "해외여행 환전", vol: 22000 },
    ],
    contentHook: "해외여행 카드 고를 때 진짜 중요한 것",
    dataProof: "일본 여행 준비물 월 6.8만. 여행 준비 여정 200개 경로 중 카드 관련 30개+.",
    painPoints: ["여행 때만 쓰는 카드 추가 발급 귀찮다", "수수료를 얼마나 내는지 모른다", "트래블카드가 정답인지 모른다"],
    uspConnection: "ALL 카드 해외 2% + 국내 1% 통합",
    context: {
      who:   { tags: ["여행 준비자", "30대 여성", "첫 해외여행자"], evidence: "일본 여행 여성 64%, 30대 37%." },
      what:  { tags: ["결제 수단 결정", "수수료 최소화", "편의성"], evidence: "해외결제 수수료 월 18,000." },
      when:  { tags: ["항공권 예약 직후", "출국 1-2주 전"], evidence: "항공권 결제 후 카드 검색 급증." },
      where: { tags: ["여행 블로그", "트립어드바이저", "카드고릴라"], evidence: "여행 준비 사이트가 핵심 접점." },
      why:   { tags: ["통합 카드", "환전 번거로움 해소"], evidence: "365일 + 여행 겸용 포지셔닝." },
      how:   { tags: ["여행 준비 체크리스트에 카드 포함", "3박4일 말고 365일 프레임"], evidence: "여행 준비 콘텐츠 안에 자연스럽게 침투." },
    },
    shortformIdeas: ["해외여행 카드 고를 때 진짜 중요한 것", "여행 3박4일 말고 365일을 보자"],
  },
  {
    id: "all-7", category: "all", subgroup: "소비자 맥락에서 발견한 기회", card: "ALL", level: "MEDIUM",
    icon: "🔔", title: "구독 해지 버튼을 누르기 직전의 순간",
    usp: "여정 침투 · OTT 10%",
    hookType: "Intent-hook", hookLabel: "해지 직전 구출",
    strategyCopy: "넷플릭스/유튜브 가격 확인 → 싸게 보는 법 → 해지 직전. 이 순간에 \"해지하지 않아도 되는 이유\" 제시.",
    monthlyVol: 43736, annualVol: 524832,
    peakMonths: [65, 60, 55, 55, 55, 60, 65, 70, 65, 75, 80, 85], peakSeason: "연말 구독 정리",
    demographics: "30-40대 · 30대 32%",
    keyInsight: "'해지' 검색 월 10,500 vs '싸게 유지' 43,700 = 4배. 유지 욕구가 더 큼.",
    pathJourney: ["넷플릭스 가격", "유튜브 프리미엄 싸게", "OTT 해지", "싸게 보는 법", "카드 할인"],
    pathInsight: "해지 직전 순간이 전환 임박 타이밍.",
    clusterInsight: "OTT 해지 클러스터와 '싸게 유지' 클러스터는 별개. 유지 클러스터에 KB가 침투해야.",
    topKeywords: [
      { keyword: "넷플릭스 해지", vol: 10500 },
      { keyword: "유튜브 프리미엄 싸게", vol: 40273 },
      { keyword: "OTT 정리", vol: 3200 },
      { keyword: "넷플릭스 싸게", vol: 3463 },
      { keyword: "티빙 해지", vol: 2800 },
    ],
    contentHook: "해지 버튼 누르기 전에 딱 이것만",
    dataProof: "'싸게 유지' 월 43,700 vs '해지' 10,500. 4배 차이.",
    painPoints: ["가격 인상이 부담", "해지하긴 아쉽다", "할인 방법을 모른다"],
    uspConnection: "ALL 카드 OTT 10% (넷플릭스, 유튜브, 티빙, 쿠팡플레이 등)",
    context: {
      who:   { tags: ["OTT 해비유저", "30-40대", "해지 고민층"], evidence: "30대 32%가 해지 검색 주도." },
      what:  { tags: ["구독 유지", "저가 전환", "통합 할인"], evidence: "'싸게 유지' 43,700 vs '해지' 10,500." },
      when:  { tags: ["결제일 3-5일 전", "가격 인상 공지 직후"], evidence: "넷플릭스 인상 시 해지 검색 폭발." },
      where: { tags: ["넷플릭스 계정 페이지", "OTT 비교 블로그"], evidence: "해지 페이지 직전이 핵심 접점." },
      why:   { tags: ["매월 자동 10% 할인", "콘텐츠 포기 없음"], evidence: "카드 한 장으로 모든 OTT 커버." },
      how:   { tags: ["해지 직전 구출 영상", "OTT 통합 절약법"], evidence: "'유지'가 '해지'보다 4배 많은 시장." },
    },
    shortformIdeas: ["해지 버튼 누르기 전에 딱 이것만", "넷플릭스 해지 말고 이 카드로 바꿔봐"],
  },
  {
    id: "all-8", category: "all", subgroup: "소비자 맥락에서 발견한 기회", card: "ALL", level: "MEDIUM",
    icon: "🔄", title: "카드 교체/첫 발급을 고민하는 순간",
    usp: "여정 침투 · 국내 1%",
    hookType: "Decision-hook", hookLabel: "카드 선택 피로",
    strategyCopy: "신용카드 추천 → 디시/뽐뿌 → 카드고릴라 → 캐시백 확인. \"어디서 얼마 할인인지 따지기 싫은\" 사람에게 \"전부 1%\".",
    monthlyVol: 68000, annualVol: 816000,
    peakMonths: [70, 60, 55, 55, 60, 60, 65, 70, 65, 70, 75, 85], peakSeason: "연초·연말",
    demographics: "여 55% · 20-30대",
    keyInsight: "비교 피로감이 '단순함 추구'로 이어짐.",
    pathJourney: ["신용카드 추천", "카드고릴라", "캐시백 카드", "첫 카드", "카드 발급"],
    pathInsight: "추천 검색 → 비교 사이트 → 결정 피로 → 단순한 카드.",
    clusterInsight: "카드 비교 클러스터에서 '캐시백'과 '피로'가 연결됨. '단순 1%' 제안이 해답.",
    topKeywords: [
      { keyword: "신용카드 추천", vol: 32000 },
      { keyword: "카드고릴라", vol: 15000 },
      { keyword: "캐시백 카드", vol: 8200 },
      { keyword: "첫 카드", vol: 8500 },
      { keyword: "신용카드 비교", vol: 6800 },
    ],
    contentHook: "카드 고르다 지쳤으면 이걸로 끝",
    dataProof: "카드 비교 검색 월 6.8만+. 여 55%, 20-30대 사회초년생.",
    painPoints: ["혜택이 너무 복잡하다", "비교 사이트 피곤하다", "단순한 게 최고"],
    uspConnection: "ALL 카드 국내 1% 무조건",
    context: {
      who:   { tags: ["20-30대 여성", "사회초년생", "비교 피로층"], evidence: "여 55%, 25-30대 주요층." },
      what:  { tags: ["고민 해결", "단순 혜택"], evidence: "'추천'이 검색의 50%." },
      when:  { tags: ["취업 직후", "연말 카드 정리", "기존 카드 만료"], evidence: "사회초년생 카드 월 5.2K." },
      where: { tags: ["카드고릴라", "카페·커뮤니티"], evidence: "비교 사이트가 최종 결정 접점." },
      why:   { tags: ["확실한 1%", "어디서나", "조건 없음"], evidence: "전 가맹점 무조건 1%." },
      how:   { tags: ["비교 안 하는 카드", "첫 카드 3분 가이드"], evidence: "피로층 타겟팅 효과." },
    },
    shortformIdeas: ["카드 고르다 지쳤으면 이걸로 끝", "전부 1%가 진짜 이득인 이유"],
  },
  // ALL 교차 3개
  {
    id: "all-9", category: "all", subgroup: "교차 인사이트", card: "ALL", level: "NICHE", isInsight: true,
    icon: "⚡", title: "\"고정비 통합 절약\" 메시지를 아무도 하지 않고 있다",
    usp: "블루오션 전략",
    hookType: "Positioning-hook", hookLabel: "블루오션",
    strategyCopy: "와우+네이버+넷플릭스+유튜브+통신비 = 월 91,190원. ALL 카드로 연 14만원 절약. 이 '통합 절약' 메시지를 하는 카드사가 시장에 없음.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [70, 60, 60, 60, 60, 60, 65, 70, 65, 75, 85, 90], peakSeason: "연말",
    demographics: "30-40대 전체",
    keyInsight: "개별 할인은 있지만 '통합' 메시지는 없음.",
    pathJourney: ["고정비 정리", "자동이체 카드", "통합 할인", "구독료 절약", "카드 발급"],
    pathInsight: "통합 절약을 찾는 소비자가 있지만 카드사는 개별 혜택만 마케팅.",
    clusterInsight: "고정비 클러스터는 '절약'과 '자동이체'가 허브. '통합 할인카드' 노드는 완전 공백.",
    topKeywords: [
      { keyword: "고정비 절약", vol: 12000 },
      { keyword: "구독료 관리", vol: 4800 },
      { keyword: "자동이체 할인", vol: 3500 },
    ],
    contentHook: "매달 자동으로 빠져나가는 9만원 얼마나 아낄 수 있을까",
    dataProof: "월 9.1만원 고정비 × 10% 할인 = 연 10.9만원 절약. 연회비 2만원 대비 5.5배.",
    painPoints: ["개별 할인은 많은데 통합이 없다", "어떤 걸 줄여야 할지 모른다"],
    uspConnection: "ALL 카드 = 쇼핑멤버십 50% + OTT 10% + 통신 5% + 국내 1% 통합",
    context: {
      who:   { tags: ["고정비 많은 30-40대", "자동이체 설정자"], evidence: "구독 3개+ 보유 가구 70%." },
      what:  { tags: ["통합 관리", "한 장으로 해결", "고민 없음"], evidence: "개별 카드 비교 피로." },
      when:  { tags: ["연말 가계부 정리", "구독료 인상 시"], evidence: "연말 '고정비 절약' 검색 급증." },
      where: { tags: ["가계부 앱", "재테크 블로그"], evidence: "재테크 커뮤니티가 접점." },
      why:   { tags: ["관리 편의성", "통합 혜택"], evidence: "ALL 카드 하나로 5개 카테고리 커버." },
      how:   { tags: ["통합 절약 시뮬레이터", "한 장으로 월 9만원"], evidence: "경쟁사가 없는 메시지." },
    },
    shortformIdeas: ["매달 자동으로 빠져나가는 9만원 얼마나 아낄 수 있을까", "구독료+통신비+쇼핑 한 장으로 줄이기"],
  },
  {
    id: "all-10", category: "all", subgroup: "교차 인사이트", card: "ALL", level: "NICHE", isInsight: true,
    icon: "⚡", title: "넷플릭스→할인카드 여정에 KB는 없고 신한카드만 있다",
    usp: "경쟁사 선점 대응",
    hookType: "Counter-hook", hookLabel: "경쟁사 대응",
    strategyCopy: "소비자가 이미 '넷플릭스 가격 → 싸게 보는 법 → 할인카드' 여정을 걷고 있음. 그 끝에 신한카드만 나옴. KB 부재.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [70, 65, 60, 55, 55, 60, 65, 70, 70, 80, 85, 90], peakSeason: "연말",
    demographics: "30-40대",
    keyInsight: "여정은 이미 완성, 경쟁사만 침투.",
    pathJourney: ["넷플릭스 가격", "넷플릭스 싸게", "OTT 할인카드", "신한카드 넷플릭스", "카드 발급"],
    pathInsight: "여정 끝에 KB가 없다는 사실이 가장 큰 기회.",
    clusterInsight: "OTT 할인카드 클러스터는 신한카드가 지배. KB 노드는 연결되지 않음.",
    topKeywords: [
      { keyword: "신한카드 넷플릭스", vol: 3800 },
      { keyword: "OTT 할인카드", vol: 5200 },
      { keyword: "넷플릭스 할인", vol: 8500 },
    ],
    contentHook: "넷플릭스 할인카드 비교 — 신한 vs KB",
    dataProof: "OTT 할인카드 월 5.2K 검색에서 KB 노출 거의 없음.",
    painPoints: ["신한카드만 자꾸 나온다", "KB는 OTT 할인 안 되는 줄 알았다"],
    uspConnection: "ALL 카드 OTT 10%로 경쟁사 대응",
    context: {
      who:   { tags: ["OTT 할인 검색자", "30-40대"], evidence: "기존 여정이 이미 존재." },
      what:  { tags: ["할인카드 발견", "경쟁사 대안"], evidence: "여정 종점에 KB 추가 필요." },
      when:  { tags: ["연중", "가격 인상 직후"], evidence: "OTT 인상 시 검색 급증." },
      where: { tags: ["OTT 비교 블로그", "구글 검색"], evidence: "블로그가 최종 노출 접점." },
      why:   { tags: ["동일 혜택, 더 나은 통합"], evidence: "KB는 OTT+쇼핑+통신 통합." },
      how:   { tags: ["KB vs 신한 직접 비교", "여정 끝에 KB 노출"], evidence: "경쟁사 대응 콘텐츠 필요." },
    },
    shortformIdeas: ["넷플릭스 할인카드 비교 신한 vs KB"],
  },
  {
    id: "all-11", category: "all", subgroup: "교차 인사이트", card: "ALL", level: "NICHE", isInsight: true,
    icon: "⚡", title: "통신비가 ALL 카드의 유일한 남성 침투 경로",
    usp: "침투 전략",
    hookType: "Gateway-hook", hookLabel: "남성 침투로",
    strategyCopy: "ALL 카드 모든 자산이 여성 55-70%인데, 통신비만 남 56%, 40-50대 66%. 가족카드(무료)로 한 가정에 2장 침투 가능.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [60, 60, 65, 60, 60, 55, 55, 60, 60, 65, 70, 80], peakSeason: "연말 정산",
    demographics: "남 56% · 40-50대 66%",
    keyInsight: "통신비가 성별 비대칭의 유일한 출구.",
    pathJourney: ["통신비 절약", "가족 결합", "통신비 할인카드", "ALL 카드", "가족카드 발급"],
    pathInsight: "남성 진입 → 가족카드로 여성 확산.",
    clusterInsight: "통신비 클러스터는 남성 중심. 여기에 ALL 카드가 진입하면 가족 전체로 확산.",
    topKeywords: [
      { keyword: "통신비 절약", vol: 8500 },
      { keyword: "가족 통신비", vol: 3200 },
      { keyword: "SKT 요금제", vol: 58000 },
    ],
    contentHook: "아빠 카드 하나로 가족 통신비 전부 할인",
    dataProof: "ALL 전체 여성 55%+, 통신비만 남 56%. 가족카드 무료로 확산 구조.",
    painPoints: ["아빠가 카드 만들기 귀찮아한다", "가족 전체 혜택이 필요하다"],
    uspConnection: "ALL 카드 통신 5% + 가족카드 무료 = 가정당 2장 침투",
    context: {
      who:   { tags: ["40-50대 가장", "아빠", "가족 통신 납부자"], evidence: "남 56%, 40-50대 66%." },
      what:  { tags: ["가족 전체 할인", "편의성"], evidence: "가족카드 무료 + 자동 할인." },
      when:  { tags: ["연말 가족 정산", "요금제 변경 시"], evidence: "연초 가족 재무 검토." },
      where: { tags: ["통신사 매장", "가족 카카오톡"], evidence: "가족 공유 접점." },
      why:   { tags: ["한 번 설정, 전 가족 혜택"], evidence: "가족카드 무료 발급 구조." },
      how:   { tags: ["아빠 페르소나 콘텐츠", "가장의 경제력 소구"], evidence: "남성 타겟 앵글." },
    },
    shortformIdeas: [],
  },

  // ─────────── B. YOU Prime ───────────
  {
    id: "you-1", category: "you", subgroup: "일상팩에서 출발한 기회", card: "YOU", level: "MEDIUM",
    icon: "⛽", title: "유가 급등에 주유 할인을 찾는 출퇴근 운전자",
    usp: "일상팩 주유 10%",
    hookType: "Trend-hook", hookLabel: "유가 상승 대응",
    strategyCopy: "주유소 가격 검색 폭발 성장(+1,623%). 유가 상승기에 자동으로 수요 급등하는 구조.",
    monthlyVol: 42510, annualVol: 510120,
    peakMonths: [70, 70, 75, 80, 85, 90, 95, 95, 85, 75, 70, 70], peakSeason: "여름·휴가철",
    demographics: "남 70% · 40대 38%",
    keyInsight: "유가 상승기 자동 수요 급등. 주유소 검색이 +1,623% 성장.",
    pathJourney: ["기름값", "주유소 가격", "셀프 주유", "주유 할인카드", "카드 발급"],
    pathInsight: "유가 확인 → 할인 탐색 → 카드 선택.",
    clusterInsight: "주유 클러스터는 '가격'과 '할인'이 강하게 연결. 카드 할인이 최적 진입점.",
    topKeywords: [
      { keyword: "주유소 가격", vol: 32000 },
      { keyword: "셀프 주유", vol: 8000 },
      { keyword: "기름값", vol: 2500 },
      { keyword: "주유 할인카드", vol: 1800 },
      { keyword: "유가 전망", vol: 3500 },
    ],
    contentHook: "기름값 비쌀 때 주유비 아끼는 진짜 방법",
    dataProof: "주유소 가격 검색 +1,623% 성장. 남 70%, 40대 38%.",
    painPoints: ["기름값이 너무 오른다", "출퇴근 주유비 부담", "어떤 카드가 제일 많이 돌려받는지 모른다"],
    uspConnection: "YOU Prime 일상팩 주유 10% 할인",
    context: {
      who:   { tags: ["40대 남성", "출퇴근 운전자", "내연기관 소유자"], evidence: "남 70%, 40대 38%." },
      what:  { tags: ["주유비 절감", "유가 대응", "매월 자동 할인"], evidence: "주유 할인 월 1.8K." },
      when:  { tags: ["유가 상승기", "월말 주유", "여름 휴가철"], evidence: "유가 +10% 시 검색 폭발." },
      where: { tags: ["SK에너지 앱", "오피넷", "주유소 네비게이션"], evidence: "주유소 결제 접점." },
      why:   { tags: ["10% = 연 수십만원", "자동납부 편의성"], evidence: "월 20만원 주유 × 10% = 연 24만원." },
      how:   { tags: ["기름값 폭등기 생존법", "주유 할인 카드 비교"], evidence: "유가 뉴스 트렌드 연동." },
    },
    shortformIdeas: ["기름값 비쌀 때 주유비 아끼는 진짜 방법", "주유 할인 카드 비교, 어떤 게 제일 많이 돌려받나", "출퇴근 주유비 월 20만원, 10% 돌려받기"],
  },
  {
    id: "you-2", category: "you", subgroup: "일상팩에서 출발한 기회", card: "YOU", level: "LARGE",
    icon: "🛵", title: "배달을 자주 시키는 1-2인 가구 또는 맞벌이",
    usp: "일상팩 배달 10%",
    hookType: "Routine-hook", hookLabel: "매일 배달",
    strategyCopy: "배달의민족 + 쿠팡이츠 월 376K. 매일 시키는 배달에서 10% 할인은 월 2-3만원 체감.",
    monthlyVol: 376266, annualVol: 4515192,
    peakMonths: [80, 75, 75, 75, 80, 85, 90, 90, 85, 80, 80, 85], peakSeason: "연중",
    demographics: "20-40대 전 연령",
    keyInsight: "배달은 매일 반복 소비. 10% 할인이 가장 체감 큼.",
    pathJourney: ["배달의민족", "배달 쿠폰", "배달 할인카드", "배민 할인", "카드 발급"],
    pathInsight: "배달앱 이용 → 할인 방법 탐색 → 카드.",
    clusterInsight: "배달 클러스터는 '쿠폰'과 '할인카드'가 연결. 카드 진입 용이.",
    topKeywords: [
      { keyword: "배달의민족", vol: 211100 },
      { keyword: "쿠팡이츠", vol: 165166 },
      { keyword: "배달비", vol: 8500 },
      { keyword: "배달 할인", vol: 3200 },
      { keyword: "배달 쿠폰", vol: 12000 },
    ],
    contentHook: "배달 자주 시키면 이 카드가 답",
    dataProof: "배민 월 21.1만, 쿠팡이츠 16.5만. 매일 시키면 월 2-3만원 할인.",
    painPoints: ["배달비가 아깝다", "쿠폰 찾기 귀찮다", "카드 혜택 비교 복잡"],
    uspConnection: "YOU Prime 일상팩 배달 10%",
    context: {
      who:   { tags: ["1-2인 가구", "맞벌이 부부", "20-40대"], evidence: "배달 고빈도 층." },
      what:  { tags: ["배달비 절감", "매일 할인"], evidence: "월 20만원 배달 × 10%." },
      when:  { tags: ["주중 저녁", "주말", "점심 시간"], evidence: "배달 피크 타임." },
      where: { tags: ["배달의민족 앱", "쿠팡이츠 앱"], evidence: "결제 접점." },
      why:   { tags: ["매일 반복", "체감 효과"], evidence: "매일 쓰는 할인." },
      how:   { tags: ["1인 가구 배달 카드 추천", "배달비 연간 얼마 아낄까"], evidence: "라이프스타일 콘텐츠." },
    },
    shortformIdeas: ["배달 자주 시키면 이 카드가 답", "배달비 아까운 사람을 위한 카드 비교", "배민 쿠팡이츠 할인 최대로 받는 법"],
  },
  {
    id: "you-3", category: "you", subgroup: "일상팩에서 출발한 기회", card: "YOU", level: "MEDIUM",
    icon: "💪", title: "필라테스 \"비싼 이유\"를 납득하는 과정에 있는 30대 여성",
    usp: "일상팩 자기관리 5%",
    hookType: "Justification-hook", hookLabel: "비용 정당화",
    strategyCopy: "필라테스 여정: 효과 확인 → 가격 → \"비싼 이유\" 납득. 비용 정당화 과정에 카드 할인 침투.",
    monthlyVol: 14252, annualVol: 171024,
    peakMonths: [75, 80, 85, 85, 80, 75, 70, 70, 80, 85, 80, 75], peakSeason: "연초·봄",
    demographics: "여 78% · 25-40대",
    keyInsight: "비용 정당화 과정이 카드 침투 타이밍.",
    pathJourney: ["필라테스 효과", "필라테스 가격", "필라테스 비싼 이유", "자기관리 비용", "할인카드"],
    pathInsight: "효과 → 가격 → 납득 → 할인 탐색.",
    clusterInsight: "필라테스 클러스터는 '효과'와 '가격'이 양대 허브. '할인'은 빈 노드.",
    topKeywords: [
      { keyword: "필라테스 가격", vol: 7176 },
      { keyword: "필라테스 비싼 이유", vol: 3100 },
      { keyword: "요가 초보", vol: 2800 },
      { keyword: "헬스장 가격", vol: 4200 },
      { keyword: "자기관리 루틴", vol: 1500 },
    ],
    contentHook: "필라테스 월 20만원 비싸다고? 5% 돌려받으면",
    dataProof: "필라테스 가격 월 7.2K, 비싼 이유 3.1K. 여 78%, 25-40대.",
    painPoints: ["필라테스가 부담스럽다", "계속 할지 고민", "비용 정당화"],
    uspConnection: "YOU Prime 일상팩 자기관리 5%",
    context: {
      who:   { tags: ["25-40대 여성", "자기관리 시작자", "필라테스 고민층"], evidence: "여 78%, 25-40대." },
      what:  { tags: ["비용 절감", "운동 지속"], evidence: "필라테스 10회권 20만원+." },
      when:  { tags: ["연초 다이어트", "봄 바디프로필"], evidence: "1-3월 검색 급증." },
      where: { tags: ["필라테스 스튜디오", "인스타그램"], evidence: "스튜디오 결제 접점." },
      why:   { tags: ["부담 감소", "지속성"], evidence: "5% 할인 = 월 1만원." },
      how:   { tags: ["비싼 이유 콘텐츠", "자기관리 비용 가계부"], evidence: "정당화 콘텐츠 효과적." },
    },
    shortformIdeas: ["필라테스 월 20만원 비싸다고? 5% 돌려받으면", "운동 시작할 때 같이 만들면 좋은 카드", "자기관리 비용 아끼는 현실적 방법"],
  },
  {
    id: "you-4", category: "you", subgroup: "일상팩에서 출발한 기회", card: "YOU", level: "MEDIUM",
    icon: "📱", title: "통신·보험·앱을 자동이체하는 생활 고정비 납부자",
    usp: "일상팩 통신/보험/App 10%",
    hookType: "Setup-hook", hookLabel: "한 번 설정",
    strategyCopy: "자동이체 한 번 설정 → 매달 자동 10% 할인. 설정 후 잊어도 되는 구조.",
    monthlyVol: 58800, annualVol: 705600,
    peakMonths: [70, 65, 65, 65, 65, 65, 65, 65, 65, 70, 75, 80], peakSeason: "연초·연말",
    demographics: "남 63% · 30대",
    keyInsight: "설정 1회 → 평생 자동 할인.",
    pathJourney: ["자동이체 설정", "고정비 할인", "통신비 카드", "보험료 할인", "카드 발급"],
    pathInsight: "설정 편의성이 선택 기준.",
    clusterInsight: "자동이체 클러스터는 '편의성'이 핵심 키워드. 카드 진입 용이.",
    topKeywords: [
      { keyword: "SKT 요금제", vol: 58000 },
      { keyword: "보험료 자동이체", vol: 2800 },
      { keyword: "앱 결제 카드", vol: 1200 },
      { keyword: "자동이체 할인", vol: 3500 },
    ],
    contentHook: "한 번 설정하면 매달 자동 할인",
    dataProof: "SKT 요금제 월 5.8만, 남 63%, 30대 주요.",
    painPoints: ["매달 할인 설정이 귀찮다", "자동 할인이 필요하다"],
    uspConnection: "YOU Prime 일상팩 통신/보험/App 10%",
    context: {
      who:   { tags: ["30대 남성", "직장인", "자동이체 설정자"], evidence: "남 63%, 30대." },
      what:  { tags: ["설정 1회", "자동 할인"], evidence: "자동이체 월 3.5K." },
      when:  { tags: ["입주 직후", "직장 이동 시"], evidence: "생활 정비 시점." },
      where: { tags: ["카드사 앱", "통신사 앱"], evidence: "자동이체 설정 페이지." },
      why:   { tags: ["편의성", "자동 혜택"], evidence: "설정 후 잊어도 됨." },
      how:   { tags: ["자동이체 10% 설정법", "고정비 체크리스트"], evidence: "실용 팁 콘텐츠." },
    },
    shortformIdeas: ["한 번 설정하면 매달 자동 할인", "고정비 자동이체 10% 돌려받는 법"],
  },
  {
    id: "you-5", category: "you", subgroup: "가족팩에서 출발한 기회", card: "YOU", level: "MEGA",
    icon: "🛒", title: "마켓컬리로 매주 장보는 40대 엄마",
    usp: "가족팩 온라인장보기 10%",
    hookType: "Habit-hook", hookLabel: "루틴화 소비",
    strategyCopy: "마켓컬리 월 80.5만. 이미 루틴화된 주간 소비에서 10% 할인은 매주 체감.",
    monthlyVol: 930799, annualVol: 11169588,
    peakMonths: [85, 85, 85, 85, 90, 90, 95, 95, 85, 85, 90, 95], peakSeason: "연중",
    demographics: "여 84% · 40대 36%",
    keyInsight: "주간 반복 소비. 10% = 매주 체감.",
    pathJourney: ["마켓컬리", "새벽배송", "장보기 할인", "마켓컬리 할인카드", "카드 발급"],
    pathInsight: "반복 이용 → 할인 탐색 → 카드 선택.",
    clusterInsight: "마켓컬리 클러스터는 '새벽배송'과 '가족'이 허브. 카드 노드 약함 = 기회.",
    topKeywords: [
      { keyword: "마켓컬리", vol: 804766 },
      { keyword: "오아시스", vol: 123000 },
      { keyword: "새벽배송", vol: 45000 },
      { keyword: "신선식품", vol: 28000 },
      { keyword: "마켓컬리 할인", vol: 4800 },
    ],
    contentHook: "마켓컬리 매주 장보면 연 얼마 아낄 수 있을까",
    dataProof: "마켓컬리 월 80.5만, 여 84%, 40대 36%.",
    painPoints: ["장바구니가 늘 부담", "할인 쿠폰 찾기 귀찮다"],
    uspConnection: "YOU Prime 가족팩 온라인장보기 10%",
    context: {
      who:   { tags: ["40대 엄마", "새벽배송 루틴 이용자", "맞벌이 주부"], evidence: "여 84%, 40대 36%." },
      what:  { tags: ["장보기 절감", "매주 체감"], evidence: "주당 5-10만원 지출." },
      when:  { tags: ["주말 발주", "평일 오전"], evidence: "주간 루틴." },
      where: { tags: ["마켓컬리 앱", "오아시스"], evidence: "결제 접점." },
      why:   { tags: ["매주 10% 체감", "가족 식비 절감"], evidence: "연간 40만원+ 절약." },
      how:   { tags: ["마켓컬리 매주 절약 영상", "장보기 할인 비교"], evidence: "엄마 커뮤니티 바이럴." },
    },
    shortformIdeas: ["마켓컬리 매주 장보면 연 얼마 아낄 수 있을까", "온라인 장보기 할인 최대로 받는 카드", "새벽배송 결제만 바꿨더니 월 3만원 절약"],
  },
  {
    id: "you-6", category: "you", subgroup: "가족팩에서 출발한 기회", card: "YOU", level: "MEDIUM",
    icon: "☕", title: "학원 픽업 후 카페, 마트 — 엄마의 일상 동선 전체 할인",
    usp: "가족팩 학원/대형마트/카페 5%",
    hookType: "Flow-hook", hookLabel: "일상 동선",
    strategyCopy: "스타벅스 신메뉴 월 27K(+157%). 학원 → 카페 → 마트 동선 전체가 할인 대상.",
    monthlyVol: 29896, annualVol: 358752,
    peakMonths: [80, 75, 80, 85, 80, 75, 70, 70, 85, 85, 80, 80], peakSeason: "학기 중",
    demographics: "여 74% · 30-40대",
    keyInsight: "엄마의 하루 동선 = 학원·카페·마트.",
    pathJourney: ["학원비", "스타벅스", "이마트", "엄마 카드 추천", "카드 발급"],
    pathInsight: "일상 동선 위의 결제를 한 장으로.",
    clusterInsight: "학부모 클러스터는 '카페'와 '마트'가 연결. 카드 노드 추가 필요.",
    topKeywords: [
      { keyword: "스타벅스 신메뉴", vol: 27343 },
      { keyword: "이마트 행사", vol: 12000 },
      { keyword: "홈플러스", vol: 15000 },
      { keyword: "학원비", vol: 8500 },
      { keyword: "대형마트 휴무일", vol: 18000 },
    ],
    contentHook: "학원 픽업하고 스타벅스 가는 엄마를 위한 카드",
    dataProof: "스타벅스 신메뉴 +157% 성장. 여 74%, 30-40대.",
    painPoints: ["카드 여러 장 꺼내기 귀찮다", "엄마 일상 전체 할인 원함"],
    uspConnection: "YOU Prime 가족팩 학원+마트+카페 5%",
    context: {
      who:   { tags: ["학부모 엄마", "30-40대 여성"], evidence: "여 74%." },
      what:  { tags: ["일상 동선 통합", "한 장 해결"], evidence: "여러 카드 피로." },
      when:  { tags: ["학기 중 평일", "학원 픽업 시간"], evidence: "학원 하원 후 동선." },
      where: { tags: ["스타벅스", "이마트", "학원"], evidence: "엄마 동선 접점." },
      why:   { tags: ["편의성", "통합 혜택"], evidence: "하루 동선 전체 5%." },
      how:   { tags: ["엄마 하루 동선 브이로그", "학원 픽업 루틴"], evidence: "엄마 공감 콘텐츠." },
    },
    shortformIdeas: ["학원 픽업하고 스타벅스 가는 엄마를 위한 카드", "이마트 행사일에 이 카드 쓰면 5% 추가 할인", "엄마의 하루 동선 전체 할인 카드"],
  },
  {
    id: "you-7", category: "you", subgroup: "가족팩에서 출발한 기회", card: "YOU", level: "NICHE",
    icon: "🏠", title: "아파트 관리비·전기세를 고민하는 가정",
    usp: "가족팩 생활요금/일상케어 10%",
    hookType: "Bill-hook", hookLabel: "고지서 절약",
    strategyCopy: "관리비 검색 +21% 성장. 월 30만원 관리비 × 10% = 연 36만원 절약.",
    monthlyVol: 9053, annualVol: 108636,
    peakMonths: [85, 85, 80, 70, 65, 60, 75, 85, 75, 70, 80, 90], peakSeason: "겨울",
    demographics: "남 53% · 30-40대 66%",
    keyInsight: "관리비 = 매월 고정 비자발 지출.",
    pathJourney: ["아파트 관리비", "전기세 절약", "생활요금 할인카드", "카드 발급"],
    pathInsight: "고지서 → 절약 방법 → 카드.",
    clusterInsight: "관리비 클러스터는 '절약'과 '자동이체'가 허브.",
    topKeywords: [
      { keyword: "아파트 관리비", vol: 6200 },
      { keyword: "전기세 절약", vol: 4800 },
      { keyword: "관리비 절약", vol: 3500 },
      { keyword: "생활요금 카드", vol: 800 },
    ],
    contentHook: "관리비 줄이는 의외의 방법",
    dataProof: "관리비 +21% 성장. 남 53%, 30-40대 가정.",
    painPoints: ["관리비가 매달 부담", "전기세 인상 걱정"],
    uspConnection: "YOU Prime 가족팩 생활요금 10%",
    context: {
      who:   { tags: ["30-40대 가정", "아파트 거주자"], evidence: "남 53%, 30-40대 66%." },
      what:  { tags: ["고지서 절약", "자동 할인"], evidence: "월 30만원 관리비." },
      when:  { tags: ["겨울 난방비", "여름 냉방비"], evidence: "계절 피크." },
      where: { tags: ["관리사무소", "한전 앱"], evidence: "납부 접점." },
      why:   { tags: ["비자발 지출", "매월 자동"], evidence: "연 36만원+ 절약." },
      how:   { tags: ["관리비 자동이체 10%", "전기세 절약 카드"], evidence: "가정 재무 콘텐츠." },
    },
    shortformIdeas: ["관리비 줄이는 의외의 방법", "전기세+관리비 자동이체하면 연 얼마 돌아올까"],
  },
  {
    id: "you-8", category: "you", subgroup: "교차 인사이트", card: "YOU", level: "NICHE", isInsight: true,
    icon: "⚡", title: "일상팩 안에서 성별이 극단적으로 갈린다",
    usp: "타겟 반전 전략",
    hookType: "Segment-hook", hookLabel: "타겟 반전",
    strategyCopy: "주유(남 70%) vs 필라테스(여 78%) vs 요가(여 89%). 같은 팩이지만 남녀가 완전히 다른 자산을 씀.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [70, 70, 75, 75, 75, 70, 70, 75, 75, 75, 75, 75], peakSeason: "연중",
    demographics: "성별 분리",
    keyInsight: "단일 페르소나 광고가 불가능.",
    pathJourney: ["자기관리", "필라테스 vs 주유", "일상팩 비교"],
    pathInsight: "남녀 분리 콘텐츠가 필요.",
    clusterInsight: "일상팩 클러스터가 성별로 완전 분리.",
    topKeywords: [{ keyword: "자기관리 루틴", vol: 1500 }, { keyword: "주유 할인", vol: 1800 }],
    contentHook: "같은 카드 다른 타겟 — 남자편/여자편",
    dataProof: "주유 남 70% vs 필라테스 여 78%.",
    painPoints: ["단일 광고로는 공감 안 됨"],
    uspConnection: "YOU Prime 일상팩 자기관리/주유 각각",
    context: {
      who:   { tags: ["남성 운전자", "여성 자기관리층"], evidence: "성별 극명." },
      what:  { tags: ["분리 타겟팅"], evidence: "남녀 다른 욕구." },
      when:  { tags: ["연중"], evidence: "상시 수요." },
      where: { tags: ["주유소/필라테스 스튜디오"], evidence: "접점 분리." },
      why:   { tags: ["같은 카드, 다른 가치"], evidence: "한 카드로 2 타겟." },
      how:   { tags: ["남자편/여자편 시리즈"], evidence: "AB 콘텐츠 전략." },
    },
    shortformIdeas: ["같은 카드 다른 타겟 — 남자편/여자편"],
  },
  {
    id: "you-9", category: "you", subgroup: "교차 인사이트", card: "YOU", level: "NICHE", isInsight: true,
    icon: "⚡", title: "가족팩의 마켓컬리(여 84%) = NEED Edu 타겟과 동일인",
    usp: "크로스셀 전략",
    hookType: "Combo-hook", hookLabel: "3장 세트",
    strategyCopy: "YOU 가족팩(장보기) + NEED Edu(학원비) + ALL(구독료) = 40대 엄마의 모든 지출 커버.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [80, 80, 85, 85, 85, 80, 75, 75, 85, 85, 80, 80], peakSeason: "학기 중",
    demographics: "여 84% · 40대",
    keyInsight: "한 명에게 3장 제안 가능.",
    pathJourney: ["엄마 카드 추천", "가족 카드 비교", "3장 세트"],
    pathInsight: "타겟 동일인에게 여러 카드 제안.",
    clusterInsight: "40대 엄마가 여러 클러스터의 교차점.",
    topKeywords: [{ keyword: "엄마 카드", vol: 3200 }],
    contentHook: "40대 엄마를 위한 KB 3종 세트",
    dataProof: "마켓컬리 여 84% = 학원비 여 80% = 동일 타겟.",
    painPoints: ["한 장으로 다 커버하고 싶다"],
    uspConnection: "YOU Prime + NEED Edu + ALL 세트",
    context: {
      who:   { tags: ["40대 엄마", "장보기+학원비 납부"], evidence: "여 84% 동일인." },
      what:  { tags: ["전 지출 커버"], evidence: "구독+장보기+학원." },
      when:  { tags: ["연중"], evidence: "매월 반복." },
      where: { tags: ["마켓컬리+학원+쇼핑"], evidence: "접점 다양." },
      why:   { tags: ["세트 제안"], evidence: "한 명에 3장." },
      how:   { tags: ["엄마 3종 세트 콘텐츠"], evidence: "크로스셀 전략." },
    },
    shortformIdeas: ["40대 엄마를 위한 KB 3종 세트"],
  },

  // ─────────── C. NEED ───────────
  {
    id: "need-1", category: "need", subgroup: "NEED Pay: 디지털 결제 생활자", card: "PAY", level: "MEGA",
    icon: "📱", title: "카카오페이를 새로 쓰기 시작한 40-50대",
    usp: "간편결제 15%/10%",
    hookType: "Adoption-hook", hookLabel: "중장년 유입",
    strategyCopy: "카카오페이 40-50대 79%, +70% 성장. 진짜 타겟은 MZ가 아니라 40-50대 신규 이용자.",
    monthlyVol: 1543466, annualVol: 18521592,
    peakMonths: [75, 75, 80, 80, 80, 80, 85, 85, 85, 85, 90, 95], peakSeason: "연중",
    demographics: "남녀 반반 · 카카오페이 40-50대 79%",
    keyInsight: "MZ가 아닌 중장년 신규 유입이 진짜 성장.",
    pathJourney: ["카카오페이", "간편결제 비교", "간편결제 할인카드", "NEED Pay", "카드 발급"],
    pathInsight: "간편결제 시작 → 할인 탐색 → 카드.",
    clusterInsight: "간편결제 클러스터의 중장년 노드가 급성장.",
    topKeywords: [
      { keyword: "카카오페이", vol: 680000 },
      { keyword: "네이버페이", vol: 520000 },
      { keyword: "삼성페이", vol: 280000 },
      { keyword: "페이코", vol: 45000 },
      { keyword: "간편결제 할인", vol: 3800 },
    ],
    contentHook: "카카오페이 쓸 때 15% 돌려받는 카드",
    dataProof: "카카오페이 +70% 성장, 40-50대 79%.",
    painPoints: ["간편결제 처음이라 헤맨다", "할인 방법을 모른다"],
    uspConnection: "NEED Pay 간편결제 15%/10%",
    context: {
      who:   { tags: ["40-50대 중장년", "간편결제 신규 이용자"], evidence: "카카오페이 40-50대 79%." },
      what:  { tags: ["간편결제 할인", "디지털 결제 적응"], evidence: "+70% 성장." },
      when:  { tags: ["자녀 추천 직후", "첫 스마트폰 결제"], evidence: "유입 시점." },
      where: { tags: ["카카오톡", "은행 앱"], evidence: "결제 접점." },
      why:   { tags: ["15% 체감 할인"], evidence: "최대 할인율." },
      how:   { tags: ["부모님 간편결제 추천 콘텐츠"], evidence: "자녀→부모 타겟." },
    },
    shortformIdeas: ["카카오페이 쓸 때 15% 돌려받는 카드", "간편결제 할 때마다 할인받는 법", "아버지 카카오페이 시작했는데 이 카드 추천"],
  },
  {
    id: "need-2", category: "need", subgroup: "NEED Pay: 디지털 결제 생활자", card: "PAY", level: "MEGA",
    icon: "🎬", title: "ALL보다 3배 높은 OTT 할인이 필요한 구독 헤비유저",
    usp: "디지털콘텐츠 30%",
    hookType: "Maximum-hook", hookLabel: "최대 할인",
    strategyCopy: "ALL OTT 10% vs NEED Pay 30% = 3배 차이. 구독 3개 이상이면 확실히 이득.",
    monthlyVol: 9900000, annualVol: 118800000,
    peakMonths: [70, 65, 60, 55, 60, 65, 70, 75, 70, 80, 85, 90], peakSeason: "연말",
    demographics: "30-40대",
    keyInsight: "OTT 헤비유저에게 최대 할인 포지셔닝.",
    pathJourney: ["OTT 구독료", "넷플릭스 싸게", "OTT 최대 할인", "NEED Pay", "카드 발급"],
    pathInsight: "ALL vs NEED Pay 비교 → 헤비유저 선택.",
    clusterInsight: "OTT 클러스터에서 '최대 할인' 노드가 경쟁 부재.",
    topKeywords: [
      { keyword: "넷플릭스", vol: 6800000 },
      { keyword: "유튜브 프리미엄", vol: 2100000 },
      { keyword: "티빙", vol: 580000 },
      { keyword: "디즈니플러스", vol: 320000 },
      { keyword: "OTT 30%", vol: 1200 },
    ],
    contentHook: "OTT 3개 이상 구독 중이면 이 카드",
    dataProof: "ALL 10% vs NEED Pay 30% = 3배. OTT 4개 기준 연 15만원 차이.",
    painPoints: ["OTT 구독료가 너무 많다", "최대 할인이 필요하다"],
    uspConnection: "NEED Pay 디지털콘텐츠 30%",
    context: {
      who:   { tags: ["OTT 헤비유저", "30-40대"], evidence: "구독 3개+ 가구." },
      what:  { tags: ["최대 할인", "통합 결제"], evidence: "30% 할인율." },
      when:  { tags: ["월말 결제일", "가격 인상 시"], evidence: "결제 주기." },
      where: { tags: ["OTT 앱 결제 페이지"], evidence: "결제 접점." },
      why:   { tags: ["3배 할인"], evidence: "ALL 대비." },
      how:   { tags: ["ALL vs NEED Pay 비교", "OTT 4개 계산법"], evidence: "비교 콘텐츠." },
    },
    shortformIdeas: ["OTT 3개 이상 구독 중이면 이 카드", "넷플릭스+유튜브+디즈니 30% 할인 계산해봤다", "ALL 10% vs NEED Pay 30%, 뭐가 이득?"],
  },
  {
    id: "need-3", category: "need", subgroup: "NEED Pay: 디지털 결제 생활자", card: "PAY", level: "NICHE",
    icon: "👗", title: "무신사·W컨셉에서 쇼핑하는 10-20대",
    usp: "온라인패션몰 5%",
    hookType: "GenZ-hook", hookLabel: "Z세대 침투",
    strategyCopy: "무신사 할부 10-20대 76%. NEED Pay의 유일한 '젊은 층' 침투 자산.",
    monthlyVol: 97, annualVol: 1164,
    peakMonths: [80, 75, 80, 80, 75, 70, 70, 75, 85, 85, 85, 85], peakSeason: "환절기",
    demographics: "10-20대 76%",
    keyInsight: "NEED Pay의 유일한 Z세대 진입로.",
    pathJourney: ["무신사", "W컨셉", "온라인 패션 할인", "무신사 할부", "카드 발급"],
    pathInsight: "쇼핑 → 할부 고민 → 카드.",
    clusterInsight: "온라인 패션 클러스터에 카드 노드 거의 없음.",
    topKeywords: [
      { keyword: "무신사", vol: 580000 },
      { keyword: "W컨셉", vol: 85000 },
      { keyword: "무신사 할부", vol: 97 },
      { keyword: "온라인 패션", vol: 32000 },
    ],
    contentHook: "무신사 결제할 때 5% 더 아끼는 법",
    dataProof: "무신사 할부 10-20대 76%.",
    painPoints: ["할부 카드 비교 어렵다", "학생은 혜택 받기 힘들다"],
    uspConnection: "NEED Pay 온라인 패션몰 5% + 간편결제 15%",
    context: {
      who:   { tags: ["10-20대", "Z세대 쇼핑객"], evidence: "76% 점유." },
      what:  { tags: ["할부 할인", "패션 쇼핑"], evidence: "할부 수요 높음." },
      when:  { tags: ["환절기", "신학기"], evidence: "쇼핑 피크." },
      where: { tags: ["무신사 앱", "W컨셉"], evidence: "결제 접점." },
      why:   { tags: ["학생 혜택"], evidence: "젊은 층 진입." },
      how:   { tags: ["무신사 쇼핑 팁", "학생 카드 추천"], evidence: "Z세대 콘텐츠." },
    },
    shortformIdeas: ["무신사 결제할 때 5% 더 아끼는 법", "패션 앱 쇼핑 할인 카드 비교"],
  },
  {
    id: "need-4", category: "need", subgroup: "NEED Autoslim: 자동차 소유자", card: "AUTO", level: "MEDIUM",
    icon: "🔋", title: "전기차 충전카드를 비교하는 신규 EV 오너",
    usp: "주유소/충전소 5%",
    hookType: "Hidden-hook", hookLabel: "숨은 자산",
    strategyCopy: "전기차 충전카드 +555% 폭발 성장. 소비자는 'EV 전용카드'만 인지. Autoslim이 충전소 5% 커버하는 걸 모름.",
    monthlyVol: 15033, annualVol: 180396,
    peakMonths: [60, 65, 70, 75, 80, 85, 90, 90, 85, 80, 75, 70], peakSeason: "봄·여름",
    demographics: "남 72% · 40대 41%",
    keyInsight: "Autoslim이 충전소를 커버한다는 사실 자체를 모름.",
    pathJourney: ["전기차 충전카드", "환경부 카드", "신한 EV", "EV 할인카드", "Autoslim"],
    pathInsight: "EV 전용카드 비교 → Autoslim 발견 경로 부재.",
    clusterInsight: "EV 충전 클러스터에 KB Autoslim 노드 부재.",
    topKeywords: [
      { keyword: "전기차 충전카드", vol: 8500 },
      { keyword: "환경부 카드", vol: 3200 },
      { keyword: "신한 EV", vol: 2800 },
      { keyword: "삼성 ID EV", vol: 1500 },
      { keyword: "EV 할인", vol: 1200 },
    ],
    contentHook: "전기차 충전카드 비교했는데 의외의 카드가",
    dataProof: "EV 충전카드 +555% 성장. 남 72%, 40대 41%.",
    painPoints: ["EV 전용카드만 있는 줄 알았다", "일반 카드는 EV 할인 안 되는 줄 알았다"],
    uspConnection: "NEED Autoslim 주유/충전소 5% (전기차 충전 포함)",
    context: {
      who:   { tags: ["40대 남성", "신규 EV 오너"], evidence: "남 72%, 40대 41%." },
      what:  { tags: ["충전 할인", "통합 카드"], evidence: "EV 전환층." },
      when:  { tags: ["신차 구매 직후"], evidence: "전환기." },
      where: { tags: ["EV 커뮤니티", "환경부 앱"], evidence: "정보 접점." },
      why:   { tags: ["숨은 혜택", "일반 카드로 EV"], evidence: "인지 공백." },
      how:   { tags: ["EV 전용카드 vs 일반카드", "Autoslim 숨은 혜택"], evidence: "인지 전환 콘텐츠." },
    },
    shortformIdeas: ["전기차 충전카드 비교했는데 의외의 카드가", "EV 전용카드 vs 일반카드 충전 할인 비교", "전기차 충전+할부+보험 한 장으로"],
  },
  {
    id: "need-5", category: "need", subgroup: "NEED Autoslim: 자동차 소유자", card: "AUTO", level: "LARGE",
    icon: "🛡️", title: "자동차보험 비교하면서 \"카드 할인\"은 생각도 못하는 사람",
    usp: "자동차보험 2만원 청구할인",
    hookType: "Blind-hook", hookLabel: "완전 블루오션",
    strategyCopy: "자동차보험 비교(CPC $10.55)가 가장 비싼 광고시장. 매달 79,500명이 비교하면서 '카드로 2만원 할인'을 아예 모름.",
    monthlyVol: 82343, annualVol: 988116,
    peakMonths: [85, 80, 75, 75, 75, 75, 75, 75, 80, 85, 85, 90], peakSeason: "갱신 시즌",
    demographics: "남 61% · 30-40대 64%",
    keyInsight: "완전한 인지 공백. 카드 할인 옵션이 여정에 부재.",
    pathJourney: ["자동차보험 비교", "보험다모아", "다이렉트 보험", "보험료 절약", "NEED Autoslim"],
    pathInsight: "비교 여정에 카드 노드가 0개.",
    clusterInsight: "자동차보험 클러스터에 '카드 할인' 노드 부재.",
    topKeywords: [
      { keyword: "자동차보험 비교", vol: 45000 },
      { keyword: "보험다모아", vol: 28000 },
      { keyword: "다이렉트 보험", vol: 18000 },
      { keyword: "자동차보험 갱신", vol: 12000 },
      { keyword: "보험료 절약", vol: 8500 },
    ],
    contentHook: "자동차보험 비교할 때 놓치는 한 가지",
    dataProof: "월 79,500명 보험 비교. 카드 할인 개념 인지 0%.",
    painPoints: ["보험료가 오른다", "어떤 보험이 제일 싼지 모른다"],
    uspConnection: "NEED Autoslim 자동차보험 2만원 청구할인",
    context: {
      who:   { tags: ["30-40대 남성", "자동차 소유자"], evidence: "남 61%." },
      what:  { tags: ["보험료 절감", "갱신 시 할인"], evidence: "2만원 고정 할인." },
      when:  { tags: ["갱신 1개월 전", "사고 후"], evidence: "갱신 시즌." },
      where: { tags: ["보험다모아", "보험사 앱"], evidence: "비교 접점." },
      why:   { tags: ["카드만 바꿔도 2만원"], evidence: "무노력 할인." },
      how:   { tags: ["보험 비교할 때 놓치는 것", "보험다모아 안 알려주는 팁"], evidence: "인지 확장 콘텐츠." },
    },
    shortformIdeas: ["자동차보험 비교할 때 놓치는 한 가지", "보험 갱신할 때 결제 카드만 바꿔도 2만원", "보험다모아에서 안 알려주는 절약 팁"],
  },
  {
    id: "need-6", category: "need", subgroup: "NEED Autoslim: 자동차 소유자", card: "AUTO", level: "MEDIUM",
    icon: "⛽", title: "주유비를 매달 내는 내연기관 차량 소유자",
    usp: "주유소/충전소 5%",
    hookType: "Compare-hook", hookLabel: "YOU vs Autoslim",
    strategyCopy: "YOU 일상팩(10%) vs Autoslim(5%). 주유만 보면 YOU, 자동차 전체 비용이면 Autoslim.",
    monthlyVol: 42510, annualVol: 510120,
    peakMonths: [70, 70, 75, 80, 85, 90, 95, 95, 85, 75, 70, 70], peakSeason: "여름",
    demographics: "남 70% · 40대 38%",
    keyInsight: "주유 단일 vs 자동차 통합의 선택.",
    pathJourney: ["주유 할인카드", "자동차 유지비", "NEED Autoslim vs YOU", "카드 발급"],
    pathInsight: "주유 카드 비교 → 통합 관리 선택.",
    clusterInsight: "자동차 유지비 클러스터에 통합 카드 노드 필요.",
    topKeywords: [
      { keyword: "주유소 가격", vol: 32000 },
      { keyword: "기름값", vol: 2500 },
      { keyword: "자동차 유지비", vol: 5500 },
      { keyword: "주유 할인카드", vol: 1800 },
    ],
    contentHook: "주유 할인만 보면 YOU, 자동차 전체 비용이면 NEED",
    dataProof: "주유소 가격 +1,623% 성장.",
    painPoints: ["카드가 여러 장이면 복잡"],
    uspConnection: "NEED Autoslim 주유+보험+할부 통합",
    context: {
      who:   { tags: ["40대 남성", "내연기관 소유자"], evidence: "남 70%." },
      what:  { tags: ["주유+보험 통합", "자동차 전체 관리"], evidence: "자동차 유지비." },
      when:  { tags: ["여름 피크"], evidence: "주유 피크." },
      where: { tags: ["주유소", "보험사"], evidence: "다접점." },
      why:   { tags: ["한 장 통합"], evidence: "편의성." },
      how:   { tags: ["YOU vs NEED 주유 비교"], evidence: "카드 비교 콘텐츠." },
    },
    shortformIdeas: ["주유 할인만 보면 YOU, 자동차 전체 비용이면 NEED", "자동차 유지비 총정리 — 할부+주유+보험 한 장"],
  },
  {
    id: "need-7", category: "need", subgroup: "NEED Autoslim: 자동차 소유자", card: "AUTO", level: "NICHE",
    icon: "🚗", title: "자동차 할부금을 내고 있는 신차 구매자",
    usp: "오토 슬림 할부 최대 2만원",
    hookType: "Purchase-hook", hookLabel: "신차 구매",
    strategyCopy: "할부+주유+보험 = 자동차 3대 고정비. NEED Autoslim 한 장으로 연 최대 48만원 할인.",
    monthlyVol: 663, annualVol: 7956,
    peakMonths: [70, 70, 80, 80, 75, 70, 70, 70, 75, 80, 80, 75], peakSeason: "봄·가을",
    demographics: "남 61% · 30대 47%",
    keyInsight: "자동차 3대 고정비를 한 장으로.",
    pathJourney: ["신차 구매", "자동차 할부", "할부 카드", "자동차 카드 추천"],
    pathInsight: "신차 구매 → 할부 방법 → 카드.",
    clusterInsight: "신차 구매 클러스터에 '할부 할인카드' 노드 약함.",
    topKeywords: [
      { keyword: "자동차 할부", vol: 3200 },
      { keyword: "신차 구매", vol: 8500 },
      { keyword: "차 할부", vol: 1800 },
    ],
    contentHook: "신차 할부 낼 때 이 카드 쓰면 2만원 할인",
    dataProof: "할부+주유+보험 연 48만원 할인 가능.",
    painPoints: ["자동차 비용이 너무 많다"],
    uspConnection: "NEED Autoslim 할부+주유+보험",
    context: {
      who:   { tags: ["30대 남성", "신차 구매자"], evidence: "남 61%, 30대 47%." },
      what:  { tags: ["3대 비용 통합"], evidence: "할부+주유+보험." },
      when:  { tags: ["신차 구매 직후"], evidence: "구매 시점." },
      where: { tags: ["자동차 대리점", "은행"], evidence: "구매 접점." },
      why:   { tags: ["한 장 해결"], evidence: "편의성." },
      how:   { tags: ["신차 구매 할인 총정리"], evidence: "구매 가이드." },
    },
    shortformIdeas: ["신차 할부 낼 때 이 카드 쓰면 2만원 할인", "자동차 3대 고정비 한 장으로 줄이기"],
  },
  {
    id: "need-8", category: "need", subgroup: "NEED Edu: 교육+생활", card: "EDU", level: "NICHE",
    icon: "📚", title: "학원비를 조회하지만 \"할인\"은 검색하지 않는 40대 엄마",
    usp: "교육업종 5~10%",
    hookType: "Context-hook", hookLabel: "가이드 침투",
    strategyCopy: "학원비 여정 200개 경로 중 '할인' 경로 0개. 절약이 아니라 조회/비교. 학원 선택 가이드 안에 침투.",
    monthlyVol: 2553, annualVol: 30636,
    peakMonths: [75, 85, 85, 80, 75, 70, 65, 75, 85, 80, 75, 75], peakSeason: "학기 초",
    demographics: "여 80% · 40대 53%",
    keyInsight: "학원비 여정에 '할인' 개념 자체가 없음.",
    pathJourney: ["학원비", "학원비 알리미", "학원 추천", "학원 선택"],
    pathInsight: "학원 선택 가이드 안에서 결제 팁으로 침투.",
    clusterInsight: "학원비 클러스터는 '조회'와 '비교' 중심. '할인' 노드 완전 부재.",
    topKeywords: [
      { keyword: "학원비", vol: 8500 },
      { keyword: "학원비 알리미", vol: 4200 },
      { keyword: "대치동 학원비", vol: 2800 },
      { keyword: "학원 추천", vol: 12000 },
      { keyword: "초등 영어학원", vol: 18000 },
    ],
    contentHook: "학원비 비교할 때 몰랐던 한 가지",
    dataProof: "학원비 여정 200개 경로 중 할인 0개.",
    painPoints: ["학원비가 너무 부담", "어떤 학원이 좋은지 모른다"],
    uspConnection: "NEED Edu 교육업종 5~10%",
    context: {
      who:   { tags: ["40대 엄마", "학부모"], evidence: "여 80%, 40대 53%." },
      what:  { tags: ["학원비 절감", "가이드 안 침투"], evidence: "월 100만원 학원비 가정." },
      when:  { tags: ["학기 초", "방학 전"], evidence: "등록 시기." },
      where: { tags: ["학원비 알리미", "맘카페"], evidence: "정보 접점." },
      why:   { tags: ["매월 고정 지출"], evidence: "연 120만원+." },
      how:   { tags: ["학원 선택 가이드", "대치동 학원비 절약"], evidence: "간접 침투." },
    },
    shortformIdeas: ["학원비 비교할 때 몰랐던 한 가지", "대치동 학원비 월 100만원, 10% 돌려받으면", "학원비 조회는 하면서 할인은 왜 안 찾을까"],
  },
  {
    id: "need-9", category: "need", subgroup: "NEED Edu: 교육+생활", card: "EDU", level: "MEDIUM",
    icon: "💊", title: "병원·약국·커피를 매일 이용하는 생활 소비자",
    usp: "생활영역 5%",
    hookType: "Necessity-hook", hookLabel: "비자발 지출",
    strategyCopy: "병원·약국은 비자발적 지출이라 카드 할인의 체감 가치가 높음.",
    monthlyVol: 27945, annualVol: 335340,
    peakMonths: [85, 80, 75, 75, 75, 75, 80, 85, 85, 80, 80, 85], peakSeason: "환절기",
    demographics: "여 59% · 30-40대",
    keyInsight: "'아프면 어차피 가야 한다' = 자연스러운 할인 수요.",
    pathJourney: ["소아과 예약", "약국 할인", "병원비 카드", "NEED Edu 발급"],
    pathInsight: "병원 방문 → 약국 결제 → 할인 탐색.",
    clusterInsight: "병원·약국 클러스터에 카드 노드 약함.",
    topKeywords: [
      { keyword: "소아과 예약", vol: 12000 },
      { keyword: "약국 할인", vol: 3500 },
      { keyword: "스타벅스 신메뉴", vol: 27343 },
      { keyword: "병원비", vol: 5800 },
    ],
    contentHook: "병원비도 카드로 5% 할인 되는 거 알아?",
    dataProof: "여 59%, 30-40대. 소아과+약국 루틴.",
    painPoints: ["병원비가 부담", "아이 자주 아프다"],
    uspConnection: "NEED Edu 생활영역 5% (병원+약국+카페)",
    context: {
      who:   { tags: ["30-40대 여성", "엄마"], evidence: "여 59%." },
      what:  { tags: ["생활비 절감"], evidence: "매달 병원." },
      when:  { tags: ["환절기", "매주"], evidence: "반복 소비." },
      where: { tags: ["병원", "약국", "스타벅스"], evidence: "생활 접점." },
      why:   { tags: ["비자발 지출", "5% 체감"], evidence: "매월 반복." },
      how:   { tags: ["소아과 엄마 카드 추천"], evidence: "엄마 타겟 콘텐츠." },
    },
    shortformIdeas: ["병원비도 카드로 5% 할인 되는 거 알아?", "소아과 다니는 엄마를 위한 카드", "약국+병원+카페 다 5% 할인"],
  },
  // NEED 교차 3개
  {
    id: "need-10", category: "need", subgroup: "교차 인사이트", card: "AUTO", level: "NICHE", isInsight: true,
    icon: "⚡", title: "전기차 충전카드 시장 폭발(+555%) — Autoslim의 숨은 자산",
    usp: "숨은 자산 전략",
    hookType: "Awareness-hook", hookLabel: "인지 전환",
    strategyCopy: "소비자는 '전기차 전용카드'(신한EV, 삼성ID EV)만 인지. Autoslim이 충전소 커버를 모름.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [65, 70, 75, 80, 85, 90, 90, 90, 85, 80, 75, 70], peakSeason: "봄·여름",
    demographics: "남 72% · 40대",
    keyInsight: "숨은 자산의 발견.",
    pathJourney: ["전기차 충전카드", "EV 전용카드", "일반카드 vs EV카드"],
    pathInsight: "전용카드 중심 인지를 일반카드로 확장.",
    clusterInsight: "EV 충전 클러스터의 카드 노드가 '전용'에 편중.",
    topKeywords: [{ keyword: "전기차 충전카드", vol: 8500 }, { keyword: "환경부 카드", vol: 3200 }],
    contentHook: "전기차 전용카드 말고 이것도 충전 할인 된다",
    dataProof: "EV 충전카드 +555% 성장.",
    painPoints: ["전용카드만 있는 줄 알았다"],
    uspConnection: "NEED Autoslim 충전소 5%",
    context: {
      who:   { tags: ["EV 오너", "40대"], evidence: "남 72%." },
      what:  { tags: ["인지 전환"], evidence: "전용→일반카드." },
      when:  { tags: ["신차 구매 후"], evidence: "전환기." },
      where: { tags: ["EV 커뮤니티"], evidence: "정보 접점." },
      why:   { tags: ["이미 가진 카드로"], evidence: "편의성." },
      how:   { tags: ["숨은 자산 소개"], evidence: "인지 콘텐츠." },
    },
    shortformIdeas: ["전기차 전용카드 말고 이것도 충전 할인 된다"],
  },
  {
    id: "need-11", category: "need", subgroup: "교차 인사이트", card: "AUTO", level: "NICHE", isInsight: true,
    icon: "⚡", title: "자동차보험 비교 여정에 \"카드 할인\" 개념이 존재하지 않는다",
    usp: "블루오션 전략",
    hookType: "Gap-hook", hookLabel: "인지 공백",
    strategyCopy: "매달 79,500명 보험 비교. 연 95만 번 검색에서 '카드로 2만원 할인'이 인식 바깥.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [85, 80, 75, 75, 75, 75, 75, 75, 80, 85, 85, 90], peakSeason: "갱신기",
    demographics: "남 61% · 30-40대",
    keyInsight: "완전한 인지 공백 = 완전한 블루오션.",
    pathJourney: ["자동차보험 비교", "보험다모아", "다이렉트"],
    pathInsight: "비교 여정에 카드 노드 0개.",
    clusterInsight: "자동차보험 클러스터에 카드 노드 부재.",
    topKeywords: [{ keyword: "자동차보험 비교", vol: 45000 }],
    contentHook: "자동차보험 비교할 때 모두가 놓치는 것",
    dataProof: "연 95만 검색에 카드 할인 인지 0.",
    painPoints: ["카드만 바꿔도 되는 줄 몰랐다"],
    uspConnection: "NEED Autoslim 보험 2만원",
    context: {
      who:   { tags: ["30-40대 남성"], evidence: "남 61%." },
      what:  { tags: ["인지 공백"], evidence: "카드 노드 부재." },
      when:  { tags: ["갱신 시즌"], evidence: "연 1회." },
      where: { tags: ["보험 비교 사이트"], evidence: "공백 접점." },
      why:   { tags: ["무노력 할인"], evidence: "카드만 바꾸면 됨." },
      how:   { tags: ["비교할 때 놓치는 것"], evidence: "인지 확장." },
    },
    shortformIdeas: ["자동차보험 비교할 때 모두가 놓치는 것"],
  },
  {
    id: "need-12", category: "need", subgroup: "교차 인사이트", card: "EDU", level: "NICHE", isInsight: true,
    icon: "⚡", title: "학원비 여정 200개 경로에 \"할인\"이 단 하나도 없다",
    usp: "진입 전략",
    hookType: "Indirect-hook", hookLabel: "간접 침투",
    strategyCopy: "'학원비 할인카드'라고 소구해도 그 검색을 안 함. '학원 선택 가이드' 콘텐츠 안에 침투.",
    monthlyVol: 0, annualVol: 0,
    peakMonths: [75, 85, 85, 80, 75, 70, 65, 75, 85, 80, 75, 75], peakSeason: "학기 초",
    demographics: "여 80% · 40대",
    keyInsight: "직접 소구 불가 = 간접 침투 전략.",
    pathJourney: ["학원비 알리미", "학원 추천", "선택 가이드"],
    pathInsight: "학원 선택 콘텐츠 내부에 결제 팁 삽입.",
    clusterInsight: "학원비 클러스터는 '가이드'가 허브. 카드는 '결제 팁'으로 진입.",
    topKeywords: [{ keyword: "학원 추천", vol: 12000 }],
    contentHook: "학원 선택 가이드 — 결제는 이 카드로",
    dataProof: "학원비 여정 200개 경로 중 할인 0.",
    painPoints: ["할인카드를 검색조차 안 한다"],
    uspConnection: "NEED Edu 교육 5~10%",
    context: {
      who:   { tags: ["40대 엄마"], evidence: "여 80%." },
      what:  { tags: ["간접 침투"], evidence: "직접 검색 부재." },
      when:  { tags: ["학기 초"], evidence: "등록 시기." },
      where: { tags: ["맘카페", "학원비 알리미"], evidence: "엄마 접점." },
      why:   { tags: ["선택 가이드 내 자연 노출"], evidence: "콘텐츠 침투." },
      how:   { tags: ["학원 가이드 콘텐츠", "맘카페 협업"], evidence: "간접 침투." },
    },
    shortformIdeas: ["학원 선택 가이드 — 결제는 이 카드로"],
  },
];

const CATEGORIES = {
  all: {
    key: "all", label: "A · 5 페르소나", title: "ALL 카드",
    tagline: "고민없이 받는 혜택 — 365일 쓰는 카드",
    color: "#2563EB", icons: ["🛒", "🎬", "✈️", "📶", "💳"],
    headerMeta: "연회비 2만원 · 전월 40만+ · 가족카드 무료",
    uspPills: ["국내 1%", "해외 2%", "쇼핑멤버십 50%", "OTT 10%", "통신 5%"],
    whyTitle: "실적 피로 없는 '정착의 카드'",
    whyDescription: "7년간 카드 갈아탄 체리피커도 결국 돌아오는 곳. 매월 실적 체크 스트레스 없이 '한 장으로 365일' 쓸 수 있는 상시 혜택 구조가 ALL 카드의 정체성.",
    coreValueProps: [
      { title: "조건 없는 1%", description: "국내 모든 가맹점 · 전월 실적·월 한도 無" },
      { title: "365일 · 5개 영역", description: "쇼핑멤버십·OTT·통신·해외·일상 필수 5축 커버" },
      { title: "가족 확장", description: "가족카드 무료 · 최대 5장까지 · 실적 합산 가능" }
    ],
  },
  you: {
    key: "you", label: "B · 2 팩", title: "YOU Prime 카드",
    tagline: "나에게 딱 맞춘 혜택 — 일상팩·가족팩",
    color: "#7C3AED", icons: ["⛽", "💪", "🛒", "☕", "🏠"],
    headerMeta: "연회비 3만원 · 전월 40만+ · 가족카드 7,000원",
    uspPills: ["주유 10%", "배달 10%", "자기관리 5%", "장보기 10%", "카페 5%"],
    whyTitle: "3세대를 잇는 가족 재무 관리",
    whyDescription: "일상 루틴(주유·배달·자기관리)과 가족 확장(장보기·학원·돌봄)을 두 팩으로 분리해 '나의 하루'와 '우리 집'을 모두 커버. 맞벌이·반려동물·하이퍼로컬까지 포함.",
    coreValueProps: [
      { title: "일상팩 4축 + 하이퍼로컬", description: "주유·배달·자기관리·고정비 + 반경 500m" },
      { title: "가족팩 4축", description: "장보기·돌봄·학원·유틸리티 통합" },
      { title: "또 다른 가족", description: "반려동물 사료·병원·펫보험 포함" }
    ],
  },
  need: {
    key: "need", label: "C · 3 카드", title: "NEED 카드",
    tagline: "Pay·Autoslim·Edu 특화 기회",
    color: "#DC2626", icons: ["📱", "🔋", "🛡️", "📚", "💊"],
    multiColor: ["#059669", "#D97706", "#DC2626"],
    headerMeta: "NEED Pay (1.9만) · NEED Autoslim (2만) · NEED Edu (2.5만)",
    uspPills: ["간편결제 15%", "OTT 30%", "충전소 5%", "보험 2만원", "교육 10%"],
    whyTitle: "생애 특정 순간에 최적화",
    whyDescription: "일상 혜택이 아닌 '특정 상황·시기'에 압도적 환급. Pay(간편결제)·Autoslim(자동차)·Edu(교육) 3개 축으로 생애 이벤트 중심 구성. 연 2.85억 검색 기반 최대 기회.",
    coreValueProps: [
      { title: "Pay · 15% 간편결제", description: "네이버·쿠팡·구독 + 해외 크로스보더" },
      { title: "Autoslim · 주유·자동차", description: "주유 5% + 신차·정비·보험 통합" },
      { title: "Edu · 자녀교육·자기계발", description: "학원·리스킬링·자격증 최대 10%" }
    ],
  },
};

const STEPS_LABEL = ["기회 발견", "기회 분석", "AI 아이디어", "스토리보드"];
const VIEW_STEP = { hub: -1, category: 0, analysis: 1, ideas: 2, storyboard: 3 };

// Phase 10-2: 6박스 재배치 + 재명명 (스토리 흐름 — WHO → WHEN → JOURNEY → PAIN → USP FIT → HOOK)
const AXIS_CFG = [
  { key: "who",   icon: "👤", label: "WHO",      sub: "누가 검색하는가?",           color: "#0770E3" },
  { key: "when",  icon: "📅", label: "WHEN",     sub: "언제 검색하는가?",           color: "#10B981" },
  { key: "where", icon: "🔍", label: "JOURNEY",  sub: "어떤 경로로 검색하는가?",    color: "#8B5CF6" },
  { key: "why",   icon: "😣", label: "PAIN",     sub: "소비자의 고통은?",           color: "#D97706" },
  { key: "what",  icon: "🔗", label: "USP FIT",  sub: "이 카드가 해결할 수 있는 것", color: "#FF6B00" },
  { key: "how",   icon: "🎣", label: "HOOK",     sub: "콘텐츠 진입점",              color: "#EF4444" },
];

// ══════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════
export default function Home() {
  const [currentView, setCurrentView] = useState("hub");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [needSubCard, setNeedSubCard] = useState(null); // "edu" | "pay" | "autoslim"
  const [youSubCard, setYouSubCard] = useState(null);   // "daily" | "family"
  const [openPersona, setOpenPersona] = useState("P1");  // ALL 카드 첫 페르소나만 기본 펼침
  const [aiIdeas, setAiIdeas] = useState({}); // { [oppId::perspective]: { loading, error, ideas } }
  const [ideasTab, setIdeasTab] = useState("auto"); // "auto" | "context" | "journey" | "cross"
  const [selectedIdea, setSelectedIdea] = useState(null); // Phase 12-8 storyboard
  const [storyboards, setStoryboards] = useState({}); // { [oppId::ideaId]: { loading, error, data } }
  const [ytCreators, setYtCreators] = useState({}); // { [oppId]: { loading, error, channels } }

  const activeStep = VIEW_STEP[currentView] ?? 0;
  const showStepIndicator = currentView !== "hub";

  const goToCategory  = (cat) => { setCurrentCategory(cat); setNeedSubCard(null); setYouSubCard(null); setCurrentView("category"); };
  const goToAnalysis  = (opp) => { setSelectedOpp(opp); setCurrentView("analysis"); };
  const goToIdeas     = () => {
    setCurrentView("ideas");
    const key = selectedOpp ? `${selectedOpp.id}::auto` : null;
    if (selectedOpp && !aiIdeas[key]?.ideas && !aiIdeas[key]?.loading) {
      generateIdeas(selectedOpp, "auto");
    }
  };

  // Phase 12-8: 스토리보드 생성
  const generateStoryboard = async (opp, idea) => {
    if (!opp || !idea) return;
    const key = `${opp.id}::${idea.id}`;
    setStoryboards(prev => ({ ...prev, [key]: { loading: true, error: null, data: null } }));
    try {
      const res = await fetch("/api/storyboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunity: opp, idea,
          cardMeta: { cardName: CARDS[opp.card]?.name || opp.card, cardTagline: CARDS[opp.card]?.tagline || "" },
          persona: opp._persona || {},
        }),
      });
      const text = await res.text();
      let result;
      try { result = JSON.parse(text); }
      catch {
        if (res.status === 504 || /timeout|timed out/i.test(text)) throw new Error("생성 시간 초과 (Vercel 60초 제한). 다시 시도해주세요.");
        if (res.status >= 500) throw new Error(`서버 오류 (${res.status})`);
        throw new Error(`응답 파싱 실패: ${text.substring(0, 120)}`);
      }
      if (!result.success) throw new Error(result.error || "생성 실패");
      setStoryboards(prev => ({ ...prev, [key]: { loading: false, error: null, data: result.data } }));
    } catch (e) {
      setStoryboards(prev => ({ ...prev, [key]: { loading: false, error: e.message, data: null } }));
    }
  };

  // YouTube 크리에이터 검색
  const searchYouTubeCreators = async (oppId, query) => {
    if (!oppId || !query) return;
    setYtCreators(prev => ({ ...prev, [oppId]: { loading: true, error: null, channels: null } }));
    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(query)}&maxResults=6`);
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "검색 실패");
      setYtCreators(prev => ({ ...prev, [oppId]: { loading: false, error: null, channels: result.channels || [] } }));
    } catch (e) {
      setYtCreators(prev => ({ ...prev, [oppId]: { loading: false, error: e.message, channels: null } }));
    }
  };

  const generateIdeas = async (opp, perspective = "auto") => {
    if (!opp || !opp.id) return;
    const key = `${opp.id}::${perspective}`;
    setAiIdeas(prev => ({ ...prev, [key]: { loading: true, error: null, ideas: null } }));
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunity: opp,
          cardMeta: { cardName: CARDS[opp.card]?.name || opp.card, cardTagline: CARDS[opp.card]?.tagline || "" },
          persona: opp._persona || {},
          perspective,
        }),
      });
      // 응답이 JSON이 아닐 수 있음 (Vercel 타임아웃 등)
      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        // 비-JSON 응답 — 상태코드와 본문으로 에러 판정
        if (res.status === 504 || /timeout|timed out/i.test(text)) {
          throw new Error("생성 시간 초과 (Vercel 60초 제한). 잠시 후 다시 시도해주세요.");
        }
        if (res.status >= 500) {
          throw new Error(`서버 오류 (${res.status}). 환경변수 또는 API 키를 확인해주세요.`);
        }
        throw new Error(`응답 파싱 실패: ${text.substring(0, 120)}`);
      }
      if (!result.success) throw new Error(result.error || "생성 실패");
      setAiIdeas(prev => ({ ...prev, [key]: { loading: false, error: null, ideas: result.data.ideas || [] } }));
    } catch (e) {
      setAiIdeas(prev => ({ ...prev, [key]: { loading: false, error: e.message, ideas: null } }));
    }
  };
  const goToNeedSub   = (sub) => { setNeedSubCard(sub); };
  const goToYouSub    = (sub) => { setYouSubCard(sub); };
  const goBack = () => {
    if (currentView === "storyboard") setCurrentView("ideas");
    else if (currentView === "ideas") setCurrentView("analysis");
    else if (currentView === "analysis") { setCurrentView("category"); setSelectedOpp(null); }
    else if (currentView === "category") {
      if (currentCategory === "need" && needSubCard) { setNeedSubCard(null); }
      else if (currentCategory === "you" && youSubCard) { setYouSubCard(null); }
      else { setCurrentView("hub"); setCurrentCategory(null); }
    }
  };
  const goHome = () => { setCurrentView("hub"); setCurrentCategory(null); setSelectedOpp(null); setSelectedIdea(null); setNeedSubCard(null); setYouSubCard(null); };

  const pill = (bg, color) => ({
    fontSize: 10, fontWeight: 600, color, background: bg,
    padding: "3px 10px", borderRadius: 8, display: "inline-block",
  });

  // ──────────── Hero (hub only) ────────────
  const Hero = () => {
    const totalOpps = getOpportunityCount() + autoslim.getOpportunityCount() + needpay.getOpportunityCount() + neededu.getOpportunityCount()
      + (youfamily.getOpportunityCount ? youfamily.getOpportunityCount() : youfamily.YOU_PRIME_FAMILY_OPPORTUNITIES.length)
      + (youdaily.getOpportunityCount ? youdaily.getOpportunityCount() : youdaily.YOU_PRIME_DAILY_OPPORTUNITIES.length);
    const totalAnnual = getTotalAnnualVolume()
      + autoslim.getTotalAnnualVolume() + needpay.getTotalAnnualVolume() + neededu.getTotalAnnualVolume()
      + (youfamily.getTotalAnnualVolume ? youfamily.getTotalAnnualVolume() : youfamily.YOU_PRIME_FAMILY_OPPORTUNITIES.reduce((s, o) => s + (o.annualVolume || 0), 0))
      + (youdaily.getTotalAnnualVolume ? youdaily.getTotalAnnualVolume() : youdaily.YOU_PRIME_DAILY_OPPORTUNITIES.reduce((s, o) => s + (o.annualVolume || 0), 0));
    const annualEok = (totalAnnual / 100000000).toFixed(1);

    return (
      <div style={{ marginBottom: 20 }}>
        {/* 상단 브랜드 스트립 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", marginBottom: 16,
          background: "#FFFFFF", borderRadius: 12,
          border: "1px solid #E5E7EB",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#FFFFFF",
              overflow: "hidden",
            }}>
              {/* kb-symbol.png는 KB국민카드 가로 로고 — 왼쪽 *b 심볼만 보이도록 크롭 */}
              <img
                src="/kb-symbol.png"
                alt="KB"
                style={{
                  height: 40,
                  width: "auto",
                  objectFit: "none",
                  objectPosition: "left center",
                  transform: "translateX(4px)",
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.text, lineHeight: 1.2 }}>
                KB <span style={{ color: "#FFB71B" }}>AI Brandformance</span> Engine
              </div>
              <div style={{ fontSize: 9, color: C.textSoft, letterSpacing: 2, fontWeight: 700, marginTop: 2 }}>
                ALGORITHM PERFORMANCE PLATFORM
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <WorkbenchLink />
            <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 600 }}>Pentacle × AI</div>
          </div>
        </div>

        {/* 메인 히어로 — 2단 그리드 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
        }}>
          {/* 좌측: 오렌지 그라디언트 브랜드 박스 */}
          <div style={{
            position: "relative", overflow: "hidden",
            borderRadius: 18, padding: "28px 26px",
            background: "linear-gradient(135deg, #FFB71B 0%, #F59E0B 100%)",
            color: "#1F2937",
            boxShadow: "0 8px 24px rgba(255, 183, 27, 0.35)",
          }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, opacity: 0.9, marginBottom: 10 }}>
                KB × PENTACLE
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.2, marginBottom: 8, letterSpacing: -0.5 }}>
                ALL·YOU·NEED
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
                AI Brandformance Engine
              </div>
              <div style={{ fontSize: 12, opacity: 0.92, lineHeight: 1.6, marginBottom: 18 }}>
                알고리즘을 타는 카드 숏폼전략
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "5px 11px", borderRadius: 20,
                  background: "rgba(255,255,255,0.2)",
                  fontSize: 11, fontWeight: 700,
                  backdropFilter: "blur(8px)",
                }}>
                  🎯 BRAND
                </span>
                <span style={{ opacity: 0.7, fontSize: 12 }}>×</span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "5px 11px", borderRadius: 20,
                  background: "rgba(255,255,255,0.2)",
                  fontSize: 11, fontWeight: 700,
                  backdropFilter: "blur(8px)",
                }}>
                  🛒 PERFORMANCE
                </span>
                <span style={{ opacity: 0.7, fontSize: 12 }}>=</span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "5px 12px", borderRadius: 20,
                  background: "rgba(255,255,255,0.3)",
                  fontSize: 11, fontWeight: 800,
                  backdropFilter: "blur(8px)",
                }}>
                  🚀 BRANDFORMANCE
                </span>
              </div>
            </div>
          </div>

          {/* 우측: 화이트 설명 박스 */}
          <div style={{
            borderRadius: 18, padding: "28px 26px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: C.textSoft, marginBottom: 10 }}>
              BRANDFORMANCE
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.text, lineHeight: 1.35, marginBottom: 4 }}>
              숏폼을 이용한 브랜드 퍼포먼스 전략으로
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#B45309", lineHeight: 1.35, marginBottom: 18 }}>
              소비자의 발견과 구매를 연결합니다
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { icon: "🎯", label: "브랜드 가치 전달" },
                { icon: "🔍", label: "검색 데이터 기반 발견" },
                { icon: "🛒", label: "발견→고려→구매 전환" },
              ].map((p, i) => (
                <div key={i} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 6, padding: "10px 4px",
                  background: "#FFF7ED",
                  borderRadius: 10,
                  border: "1px solid #FED7AA",
                }}>
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <span style={{ fontSize: 10, color: "#9A3412", fontWeight: 600, textAlign: "center", lineHeight: 1.3 }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 스탯 배지 */}
        <div style={{
          display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap",
        }}>
          <div style={{
            flex: 1, minWidth: 140, padding: "12px 16px",
            background: "#FFFFFF", borderRadius: 12,
            border: "1px solid #E5E7EB",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "linear-gradient(135deg, #DBEAFE, #BFDBFE)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>🎯</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#2563EB", lineHeight: 1 }}>{totalOpps}개</div>
              <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, marginTop: 2 }}>발견된 기회</div>
            </div>
          </div>
          <div style={{
            flex: 1, minWidth: 140, padding: "12px 16px",
            background: "#FFFFFF", borderRadius: 12,
            border: "1px solid #E5E7EB",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>🔍</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#059669", lineHeight: 1 }}>{annualEok}억+</div>
              <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, marginTop: 2 }}>연간 검색량</div>
            </div>
          </div>
          <div style={{
            flex: 1, minWidth: 140, padding: "12px 16px",
            background: "#FFFFFF", borderRadius: 12,
            border: "1px solid #E5E7EB",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>💳</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#D97706", lineHeight: 1 }}>5개</div>
              <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, marginTop: 2 }}>카드 라인</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ──────────── Step Indicator ────────────
  // Phase 12-6: Step Indicator 클릭 이동 활성화 (완료된 단계 클릭 가능)
  const goToStep = (stepIdx) => {
    // stepIdx: 0=category, 1=analysis, 2=ideas, 3=storyboard
    if (stepIdx > activeStep) return; // 미도달 단계는 이동 불가
    if (stepIdx === activeStep) return; // 현재 단계
    if (stepIdx === 0) {
      // 기회 발견: Hub (랜딩) 또는 Category
      if (currentCategory) {
        setCurrentView("category");
        setSelectedOpp(null);
      } else {
        goHome();
      }
    } else if (stepIdx === 1) {
      // 기회 분석 (Analysis)
      if (selectedOpp) setCurrentView("analysis");
    } else if (stepIdx === 2) {
      // AI 아이디어
      if (selectedOpp) setCurrentView("ideas");
    }
  };

  const StepIndicator = () => (
    <div style={{ background: "#FFFFFF", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 99 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center" }}>
        {STEPS_LABEL.map((s, i) => {
          const isCurrent = i === activeStep;
          const isCompleted = i < activeStep;
          const isClickable = (isCompleted || (i === 0 && currentView !== "hub")) && !isCurrent;
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{
                  flex: 1, height: 2,
                  background: i <= activeStep ? "#2563EB" : "#CBD5E1",
                  margin: "0 6px",
                }} />
              )}
              <div
                onClick={() => isClickable && goToStep(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  opacity: i <= activeStep ? 1 : 0.4,
                  cursor: isClickable ? "pointer" : (isCurrent ? "default" : "not-allowed"),
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => { if (isClickable) e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                title={isClickable ? `${s}으로 돌아가기` : (isCurrent ? "현재 단계" : "미도달")}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isCurrent ? "#2563EB" : isCompleted ? C.accent : "#CBD5E1",
                  color: i <= activeStep ? "#fff" : C.textSoft,
                  fontSize: 11, fontWeight: 800,
                  boxShadow: isCurrent ? "0 2px 6px rgba(37, 99, 235, 0.35)" : "none",
                  transform: isCurrent ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.2s",
                }}>{i + 1}</div>
                <span style={{
                  color: i <= activeStep ? C.text : C.textSoft,
                  fontSize: 11, fontWeight: isCurrent ? 800 : 600,
                  whiteSpace: "nowrap",
                  textDecoration: isClickable ? "none" : "none",
                }}>{s}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  // ──────────── BackNav ────────────
  const BackNav = ({ label }) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
      <span onClick={goBack} style={{ color: "#2563EB", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{label || "← 이전 단계"}</span>
      {currentView !== "hub" && <span onClick={goHome} style={{ color: C.textSoft, fontSize: 12, cursor: "pointer" }}>← 처음으로</span>}
    </div>
  );

  // ──────────── ShortformIdeaCard (AI 생성 결과) ────────────
  // Phase 12-7: ShortformIdeaCard — 트립닷컴 스타일 (점수 우측 + 가로 씬 + USP 앵커 + creatorCollab)
  const ShortformIdeaCard = ({ idea, index, cardColor = "#2563EB", tabColor = "#2563EB", perspectiveLabel = "" }) => {
    const hookStyle = {
      "공감형":   { bg: "#FEE2E2", fg: "#B91C1C", label: "🎭 공감형" },
      "궁금증형": { bg: "#FEF3C7", fg: "#92400E", label: "🎭 궁금증형" },
      "발견형":   { bg: "#DBEAFE", fg: "#1D4ED8", label: "🖋️ 발견형" },
      "경험담형": { bg: "#E0E7FF", fg: "#4338CA", label: "🎭 경험담형" },
      "반전형":   { bg: "#F3E8FF", fg: "#7C3AED", label: "🖋️ 반전형" },
    };
    const funnelLabels = {
      Awareness: "Dream", Consideration: "Plan", Decision: "Book", Loyalty: "Loyalty",
    };
    const hs = hookStyle[idea.hookType] || { bg: "#F3F4F6", fg: "#374151", label: idea.hookType || "숏폼" };
    const score = typeof idea.score === "number" ? idea.score : 85;
    const scoreColor = score >= 90 ? "#047857" : score >= 80 ? "#2563EB" : score >= 70 ? "#CA8A04" : "#6B7280";
    const funnelLabel = funnelLabels[idea.funnelStage] || "Dream";
    const rank = idea.id || (index + 1);

    const goToStoryboard = () => {
      // sessionStorage에 아이디어 저장 → 스토리보드 뷰에서 참조
      try {
        const saved = JSON.parse(sessionStorage.getItem("lastGeneratedIdeas") || "{}");
        if (!saved[selectedOpp.id]) saved[selectedOpp.id] = [];
        if (!saved[selectedOpp.id].find(i => (i.id || 0) === rank)) {
          saved[selectedOpp.id].push({ ...idea, id: rank });
        }
        sessionStorage.setItem("lastGeneratedIdeas", JSON.stringify(saved));
        sessionStorage.setItem("selectedStoryboardIdea", JSON.stringify({ oppId: selectedOpp.id, ideaId: rank }));
      } catch (e) { /* ignore */ }
      setSelectedIdea({ ...idea, id: rank });
      setCurrentView("storyboard");
    };

    return (
      <div style={{
        background: "#FFFFFF", borderRadius: 14,
        border: "1px solid #E5E7EB",
        borderLeft: `4px solid ${tabColor}`,
        padding: "18px 20px",
        display: "flex", alignItems: "flex-start", gap: 16,
      }}>
        {/* 번호 */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "#F3F4F6", color: "#374151",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, flexShrink: 0,
        }}>{rank}</div>

        {/* 본문 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 3태그 조합 */}
          <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }}>
            {perspectiveLabel && (
              <span style={{
                padding: "2px 8px", borderRadius: 4,
                background: `${tabColor}15`, color: tabColor,
                fontSize: 10, fontWeight: 800,
              }}>{perspectiveLabel}</span>
            )}
            <span style={{
              padding: "2px 8px", borderRadius: 4,
              background: hs.bg, color: hs.fg,
              fontSize: 10, fontWeight: 800,
            }}>{hs.label}</span>
            <span style={{
              padding: "2px 8px", borderRadius: 4,
              background: "#DBEAFE", color: "#1D4ED8",
              fontSize: 10, fontWeight: 800,
            }}>{funnelLabel}</span>
            {idea.duration && (
              <span style={{ fontSize: 10, color: C.textSoft }}>⏱️ {idea.duration}</span>
            )}
          </div>

          {/* 제목 */}
          <div style={{ fontSize: 16, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 10 }}>
            {idea.title}
          </div>

          {/* 타겟 키워드 */}
          {idea.targetKeyword && idea.targetKeyword.term && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: C.textSoft, fontWeight: 700 }}>🎯 타겟 키워드:</span>
              <span style={{
                padding: "3px 9px", borderRadius: 10,
                background: "#DBEAFE", color: "#1D4ED8",
                fontSize: 11, fontWeight: 700,
              }}>{idea.targetKeyword.term}</span>
              {idea.targetKeyword.volume > 0 && (
                <span style={{ fontSize: 10, color: C.textSoft }}>
                  (연 {idea.targetKeyword.volume.toLocaleString()}회)
                </span>
              )}
            </div>
          )}

          {/* USP 앵커 */}
          {idea.uspAnchor && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 10, fontSize: 11, color: "#374151", lineHeight: 1.5 }}>
              <span style={{ flexShrink: 0 }}>📇</span>
              <span>{idea.uspAnchor}</span>
            </div>
          )}

          {/* HOOK */}
          {idea.openingHook && (
            <div style={{
              padding: "10px 12px", marginBottom: 12, borderRadius: 8,
              background: "linear-gradient(135deg, #FFF7ED, #FEF3C7)",
              border: "1px solid #FDBA7440",
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#C2410C", marginBottom: 3 }}>✦ HOOK</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#7C2D12", lineHeight: 1.5, fontStyle: "italic" }}>
                "{idea.openingHook}"
              </div>
            </div>
          )}

          {/* 씬 플로우 가로 4개 박스 */}
          {idea.scenes && idea.scenes.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(idea.scenes.length, 5)}, 1fr)`,
              gap: 8, marginBottom: 12,
            }}>
              {idea.scenes.slice(0, 5).map((scene, i) => (
                <div key={i} style={{
                  padding: "8px 10px", borderRadius: 10,
                  background: "#F9FAFB", border: "1px solid #F3F4F6",
                  minHeight: 70,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: cardColor, marginBottom: 4 }}>
                    씬{i + 1}{scene.time ? ` · ${scene.time}` : ""}
                  </div>
                  <div style={{ fontSize: 10.5, color: C.text, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>
                    {scene.visual || scene.copy || ""}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 증명 */}
          {idea.proof && (
            <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 8, lineHeight: 1.5 }}>
              📊 <strong>증명:</strong> {idea.proof}
            </div>
          )}

          {/* 크리에이터 협업 */}
          {idea.creatorCollab && (
            <div style={{
              padding: "8px 12px", borderRadius: 8,
              background: "#EFF6FF", border: "1px solid #BFDBFE",
              fontSize: 11, color: "#1E40AF", lineHeight: 1.5,
              display: "flex", alignItems: "flex-start", gap: 6,
            }}>
              <span style={{ flexShrink: 0 }}>🎥</span>
              <span><strong>크리에이터 협업:</strong> {idea.creatorCollab}</span>
            </div>
          )}
        </div>

        {/* 우측: 점수 + 스토리보드 버튼 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, flexShrink: 0, minWidth: 120 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 38, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: 9, color: C.textSoft, fontWeight: 600, marginTop: 2 }}>완성점수</div>
          </div>
          <button
            onClick={goToStoryboard}
            style={{
              padding: "9px 14px", borderRadius: 8,
              border: "none",
              background: "#2563EB", color: "#FFFFFF",
              fontSize: 11, fontWeight: 800, cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
            }}
          >스토리보드 →</button>
        </div>
      </div>
    );
  };

  // ──────────── WorkbenchLink (Phase 9-2) ────────────
  const WorkbenchLink = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const update = () => setCount(getBookmarks().length);
      update();
      window.addEventListener("bookmarks-updated", update);
      return () => window.removeEventListener("bookmarks-updated", update);
    }, []);
    return (
      <a
        href="/workbench"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 12px", borderRadius: 8,
          background: count > 0 ? "#FFF7ED" : "#F9FAFB",
          border: `1px solid ${count > 0 ? "#FDBA74" : "#E5E7EB"}`,
          fontSize: 12, fontWeight: 700,
          color: count > 0 ? "#C2410C" : C.textSoft,
          textDecoration: "none",
          transition: "all 0.15s",
        }}
      >
        <span>{count > 0 ? "⭐" : "☆"}</span>
        <span>내 워크벤치</span>
        {count > 0 && (
          <span style={{
            padding: "1px 7px", borderRadius: 10,
            background: "#EA580C", color: "#FFFFFF",
            fontSize: 10, fontWeight: 800,
          }}>{count}</span>
        )}
      </a>
    );
  };

  // ──────────── BookmarkButton (Phase 9-2) ────────────
  const BookmarkButton = ({ opportunity }) => {
    const [saved, setSaved] = useState(false);
    useEffect(() => {
      setSaved(isBookmarked(opportunity.id));
      const handler = () => setSaved(isBookmarked(opportunity.id));
      window.addEventListener("bookmarks-updated", handler);
      return () => window.removeEventListener("bookmarks-updated", handler);
    }, [opportunity.id]);

    const toggle = () => {
      if (saved) removeBookmark(opportunity.id);
      else addBookmark(opportunity);
    };

    return (
      <button
        onClick={toggle}
        style={{
          padding: "8px 14px", borderRadius: 10,
          border: `1px solid ${saved ? "#F59E0B" : "#E5E7EB"}`,
          background: saved ? "#FEF3C7" : "#FFFFFF",
          color: saved ? "#92400E" : C.textSoft,
          fontSize: 12, fontWeight: 700, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 5,
          whiteSpace: "nowrap",
          transition: "all 0.15s",
        }}
      >
        <span>{saved ? "⭐" : "☆"}</span>
        <span>{saved ? "저장됨" : "북마크"}</span>
      </button>
    );
  };

  // ──────────── SectionDivider ────────────
  const SectionDivider = ({ label, color, count }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, marginTop: 8 }}>
      <div style={{ flex: 1, height: 1, background: `${color}25` }} />
      <span style={{
        color: color, fontSize: 11, fontWeight: 800,
        padding: "4px 12px", borderRadius: 12,
        background: `${color}10`,
        whiteSpace: "nowrap",
      }}>
        {label}{count != null && ` (${count})`}
      </span>
      <div style={{ flex: 1, height: 1, background: `${color}25` }} />
    </div>
  );

  // ──────────── MiniHeatmap ────────────
  const MiniHeatmap = ({ data, color, showValues = true }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const isRawValues = max > 100;
    // flat 감지: 최대·최소 차이가 평균의 5% 이하면 flat으로 간주
    const isFlat = (max - min) / (avg || 1) < 0.05;
    const peakColor = "#F97316"; // 오렌지 강조색

    const chartH = 68;
    const fmtVal = (v) => v >= 10000 ? `${(v / 10000).toFixed(1)}만` : v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v;

    return (
      <div style={{ position: "relative", paddingTop: 14 }}>
        {/* 평균 점선 (non-flat일 때만) */}
        {!isFlat && isRawValues && (
          <div
            style={{
              position: "absolute",
              left: 0, right: 0,
              // chartH 위에서 avg/max 비율 만큼 위로
              bottom: 18 + Math.max(4, (avg / max) * chartH),
              borderTop: `1px dashed ${C.textSoft}`,
              height: 1,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <span style={{
              position: "absolute",
              right: 0, top: -14,
              fontSize: 9, color: C.textSoft,
              background: "#FFFFFF", padding: "0 4px",
              fontWeight: 600,
            }}>
              평균 {fmtVal(Math.round(avg))}
            </span>
          </div>
        )}

        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: chartH + 18, position: "relative" }}>
          {data.map((v, i) => {
            // flat: 60-75% 범위로 미세한 변화만
            // non-flat: 10-100% 풀 스케일
            const heightPct = isFlat
              ? 70
              : Math.max(10, max > 0 ? (v / max) * 100 : 10);
            const isPeak = !isFlat && v === max;
            const barColor = isPeak ? peakColor : v >= max * 0.75 ? color : v >= max * 0.5 ? `${color}CC` : `${color}66`;

            return (
              <div
                key={i}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}
                title={isRawValues ? `${i + 1}월: ${v.toLocaleString()}회` : `${i + 1}월: 지수 ${v}`}
              >
                {showValues && isRawValues && isPeak && (
                  <span style={{
                    position: "absolute",
                    top: -2, left: "50%",
                    transform: "translate(-50%, -100%)",
                    fontSize: 9, color: peakColor, fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}>
                    {fmtVal(v)}
                  </span>
                )}
                <div style={{
                  width: "100%",
                  height: Math.max(4, (heightPct / 100) * chartH),
                  borderRadius: "3px 3px 0 0",
                  background: barColor,
                  boxShadow: isPeak ? `0 0 0 2px ${peakColor}40` : "none",
                  transition: "all 0.25s",
                }} />
                <span style={{
                  fontSize: 9,
                  color: isPeak ? peakColor : C.textSoft,
                  fontWeight: isPeak ? 800 : 500,
                }}>{i + 1}월</span>
              </div>
            );
          })}
        </div>

        {/* flat 안내 */}
        {isFlat && isRawValues && (
          <div style={{
            marginTop: 6,
            padding: "4px 10px",
            borderRadius: 6,
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            fontSize: 10, color: C.textSoft,
            display: "inline-flex", alignItems: "center", gap: 5,
          }}>
            ℹ️ 연중 안정적 분포 — 시즌성 없이 매월 약 {fmtVal(Math.round(avg))} 검색
          </div>
        )}
      </div>
    );
  };

  // ──────────── HUB VIEW ────────────
  const renderHub = () => (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
      <Hero />
      <div style={{ fontSize: 11, fontWeight: 800, color: C.textSoft, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, paddingLeft: 4 }}>
        카드별 기회 맵
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 16,
        alignItems: "stretch",
      }}>
      {Object.values(CATEGORIES).map(cat => {
        // ALL 카드는 새 v2 데이터 기반
        const isAll = cat.key === "all";
        const isNeed = cat.key === "need";
        const isYou = cat.key === "you";
        let count, annual, previews;
        if (isAll) {
          count = getOpportunityCount(); // cross insights 제외: 28
          annual = getTotalAnnualVolume();
          previews = ALL_CARD_PERSONAS.map(p => ({ icon: p.icon, title: p.title })); // P1~P5 전부
        } else if (isNeed) {
          // NEED = AutoSlim + Pay + Edu (opportunities만, cross insights 제외)
          count = autoslim.getOpportunityCount() + needpay.getOpportunityCount() + neededu.getOpportunityCount(); // 9+9+10 = 28
          annual = autoslim.getTotalAnnualVolume() + needpay.getTotalAnnualVolume() + neededu.getTotalAnnualVolume();
          previews = [
            { icon: "🚗", title: "NEED AutoSlim — 자동차 카드 (신차·주유·보험·정비)" },
            { icon: "📱", title: "NEED Pay — 간편결제·OTT·디지털콘텐츠·패션" },
            { icon: "📚", title: "NEED Edu — 교육·생활 (자녀 교육·자기계발)" },
          ];
        } else if (isYou) {
          // YOU = 가족팩 + 일상팩 (opportunities만)
          const famCount = youfamily.getOpportunityCount ? youfamily.getOpportunityCount() : youfamily.YOU_PRIME_FAMILY_OPPORTUNITIES.length;
          const dailyCount = youdaily.getOpportunityCount ? youdaily.getOpportunityCount() : youdaily.YOU_PRIME_DAILY_OPPORTUNITIES.length;
          const famAnnual = youfamily.getTotalAnnualVolume ? youfamily.getTotalAnnualVolume() : youfamily.YOU_PRIME_FAMILY_OPPORTUNITIES.reduce((s, o) => s + (o.annualVolume || 0), 0);
          const dailyAnnual = youdaily.getTotalAnnualVolume ? youdaily.getTotalAnnualVolume() : youdaily.YOU_PRIME_DAILY_OPPORTUNITIES.reduce((s, o) => s + (o.annualVolume || 0), 0);
          count = famCount + dailyCount; // 9 + 7 = 16
          annual = famAnnual + dailyAnnual;
          previews = [
            { icon: "🏠", title: "YOU 가족팩 — 3세대 지원·가족 재무 관리" },
            { icon: "⛽", title: "YOU 일상팩 — 주유·배달·자기관리·고정비" },
          ];
        } else {
          count = OPPS.filter(o => o.category === cat.key).length;
          annual = OPPS.filter(o => o.category === cat.key).reduce((s, o) => s + (o.annualVol || 0), 0);
          previews = OPPS.filter(o => o.category === cat.key && !o.isInsight).slice(0, 3);
        }
        const isMulti = Array.isArray(cat.multiColor);
        return (
          <div
            key={cat.key}
            onClick={() => goToCategory(cat.key)}
            style={{
              background: "#FFFFFF", borderRadius: 20,
              border: `1px solid ${cat.color}25`,
              cursor: "pointer", overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              transition: "all 0.2s",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Phase 12-2: 카드명 그라디언트 상단 배너 */}
            <div style={{
              padding: "14px 20px",
              background: isMulti
                ? `linear-gradient(135deg, ${cat.multiColor[0]}, ${cat.multiColor[1]}, ${cat.multiColor[2]})`
                : `linear-gradient(135deg, ${cat.color}, ${cat.color}DD)`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: 1.5, marginBottom: 2 }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1 }}>
                  {cat.title}
                </div>
              </div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>→</div>
            </div>
            <div style={{ padding: "22px 22px", position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
              {!isMulti && (
                <div style={{ position: "absolute", top: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${cat.color}14, transparent 70%)`, pointerEvents: "none" }} />
              )}
              <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 24, marginBottom: 12, letterSpacing: 3 }}>{cat.icons.join(" ")}</div>
                <div style={{ fontSize: 13, color: C.textSoft, marginBottom: 14, lineHeight: 1.5 }}>{cat.tagline}</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: cat.color + "15", color: cat.color }}>{count}개 기회</span>
                  <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(annual)}회</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, flex: 1 }}>
                  {previews.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{p.icon}</span>
                      <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{p.title}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: cat.color, display: "flex", alignItems: "center", gap: 6, marginTop: "auto" }}>기회 보기 →</div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );

  // ──────────── NEED CATEGORY VIEW (하위카드 선택 + AutoSlim v2) ────────────
  // Phase 12-13: 서브카드별 WHY 블록 데이터
  const SUB_CARD_WHY = {
    autoslim: {
      cardId: "AUTOSLIM",
      color: "#D97706",
      whyTitle: "자동차 생애주기 5% 카드",
      whyDescription: "신차 구매·주유·정비·보험까지 자동차 관련 모든 지출 최적. 주유 5% + 신차 할부·정비·보험을 통합한 유일한 카드.",
      coreValueProps: [
        { title: "주유·충전소 5%", description: "SK·GS·S-Oil·현대오일뱅크 + 전기차 충전" },
        { title: "신차·정비 특화", description: "신차 할부 최대 2만원 + 스피드메이트 할인" },
        { title: "자동차보험 2만원", description: "KB 보험다모아 청구할인 자동 적용" },
      ],
    },
    pay: {
      cardId: "PAY",
      color: "#059669",
      whyTitle: "간편결제 시대의 페이 카드",
      whyDescription: "네이버페이·카카오페이·삼성페이를 한 카드에 묶어 간편결제 영역 전체 15% 환급. 구독·OTT·해외 직구까지 커버하는 페이 특화 카드.",
      coreValueProps: [
        { title: "간편결제 15%/10%", description: "네이버·카카오·삼성·페이코 전 플랫폼" },
        { title: "디지털콘텐츠 30%", description: "넷플릭스·유튜브·티빙·쿠팡플레이 집중" },
        { title: "해외 크로스보더", description: "여행자보험·글로벌 OTT·해외 직구 통합" },
      ],
    },
    edu: {
      cardId: "EDU",
      color: "#DC2626",
      whyTitle: "배움의 전 세대 카드",
      whyDescription: "자녀 학원부터 성인 자격증·리스킬링까지. 교육비 최대 10% 환급으로 가계의 교육 지출을 압축. 생활 영역 5% 보너스.",
      coreValueProps: [
        { title: "교육업종 5~10%", description: "학원·과외·온라인 교육 + KB Pay 교육 추가" },
        { title: "생활영역 5%", description: "병원·약국·커피·대형마트" },
        { title: "학부모 타깃", description: "여 80% · 40대 53% 학원비 관리층" },
      ],
    },
    daily: {
      cardId: "YOU DAILY",
      color: "#A78BFA",
      whyTitle: "나의 루틴을 아는 카드",
      whyDescription: "'어떤 카드가 좋지?'가 아니라 '내가 어떻게 쓰지?' 관점. 주유·배달·자기관리·고정비 + 하이퍼로컬 '반경 500m'까지 통합.",
      coreValueProps: [
        { title: "일상팩 4축 + 하이퍼로컬", description: "주유·배달·자기관리·고정비 + 반경 500m" },
        { title: "진단형 혜택", description: "내 소비 패턴 기반 맞춤 추천" },
        { title: "1인가구 최적화", description: "혼밥·셀프케어·동네 단골 구조" },
      ],
    },
    family: {
      cardId: "YOU FAMILY",
      color: "#7C3AED",
      whyTitle: "3세대를 잇는 가족 재무 관리",
      whyDescription: "부모 돌봄 + 자녀 교육 + 반려동물까지. '우리 집 한 장'으로 가족 전체 혜택 통합. 맞벌이 '시간 압축' 니즈와 반려동물 '또 다른 가족' 축 포함.",
      coreValueProps: [
        { title: "가족팩 4축", description: "장보기·돌봄·학원·유틸리티 통합" },
        { title: "맞벌이 압축 혜택", description: "유치원·반찬배달·새벽배송·가사도우미" },
        { title: "또 다른 가족", description: "반려동물 사료·병원·펫보험 포함" },
      ],
    },
  };

  // WHY 블록 렌더 헬퍼
  const WhyBlock = ({ why }) => {
    if (!why?.whyTitle) return null;
    return (
      <div style={{
        background: `linear-gradient(135deg, ${why.color}08, ${why.color}14)`,
        border: `1px solid ${why.color}30`,
        borderRadius: 12, padding: 18,
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: why.color, letterSpacing: 1, marginBottom: 8 }}>
          WHY {why.cardId} CARD?
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.4 }}>
          {why.whyTitle}
        </div>
        <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.7, marginBottom: 12 }}>
          {why.whyDescription}
        </div>
        <div style={{ paddingTop: 10, borderTop: `1px solid ${why.color}22`, display: "flex", flexDirection: "column", gap: 7 }}>
          {why.coreValueProps?.map((prop, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ color: why.color, flexShrink: 0, fontWeight: 800, fontSize: 12, marginTop: 1 }}>✓</span>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: C.text }}>{prop.title}</div>
                <div style={{ fontSize: 10.5, color: C.textSoft, marginTop: 1 }}>{prop.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NEED_SUBCARDS = [
    {
      id: "autoslim", label: "NEED AutoSlim", icon: "🚗", color: "#D97706",
      tagline: "자동차 집중 혜택",
      desc: "신차 할부 + 주유 5% + 보험 2만원 + 스피드메이트 · 연 최대 41만원",
      ready: true,
    },
    {
      id: "pay", label: "NEED Pay", icon: "📱", color: "#059669",
      tagline: "간편결제 집중 혜택",
      desc: "간편결제 15%/10% + 디지털콘텐츠 30% + 온라인패션몰 5%",
      ready: true,
    },
    {
      id: "edu", label: "NEED Edu", icon: "📚", color: "#DC2626",
      tagline: "교육 집중 혜택",
      desc: "교육업종 5~10% + 생활영역 5% (자녀 교육·평생 학습자)",
      ready: true,
    },
  ];

  const renderNeedCategory = () => {
    // 하위카드 선택 안 됨 → 선택 페이지
    if (!needSubCard) {
      return (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
          <BackNav label="← 전체 기회로 돌아가기" />

          {/* Header */}
          <div style={{ background: "#FFFFFF", borderRadius: 18, border: "1px solid #DC262625", marginBottom: 22, overflow: "hidden" }}>
            <div style={{ height: 5, background: "linear-gradient(90deg, #059669, #D97706, #DC2626)" }} />
            <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              <div>
                <div style={{ fontSize: 22, marginBottom: 12, letterSpacing: 3 }}>📱 🔋 🛡️ 📚 💊</div>
                <div style={{ color: "#DC2626", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>C. NEED</div>
                <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>NEED 카드</div>
                <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>3개 세부 카드 중 하나를 선택하세요</div>
              </div>
              {CATEGORIES.need?.whyTitle && (
                <div style={{
                  background: "linear-gradient(135deg, #DC262608, #DC262612)",
                  border: "1px solid #DC262625",
                  borderRadius: 12, padding: 20,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#DC2626", letterSpacing: 1, marginBottom: 8 }}>WHY NEED CARD?</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 10, lineHeight: 1.4 }}>{CATEGORIES.need.whyTitle}</div>
                  <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>{CATEGORIES.need.whyDescription}</div>
                  <div style={{ paddingTop: 12, borderTop: "1px solid #DC262620", display: "flex", flexDirection: "column", gap: 8 }}>
                    {CATEGORIES.need.coreValueProps?.map((prop, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: "#DC2626", flexShrink: 0, fontWeight: 800, fontSize: 13, marginTop: 1 }}>✓</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{prop.title}</div>
                          <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>{prop.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, color: C.textSoft, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, paddingLeft: 4 }}>
            세부 카드 선택
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {NEED_SUBCARDS.map(sub => (
              <div
                key={sub.id}
                onClick={() => sub.ready && goToNeedSub(sub.id)}
                style={{
                  background: "#FFFFFF", borderRadius: 16,
                  border: `1px solid ${sub.color}30`,
                  borderLeft: `4px solid ${sub.color}`,
                  padding: "20px 22px",
                  cursor: sub.ready ? "pointer" : "not-allowed",
                  opacity: sub.ready ? 1 : 0.6,
                  display: "flex", alignItems: "center", gap: 16,
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `linear-gradient(135deg, ${sub.color}, ${sub.color}CC)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0,
                }}>{sub.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{sub.label}</span>
                    {!sub.ready && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#F3F4F6", color: "#9CA3AF" }}>준비 중</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: sub.color, fontWeight: 700, marginBottom: 6 }}>{sub.tagline}</div>
                  <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.6 }}>{sub.desc}</div>
                </div>
                {sub.ready && <div style={{ color: sub.color, fontSize: 20, flexShrink: 0 }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 하위카드 선택됨
    if (needSubCard === "autoslim") return renderAutoslimCategory();
    if (needSubCard === "pay") return renderPayCategory();
    if (needSubCard === "edu") return renderEduCategory();
    return null;
  };

  // ──────────── NEED AutoSlim — COVER 4 + ACCENT 5 + 교차 인사이트 ────────────
  const renderAutoslimCategory = () => {
    const color = "#D97706";
    const cover = autoslim.getCoverOpportunities();
    const accent = autoslim.getAccentOpportunities();
    const personas = autoslim.NEED_AUTOSLIM_PERSONAS;
    const crossIns = autoslim.NEED_AUTOSLIM_CROSS_INSIGHTS;
    const totalAnnual = autoslim.getTotalAnnualVolume();
    const oppCount = autoslim.getOpportunityCount();

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← NEED 카드 선택으로" />

        {/* Header — Phase 12-13: 2열 WHY 블록 */}
        <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${color}30`, marginBottom: 22, overflow: "hidden" }}>
          <div style={{ height: 5, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            <div>
              <div style={{ fontSize: 22, marginBottom: 12 }}>🚗 ⛽ 🔧 🔵</div>
              <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>C. NEED › AutoSlim</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>NEED AutoSlim</div>
              <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>자동차 집중 혜택 — 신차부터 유지까지</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: color + "15", color: color }}>{oppCount}개 기회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(totalAnnual)}회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>COVER {cover.length} + ACCENT {accent.length}</span>
              </div>
            </div>
            <WhyBlock why={SUB_CARD_WHY.autoslim} />
          </div>
        </div>

        {/* COVER 페르소나 섹션 */}
        <SectionDivider label="🔵 COVER 페르소나" color={color} count={cover.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {cover.map(opp => {
            const persona = personas.find(p => p.id === opp.personaId);
            const pColor = persona?.color || color;
            return (
              <div
                key={opp.id}
                onClick={() => goToAnalysis({ ...opp, _isAllV2: true, _persona: persona })}
                style={{
                  background: "#FFFFFF", borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  borderLeft: `3px solid ${pColor}`,
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    {opp.tier && (
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                    )}
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#DBEAFE", color: "#1D4ED8", fontWeight: 700 }}>🔵 COVER</span>
                    {persona && <span style={{ fontSize: 10, color: pColor, fontWeight: 600 }}>{persona.icon} {persona.title}</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                  {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                  {opp.painPoints && opp.painPoints.length > 0 && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                      <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: pColor, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                  <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                  <div style={{ color: pColor, fontSize: 14, marginTop: 2 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACCENT 기회 섹션 */}
        <SectionDivider label="🟠 ACCENT 기회" color={color} count={accent.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {accent.map(opp => (
            <div
              key={opp.id}
              onClick={() => goToAnalysis({ ...opp, _isAllV2: true })}
              style={{
                background: "#FFFFFF", borderRadius: 12,
                border: "1px solid #E5E7EB",
                borderLeft: `3px solid ${color}`,
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  {opp.tier && (
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                  )}
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#FED7AA", color: "#9A3412", fontWeight: 700 }}>🟠 ACCENT</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                {opp.painPoints && opp.painPoints.length > 0 && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                    <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: color, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                <div style={{ color: color, fontSize: 14, marginTop: 2 }}>→</div>
              </div>
            </div>
          ))}
        </div>

        {/* 교차 인사이트 섹션 제거됨 (Phase 12-15) */}
      </div>
    );
  };

  // ──────────── NEED Pay — COVER + ACCENT + 교차 인사이트 ────────────
  const renderPayCategory = () => {
    const color = "#059669";
    const cover = needpay.getCoverOpportunities();
    const accent = needpay.getAccentOpportunities();
    const personas = needpay.NEED_PAY_PERSONAS;
    const crossIns = needpay.NEED_PAY_CROSS_INSIGHTS;
    const totalAnnual = needpay.getTotalAnnualVolume();
    const oppCount = needpay.getOpportunityCount();

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← NEED 카드 선택으로" />

        {/* Header — Phase 12-13 */}
        <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${color}30`, marginBottom: 22, overflow: "hidden" }}>
          <div style={{ height: 5, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            <div>
              <div style={{ fontSize: 22, marginBottom: 12 }}>📱 💳 🎬 👗</div>
              <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>C. NEED › Pay</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>NEED Pay</div>
              <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>간편결제 집중 혜택 — KB Pay 중심 디지털 생활</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: color + "15", color: color }}>{oppCount}개 기회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(totalAnnual)}회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>COVER {cover.length} + ACCENT {accent.length}</span>
              </div>
            </div>
            <WhyBlock why={SUB_CARD_WHY.pay} />
          </div>
        </div>

        {/* COVER 페르소나 섹션 */}
        <SectionDivider label="🔵 COVER 페르소나" color={color} count={cover.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {cover.map(opp => {
            const persona = personas.find(p => p.id === opp.personaId);
            const pColor = persona?.color || color;
            return (
              <div
                key={opp.id}
                onClick={() => goToAnalysis({ ...opp, _isAllV2: true, _persona: persona })}
                style={{
                  background: "#FFFFFF", borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  borderLeft: `3px solid ${pColor}`,
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    {opp.tier && (
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                    )}
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#DBEAFE", color: "#1D4ED8", fontWeight: 700 }}>🔵 COVER</span>
                    {persona && <span style={{ fontSize: 10, color: pColor, fontWeight: 600 }}>{persona.icon} {persona.title}</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                  {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                  {opp.painPoints && opp.painPoints.length > 0 && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                      <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: pColor, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                  <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                  <div style={{ color: pColor, fontSize: 14, marginTop: 2 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACCENT 기회 섹션 */}
        <SectionDivider label="🟠 ACCENT 기회" color={color} count={accent.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {accent.map(opp => (
            <div
              key={opp.id}
              onClick={() => goToAnalysis({ ...opp, _isAllV2: true })}
              style={{
                background: "#FFFFFF", borderRadius: 12,
                border: "1px solid #E5E7EB",
                borderLeft: `3px solid ${color}`,
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  {opp.tier && (
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                  )}
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#FED7AA", color: "#9A3412", fontWeight: 700 }}>🟠 ACCENT</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                {opp.painPoints && opp.painPoints.length > 0 && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                    <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: color, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                <div style={{ color: color, fontSize: 14, marginTop: 2 }}>→</div>
              </div>
            </div>
          ))}
        </div>

        {/* 교차 인사이트 섹션 제거됨 (Phase 12-15) */}
      </div>
    );
  };

  // ──────────── NEED Edu — COVER + ACCENT + 교차 인사이트 ────────────
  const renderEduCategory = () => {
    const color = "#DC2626";
    const cover = neededu.getCoverOpportunities ? neededu.getCoverOpportunities() : neededu.NEED_EDU_OPPORTUNITIES.filter(o => o.hookType === "COVER");
    const accent = neededu.getAccentOpportunities ? neededu.getAccentOpportunities() : neededu.NEED_EDU_OPPORTUNITIES.filter(o => o.hookType === "ACCENT");
    const personas = neededu.NEED_EDU_PERSONAS;
    const crossIns = neededu.NEED_EDU_CROSS_INSIGHTS;
    const totalAnnual = neededu.getTotalAnnualVolume();
    const oppCount = neededu.getOpportunityCount();

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← NEED 카드 선택으로" />

        {/* Header — Phase 12-13 */}
        <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${color}30`, marginBottom: 22, overflow: "hidden" }}>
          <div style={{ height: 5, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            <div>
              <div style={{ fontSize: 22, marginBottom: 12 }}>📚 🎓 💊 ☕</div>
              <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>C. NEED › Edu</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>NEED Edu</div>
              <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>교육 집중 혜택 — 학부모부터 평생 학습자까지</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: color + "15", color: color }}>{oppCount}개 기회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(totalAnnual)}회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>COVER {cover.length} + ACCENT {accent.length}</span>
              </div>
            </div>
            <WhyBlock why={SUB_CARD_WHY.edu} />
          </div>
        </div>

        {/* COVER 페르소나 섹션 */}
        <SectionDivider label="🔵 COVER 페르소나" color={color} count={cover.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {cover.map(opp => {
            const persona = personas.find(p => p.id === opp.personaId);
            const pColor = persona?.color || color;
            return (
              <div
                key={opp.id}
                onClick={() => goToAnalysis({ ...opp, _isAllV2: true, _persona: persona })}
                style={{
                  background: "#FFFFFF", borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  borderLeft: `3px solid ${pColor}`,
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    {opp.tier && (
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                    )}
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#DBEAFE", color: "#1D4ED8", fontWeight: 700 }}>🔵 COVER</span>
                    {persona && <span style={{ fontSize: 10, color: pColor, fontWeight: 600 }}>{persona.icon} {persona.title}</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                  {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                  {opp.painPoints && opp.painPoints.length > 0 && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                      <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: pColor, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                  <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                  <div style={{ color: pColor, fontSize: 14, marginTop: 2 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACCENT 기회 섹션 */}
        <SectionDivider label="🟠 ACCENT 기회" color={color} count={accent.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {accent.map(opp => (
            <div
              key={opp.id}
              onClick={() => goToAnalysis({ ...opp, _isAllV2: true })}
              style={{
                background: "#FFFFFF", borderRadius: 12,
                border: "1px solid #E5E7EB",
                borderLeft: `3px solid ${color}`,
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  {opp.tier && (
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                  )}
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#FED7AA", color: "#9A3412", fontWeight: 700 }}>🟠 ACCENT</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                {opp.painPoints && opp.painPoints.length > 0 && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                    <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: color, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                <div style={{ color: color, fontSize: 14, marginTop: 2 }}>→</div>
              </div>
            </div>
          ))}
        </div>

        {/* 교차 인사이트 섹션 제거됨 (Phase 12-15) */}
      </div>
    );
  };

  // ──────────── YOU CATEGORY VIEW (하위카드 선택 → 일상팩 / 가족팩) ────────────
  const YOU_SUBCARDS = [
    {
      id: "family", label: "YOU Prime 가족팩", icon: "🏠", color: "#7C3AED",
      tagline: "가족 전체 지원 혜택",
      desc: "온라인장보기 10% + 학원/대형마트/카페 5% + 생활요금 10% — 3세대 재무 관리",
      ready: true,
    },
    {
      id: "daily", label: "YOU Prime 일상팩", icon: "⛽", color: "#A78BFA",
      tagline: "개인 일상 혜택",
      desc: "주유 10% + 배달 10% + 자기관리 5% + 통신/보험/App 10%",
      ready: true,
    },
  ];

  const renderYouCategory = () => {
    // 하위카드 선택 안 됨 → 선택 페이지
    if (!youSubCard) {
      return (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
          <BackNav label="← 전체 기회로 돌아가기" />

          <div style={{ background: "#FFFFFF", borderRadius: 18, border: "1px solid #7C3AED25", marginBottom: 22, overflow: "hidden" }}>
            <div style={{ height: 5, background: "linear-gradient(90deg, #7C3AED, #A78BFA)" }} />
            <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              <div>
                <div style={{ fontSize: 22, marginBottom: 12, letterSpacing: 3 }}>⛽ 💪 🛒 ☕ 🏠</div>
                <div style={{ color: "#7C3AED", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>B. YOU Prime</div>
                <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>YOU Prime 카드</div>
                <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>혜택 팩 선택 — 일상팩 / 가족팩</div>
              </div>
              {CATEGORIES.you?.whyTitle && (
                <div style={{
                  background: "linear-gradient(135deg, #7C3AED08, #7C3AED12)",
                  border: "1px solid #7C3AED25",
                  borderRadius: 12, padding: 20,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#7C3AED", letterSpacing: 1, marginBottom: 8 }}>WHY YOU CARD?</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 10, lineHeight: 1.4 }}>{CATEGORIES.you.whyTitle}</div>
                  <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>{CATEGORIES.you.whyDescription}</div>
                  <div style={{ paddingTop: 12, borderTop: "1px solid #7C3AED20", display: "flex", flexDirection: "column", gap: 8 }}>
                    {CATEGORIES.you.coreValueProps?.map((prop, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: "#7C3AED", flexShrink: 0, fontWeight: 800, fontSize: 13, marginTop: 1 }}>✓</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{prop.title}</div>
                          <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>{prop.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, color: C.textSoft, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, paddingLeft: 4 }}>
            혜택 팩 선택
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {YOU_SUBCARDS.map(sub => (
              <div
                key={sub.id}
                onClick={() => sub.ready && goToYouSub(sub.id)}
                style={{
                  background: "#FFFFFF", borderRadius: 16,
                  border: `1px solid ${sub.color}30`,
                  borderLeft: `4px solid ${sub.color}`,
                  padding: "20px 22px",
                  cursor: sub.ready ? "pointer" : "not-allowed",
                  opacity: sub.ready ? 1 : 0.6,
                  display: "flex", alignItems: "center", gap: 16,
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `linear-gradient(135deg, ${sub.color}, ${sub.color}CC)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0,
                }}>{sub.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{sub.label}</span>
                    {!sub.ready && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#F3F4F6", color: "#9CA3AF" }}>준비 중</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: sub.color, fontWeight: 700, marginBottom: 6 }}>{sub.tagline}</div>
                  <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.6 }}>{sub.desc}</div>
                </div>
                {sub.ready && <div style={{ color: sub.color, fontSize: 20, flexShrink: 0 }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (youSubCard === "family") return renderYouFamilyCategory();
    if (youSubCard === "daily") return renderYouDailyCategory();
    return null;
  };

  // ──────────── YOU Prime 가족팩 — COVER + ACCENT + 교차 인사이트 ────────────
  const renderYouFamilyCategory = () => {
    const color = "#7C3AED";
    const allOpps = youfamily.YOU_PRIME_FAMILY_OPPORTUNITIES;
    const cover = allOpps.filter(o => o.hookType === "COVER");
    const accent = allOpps.filter(o => o.hookType === "ACCENT");
    const personas = youfamily.YOU_PRIME_FAMILY_PERSONAS;
    const crossIns = youfamily.YOU_PRIME_FAMILY_CROSS_INSIGHTS;
    const totalAnnual = youfamily.getTotalAnnualVolume
      ? youfamily.getTotalAnnualVolume()
      : allOpps.reduce((s, o) => s + (o.annualVolume || 0), 0);
    const oppCount = youfamily.getOpportunityCount
      ? youfamily.getOpportunityCount()
      : allOpps.length;

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← YOU Prime 팩 선택으로" />

        {/* Header — Phase 12-13 */}
        <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${color}30`, marginBottom: 22, overflow: "hidden" }}>
          <div style={{ height: 5, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            <div>
              <div style={{ fontSize: 22, marginBottom: 12 }}>🏠 🛒 ☕ 👨‍👩‍👧</div>
              <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>B. YOU Prime › 가족팩</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>YOU Prime 가족팩</div>
              <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>가족 전체 지원 — 3세대 재무 통합 관리</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: color + "15", color: color }}>{oppCount}개 기회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(totalAnnual)}회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>COVER {cover.length} + ACCENT {accent.length}</span>
              </div>
            </div>
            <WhyBlock why={SUB_CARD_WHY.family} />
          </div>
        </div>

        {/* COVER */}
        <SectionDivider label="🔵 COVER 페르소나" color={color} count={cover.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {cover.map(opp => {
            const persona = personas.find(p => p.id === opp.personaId);
            const pColor = persona?.color || color;
            return (
              <div
                key={opp.id}
                onClick={() => goToAnalysis({ ...opp, _isAllV2: true, _persona: persona })}
                style={{
                  background: "#FFFFFF", borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  borderLeft: `3px solid ${pColor}`,
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    {opp.tier && (
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                    )}
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#DBEAFE", color: "#1D4ED8", fontWeight: 700 }}>🔵 COVER</span>
                    {persona && <span style={{ fontSize: 10, color: pColor, fontWeight: 600 }}>{persona.icon} {persona.title}</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                  {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                  {opp.painPoints && opp.painPoints.length > 0 && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                      <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: pColor, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                  <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                  <div style={{ color: pColor, fontSize: 14, marginTop: 2 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACCENT */}
        <SectionDivider label="🟠 ACCENT 기회" color={color} count={accent.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {accent.map(opp => (
            <div
              key={opp.id}
              onClick={() => goToAnalysis({ ...opp, _isAllV2: true })}
              style={{
                background: "#FFFFFF", borderRadius: 12,
                border: "1px solid #E5E7EB",
                borderLeft: `3px solid ${color}`,
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  {opp.tier && (
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                  )}
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#FED7AA", color: "#9A3412", fontWeight: 700 }}>🟠 ACCENT</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                {opp.painPoints && opp.painPoints.length > 0 && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                    <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: color, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                <div style={{ color: color, fontSize: 14, marginTop: 2 }}>→</div>
              </div>
            </div>
          ))}
        </div>

        {/* 교차 인사이트 섹션 제거됨 (Phase 12-15) */}
      </div>
    );
  };

  // ──────────── YOU Prime 일상팩 — COVER + ACCENT + 교차 인사이트 ────────────
  const renderYouDailyCategory = () => {
    const color = "#A78BFA";
    const allOpps = youdaily.YOU_PRIME_DAILY_OPPORTUNITIES;
    const cover = allOpps.filter(o => o.hookType === "COVER");
    const accent = allOpps.filter(o => o.hookType === "ACCENT");
    const personas = youdaily.YOU_PRIME_DAILY_PERSONAS;
    const crossIns = youdaily.YOU_PRIME_DAILY_CROSS_INSIGHTS;
    const totalAnnual = youdaily.getTotalAnnualVolume
      ? youdaily.getTotalAnnualVolume()
      : allOpps.reduce((s, o) => s + (o.annualVolume || 0), 0);
    const oppCount = youdaily.getOpportunityCount
      ? youdaily.getOpportunityCount()
      : allOpps.length;

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← YOU Prime 팩 선택으로" />

        {/* Header — Phase 12-13 */}
        <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${color}30`, marginBottom: 22, overflow: "hidden" }}>
          <div style={{ height: 5, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            <div>
              <div style={{ fontSize: 22, marginBottom: 12 }}>⛽ 🛵 💪 📱</div>
              <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>B. YOU Prime › 일상팩</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>YOU Prime 일상팩</div>
              <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>개인 일상 혜택 — 출퇴근·배달·자기관리·고정비</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: color + "15", color: color }}>{oppCount}개 기회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(totalAnnual)}회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>COVER {cover.length} + ACCENT {accent.length}</span>
              </div>
            </div>
            <WhyBlock why={SUB_CARD_WHY.daily} />
          </div>
        </div>

        {/* COVER */}
        <SectionDivider label="🔵 COVER 페르소나" color={color} count={cover.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {cover.map(opp => {
            const persona = personas.find(p => p.id === opp.personaId);
            const pColor = persona?.color || color;
            return (
              <div
                key={opp.id}
                onClick={() => goToAnalysis({ ...opp, _isAllV2: true, _persona: persona })}
                style={{
                  background: "#FFFFFF", borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  borderLeft: `3px solid ${pColor}`,
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    {opp.tier && (
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                    )}
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#DBEAFE", color: "#1D4ED8", fontWeight: 700 }}>🔵 COVER</span>
                    {persona && <span style={{ fontSize: 10, color: pColor, fontWeight: 600 }}>{persona.icon} {persona.title}</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                  {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                  {opp.painPoints && opp.painPoints.length > 0 && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                      <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: pColor, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                  <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                  <div style={{ color: pColor, fontSize: 14, marginTop: 2 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACCENT */}
        <SectionDivider label="🟠 ACCENT 기회" color={color} count={accent.length} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {accent.map(opp => (
            <div
              key={opp.id}
              onClick={() => goToAnalysis({ ...opp, _isAllV2: true })}
              style={{
                background: "#FFFFFF", borderRadius: 12,
                border: "1px solid #E5E7EB",
                borderLeft: `3px solid ${color}`,
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 24, flexShrink: 0 }}>{opp.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  {opp.tier && (
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 7px", borderRadius: 4 }}>{opp.tier}</span>
                  )}
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "#FED7AA", color: "#9A3412", fontWeight: 700 }}>🟠 ACCENT</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{opp.title}</div>
                {opp.subtitle && <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>{opp.subtitle}</div>}
                {opp.painPoints && opp.painPoints.length > 0 && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10.5, color: "#6B7280", lineHeight: 1.4 }}>
                    <span style={{ flexShrink: 0, fontSize: 10 }}>😣</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: color, fontSize: 11, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                <div style={{ color: color, fontSize: 14, marginTop: 2 }}>→</div>
              </div>
            </div>
          ))}
        </div>

        {/* 교차 인사이트 섹션 제거됨 (Phase 12-15) */}
      </div>
    );
  };

  // ──────────── ALL CARD CATEGORY VIEW (v2 — 5 페르소나 + 28 기회) ────────────
  const renderAllCategory = () => {
    const cat = CATEGORIES.all;
    const totalAnnual = getTotalAnnualVolume();
    const oppCount = getOpportunityCount();

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← 전체 기회로 돌아가기" />

        {/* Category Header — Phase 12-3: 2열 그리드 (왼쪽 정보 + 오른쪽 WHY 블록) */}
        <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${cat.color}25`, marginBottom: 22, overflow: "hidden" }}>
          <div style={{ height: 5, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)` }} />
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {/* 왼쪽: 기존 정보 */}
            <div>
              <div style={{ fontSize: 22, marginBottom: 12, letterSpacing: 3 }}>{cat.icons.join(" ")}</div>
              <div style={{ color: cat.color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{cat.label}</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>{cat.title}</div>
              <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>{cat.tagline}</div>
              <div style={{ color: C.textSoft, fontSize: 11, marginBottom: 12, fontWeight: 600 }}>{cat.headerMeta}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {cat.uspPills.map((p, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}30` }}>{p}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: cat.color + "15", color: cat.color }}>{oppCount}개 기회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(totalAnnual)}회</span>
                <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>5 페르소나</span>
              </div>
            </div>

            {/* 오른쪽: WHY 블록 */}
            {cat.whyTitle && (
              <div style={{
                background: `linear-gradient(135deg, ${cat.color}08, ${cat.color}12)`,
                border: `1px solid ${cat.color}25`,
                borderRadius: 12, padding: 20,
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: cat.color, letterSpacing: 1, marginBottom: 8 }}>
                  WHY {cat.key.toUpperCase()} CARD?
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 10, lineHeight: 1.4 }}>
                  {cat.whyTitle}
                </div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>
                  {cat.whyDescription}
                </div>
                <div style={{ paddingTop: 12, borderTop: `1px solid ${cat.color}20`, display: "flex", flexDirection: "column", gap: 8 }}>
                  {cat.coreValueProps?.map((prop, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: cat.color, flexShrink: 0, fontWeight: 800, fontSize: 13, marginTop: 1 }}>✓</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{prop.title}</div>
                        <div style={{ fontSize: 11, color: C.textSoft, marginTop: 1 }}>{prop.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 페르소나 Preview 그리드 */}
        <div style={{
          padding: "18px 20px", marginBottom: 20,
          borderRadius: 16,
          background: "linear-gradient(135deg, #F9FAFB, #F3F4F6)",
          border: "1px solid #E5E7EB",
        }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 3 }}>
              이 카드가 연결하는 기회
            </div>
            <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5 }}>
              페르소나별로 검색 데이터에서 발견한 구체적인 소비자 맥락 · 카드 클릭 시 해당 섹션으로 이동
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 10,
          }}>
            {ALL_CARD_PERSONAS.map(persona => {
              const opps = getOpportunitiesByPersona(persona.id);
              const isActive = openPersona === persona.id;
              return (
                <div
                  key={persona.id}
                  onClick={() => {
                    setOpenPersona(persona.id);
                    setTimeout(() => {
                      const el = document.getElementById(`persona-${persona.id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    padding: "12px 12px 14px",
                    border: isActive ? `2px solid ${persona.color}` : "1px solid #E5E7EB",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: isActive ? `0 4px 12px ${persona.color}25` : "0 1px 2px rgba(0,0,0,0.03)",
                    display: "flex", flexDirection: "column", minHeight: 130,
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: `linear-gradient(135deg, ${persona.color}22, ${persona.color}08)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 17, marginBottom: 8,
                    border: `1px solid ${persona.color}20`,
                  }}>
                    {persona.icon}
                  </div>
                  <div style={{
                    fontSize: 9, fontWeight: 800, color: persona.color,
                    letterSpacing: 0.5, marginBottom: 2,
                  }}>{persona.id}</div>
                  <div style={{
                    fontSize: 12, fontWeight: 800, color: C.text,
                    lineHeight: 1.35, marginBottom: 4,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}>
                    {persona.title}
                  </div>
                  <div style={{
                    fontSize: 10, color: C.textSoft, lineHeight: 1.4,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    marginBottom: "auto",
                    paddingBottom: 8,
                  }}>
                    {persona.subtitle}
                  </div>
                  <div style={{
                    paddingTop: 8,
                    borderTop: "1px solid #F3F4F6",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ fontSize: 10, color: C.textSoft, fontWeight: 600 }}>
                      {opps.length}개 기회
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: persona.color }}>
                      연 {persona.annualSearchVolume >= 10000 ? `${(persona.annualSearchVolume / 10000).toFixed(0)}만` : fmt(persona.annualSearchVolume)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5개 페르소나 섹션 */}
        {/* 안내 */}
        <div style={{
          fontSize: 11, color: C.textSoft, marginBottom: 12, paddingLeft: 4,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span>💡</span>
          <span>페르소나를 클릭하면 해당 기회들이 펼쳐집니다. 한 번에 하나씩.</span>
        </div>

        {ALL_CARD_PERSONAS.map(persona => {
          const opps = getOpportunitiesByPersona(persona.id);
          const isOpen = openPersona === persona.id;
          const totalVolume = opps.reduce((s, o) => s + (o.annualVolume || 0), 0);
          return (
            <div
              key={persona.id}
              id={`persona-${persona.id}`}
              style={{
                marginBottom: 10,
                background: "#FFFFFF", borderRadius: 14,
                border: `1px solid ${persona.color}${isOpen ? "50" : "25"}`,
                borderLeft: `4px solid ${persona.color}`,
                overflow: "hidden",
                transition: "all 0.2s",
                boxShadow: isOpen ? `0 4px 12px ${persona.color}15` : "none",
              }}
            >
              {/* 페르소나 헤더 (클릭 가능) */}
              <div
                onClick={() => setOpenPersona(isOpen ? null : persona.id)}
                style={{
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex", alignItems: "flex-start", gap: 14,
                  transition: "background 0.15s",
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `linear-gradient(135deg, ${persona.color}20, ${persona.color}08)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0, border: `1px solid ${persona.color}20`,
                }}>{persona.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: persona.color, letterSpacing: 0.5 }}>{persona.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 900, color: C.text }}>{persona.title}</span>
                    <span style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 10,
                      background: persona.color + "15", color: persona.color, fontWeight: 800,
                    }}>{opps.length}개 기회</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.5, marginBottom: isOpen ? 0 : 4 }}>
                    {persona.subtitle}
                  </div>
                  {!isOpen && (
                    <div style={{ fontSize: 10, color: C.textSoft, fontWeight: 600, marginTop: 4 }}>
                      연간 {fmt(totalVolume)}회 · {persona.demoTags.slice(0, 2).join(" · ")}
                    </div>
                  )}
                </div>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  {!isOpen && (
                    <div style={{ color: persona.color, fontSize: 12, fontWeight: 800 }}>
                      연 {fmt(totalVolume)}회
                    </div>
                  )}
                  <div style={{
                    fontSize: 14, color: persona.color,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.25s",
                  }}>▼</div>
                </div>
              </div>

              {/* 펼친 상태 */}
              {isOpen && (
                <div style={{
                  padding: "0 20px 20px 20px",
                  borderTop: `1px dashed ${persona.color}25`,
                  animation: "fadeIn 0.25s ease",
                }}>
                  {/* 페르소나 상세 설명 */}
                  <div style={{
                    padding: "12px 14px", marginTop: 14, marginBottom: 14,
                    background: `${persona.color}06`, borderRadius: 10,
                    border: `1px solid ${persona.color}15`,
                  }}>
                    <div style={{ fontSize: 11, color: "#4B5563", lineHeight: 1.7, marginBottom: 8 }}>
                      {persona.description}
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: 10, padding: "3px 9px", borderRadius: 6,
                        background: persona.color + "12", color: persona.color, fontWeight: 700,
                      }}>연 {fmt(persona.annualSearchVolume)}회</span>
                      {persona.demoTags.map((t, i) => (
                        <span key={i} style={{
                          fontSize: 10, padding: "3px 9px", borderRadius: 6,
                          background: "#FFFFFF", color: "#6B7280", fontWeight: 500,
                          border: "1px solid #E5E7EB",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* 기회 카드 */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {opps.map(opp => (
                      <div
                        key={opp.id}
                        onClick={(e) => { e.stopPropagation(); goToAnalysis({ ...opp, _isAllV2: true, _persona: persona }); }}
                        style={{
                          background: "#FFFFFF", borderRadius: 10,
                          border: "1px solid #E5E7EB",
                          borderLeft: `3px solid ${persona.color}`,
                          padding: "12px 14px",
                          cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 12,
                          transition: "all 0.15s",
                        }}
                      >
                        <div style={{ fontSize: 20, flexShrink: 0 }}>{opp.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", gap: 5, marginBottom: 3, flexWrap: "wrap" }}>
                            {opp.tier && (
                              <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.tier] || "#6B7280", padding: "2px 6px", borderRadius: 4 }}>{opp.tier}</span>
                            )}
                            <span style={{
                              fontSize: 9, padding: "2px 7px", borderRadius: 10,
                              background: `${persona.color}15`, color: persona.color, fontWeight: 700,
                            }}>{opp.hookType}</span>
                            <span style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 600 }}>{opp.id}</span>
                          </div>
                          <div style={{ fontSize: 12.5, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>
                            {opp.title}
                          </div>
                          {opp.subtitle && (
                            <div style={{ fontSize: 10.5, color: C.textSoft, lineHeight: 1.5, marginBottom: opp.painPoints?.length ? 4 : 0 }}>
                              {opp.subtitle}
                            </div>
                          )}
                          {opp.painPoints && opp.painPoints.length > 0 && (
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 4, fontSize: 10, color: "#6B7280", lineHeight: 1.4 }}>
                              <span style={{ flexShrink: 0 }}>😣</span>
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{opp.painPoints[0]}</span>
                            </div>
                          )}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ color: persona.color, fontSize: 10.5, fontWeight: 800 }}>연 {fmt(opp.annualVolume)}</div>
                          <div style={{ color: C.textSoft, fontSize: 9 }}>월 {fmt(opp.monthlyVolume)}</div>
                          <div style={{ color: persona.color, fontSize: 13, marginTop: 2 }}>→</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Phase 12-4: 교차 인사이트 섹션 삭제됨 (경쟁 환경 섹션이 대체) */}
      </div>
    );
  };

  // ──────────── CATEGORY VIEW ────────────
  const renderCategory = () => {
    if (!currentCategory) return null;
    if (currentCategory === "all") return renderAllCategory();
    if (currentCategory === "need") return renderNeedCategory();
    if (currentCategory === "you") return renderYouCategory();
    const cat = CATEGORIES[currentCategory];
    const opps = OPPS.filter(o => o.category === currentCategory);
    const subgroups = [...new Set(opps.map(o => o.subgroup))];
    const isMulti = Array.isArray(cat.multiColor);
    const totalAnnual = opps.reduce((s, o) => s + (o.annualVol || 0), 0);

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← 전체 기회로 돌아가기" />

        {/* Category Header */}
        <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${cat.color}25`, marginBottom: 22, overflow: "hidden" }}>
          <div style={{
            height: 5,
            background: isMulti
              ? `linear-gradient(90deg, ${cat.multiColor[0]}, ${cat.multiColor[1]}, ${cat.multiColor[2]})`
              : `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`,
          }} />
          <div style={{ padding: "24px" }}>
            <div style={{ fontSize: 22, marginBottom: 12, letterSpacing: 3 }}>{cat.icons.join(" ")}</div>
            <div style={{ color: cat.color, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{cat.label}</div>
            <div style={{ color: C.text, fontSize: 20, fontWeight: 900, marginBottom: 6 }}>{cat.title}</div>
            <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 10 }}>{cat.tagline}</div>
            <div style={{ color: C.textSoft, fontSize: 11, marginBottom: 12, fontWeight: 600 }}>{cat.headerMeta}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {cat.uspPills.map((p, i) => (
                <span key={i} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}30` }}>{p}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: cat.color + "15", color: cat.color }}>{opps.length}개 기회</span>
              <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F3F4F6", color: "#374151" }}>연간 {fmt(totalAnnual)}회</span>
            </div>
          </div>
        </div>

        {/* Subgroup sections */}
        {subgroups.map(sg => {
          const items = opps.filter(o => o.subgroup === sg);
          return (
            <div key={sg} style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, marginBottom: 12 }}>
                <div style={{ flex: 1, height: 1, background: `${cat.color}25` }} />
                <span style={{ color: cat.color, fontSize: 11, fontWeight: 800, padding: "4px 12px", background: `${cat.color}10`, borderRadius: 12, letterSpacing: 0.5 }}>
                  {sg} ({items.length})
                </span>
                <div style={{ flex: 1, height: 1, background: `${cat.color}25` }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(opp => {
                  const cardColor = CARDS[opp.card]?.color || cat.color;
                  return (
                    <div
                      key={opp.id}
                      onClick={() => goToAnalysis(opp)}
                      style={{
                        background: "#FFFFFF", borderRadius: 14,
                        border: "1px solid #E5E7EB",
                        borderLeft: `4px solid ${cardColor}`,
                        padding: "16px 18px",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 14,
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ fontSize: 28, flexShrink: 0 }}>{opp.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                          {opp.level && !opp.isInsight && (
                            <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.level], padding: "2px 7px", borderRadius: 4 }}>{opp.level}</span>
                          )}
                          <span style={pill(`${cardColor}15`, cardColor)}>{CARDS[opp.card]?.name || opp.card}</span>
                          <span style={pill("#F8FAFC", C.textSoft)}>{opp.hookType}</span>
                        </div>
                        <div style={{ color: C.text, fontSize: 14, fontWeight: 800, marginBottom: 4, lineHeight: 1.35 }}>{opp.title}</div>
                        <div style={{ color: C.textSoft, fontSize: 11, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                          {opp.strategyCopy}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        {opp.annualVol > 0 && (
                          <>
                            <div style={{ color: cardColor, fontSize: 12, fontWeight: 800 }}>연 {fmt(opp.annualVol)}회</div>
                            <div style={{ color: C.textSoft, fontSize: 10 }}>월 {fmt(opp.monthlyVol)}회</div>
                          </>
                        )}
                        <div style={{ color: cardColor, fontSize: 16, marginTop: 4 }}>→</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ──────────── ANALYSIS VIEW ────────────
  const renderAnalysis = () => {
    if (!selectedOpp) return null;
    let opp = selectedOpp;

    // ── v2 ALL 카드 스키마 어댑터 ──
    if (opp._isAllV2) {
      const persona = opp._persona;
      const axisAdapter = (axis) => axis ? { tags: axis.tags || [], evidence: axis.dataEvidence || "" } : null;
      // 콘텐츠 훅 enrichment (algorithmSignal + contentHookEvidence 자동 생성)
      opp = enrichContentHook(opp);
      opp = {
        ...opp,
        card: "ALL",
        level: opp.tier,
        strategyCopy: opp.description,
        hookLabel: persona ? persona.title : "",
        usp: opp.uspConnection,
        monthlyVol: opp.monthlyVolume,
        annualVol: opp.annualVolume,
        peakMonths: opp.monthlyTrend || opp.peakMonths || generateMonthlyTrend(opp.annualVolume || 0, opp.seasonality || { type: "flat" }),
        peakSeason: opp.peakSeason || (opp.seasonality?.description) || "연중 안정",
        context: {
          who: axisAdapter(opp.who),
          what: axisAdapter(opp.what),
          when: axisAdapter(opp.when),
          where: axisAdapter(opp.where),
          why: axisAdapter(opp.why),
          how: axisAdapter(opp.how),
        },
        pathJourney: opp.pathFinder || [],
        pathInsight: opp.cluster ? `핵심 클러스터: ${opp.cluster.join(" · ")}` : "",
        clusterInsight: opp.cluster ? opp.cluster.join(" · ") : "",
        topKeywords: (opp.relatedKeywords || []).map(k => ({ keyword: k.term, vol: k.volume })),
      };
    }

    const cardColor = CARDS[opp.card]?.color || "#2563EB";
    const cardName = CARDS[opp.card]?.name || opp.card;

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← 기회 목록으로" />

        {/* Hero Header */}
        <div style={{
          background: `linear-gradient(135deg, ${cardColor}10, ${cardColor}03)`,
          borderRadius: 18, border: `1px solid ${cardColor}30`,
          padding: 26, marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
            <span style={{ fontSize: 44 }}>{opp.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{opp.title}</div>
              <div style={{ fontSize: 12, color: C.textSoft, lineHeight: 1.6 }}>{opp.strategyCopy}</div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <BookmarkButton opportunity={opp} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {opp.level && <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", background: LEVEL_COLORS[opp.level], padding: "3px 10px", borderRadius: 8 }}>{opp.level}</span>}
            <span style={pill(`${cardColor}15`, cardColor)}>{cardName} · {opp.usp}</span>
            <span style={pill("#F8FAFC", C.textSoft)}>{opp.hookType} {opp.hookLabel ? `· ${opp.hookLabel}` : ""}</span>
            {opp.annualVol > 0 && <span style={pill(`${cardColor}15`, cardColor)}>연간 {fmt(opp.annualVol)}회</span>}
            {opp.monthlyVol > 0 && <span style={pill(`${cardColor}15`, cardColor)}>월 {fmt(opp.monthlyVol)}회</span>}
          </div>
        </div>

        {/* 카니발라이제이션 배너 (Phase 8-2) */}
        {(() => {
          const warnings = detectCannibalization(opp);
          if (warnings.length === 0) return null;
          const isRecommended = warnings.every(w => w.recommendation.oppId === opp.id);

          if (isRecommended) {
            return (
              <div style={{
                padding: "14px 18px", marginBottom: 16, borderRadius: 12,
                background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)",
                border: "1px solid #A7F3D0",
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
                <span style={{ fontSize: 18 }}>✓</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#047857", marginBottom: 2 }}>
                    이 카드가 최적의 연결 지점
                  </div>
                  <div style={{ fontSize: 11, color: "#065F46", lineHeight: 1.5 }}>
                    {warnings.length}개 키워드에서 이 기회가 타 카드 대비 최우선 추천됨 (tier/검색량 기준)
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div style={{
              padding: "14px 18px", marginBottom: 16, borderRadius: 12,
              background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
              border: "1px solid #FCD34D",
              display: "flex", alignItems: "flex-start", gap: 12,
            }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#92400E", marginBottom: 8 }}>
                  이 기회는 다른 카드와 일부 겹칩니다
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {warnings.slice(0, 3).map((w, i) => {
                    const isMine = w.recommendation.oppId === opp.id;
                    return (
                      <div key={i} style={{ fontSize: 11, color: "#78350F", lineHeight: 1.5 }}>
                        <span style={{ fontWeight: 700 }}>"{w.term}"</span>
                        <span style={{ color: "#B45309" }}> → </span>
                        {isMine ? (
                          <span style={{ color: "#047857", fontWeight: 700 }}>✓ 이 카드가 최적</span>
                        ) : (
                          <span>
                            <strong style={{ color: "#92400E" }}>{w.recommendation.card}</strong> 권장
                            <span style={{ color: "#A16207" }}> ({w.recommendation.tier} · 연 {fmt(w.recommendation.volume)}회)</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {warnings.length > 3 && (
                  <div style={{ fontSize: 10, color: "#A16207", marginTop: 6 }}>
                    외 {warnings.length - 3}개 키워드 중복
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Monthly Trend */}
        <div style={{ background: "#FFFFFF", borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>📈 월별 검색 트렌드</span>
            {opp.peakSeason && <span style={{ color: cardColor, fontSize: 11, fontWeight: 700 }}>피크: {opp.peakSeason}</span>}
          </div>
          <div style={{ fontSize: 10, color: C.textSoft, marginBottom: 14 }}>
            {(() => {
              const trend = opp.peakMonths || [];
              const isRaw = Math.max(...trend, 0) > 100;
              const sum = trend.reduce((a, b) => a + b, 0);
              return isRaw
                ? `연간 ${fmt(sum)}회 · 월 평균 ${fmt(Math.round(sum / 12))}회`
                : (opp.annualVol > 0 ? `연간 ${fmt(opp.annualVol)}회 · 월 평균 ${fmt(Math.round(opp.annualVol / 12))}회` : "검색량 정보 제한적");
            })()}
          </div>
          <MiniHeatmap data={opp.peakMonths} color={cardColor} />
        </div>

        {/* 6-Axis Grid — 1280 레이아웃에서 3열 확장 */}
        {opp.context && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 18 }}>
            {AXIS_CFG.map(ax => {
              const d = opp.context[ax.key];
              if (!d) return null;
              return (
                <div key={ax.key} style={{ background: "#FFFFFF", borderRadius: 14, border: `1px solid ${C.border}`, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 16 }}>{ax.icon}</span>
                    <div>
                      <div style={{ color: C.text, fontSize: 12, fontWeight: 800 }}>{ax.label}</div>
                      <div style={{ color: C.textSoft, fontSize: 9, letterSpacing: 0.5 }}>{ax.sub}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                    {d.tags.map((t, i) => (
                      <span key={i} style={{ fontSize: 10, fontWeight: 500, color: C.text, background: `${ax.color}12`, border: `1px solid ${ax.color}30`, padding: "3px 8px", borderRadius: 20 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ background: "#F8FAFC", borderRadius: 6, padding: "8px 10px", border: `1px solid ${C.border}` }}>
                    <div style={{ color: C.textSoft, fontSize: 8, fontWeight: 800, letterSpacing: 1, marginBottom: 3 }}>DATA EVIDENCE</div>
                    <div style={{ color: C.text, fontSize: 10.5, lineHeight: 1.5 }}>{d.evidence}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Search Journey — 마지막 노드를 오렌지로 강조 (종착지 = 카드 도달점) */}
        {opp.pathJourney && opp.pathJourney.length > 0 && (
          <div style={{ background: "#FFFFFF", borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>🔍 검색 여정 (PathFinder)</span>
              <span style={{ fontSize: 10, color: C.textSoft, fontWeight: 600 }}>
                {opp.pathJourney.length}단계 · 오렌지 = 카드 도달점
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {opp.pathJourney.map((node, i) => {
                const isLast = i === opp.pathJourney.length - 1;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <span style={{
                        color: isLast ? "#CA8A04" : "#6B7280",
                        fontWeight: 800, fontSize: 14,
                      }}>→</span>
                    )}
                    <span style={{
                      background: isLast
                        ? "linear-gradient(135deg, #FFB71B, #F59E0B)"
                        : "linear-gradient(135deg, #F0FDF4, #DCFCE7)",
                      color: isLast ? "#1F2937" : "#166534",
                      padding: "6px 13px", borderRadius: 10,
                      fontSize: 11, fontWeight: isLast ? 800 : 700,
                      border: `1px solid ${isLast ? "#F59E0B" : "#BBF7D0"}`,
                      boxShadow: isLast ? "0 0 0 3px #FDE68A80, 0 2px 6px rgba(245, 158, 11, 0.2)" : "none",
                      display: "inline-flex", alignItems: "center", gap: 4,
                    }}>
                      {isLast && <span>🎯</span>}
                      <span>{node}</span>
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
            {opp.pathInsight && <div style={{ color: C.textSoft, fontSize: 11, lineHeight: 1.6 }}>{opp.pathInsight}</div>}
          </div>
        )}

        {/* 경쟁 환경 — competitors 필드가 있는 경우에만 (미래 확장용) */}
        {opp.competitors && opp.competitors.length > 0 && (
          <div style={{ background: "#FFFFFF", borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, marginBottom: 14 }}>
            <div style={{ color: C.text, fontSize: 13, fontWeight: 800, marginBottom: 12 }}>🏆 경쟁 카드 환경</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {opp.competitors.map((comp, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0",
                  borderBottom: i < opp.competitors.length - 1 ? "1px solid #F3F4F6" : "none",
                }}>
                  <span style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{comp.name}</span>
                  <span style={{ fontSize: 12, color: C.textSoft, fontWeight: 700 }}>
                    연 {(comp.annualVolume || 0).toLocaleString()}회
                  </span>
                </div>
              ))}
            </div>
            {opp.competitiveInsight && (
              <div style={{
                marginTop: 12, padding: "10px 14px", borderRadius: 10,
                background: "#EFF6FF", border: "1px solid #BFDBFE",
                fontSize: 11, color: "#1E40AF", lineHeight: 1.6,
              }}>
                <strong>💡 INSIGHT:</strong> {opp.competitiveInsight}
              </div>
            )}
          </div>
        )}

        {/* Cluster Insight */}
        {opp.clusterInsight && (
          <div style={{ background: `${cardColor}08`, borderRadius: 14, border: `1px solid ${cardColor}20`, padding: 18, marginBottom: 14 }}>
            <div style={{ color: C.text, fontSize: 13, fontWeight: 800, marginBottom: 8 }}>🧠 소비자 인식 (Cluster)</div>
            <div style={{ color: C.text, fontSize: 12, lineHeight: 1.7 }}>{opp.clusterInsight}</div>
          </div>
        )}

        {/* 🏆 경쟁 환경 (Phase 10-5) */}
        {opp.competition && opp.competition.ranking && opp.competition.ranking.length > 0 && (
          <div style={{ background: "#FFFFFF", borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ color: C.text, fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", gap: 6 }}>
                <span>🏆</span>
                <span>경쟁 환경</span>
              </div>
              <span style={{ fontSize: 10, color: C.textSoft, fontWeight: 600 }}>
                이 키워드 영역의 검색 경쟁 맵
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              {opp.competition.ranking.map((comp, i) => {
                const isKB = comp.name.includes("KB") || comp.name.includes("국민카드")
                  || comp.name.includes("NEED") || comp.name.includes("YOU Prime") || comp.name.includes("ALL ");
                const getBadge = (share) => {
                  if (share?.includes("1위") || share?.includes("허브")) return { icon: "1", bg: "#FEF3C7", color: "#92400E" };
                  if (share?.includes("2위")) return { icon: "2", bg: "#F3F4F6", color: "#374151" };
                  if (share?.includes("3위")) return { icon: "3", bg: "#FED7AA", color: "#9A3412" };
                  if (share?.includes("4위")) return { icon: "4", bg: "#DBEAFE", color: "#1E40AF" };
                  if (share?.includes("공백") || share?.includes("신설")) return { icon: "✨", bg: "#D1FAE5", color: "#047857" };
                  return { icon: "?", bg: "#FEE2E2", color: "#B91C1C" };
                };
                const badge = getBadge(comp.share);
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px", borderRadius: 10,
                    background: isKB ? "#FEFCE8" : "#F9FAFB",
                    border: `1px solid ${isKB ? "#FDE68A" : "#F3F4F6"}`,
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: badge.bg, color: badge.color,
                      fontSize: 11, fontWeight: 800, flexShrink: 0,
                    }}>{badge.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: isKB ? "#854D0E" : C.text }}>
                        {comp.name}
                        {isKB && <span style={{ marginLeft: 6, fontSize: 9, color: "#A16207" }}>(자사)</span>}
                      </div>
                      <div style={{ fontSize: 10, color: C.textSoft, marginTop: 2 }}>{comp.type}</div>
                    </div>
                    <div style={{ fontSize: 11, color: C.textSoft, fontWeight: 600, fontFamily: "monospace", flexShrink: 0 }}>
                      연 {fmt(comp.volume)}
                    </div>
                  </div>
                );
              })}
            </div>
            {opp.competition.insight && (
              <div style={{
                padding: "10px 12px", borderRadius: 10,
                background: "#EFF6FF", border: "1px solid #BFDBFE",
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#1D4ED8", marginBottom: 4, letterSpacing: 0.5 }}>
                  💡 INSIGHT
                </div>
                <div style={{ fontSize: 11, color: "#1E3A8A", lineHeight: 1.6 }}>
                  {opp.competition.insight}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Top Keywords */}
        {opp.topKeywords && opp.topKeywords.length > 0 && (
          <div style={{ background: "#FFFFFF", borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, marginBottom: 14 }}>
            <div style={{ color: C.text, fontSize: 13, fontWeight: 800, marginBottom: 12 }}>🔑 관련 검색어 TOP</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {opp.topKeywords.map((kw, i) => (
                <span key={i} style={{
                  background: i < 3 ? `${cardColor}10` : "#F8FAFC",
                  color: i < 3 ? cardColor : C.text,
                  padding: "5px 11px", borderRadius: 20, fontSize: 11,
                  fontWeight: i < 3 ? 700 : 500,
                  border: `1px solid ${i < 3 ? `${cardColor}30` : C.border}`,
                }}>
                  {kw.keyword} <span style={{ color: C.textSoft, fontSize: 9, marginLeft: 2 }}>{fmt(kw.vol)}/월</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content Hook + Data Evidence (Phase 7.3) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 14 }}>
          {/* ✨ 콘텐츠 훅 (오렌지) */}
          <div style={{
            background: "linear-gradient(135deg, #FFF7ED, #FEF3C7)",
            borderRadius: 14, border: "1px solid #FDBA74",
            padding: 18,
          }}>
            <div style={{ color: "#C2410C", fontSize: 11, fontWeight: 800, marginBottom: 8, letterSpacing: 0.5 }}>
              ✨ 콘텐츠 훅 예시
            </div>
            {opp.contentHook && (
              <div style={{ color: "#1E293B", fontSize: 15, fontWeight: 800, lineHeight: 1.5, marginBottom: 12 }}>
                "{opp.contentHook}"
              </div>
            )}
            {opp.algorithmSignal && (
              <div style={{
                paddingTop: 10,
                borderTop: "1px solid #FDBA7455",
              }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: "#C2410C", marginBottom: 4, letterSpacing: 0.5 }}>
                  🔥 알고리즘 시그널
                </div>
                <div style={{ fontSize: 10.5, color: "#7C2D12", lineHeight: 1.6 }}>
                  {opp.algorithmSignal}
                </div>
              </div>
            )}
          </div>

          {/* 📊 DATA EVIDENCE (블루) */}
          <div style={{
            background: "linear-gradient(135deg, #EFF6FF, #F0F9FF)",
            borderRadius: 14, border: "1px solid #93C5FD",
            padding: 18,
          }}>
            <div style={{ color: "#1D4ED8", fontSize: 11, fontWeight: 800, marginBottom: 8, letterSpacing: 0.5 }}>
              📊 DATA EVIDENCE
            </div>
            <div style={{ color: "#1E3A8A", fontSize: 11.5, lineHeight: 1.7 }}>
              {opp.contentHookEvidence || opp.dataProof || "검색 데이터 기반 타겟 확보"}
            </div>
          </div>
        </div>

        {/* Pain Points + USP */}
        {(opp.painPoints?.length > 0 || opp.uspConnection) && (
          <div style={{ background: "#FFFFFF", borderRadius: 14, border: `1px solid ${C.border}`, padding: 18, marginBottom: 18 }}>
            {opp.painPoints?.length > 0 && (
              <>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>😣 페인 포인트</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                  {opp.painPoints.map((p, i) => (
                    <div key={i} style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5 }}>· {p}</div>
                  ))}
                </div>
              </>
            )}
            {opp.uspConnection && (
              <>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 800, marginBottom: 6 }}>🔗 USP 연결</div>
                <div style={{ background: `${cardColor}08`, borderRadius: 8, padding: "10px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, border: `1px solid ${cardColor}20` }}>
                  {opp.uspConnection}
                </div>
              </>
            )}
          </div>
        )}

        {/* Execute Button */}
        <button
          onClick={goToIdeas}
          style={{
            width: "100%",
            background: cardColor, color: "#fff",
            border: "none", borderRadius: 14,
            padding: "18px 0",
            fontSize: 15, fontWeight: 800, cursor: "pointer",
          }}
        >
          🎬 실행 — AI 숏폼 아이디어 생성
        </button>
      </div>
    );
  };

  // ──────────── IDEAS VIEW (Phase 12-7: 4탭 + 점수 + 트립닷컴 스타일) ────────────
  const IDEAS_TABS = [
    { id: "auto",    label: "AI 자동추천",          color: "#2563EB" },
    { id: "context", label: "A. 소비자 맥락 조합",    color: "#EC4899" },
    { id: "journey", label: "B. 검색 여정 앵글",      color: "#10B981" },
    { id: "cross",   label: "C. 크로스 카테고리",     color: "#8B5CF6" },
  ];

  const renderIdeas = () => {
    if (!selectedOpp) return null;
    const opp = selectedOpp;
    const cardColor = CARDS[opp.card]?.color || "#2563EB";
    const key = `${opp.id}::${ideasTab}`;
    const state = aiIdeas[key] || {};
    const { loading, error, ideas } = state;
    const activeTabMeta = IDEAS_TABS.find(t => t.id === ideasTab);

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← 기회 분석으로" />

        {/* 타이틀 */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 34 }}>{opp.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.text, lineHeight: 1.3 }}>{opp.title}</div>
            <div style={{ fontSize: 12, color: C.textSoft, marginTop: 3 }}>
              🎬 AI 생성 숏폼 아이디어 결과 · {activeTabMeta?.label} 관점
              {ideas && ` · 숏폼 아이디어 ${ideas.length}개 생성 완료`}
            </div>
          </div>
        </div>

        {/* 4탭 */}
        <div style={{
          display: "flex", gap: 2, marginBottom: 20,
          borderBottom: "1px solid #E5E7EB",
          overflowX: "auto",
        }}>
          {IDEAS_TABS.map(tab => {
            const tabKey = `${opp.id}::${tab.id}`;
            const tabState = aiIdeas[tabKey];
            const hasIdeas = tabState?.ideas?.length > 0;
            const isLoading = tabState?.loading;
            const isActive = ideasTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setIdeasTab(tab.id);
                  if (!tabState?.ideas && !tabState?.loading) {
                    generateIdeas(opp, tab.id);
                  }
                }}
                style={{
                  padding: "10px 16px",
                  border: "none",
                  borderBottom: `3px solid ${isActive ? tab.color : "transparent"}`,
                  background: isActive ? `${tab.color}12` : "transparent",
                  color: isActive ? tab.color : hasIdeas ? C.text : C.textSoft,
                  fontSize: 12, fontWeight: isActive ? 800 : 600,
                  cursor: "pointer", whiteSpace: "nowrap",
                  display: "inline-flex", alignItems: "center", gap: 6,
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
                {isLoading && (
                  <span style={{
                    width: 12, height: 12,
                    border: "2px solid #CBD5E1", borderTopColor: tab.color,
                    borderRadius: "50%", animation: "spin 0.8s linear infinite",
                  }} />
                )}
                {hasIdeas && !isActive && (
                  <span style={{
                    padding: "1px 6px", borderRadius: 10,
                    background: "#E5E7EB", color: "#6B7280",
                    fontSize: 9, fontWeight: 800,
                  }}>{tabState.ideas.length}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 로딩 */}
        {loading && (
          <div style={{
            padding: "60px 24px", borderRadius: 16,
            background: `linear-gradient(135deg, ${activeTabMeta?.color}08, ${activeTabMeta?.color}14)`,
            border: `2px solid ${activeTabMeta?.color}30`,
            textAlign: "center",
          }}>
            <div style={{
              display: "inline-block", width: 40, height: 40,
              border: "4px solid #E5E7EB", borderTopColor: activeTabMeta?.color,
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
              marginBottom: 16,
            }} />
            <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>
              {activeTabMeta?.label} 관점으로 생성 중...
            </div>
            <div style={{ fontSize: 11, color: C.textSoft }}>
              약 20-40초 소요 · Claude Sonnet 4.5 · 5개 아이디어 동시 생성
            </div>
          </div>
        )}

        {/* 에러 */}
        {error && !loading && (
          <div style={{
            padding: "20px", borderRadius: 12,
            background: "#FEF2F2", border: "1px solid #FECACA",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#B91C1C", marginBottom: 6 }}>⚠️ 생성 실패</div>
            <div style={{ fontSize: 12, color: "#7F1D1D", marginBottom: 12, lineHeight: 1.6 }}>{error}</div>
            <button
              onClick={() => generateIdeas(opp, ideasTab)}
              style={{
                padding: "8px 14px", borderRadius: 8,
                border: "none", background: "#DC2626", color: "#FFFFFF",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}
            >재시도</button>
          </div>
        )}

        {/* 아이디어 결과 */}
        {ideas && !loading && ideas.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ideas.map((idea, idx) => (
              <ShortformIdeaCard
                key={idea.id || idx}
                idea={idea}
                index={idx}
                cardColor={cardColor}
                tabColor={activeTabMeta?.color}
                perspectiveLabel={activeTabMeta?.label}
              />
            ))}
            <button
              onClick={() => generateIdeas(opp, ideasTab)}
              style={{
                marginTop: 6, padding: "12px", borderRadius: 10,
                border: "1px dashed #CBD5E1", background: "#FFFFFF",
                color: C.textSoft, fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}
            >↻ 이 관점으로 다시 생성</button>
          </div>
        )}

        {/* 초기 상태 */}
        {!loading && !error && !ideas && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <div style={{ fontSize: 13, color: C.textSoft, marginBottom: 16 }}>
              {activeTabMeta?.label} 관점으로 5개의 숏폼 아이디어를 생성합니다.
            </div>
            <button
              onClick={() => generateIdeas(opp, ideasTab)}
              style={{
                padding: "14px 28px", borderRadius: 12,
                border: "none",
                background: `linear-gradient(135deg, ${activeTabMeta?.color}, ${activeTabMeta?.color}DD)`,
                color: "#FFFFFF",
                fontSize: 14, fontWeight: 800, cursor: "pointer",
                boxShadow: `0 4px 12px ${activeTabMeta?.color}40`,
              }}
            >🎬 AI 아이디어 생성 시작</button>
          </div>
        )}
      </div>
    );
  };

  // ──────────── STORYBOARD VIEW (Phase 12-8) ────────────
  const renderStoryboard = () => {
    if (!selectedOpp || !selectedIdea) {
      return (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
          <BackNav label="← 아이디어 목록으로" />
          <div style={{ textAlign: "center", padding: 60, color: C.textSoft }}>
            아이디어를 먼저 선택해주세요.
          </div>
        </div>
      );
    }
    const opp = selectedOpp;
    const idea = selectedIdea;
    const cardColor = CARDS[opp.card]?.color || "#2563EB";
    const sbKey = `${opp.id}::${idea.id}`;
    const sbState = storyboards[sbKey] || {};
    const { loading, error, data } = sbState;

    // 자동 생성 트리거 (처음 진입 시 1회)
    if (!loading && !error && !data && typeof window !== "undefined") {
      // 무한 루프 방지: state에 loading:true 즉시 설정
      if (!storyboards[sbKey]) {
        setTimeout(() => generateStoryboard(opp, idea), 0);
      }
    }

    // YouTube 크리에이터 자동 검색
    const ytState = ytCreators[opp.id] || {};
    if (!ytState.loading && !ytState.channels && !ytState.error && typeof window !== "undefined") {
      if (!ytCreators[opp.id]) {
        setTimeout(() => {
          const query = (opp.relatedKeywords?.[0]?.term) || opp.title?.substring(0, 20) || "KB 국민카드";
          searchYouTubeCreators(opp.id, query);
        }, 0);
      }
    }

    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 60px" }}>
        <BackNav label="← 아이디어 목록으로" />

        {/* 아이디어 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 32 }}>🎯</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                {idea.hookType && (
                  <span style={{
                    padding: "2px 8px", borderRadius: 4,
                    background: "#FEE2E2", color: "#B91C1C",
                    fontSize: 10, fontWeight: 800,
                  }}>🎭 {idea.hookType}</span>
                )}
                {idea.funnelStage && (
                  <span style={{
                    padding: "2px 8px", borderRadius: 4,
                    background: "#DBEAFE", color: "#1D4ED8",
                    fontSize: 10, fontWeight: 800,
                  }}>{idea.funnelStage === "Awareness" ? "Dream" : idea.funnelStage === "Consideration" ? "Plan" : idea.funnelStage === "Decision" ? "Book" : idea.funnelStage}</span>
                )}
                {typeof idea.score === "number" && (
                  <span style={{ fontSize: 10, color: C.textSoft, fontWeight: 700 }}>완성점수 {idea.score}</span>
                )}
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.text, lineHeight: 1.4 }}>{idea.title}</div>
              {idea.openingHook && (
                <div style={{ fontSize: 12, color: "#EA580C", marginTop: 4, fontStyle: "italic" }}>
                  "{idea.openingHook}"
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => generateStoryboard(opp, idea)}
            disabled={loading}
            style={{
              padding: "8px 14px", borderRadius: 8,
              border: "1px solid #BFDBFE", background: "#FFFFFF", color: "#2563EB",
              fontSize: 12, fontWeight: 700, cursor: loading ? "wait" : "pointer",
              flexShrink: 0,
            }}
          >{loading ? "생성 중..." : "↻ 다시 생성"}</button>
        </div>

        {/* 탭 (숏폼 콘텐츠만) */}
        <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB", marginBottom: 22 }}>
          <button style={{
            padding: "10px 18px", borderTopLeftRadius: 8, borderTopRightRadius: 8,
            background: "#2563EB", color: "#FFFFFF", border: "none",
            fontSize: 13, fontWeight: 800, cursor: "default",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            <span>▶</span>
            <span>숏폼 콘텐츠</span>
          </button>
        </div>

        {/* 로딩 */}
        {loading && !data && (
          <div style={{
            padding: "60px 24px", borderRadius: 16,
            background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
            border: "2px solid #BFDBFE",
            textAlign: "center", marginBottom: 24,
          }}>
            <div style={{
              display: "inline-block", width: 40, height: 40,
              border: "4px solid #DBEAFE", borderTopColor: "#2563EB",
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
              marginBottom: 16,
            }} />
            <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>
              플랫폼별 스토리보드 생성 중...
            </div>
            <div style={{ fontSize: 11, color: C.textSoft }}>
              약 30-60초 소요 · YouTube Shorts + Instagram Reels 각 맞춤 각색
            </div>
          </div>
        )}

        {/* 에러 */}
        {error && !loading && (
          <div style={{
            padding: 20, borderRadius: 12,
            background: "#FEF2F2", border: "1px solid #FECACA",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#B91C1C", marginBottom: 6 }}>⚠️ 생성 실패</div>
            <div style={{ fontSize: 12, color: "#7F1D1D", marginBottom: 10, lineHeight: 1.6 }}>{error}</div>
            <button
              onClick={() => generateStoryboard(opp, idea)}
              style={{
                padding: "8px 14px", borderRadius: 8,
                border: "none", background: "#DC2626", color: "#FFFFFF",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}
            >재시도</button>
          </div>
        )}

        {/* 플랫폼 2열 */}
        {data && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 14, marginBottom: 20,
            }}>
              <StoryboardPlatform platform="youtube" data={data.youtube_shorts} />
              <StoryboardPlatform platform="instagram" data={data.instagram_reels} />
            </div>

            {/* 미니 팩트 4개 */}
            {data.miniFacts && data.miniFacts.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 10, marginBottom: 20,
              }}>
                {data.miniFacts.map((fact, i) => (
                  <div key={i} style={{
                    padding: "12px 14px", borderRadius: 10,
                    background: "#FFFFFF", border: "1px solid #E5E7EB",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.text, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span>{fact.icon}</span>
                      <span>{fact.label}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textSoft, lineHeight: 1.5 }}>{fact.content}</div>
                  </div>
                ))}
              </div>
            )}

            {/* 콘텐츠 팩트시트 (노란) */}
            {data.factSheet && (
              <div style={{
                padding: "22px", borderRadius: 16,
                background: "#FEFCE8", border: "1px solid #FDE68A",
                marginBottom: 20,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>📋</span>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#78350F" }}>콘텐츠 팩트시트</div>
                </div>
                <div style={{ fontSize: 11, color: "#92400E", marginBottom: 16 }}>
                  이 아이디어 실제 숏폼 제작에 바로 활용할 검증된 팩트 모음
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
                  {data.factSheet.benefit_facts && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#78350F", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #FDE68A" }}>
                        💳 {opp.card} 혜택 팩트
                      </div>
                      {data.factSheet.benefit_facts.map((fact, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12 }}>
                          <div style={{ color: C.textSoft, flexShrink: 0, width: 70 }}>{fact.label}</div>
                          <div style={{ color: C.text, fontWeight: 700 }}>{fact.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {data.factSheet.search_facts && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#78350F", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #FDE68A" }}>
                        📊 검색 데이터 팩트
                      </div>
                      {data.factSheet.search_facts.map((fact, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12 }}>
                          <div style={{ color: C.textSoft, flexShrink: 0, width: 80 }}>{fact.label}</div>
                          <div style={{ color: C.text }}>{fact.value}</div>
                        </div>
                      ))}
                      {opp.annualVolume > 0 && (
                        <div style={{ display: "flex", gap: 10, marginTop: 10, paddingTop: 8, borderTop: "1px solid #FDE68A", fontSize: 12 }}>
                          <div style={{ color: C.textSoft, flexShrink: 0, width: 80 }}>연 검색량</div>
                          <div style={{ color: "#047857", fontWeight: 800, fontSize: 14 }}>{opp.annualVolume.toLocaleString()}회</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {(data.factSheet.shooting_timing || data.factSheet.connection) && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 16, paddingTop: 14, borderTop: "1px solid #FDE68A" }}>
                    {data.factSheet.shooting_timing && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#78350F", marginBottom: 4 }}>📅 촬영 타이밍</div>
                        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5 }}>{data.factSheet.shooting_timing}</div>
                      </div>
                    )}
                    {data.factSheet.connection && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#78350F", marginBottom: 4 }}>🔗 KB 연결</div>
                        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5 }}>{data.factSheet.connection}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 광고 타겟팅 */}
            {data.ad_targeting && data.ad_targeting.length > 0 && (
              <AdTargetingBlock rows={data.ad_targeting} />
            )}
          </>
        )}

        {/* 크리에이터 매칭 (YouTube API) */}
        <CreatorMatching oppId={opp.id} opp={opp} />

        {/* 하단 CTA */}
        <button
          onClick={() => setCurrentView("ideas")}
          style={{
            width: "100%", marginTop: 24, padding: "14px",
            borderRadius: 12, border: "1px solid #E5E7EB",
            background: "#FFFFFF", color: C.textSoft,
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}
        >— 다른 아이디어 보기 —</button>
      </div>
    );
  };

  // ──────────── StoryboardPlatform ────────────
  const StoryboardPlatform = ({ platform, data }) => {
    if (!data) return null;
    const meta = platform === "youtube"
      ? { name: "YouTube Shorts", color: "#FF0000", icon: "📺", max: "MAX 60s" }
      : { name: "Instagram Reels", color: "#C13584", icon: "📱", max: "MAX 90s" };

    return (
      <div style={{
        background: "#FFFFFF", borderRadius: 14,
        border: `1px solid ${meta.color}30`, overflow: "hidden",
      }}>
        <div style={{
          padding: "12px 16px",
          background: `linear-gradient(135deg, ${meta.color}12, ${meta.color}06)`,
          borderBottom: `1px solid ${meta.color}20`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>{meta.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: meta.color }}>{meta.name}</span>
            <span style={{ fontSize: 10, color: C.textSoft, fontWeight: 600 }}>{meta.max}</span>
          </div>
          <span style={{ fontSize: 10, color: C.textSoft, fontWeight: 600 }}>9:16</span>
        </div>
        <div style={{ padding: "16px 18px" }}>
          {data.title && (
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, lineHeight: 1.4, marginBottom: 10 }}>
              {data.title}
            </div>
          )}
          {data.hook && (
            <div style={{
              padding: "8px 12px", borderRadius: 8, marginBottom: 12,
              background: "#FFF7ED", border: "1px solid #FDBA7440",
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: "#C2410C", marginBottom: 3 }}>✦ HOOK</div>
              <div style={{ fontSize: 12, color: "#7C2D12", fontStyle: "italic", lineHeight: 1.5 }}>"{data.hook}"</div>
            </div>
          )}
          {data.scenes && data.scenes.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.text, marginBottom: 6 }}>📽️ SCENE FLOW</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {data.scenes.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 11 }}>
                    <span style={{ fontWeight: 800, color: meta.color, flexShrink: 0, fontFamily: "monospace", minWidth: 40 }}>
                      {s.time || `씬${i + 1}`}
                    </span>
                    <span style={{ color: C.text, lineHeight: 1.5 }}>
                      {s.visual || s.copy || ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.proof && (
            <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 10, lineHeight: 1.5 }}>
              📊 <strong>PROOF:</strong> {data.proof}
            </div>
          )}
          {data.cta && (
            <div style={{ fontSize: 11, color: C.text, marginBottom: 10, lineHeight: 1.5 }}>
              📣 <strong>CTA:</strong> {data.cta}
            </div>
          )}
          {data.hashtags && data.hashtags.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
              {data.hashtags.map((tag, i) => (
                <span key={i} style={{ fontSize: 10, color: meta.color, fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          )}
          <div style={{
            paddingTop: 10, borderTop: "1px solid #F3F4F6",
            display: "flex", gap: 12, flexWrap: "wrap",
            fontSize: 10, color: C.textSoft,
          }}>
            {data.bestTimeToPost && <span>🕒 {data.bestTimeToPost}</span>}
            {data.targetDemo && <span>👥 {data.targetDemo}</span>}
          </div>
        </div>
      </div>
    );
  };

  // ──────────── AdTargetingBlock (접힘) ────────────
  const AdTargetingBlock = ({ rows }) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{
        background: "#FFFFFF", borderRadius: 12,
        border: "1px solid #E5E7EB",
        overflow: "hidden", marginBottom: 20,
      }}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            padding: "12px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>📱</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>광고 노출 추천</span>
          </div>
          <span style={{ fontSize: 12, color: C.textSoft, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▼</span>
        </div>
        {open && (
          <div style={{ padding: "0 16px 14px 16px", borderTop: "1px solid #F3F4F6" }}>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {rows.map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontSize: 11, color: C.text, lineHeight: 1.6 }}>
                  <span style={{ color: C.textSoft, flexShrink: 0 }}>•</span>
                  <span>{row}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ──────────── CreatorMatching (YouTube API) ────────────
  const CreatorMatching = ({ oppId, opp }) => {
    const state = ytCreators[oppId] || {};
    const { loading, error, channels } = state;

    const formatSubs = (n) => {
      if (!n) return "정보 없음";
      if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
      if (n >= 1000) return `${Math.round(n / 1000)}K`;
      return n.toString();
    };

    const classifyTier = (subs) => {
      if (!subs) return { label: "?", color: "#9CA3AF" };
      if (subs >= 100000) return { label: "MACRO", color: "#DC2626" };
      if (subs >= 10000) return { label: "MICRO", color: "#2563EB" };
      return { label: "NANO", color: "#8B5CF6" };
    };

    return (
      <div style={{
        background: "#FFFFFF", borderRadius: 14,
        border: "1px solid #E5E7EB",
        padding: "18px 20px", marginBottom: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🎥</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>크리에이터 매칭</span>
            <span style={{ fontSize: 10, color: C.textSoft, fontWeight: 600 }}>YouTube Shorts 실시간 검색</span>
          </div>
          <button
            onClick={() => {
              const query = (opp.relatedKeywords?.[0]?.term) || opp.title?.substring(0, 20) || "KB 국민카드";
              searchYouTubeCreators(oppId, query);
            }}
            disabled={loading}
            style={{
              padding: "6px 12px", borderRadius: 8,
              border: "1px solid #E5E7EB", background: "#FFFFFF",
              color: C.textSoft, fontSize: 11, fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
            }}
          >{loading ? "검색 중..." : "↻ 다시 검색"}</button>
        </div>

        {loading && !channels && (
          <div style={{
            textAlign: "center", padding: 32,
            background: "#F9FAFB", borderRadius: 10,
          }}>
            <div style={{
              display: "inline-block", width: 24, height: 24,
              border: "3px solid #E5E7EB", borderTopColor: "#2563EB",
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
              marginBottom: 8,
            }} />
            <div style={{ fontSize: 11, color: C.textSoft }}>YouTube에서 관련 크리에이터 검색 중...</div>
          </div>
        )}

        {error && (
          <div style={{ padding: "10px 12px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FECACA", fontSize: 11, color: "#B91C1C" }}>
            ⚠️ {error}
          </div>
        )}

        {channels && channels.length === 0 && !loading && (
          <div style={{ padding: 16, fontSize: 12, color: C.textSoft, textAlign: "center" }}>
            관련 크리에이터를 찾지 못했습니다.
          </div>
        )}

        {channels && channels.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {channels.map((cr, i) => {
              const tier = classifyTier(cr.subs);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 12px", borderRadius: 10,
                  background: "#F9FAFB", border: "1px solid #F3F4F6",
                  borderLeft: `3px solid ${tier.color}`,
                }}>
                  {cr.thumbnail ? (
                    <img src={cr.thumbnail} alt={cr.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                  ) : (
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, color: "#9CA3AF", flexShrink: 0,
                    }}>👤</div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{cr.name}</span>
                      <span style={{
                        padding: "1px 6px", borderRadius: 4,
                        background: `${tier.color}15`, color: tier.color,
                        fontSize: 9, fontWeight: 800,
                      }}>{tier.label}</span>
                      <span style={{ fontSize: 10, color: C.textSoft }}>구독자 {formatSubs(cr.subs)}</span>
                    </div>
                    {cr.videoTitle && (
                      <div style={{ fontSize: 10, color: C.textSoft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        최근: {cr.videoTitle}
                      </div>
                    )}
                  </div>
                  <a
                    href={`https://www.youtube.com/channel/${cr.id}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      flexShrink: 0, padding: "5px 10px", borderRadius: 6,
                      border: "1px solid #E5E7EB", background: "#FFFFFF",
                      fontSize: 10, fontWeight: 700, color: C.textSoft,
                      textDecoration: "none",
                    }}
                  >방문 →</a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ──────────── MAIN RENDER ────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        button:hover { opacity: 0.92; }
      `}</style>

      {showStepIndicator && <StepIndicator />}

      {currentView === "hub" && renderHub()}
      {currentView === "category" && renderCategory()}
      {currentView === "analysis" && renderAnalysis()}
      {currentView === "ideas" && renderIdeas()}
      {currentView === "storyboard" && renderStoryboard()}

      <div style={{
        padding: "20px", textAlign: "center",
        borderTop: "1px solid #E5E7EB",
        background: "#FFFFFF",
      }}>
        <div style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: 1, fontWeight: 600, marginBottom: 6 }}>
          PENTACLE × AI &nbsp;·&nbsp; ALGORITHM PERFORMANCE PLATFORM
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <a href="/workbench" style={{ fontSize: 10, color: "#9CA3AF", textDecoration: "none" }}>⭐ 내 워크벤치</a>
          <span style={{ color: "#E5E7EB" }}>·</span>
          <a href="/admin/cannibalization" style={{ fontSize: 10, color: "#9CA3AF", textDecoration: "none" }}>🔀 카드 중복 분석 (관리자)</a>
        </div>
      </div>
    </div>
  );
}
