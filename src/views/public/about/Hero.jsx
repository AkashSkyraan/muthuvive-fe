import React from "react";
import { Button } from "antd";
import images from "../../../config/Images.jsx";

const AboutUs = () => {
  return (
    <div className="w-full py-16 h-screen">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left content */}
        <div className="lg:w-1/2 text-start">
          <span className="inline-block bg-[#dbe4fb] text-secondary text-md font-medium px-5 py-1.5 rounded-md w-2/5 sm:w-1/5 text-center">
            About Us
          </span>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-4 leading-snug">
            Discover Your Life Buy Your Land & Plots You Want
          </h2>

          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            Trusted by industry leaders, built for long-lasting results, and
            designed to deliver reliable, enduring success.Trusted by industry
            leaders, built for long-lasting results, and designed to deliver
            reliable, enduring success.Trusted by industry leaders, built for
            long-lasting results, and designed to deliver reliable, enduring
            success.Trusted by industry leaders, built for long-lasting results,
            and designed to deliver reliable, enduring success.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <Button type="primary" className="!bg-secondary w-2/4 sm:w-1/4">
              Explore All Services
            </Button>
            <Button className="!border-secondary !text-secondary w-2/4 sm:w-1/4">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Right image grid with centered logo overlay */}
        <div className="lg:w-1/2 w-full">
          <div className="relative grid grid-cols-2 gap-3 h-[320px] sm:h-[380px] md:h-[420px]">
            {/* Left column - single full height image */}
            <div className="h-full">
              <img
                src={images.sunset}
                alt="farmland"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right column - two stacked images */}
            <div className="flex flex-col gap-3 h-full">
              <img
                src={images.building}
                alt="building"
                className="w-full h-1/2 object-cover rounded-lg"
              />
              <img
                src={images.agriland}
                alt="aerial plot"
                className="w-full h-1/2 object-cover rounded-lg"
              />
            </div>

            {/* Logo overlay - centered where all four corners meet */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 sm:w-28 sm:h-28 xl:w-48 xl:h-48 rounded-full bg-white shadow-lg flex flex-col items-center justify-center">
              <img
                src={images.logocircle}
                alt="logo"
                className="w-14 sm:w-16 xl:w-32 xl:h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
