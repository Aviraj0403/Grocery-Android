import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce(
    (sum, i) => sum + i.quantity * i.selectedVariant.price,
    0
  );
  return { totalQuantity, totalAmount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.selectedVariant.id === item.selectedVariant.id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    updateItemQuantity: (state, action) => {
      const { id, variantId, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && i.selectedVariant.id === variantId
      );
      if (item) {
        item.quantity = quantity;
      }
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    removeItem: (state, action) => {
      const { id, variantId } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.id === id && i.selectedVariant.id === variantId)
      );
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    mergeCart: (state, action) => {
      const backendItems = action.payload.items || [];

      backendItems.forEach((backendItem) => {
        const localItem = state.items.find(
          (i) =>
            i.id === backendItem.id &&
            i.selectedVariant.id === backendItem.selectedVariant.id
        );

        if (localItem) {
          localItem.quantity += backendItem.quantity; // merge quantities
        } else {
          state.items.push(backendItem);
        }
      });

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
  },
});

export const {
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  setCart,
  mergeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
