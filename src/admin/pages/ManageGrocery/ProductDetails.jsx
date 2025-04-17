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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading...</div>;
  if (!product) return <div className="p-6 text-center text-red-600">Product not found.</div>;

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
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Image + Info Block */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Product Image */}
        <div className="lg:w-1/2 w-full">
          <div className="w-full aspect-[4/3] rounded-xl shadow-md overflow-hidden bg-gray-100">
            {mainImage ? (
              <img src={mainImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(src)}
                  className={`w-16 h-16 rounded-md border-2 overflow-hidden flex-shrink-0 ${
                    mainImage === src
                      ? 'border-blue-600'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 space-y-6">
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <NavLink
              to={`/admin/edit-product/${id}`}
              className="w-full px-4 py-3 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Edit Product
            </NavLink>
            <NavLink
              to="/admin/adminProducts"
              className="w-full px-4 py-3 text-center bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Back to List
            </NavLink>
          </div>

          {/* Product Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 text-center lg:text-left">{name}</h1>
            <p className="text-sm text-gray-500 text-center lg:text-left mt-1">
              {category?.name} &bull; {subCategory?.name || '—'}
            </p>
            <div className="mt-2 flex flex-wrap justify-center lg:justify-start gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
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
      <div className="border-b border-gray-200 sticky top-0 z-10 bg-white">
        <nav className="flex overflow-x-auto scrollbar-hide gap-6 text-sm sm:text-base px-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {activeTab === 'Description' && (
          <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {description || 'No description available.'}
          </div>
        )}

        {activeTab === 'Variants' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {variants.length > 0 ? (
              variants.map((v, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <p className="text-sm text-gray-500">{v.unit}</p>
                  <p className="text-lg font-medium text-gray-900 mt-1">₹{v.price}</p>
                  <p
                    className={`text-sm mt-1 ${
                      v.stockQty > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {v.stockQty > 0 ? `${v.stockQty} in stock` : 'Out of stock'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 col-span-full">No variants available.</p>
            )}
          </div>
        )}

        {activeTab === 'Reviews' && (
          <p className="text-gray-600 text-sm">Reviews coming soon…</p>
        )}
      </div>
    </div>
  );
};

// InfoCard Component
const InfoCard = ({ title, value, color = 'text-gray-900' }) => (
  <div className="p-3 sm:p-4 bg-white rounded-md shadow-sm">
    <p className="text-xs sm:text-sm text-gray-500">{title}</p>
    <p className={`text-base sm:text-lg font-semibold mt-1 ${color}`}>{value}</p>
  </div>
);

export default ProductDetails;
