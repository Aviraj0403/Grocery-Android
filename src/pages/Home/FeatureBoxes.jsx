import { Zoom } from "react-awesome-reveal";
import clock from "../../images/clock.svg";
import refresh from "../../images/refresh-cw.svg";
import gift from "../../images/gift.svg";
import packageIcon from "../../images/package.svg";

const features = [
  {
    icon: refresh,
    title: "Easy Returns",
    desc: "Not satisfied with a product? Return it at the doorstep & get a refund within hours."
  },
  {
    icon: packageIcon,
    title: "Wide Assortment",
    desc: "Choose from 5000+ products across all major grocery categories."
  },
  {
    icon: gift,
    title: "Best Prices & Offers",
    desc: "Get the best deals and cashback offers online."
  },
  {
    icon: clock,
    title: "Fast Delivery",
    desc: "Get your order delivered to your doorstep quickly."
  }
];

const FeatureBoxes = () => {
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <div className="row text-center">
          {features.map((item, idx) => (
            <div className="col-md-3 mb-4" key={idx}>
              <Zoom>
                <img src={item.icon} alt={item.title} className="h-12 mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Zoom>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBoxes;