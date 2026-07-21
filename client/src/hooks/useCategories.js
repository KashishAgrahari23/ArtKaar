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
    categories: query.data?.data?.categories ?? [],
    pagination: query.data?.data?.pagination ?? {},

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,

    create: query.create,
    update: query.update,
    remove: query.remove,
    restore: query.restore,
  };
}