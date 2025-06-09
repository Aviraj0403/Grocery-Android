import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';
import { getActiveOffers, applyDiscount } from '../../services/offersApi';

const CartSummary = ({ totalAmount, totalQuantity, onClearCart }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [discount, setDiscount] = useState(0);
  const [activeOffers, setActiveOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [validating, setValidating] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoadingOffers(true);
      try {
        const response = await getActiveOffers();
        setActiveOffers(response.data.data);
      } catch (error) {
        console.error('Error fetching active offers:', error);
        setActiveOffers([]);
      } finally {
        setLoadingOffers(false);
      }
    };

    fetchOffers();
  }, []);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value.toUpperCase());
    setPromoError('');
    setPromoSuccess('');
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code.');
      setPromoSuccess('');
      setDiscount(0);
      return;
    }
    setValidating(true);
    try {
      const response = await applyDiscount({ code: promoCode, totalAmount });
      const data = response.data.data;

      if (data && data.discountAmount > 0) {
        setDiscount(data.discountAmount);
        setPromoError('');
        setPromoSuccess(`Promo applied! You saved ₹${data.discountAmount.toFixed(2)}`);
        setSelectedOfferId(null); // clear selected offer
      } else {
        setDiscount(0);
        setPromoError('Invalid or expired promo code.');
        setPromoSuccess('');
      }
    } catch (err) {
      setDiscount(0);
      setPromoError('Failed to apply promo code. Please try again.');
      setPromoSuccess('');
    } finally {
      setValidating(false);
    }
  };

  const clearPromoCode = () => {
    setPromoCode('');
    setPromoError('');
    setPromoSuccess('');
    setDiscount(0);
  };

  const handleOfferSelect = (offer) => {
    setPromoCode('');
    setPromoError('');
    setPromoSuccess('');
    setSelectedOfferId(offer._id || offer.id || null);

    const discountPercent = offer.discountPercentage || 0;
    const calculatedDiscount = (discountPercent / 100) * totalAmount;
    setDiscount(calculatedDiscount);
  };

  const clearOfferSelection = () => {
    setSelectedOfferId(null);
    setDiscount(0);
  };

  const finalAmount = (totalAmount - discount).toFixed(2);

  return (
    <aside className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 sticky top-6 self-start">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Order Summary</h2>

      <div className="flex justify-between mb-3 text-gray-700 text-sm sm:text-base">
        <span>Total Items</span>
        <span className="font-semibold">{totalQuantity}</span>
      </div>

      <div className="flex justify-between text-xl sm:text-2xl font-extrabold text-green-700 border-t pt-4 mt-4">
        <span>Total Amount</span>
        <span>₹{finalAmount}</span>
      </div>

      {/* Promo Code Section */}
      <section className="mt-6">
        <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
          Promo Code
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="promo-code"
            type="text"
            value={promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Enter promo code"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={validating || selectedOfferId !== null}
          />
          <button
            onClick={handleApplyPromo}
            disabled={validating || selectedOfferId !== null}
            className={`px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition ${
              validating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {validating ? 'Applying...' : 'Apply'}
          </button>
          {discount > 0 && promoSuccess && (
            <button
              onClick={clearPromoCode}
              type="button"
              className="text-red-500 hover:text-red-700 transition"
              aria-label="Remove applied promo"
              title="Remove Promo"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          )}
        </div>

        {promoError && <p className="mt-2 text-red-600 text-sm font-medium">{promoError}</p>}
        {promoSuccess && <p className="mt-2 text-green-600 text-sm font-medium">{promoSuccess}</p>}
        {selectedOfferId !== null && (
          <p className="mt-2 text-gray-500 text-sm italic">
            Promo code disabled while an active offer is selected.
          </p>
        )}
      </section>

      {/* Active Offers Section */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Active Offers</h3>

        {loadingOffers ? (
          <p className="text-gray-500 text-sm">Loading offers...</p>
        ) : activeOffers.length === 0 ? (
          <p className="text-gray-500 text-sm">No active offers available.</p>
        ) : (
          <ul className="space-y-3 max-h-48 overflow-y-auto text-gray-700 text-sm sm:text-base">
            {activeOffers.map((offer) => {
              const offerId = offer._id || offer.id;
              const isSelected = selectedOfferId === offerId;

              return (
                <li
                  key={offerId}
                  className={`flex items-start sm:items-center gap-3 cursor-pointer rounded p-3 border ${
                    isSelected
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleOfferSelect(offer)}
                >
                  <input
                    type="radio"
                    name="activeOffer"
                    checked={isSelected}
                    readOnly
                    disabled={discount > 0}
                  />
                  <div className="flex flex-col flex-grow">
                    <span className="font-semibold">{offer.name}</span>
                    {offer.description && (
                      <span className="text-gray-600 text-sm">{offer.description}</span>
                    )}
                    {offer.discountPercentage && (
                      <span className="text-green-600 font-semibold text-sm">
                        {offer.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearOfferSelection();
                      }}
                      type="button"
                      className="text-red-500 hover:text-red-700 transition"
                      aria-label="Remove selected offer"
                      title="Remove Offer"
                    >
                      <HiXMark className="w-5 h-5" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {promoCode && selectedOfferId !== null && (
          <p className="mt-2 text-gray-500 text-sm italic">
            Active offers disabled while a promo code is entered.
          </p>
        )}
      </section>

      {/* Checkout and Clear Cart */}
      <Link
        to="/checkout"
        state={{ discount, finalAmount }}
        className="block mt-8 bg-green-600 hover:bg-green-700 text-white font-bold text-center py-3 rounded shadow-lg transition"
      >
        Proceed to Checkout
      </Link>

      {onClearCart && (
        <button
          onClick={onClearCart}
          className="mt-3 w-full border border-red-500 text-red-600 font-semibold py-2 rounded hover:bg-red-50 transition"
          type="button"
        >
          Clear Cart
        </button>
      )}
    </aside>
  );
};

export default CartSummary;
