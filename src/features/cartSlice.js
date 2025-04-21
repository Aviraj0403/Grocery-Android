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

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.put('/updateCartItem', payload);
    return res.data.cart;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Update cart failed");
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.delete('/removeCartItem', { data: payload });
    return res.data.cart;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Remove failed");
  }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.delete('/clearCart');
    return res.data.cart;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Clear failed");
  }
});

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartManually: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
    clearCartState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const items = action.payload.items || [];
        state.items = items;
        state.totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalAmount = items.reduce((sum, i) => sum + i.quantity * i.selectedVariant.price, 0);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalAmount = action.payload.items.reduce((sum, i) => sum + i.quantity * i.selectedVariant.price, 0);
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalAmount = action.payload.items.reduce((sum, i) => sum + i.quantity * i.selectedVariant.price, 0);
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalAmount = action.payload.items.reduce((sum, i) => sum + i.quantity * i.selectedVariant.price, 0);
      })

      .addCase(clearCart.fulfilled, (state) => {
        Object.assign(state, initialState);
      });
  }
});

export const { setCartManually, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
