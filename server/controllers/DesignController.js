import DesignService from "../services/DesignService.js";

class DesignController {
  async create(req, res, next) {
    try {
      const design = await DesignService.create(
        req.validatedData,
        req.files
      );

      return res.status(201).json({
        success: true,
        message: "Design created successfully.",
        data: design,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result =
        await DesignService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Designs fetched successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const design =
        await DesignService.getById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        message: "Design fetched successfully.",
        data: design,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const design =
        await DesignService.update(
          req.params.id,
          req.validatedData
        );

      return res.status(200).json({
        success: true,
        message: "Design updated successfully.",
        data: design,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await DesignService.delete(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Design deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  async restore(req, res, next) {
    try {
      const design =
        await DesignService.restore(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        message: "Design restored successfully.",
        data: design,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DesignController();