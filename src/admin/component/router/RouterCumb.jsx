import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const RouterCumb = () => {
  const location = useLocation();

  const paths = location.pathname.split("/").filter((path) => path);
  // console.log(paths);
  if (paths.length<=0) {
    return null
  }
  return (
    <div className=" p-4 pb-0 flex items-center gap-1 border">
      {paths?.length!==0&&<Link to="/" className=" hover:underline duration-300 hover:text-blue-500 text-xl font-semibold text-gray-600 mb-4">Home</Link>}
      {paths.map((path, index) => {
        // Construct the URL for each breadcrumb link
        const linkPath = `/${paths.slice(0, index + 1).join("/")}`;

        return (
          <div className="flex items-center gap-1 text-xl font-semibold text-gray-600 mb-4" key={index}>
            {/* <FaChevronRight />  */}/
            <Link
              to={linkPath}
              className={`${index === paths.length - 1 ? " font-semibold text-[#BD3B4A]" : " hover:underline duration-300 hover:text-blue-500"}`}
            >
              {path[0].toUpperCase()+path.substring(1)}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RouterCumb;
