// src/store/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/Axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/getUserCart');
    return res.data.cart;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Cart fetch failed");
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post('/addToCart', payload);
    return res.data.cart;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Add to cart failed");
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setCartManually: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
    clearCartState: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalAmount = state.items.reduce((sum, i) => sum + i.quantity * i.selectedVariant.price, 0);
      });
  },
});

export const { setCartManually, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
