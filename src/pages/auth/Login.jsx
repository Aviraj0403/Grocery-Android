// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [data, setData]           = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // login() now returns the user object
      const loggedInUser = await login(data);
      toast.success("Logged in successfully!");

      // redirect based on roleType
      if (loggedInUser.roleType === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard/profile", { replace: true });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const valid = data.email && data.password;

  // if already logged in, show greeting
  if (user) {
    return (
      <section className='w-full container mx-auto px-4'>
        <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6'>
          <p className='text-xl font-semibold text-center text-green-700'>
            👋 Welcome back, {user.userName || user.name}!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6'>
        <p className='text-xl font-semibold'>Login</p>

        <form className='grid gap-3 py-4' onSubmit={handleLogin}>
          {/* Email */}
          <div className='grid gap-1'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className='bg-blue-50 p-2 border rounded outline-none focus:border-green-700'
              placeholder='Enter your email address'
              required
            />
          </div>

          {/* Password */}
          <div className='grid gap-1'>
            <label htmlFor="password">Password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700'>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className='w-full outline-none'
                placeholder='Enter your password'
                required
              />
              <div onClick={() => setShowPassword(v => !v)} className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link to="/forgot-password" className='block ml-auto text-sm text-green-600 hover:underline'>
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!valid || loading}
            className={`w-full text-white py-2 rounded font-semibold tracking-wide
              ${valid ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"}`}
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className='text-sm mt-2'>
          Don't have an account?{" "}
          <Link to="/register" className='font-semibold text-green-600 hover:text-green-700'>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
