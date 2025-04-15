// src/components/AddProductForm.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/Axios'; // Your Axios instance
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  // Define initial state for the product
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    multilingualName: { en: '', hi: '' },
    productCode: '',
    category: '',
    subCategory: '',
    brand: '',
    description: '',
    variants: [],
    activeVariant: '',
    tags: '',
    images: '', // You could use file inputs or URL strings
    discount: 0,
    rating: 0,
    reviewCount: 0,
    bestBeforeDays: '',
    isAvailable: true,
    isFeatured: false,
    meta: { origin: '', expiryDate: '', ingredients: '' }
  });

  // For handling a new variant before adding it to product.variants.
  const [variant, setVariant] = useState({
    unit: '',
    price: '',
    stockQty: '',
    packaging: ''
  });

  // Categories to populate the category dropdown
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:4001/api/getAllCategories');
        // Adjust based on your API response structure.
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  // General input change handler for product fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  // For multilingual inputs (for example, English and Hindi names)
  const handleMultilingualChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      multilingualName: { ...prev.multilingualName, [name]: value }
    }));
  };

  // For meta fields such as origin, expiryDate, and ingredients
  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      meta: { ...prev.meta, [name]: value }
    }));
  };

  // Handle changes for the variant input group
  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariant(prev => ({ ...prev, [name]: value }));
  };

  // Append current variant to product.variants, then reset variant state
  const addVariant = () => {
    if (variant.unit && variant.price && variant.stockQty) {
      setProduct(prev => ({
        ...prev,
        variants: [...prev.variants, variant]
      }));
      // Optionally clear variant state
      setVariant({ unit: '', price: '', stockQty: '', packaging: '' });
    } else {
      toast.error("Please fill in all variant fields (unit, price, stock).");
    }
  };

  // Submit handler for the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to create the product
      const response = await axiosInstance.post('http://localhost:4001/api/createProduct', product);
      toast.success("Product added successfully!");
      // Reset form or redirect as needed.
      setProduct({
        name: '',
        slug: '',
        multilingualName: { en: '', hi: '' },
        productCode: '',
        category: '',
        subCategory: '',
        brand: '',
        description: '',
        variants: [],
        activeVariant: '',
        tags: '',
        images: '',
        discount: 0,
        rating: 0,
        reviewCount: 0,
        bestBeforeDays: '',
        isAvailable: true,
        isFeatured: false,
        meta: { origin: '', expiryDate: '', ingredients: '' }
      });
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Slug</label>
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={handleInputChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
            className="w-full border p-2"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <h3 className="font-bold">Multilingual Name</h3>
          <label>English:</label>
          <input
            type="text"
            name="en"
            value={product.multilingualName.en}
            onChange={handleMultilingualChange}
            className="w-full border p-2"
          />
          <label>Hindi:</label>
          <input
            type="text"
            name="hi"
            value={product.multilingualName.hi}
            onChange={handleMultilingualChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <h3 className="font-bold">Variants</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Unit (e.g., 1kg)"
              name="unit"
              value={variant.unit}
              onChange={handleVariantChange}
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={variant.price}
              onChange={handleVariantChange}
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              name="stockQty"
              value={variant.stockQty}
              onChange={handleVariantChange}
              className="border p-2"
            />
            <input
              type="text"
              placeholder="Packaging"
              name="packaging"
              value={variant.packaging}
              onChange={handleVariantChange}
              className="border p-2"
            />
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Variant
          </button>
          {product.variants.length > 0 && (
            <ul className="mt-2 border p-2">
              {product.variants.map((v, i) => (
                <li key={i}>
                  {v.unit} - ${v.price} - Stock: {v.stockQty} - Packaging: {v.packaging}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="font-bold">Meta Data</h3>
          <label>Origin:</label>
          <input
            type="text"
            name="origin"
            value={product.meta.origin}
            onChange={handleMetaChange}
            className="w-full border p-2"
          />
          <label>Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            value={product.meta.expiryDate}
            onChange={handleMetaChange}
            className="w-full border p-2"
          />
          <label>Ingredients:</label>
          <textarea
            name="ingredients"
            value={product.meta.ingredients}
            onChange={handleMetaChange}
            className="w-full border p-2"
          ></textarea>
        </div>
        <div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
