import axios from '../utils/Axios'; // Ensure this instance handles tokens

export const getUserCart = () => {
  return axios.get('/getUserCart');
};

export const addToCart = (payload) => {
  return axios.post('/addToCart', payload); // Token required (verifyToken)
};

export const updateCartItem = (payload) => {
  return axios.put('/updateCartItem', payload);
};

export const removeCartItem = (payload) => {
  return axios.delete('/removeCartItem', { data: payload });
};

export const clearCart = () => {
  return axios.delete('/clearCart');
};
