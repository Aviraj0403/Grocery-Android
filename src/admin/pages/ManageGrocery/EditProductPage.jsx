import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/Axios';
import { toast } from 'react-hot-toast';

const EditProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    // Local state fields for editing (derived from product)
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [productCode, setProductCode] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);

    // Image update states: selected new images and their previews.
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    // For simplicity, category options are assumed static here.
    // You can update it to fetch dynamically if needed.
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axiosInstance.get('/api/getAllCategories');
                const all = response.data.categories || [];

                setCategories(all.filter(cat => !cat.parentCategory));
                setSubCategories(all.filter(cat => cat.parentCategory));
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                toast.error("Failed to fetch categories");
            }
        }

        fetchCategories();
    }, []);

    const filteredSubCategories = subCategories.filter(
        (sub) => sub.parentCategory === category
    );

    useEffect(() => {
        setSubCategory('');
    }, [category]);
    // Fetch product details
    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get(`/api/getProduct/${id}`);
            if (response.data.success) {
                const data = response.data.product;
                setProduct(data);
                // Initialize fields from fetched product data.
                setName(data.name || '');
                setCategory(data.category?._id || '');
                setSubCategory(data.subCategory?._id || null);
                setProductCode(data.productCode || '');
                setDescription(data.description || '');
                setBrand(data.brand || '');
                setDiscount(data.discount || 0);
                setIsAvailable(data.isAvailable);
                // Assume that product price is in the first variant if available.
                if (data.variants && data.variants.length > 0) {
                    setPrice(data.variants[0].price);
                } else {
                    setPrice('');
                }
            } else {
                toast.error(response.data.message || 'Error fetching product details');
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error(error.response?.data?.message || 'Error fetching product details');
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Handle new image file selection for update.
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        // Enforce selection of either exactly 1 or exactly 3 images.
        if (files.length !== 1 && files.length !== 3) {
            toast.error("Please select either 1 or 3 images.");
            return;
        }
        setSelectedFiles(files);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    // Remove selected images.
    const removeImages = () => {
        setSelectedFiles([]);
        setPreviews([]);
    };

    // Save updated product details.
    const handleSave = async () => {
        if (!name || !category || !price) {
            toast.error('Please fill in all required fields (Name, Category, Price).');
            return;
        }

        try {
            // Prepare data to update; update the first variant's price.
            const updatedData = {
                name,
                category,
                subCategory: subCategory === '' ? null : subCategory,
                productCode,
                description,
                brand,
                discount,
                isAvailable,
            };

            if (product?.variants && product.variants.length > 0) {
                const updatedVariants = [...product.variants];
                updatedVariants[0] = { ...updatedVariants[0], price };
                updatedData.variants = updatedVariants;
            } else {
                updatedData.variants = [{ unit: '', price, stockQty: 0, packaging: 'Loose' }];
            }

            const response = await axiosInstance.put(`/api/updateProduct/${id}`, updatedData);
            if (response.data.success) {
                toast.success('Product updated successfully');
            } else {
                toast.error(response.data.message || 'Error updating product');
                return;
            }

            // If new image files are selected, update images.
            if (selectedFiles.length > 0) {
                if (selectedFiles.length === 1 || selectedFiles.length === 3) {
                    const formData = new FormData();
                    selectedFiles.forEach(file => formData.append('files', file));
                    // The backend endpoint should delete previous images from Cloudinary
                    // before uploading the new ones.
                    await axiosInstance.post(
                        `/api/products/${id}/images`,
                        formData,
                        { headers: { 'Content-Type': 'multipart/form-data' } }
                    );
                    toast.success("Images updated successfully!");
                    removeImages();
                } else {
                    toast.error("Please select either 1 or 3 images for update.");
                }
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error(error.response?.data?.message || 'Error updating product');
        }
    };

    if (!product) return <p className="p-4 text-center">Loading product...</p>;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Edit Product
            </h1>

            {/* Image Section */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Product Image</h2>
                <div className="flex flex-col items-center">
                    {previews.length > 0 ? (
                        <div className="relative w-full max-w-md bg-yellow-50 border-2 border-orange-400 border-dashed rounded-lg p-4 flex flex-col items-center">
                            {previews.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Preview ${index + 1}`}
                                    className="max-w-full max-h-48 rounded-lg mb-2"
                                />
                            ))}
                            <button
                                type="button"
                                onClick={removeImages}
                                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="w-full max-w-md">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-2"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
                                    No Image
                                </div>
                            )}
                            <div className="flex justify-center">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    {product.images && product.images.length > 0
                                        ? "Update Product Image(s)"
                                        : "Upload Product Image(s)"}
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Form */}
            <form className="mt-6 space-y-6">
                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700">Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700">Subcategory:</label>
                    <select
                        disabled={!category}
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">None</option>
                        {filteredSubCategories.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>




                {/* Price */}
                <div className="mb-4">
                    <label className="block text-gray-700">Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Brand */}
                <div className="mb-4">
                    <label className="block text-gray-700">Brand:</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Discount */}
                <div className="mb-4">
                    <label className="block text-gray-700">Discount (%):</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-center sm:justify-start">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;
