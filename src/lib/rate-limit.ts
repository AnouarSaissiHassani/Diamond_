interface RateLimitStore {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitStore>();

export function rateLimit(
  ip: string,
  limit: number = 10,
  windowMs: number = 60000
): { success: boolean; limit: number; remaining: number; resetTime: number } {
  const now = Date.now();
  const store = rateLimitMap.get(ip);

  if (!store) {
    const newStore = { count: 1, resetTime: now + windowMs };
    rateLimitMap.set(ip, newStore);
    return { success: true, limit, remaining: limit - 1, resetTime: newStore.resetTime };
  }

  if (now > store.resetTime) {
    store.count = 1;
    store.resetTime = now + windowMs;
    return { success: true, limit, remaining: limit - 1, resetTime: store.resetTime };
  }

  if (store.count >= limit) {
    return { success: false, limit, remaining: 0, resetTime: store.resetTime };
  }

  store.count++;
  return { success: true, limit, remaining: limit - store.count, resetTime: store.resetTime };
}
