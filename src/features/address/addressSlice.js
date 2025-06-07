// features/address/addressSlice.js
import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    selectedAddress: null,
  },
  reducers: {
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
    selectAddress(state, action) {
      state.selectedAddress = action.payload;
    },
    clearAddress(state) {
      state.addresses = [];
      state.selectedAddress = null;
    },
  },
});

export const { setAddresses, selectAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
