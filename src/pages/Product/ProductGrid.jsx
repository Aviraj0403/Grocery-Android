import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productApi';
import { getMainCategories } from '../../services/categoryApi';
import ProductCard from './ProductCard';
import CategoryCard from '../category/CategoryCard';
import Skeleton from 'react-loading-skeleton';
import { Zoom } from 'react-awesome-reveal';
import 'react-loading-skeleton/dist/skeleton.css';

const perPage = 8;

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { products: prodData, pagination } = await getAllProducts({
        page,
        limit: perPage,
        search,
        category: selectedCat !== 'All' ? selectedCat : '',
      });

      let sorted = [...prodData];
      if (sortBy === 'priceLow') {
        sorted.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
      } else if (sortBy === 'priceHigh') {
        sorted.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
      } else if (sortBy === 'rating') {
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      setProducts(sorted);
      setTotalPages(pagination.totalPages || 1);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const catData = await getMainCategories();
      setCategories(catData.filter((c) => c.isActive));
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCat, sortBy, search]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Categories List */}
      <section className="mb-4">
        <Zoom>
          <div className="flex flex-wrap gap-4 justify-center">
            <div onClick={() => { setSelectedCat('All'); setPage(1); }}>
              <CategoryCard
                name="All"
                img="/path/to/default-all-icon.png"
                isSelected={selectedCat === 'All'}
              />
            </div>
            {categories.map((cat) => (
              <div key={cat._id} onClick={() => { setSelectedCat(cat._id); setPage(1); }}>
                <CategoryCard
                  name={cat.name}
                  img={cat.image[0]}
                  isSelected={selectedCat === cat._id}
                />
              </div>
            ))}
          </div>
        </Zoom>
      </section>

      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
          placeholder="Search product..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading
          ? Array(perPage)
              .fill(0)
              .map((_, i) => <Skeleton key={i} height={250} className="rounded-lg" />)
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
