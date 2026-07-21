import api from "@/lib/axios";

export const getBrands = async (params = {}) => {
  const res = await api.get("/admin/brands", {
    params,
  });

  return res.data;
};

export const getBrand = async (id) => {
  const res = await api.get(`/admin/brands/${id}`);

  return res.data;
};

export const createBrand = async (data) => {
  const res = await api.post("/admin/brands", data);

  return res.data;
};

export const updateBrand = async (
  id,
  data
) => {
  const res = await api.patch(
    `/admin/brands/${id}`,
    data
  );

  return res.data;
};

export const deleteBrand = async (id) => {
  const res = await api.delete(
    `/admin/brands/${id}`
  );

  return res.data;
};

export const restoreBrand = async (id) => {
  const res = await api.patch(
    `/admin/brands/${id}/restore`
  );

  return res.data;
};