import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Searchpage from "./pages/Searchpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgotpassword from "./pages/Forgotpassword";
import Otpverifiaction from "./pages/Otpverifiaction";
import Resetpassword from "./pages/Resetpassword";
import Usermenumobile from "./pages/Usermenumobile";

// user section
import Dashboard from "./layouts/Dashboard";
import Profile from "./pages/Profile";
import Myorder from "./pages/Myorder";
import Address from "./pages/Address";

// Admin related imports
import {AdminLayout,AdminDashboard, AddProduct, AdminProducts, EditProducts, ProductDetails, CategoryManager} from "./admin";
// import { AdminDashboard} from "./admin";

const router = createBrowserRouter([
   {
     path: "/",
     element: <App />,
     children: [
       { path: "", element: <Home /> },
       { path: "search", element: <Searchpage /> },
       { path: "login", element: <Login /> },
       { path: "register", element: <Register /> },
       { path: "forgot-password", element: <Forgotpassword /> },
       { path: "verification-otp", element: <Otpverifiaction /> },
       { path: "reset-password", element: <Resetpassword /> },
       { path: "user", element: <Usermenumobile /> },
       {
         path: "dashboard",
         element: <Dashboard />,
         children: [
           { path: "profile", element: <Profile /> },
           { path: "myorders", element: <Myorder /> },
           { path: "address", element: <Address /> },
         ],
       },
       {
         path: "admin",
         element: <AdminLayout />,
         children: [
           { path: "", element: <AdminDashboard /> },
           { path: "addProduct", element: <AddProduct /> },
           { path: "adminProducts", element: <AdminProducts /> },
           { path: "edit-product/:id", element: <EditProducts /> },
           { path: "product-details/:id", element: <ProductDetails /> },
           { path: "categories", element: <CategoryManager /> },
           
          //  { path: "users", element: <AdminUsers /> },
          //  { path: "orders", element: <AdminOrders /> },
         ],
       },
     ],
   },
 ]);
 

export default router;
