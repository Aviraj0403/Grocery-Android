import React from "react";

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 text-sm rounded-full border ${!selected ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`px-4 py-2 text-sm rounded-full border ${
            selected === cat._id ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
