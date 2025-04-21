import Axios from '../utils/Axios';

export const getAllProducts = async () => {
  const res = await Axios.get('/getAllProducts');
  return res.data.products;
};

export const getProductById = async (id) => {
  const res = await Axios.get(`/getProduct/${id}`);
  return res.data.product;
};