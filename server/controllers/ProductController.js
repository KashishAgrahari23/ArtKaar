import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ProductService from "../services/ProductService.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await ProductService.create(req.validatedData);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Product created successfully.",
      product
    )
  );
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductService.getAll(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Products fetched successfully.",
      products
    )
  );
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductService.getById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Product fetched successfully.",
      product
    )
  );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await ProductService.update(
    req.params.id,
    req.validatedData
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Product updated successfully.",
      product
    )
  );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductService.delete(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Product deleted successfully.",
      product
    )
  );
});

export const restoreProduct = asyncHandler(async (req, res) => {
  const product = await ProductService.restore(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Product restored successfully.",
      product
    )
  );
});