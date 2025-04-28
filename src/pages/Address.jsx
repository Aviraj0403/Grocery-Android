import React, { useState } from "react";
import toast from "react-hot-toast";

const Address = ({ onSave }) => {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(address).some((field) => field.trim() === "")) {
      toast.error("Please fill in all fields.");
      return;
    }
    // call API here if needed
    if (onSave) onSave(address);
    toast.success("Address saved successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-green-600 mb-6">
        Delivery Address
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border border-green-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border border-green-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleChange}
          placeholder="Street Address"
          className="w-full p-2 border border-green-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border border-green-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full p-2 border border-green-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="postalCode"
          value={address.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
          className="w-full p-2 border border-green-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border border-green-300 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;
