import ratelimit from "../config/rateLimiter.js";

const RateLimiter = async (req, res, next) => {
  try {
    const identifier =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.ip ||
      "anonymous";

    const result = await ratelimit.limit(identifier);

    if (!result.success) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error.message);
    next();
  }
};

export default RateLimiter;
