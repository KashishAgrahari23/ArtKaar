"use client";

import { toast } from "sonner";

import DrawerWrapper from "@/components/common/DrawerWrapper";
import CategoryForm from "./CategoryForm";

export default function CategoryDrawer({
  open,
  onClose,
  category,
  categories = [],
  createMutation,
  updateMutation,
}) {
  const isEdit = Boolean(category);

  const loading =
    createMutation.isPending ||
    updateMutation.isPending;

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: category._id,
          data: values,
        });

        toast.success(
          "Category updated successfully."
        );
      } else {
        await createMutation.mutateAsync(values);

        toast.success(
          "Category created successfully."
        );
      }

      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <DrawerWrapper
      title={
        isEdit
          ? "Edit Category"
          : "Create Category"
      }
      open={open}
      onClose={onClose}
    >
      <CategoryForm
        category={category}
        categories={categories}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </DrawerWrapper>
  );
}