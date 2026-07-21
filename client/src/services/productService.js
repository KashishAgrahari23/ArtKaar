import api from "@/lib/axios";

export const getProducts = async (params = {}) => {
  const res = await api.get("/admin/products", {
    params,
  });

  return res.data;
};

export const getProduct = async (id) => {
  const res = await api.get(`/admin/products/${id}`);

  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post("/admin/products", data);

  return res.data;
};

export const updateProduct = async (
  id,
  data
) => {
  const res = await api.patch(
    `/admin/products/${id}`,
    data
  );

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(
    `/admin/products/${id}`
  );

  return res.data;
};

export const restoreProduct = async (id) => {
  const res = await api.patch(
    `/admin/products/${id}/restore`
  );

  return res.data;
};