import Axios from '../utils/Axios';

export const getAllProducts = async ({ page = 1, limit = 8, search = "", category = "" } = {}) => {
  const queryParams = new URLSearchParams();

  queryParams.append("page", page);
  queryParams.append("limit", limit);

  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);

  const res = await Axios.get(`/getAllProducts?${queryParams.toString()}`);

  return res.data; // includes: { products, pagination: { page, total, totalPages, limit } }
};

export const getProductById = async (id) => {
  const res = await Axios.get(`/getProduct/${id}`);
  return res.data.product;
};