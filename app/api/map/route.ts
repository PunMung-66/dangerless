import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const limit = searchParams.get("limit") || "5";

    if (!q) {
      return NextResponse.json(
        { error: "missing query parameter 'q'" },
        { status: 400 }
      );
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q
    )}&format=json&addressdetails=1&limit=${encodeURIComponent(
      limit
    )}&accept-language=en&polygon_geojson=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "dangerless/1.0 (+https://your-site.example; contact@your-domain.example)",
      },
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error("Nominatim proxy error:", err);
    return NextResponse.json({ error: "proxy_failed" }, { status: 500 });
  }
}
