import { ImageResponse } from "next/og";

export const alt =
  "Nguyen Huynh Minh Tri, Fullstack Website Developer based in HCMC, Vietnam";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#171717",
          color: "#f4f4f0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px 58px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            color: "rgba(244, 244, 240, 0.48)",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>Portfolio</span>
          <span>HCMC, Vietnam</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <h1
            style={{
              margin: 0,
              maxWidth: 980,
              fontFamily: "Georgia, serif",
              fontSize: 112,
              fontWeight: 400,
              letterSpacing: "-0.045em",
              lineHeight: 0.88,
            }}
          >
            NGUYEN HUYNH
            <br />
            MINH TRI
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(244, 244, 240, 0.68)",
              fontSize: 34,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Fullstack Website Developer
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(244, 244, 240, 0.14)",
            paddingTop: 28,
            color: "rgba(244, 244, 240, 0.42)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>Thoughtful Interfaces</span>
          <span>Reliable Systems</span>
        </div>
      </div>
    ),
    size,
  );
}
