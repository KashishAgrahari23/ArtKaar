import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import BrandService from "../services/BrandService.js";

export const createBrand = asyncHandler(async (req, res) => {
  const brand = await BrandService.create(req.validatedData);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Brand created successfully.",
      brand
    )
  );
});

export const getBrands = asyncHandler(async (req, res) => {
  const result = await BrandService.getAll(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Brands fetched successfully.",
      result
    )
  );
});

export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await BrandService.getById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Brand fetched successfully.",
      brand
    )
  );
});

export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await BrandService.update(
    req.params.id,
    req.validatedData
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Brand updated successfully.",
      brand
    )
  );
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await BrandService.delete(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Brand deleted successfully.",
      brand
    )
  );
});

export const restoreBrand = asyncHandler(async (req, res) => {
  const brand = await BrandService.restore(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Brand restored successfully.",
      brand
    )
  );
});