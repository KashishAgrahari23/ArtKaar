import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import authorize from "../middleware/authorize.js";
import {
  authLimiter,
} from "../middleware/rateLimiter.js";
import { dashboard } from "../controllers/AdminController.js";
import categoryRoutes from "./CategoryRoutes.js";

const router = express.Router();
router.use(authLimiter);
router.use("/categories", categoryRoutes);
router.get(
  "/dashboard",
  verifyToken,
  authorize("admin"),
  dashboard
);

export default router;