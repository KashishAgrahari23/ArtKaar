import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.validatedData = await schema.parseAsync(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ApiError(
            400,
            error.issues[0]?.message || "Validation Failed"
          )
        );
      }

      next(error);
    }
  };
};

export default validate;