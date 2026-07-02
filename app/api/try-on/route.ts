import { NextResponse } from "next/server";
import { uploadBase64Image } from "@/lib/cloudinary";
import { runTryOn } from "@/lib/replicate";

// Try-on inference can take a while; allow up to 5 minutes.
export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { personImage, garmentImage } = await req.json();

    if (!personImage || !garmentImage) {
      return NextResponse.json(
        { error: "Both a person image and a garment image are required." },
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
