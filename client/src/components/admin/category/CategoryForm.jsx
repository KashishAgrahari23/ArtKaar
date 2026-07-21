"use client";

import { useEffect } from "react";

import {
  Button,
  Form,
  Input,
  Switch,
  Space,
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
      isActive: true,
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || "",
        isActive: category.isActive,
      });
    } else {
      reset({
        name: "",
        description: "",
        isActive: true,
      });
    }
  }, [category, reset]);

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
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
              placeholder="Category Name"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        validateStatus={errors.description ? "error" : ""}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={4}
              placeholder="Description"
            />
          )}
        />
      </Form.Item>

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
          {isEdit ? "Update Category" : "Create Category"}
        </Button>
      </Space>
    </Form>
  );
}