import axios from 'axios';
//for local 
// const baseURL = "http://localhost:4001/api";
//for production
const baseURL = "https://grocery-backend-9jjx.onrender.com/api";
 
const Axios = axios.create({
  baseURL,
  withCredentials: true, // Include cookies for sessions
});
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        
        

        // Retry original request after token is refreshed
        return Axios(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // Optional: clear any stored data
        localStorage.removeItem("user");
        sessionStorage.clear();

        // Redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // If not a 401 or already retried, just reject
    return Promise.reject(error);
  }
);

export default Axios;