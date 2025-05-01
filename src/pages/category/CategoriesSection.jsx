// src/components/category/CategoriesSection.jsx
import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services/categoryApi';
import CategoryCard     from './CategoryCard';
import { Zoom }         from "react-awesome-reveal";

const CategoriesSection = ({ selectedCatId, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await getCategories();
        // only root categories
        setCategories(all.filter(c => c.isActive && !c.parentCategory));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClick = (id) => {
    onSelectCategory(id === selectedCatId ? "All" : id);
  };

  if (loading) {
    return <p className="text-center py-6">Loading categories…</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-9">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Browse Categories
      </h2>
      <Zoom>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <CategoryCard
              key={cat._id}
              id={cat._id}
              name={cat.name}
              img={cat.image[0]}
              isSelected={cat._id === selectedCatId}
              onClick={() => handleClick(cat._id)}
            />
          ))}
        </div>
      </Zoom>
    </section>
  );
};

export default CategoriesSection;
