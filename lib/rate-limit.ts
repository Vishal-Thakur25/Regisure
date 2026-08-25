// In-memory simple rate limiter for public forms and login attempts
interface RateLimitTracker {
  count: number;
  resetAt: number;
}

const trackerMap = new Map<string, RateLimitTracker>();

/**
 * Simple in-memory rate limiter
 * @param identifier IP or user key
 * @param limit Max allowed attempts in window
 * @param windowMs Window duration in milliseconds (default: 1 minute)
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const current = trackerMap.get(identifier);

  if (!current || now > current.resetAt) {
    trackerMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { success: false, remaining: 0 };
  }

  current.count += 1;
  trackerMap.set(identifier, current);
  return { success: true, remaining: limit - current.count };
}
