import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getProfile,
} from '../../services/authApi';

const emptyAddress = {
  label: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
};

const AddressesView = ({ phoneNumber }) => {
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyAddress);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileAddresses = async () => {
      setLoading(true);
      try {
        const { data } = await getProfile();
        setAddresses(data.userProfileDetail.addresses || []);
      } catch {
        toast.error('Failed to load addresses');
      }
      setLoading(false);
    };
    fetchProfileAddresses();
  }, []);

  const startEdit = (address) => {
    setEditingId(address.id);
    setForm(address);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyAddress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const saveAddress = async () => {
    try {
      if (editingId) {
        // update address
        const res = await updateAddress(editingId, form);
        setAddresses(res.data.addresses);
        toast.success('Address updated');
      } else {
        // add new address
        const res = await addAddress(form);
        setAddresses(res.data.addresses);
        toast.success('Address added');
      }
      cancelEdit();
    } catch {
      toast.error('Failed to save address');
    }
  };

  const removeAddress = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      const res = await deleteAddress(id);
      setAddresses(res.data.addresses);
      toast.success('Address deleted');
    } catch {
      toast.error('Failed to delete address');
    }
  };

  const makeDefault = async (id) => {
    try {
      const res = await setDefaultAddress(id);
      setAddresses(res.data.addresses);
      toast.success('Default address updated');
    } catch {
      toast.error('Failed to update default address');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Addresses</h2>
      <p className="mb-6 text-gray-600">
        Phone for delivery: <strong>{phoneNumber}</strong>
      </p>

      {loading ? (
        <p>Loading addresses...</p>
      ) : (
        <>
          {addresses.length === 0 && <p>No addresses added yet.</p>}

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border p-4 rounded-md mb-4 flex justify-between items-center ${
                addr.isDefault ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {addr.label} {addr.isDefault && <span className="text-green-600">(Default)</span>}
                </h3>
                <p>
                  {addr.street}, {addr.city}, {addr.state}, {addr.postalCode}, {addr.country}
                </p>
              </div>
              <div className="flex space-x-2">
                {!addr.isDefault && (
                  <button
                    onClick={() => makeDefault(addr.id)}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => startEdit(addr)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeAddress(addr.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleChange}
                placeholder="Label (e.g. Home, Work)"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Street"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={saveAddress}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingId ? 'Update Address' : 'Add Address'}
              </button>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressesView;
