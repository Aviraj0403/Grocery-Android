import React, { useEffect, useState } from 'react';
import { 
  getProfile, 
  updateProfile, 
  uploadAvatar,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from '../../services/authApi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import ProfileView from './ProfileView';
import Orders from './Orders';           // Confirm component name
import SettingView from './SettingView'; // Confirm component name

import { FaMapMarkerAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [draftProfile, setDraftProfile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Addresses state & form states
  const [addresses, setAddresses] = useState([]);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const openAddressesTab = () => setActiveTab('addresses');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data.userProfileDetail);
        setDraftProfile(data.userProfileDetail);
        setAvatarPreview(data.userProfileDetail.avatar || '');
        setAddresses(data.userProfileDetail.addresses || []);
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(draftProfile);
      setProfile(draftProfile);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Update failed');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Discard changes?')) {
      setDraftProfile(profile);
    }
  };

  const handleAvatarChange = async (file) => {
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await uploadAvatar(formData);
      toast.success('Avatar uploaded!');
    } catch {
      toast.error('Avatar upload failed');
    }
  };

  // Address handlers
  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddAddress = () => {
    setAddressForm({
      label: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
    });
    setEditingAddressId(null);
    setAddressModalOpen(true);
  };

  const openEditAddress = (address) => {
    setAddressForm(address);
    setEditingAddressId(address.id);
    setAddressModalOpen(true);
  };

  const saveAddress = async () => {
    try {
      if (editingAddressId) {
        // Update
        const { data } = await updateAddress(editingAddressId, addressForm);
        setAddresses(data.addresses);
        toast.success('Address updated');
      } else {
        // Add
        const { data } = await addAddress(addressForm);
        setAddresses(data.addresses);
        toast.success('Address added');
      }
      setAddressModalOpen(false);
    } catch (err) {
      toast.error('Failed to save address');
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      const { data } = await deleteAddress(id);
      setAddresses(data.addresses);
      toast.success('Address deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      const { data } = await setDefaultAddress(id);
      setAddresses(data.addresses);
      toast.success('Default address updated');
    } catch {
      toast.error('Failed to set default address');
    }
  };

  if (!profile || !draftProfile) return <div className="p-5">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-green-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userName={profile.userName}
        logout={logout}
      />
      <div className="flex-1 flex flex-col">
        <MobileNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-5">
          {activeTab === 'profile' && (
            <ProfileView
              profile={profile}
              avatarPreview={avatarPreview}
              onAvatarChange={handleAvatarChange}
              onManageAddresses={openAddressesTab}
            />
          )}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'settings' && (
            <SettingView
              draftProfile={draftProfile}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          {activeTab === 'addresses' && (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-2">
                <FaMapMarkerAlt /> Addresses
              </h1>

              <button
                onClick={openAddAddress}
                className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                + Add New Address
              </button>

              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 border rounded-lg shadow-sm flex justify-between items-center ${
                      addr.isDefault ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-lg">
                        {addr.label}{' '}
                        {addr.isDefault && (
                          <span className="text-green-600">(Default)</span>
                        )}
                      </div>
                      <div>
                        {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                      </div>
                      <div>{addr.country}</div>
                      <div>Contact: {profile.phoneNumber}</div>
                    </div>
                    <div className="flex gap-2">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-sm text-green-600 hover:underline"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => openEditAddress(addr)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address Modal */}
              {addressModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                    <h2 className="text-xl font-semibold mb-4">
                      {editingAddressId ? 'Edit Address' : 'Add New Address'}
                    </h2>

                    <div className="space-y-3">
                      <input
                        name="label"
                        placeholder="Label (e.g., Home, Work)"
                        value={addressForm.label}
                        onChange={handleAddressInputChange}
                        className="w-full border p-2 rounded"
                      />
                      <input
                        name="street"
                        placeholder="Street"
                        value={addressForm.street}
                        onChange={handleAddressInputChange}
                        className="w-full border p-2 rounded"
                      />
                      <input
                        name="city"
                        placeholder="City"
                        value={addressForm.city}
                        onChange={handleAddressInputChange}
                        className="w-full border p-2 rounded"
                      />
                      <input
                        name="state"
                        placeholder="State"
                        value={addressForm.state}
                        onChange={handleAddressInputChange}
                        className="w-full border p-2 rounded"
                      />
                      <input
                        name="postalCode"
                        placeholder="Postal Code"
                        value={addressForm.postalCode}
                        onChange={handleAddressInputChange}
                        className="w-full border p-2 rounded"
                      />
                      <input
                        name="country"
                        placeholder="Country"
                        value={addressForm.country}
                        onChange={handleAddressInputChange}
                        className="w-full border p-2 rounded"
                      />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                      <button
                        onClick={() => setAddressModalOpen(false)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveAddress}
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
