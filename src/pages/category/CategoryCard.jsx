const CategoryCard = ({ name, img }) => (
    <div className="min-w-[140px] bg-slate-200 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-4 flex flex-col items-center flex-shrink-0">
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="w-22 h-20 object-contain mb-1 cursor-pointer"
      />
      <span className="text-green-700 font-medium cursor-pointer">{name}</span>
    </div>
  );
  export default CategoryCard;
  