import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4001/api'
    : 'https://grocery-backend-9jjx.onrender.com/api';

const Axios = axios.create({
  baseURL,
  withCredentials: true, // ✅ includes cookies on every request
});

// Intercept 401s to attempt token refresh
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh the access token
        await Axios.post('/auth/refresh-token');

        // Retry original request
        return Axios(originalRequest);
      } catch (refreshError) {
        console.error('❌ Refresh token expired. Redirecting to login.');
        window.location.href = '/login'; // force re-authentication
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
