import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.validatedData = await schema.parseAsync(req.body);

      next();
    } catch (error) {
      const message =
        error.issues?.[0]?.message || "Validation Failed";

      next(new ApiError(400, message));
    }
  };
};

export default validate;