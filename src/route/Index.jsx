import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Searchpage from "../pages/Searchpage";

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
            }
        ]
        
    }
])

export default router