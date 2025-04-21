import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/slices/cartSlice';
import { getUserCart } from '../api/cartApi';

const CartLoader = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useQuery(['userCart'], getUserCart, {
    enabled: !!localStorage.getItem('token'), // Only if logged in
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCart(data.items));
    }
  }, [isSuccess]);

  return null;
};
