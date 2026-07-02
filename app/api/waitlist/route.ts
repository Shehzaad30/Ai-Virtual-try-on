import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("waitlist").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Already on the list!" }, { status: 409 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
