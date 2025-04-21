import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";
import categories from "./categoryList"; // We'll create a list file

const CategoryGrid = () => {
  return (
    <section className="my-12">
      <div className="container">
        <div className="section-head text-center mb-6">
          <h3 className="text-2xl font-semibold">Shop Popular Categories</h3>
          <div className="h-1 bg-green-500 w-20 mx-auto mt-2"></div>
        </div>
        <div className="row">
          {categories.map((cat, i) => (
            <div className="col-6 col-md-4 col-lg-2 text-center mb-5" key={i}>
              <Zoom>
                <Link to="#">
                  <img src={cat.img} alt={cat.label} className="rounded-full w-20 h-20 object-cover mx-auto" />
                  <h5 className="mt-3 text-sm">{cat.label}</h5>
                </Link>
              </Zoom>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
