import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import notFound from "./middleware/notFound.js";
import {
  globalLimiter,
} from "./middleware/rateLimiter.js";

const app = express();
app.use(globalLimiter);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorMiddleware);

export default app;