import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../services/authApi';

export const loginUser = createAsyncThunk('auth/loginUser', async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      console.log('Login success:', res.data);
      return res.data.userData;
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  });
  

export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.getProfile();
    return res.data.userProfileDetail;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await authApi.logout();
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export default authSlice.reducer;
