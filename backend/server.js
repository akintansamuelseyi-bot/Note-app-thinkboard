import "dotenv/config";
import cors from "cors";

import express from "express";
import { connectDB } from "./src/config/db.js";

import notesRoute from "./src/routes/notesRoute.js";
import usersRoute from "./src/routes/usersRoute.js";
import RateLimiter from "./src/middleware/rateLimiter.js";

const app = express();

// Middleware-
app.use(
  cors({
    origin: "http://localhost:5174",
  }),
);
app.use(express.json());
app.use(RateLimiter);

// next means continue in middleware so its important.
app.use((req, res, next) => {
  console.log("Middleware is running");
  next();
});

// const logger = (req, res, next) => {
//   console.log("Request received");
//   next();
// };

//routes
app.use("/api/notes", notesRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5003;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is Running on PORT:${PORT}`);
  });
});
