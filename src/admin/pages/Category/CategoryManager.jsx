import React, { useEffect, useState } from 'react';
import axios from '../../../utils/Axios';
import toast from 'react-hot-toast';
import slugify from 'slugify';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    type: 'Main',
    parentCategory: '',
    image: null,
    displayOrder: 0,
    isActive: true
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/getAllCategories');
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
    const { name, value, type, checked, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm(prev => ({ ...prev, image: file }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else if (editingCategory?.imageUrl) {
        setImagePreview(editingCategory.imageUrl);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));

      if (name === 'name') {
        const newSlug = slugify(value || '', { lower: true, strict: true });
        setForm(prev => ({ ...prev, slug: newSlug }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key] !== null && form[key] !== '') {
          formData.append(key, form[key]);
        }
      }

      if (form.type === 'Sub') {
        formData.set('parentCategory', form.parentCategory);
      } else {
        formData.delete('parentCategory');
      }

      if (editingCategory) {
        await axios.put(`/updateCategory/${editingCategory._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Category updated');
      } else {
        await axios.post('/createCategory', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Category created');
      }

      resetForm();
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      slug: '',
      description: '',
      type: 'Main',
      parentCategory: '',
      image: null,
      displayOrder: 0,
      isActive: true
    });
    setEditingCategory(null);
    setImagePreview(null);
  };

  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      type: cat.type,
      parentCategory: cat.parentCategory?._id || '',
      image: null,
      displayOrder: cat.displayOrder,
      isActive: cat.isActive
    });
    setEditingCategory(cat);
    setShowModal(true);
    // Assuming cat.imageUrl holds the image URL
   setImagePreview(cat.image?.[0] || null);

  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await axios.delete(`/deleteCategory/${id}`);
      toast.success('Deleted');
      fetchCategories();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
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
            <thead className="bg-gray-100 text-left text-sm text-gray-600">
  <tr>
    <th className="px-4 py-3">Name</th>
    <th className="px-4 py-3 hidden sm:table-cell">Slug</th>
    <th className="px-4 py-3">Type</th>
    <th className="px-4 py-3 hidden sm:table-cell">Parent</th>
    <th className="px-4 py-3 hidden sm:table-cell">Order</th>
    <th className="px-4 py-3">Status</th>
    <th className="px-4 py-3 text-right">Actions</th>
  </tr>
</thead>

            <tbody>
  {categories.map(cat => (
    <tr key={cat._id} className="border-t text-sm text-gray-800">
      <td className="px-4 py-3 align-middle">{cat.name}</td>
      <td className="px-4 py-3 align-middle hidden sm:table-cell">{cat.slug}</td>
      <td className="px-4 py-3 align-middle">{cat.type}</td>
      <td className="px-4 py-3 align-middle hidden sm:table-cell">{cat.parentCategory?.name || '—'}</td>
      <td className="px-4 py-3 align-middle hidden sm:table-cell">{cat.displayOrder}</td>
      <td className="px-4 py-3 align-middle">
        {cat.isActive ? (
          <span className="text-green-600 font-medium">Active</span>
        ) : (
          <span className="text-red-600 font-medium">Inactive</span>
        )}
      </td>
      <td className="px-4 py-3 align-middle text-right flex justify-end gap-3">
        <button
          onClick={() => handleEdit(cat)}
          className="text-blue-600 hover:text-blue-800"
        >
          ✎
        </button>
        <button
          onClick={() => handleDelete(cat._id)}
          className="text-red-600 hover:text-red-800"
        >
          🗑
        </button>
      </td>
    </tr>
  ))}
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
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
              <input type="file" name="image" accept="image/*" onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
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
