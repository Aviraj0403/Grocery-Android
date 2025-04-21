import Axios from '../store/Axios';

export const getCategories = async () => {
  const res = await Axios.get('/getAllCategories');
  return res.data.categories;
};
