import express from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController.js";

import validate from "../middleware/validate.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/CategoryValidation.js";

import verifyToken from "../middleware/verifyToken.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.use(verifyToken);
router.use(authorize("admin"));

router.post(
  "/",
  validate(createCategorySchema),
  createCategory
);

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.patch(
  "/:id",
  validate(updateCategorySchema),
  updateCategory
);

router.delete("/:id", deleteCategory);

export default router;