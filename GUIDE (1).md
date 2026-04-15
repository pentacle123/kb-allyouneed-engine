# KB국민카드 ALL·YOU·NEED AI Brandformance Engine — GUIDE.md

## 프로젝트 개요

KB국민카드 ALL·YOU·NEED 5개 카드라인(ALL, YOU Prime, NEED Pay, NEED Autoslim, NEED Edu)의 USP 자산을 소비자 검색 데이터(ListeningMind)와 연결하여 기회 영역을 시각화하는 AI Brandformance 플랫폼.

**GitHub**: pentacle123/kb-allyouneed-engine
**배포**: Vercel (자동 배포)
**기술 스택**: Next.js 14 (App Router) + Tailwind CSS

---

## 빌드 순서

### 1단계: 프로젝트 생성 + GitHub 연결

```bash
npx create-next-app@latest kb-allyouneed-engine --app --tailwind --eslint --src-dir=false --import-alias="@/*" --use-npm
cd kb-allyouneed-engine
git init
git remote add origin https://github.com/pentacle123/kb-allyouneed-engine.git
```

### 2단계: 소스 코드 배치

아래 파일들을 생성:

- `app/page.js` — 메인 페이지 (이 GUIDE 하단의 전체 소스 코드 참조)
- `app/layout.js` — 레이아웃 (Pretendard 폰트 + 메타데이터)
- `app/globals.css` — 글로벌 스타일
- `app/data/opportunities.js` — 기회 데이터 (하드코딩)
- `app/data/cards.js` — 카드 USP 데이터
- `app/data/insights.js` — 인사이트 데이터

### 3단계: 빌드 + 배포

```bash
npm run build
git add .
git commit -m "KB ALL·YOU·NEED Brandformance Engine v1.0"
git push -u origin main
```

Vercel 연결 후 자동 배포.

---

## 플랫폼 구조

### 메인 네비게이션 (4개 뷰)

| 뷰 | 설명 |
|---|---|
| **기회 발견** | Trip.com 스타일 3-카테고리 기회 맵 (A: USP기반 / B: 삶의맥락 / C: 교차기회) |
| **카드 자산** | 5개 카드별 USP 분해 + 연결된 기회 풀 |
| **핵심 인사이트** | 광고주가 몰랐던 8가지 발견 (프레젠테이션 뷰) |
| **콘텐츠 전략** | (Phase 2) AI 숏폼 아이디어 생성 |

### 기회 발견 — 3개 카테고리

**A. USP 자산에서 출발한 기회 (15개)**
- 카드 혜택이 필요한 삶을 사는 사람 전체가 기회
- 각 기회: 카드 배지 + USP + 타겟 + 월 검색량 + 인구통계 + 💡발견 인사이트
- 연간 약 4.2억 회+ 검색

**B. 소비자 삶의 맥락에서 발견한 기회 (9개)**
- 카드를 검색하지 않지만, 카드가 필요한 순간에 있는 사람들
- 각 기회: 삶의 맥락 + 구체적 순간 + 연결 카드 + 💡발견
- 연간 약 1.5억 회+

**C. 데이터가 말해주는 교차 기회 (8개)**
- 광고주도 생각하지 못한, 데이터에서만 보이는 발견
- 태그: 블루오션, 경쟁사 선점, 크로스셀, 침투 전략, 숨은 자산, 타겟 반전, 진입 전략

---

## 데이터 구조

### 카드 정보 (5개)

```javascript
const CARDS = {
  ALL: {
    name: "ALL",
    fullName: "KB ALL 카드",
    color: "#2563EB",
    tagline: "고민없이 받는 혜택",
    annual: "2만원",
    condition: "전월 40만+",
    familyCard: "무료",
    usps: [
      { name: "국내 이용 할인", rate: "1%", target: "전 가맹점" },
      { name: "해외 이용 할인", rate: "2%", target: "해외 전 가맹점 (VISA)" },
      { name: "쇼핑 멤버십 할인", rate: "50%", target: "네이버플러스, 쿠팡 로켓와우", condition: "자동납부" },
      { name: "OTT 할인", rate: "10%", target: "넷플릭스, 유튜브 등", condition: "자동납부" },
      { name: "이동통신 할인", rate: "5%", target: "통신요금", condition: "자동납부" },
    ],
    warning: "자동납부 할인 받은 이용건은 전월 이용실적에서 제외"
  },
  YOU: {
    name: "YOU Prime",
    fullName: "KB YOU Prime 카드",
    color: "#7C3AED",
    tagline: "나에게 딱 맞춘 혜택",
    annual: "3만원",
    condition: "전월 40만+",
    familyCard: "7,000원",
    packs: {
      daily: {
        name: "일상팩",
        tier1: { rate: "10%", items: ["주유", "배달", "통신", "보험", "App"] },
        tier2: { rate: "5%", items: ["온라인쇼핑", "편의점", "자기관리"] },
      },
      family: {
        name: "가족팩",
        tier1: { rate: "10%", items: ["생활요금", "온라인장보기", "일상케어"] },
        tier2: { rate: "5%", items: ["학원", "대형마트", "카페"] },
      }
    },
    extra: "공항라운지 및 발레파킹 무료 (국내외겸용)"
  },
  PAY: {
    name: "NEED Pay",
    fullName: "KB NEED Pay 카드",
    color: "#059669",
    tagline: "간편결제 집중 혜택",
    annual: "1.9만원",
    condition: "전월 40만+",
    usps: [
      { name: "간편결제", rate: "15%/10%", target: "자주 쓰는 간편결제" },
      { name: "디지털콘텐츠/멤버십", rate: "30%", target: "디지털콘텐츠, 멤버십" },
      { name: "온라인패션몰", rate: "5%", target: "온라인 패션몰" },
    ]
  },
  AUTO: {
    name: "NEED Autoslim",
    fullName: "KB NEED Autoslim 카드",
    color: "#D97706",
    tagline: "자동차 집중 혜택",
    annual: "2만원",
    condition: "전월 40만+",
    usps: [
      { name: "오토 슬림 할부", rate: "최대 2만원", target: "할부 할인" },
      { name: "주유소/충전소", rate: "5%", target: "주유 + 전기차 충전" },
      { name: "자동차보험", rate: "2만원 청구할인", target: "자동차보험료" },
    ]
  },
  EDU: {
    name: "NEED Edu",
    fullName: "KB NEED Edu 카드",
    color: "#DC2626",
    tagline: "교육 집중 혜택",
    annual: "2.5만원",
    condition: "교육 40만+ / 생활 80만+",
    usps: [
      { name: "교육업종", rate: "5%", target: "학원, 학습지", condition: "전월 40만+" },
      { name: "KB Pay 교육", rate: "+5% (합산 10%)", target: "KB Pay 교육 결제", condition: "전월 80만+" },
      { name: "생활영역", rate: "5%", target: "병원, 약국, 커피", condition: "전월 80만+" },
    ]
  }
};
```

### A. USP 기회 데이터 (15개)

각 기회 항목:
```javascript
{
  card: "ALL",           // 카드 키
  usp: "쇼핑멤버십 50%",  // USP명
  target: "쿠팡·네이버 쇼핑 이용자",  // 타겟 설명
  vol: "월 2,035만",     // 월간 검색량
  demo: "여 57%, 30-40대",  // 인구통계
  insight: "...",         // 💡 발견 인사이트 텍스트
}
```

전체 15개 기회 (소스코드 내 CAT_A.items 참조)

### B. 소비자 맥락 기회 데이터 (9개)

```javascript
{
  context: "해외여행 준비 과정",
  moment: "항공권 예약 → 숙소 비교 → '해외 결제 카드' 고민",
  vol: "월 107만+",
  cards: ["ALL"],
  insight: "...",
}
```

전체 9개 (소스코드 내 CAT_B.items 참조)

### C. 교차 기회 데이터 (8개)

```javascript
{
  discovery: "\"고정비 통합 절약\" 메시지를 아무도 하지 않고 있다",
  cards: ["ALL"],
  detail: "...",
  tag: "블루오션",  // 블루오션/경쟁사선점/크로스셀/침투전략/숨은자산/타겟반전/진입전략
}
```

전체 8개 (소스코드 내 CAT_C.items 참조)

---

## 디자인 스펙

### 컬러 시스템
- ALL: #2563EB (블루)
- YOU Prime: #7C3AED (퍼플)
- NEED Pay: #059669 (그린)
- NEED Autoslim: #D97706 (앰버)
- NEED Edu: #DC2626 (레드)
- 히어로 배경: #0F172A → #1E3A5F 그라디언트
- 카드 배경: #FFFFFF
- 페이지 배경: #F8F9FB

### 폰트
- Pretendard Variable (CDN)
- 히어로 타이틀: 26px / 900
- 카테고리 헤더: 11px / 800 / uppercase
- 기회 타이틀: 14px / 700
- 본문: 13px / 400

### 레이아웃
- 최대 너비: 600px (모바일 퍼스트)
- 히어로 → 스티키 네비 → 콘텐츠
- 카드형 아코디언 (탭하면 인사이트 펼침)

---

## Phase 2 계획 (추후 추가)

1. **숏폼 콘텐츠 전략 뷰**: 각 기회에서 구체적 숏폼 시나리오 생성 (Claude API 연동)
2. **크리에이터 매칭**: 기회별 추천 크리에이터 유형
3. **데이터 대시보드**: ListeningMind 실시간 데이터 연동
4. **카드 포트폴리오 추천기**: "40대 엄마" 같은 페르소나별 카드 조합 제안

---

## 소스 코드

메인 소스 코드는 `app/page.js` 에 위치.
아티팩트 파일 `kb-allyouneed-engine.jsx` 의 코드를 Next.js App Router 형식으로 변환하여 사용.

### 변환 시 주의사항
1. `export default function App()` → `export default function Home()`
2. 파일 최상단에 `"use client";` 추가
3. React import는 Next.js에서 자동이므로 `useState` 만 import
4. Pretendard 폰트는 `layout.js`에서 link 태그로 로드
5. CSS-in-JS 스타일 그대로 사용 가능 (Tailwind 병행 가능)

### layout.js 기본 구조
```javascript
export const metadata = {
  title: "KB ALL·YOU·NEED AI Brandformance Engine",
  description: "소비자 검색 데이터 기반 카드 마케팅 기회 발견 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 참고: 전체 기회 목록 요약

### A. USP 기회 15개
| # | 카드 | USP | 타겟 | 월 검색량 |
|---|---|---|---|---|
| 1 | ALL | 쇼핑멤버십 50% | 쿠팡·네이버 이용자 | 2,035만 |
| 2 | ALL | OTT 10% | 넷플릭스·유튜브 구독자 | 990만 |
| 3 | ALL | 해외 2% | 해외여행 준비자 | 107만 |
| 4 | ALL | 이동통신 5% | 통신비 절약 관심자 | 30만 |
| 5 | ALL | 국내 1% | 카드 선택 피로자 | 7만 |
| 6 | YOU | 일상팩 주유 10% | 출퇴근 운전자 | 42,510 |
| 7 | YOU | 일상팩 자기관리 5% | 필라테스·요가 이용자 | 14,252 |
| 8 | YOU | 가족팩 온라인장보기 10% | 마켓컬리·오아시스 | 930,799 |
| 9 | YOU | 가족팩 학원·카페 5% | 학부모+카페 이용자 | 29,896 |
| 10 | PAY | 간편결제 15% | 네이버페이·카카오페이 | 1,543,466 |
| 11 | PAY | 디지털콘텐츠 30% | OTT·멤버십 구독자 | 990만 |
| 12 | AUTO | 주유/충전소 5% | 자동차+전기차 | 57,543 |
| 13 | AUTO | 자동차보험 2만원 | 보험 비교·갱신자 | 82,343 |
| 14 | EDU | 교육 5~10% | 학원비 학부모 | 2,553 |
| 15 | EDU | 생활 5% | 병원·약국·커피 | 27,945 |

### B. 소비자 맥락 기회 9개
| # | 맥락 | 연결 카드 | 월 검색량 |
|---|---|---|---|
| 1 | 해외여행 준비 | ALL | 107만+ |
| 2 | 구독 해지 고민 | ALL, PAY | 43,736 |
| 3 | 자기관리 시작 | YOU | 14,252 |
| 4 | 자동차보험 갱신 | AUTO | 82,343 |
| 5 | 전기차 전환 | AUTO | 15,033 |
| 6 | 학원 선택 | EDU | 2,553 |
| 7 | 온라인 장보기 루틴 | YOU | 930,799 |
| 8 | 주유비 급등 | YOU, AUTO | 42,510 |
| 9 | 카드 교체/첫 발급 | ALL | 68,000+ |

### C. 교차 기회 8가지
| # | 발견 | 태그 |
|---|---|---|
| 1 | "고정비 통합 절약" 메시지 아무도 안 함 | 블루오션 |
| 2 | 넷플릭스→할인카드 여정에 KB 부재 | 경쟁사 선점 |
| 3 | 40대 엄마 = ALL·YOU·NEED 전체 교차점 | 크로스셀 |
| 4 | 통신비 = ALL 카드의 남성 침투로 | 침투 전략 |
| 5 | 전기차 충전카드 폭발(+555%), Autoslim 커버 | 숨은 자산 |
| 6 | 자동차보험 여정에 '카드 할인' 개념 부재 | 블루오션 |
| 7 | 간편결제 성장 = 40-50대 유입 | 타겟 반전 |
| 8 | 학원비 여정에 '할인' 경로 0개 | 진입 전략 |

---

*작성일: 2026년 4월 15일*
*데이터 소스: ListeningMind (PathFinder, ClusterFinder, KeywordInfo)*
*USP 출처: KB국민카드 공식 페이지 (m.kbcard.com) 팩트체크 완료*
