import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Searchpage from "../pages/Searchpage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forgotpassword from "../pages/Forgotpassword";
import Otpverifiaction from "../pages/Otpverifiaction";

const router = createBrowserRouter([
    {
        path : "/",
        element:<App/>,
        children :[
            {
                path : "",
                element : <Home/>
            },
            {
                path :"search",
                element : <Searchpage/>
            },
            {
                path :"login",
                element :<Login/>
                
            },
            {
                path :"register",
                element :<Register/>
            
            },
            {
                path :"forgot-password",
                element : <Forgotpassword/>
            },
            {
                path : "verification-otp",
                element : <Otpverifiaction/>
            }
        ]
        
    }
])

export default router