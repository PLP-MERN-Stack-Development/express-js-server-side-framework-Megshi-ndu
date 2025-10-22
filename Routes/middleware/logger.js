const logger = (req, res, next) => {
  const start = Date.now();
  const incomingTimestamp = req.requestTime || new Date().toISOString();

  // Log request received (uses middleware-attached requestTime when available)
  console.log(`[${incomingTimestamp}] → ${req.method} ${req.originalUrl}`);

  // Log after response finished with status and duration
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    const finishedAt = req.requestTime || new Date().toISOString();
    console.log(`[${finishedAt}] ← ${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`);
  });

  next();
};

export default logger;
