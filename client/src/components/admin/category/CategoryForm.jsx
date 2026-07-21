"use client";

import { useEffect } from "react";

import {
  Button,
  Form,
  Input,
  Switch,
  Space,
  Select,
  InputNumber,
} from "antd";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  createCategorySchema,
  updateCategorySchema,
} from "@/validations/category.validation";

const { TextArea } = Input;

export default function CategoryForm({
  category,
  categories = [],
  loading = false,
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(category);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      isEdit
        ? updateCategorySchema
        : createCategorySchema
    ),
    defaultValues: {
      name: "",
      description: "",
      parentCategory: null,
      sortOrder: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || "",
        parentCategory:
          category.parentCategory?._id ?? null,
        sortOrder: category.sortOrder ?? 0,
        isActive: category.isActive,
      });
    } else {
      reset({
        name: "",
        description: "",
        parentCategory: null,
        sortOrder: 0,
        isActive: true,
      });
    }
  }, [category, reset]);

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      {/* Category Name */}
      <Form.Item
        label="Category Name"
        validateStatus={errors.name ? "error" : ""}
        help={errors.name?.message}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter category name"
            />
          )}
        />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Description"
        validateStatus={
          errors.description ? "error" : ""
        }
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={4}
              placeholder="Enter category description"
            />
          )}
        />
      </Form.Item>

      {/* Parent Category */}
      <Form.Item
        label="Parent Category"
        validateStatus={
          errors.parentCategory ? "error" : ""
        }
        help={errors.parentCategory?.message}
      >
        <Controller
          name="parentCategory"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              allowClear
              placeholder="Root Category"
              options={categories
                .filter(
                  (item) =>
                    item._id !== category?._id
                )
                .map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              onChange={(value) =>
                field.onChange(value ?? null)
              }
            />
          )}
        />
      </Form.Item>

      {/* Sort Order */}
      <Form.Item
        label="Sort Order"
        validateStatus={
          errors.sortOrder ? "error" : ""
        }
        help={errors.sortOrder?.message}
      >
        <Controller
          name="sortOrder"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              min={0}
              className="w-full"
            />
          )}
        />
      </Form.Item>

      {/* Status (Edit Only) */}
      {isEdit && (
        <Form.Item label="Status">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Form.Item>
      )}

      <Space className="w-full justify-end">
        <Button
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {isEdit
            ? "Update Category"
            : "Create Category"}
        </Button>
      </Space>
    </Form>
  );
}