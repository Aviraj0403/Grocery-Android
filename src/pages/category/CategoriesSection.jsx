import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services/categoryApi';
import CategoryCard from './CategoryCard';
import { Slide, Zoom } from "react-awesome-reveal";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await getCategories();
        setCategories(all.filter(cat => cat.isActive)); // optional filter
      } catch (e) {
        console.error('Failed to load categories', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-5 py-9">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center cursor-pointer hover:text-green-400">
        Browse Categories
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading categories...</p>
      ) : (
        <Zoom>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {categories.map(cat => (
              <CategoryCard key={cat._id} name={cat.name} img={cat.image} />
            ))}
          </div>
        </Zoom>
      )}
    </section>
  );
};

export default CategoriesSection;
