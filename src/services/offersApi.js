import axios from '../utils/Axios'; // your configured axios instance

// Fetch all offers
export const getAllOffers = () => axios.get('/offers');

// Fetch a single offer by ID
export const getOfferById = (id) => {
  if (!id) throw new Error('Offer ID is required');
  return axios.get(`/offers/${id}`);
};

// Fetch active offers (all active offers)
export const getActiveOffers = () => axios.get('/offers/active');

// Fetch active promo code-based offers only
export const getActivePromoCodeOffers = () => axios.get('/offers/active/promos');

// Validate a promo code
export const validatePromoCode = (code) => {
  if (!code) throw new Error('Promo code is required');
  return axios.get(`/offers/validate/${code}`);
};

// Create a new offer (admin)
export const createOffer = (payload) => {
  if (!payload) throw new Error('Payload is required to create offer');
  return axios.post('/offers', payload);
};

// Update an existing offer by ID (admin)
export const updateOffer = (id, payload) => {
  if (!id) throw new Error('Offer ID is required');
  if (!payload) throw new Error('Payload is required to update offer');
  return axios.put(`/offers/${id}`, payload);
};

// Delete an offer by ID (admin)
export const deleteOffer = (id) => {
  if (!id) throw new Error('Offer ID is required');
  return axios.delete(`/offers/${id}`);
};

// Apply a promo code to cart/order
export const applyDiscount = (payload) => {
  if (!payload) throw new Error('Payload is required to apply discount');
  return axios.post('/offers/apply-discount', payload);
};
