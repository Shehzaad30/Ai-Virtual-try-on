"use client";

import { createClient } from "@supabase/supabase-js";

// Browser-side client for auth (email OTP sign-in). Uses the public anon
// key — safe to expose; the database itself is locked down by RLS.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
