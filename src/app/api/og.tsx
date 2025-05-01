import { ImageResponse } from "next/og";

export const config = {
  runtime: "edge",
};

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const clan = searchParams.get("clan") || "Clan McHODLer";
  const user = searchParams.get("user") || "Yashika";
  const tagline = searchParams.get("tagline") || "Diamond hands forever";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000 0%, #222 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            border: "4px solid #b31aff",
            borderRadius: "30px",
            width: "90%",
            height: "90%",
            padding: "40px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#b31aff", fontSize: 60 }}>{clan}</h1>
          <h2 style={{ fontSize: 40 }}>{tagline}</h2>
          <p style={{ fontSize: 30 }}>Shared by @{user}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
