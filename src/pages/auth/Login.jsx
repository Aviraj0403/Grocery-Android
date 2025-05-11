import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(data); // from AuthContext
      toast.success("Logged in successfully!");
      navigate('/admin');
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const valid = Object.values(data).every(Boolean);

  return (
    <section className='w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6'>
        <p className='hover:text-green-600 text-xl font-semibold'>Login</p>

        <form className='grid gap-3 py-4' onSubmit={handleLogin}>
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
              <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link to="/forgot-password" className='block ml-auto text-sm text-green-600 hover:underline'>Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={!valid || loading}
            className={`${valid ? "bg-green-600 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold tracking-wide`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className='text-sm'>
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