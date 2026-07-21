import multer from "multer";

const storage = multer.memoryStorage();

const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const DESIGN_MIME_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "application/octet-stream",

  "image/svg+xml",

  "model/stl",
  "model/obj",

  "application/vnd.adobe.illustrator",
  "application/postscript",
];

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "previewImages") {
    if (IMAGE_MIME_TYPES.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }

  if (file.fieldname === "downloadFiles") {
    const extension = file.originalname
      .split(".")
      .pop()
      ?.toLowerCase();

    const allowedExtensions = [
      "stl",
      "svg",
      "dxf",
      "cdr",
      "eps",
      "ai",
      "obj",
      "pdf",
      "zip",
      "rar",
    ];

    if (
      allowedExtensions.includes(extension)
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Unsupported design file format."
      ),
      false
    );
  }

  cb(
    new Error("Invalid upload field."),
    false
  );
};

const upload = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },

  fileFilter,
});

export const uploadDesignFiles =
  upload.fields([
    {
      name: "previewImages",
      maxCount: 10,
    },
    {
      name: "downloadFiles",
      maxCount: 20,
    },
  ]);

export default upload;