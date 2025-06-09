import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/Axios';
import toast from 'react-hot-toast';

const initialFormState = {
  name: '',
  code: '',
  discountPercentage: '',
  maxDiscountAmount: '',
  startDate: '',
  endDate: '',
  status: 'Active',
  applyAutomatically: false,
  maxUsageCount: 40,
};

const OfferForm = ({ offerId, onClose }) => {
  const isEdit = Boolean(offerId);
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    axiosInstance
      .get(`/offers/${offerId}`)
      .then(({ data }) => {
        const offer = data.data;
        setForm({
          name: offer.name || '',
          code: offer.code || '',
          discountPercentage: offer.discountPercentage ?? '',
          maxDiscountAmount: offer.maxDiscountAmount ?? '',
          startDate: offer.startDate ? offer.startDate.slice(0, 10) : '',
          endDate: offer.endDate ? offer.endDate.slice(0, 10) : '',
          status: offer.status || 'Active',
          applyAutomatically: offer.applyAutomatically || false,
          maxUsageCount: offer.maxUsageCount || 40,
        });
      })
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load offer'))
      .finally(() => setLoading(false));
  }, [offerId, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || form.discountPercentage === '' || !form.startDate || !form.endDate) {
      toast.error('Name, discount percentage, start date, and end date are required.');
      setLoading(false);
      return;
    }
    if (new Date(form.startDate) >= new Date(form.endDate)) {
      toast.error('Start date must be before end date.');
      setLoading(false);
      return;
    }

    try {
      if (isEdit) {
        await axiosInstance.put(`/offers/${offerId}`, {
          ...form,
          discountPercentage: Number(form.discountPercentage),
          maxDiscountAmount: form.maxDiscountAmount ? Number(form.maxDiscountAmount) : null,
          maxUsageCount: Number(form.maxUsageCount),
        });
        toast.success('Offer updated successfully.');
      } else {
        await axiosInstance.post('/offers', {
          ...form,
          discountPercentage: Number(form.discountPercentage),
          maxDiscountAmount: form.maxDiscountAmount ? Number(form.maxDiscountAmount) : null,
          maxUsageCount: Number(form.maxUsageCount),
        });
        toast.success('Offer created successfully.');
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save offer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">{isEdit ? 'Edit Offer' : 'Create Offer'}</h3>

      <div>
        <label className="block mb-1 font-medium">Name *</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Offer name"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Promo Code (optional)</label>
        <input
          name="code"
          type="text"
          value={form.code}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 uppercase"
          placeholder="Promo code"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Discount Percentage (%) *</label>
          <input
            name="discountPercentage"
            type="number"
            min="0"
            max="100"
            value={form.discountPercentage}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Max Discount Amount</label>
          <input
            name="maxDiscountAmount"
            type="number"
            min="0"
            value={form.maxDiscountAmount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Max discount (optional)"
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Start Date *</label>
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date *</label>
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Status *</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
          disabled={loading}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="applyAutomatically"
          checked={form.applyAutomatically}
          onChange={handleChange}
          id="applyAutomatically"
          disabled={loading}
        />
        <label htmlFor="applyAutomatically" className="select-none">
          Apply Automatically
        </label>
      </div>

      <div>
        <label className="block mb-1 font-medium">Max Usage Count</label>
        <input
          name="maxUsageCount"
          type="number"
          min="1"
          value={form.maxUsageCount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={loading}
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
