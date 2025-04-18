import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

// Optional: Friendly label map
const labelMap = {
  admin: "Admin",
  "product-details": "Product Details",
  "edit-product": "Edit Product",
  "adminProducts": "All Products",
  "order-manager": "Orders",
  dashboard: "Dashboard",
  reviews: "Reviews",
  create: "Create",
  new: "New",
};

// Detect if a segment is a dynamic ID (Mongo ID or long hash)
const isDynamicSegment = (str) =>
  str.length > 15 || /^[0-9a-f]{20,}$/i.test(str);

const RouterCumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  if (paths.length === 0) return null;

  return (
    <div className="bg-white p-4 pb-2 flex flex-wrap items-center gap-2 shadow-md rounded-md border border-gray-200">
      <Link
        to="/"
        className="hover:underline duration-300 hover:text-blue-600 text-xl font-semibold text-gray-700"
      >
        Home
      </Link>

      {paths.map((segment, index) => {
        const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        // Determine label: if dynamic → "View", else from labelMap or capitalized
        const label = isDynamicSegment(segment)
          ? "View"
          : labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div className="flex items-center gap-2 text-xl font-semibold" key={index}>
            <FaChevronRight className="text-gray-400" />
            <Link
              to={fullPath}
              className={`transition-colors duration-300 ${
                isLast
                  ? "text-[#BD3B4A] font-bold"
                  : "text-gray-700 hover:text-blue-600 hover:underline"
              }`}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RouterCumb;
