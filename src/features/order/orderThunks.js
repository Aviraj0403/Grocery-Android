import { createAsyncThunk } from '@reduxjs/toolkit';
import * as orderApi from '../../services/orderApi';

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await orderApi.getOrders();
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await orderApi.createOrder(orderData);
      return res.data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to place order');
    }
  }
);
export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await orderApi.cancelOrder(orderId);
      return res.data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel order');
    }
  }
);
