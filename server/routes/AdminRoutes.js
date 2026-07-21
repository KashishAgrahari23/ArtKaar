import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import authorize from "../middleware/authorize.js";
import {
  authLimiter,
} from "../middleware/rateLimiter.js";
import { dashboard } from "../controllers/AdminController.js";
import categoryRoutes from "./CategoryRoutes.js";
import brandRoutes from "./BrandRoutes.js";
import productRoutes from "./ProductRoutes.js";
import DesignRoutes from "./routes/DesignRoutes.js";
const router = express.Router();
router.use(authLimiter);
router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use(
  "/designs",
  DesignRoutes
);
router.get(
  "/dashboard",
  verifyToken,
  authorize("admin"),
  dashboard
);

export default router;