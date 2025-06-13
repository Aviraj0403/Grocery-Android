// components/Register.jsx
import React, { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { register } from '../../services/authApi';
import { Link, useNavigate } from 'react-router-dom';
import AxiosToastError from '../../utils/AxiosToastError';

const Register = () => {
  const [data, setData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error('Password and confirm password must match');
      return;
    }

    if (!/^\d{10}$/.test(data.phoneNumber)) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }

    try {
      const res = await register({
        userName: data.userName,
        email: data.email,
        phoneNumber: `+91${data.phoneNumber}`, // Add country code
        password: data.password
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setData({
          userName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        });
        navigate('/login');
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message || 'Something went wrong';
      if (status === 400 || status === 409) {
        toast.error(msg);
      } else {
        AxiosToastError(err);
      }
    }
  };

  const isValid = Object.values(data).every(Boolean);

  return (
    <section className="w-full container mx-auto px-4">
      <div className="bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6">
        <p className="bg-green-600 hover:bg-green-700 text-white flex justify-center py-2 rounded font-semibold">
          Welcome to shanu&apos;s Mart
        </p>

        <form className="grid gap-3 mt-6" onSubmit={handleRegister}>
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="userName">Name:</label>
            <input
              id="userName"
              name="userName"
              value={data.userName}
              onChange={handleChange}
              placeholder="Enter your name..."
              className="bg-blue-50 p-2 border rounded outline-none focus:border-green-700"
              autoFocus
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="bg-blue-50 p-2 border rounded outline-none focus:border-green-700"
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-1">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <div className="flex items-center bg-blue-50 p-2 border rounded focus-within:border-green-700">
              <span className="text-gray-700 pr-2">+91</span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '');
                }}
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                className="w-full outline-none bg-blue-50"
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none bg-blue-50"
              />
              <div onClick={() => setShowPassword(p => !p)} className="cursor-pointer">
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full outline-none bg-blue-50"
              />
              <div onClick={() => setShowConfirmPassword(p => !p)} className="cursor-pointer">
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`text-white py-2 rounded font-semibold my-3 tracking-wide ${
              isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500'
            }`}
          >
            Register
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-green-600 hover:text-green-700">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
