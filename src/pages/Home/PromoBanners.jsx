import { Link } from "react-router-dom";
import adbanner1 from "../../images/ad-banner-1.jpg";
import adbanner2 from "../../images/ad-banner-2.jpg";
import adbanner3 from "../../images/ad-banner-3.jpg";
import { Slide, Zoom } from "react-awesome-reveal";

const PromoBanners = () => {
  return (
    <section className="mt-8">
      <div className="container">
        <div className="row">
          <Slide direction="left">
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="position-relative">
                <img src={adbanner1} alt="banner1" className="img-fluid rounded-3 w-100" />
                <div className="banner-text p-4">
                  <h3 className="fw-bold mb-2">10% cashback on personal care</h3>
                  <p className="mb-0 fs-sm">Max cashback: $12</p>
                  <span>Code: <strong>CARE12</strong></span>
                  <br />
                  <Link to="#" className="btn btn-dark mt-2">Shop Now</Link>
                </div>
              </div>
            </div>
          </Slide>

          <Zoom>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="position-relative">
                <img src={adbanner2} alt="banner2" className="img-fluid rounded-3 w-100" />
                <div className="banner-text p-4">
                  <h3 className="fw-bold mb-2">Say yes to season’s fresh</h3>
                  <p>Refresh your day the fruity way</p>
                  <Link to="#" className="btn btn-dark mt-2">Shop Now</Link>
                </div>
              </div>
            </div>
          </Zoom>

          <Slide direction="right">
            <div className="col-lg-4 mb-3">
              <div className="position-relative">
                <img src={adbanner3} alt="banner3" className="img-fluid rounded-3 w-100" />
                <div className="banner-text p-4">
                  <h3 className="fw-bold mb-2">When in doubt, eat ice cream</h3>
                  <p>Enjoy a scoop of summer today</p>
                  <Link to="#" className="btn btn-dark mt-2">Shop Now</Link>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
