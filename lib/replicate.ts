import Replicate from "replicate";

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function runTryOn(
  humanImgUrl: string,
  garmentImgUrl: string
): Promise<string> {
  const output = await replicate.run(
    "yisol/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f",
    {
      input: {
        human_img: humanImgUrl,
        garm_img: garmentImgUrl,
        garment_des: "clothing item",
        is_checked: true,
        is_checked_crop: false,
        denoise_steps: 30,
        seed: 42,
      },
    }
  );

  const result = Array.isArray(output) ? output[0] : output;
  if (!result) throw new Error("No output from Replicate");
  return String(result);
}
