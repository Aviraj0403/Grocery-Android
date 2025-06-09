import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/Axios';
import toast from 'react-hot-toast';
import OfferForm from './OfferForm'; // Adjust the import path as needed

const OffersList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editOfferId, setEditOfferId] = useState(null);

  const fetchOffers = async () => {
    try {
      const { data } = await axiosInstance.get('/offers');
      setOffers(data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      await axiosInstance.delete(`/offers/${id}`);
      toast.success('Offer deleted successfully.');
      fetchOffers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete offer');
    }
  };

  // Open form for adding new offer
  const handleAddClick = () => {
    setEditOfferId(null);
    setShowForm(true);
  };

  // Open form for editing existing offer
  const handleEditClick = (id) => {
    setEditOfferId(id);
    setShowForm(true);
  };

  // Close the form and reload offers
  const handleFormClose = () => {
    setShowForm(false);
    setEditOfferId(null);
    fetchOffers();
  };

  if (loading) return <div className="p-4 text-center">Loading offers...</div>;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Offers</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Offer
        </button>
      </div>

      {offers.length === 0 ? (
        <div className="p-4 text-center">No offers found.</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Code</th>
              <th className="border border-gray-300 p-2 text-right">Discount %</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Valid From</th>
              <th className="border border-gray-300 p-2 text-left">Valid To</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{offer.name || '—'}</td>
                <td className="border border-gray-300 p-2 uppercase">{offer.code || '—'}</td>
                <td className="border border-gray-300 p-2 text-right">{offer.discountPercentage ?? '—'}</td>
                <td className="border border-gray-300 p-2">{offer.status}</td>
                <td className="border border-gray-300 p-2">{new Date(offer.startDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{new Date(offer.endDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(offer._id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="text-red-600 hover:underline"
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Inline Offer Form */}
      {showForm && (
        <div className="mt-8 border p-6 rounded shadow bg-white">
          <OfferForm offerId={editOfferId} onClose={handleFormClose} />
        </div>
      )}
    </div>
  );
};

export default OffersList;
