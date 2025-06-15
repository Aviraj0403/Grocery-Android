import React from "react";
import { Slide } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";

const heroData = {
  title: "Welcome to Shanu-Mart",
  subtitle:
    "Discover fresh groceries, daily deals, and quick delivery — all at your footstep!",
  buttonText: "Shop Now",
  buttonLink: "/shopnow",
};

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative text-center py-24 px-6 bg-gradient-to-br from-green-100 via-green-200 to-green-100 overflow-hidden rounded-b-3xl">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/40 via-green-100 to-transparent opacity-40 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Title */}
        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold text-green-900 mb-6 tracking-tight leading-tight drop-shadow-xl">
          <Slide direction="right">
            <span className="inline-block animate-glow-text">
              Welcome to <span className="text-yellow-500">Shanu-</span>Mart
            </span>
          </Slide>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-green-800 mb-10 animate-fade-in-up">
          {heroData.subtitle}
        </p>

        {/* Call to Action */}
        <Link to={heroData.buttonLink}>
          <button
            onClick={() => navigate(heroData.buttonLink)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-md transition-all duration-300 hover:shadow-[0_10px_25px_rgba(34,197,94,0.5)] group"
          >
            {heroData.buttonText}
            <span className="ml-3 inline-block transition-transform duration-300 transform group-hover:translate-x-1 animate-bounce">
              →
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
