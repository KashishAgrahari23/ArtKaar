import express from "express";
import authRoutes from "../routes/AuthRoutes.js"
import adminRoutes from "./AdminRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Artkaar API Working ",
  });
});
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;