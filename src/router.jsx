// src/router.jsx
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App      from './App'
import Layout   from './Layout'

// Public pages
import Home             from './pages/Home/Home'
import Login            from './pages/auth/Login'
import Register         from './pages/auth/Register'
import Forgotpassword   from './pages/auth/Forgotpassword'
import Otpverifiaction  from './pages/auth/Otpverifiaction'
import Resetpassword    from './pages/auth/Resetpassword'
import AboutUs          from './QuickLinks/AboutUs'
import AboutDeveloper   from './QuickLinks/AboutDeveloper'
import Contact          from './QuickLinks/Contact'
import TermandConditions from './QuickLinks/TermandConditions'
import Privacy          from './QuickLinks/Privacy'
import ProductDetail    from './pages/Product/ProductDetail'
import OneDayReturn     from './pages/OneDayReturn'
import CashOnDelivery   from './pages/CashOnDelivery'
import CartPage         from './pages/cart/cartPage'

// Customer pages
import UserDashboard    from './pages/users/UserDashboard'
import Address          from './pages/Address'

// Admin panel
import {
  AdminLayout,
  AdminDashboard,
  AddProduct,
  AdminProducts,
  EditProducts,
  ProductDetails,
  CategoryManager,
  UserList,
  AdminOrderManager,
  Unauthorized,
  ProtectedRoute
} from './admin'

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // ── Public & Customer use the main Layout ────────────────────────────
      {
        element: <Layout />,
        children: [
          // Public
          { index: true, element: <Home /> },
          { path: 'login',           element: <Login /> },
          { path: 'register',        element: <Register /> },
          { path: 'forgot-password', element: <Forgotpassword /> },
          { path: 'verification-otp',element: <Otpverifiaction /> },
          { path: 'reset-password',  element: <Resetpassword /> },
          { path: 'aboutus',         element: <AboutUs /> },
          { path: 'aboutdeveloper',  element: <AboutDeveloper /> },
          { path: 'contactus',       element: <Contact /> },
          { path: 'termandconditions', element: <TermandConditions /> },
          { path: 'privacy',         element: <Privacy /> },
          { path: 'product/:id',     element: <ProductDetail /> },
          { path: 'onedayreturn',    element: <OneDayReturn /> },
          { path: 'cashondelivery',  element: <CashOnDelivery /> },
          { path: 'dashboard/cart',  element: <CartPage /> },
          { path: 'unauthorized',    element: <Unauthorized /> },

          // Customer‐only
          {
            element: <ProtectedRoute allowedRoles={['customer']} />,
            children: [
              { path: 'dashboard/profile',         element: <UserDashboard /> },
              { path: 'dashboard/profile/address', element: <Address /> },
            ]
          },
        ]
      },

      // ── Admin routes sit at the same level as Layout, **not** inside it ──
      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              { index: true,               element: <AdminDashboard /> },
              { path: 'addProduct',        element: <AddProduct /> },
              { path: 'adminProducts',     element: <AdminProducts /> },
              { path: 'edit-product/:id',  element: <EditProducts /> },
              { path: 'product-details/:id', element: <ProductDetails /> },
              { path: 'categories',        element: <CategoryManager /> },
              { path: 'users',             element: <UserList /> },
              { path: 'orders',            element: <AdminOrderManager /> },
            ]
          }
        ]
      }
    ]
  }
])
