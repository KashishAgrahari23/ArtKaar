"use client";

import useCrud from "./useCrud";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
} from "@/services/categoryService";

export default function useCategories(params = {}) {
  const query = useCrud({
    queryKey: ["categories"],
    getAll: getCategories,
    create: createCategory,
    update: updateCategory,
    remove: deleteCategory,
    restore: restoreCategory,
    params,
  });

  return {
    categories:
      query.data?.data?.categories ?? [],

    pagination: {
      page:
        query.data?.data?.pagination?.page ?? 1,

      limit:
        query.data?.data?.pagination?.limit ??
        10,

      total:
        query.data?.data?.pagination?.total ??
        0,

      totalPages:
        query.data?.data?.pagination
          ?.totalPages ?? 1,
    },

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,

    create: query.create,
    update: query.update,
    remove: query.remove,
    restore: query.restore,
  };
}