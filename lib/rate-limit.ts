type Bucket = { count: number; resetAt: number };

// Per-instance in-memory limiter. On serverless this isn't a hard global
// guarantee, but it blunts naive abuse (scripted spam from one source)
// at zero cost — the main risks being Replicate credit and email quota.
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Keep the map from growing unbounded on long-lived instances.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (now > b.resetAt) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
