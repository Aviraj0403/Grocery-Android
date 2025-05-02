import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/getProduct/${id}`);
        setProduct(data.product);
        console.log(data)

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
        const { data } = await axios.get(`/api/products?category=${categoryId}`);
        const filtered = data.products.filter((p) => p._id !== excludeId);
        setRelatedProducts(filtered.slice(0, 8)); // Max 8 related
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found.</div>;
  }

  const activeVariant = product.variants.find(v => v.unit === product.activeVariant) || product.variants[0];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

        {/* Carousel Images */}
        <div className="bg-white rounded shadow p-4">
          <Slider {...carouselSettings}>
            {(product.images.length ? product.images : ["/images/placeholder.png"]).map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Product Image ${index + 1}`}
                  className="w-full object-contain h-80 rounded"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-4">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-sm text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-green-700 text-2xl font-bold">
              ₹{activeVariant.price}
            </span>
            {product.discount > 0 && (
              <span className="line-through text-gray-400 text-sm">
                ₹{(activeVariant.price / (1 - product.discount / 100)).toFixed(0)}
              </span>
            )}
          </div>

          {"stockQty" in activeVariant && (
            <p className={`text-sm mb-6 ${activeVariant.stockQty > 0 ? "text-green-600" : "text-red-500"}`}>
              {activeVariant.stockQty > 0 ? "In Stock" : "Out of Stock"}
            </p>
          )}

          {product.meta?.ingredients && (
            <p className="text-xs text-gray-500">
              <strong>Ingredients:</strong> {product.meta.ingredients}
            </p>
          )}

          <button className="flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
            <FaShoppingCart /> Add to Cart
          </button>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {relatedProducts.map((prod) => (
              <Link
                key={prod._id}
                to={`/product/${prod._id}`}
                className="min-w-[150px] bg-white rounded shadow p-3 hover:shadow-lg transition"
              >
                <img
                  src={prod.images?.[0] || "/images/placeholder.png"}
                  alt={prod.name}
                  className="h-24 w-full object-contain mb-2"
                />
                <h3 className="text-sm font-semibold text-gray-800 truncate">{prod.name}</h3>
                <p className="text-xs text-gray-600">{prod.brand}</p>
                <p className="text-green-700 font-bold text-sm mt-1">
                  ₹{prod.variants[0]?.price || "N/A"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;
