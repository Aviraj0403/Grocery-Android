import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productApi';
import { getMainCategories } from '../../services/categoryApi';
import ProductCard from './ProductCard';
import CategoryCard from '../category/CategoryCard';
import Skeleton from 'react-loading-skeleton';
import { Zoom } from 'react-awesome-reveal';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prodData, catData] = await Promise.all([
        getAllProducts(),
        getMainCategories(),
      ]);
      setProducts(prodData);
      setCategories(catData.filter(c => c.isActive));
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCat !== 'All') {
      result = result.filter((item) => item.category?.name === selectedCat);
    }

    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === 'priceLow') {
      result.sort((a, b) => a.variants[0]?.price - b.variants[0]?.price);
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.variants[0]?.price - a.variants[0]?.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFiltered(result);
    setPage(1);
  }, [products, selectedCat, sortBy, search]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Categories List */}
<section className="mb-2">
  {loading ? (
    <p className="text-center text-gray-400">Loading categories...</p>
  ) : (
    <Zoom>
      <div className="flex flex-wrap gap-4 justify-center">
        {/* ALL Category */}
        <div onClick={() => setSelectedCat('All')}>
          <CategoryCard
            name="All"
            img="/path/to/default-all-icon.png" // replace with actual fallback icon
            isSelected={selectedCat === 'All'}
          />
        </div>

        {/* Other categories */}
        {categories.map((cat) => (
          <div key={cat._id} onClick={() => setSelectedCat(cat.name)}>
            <CategoryCard
              name={cat.name}
              img={cat.image[0]} // ✅ Correct usage here
              isSelected={selectedCat === cat.name}
            />
          </div>
        ))}
      </div>
    </Zoom>
  )}
</section>


      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
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
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} height={250} className="rounded-lg" />
              ))
          : paginated.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2">{page} / {totalPages}</span>
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
