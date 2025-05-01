const CategoryCard = ({ id, name, img ,isSelected, onClick }) => (
  <div
  onClick={onClick}
  className={
    `cursor-pointer p-4 flex flex-col items-center bg-white rounded-lg shadow
     transform hover:scale-105 transition
     ${isSelected ? 'ring-4 ring-green-300' : ''}`
  }
>
  <img
    src={img}
    alt={name}
    loading="lazy"
    className="w-20 h-20 object-contain mb-2"
  />
  <span className="text-green-700 font-medium">{name}</span>
</div>
  );
  export default CategoryCard;
  