import React from "react";
import { Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { FaTooth, FaSoap } from "react-icons/fa";
import image1 from "../assets/Tooth2.png";
import image2 from "../assets/Surf1.png";

const BannerSection = () => {
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      image: image1,
      title: "Keep Your Smile Bright",
      prompt: "✨ Shine brighter every morning – get your oral care essentials today!",
      icon: FaTooth,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
      link: "/toothpaste",
      hoverShadow: "hover:shadow-[0_6px_25px_-3px_rgba(34,197,94,0.4)]",
    },
    {
      id: 2,
      image: image2,
      title: "Clean Clothes, Happy Home",
      prompt: "🧺 Tough on stains, gentle on clothes – stock up now and save!",
      icon: FaSoap,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      link: "/deter",
      hoverShadow: "hover:shadow-[0_6px_25px_-3px_rgba(59,130,246,0.4)]",
    },
  ];

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {banners.map(({ id, image, title, prompt, icon: Icon, iconColor, bgColor, link, hoverShadow }, index) => (
            <Slide key={id} direction={index % 2 === 0 ? "right" : "left"}>
              <div
                onClick={() => navigate(link)}
                className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl transition-transform transform hover:scale-[1.02] cursor-pointer ${bgColor} ${hoverShadow}`}
              >
                {/* Image Section */}
                <div className="w-50 h-50 sm:w-44 sm:h-44 flex items-center justify-center overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Text + Icon */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-2">
                    <Icon className={`text-3xl sm:text-4xl mb-1 sm:mb-0 ${iconColor}`} />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-700 leading-tight">
                      {title}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 font-medium leading-snug">
                    {prompt}
                  </p>
                </div>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
