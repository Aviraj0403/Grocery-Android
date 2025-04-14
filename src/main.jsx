import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store.js';
// import router from './route/Index.jsx'
import router from './router.jsx';
import WindowContextProvider from './context/windowContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
      <WindowContextProvider>
        <RouterProvider router={router} />
      </WindowContextProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
