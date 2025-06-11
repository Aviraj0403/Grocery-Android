import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/authApi";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => ({
        ...prev,
        email: location?.state?.email,
      }));
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (data.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be the same");
      return;
    }

    try {
      const response = await resetPassword(data);
      console.log(response);
      toast.success("Password successfully updated");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong, please try again.");
    }
  };

  return (
    <section className="w-full container mx-auto px-4">
      <div className="bg-green-50 my-4 w-full max-w-lg mx-auto rounded p-6">
        <p className="hover:text-green-600 font-bold mb-2 text-slate-700">
          Enter your New Password
        </p>

        <form className="grid gap-3 py-4" onSubmit={handlePasswordReset}>
          <div className="grid gap-1">
            <label htmlFor="newpassword">New Password:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700">
              <input
                type={showPassword ? "text" : "password"}
                id="newpassword"
                autoFocus
                className="w-full outline-none"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-700">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer"
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-600 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="font-semibold text-green-600 hover:text-green-700">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
