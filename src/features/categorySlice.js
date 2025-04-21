import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
});

export const { setCategories, clearCategoryError } = categorySlice.actions;
export default categorySlice.reducer;