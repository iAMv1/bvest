type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

function now() {
  return Date.now();
}

// Simple in-memory sliding window. For single-instance dev/standalone it's enough.
// Production on Vercel may have multiple lambdas — consider Upstash Redis for true distribution.
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetInMs: number } {
  const t = now();
  let e = store.get(key);
  if (!e || t >= e.resetAt) {
    e = { count: 0, resetAt: t + windowMs };
    store.set(key, e);
  }
  e.count += 1;
  const allowed = e.count <= limit;
  return { allowed, remaining: Math.max(0, limit - e.count), resetInMs: e.resetAt - t };
}

// Prune stale keys occasionally
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const t = now();
    for (const [k, v] of store) if (t >= v.resetAt) store.delete(k);
  }, 60_000).unref?.();
}
