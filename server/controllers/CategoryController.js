import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import CategoryService from "../services/CategoryService.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await CategoryService.create(req.validatedData);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Category created successfully.",
      category
    )
  );
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryService.getAll();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Categories fetched successfully.",
      categories
    )
  );
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryService.getById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Category fetched successfully.",
      category
    )
  );
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await CategoryService.update(
    req.params.id,
    req.validatedData
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Category updated successfully.",
      category
    )
  );
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await CategoryService.delete(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Category deleted successfully."
    )
  );
});