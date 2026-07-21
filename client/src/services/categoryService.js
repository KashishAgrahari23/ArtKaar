import api from "@/lib/axios";

export const getCategories = async (params = {}) => {
  const res = await api.get("/admin/categories", {
    params,
  });

  return res.data;
};

export const getCategory = async (id) => {
  const res = await api.get(`/admin/categories/${id}`);

  return res.data;
};

export const createCategory = async (data) => {
  const res = await api.post("/admin/categories", data);

  return res.data;
};

export const updateCategory = async (
  id,
  data
) => {
  const res = await api.patch(
    `/admin/categories/${id}`,
    data
  );

  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await api.delete(
    `/admin/categories/${id}`
  );

  return res.data;
};

export const restoreCategory = async (id) => {
  const res = await api.patch(
    `/admin/categories/${id}/restore`
  );

  return res.data;
};