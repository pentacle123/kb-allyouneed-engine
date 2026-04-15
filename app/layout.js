import "./globals.css";

export const metadata = {
  title: "KB ALL·YOU·NEED AI Brandformance Engine",
  description: "소비자 검색 데이터 기반 카드 마케팅 기회 발견 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
