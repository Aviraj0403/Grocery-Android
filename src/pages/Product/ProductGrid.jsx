import React, { useEffect, useState, useMemo } from 'react';
import { getAllProducts } from '../../services/productApi';
import { getCategories }  from '../../services/categoryApi';
import ProductCard        from './ProductCard';
import Skeleton           from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductGrid = () => {
  // Data
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);

  // Filters & UI state
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch]           = useState('');
  const [sortBy, setSortBy]           = useState('');
  const [page, setPage]               = useState(1);

  // Loading
  const [loading, setLoading] = useState(true);

  const perPage = 8;

  // Fetch products + categories once
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [prodData, catData] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);
        setProducts(prodData);
        setCategories(catData);
      } catch (e) {
        console.error('Failed to load:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Compute filtered & sorted list
  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter (by _id)
    if (selectedCat !== 'All') {
      result = result.filter(p =>
        p.category?._id === selectedCat ||
        p.subCategory?._id === selectedCat
      );
    }

    // Text search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'priceLow') {
      result.sort((a, b) => 
        (a.variants.find(v => v.unit === a.activeVariant)?.price || 0) -
        (b.variants.find(v => v.unit === b.activeVariant)?.price || 0)
      );
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => 
        (b.variants.find(v => v.unit === b.activeVariant)?.price || 0) -
        (a.variants.find(v => v.unit === a.activeVariant)?.price || 0)
      );
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCat, search, sortBy]);

  // Reset page if filtered list changes
  useEffect(() => {
    setPage(1);
  }, [filtered]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Category Chips */}
      <div className="flex space-x-3 overflow-x-auto pb-2 mb-4">
        <button
          onClick={() => setSelectedCat('All')}
          className={
            `flex-shrink-0 px-4 py-2 rounded-full border 
             ${selectedCat === 'All'
               ? 'bg-green-600 text-white border-green-600'
               : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'}`
          }
        >
          All
        </button>

        {loading
          ? Array(5).fill().map((_, i) => (
              <Skeleton
                key={i}
                circle={true}
                height={32}
                width={32}
                className="flex-shrink-0"
              />
            ))
          : categories.map(cat => (
              <button
                key={cat._id}
                onClick={() => setSelectedCat(cat._id)}
                className={
                  `flex-shrink-0 px-4 py-2 rounded-full border 
                   ${selectedCat === cat._id
                     ? 'bg-green-600 text-white border-green-600'
                     : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'}`
                }
              >
                {cat.name}
              </button>
            ))
        }
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(perPage).fill().map((_, i) => (
            <Skeleton key={i} height={250} className="rounded-lg" />
          ))}
        </div>
      ) : paginated.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginated.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span>{page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};

export default ProductGrid;
