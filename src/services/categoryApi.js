import Axios from '../utils/Axios';

export const getCategories = async () => {
  const res = await Axios.get('/getAllCategories');
  return res.data.categories;
};

export const getMainCategories = async () => {
  const res = await Axios.get('/getMainCategories');
  return res.data.categories;
};