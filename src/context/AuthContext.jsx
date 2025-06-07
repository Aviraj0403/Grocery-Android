import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as loginApi, logout as logoutApi } from "../services/authApi";
import { useQueryClient } from "@tanstack/react-query";
import { syncCartOnLogin, fetchBackendCart } from '../features/cart/cartThunks';
import { clearCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await getMe(); // Check token/session
        setUser(res.data.data);

        // ✅ On refresh or re-login, just fetch backend cart
        dispatch(fetchBackendCart());
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [dispatch]);

  const login = async (credentials) => {
    await loginApi(credentials);
    const res = await getMe();
    setUser(res.data.data);

    // ✅ On manual login, merge local guest cart
    dispatch(syncCartOnLogin());

    return res.data.data;
  };

  const logout = async () => {
    await logoutApi();
    dispatch(clearCart());       // Clear cart from Redux
    setUser(null);               // Clear user from context
    queryClient.clear();         // Clear React Query cache
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
