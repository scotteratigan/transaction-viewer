import { RequestHandler } from "express";

// @ts-ignore
export const networkSimulator: RequestHandler = (req, res, next) => {
  // Do not modify this function. Instead, handle errors caused here on the front end.
  if (process.env.TEST) return next(); // don't mess up local testing
  const start = performance.now();
  if (Math.random() < 0.33) {
    console.error("Something went wrong! Returning 500 error. (This is a simulated error.)");
    return res.status(500).send({ error: "Server Error" });
  }
  while (performance.now() - start < 250) {
    // Simulate an expensive calculation
  }
  next();
};
