import { NextResponse } from "next/server";
import { uploadBase64Image } from "@/lib/cloudinary";
import { runTryOn } from "@/lib/replicate";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Try-on inference can take a while; allow up to 5 minutes.
export const maxDuration = 300;

// Only accept real image data URLs, bounded in size, so this endpoint
// can't be abused as a file-hosting proxy or credit-burning target.
const IMAGE_DATA_URL = /^data:image\/[a-z0-9.+-]+;base64,/i;
const MAX_IMAGE_CHARS = 8_000_000; // ~6MB decoded

function isValidImage(value: unknown): value is string {
  return (
    typeof value === "string" &&
    IMAGE_DATA_URL.test(value) &&
    value.length <= MAX_IMAGE_CHARS
  );
}

export async function POST(req: Request) {
  // Each generation costs real money on Replicate — cap per-IP volume.
  if (!rateLimit(`try-on:${clientIp(req)}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "You've made a lot of try-ons in a short time. Please wait a few minutes." },
      { status: 429 }
    );
  }

  try {
    let body: { personImage?: unknown; garmentImage?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { personImage, garmentImage } = body;

    if (!isValidImage(personImage) || !isValidImage(garmentImage)) {
      return NextResponse.json(
        { error: "Both a person photo and a garment photo (image files) are required." },
        { status: 400 }
      );
    }

    // Host both images on Cloudinary so Replicate can fetch them by URL.
    const [personUrl, garmentUrl] = await Promise.all([
      uploadBase64Image(personImage, "drapify/person"),
      uploadBase64Image(garmentImage, "drapify/garment"),
    ]);

    const resultUrl = await runTryOn(personUrl, garmentUrl);

    return NextResponse.json({ resultUrl, personUrl, garmentUrl });
  } catch (err) {
    console.error("try-on failed:", err);

    const raw = err instanceof Error ? err.message : "";
    // Never surface billing/credit internals to end users (e.g. during a live demo).
    const isCreditIssue = raw.includes("402") || /insufficient credit|payment required/i.test(raw);

    const message = isCreditIssue
      ? "Try-on is temporarily unavailable. Please try again in a few minutes."
      : "Something went wrong generating the try-on. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
