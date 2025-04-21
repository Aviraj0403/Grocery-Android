import axios from 'axios';

// const baseURL = "http://localhost:4001/api";
const baseURL = "https://grocery-backend-9jjx.onrender.com/api";
// const baseURL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:4001/api"
//     : "https://grocery-backend-9jjx.onrender.com/api";

const Axios = axios.create({
  baseURL,
  // prodURL,
  withCredentials: true, // required to send cookies
});

Axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If 401, and not retried yet — try refreshing token
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          "/auth/refresh-token",
          {},
          {
            baseURL: Axios.defaults.baseURL,
            withCredentials: true,
          }
        );
        return Axios(originalRequest); // Retry the original request
      } catch (refreshErr) {
        console.error("❌ Refresh token expired. Redirecting to login.");

        // ✅ Optional: clear any local/sessionStorage items
        localStorage.removeItem("user");
        sessionStorage.clear();

        // ✅ Redirect to login or show message
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    // If already retried, just reject
    return Promise.reject(err);
  }
);

export default Axios;
