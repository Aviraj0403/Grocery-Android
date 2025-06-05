import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgotpassword from "./pages/auth/Forgotpassword";
import Otpverifiaction from "./pages/auth/Otpverifiaction";
import Resetpassword from "./pages/auth/Resetpassword";
import Address from "./pages/Address";

// Layouts
import Layout from "./Layout";
import UserDashboard from "./pages/users/UserDashboard"; // 🆕 User Dashboard Layout

// Admin
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
import ProductDetail from "./pages/Product/ProductDetail";
import Deo from "./pages/ShopingSection/Deo";
import Cleaning from "./pages/ShopingSection/Cleaning";
import TeaCoffe from "./pages/ShopingSection/TeaCoffe";
import ShopNow from "./pages/ShopingSection/ShopNow";
import GraburFirstOrder from "./pages/ShopingSection/GraburFirstOrder";
import Toothpaste from "./pages/ShopingSection/Toothpaste";
import Detergent from "./pages/ShopingSection/Detergent";
import Raksha from "./pages/ShopingSection/Raksha";
import Gift from "./pages/ShopingSection/Moregift";
import Moregift from "./pages/ShopingSection/Moregift";
import Exploremore from "./pages/ShopingSection/Exploremore";
import Arrivals from "./pages/ShopingSection/Arrivals";

// 🆕 User Dashboard Pages (make sure these exist)
// import Profile from "./pages/Profile";
// import Myorder from "./pages/Myorder";
// import ChangePassword from "./pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
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
          { path: "product/:id" , element : <ProductDetail/>},
          {path: "deo",element : <Deo/>},
          {path:"cleaning", element:<Cleaning/>},
          {path: "Coofe", element: <TeaCoffe/>},
          {path : "shopnow", element: <ShopNow/>},
          {path:"grab",element:<GraburFirstOrder/>},
          {path:"toothpaste", element:<Toothpaste/>},
          {path:"deter", element:<Detergent/>},
          {path:"raksha", element:<Raksha/>},
          {path:"gift",element:<Moregift/>},
          {path:"expmore", element:<Exploremore/>},
          {path:"arrivals", element:<Arrivals/>},

          // 🆕 User Dashboard with nested routes
          {
            path: "dashboard/profile",
            element: <UserDashboard />,
            children: [
              // { path: "profile", element: <Profile /> },
              // { path: "orders", element: <Myorder /> },
              // { path: "change-password", element: <ChangePassword /> },
              { path: "address", element: <Address /> },
            ],
          },
        ],
      },

      // Admin Panel
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
        ],
      },
    ],
  },
]);

export default router;    
