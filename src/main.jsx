import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/ReactQueryClient';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import router from './router';
import WindowContextProvider from './context/windowContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <WindowContextProvider>
              
              <RouterProvider router={router} />
              
            </WindowContextProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
    </SearchProvider>
  </React.StrictMode>
);
