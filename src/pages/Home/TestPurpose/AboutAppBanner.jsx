import { Link } from "react-router-dom";
import abouticon from "../../images/about-icons-1.svg";
import { Slide } from "react-awesome-reveal";

const AboutAppBanner = () => {
  return (
    <section className="mt-8">
      <div className="container">
        <Slide direction="down">
          <div className="bg-light d-lg-flex justify-content-between align-items-center py-6 px-8 rounded-3 text-center text-lg-start">
            <div className="d-lg-flex align-items-center">
              <img src={abouticon} alt="about-icon" className="img-fluid" />
              <div className="ms-lg-4">
                <h1 className="fs-2 mb-1">Welcome to FreshCart</h1>
                <span>
                  Download the app and get free food & <span className="text-primary">$30</span> off your first order.
                </span>
              </div>
            </div>
            <div className="mt-3 mt-lg-0">
              <Link to="#" className="btn btn-dark">
                Download FreshCart App
              </Link>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default AboutAppBanner;
