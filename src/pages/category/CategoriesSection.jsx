import React, { useEffect, useState } from 'react';
import { getMainCategories } from '../../services/categoryApi';
import CategoryCard from './CategoryCard';
import { Zoom } from 'react-awesome-reveal';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await getMainCategories();
        setCategories(all.filter(cat => cat.isActive));
      } catch (e) {
        console.error('Failed to load categories', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <Zoom>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat._id} name={cat.name} img={cat.image[0]} />
          ))}
        </div>
      </Zoom>
    </section>
  );
};

export default CategoriesSection;
