import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../Product/ProductGrid';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">
        Results for <span className="text-green-600">"{searchQuery}"</span>
      </h2>
      
      <ProductGrid
        searchQuery={searchQuery}
        hideCategoryFilter={true}
      />
    </div>
  );
};

export default SearchResults;
