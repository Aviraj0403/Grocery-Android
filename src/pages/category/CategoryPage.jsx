import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 8;

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch category details and products
  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);

      // Fetch category info (for name, etc.)
      const catRes = await fetch(`/api/categories/${categoryId}`);
      const catData = await catRes.json();
      if (catData.success) {
        setCategoryName(catData.category.name);
      }

      // Fetch products by category
      const productsRes = await fetch(`/api/products?category=${categoryId}`);
      const productsData = await productsRes.json();
      if (productsData.success) {
        setProducts(productsData.products);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchCategoryAndProducts();
    setCurrentPage(1); // Reset page when category changes
  }, [categoryId]);

  const handleAddToCart = (product) => toast.success(`${product.name} added to cart!`);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <marquee className="text-sm text-white bg-pink-500 py-2 font-semibold tracking-wide">
        Distance can never break the bond we share. Happy Raksha Bandhan!
      </marquee>

      <div className="bg-pink-50 py-10 px-4 relative min-h-screen">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-8">{categoryName || "Category"}</h2>

        {loading && (
          <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-2xl shadow-md p-4 border border-pink-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center"
            >
              <button className="absolute top-2 right-2 text-pink-400 hover:text-pink-600 text-xl">❤</button>
              <img
                src={product.images && product.images[0] ? product.images[0] : "/images/default.jpg"}
                alt={product.name}
                className="w-full h-32 object-cover rounded-xl mb-3"
              />
              <h3 className="text-pink-600 font-semibold text-sm mb-1">{product.name}</h3>
              {/* Show price of active variant */}
              <p className="text-gray-600 text-sm mb-2">
                ₹{product.variants && product.variants.length > 0
                  ? product.variants.find(v => v.unit === product.activeVariant)?.price || product.variants[0].price
                  : "N/A"}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-pink-500 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              disabled={loading}
              className={`px-3 py-1 rounded-full border ${
                currentPage === idx + 1
                  ? "bg-pink-600 text-white"
                  : "bg-white text-pink-600 border-pink-600"
              } hover:bg-pink-500 hover:text-white transition-colors duration-300 disabled:opacity-50`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default CategoryPage;
