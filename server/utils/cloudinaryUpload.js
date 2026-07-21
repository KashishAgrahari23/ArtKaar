import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const uploadBuffer = (
  buffer,
  folder,
  resourceType = "auto"
) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

export const uploadPreviewImage = async (file) => {
  const result = await uploadBuffer(
    file.buffer,
    "artkaar/previews",
    "image"
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

export const uploadDownloadFile = async (file) => {
  const result = await uploadBuffer(
    file.buffer,
    "artkaar/downloads",
    "raw"
  );

  return {
    fileName: result.display_name || file.originalname,

    originalName: file.originalname,

    url: result.secure_url,

    publicId: result.public_id,

    format:
      result.format ||
      file.originalname.split(".").pop(),

    size: result.bytes,
  };
};

export const uploadPreviewImages = async (
  files = []
) => {
  return Promise.all(
    files.map(uploadPreviewImage)
  );
};

export const uploadDownloadFiles = async (
  files = []
) => {
  return Promise.all(
    files.map(uploadDownloadFile)
  );
};

export const deleteCloudinaryFiles = async (
  publicIds = [],
  resourceType = "image"
) => {
  if (!publicIds.length) return;

  await Promise.all(
    publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      })
    )
  );
};