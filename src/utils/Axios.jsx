import axios from "axios";
import summaryApi, { baseURL } from "../common/SummeryApi";

const Axios = axios.create({
   baseURL : baseURL,
   withCredentials : true
})
// sending access token in the header
Axios.interceptors.request.use(
   async(config)=>{
     const  accessToken = localStorage.getItem('accesstoken')

     if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`
     }
     return config
   },
   (error)=>{
       return Promise.reject(error)
   }
)

// extend the life span ofaccess token with the help of refresh
Axios.interceptors.request.use(
   (response)=>{
      return response
   },
   async(error)=>{
        let originalrequest = error.config

        if(error.response.status === 401 && !originalrequest.retry){
         originalrequest.retry = true;

         const refreshToken = localStorage.getItem("refreshToken")

         if(refreshToken){
             const newaccessToken = await refreshAccessToken(refreshToken)

             if(newaccessToken){
               originalrequest.headers.Authorization = `Bearer ${newaccessToken}`
               return Axios(originalrequest)
             }
         }
        }
        return Promise.reject(error)
   }
);

const refreshAccessToken = async(refreshToken)=>{
      try {
         const response = await Axios({
            ...summaryApi.refreshToken,
            headers : {
               Authorization : `Bearer ${refreshToken}`
            }
         })
         const accessToken = response.data.data.accessToken
         localStorage.setItem('accesstoken',accessToken)
         return accessToken
         console.log(response)
      } catch (error) {
         console.log(error)
      }
}

export default Axios;
