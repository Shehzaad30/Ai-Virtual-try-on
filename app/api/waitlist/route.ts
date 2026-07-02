import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWaitlistNotification } from "@/lib/email";

export async function POST(req: Request) {
  const { name, contact, shopType, city } = await req.json();

  if (!name?.trim() || !contact?.trim()) {
    return NextResponse.json(
      { error: "Your name and a contact (phone or email) are required." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("waitlist").insert({
    name: name.trim(),
    contact: contact.trim(),
    shop_type: shopType?.trim() || null,
    city: city?.trim() || null,
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
