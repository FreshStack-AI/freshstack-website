import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const webhookUrl = process.env.CHECKLIST_SIGNUP_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("CHECKLIST_SIGNUP_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503 }
    );
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      source: "website-checklist",
      timestamp: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    console.error("Webhook failed:", res.status);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
