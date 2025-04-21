// src/store/Store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import cartReducer from '../features/cartSlice';
// import productReducer from '../features/productSlice';
import orderReducer from '../features/orderSlice';
import categoryReducer from '../features/categorySlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  stateReconciler: autoMergeLevel2,
  whitelist: ['cart'], // persist only cart for guest users
};

const rootReducer = combineReducers({
  cart: cartReducer,
  // product: productReducer,
  // order: orderReducer,
  // category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
