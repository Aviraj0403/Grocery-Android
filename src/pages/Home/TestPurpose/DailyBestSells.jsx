import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import bannerdeal from "../../images/banner-deal1.jpg";
import product11 from "../../images/product-img-11.jpg";
import Slider from "react-slick";

const DailyBestSells = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Daily Best Sells</h2>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <Slide direction="left">
              <div
                className="h-full rounded-lg p-6 text-white"
                style={{ backgroundImage: `url(${bannerdeal})`, backgroundSize: 'cover' }}
              >
                <h3 className="text-xl font-bold">100% Organic Coffee Beans</h3>
                <p>Get the best deal before it’s gone!</p>
                <Link to="#" className="btn btn-light mt-3">Shop Now</Link>
              </div>
            </Slide>
          </div>
          <div className="col-md-8">
            <Slider {...sliderSettings}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="px-2">
                  <div className="border p-3 rounded-md text-center">
                    <img src={product11} alt="product" className="w-full h-40 object-contain" />
                    <h5 className="mt-3 font-semibold">Golden Pineapple</h5>
                    <p className="text-green-700 font-bold">$13 <span className="line-through text-sm text-gray-500">$18</span></p>
                    <Link to="#" className="btn btn-sm btn-outline-primary mt-2">Add to Cart</Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyBestSells;