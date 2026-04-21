import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "YOUTUBE_API_KEY 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const maxResults = searchParams.get("maxResults") || "6";

    if (!q) {
      return NextResponse.json(
        { success: false, error: "q 쿼리 파라미터가 필요합니다." },
        { status: 400 }
      );
    }

    // 1. 검색 (숏폼 위주)
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("q", q);
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("videoDuration", "short");
    searchUrl.searchParams.set("relevanceLanguage", "ko");
    searchUrl.searchParams.set("regionCode", "KR");
    searchUrl.searchParams.set("maxResults", maxResults);
    searchUrl.searchParams.set("key", apiKey);

    const searchRes = await fetch(searchUrl.toString());
    if (!searchRes.ok) {
      const errText = await searchRes.text();
      return NextResponse.json(
        { success: false, error: `YouTube search 실패 (${searchRes.status})`, detail: errText.substring(0, 300) },
        { status: 500 }
      );
    }
    const searchData = await searchRes.json();

    const items = searchData.items || [];
    // 채널별로 그룹핑
    const channels = {};
    items.forEach(item => {
      const chId = item.snippet?.channelId;
      const chTitle = item.snippet?.channelTitle;
      if (chId && !channels[chId]) {
        channels[chId] = {
          id: chId,
          name: chTitle,
          videoTitle: item.snippet?.title,
          thumbnail: item.snippet?.thumbnails?.default?.url,
          publishedAt: item.snippet?.publishedAt,
        };
      }
    });

    const chIds = Object.keys(channels).join(",");
    if (chIds) {
      // 2. 채널 통계 조회
      const statsUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
      statsUrl.searchParams.set("part", "statistics,snippet");
      statsUrl.searchParams.set("id", chIds);
      statsUrl.searchParams.set("key", apiKey);

      try {
        const statsRes = await fetch(statsUrl.toString());
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          (statsData.items || []).forEach(ch => {
            if (channels[ch.id]) {
              channels[ch.id].subs = parseInt(ch.statistics?.subscriberCount || "0", 10);
              channels[ch.id].thumbnail = ch.snippet?.thumbnails?.default?.url || channels[ch.id].thumbnail;
            }
          });
        }
      } catch (e) {
        // stats 실패해도 검색 결과는 반환
      }
    }

    const channelList = Object.values(channels);
    return NextResponse.json({ success: true, channels: channelList });
  } catch (error) {
    console.error("[/api/youtube] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "알 수 없는 오류" },
      { status: 500 }
    );
  }
}
