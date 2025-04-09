import { register } from "swiper/element"
import { logout, setUserDetails } from "../store/Userslice";

export const baseURL = "http://localhost:8080"

const summaryApi = {
    register :{
        baseURL : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    forgot_password : {
        url : '/api/user/forgot-password',
        method : 'put'
    },
    forgot_password_otp_verification : {
        url : 'api/user/verify-forgot-password-otp',
        method : 'put'
    },
    resetPassword : {
        url : '/api/user/reset-password',
        method : 'put'
    },
    refreshToken : {
        url : 'api/user/refresh-token',
        method : 'post'
    },
    userDetails : {
        url : "/api/user/user-details",
        method : 'get'
    },
    logout : {
        url: "/api/user/logout",
        method : "get"
    }
}
export default summaryApi;