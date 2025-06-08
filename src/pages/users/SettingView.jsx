import React from 'react';

const SettingsView = ({ draftProfile, onInputChange, onSave, onCancel }) => (
  <div>
    <h1 className="text-2xl font-bold mb-4 text-green-600">Settings</h1>
    <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-2xl shadow-lg space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-green-700">Name</label>
        <input
          type="text"
          name="userName"
          value={draftProfile.userName}
          onChange={onInputChange}
          className="border-2 border-green-300 rounded-lg p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-green-700">Email</label>
        <input
          type="email"
          name="email"
          value={draftProfile.email}
          onChange={onInputChange}
          className="border-2 border-green-300 rounded-lg p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-green-700">Phone</label>
        <input
          type="text"
          name="phoneNumber"
          value={draftProfile.phoneNumber}
          onChange={onInputChange}
          className="border-2 border-green-300 rounded-lg p-2"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={onSave}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default SettingsView;
