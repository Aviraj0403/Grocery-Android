import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const RouterCumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  if (paths.length <= 0) return null;

  return (
    <div className="bg-white p-4 pb-2 flex items-center gap-2 shadow-md rounded-md border border-gray-200">
      <Link
        to="/"
        className="hover:underline duration-300 hover:text-blue-600 text-xl font-semibold text-gray-700"
      >
        Home
      </Link>
      {paths.map((path, index) => {
        const linkPath = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        return (
          <div className="flex items-center gap-2 text-xl font-semibold" key={index}>
            <FaChevronRight className="text-gray-400" />
            <Link
              to={linkPath}
              className={`transition-colors duration-300 ${
                isLast
                  ? "text-[#BD3B4A] font-bold"
                  : "text-gray-700 hover:text-blue-600 hover:underline"
              }`}
            >
              {path[0].toUpperCase() + path.slice(1)}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RouterCumb;
