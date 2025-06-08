import React from "react";
import { Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/Tooth2.png";
import image2 from "../assets/Surf1.png"
const BannerSection = () => {
  const navigate = useNavigate();

  // Sample banners data
  const banners = [
    {
      id: 1,
      image: image1,
      title: "Teeth Cleaning Essentials",
      discount: "2%",
      bgColor: "bg-yellow-100",
      link: "/toothpaste",
      hoverShadow: "hover:shadow-[0_10px_30px_-5px_rgba(34,197,94,0.6)]", // green shadow
    },
    {
      id: 2,
      image: image2,
      title: "Detergent & Bleach",
      discount: "2%",
      bgColor: "bg-blue-100",
      link: "/deter",
      hoverShadow: "hover:shadow-[0_10px_30px_-5px_rgba(59,130,246,0.6)]", // blue shadow
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {banners.map(({ id, image, title, discount, bgColor, link, hoverShadow }, index) => (
            <div
              key={id}
              className={`w-full lg:w-1/2 rounded-3xl shadow-lg overflow-hidden ${bgColor} transform transition-transform duration-300 hover:scale-105 cursor-pointer ${hoverShadow}`}
              onClick={() => navigate(link)}
            >
              <Slide direction={index % 2 === 0 ? "right" : "left"}>
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image Section */}
                  <div
                    className="w-full sm:w-1/2 h-48 sm:h-auto flex justify-center items-center bg-center bg-no-repeat bg-contain"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-label={title}
                  />

                  {/* Text Section */}
                  <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center items-center text-center">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
                      {title}
                    </h3>
                    <p className="text-xl mb-6 text-gray-700">
                      Get Upto{" "}
                      <span className="font-semibold text-green-600">{discount}</span>{" "}
                      Off
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(link);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </Slide>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
