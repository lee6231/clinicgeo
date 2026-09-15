import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const imageSize = {
  width: 1200,
  height: 630,
};

const fallbackTitle = "병원이 AI 검색에서 선택되는 구조";
const fallbackEyebrow = "Clinic GEO · SUMMITFEED";

function cleanText(value: string | null, fallback: string, maxLength: number) {
  const normalized = value?.replace(/\s+/g, " ").trim();
  return (normalized || fallback).slice(0, maxLength);
}

export async function GET(request: NextRequest) {
  const title = cleanText(request.nextUrl.searchParams.get("title"), fallbackTitle, 90);
  const eyebrow = cleanText(request.nextUrl.searchParams.get("eyebrow"), fallbackEyebrow, 40);
  const titleFontSize = title.length > 62 ? 50 : title.length > 42 ? 58 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#fffaf4",
          color: "#3b2934",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -180,
            width: 560,
            height: 560,
            display: "flex",
            borderRadius: 999,
            background: "#f9e7ed",
            border: "2px solid #efced9",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 92,
            bottom: -180,
            width: 410,
            height: 410,
            display: "flex",
            borderRadius: 999,
            background: "#3b2934",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 156,
            bottom: 88,
            width: 184,
            height: 184,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            background: "#ffffff",
            boxShadow: "0 24px 70px rgba(59, 41, 52, 0.16)",
          }}
        >
          <svg width={136} height={136} viewBox="0 0 512 512" aria-label="Clinic GEO">
            <circle
              cx="244"
              cy="256"
              r="169"
              fill="none"
              stroke="#143954"
              strokeWidth="36"
              strokeLinecap="round"
              strokeDasharray="850 212"
              transform="rotate(-38 244 256)"
            />
            <path
              d="M240 165V350C240 380 264 404 294 404H306C378 404 434 346 434 274H334"
              fill="none"
              stroke="#143954"
              strokeWidth="36"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            position: "relative",
            width: 830,
            height: "100%",
            padding: "76px 54px 70px 82px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 22,
                fontWeight: 700,
                color: "#b95474",
                letterSpacing: "0.03em",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                width: 72,
                height: 5,
                display: "flex",
                marginTop: 24,
                borderRadius: 99,
                background: "#d26383",
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 31,
                fontSize: titleFontSize,
                fontWeight: 800,
                lineHeight: 1.17,
                letterSpacing: "-0.045em",
                wordBreak: "keep-all",
              }}
            >
              {title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 23,
              fontWeight: 700,
              color: "#6f4654",
            }}
          >
            clinicgeo.co.kr
            <span style={{ display: "flex", margin: "0 13px", color: "#d77d99" }}>·</span>
            병원 마케팅과 GEO 인사이트
          </div>
        </div>
      </div>
    ),
    imageSize,
  );
}
