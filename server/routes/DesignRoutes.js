import express from "express";

import DesignController from "../controllers/DesignController.js";

import { validate } from "../middlewares/validate.js";

import {
  createDesignSchema,
  updateDesignSchema,
} from "../validations/DesignValidation.js";

import {
  uploadDesignFiles,
} from "../middlewares/upload.js";

import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.get(
  "/",
  DesignController.getAll
);

router.get(
  "/:id",
  DesignController.getById
);

router.post(
  "/",
  uploadDesignFiles,
  validate(createDesignSchema),
  DesignController.create
);

router.patch(
  "/:id",
  validate(updateDesignSchema),
  DesignController.update
);

router.delete(
  "/:id",
  DesignController.delete
);

router.patch(
  "/:id/restore",
  DesignController.restore
);

export default router;