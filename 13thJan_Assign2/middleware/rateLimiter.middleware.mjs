let requestCounts = {};
const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 15;

export const rateLimiter = (req, res, next) => {
    const key = req.ip;
    const now = Date.now();

  if (!requestCounts[key]) {
    requestCounts[key] = [];
  }

  // Remove expired timestamps
  requestCounts[key] = requestCounts[key].filter(ts => now - ts < WINDOW_SIZE);

  if (requestCounts[key].length >= MAX_REQUESTS) {
    return res.status(429).json({ error: "Too many requests, please try again later" });
  }

  requestCounts[key].push(now);
  next();
};
