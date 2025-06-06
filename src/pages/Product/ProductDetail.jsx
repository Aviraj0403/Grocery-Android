import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaInfoCircle,
  FaClock,
  FaBoxOpen,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../features/cartSlice"; // adjust path as needed

import axios from "../../utils/Axios";

const tabs = ["Description", "Variants", "Reviews"];


const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Variants");
  const [quantity, setQuantity] = useState(1);
  const [activeVariantUnit, setActiveVariantUnit] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/getProduct/${id}`);
        setProduct(data.product);
        setActiveVariantUnit(data.product.activeVariant || data.product.variants[0]?.unit);
        if (data.product?.category?._id) {
          fetchRelatedProducts(data.product.category._id, data.product._id);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (categoryId, excludeId) => {
      try {
        const { data } = await axios.get(`/products?category=${categoryId}`);
        const filtered = data.products.filter((p) => p._id !== excludeId);
        setRelatedProducts(filtered.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Product not found.
      </div>
    );

  const activeVariant =
    product.variants.find((v) => v.unit === activeVariantUnit) || product.variants[0];

  // Rating stars renderer
  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => {
      const index = i + 1;
      if (rating >= index)
        return <FaStar key={i} className="text-yellow-400" />;
      if (rating >= index - 0.5)
        return <FaStarHalfAlt key={i} className="text-yellow-400" />;
      return <FaRegStar key={i} className="text-yellow-400" />;
    });

  // Multilingual name fallback
  const multilingualName = product.multilingualName?.en?.trim() || product.name;

  // Images fallback
  const images = product.images && product.images.length > 0 ? product.images : ["/images/placeholder.png"];

  // Handle quantity change
  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    else if (val > activeVariant.stockQty) val = activeVariant.stockQty;
    setQuantity(val);
  };

  // Calculate original price for discount display
  const originalPrice =
    product.discount > 0
      ? (activeVariant.price / (1 - product.discount / 100)).toFixed(0)
      : null;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* --- Top Section --- */}
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-md p-6 mb-8">
        {/* Image Section */}
        <div className="relative">
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white font-bold px-3 py-1 rounded shadow z-10 text-sm">
              {product.discount}% OFF
            </div>
          )}
          <img
            src={images[activeImage]}
            alt={`Product Image ${activeImage + 1}`}
            className="w-full h-[400px] object-contain rounded-md"
          />
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                alt={`Thumbnail ${i + 1}`}
                className={`w-20 h-20 object-contain border rounded-md cursor-pointer flex-shrink-0 ${i === activeImage ? "border-green-600" : "border-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">{product.category?.name}</p>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{multilingualName}</h1>
            <p className="text-sm text-gray-600 capitalize mb-1">
              Brand: <span className="font-semibold">{product.brand}</span>
            </p>

            {/* Rating and reviews */}
            <div className="flex items-center gap-2 mt-1 text-sm">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Short Description */}
            <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>

            {/* Meta Info: Ingredients, Origin, Expiry, Packaging */}
            <div className="mt-6 space-y-1 text-sm text-gray-600">
              {product.meta?.ingredients && (
                <p>
                  <FaInfoCircle className="inline mr-1 text-green-600" />
                  <strong>Ingredients:</strong> {product.meta.ingredients}
                </p>
              )}
              {product.meta?.origin && (
                <p>
                  <FaBoxOpen className="inline mr-1 text-green-600" />
                  <strong>Origin:</strong> {product.meta.origin}
                </p>
              )}
              {product.meta?.expiryDate && (
                <p>
                  <FaClock className="inline mr-1 text-green-600" />
                  <strong>Expiry Date:</strong>{" "}
                  {new Date(product.meta.expiryDate).toLocaleDateString()}
                </p>
              )}
              {activeVariant?.packaging && (
                <p>
                  <FaBoxOpen className="inline mr-1 text-green-600" />
                  <strong>Packaging:</strong> {activeVariant.packaging}
                </p>
              )}
              {product.meta?.usage && (
                <p>
                  <strong>How to Use:</strong> {product.meta.usage}
                </p>
              )}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="mt-8">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-green-700">
                ₹{activeVariant.price}
              </span>
              {originalPrice && (
                <span className="text-gray-400 line-through text-lg">{`₹${originalPrice}`}</span>
              )}
            </div>

            <p
              className={`mt-2 font-semibold ${activeVariant.stockQty > 0 ? "text-green-600" : "text-red-600"
                }`}
            >
              {activeVariant.stockQty > 0
                ? `In Stock (${activeVariant.stockQty} available)`
                : "Out of Stock"}
            </p>

            {/* Quantity Selector & Add to Cart Responsive */}
            {activeVariant.stockQty > 0 && (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-6 max-w-xs">
                <label htmlFor="quantity" className="font-semibold mb-2 sm:mb-0">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={activeVariant.stockQty}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 border rounded px-2 py-1 text-center focus:outline-green-500"
                />
              </div>
            )}

            <button
              className={`flex items-center justify-center gap-2 mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition ${activeVariant.stockQty === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={activeVariant.stockQty === 0}
              onClick={() => {
                const existingItem = cartItems.find(
                  (item) =>
                    item.id === product._id &&
                    item.selectedVariant.unit === activeVariant.unit
                );

                const newQuantity = existingItem
                  ? existingItem.quantity + quantity
                  : quantity;

                if (newQuantity > activeVariant.stockQty) {
                  toast.error("Cannot add more than available stock.");
                  return;
                }

                const cartItem = {
                  id: product._id,
                  name: product.name,
                  image: images[0],
                  selectedVariant: activeVariant,
                  quantity,
                  brand: product.brand,
                };

                dispatch(addItem(cartItem));

                toast.success(
                  existingItem
                    ? `Updated ${product.name} quantity to ${newQuantity}`
                    : `${quantity} ${product.name} added to cart`
                );
              }}
              

            >
              <FaShoppingCart /> Add to Cart
            </button>

          </div>
        </div>
      </div>

      {/* --- Tabs Section (without Suggestions) --- */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {/* Tabs Header */}
        <nav className="flex border-b border-gray-200 mb-6 overflow-x-auto" aria-label="Product detail tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-6 whitespace-nowrap font-semibold border-b-4 transition ${activeTab === tab
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-600 hover:text-green-600"
                }`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`tab-panel-${tab}`}
              id={`tab-${tab}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tabs Content */}
        <section
          id={`tab-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="text-gray-700 space-y-5 leading-relaxed"
        >
          {activeTab === "Description" && (
            <>
              <p>{product.description}</p>
              {product.meta?.ingredients && (
                <p>
                  <strong>Ingredients:</strong> {product.meta.ingredients}
                </p>
              )}
              {product.meta?.origin && (
                <p>
                  <strong>Origin:</strong> {product.meta.origin}
                </p>
              )}
              {product.meta?.expiryDate && (
                <p>
                  <strong>Expiry Date:</strong>{" "}
                  {new Date(product.meta.expiryDate).toLocaleDateString()}
                </p>
              )}
              {product.meta?.usage && (
                <p>
                  <strong>How to Use:</strong> {product.meta.usage}
                </p>
              )}
              {product.meta?.nutritionalInfo && (
                <p>
                  <strong>Nutritional Information:</strong> {product.meta.nutritionalInfo}
                </p>
              )}
            </>
          )}

          {activeTab === "Variants" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Unit</th>
                    <th className="border border-gray-300 px-3 py-2">Price (₹)</th>
                    <th className="border border-gray-300 px-3 py-2">Stock Qty</th>
                    <th className="border border-gray-300 px-3 py-2">Packaging</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v) => (
                    <tr
                      key={v.unit}
                      onClick={() => setActiveVariantUnit(v.unit)}
                      className={`cursor-pointer hover:bg-green-50 ${v.unit === activeVariantUnit ? "bg-green-200 font-semibold" : ""
                        }`}
                      title="Click to select this variant"
                    >
                      <td className="border border-gray-300 px-3 py-2">{v.unit || "N/A"}</td>
                      <td className="border border-gray-300 px-3 py-2">₹{v.price}</td>
                      <td className="border border-gray-300 px-3 py-2">{v.stockQty}</td>
                      <td className="border border-gray-300 px-3 py-2">{v.packaging || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-6">
              {product.reviewCount > 0 ? (
                <>
                  <div className="flex items-center gap-3 text-yellow-400">
                    {renderStars(product.rating)}
                    <span className="text-gray-600 text-lg">({product.reviewCount} reviews)</span>
                  </div>
                  {/* Placeholder for actual review content */}
                  <p className="italic text-gray-500">Reviews content not implemented.</p>
                </>
              ) : (
                <p>No reviews yet for this product.</p>
              )}
            </div>
          )}
        </section>
      </div>

      {/* --- Suggestions (Always visible) --- */}
      <section aria-label="Related products">
        <h2 className="text-2xl font-extrabold mb-4">You may also like</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <Link
                key={prod._id}
                to={`/product/${prod._id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center focus:outline-green-500 focus:ring-2 focus:ring-green-600"
              >
                <img
                  src={prod.images?.[0] || "/images/placeholder.png"}
                  alt={prod.name}
                  className="h-28 w-full object-contain mb-3"
                />
                <h3 className="text-sm font-semibold text-gray-800 truncate w-full text-center">
                  {prod.name}
                </h3>
                <p className="text-xs text-gray-500 capitalize">{prod.brand}</p>
                <p className="text-green-700 font-semibold text-sm mt-1">
                  ₹{prod.variants[0]?.price || "N/A"}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No suggestions available.</p>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;
