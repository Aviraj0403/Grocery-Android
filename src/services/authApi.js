import Axios from '../utils/Axios';

// 🔓 Public Routes
export const register = (data) => Axios.post('/user/register', data);
export const login = (data) => Axios.post('/user/login', data);
export const forgotPassword = (data) => Axios.post('/user/forgotPassword', data);
export const resetPassword = (data) => Axios.post('/user/resetPassword', data);
export const googleLogin = (data) => Axios.post('/user/googleLogin', data);

// 🔐 Protected Routes (require token)
export const logout = () => Axios.post('/user/logout'); // Axios should attach token via interceptors
export const getProfile = () => Axios.get('/user/profile');
export const updateProfile = (data) => Axios.patch('/user/updateProfile', data);
export const uploadAvatar = (formData) => Axios.post('/user/uploadAvatar', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const getMe = () => Axios.get('/me');
export const refreshToken = () => Axios.post('/auth/refresh-token');
