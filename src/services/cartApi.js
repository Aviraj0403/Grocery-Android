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

// cartApi.js
export const removeCartItem = ({ productId, unit }) => {
  return axios.delete('/removeCartItem', {
    params: { productId, unit }, // ✅ send via query string
  });
};


export const clearCart = () => {
  return axios.delete('/clearCart');
};
