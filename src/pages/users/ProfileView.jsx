import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileView = ({ profile, avatarPreview, onAvatarChange, onSave, onManageAddresses }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
  firstName: profile.firstName || '',
  lastName: profile.lastName || '',
  phoneNumber: profile.phoneNumber || '',
});


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onAvatarChange(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

const handleSaveClick = async () => {
  try {
    await onSave(editedProfile);
    setEditMode(false); // Only exit edit mode after successful save
  } catch (err) {
    console.error('Failed to save profile:', err);
    // Optionally show a toast or visual error
  }
};


  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedProfile({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phoneNumber: profile.phoneNumber || '',
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
              className="absolute inset-0 bg-green-700 bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition cursor-pointer"
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
            {['firstName', 'lastName', 'phoneNumber'].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-green-600 font-semibold mb-1">
                  {field === 'firstName'
                    ? 'First Name'
                    : field === 'lastName'
                    ? 'Last Name'
                    : 'Phone Number'}
                </label>
                {editMode ? (
                  <input
                    name={field}
                    type="text"
                    value={editedProfile[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="border border-green-400 rounded-md p-3 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    autoComplete="off"
                  />
                ) : (
                  <p className="text-green-900 font-medium">{profile[field] || '—'}</p>
                )}
              </div>
            ))}

            {/* Read-only email */}
            <div className="flex flex-col">
              <label className="text-green-600 font-semibold mb-1">Email Address</label>
              <p className="text-green-900 font-medium select-text">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="flex justify-end">
            <button
              onClick={handleSaveClick}
              className="px-8 py-3 bg-green-700 text-white rounded-xl font-semibold shadow-md hover:bg-green-800 transition"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Address */}
        {profile.addresses?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
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
