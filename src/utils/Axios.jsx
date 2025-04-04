import axios from "axios";
import { baseURL } from "../common/SummeryApi";

const Axios = axios.create({
   baseURL : baseURL,
   withCredentials : true
})

export default Axios;
