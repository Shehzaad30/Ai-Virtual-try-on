import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWaitlistNotification } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const MAX_LENGTHS = { name: 100, contact: 200, shopType: 100, city: 100 } as const;

function cleanField(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  // 5 signups per 10 minutes per IP — enough for real users, blocks spam
  // that would flood the leads table and drain the email quota.
  if (!rateLimit(`waitlist:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = cleanField(body.name, MAX_LENGTHS.name);
  const contact = cleanField(body.contact, MAX_LENGTHS.contact);
  const shopType = cleanField(body.shopType, MAX_LENGTHS.shopType);
  const city = cleanField(body.city, MAX_LENGTHS.city);

  if (!name || !contact) {
    return NextResponse.json(
      { error: "Your name and a contact (phone or email) are required." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("waitlist").insert({
    name,
    contact,
    shop_type: shopType || null,
    city: city || null,
  });

  if (error) {
    console.error("waitlist insert failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Notify the founder by email. Never let an email failure break the signup.
  try {
    await sendWaitlistNotification({ name, contact, shopType, city });
  } catch (e) {
    console.error("waitlist notification error:", e);
  }

  return NextResponse.json({ ok: true });
}
