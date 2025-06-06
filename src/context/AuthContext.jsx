import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as loginApi, logout as logoutApi } from "../services/authApi";
import { useQueryClient } from "@tanstack/react-query";
import { syncCartOnLogin } from '../features/cartThunks';
import { clearCart } from '../features/cartSlice';
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
        const res = await getMe(); // Single point of truth
        setUser(res.data.data);    // use .data if using { data: { ...user } } shape
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    validateSession();
  }, []);

  const login = async (credentials) => {
    await loginApi(credentials);
    const res = await getMe();  // immediately fetch user after login
    setUser(res.data.data);
     dispatch(syncCartOnLogin());
    return res.data.data;
  };

  const logout = async () => {
    await logoutApi();
    dispatch(clearCart());
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
