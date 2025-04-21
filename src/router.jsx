import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Pages
import Home from "./pages/Home/Home";
// import Searchpage from "./pages/Searchpage";
import Login from "./pages/auth/Login";
// import Register from "./pages/Register";
// import Forgotpassword from "./pages/Forgotpassword";
// import Otpverifiaction from "./pages/Otpverifiaction";
// import Resetpassword from "./pages/Resetpassword";
// import Usermenumobile from "./pages/Usermenumobile";

import Address from "./pages/Address";

// Layouts
import Layout from "./Layout";
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
import CartPage from "./pages/cart/cartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root of the app
    children: [
      {
        path: "",
        element: <Layout />, // Main layout with Header, Footer, etc.
        children: [
          { index: true, element: <Home /> }, // Home page at "/"
          // { path: "search", element: <Searchpage /> }, // Search page
          { path: "login", element: <Login /> }, // Login page
          { path: "dashboard/cart", element: <CartPage /> },

          // Uncomment and use these when needed
          // { path: "register", element: <Register /> },
          // { path: "forgot-password", element: <Forgotpassword /> },
          // { path: "verification-otp", element: <Otpverifiaction /> },
          // { path: "reset-password", element: <Resetpassword /> },
          // { path: "user", element: <Usermenumobile /> },

          {
            path: "dashboard",
            element: <Home />, // You can replace this with a Dashboard layout
            children: [
              // { path: "profile", element: <Profile /> },
              // { path: "myorders", element: <Myorder /> },
              { path: "address", element: <Address /> },
            ],
          },
        ],
      },

      // Admin Section with separate AdminLayout
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "addProduct", element: <AddProduct /> },
          { path: "adminProducts", element: <AdminProducts /> },
          { path: "edit-product/:id", element: <EditProducts /> },
          { path: "product-details/:id", element: <ProductDetails /> },
          { path: "categories", element: <CategoryManager /> },
          { path: "users", element: <UserList /> },
          { path: "orders", element: <AdminOrderManager /> },

          // Future admin routes
          // { path: "users", element: <AdminUsers /> },
          // { path: "orders", element: <AdminOrders /> },
        ],
      },
    ],
  },
]);

export default router;
