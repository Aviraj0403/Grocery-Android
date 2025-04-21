import axios from 'axios';
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4001/api"
    : "https://grocery-backend-9jjx.onrender.com/api";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
});

Axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post('/auth/refresh-token', {}, {
          baseURL: Axios.defaults.baseURL,
          withCredentials: true,
        });
        return Axios(originalRequest);
      } catch (refreshErr) {
        console.error('Refresh token expired');
      }
    }
    return Promise.reject(err);
  }
);

export default Axios;
