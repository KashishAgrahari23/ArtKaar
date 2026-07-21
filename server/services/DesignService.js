import DesignRepository from "../repositories/DesignRepo.js";
import ApiError from "../utils/ApiError.js";
import slugify from "../utils/slugify.js";

import {
  uploadPreviewImages,
  uploadDownloadFiles,
  deleteCloudinaryFiles,
} from "../utils/cloudinaryUpload.js";

class DesignService {
  async create(designData, files) {
    const existingDesign =
      await DesignRepository.findByTitle(
        designData.title
      );

    if (existingDesign) {
      throw new ApiError(
        409,
        "Design already exists."
      );
    }

    let previewImages = [];
    let downloadFiles = [];

    try {
      if (files?.previewImages?.length) {
        previewImages =
          await uploadPreviewImages(
            files.previewImages
          );
      }

      if (files?.downloadFiles?.length) {
        downloadFiles =
          await uploadDownloadFiles(
            files.downloadFiles
          );
      }

      const slug = slugify(
        designData.title
      );

      return await DesignRepository.create({
        ...designData,

        slug,

        previewImages,

        downloadFiles,

        price: Number(
          designData.price ?? 0
        ),

        isFree:
          Number(
            designData.price ?? 0
          ) === 0,
      });
    } catch (error) {
      await Promise.all([
        deleteCloudinaryFiles(
          previewImages.map(
            (img) => img.publicId
          ),
          "image"
        ),

        deleteCloudinaryFiles(
          downloadFiles.map(
            (file) => file.publicId
          ),
          "raw"
        ),
      ]);

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        500,
        "Failed to create design."
      );
    }
  }

  async getAll(query = {}) {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      isActive,
      sort = "-createdAt",
    } = query;

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (isActive !== undefined) {
      filter.isActive =
        isActive === "true";
    }

    const result =
      await DesignRepository.getAll(
        filter,
        {
          page: Number(page),
          limit: Number(limit),
          sort,
        }
      );

    return {
      ...result,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(
        result.pagination.total /
          Number(limit)
      ),
    };
  }

  async getById(id) {
    const design =
      await DesignRepository.findById(
        id
      );

    if (!design) {
      throw new ApiError(
        404,
        "Design not found."
      );
    }

    return design;
  }

  async update(id, updateData) {
    const design =
      await DesignRepository.findById(
        id
      );

    if (!design) {
      throw new ApiError(
        404,
        "Design not found."
      );
    }

    if (
      updateData.title &&
      updateData.title !== design.title
    ) {
      const existingDesign =
        await DesignRepository.findByTitle(
          updateData.title
        );

      if (
        existingDesign &&
        existingDesign._id.toString() !==
          id
      ) {
        throw new ApiError(
          409,
          "Design already exists."
        );
      }

      updateData.slug = slugify(
        updateData.title
      );
    }

    if (
      updateData.price !== undefined
    ) {
      updateData.price = Number(
        updateData.price
      );

      updateData.isFree =
        updateData.price === 0;
    }

    return await DesignRepository.updateById(
      id,
      updateData
    );
  }

  async delete(id) {
    const design =
      await DesignRepository.findById(
        id
      );

    if (!design) {
      throw new ApiError(
        404,
        "Design not found."
      );
    }

    return await DesignRepository.updateById(
      id,
      {
        isActive: false,
        deletedAt: new Date(),
      }
    );
  }

  async restore(id) {
    const design =
      await DesignRepository.findById(
        id
      );

    if (!design) {
      throw new ApiError(
        404,
        "Design not found."
      );
    }

    return await DesignRepository.updateById(
      id,
      {
        isActive: true,
        deletedAt: null,
      }
    );
  }
}

export default new DesignService();