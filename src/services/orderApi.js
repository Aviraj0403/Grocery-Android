import Axios from '../store/Axios';

export const getAllOrders = async () => {
  const res = await Axios.get('/getAllOrders');
  return res.data.orders;
};

export const getUserOrders = async () => {
  const res = await Axios.get('/getUserOrders');
  return res.data.order1;
};