import { Link } from "react-router-dom";
import slider1 from "../../images/slide-1.jpg";
import slider2 from "../../images/slider-2.jpg";

const HeroBanner = () => {
  return (
    <section className="hero-section">
    <div className="container mt-8">
      <div className="carousel slide carousel-fade" id="heroCarousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${slider1})` }}
            >
              <div className="p-8 text-left text-white">
                <span className="badge bg-yellow-400">50% OFF</span>
                <h2 className="text-3xl font-bold mt-4">Daily Fresh Grocery</h2>
                <p className="mt-2">Get your items quickly with our new delivery system.</p>
                <button className="mt-3 px-5 py-2 bg-green-600 text-white rounded">Shop Now</button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${slider2})` }}
            >
              <div className="p-8 text-left text-white">
                <span className="badge bg-yellow-400">Free Shipping</span>
                <h2 className="text-3xl font-bold mt-4">Orders Over $100</h2>
                <p className="mt-2">Don’t miss our seasonal offers and fast delivery!</p>
                <button className="mt-3 px-5 py-2 bg-green-600 text-white rounded">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
    </section>
  );
};

export default HeroBanner;
