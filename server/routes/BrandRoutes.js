import express from "express";

import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  restoreBrand,
} from "../controllers/BrandController.js";

import validate from "../middleware/validate.js";

import {
  createBrandSchema,
  updateBrandSchema,
} from "../validations/BrandValidation.js";

import verifyToken from "../middleware/verifyToken.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.use(verifyToken);
router.use(authorize("admin"));

router.post(
  "/",
  validate(createBrandSchema),
  createBrand
);

router.get("/", getBrands);

router.get("/:id", getBrandById);

router.patch(
  "/:id",
  validate(updateBrandSchema),
  updateBrand
);

router.delete("/:id", deleteBrand);

router.patch("/:id/restore", restoreBrand);

export default router;