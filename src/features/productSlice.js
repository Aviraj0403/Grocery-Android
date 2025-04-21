import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productApi from '../services/productApi';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await productApi.getAllProducts();
    return res.data.products;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const fetchProductDetails = createAsyncThunk('product/fetchProductDetails', async (id, { rejectWithValue }) => {
  try {
    const res = await productApi.getProductById(id);
    return res.data.product;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: { products: [], productDetails: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
      });
  }
});

export default productSlice.reducer;
