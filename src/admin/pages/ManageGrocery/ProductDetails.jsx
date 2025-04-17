import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axiosInstance from '../../../utils/Axios';
import toast from 'react-hot-toast';

const TABS = ['Description', 'Variants', 'Reviews'];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/getProduct/${id}`);
        if (data.success) {
          setProduct(data.product);
          setMainImage(data.product.images?.[0] || '');
        } else {
          toast.error(data.message || 'Failed to load product');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4 text-center text-gray-600 w-full">Loading...</div>;
  if (!product) return <div className="p-4 text-center text-red-600 w-full">Product not found.</div>;

  const {
    name,
    description,
    category,
    subCategory,
    variants = [],
    discount,
    tags = [],
    images = [],
  } = product;

  const activeVariant =
    variants.find(v => v.unit === product.activeVariant) || variants[0] || {};
  const price = activeVariant.price ?? 0;
  const stockQty = activeVariant.stockQty ?? 0;
  const unit = activeVariant.unit || '—';

  return (
    <div className="w-full overflow-x-hidden px-2 py-4 space-y-6">
      {/* Image + Info */}
      <div className="flex flex-wrap gap-4 w-full">
        {/* Product Image (50% width even on mobile) */}
        <div className="w-1/2 min-w-[150px] max-w-[50%] overflow-hidden">
          <div className="rounded-md shadow-md bg-gray-100 overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={name}
                className="w-full h-40 sm:h-72 object-cover rounded-md transition-all duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-40 sm:h-72 text-gray-500 text-xs">
                No Image
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(src)}
                  className={`w-12 h-12 flex-shrink-0 rounded border-2 ${
                    mainImage === src ? 'border-blue-600' : 'border-gray-300'
                  }`}
                >
                  <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-[50%] space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <NavLink
              to={`/admin/edit-product/${id}`}
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
            >
              Edit Product
            </NavLink>
            <NavLink
              to="/admin/adminProducts"
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded text-sm hidden sm:block"
            >
              Back to List
            </NavLink>
          </div>

          <div className="text-left">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 break-words">{name}</h1>
            <p className="text-xs text-gray-500 mt-1">
              {category?.name} &bull; {subCategory?.name || '—'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <InfoCard title="Price" value={`₹${price}`} />
            <InfoCard
              title="Stock"
              value={stockQty > 0 ? stockQty : 'Out of stock'}
              color={stockQty > 0 ? 'text-green-600' : 'text-red-600'}
            />
            <InfoCard title="Variant" value={unit} />
            <InfoCard title="Discount" value={discount > 0 ? `${discount}%` : '—'} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-10 overflow-x-auto scrollbar-hide w-full">
        <nav className="flex w-max min-w-full gap-4 px-2 py-1 text-sm">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-1 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-2 text-sm text-gray-700 w-full max-w-full">
        {activeTab === 'Description' && (
          <div className="leading-relaxed break-words">
            {description || 'No description available.'}
          </div>
        )}
        {activeTab === 'Variants' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {variants.length > 0 ? (
              variants.map((v, i) => (
                <div key={i} className="p-3 rounded bg-white shadow-sm border w-full">
                  <p className="text-xs text-gray-500">{v.unit}</p>
                  <p className="text-sm font-medium">₹{v.price}</p>
                  <p className={v.stockQty > 0 ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
                    {v.stockQty > 0 ? `${v.stockQty} in stock` : 'Out of stock'}
                  </p>
                </div>
              ))
            ) : (
              <p>No variants available.</p>
            )}
          </div>
        )}
        {activeTab === 'Reviews' && <p className="text-sm">Reviews coming soon…</p>}
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, color = 'text-gray-900' }) => (
  <div className="p-2 bg-white border rounded shadow-sm text-sm">
    <p className="text-xs text-gray-500">{title}</p>
    <p className={`text-sm font-semibold mt-1 break-words ${color}`}>{value}</p>
  </div>
);

export default ProductDetails;
