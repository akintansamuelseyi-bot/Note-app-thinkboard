import ratelimit from "../config/rateLimiter.js";

const RateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip;

    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next();
  }
};

export default RateLimiter;
