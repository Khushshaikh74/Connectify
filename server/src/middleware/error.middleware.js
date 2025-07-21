const errorMiddleware = (err, req, res, next) => {
  // ✅ Zod validation error (return first message only)
  if (err.name === "ZodError" && Array.isArray(err.errors)) {
    const firstMessage = err.errors[0]?.message || "Validation failed";

    return res.status(400).json({
      success: false,
      message: firstMessage,
    });
  }

  // ✅ If error.message is a stringified array (fallback support)
  try {
    const parsed = JSON.parse(err.message);
    if (Array.isArray(parsed)) {
      const firstMessage = parsed[0]?.message || "Validation failed";

      return res.status(400).json({
        success: false,
        message: firstMessage,
      });
    }
  } catch (_) {}

  // ❌ Default fallback error
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
