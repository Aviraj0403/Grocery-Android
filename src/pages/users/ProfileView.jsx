import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileView = ({ profile, avatarPreview, onAvatarChange, onSave,onManageAddresses }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    userName: profile.userName,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
  });

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onAvatarChange(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    onSave(editedProfile);
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedProfile({
        userName: profile.userName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-extrabold text-green-800 mb-10 mt-16 flex items-center justify-between">
        My Profile
        <button
          onClick={toggleEditMode}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-green-700 font-semibold border-2 border-green-700 hover:bg-green-700 hover:text-white transition"
          aria-label={editMode ? 'Cancel editing' : 'Edit profile info'}
        >
          <FaEdit size={20} />
          {editMode ? 'Cancel' : 'Edit Info'}
        </button>
      </h1>

      <div className="bg-white border border-green-300 rounded-3xl shadow-lg p-8 space-y-8">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative group cursor-pointer rounded-full overflow-hidden w-36 h-36 shadow-lg border-4 border-green-300 hover:border-green-600 transition">
            <img
              src={avatarPreview || '/default-avatar.png'}
              alt="User avatar"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 bg-green-700 bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition cursor-pointer select-none"
              title="Change avatar"
            >
              Change Avatar
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Editable Fields */}
          <div className="grid sm:grid-cols-2 gap-6 flex-grow text-lg">
            {['userName', 'email', 'phoneNumber'].map((field) => (
              <div key={field} className="flex flex-col">
                <label
                  htmlFor={field}
                  className="text-green-600 font-semibold mb-1 select-none"
                >
                  {field === 'userName'
                    ? 'Full Name'
                    : field === 'email'
                    ? 'Email Address'
                    : 'Phone Number'}
                </label>
                {editMode ? (
                  <input
                    id={field}
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={editedProfile[field]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field === 'userName' ? 'full name' : field}`}
                    className="border border-green-400 rounded-md p-3 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    autoComplete="off"
                  />
                ) : (
                  <p className="text-green-900 font-medium select-text">{profile[field] || '—'}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="flex justify-end">
            <button
              onClick={handleSaveClick}
              className="px-8 py-3 bg-green-700 text-white rounded-xl font-semibold shadow-md hover:bg-green-800 transition"
              aria-label="Save profile changes"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Primary Address */}
        {profile.addresses?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3 select-none">
              <FaMapMarkerAlt size={26} />
              Primary Address
            </h2>
            <div className="bg-green-100 border border-green-300 p-6 rounded-2xl text-green-900 text-lg shadow-inner">
              {(() => {
                const defaultAddress =
                  profile.addresses.find((a) => a.isDefault) || profile.addresses[0];
                return (
                  <>
                    <p className="font-semibold text-xl">{defaultAddress.label}</p>
                    <p>
                      {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} -{' '}
                      {defaultAddress.postalCode}
                    </p>
                    <p>{defaultAddress.country}</p>
                  </>
                );
              })()}
            </div>
            <button
              onClick={onManageAddresses}
              className="mt-4 inline-block text-green-700 font-semibold hover:underline text-lg"
              aria-label="Manage addresses"
            >
              Manage Addresses →
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
