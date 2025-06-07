import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  merged: false,
};

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * (item.selectedVariant.price || 0),
    0
  );
  return { totalQuantity, totalAmount };
};

const normalizeItem = (item) => ({
  id: item.product?._id || item.id || item.productId || item._id,
  quantity: item.quantity || 0,
  selectedVariant: {
    id: item.selectedVariant?.id || item.selectedVariant?.unit,
    unit: item.selectedVariant?.unit || null,
    price: item.selectedVariant?.price || 0,
  },
  name: item.product?.name || item.name || '',
  images: Array.isArray(item.product?.images) ? item.product.images : [],
  image: item.image || null,
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = normalizeItem(action.payload);
      const variantId = item.selectedVariant.id || item.selectedVariant.unit;

      const existingItem = state.items.find(
        (i) =>
          i.id === item.id &&
          ((i.selectedVariant.id || i.selectedVariant.unit) === variantId)
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
    updateItemQuantity(state, action) {
      const { id, variantId, quantity } = action.payload;
      const item = state.items.find(
        (i) =>
          i.id === id &&
          (i.selectedVariant.id || i.selectedVariant.unit) === variantId
      );
      if (item) item.quantity = quantity;

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    removeItem(state, action) {
      const { id, variantId } = action.payload;
      state.items = state.items.filter(
        (i) =>
          !(
            i.id === id &&
            (i.selectedVariant.id || i.selectedVariant.unit) === variantId
          )
      );

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.merged = false;
    },
    setCart(state, action) {
      const rawItems = action.payload.items || [];
      state.items = rawItems.map(normalizeItem);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    mergeCart(state, action) {
      const rawItems = action.payload.items || [];
      const backendItems = rawItems.map(normalizeItem);

      backendItems.forEach((backendItem) => {
        const localItem = state.items.find(
          (i) =>
            i.id === backendItem.id &&
            ((i.selectedVariant.id || i.selectedVariant.unit) ===
              (backendItem.selectedVariant.id || backendItem.selectedVariant.unit))
        );

        if (localItem) {
          localItem.quantity += backendItem.quantity;
        } else {
          state.items.push(backendItem);
        }
      });

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },
    setMerged(state, action) {
      state.merged = action.payload;
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
  setMerged,
} = cartSlice.actions;

export default cartSlice.reducer;
