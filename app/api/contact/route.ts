import { NextResponse } from "next/server";

const recipient = "summit-ai@summitfeed.co.kr";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ message: "문의 정보를 확인해 주세요." }, { status: 400 });
  if (clean(body.website, 100)) return NextResponse.json({ ok: true });

  const hospital = clean(body.hospital, 80);
  const siteUrl = clean(body.siteUrl, 300);
  const phone = clean(body.phone, 30);
  const type = clean(body.type, 50);
  const consent = clean(body.consent, 20);
  if (!hospital || !siteUrl || !phone || !type || consent !== "agreed") {
    return NextResponse.json({ message: "필수 항목과 개인정보 동의를 확인해 주세요." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "현재 메일 접수 설정을 확인 중입니다." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Clinic GEO <contact@clinicgeo.co.kr>",
      to: [recipient],
      subject: `[Clinic GEO 문의] ${type} · ${hospital}`,
      text: [`병원명: ${hospital}`, `사이트 주소: ${siteUrl}`, `문의 유형: ${type}`, `연락처: ${phone}`].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Contact email failed", response.status, await response.text());
    return NextResponse.json({ message: "문의 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
