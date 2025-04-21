import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import grocerybanner1 from "../../images/grocery-banner.png";
import grocerybanner2 from "../../images/grocery-banner-2.jpg";

const GroceryOffers = () => {
  return (
    <section className="my-12">
      <div className="container">
        <div className="row">
          <Slide direction="left">
            <div className="col-md-6 mb-4">
              <div
                className="rounded-3 p-5 text-white"
                style={{
                  background: `url(${grocerybanner1}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              >
                <h3 className="fw-bold mb-2">Fruits & Vegetables</h3>
                <p className="mb-4">Get Upto <strong>30%</strong> Off</p>
                <Link to="#" className="btn btn-light">Shop Now</Link>
              </div>
            </div>
          </Slide>
          <Slide direction="right">
            <div className="col-md-6">
              <div
                className="rounded-3 p-5 text-white"
                style={{
                  background: `url(${grocerybanner2}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              >
                <h3 className="fw-bold mb-2">Freshly Baked Buns</h3>
                <p className="mb-4">Get Upto <strong>25%</strong> Off</p>
                <Link to="#" className="btn btn-light">Shop Now</Link>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default GroceryOffers;
