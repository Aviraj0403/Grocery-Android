import Axios from '../utils/Axios';

export const login = (data) => Axios.post('/user/login', data);
export const logout = () => Axios.post('/user/logout');
export const getMe = () => Axios.get('/me');  // now this alone is enough

const authApi = {
    register :{
        url : '/api/user/register',
        method : 'post'
    }
}

export default authApi;
