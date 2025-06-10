import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice";
import { getProfile, addAddress } from "../../services/authApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createOrder as createOrderApi } from "../../services/orderApi";
const CheckoutPage = () => {
  const { user } = useAuth();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const discount = Number(location.state?.discount) || 0;
  const finalAmount = Number(location.state?.finalAmount) || Number(totalAmount);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch user profile & addresses
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const userData = res.data?.userProfileDetail;

        if (!userData) {
          console.warn("No userProfileDetail found.");
          setAddresses([]);
          return;
        }

        setAddresses(userData.addresses || []);
        const defaultAddr = userData.addresses?.find((a) => a.isDefault);

        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
          setFormData({
            ...defaultAddr,
            fullName: userData.userName || "",
            email: userData.email || "",
            phoneNumber: defaultAddr.phoneNumber || "",
          });
          setAddingNewAddress(false);
        } else {
          setFormData({
            fullName: userData.userName || "",
            email: userData.email || "",
            phoneNumber: addr.phoneNumber || user?.phoneNumber || "",
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          });
          setAddingNewAddress(userData.addresses.length === 0);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setAddresses([]);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (selectedAddressId && !addingNewAddress) {
      const addr = addresses.find((a) => a.id === selectedAddressId);
      if (addr) {
        setFormData({
          fullName: user?.userName || "",
          email: user?.email || "",
          phoneNumber: addr.phoneNumber || user?.phoneNumber || "",
          street: addr.street,
          city: addr.city,
          state: addr.state,
          postalCode: addr.postalCode,
          country: addr.country,
        });
        setErrors({});
      }
    }
  }, [selectedAddressId, addingNewAddress, addresses, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "fullName",
      "email",
      "phoneNumber",
      "street",
      "city",
      "state",
      "postalCode",
      "country",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    //     if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
    //   newErrors.phoneNumber = "Invalid phone number (10 digits required)";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mockOnlinePayment = () =>
    new Promise((resolve) => setTimeout(() => resolve(true), 2000));

  // const handlePlaceOrder = async (e) => {
  //   e.preventDefault();
  //   if (!user) return navigate("/login");
  //   if (!validateForm()) return;
  //   if (items.length === 0) return alert("Your cart is empty!");

  //   setIsProcessing(true);

  //   let shippingAddress = null;

  //   try {
  //     // Save new address if needed
  //     if (addingNewAddress) {
  //       const res = await addAddress(formData);
  //       if (res.status === 201) {
  //         const updatedAddresses = res.data.addresses;
  //         const newAddr = updatedAddresses[updatedAddresses.length - 1];
  //         setAddresses(updatedAddresses);
  //         setSelectedAddressId(newAddr.id);
  //         shippingAddress = newAddr;
  //         setAddingNewAddress(false);
  //       } else {
  //         alert("Failed to save address.");
  //         setIsProcessing(false);
  //         return;
  //       }
  //     } else {
  //       shippingAddress = addresses.find((a) => a.id === selectedAddressId);
  //       if (!shippingAddress) {
  //         alert("Please select a valid address.");
  //         setIsProcessing(false);
  //         return;
  //       }
  //     }

  //     if (paymentMethod === "online") {
  //       const paymentSuccess = await mockOnlinePayment();
  //       if (!paymentSuccess) {
  //         alert("Payment failed.");
  //         setIsProcessing(false);
  //         return;
  //       }
  //     }

  //     const order = {
  //       id: Date.now().toString(),
  //       userId: user.id,
  //       items,
  //       totalQuantity,
  //       totalAmount,
  //       finalAmount,     // ← include this
  //       discount, 
  //       shipping: {
  //         ...shippingAddress,
  //         fullName: formData.fullName,
  //         email: formData.email,
  //         phoneNumber: formData.phoneNumber,
  //       },
  //       paymentMethod,
  //       orderDate: new Date().toISOString(),
  //       status: paymentMethod === "cod" ? "Pending" : "Paid",
  //     };

  //     console.log("Order Placed", order);
  //     dispatch(clearCart());
  //     navigate("/order-confirmation", { state: { order } });
  //   } catch (error) {
  //     alert("Order failed: " + error.message);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!validateForm()) return;
    if (items.length === 0) return alert("Your cart is empty!");

    setIsProcessing(true);

    let shippingAddress = null;

    try {
      // Save new address if needed
      if (addingNewAddress) {
        const res = await addAddress(formData);
        if (res.status === 201) {
          const updatedAddresses = res.data.addresses;
          const newAddr = updatedAddresses[updatedAddresses.length - 1];
          setAddresses(updatedAddresses);
          setSelectedAddressId(newAddr.id);
          shippingAddress = newAddr;
          setAddingNewAddress(false);
        } else {
          alert("Failed to save address.");
          setIsProcessing(false);
          return;
        }
      } else {
        shippingAddress = addresses.find((a) => a.id === selectedAddressId);
        if (!shippingAddress) {
          alert("Please select a valid address.");
          setIsProcessing(false);
          return;
        }
      }

      // If online payment, mock payment success (replace with real payment flow if any)
      if (paymentMethod === "online") {
        const paymentSuccess = await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
        if (!paymentSuccess) {
          alert("Payment failed.");
          setIsProcessing(false);
          return;
        }
      }

      // Prepare order payload matching your backend
      const orderPayload = {
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant || null,
          price: item.selectedVariant?.price || item.price || 0,
          name: item.name
        })),
        totalAmount,
        finalAmount,
        discount,
        offerApplied: null, // add if you have offer data
        shipping: {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          street: formData.street,
          addressLine2: formData.addressLine2 || "", // add if you have it in formData
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: paymentMethod.toUpperCase() // match backend expected values: 'COD' or 'ONLINE'
      };

      // Call backend API to create order
      const response = await createOrderApi(orderPayload);

      if (response.success) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate("/order-confirmation", { state: { order: response.order } });
      } else {
        toast.error("Failed to place order: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      toast.errors("Order failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form
          onSubmit={handlePlaceOrder}
          className="bg-white p-6 rounded shadow space-y-6"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          {!addingNewAddress ? (
            <>
              <label className="block mb-2 font-medium">Choose Address</label>
              {addresses.length === 0 ? (
                <p className="mb-4 text-gray-600">
                  You have no saved addresses. Please add one.
                </p>
              ) : (
                <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block border rounded-md p-4 cursor-pointer transition ${selectedAddressId === addr.id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 hover:border-green-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mr-3"
                      />
                      <span className="font-semibold">{addr.label}</span>: {addr.street},{" "}
                      {addr.city}, {addr.state} - {addr.postalCode}
                    </label>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setAddingNewAddress(true);
                  setSelectedAddressId(null);
                  setFormData({
                    fullName: user?.userName || "",
                    email: user?.email || "",
                    street: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "",
                  });
                  setErrors({});
                }}
                className="inline-block mt-2 text-green-600 hover:underline font-semibold"
              >
                + Add New Address
              </button>
            </>
          ) : (
            <>
              {["fullName", "email", "phoneNumber", "street", "city", "state", "postalCode", "country"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className={`w-full border px-3 py-2 rounded-md ${errors[field] ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="text-blue-600 hover:underline mt-2 font-medium"
                onClick={() => {
                  setAddingNewAddress(false);
                  if (addresses.length > 0) {
                    setSelectedAddressId(addresses[0].id);
                  }
                }}
              >
                ← Back to Addresses
              </button>
            </>
          )}

          {!addingNewAddress && (
            <div>
              <label className="block mb-2 font-semibold">Payment Method</label>
              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  Online Payment
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-semibold disabled:opacity-60"
            disabled={
              isProcessing ||
              (items.length === 0) ||
              (!addingNewAddress && !selectedAddressId)
            }
          >
            {isProcessing
              ? "Processing..."
              : addingNewAddress
                ? "Save & Place Order"
                : "Place Order"}
          </button>
        </form>

        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item, idx) => (
                <li key={idx} className="flex justify-between py-2">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{((item.selectedVariant?.price || 0) * item.quantity).toFixed(2)}</span>
                </li>
              ))
            )}
          </ul>
          <div className="mt-4 flex justify-between">
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>
          <div className="mt-2 flex justify-between font-semibold text-red-700 line-through">
            <span>Total Amount:</span>
            <span>₹{Number(totalAmount).toFixed(2)}</span>
          </div>

          {discount > 0 ? (
            <>
              {/* <div className="mt-2 flex justify-between text-sm text-gray-500 line-through">
      <span>Original Price:</span>
      <span>₹{Number(totalAmount).toFixed(2)}</span>
    </div> */}

              <div className="flex justify-between font-semibold text-green-700 text-lg">
                <span>You Pay:</span>
                <span>₹{Number(finalAmount).toFixed(2)}</span>
              </div>

              <p className="text-sm text-right text-green-600 font-medium italic">
                You saved ₹{Number(discount).toFixed(2)}!
              </p>
            </>
          ) : (
            <div className="mt-2 flex justify-between font-semibold text-green-700 text-lg">
              <span>Total Amount:</span>
              <span>₹{Number(finalAmount).toFixed(2)}</span>
            </div>
          )}


          <Link to="/cart" className="block mt-6 text-green-600 hover:underline text-center">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
