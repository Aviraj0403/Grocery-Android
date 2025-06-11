import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { verifyOtp } from '../../services/authApi';

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    } else {
      inputRef.current[0]?.focus();
    }
  }, [location, navigate]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newData = [...data];
    newData[index] = value;
    setData(newData);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({
        otp: data.join(""),
        email: location?.state?.email,
      });

      console.log(response);
      toast.success("OTP Verified!");
      navigate("/reset-password", {
        state: { email: location?.state?.email, data: { success: true } },
      });
    } catch (err) {
      console.error(err);
      toast.error("Invalid OTP");
      setData(["", "", "", "", "", ""]);
      inputRef.current[0]?.focus();
    }
  };

  const isValid = data.every((el) => /^\d$/.test(el));

  return (
    <section className='w-full container mx-auto px-4'>
      <div className='bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6 hover:bg-green-100'>
        <p className='hover:text-green-600 font-bold mb-2 text-slate-700'>Enter OTP</p>

        <form className='grid gap-3 py-4' onSubmit={handleVerify}>
          <div className='grid gap-1'>
            <label htmlFor="otp">Enter Your OTP:</label>
            <div className='flex items-center gap-1 justify-between mt-3'>
              {data.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(ref) => (inputRef.current[index] = ref)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-green-700 text-center font-semibold'
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`${isValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-700'>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
