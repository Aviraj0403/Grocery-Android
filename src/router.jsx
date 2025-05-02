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
} from "./admin";

// Other Pages
import CartPage from "./pages/cart/cartPage";
import OneDayReturn from "./pages/OneDayReturn";
import CashOnDelivery from "./pages/CashOnDelivery";
import AboutUs from "./QuickLinks/AboutUs";
import AboutDeveloper from "./QuickLinks/AboutDeveloper";
import Contact from "./QuickLinks/Contact";
import TermandConditions from "./QuickLinks/TermandConditions";
import Privacy from "./QuickLinks/Privacy";
import Deo from "./pages/ShopingSection/Deo";
import Cleaning from "./pages/ShopingSection/Cleaning";
import TeaCoffe from "./pages/ShopingSection/TeaCoffe";

// 🆕 User Dashboard Pages (make sure these exist)
// import Profile from "./pages/Profile";
// import Myorder from "./pages/Myorder";
// import ChangePassword from "./pages/ChangePassword";

const router = createBrowserRouter([
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
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <Forgotpassword /> },
          { path: "verification-otp", element: <Otpverifiaction /> },
          { path: "reset-password", element: <Resetpassword /> },
          { path: "dashboard/cart", element: <CartPage /> },
          { path: "onedayreturn", element: <OneDayReturn /> },
          { path: "cashondelivery", element: <CashOnDelivery /> },
          { path: "aboutus", element: <AboutUs /> },
          { path: "aboutdeveloper", element: <AboutDeveloper /> },
          { path: "contactus", element: <Contact /> },
          { path: "termandconditons", element: <TermandConditions /> },
          { path: "privacy", element: <Privacy /> },
          {path : "deo", element: <Deo/>},
          {path:"cleaning", element:<Cleaning/>},
          {path:"Coofe", element:<TeaCoffe/>},
          

          // 🆕 User Dashboard with nested routes
          {
            path: "dashboard/profile",
            element: <UserDashboard />,
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
