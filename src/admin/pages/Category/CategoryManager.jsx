import React, { useEffect, useState } from 'react';
import axios from '../../..//utils/Axios';
import toast from 'react-hot-toast';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        type: 'Main',
        parentCategory: '',
        image: '',
        displayOrder: 0,
        isActive: true
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/getAllCategories');
            setCategories(res.data.categories || []);
        } catch (err) {
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                parentCategory: form.type === 'Sub' ? form.parentCategory : null
            };
            if (editingCategory) {
                await axios.put(`/api/updateCategory/${editingCategory._id}`, payload);
                toast.success('Category updated');
            } else {
                await axios.post('/api/createCategory', payload);
                toast.success('Category created');
            }
            setShowModal(false);
            setForm({
                name: '',
                slug: '',
                description: '',
                type: 'Main',
                parentCategory: '',
                image: '',
                displayOrder: 0,
                isActive: true
            });
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error occurred');
        }
    };

    const handleEdit = (cat) => {
        setForm({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            type: cat.type,
            parentCategory: cat.parentCategory || '',
            image: cat.image || '',
            displayOrder: cat.displayOrder,
            isActive: cat.isActive
        });
        setEditingCategory(cat);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this category?')) return;
        try {
            await axios.delete(`/api/deleteCategory/${id}`);
            toast.success('Deleted');
            fetchCategories();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const openCreate = () => {
        setEditingCategory(null);
        setForm({
            name: '',
            slug: '',
            description: '',
            type: 'Main',
            parentCategory: '',
            image: '',
            displayOrder: 0,
            isActive: true
        });
        setShowModal(true);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Category Management</h2>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Category
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-auto rounded shadow bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Slug</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Parent</th>
                                <th className="px-4 py-3">Order</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat._id} className="border-t">
                                    <td className="px-4 py-2">{cat.name}</td>
                                    <td className="px-4 py-2">{cat.slug}</td>
                                    <td className="px-4 py-2">{cat.type}</td>
                                    <td className="px-4 py-2">{cat.parentCategory?.name || '—'}</td>
                                    <td className="px-4 py-2">{cat.displayOrder}</td>
                                    <td className="px-4 py-2">
                                        {cat.isActive ? (
                                            <span className="text-green-600">Active</span>
                                        ) : (
                                            <span className="text-red-600">Inactive</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        {/* <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:underline">Delete</button> */}
                                        <td className="px-4 py-2 text-right space-x-3 flex justify-end">
                                            <button
                                                onClick={() => handleEdit(cat)}
                                                className="text-blue-600 hover:text-blue-800"
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
                                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                                    <path d="m15 5 4 4"></path>
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(cat._id)}
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

                                    </td>
                                </tr>
                            ))}
                            {!categories.length && (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-400">No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
                        <h3 className="text-lg font-semibold">
                            {editingCategory ? 'Edit Category' : 'Add Category'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" required className="w-full border px-3 py-2 rounded" />
                            <input name="slug" value={form.slug} onChange={handleInputChange} placeholder="Slug" required className="w-full border px-3 py-2 rounded" />
                            <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" rows="2" className="w-full border px-3 py-2 rounded" />
                            <select name="type" value={form.type} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                                <option value="Main">Main</option>
                                <option value="Sub">Sub</option>
                            </select>
                            {form.type === 'Sub' && (
                                <select name="parentCategory" value={form.parentCategory} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                                    <option value="">Select Parent Category</option>
                                    {categories
                                        .filter(c => c.type === 'Main')
                                        .map(c => (
                                            <option key={c._id} value={c._id}>{c.name}</option>
                                        ))}
                                </select>
                            )}
                            <input name="image" value={form.image} onChange={handleInputChange} placeholder="Image URL" className="w-full border px-3 py-2 rounded" />
                            <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleInputChange} placeholder="Display Order" className="w-full border px-3 py-2 rounded" />
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleInputChange} />
                                Active
                            </label>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editingCategory ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManager;
