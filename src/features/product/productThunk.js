// src/features/product/productThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as productApi from '../../services/productApi';

// 🔹 Fetch all products with pagination, search & category filters
export const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await productApi.getAllProducts(params);
      return data; // includes: { products, pagination }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// 🔹 Fetch product details by ID
export const fetchProductById = createAsyncThunk(
  'product/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const product = await productApi.getProductById(productId);
      return product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product details');
    }
  }
);
