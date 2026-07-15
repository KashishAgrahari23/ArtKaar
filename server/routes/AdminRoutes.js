import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import authorize from "../middleware/authorize.js";
import {
  authLimiter,
} from "../middleware/rateLimiter.js";
import { dashboard } from "../controllers/AdminController.js";

const router = express.Router();
router.use(authLimiter);
router.get(
  "/dashboard",
  verifyToken,
  authorize("admin"),
  dashboard
);

export default router;