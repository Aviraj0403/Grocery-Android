// src/features/product/productSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById } from './productThunk';

const initialState = {
  products: [],
  pagination: {
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 8,
  },
  productDetails: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductDetails(state) {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📦 Fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination || initialState.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📦 Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
