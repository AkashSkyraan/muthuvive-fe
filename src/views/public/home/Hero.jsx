import React from "react";
import { Input, Select, Button } from "antd";
import hero_image from "../../../assets/images/hero_img.png";
import images from "../../../config/Images.jsx";
import icons from "../../../config/Icons.jsx";
import SearchPage from "../search/SearhPage.jsx";
import { Link } from "react-router-dom";

const features = [
  {
    icon: icons.verifiedDocsIcon,
    iconBg: "bg-[#dbeafe]",
    title: "Verified Documents",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
  {
    icon: icons.dtcpIcon,
    iconBg: "bg-[#d1fae5]",
    title: "DTCP Approved",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
  {
    icon: icons.legalIcon,
    iconBg: "bg-[#ede9fe]",
    title: "Legal Assistance",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
  {
    icon: icons.siteVisitIcon,
    iconBg: "bg-[#ffedd5]",
    title: "Site Visit Support",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
];

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={images.heroImage}
        alt="hero-background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-[95%] mx-auto py-6 md:py-10">
        {/* Search bar */}

        <div className="flex-1 flex items-center  rounded-lg px-3">
          <SearchPage />
        </div>

        {/* Heading */}
        <div className="mt-10 max-w-full md:max-w-[70%]">
          <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-start text-white leading-tight">
            Find A Place You&rsquo;ll Love To Call Home
          </h1>

          <p className="mt-4 text-base md:text-base text-gray-200 text-start max-w-full md:max-w-[80%]">
            Discover verified properties that match your lifestyle, budget, and
            location. Buy, sell, or rent your perfect property with confidence.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 !z-[1]">
            <Link to="/search">
              <Button className=" !z-[1] !bg-white !text-secondary !border-2 !border-transparent !font-medium !py-5 !px-9 !text-base">
                Explore
              </Button>
            </Link>
            <Link to="/contactus">
              <Button
                ghost
                className="!text-white !border-white !font-medium !py-5 !px-7 !border-2 !text-base"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pb-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-start gap-x-3"
            >
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 self-center ${feature.iconBg}`}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-5 h-5"
                />
              </div>

              <div>
                <h3 className="text-white text-base font-semibold text-start">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm text-start mt-1 w-full">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
