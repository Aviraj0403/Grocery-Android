import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../../utils/Axios';
import { toast } from 'react-hot-toast';

const AdminProducts = () => {
  // States for storing products and pagination metadata
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  // Search and sorting states
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20; // Default limit per page
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(-1);

  // Fetch admin products whenever page, search, or sorting changes
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, sortField, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/products', {
        params: {
          page,
          limit,
          search: searchTerm,
          sortField,
          sortOrder,
        },
      });

      if (response.data && response.data.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products for admin:", error);
      toast.error("Error fetching products");
    }
    setLoading(false);
  };

  // Handle pagination page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Delete product function
  const deleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axiosInstance.delete(`/deleteProduct/${productId}`);
        if (response.data && response.data.success) {
          toast.success("Product deleted successfully");
          fetchProducts();
        } else {
          toast.error(response.data.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product");
      }
    }
  };

  // Mobile View: Render products as cards
  const renderMobileView = () => {
    return (
      <div>
        {products.length === 0 ? (
          <p className="text-center py-4 text-gray-600">No products available.</p>
        ) : (
          products.map((item) => (
            <div key={item._id} className="p-4 mb-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <img
                    src={item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/64"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <NavLink to={`/admin/editProduct/${item._id}`} className="text-blue-600 hover:text-blue-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </NavLink>
                  <NavLink to={`/admin/product-details/${item._id}`} className="text-gray-600 hover:text-gray-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </NavLink>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // Desktop View: Render products in a table
  const renderDesktopView = () => {
    return (
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-Category</th>
            <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-600">
                No products available.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/64"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.category?.name || "N/A"}</td>
                <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-900">{product.subCategory?.name || "N/A"}</td>
                <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-900">{product.vendor?.name || "N/A"}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.brand}</td>
                <td className="px-4 py-4 text-sm text-gray-900">₹{product.variants && product.variants.length > 0 ? product.variants[0].price : "N/A"}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.variants && product.variants.length > 0 ? product.variants[0].stockQty : "N/A"}</td>
                <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-900">{new Date(product.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-sm font-medium flex space-x-3 justify-center">
                  <NavLink to={`/admin/editProduct/${product._id}`} className="text-blue-600 hover:text-blue-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </NavLink>
                  <NavLink to={`/admin/product-details/${product._id}`} className="text-gray-600 hover:text-gray-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </NavLink>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-6 flex-wrap">
        <h4 className="text-2xl font-semibold text-gray-800">Products List</h4>
        <NavLink
          to="/admin/addProduct"
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors mt-4 sm:mt-0"
        >
          <svg
            className="mr-2"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Add Product
        </NavLink>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <>
          {/* Mobile View */}
          <div className="block md:hidden">
            {products.length === 0 ? (
              <p className="text-center py-4 text-gray-600">No products available.</p>
            ) : (
              products.map((item) => (
                <div key={item._id} className="p-4 mb-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <img
                        src={item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/64"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex space-x-3 mt-2">
                        <NavLink to={`/admin/edit-product/${item._id}`} className="text-blue-600 hover:text-blue-800">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                            <path d="m15 5 4 4"></path>
                          </svg>
                        </NavLink>
                        <NavLink to={`/admin/product-details/${item._id}`} className="text-gray-600 hover:text-gray-800">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </NavLink>
                        <button onClick={() => deleteProduct(item._id)} className="text-red-600 hover:text-red-800">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-Category</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4 text-gray-600">
                      No products available.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/64"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-full mx-auto"
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{product.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{product.category?.name || "N/A"}</td>
                      <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-900">{product.subCategory?.name || "N/A"}</td>
                      <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-900">{product.vendor?.name || "N/A"}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{product.brand}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        ₹{product.variants && product.variants.length > 0 ? product.variants[0].price : "N/A"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {product.variants && product.variants.length > 0 ? product.variants[0].stockQty : "N/A"}
                      </td>
                      <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-900">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium flex space-x-3 justify-center">
                        <NavLink to={`/admin/edit-product/${product._id}`} className="text-blue-600 hover:text-blue-800">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                            <path d="m15 5 4 4"></path>
                          </svg>
                        </NavLink>
                        <NavLink to={`/admin/product-details/${product._id}`} className="text-gray-600 hover:text-gray-800">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </NavLink>
                        <button onClick={() => deleteProduct(product._id)} className="text-red-600 hover:text-red-800">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      
      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          disabled={page >= pagination.totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;
