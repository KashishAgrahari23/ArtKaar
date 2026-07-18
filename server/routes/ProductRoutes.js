import express from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  restoreProduct,
  updateProduct,
} from "../controllers/ProductController.js";

import verifyToken from "../middleware/verifyToken.js";
import authorize from "../middleware/authorize.js";
import validate from "../middleware/validate.js";

import {
  createProductSchema,
  updateProductSchema,
} from "../validations/ProductValidation.js";

const router = express.Router();

router.use(verifyToken);
router.use(authorize("admin"));

router.post(
  "/",
  validate(createProductSchema),
  createProduct
);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.patch(
  "/:id",
  validate(updateProductSchema),
  updateProduct
);

router.delete("/:id", deleteProduct);

router.patch("/:id/restore", restoreProduct);

export default router;