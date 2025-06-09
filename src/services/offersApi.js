import axios from '../utils/Axios'; // your configured axios instance

// Fetch all offers
export const getAllOffers = () => {
  return axios.get('/offers');
};

// Fetch a single offer by ID
export const getOfferById = (id) => {
  return axios.get(`/offers/${id}`);
};

// Fetch active offers
export const getActiveOffers = () => {
  return axios.get('/offers/active');
};

// Validate a promo code
export const validatePromoCode = (code) => {
  return axios.get(`/offers/validate/${code}`);
};

// Create a new offer (admin)
export const createOffer = (payload) => {
  return axios.post('/offers', payload);
};

// Update an existing offer by ID (admin)
export const updateOffer = (id, payload) => {
  return axios.put(`/offers/${id}`, payload);
};

// Delete an offer by ID (admin)
export const deleteOffer = (id) => {
  return axios.delete(`/offers/${id}`);
};

// Apply a promo code to cart/order
export const applyDiscount = (payload) => {
  return axios.post('/offers/apply-discount', payload);
};
