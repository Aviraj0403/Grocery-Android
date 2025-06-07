// features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../../services/authApi';

export const loginUser = createAsyncThunk('auth/loginUser', async (payload, { rejectWithValue }) => {
  try {
    const res = await authApi.login(payload);
    return res.data.userData;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.getProfile();
    return res.data.userProfileDetail;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Profile fetch failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await authApi.logout();
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});
