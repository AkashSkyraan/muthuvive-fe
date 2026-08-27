import React from "react";
import { Input, Select, Button } from "antd";
import locationIcon from "../../../assets/icons/location.png";
import categoryIcon from "../../../assets/icons/category.png";
import verifiedDocsIcon from "../../../assets/icons/verifiedDocs.png";
import dtcpIcon from "../../../assets/icons/dtcp.png";
import legalIcon from "../../../assets/icons/legal.png";
import siteVisitIcon from "../../../assets/icons/siteVisit.png";
import whatsappIcon from "../../../assets/icons/whatsapp.png";
import callFloatIcon from "../../../assets/icons/mobile.png";
import hero_image from "../../../assets/images/hero_img.png";

const features = [
  {
    icon: verifiedDocsIcon,
    iconBg: "bg-[#dbeafe]",
    title: "Verified Documents",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
  {
    icon: dtcpIcon,
    iconBg: "bg-[#d1fae5]",
    title: "DTCP Approved",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
  {
    icon: legalIcon,
    iconBg: "bg-[#ede9fe]",
    title: "Legal Assistance",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
  {
    icon: siteVisitIcon,
    iconBg: "bg-[#ffedd5]",
    title: "Site Visit Support",
    desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
  },
];

const Hero = () => {
  return (
    <div className="relative w-full">
      <img
        src={hero_image}
        alt="hero-background"
        className="absolute inset-0 w-full h-full object-cover object-fill"
      />
      <div className="absolute inset-0"></div>

      <div className="relative w-[95%] mx-auto py-10">
        {/* Search bar */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center bg-white rounded-md px-3">
            <img src={locationIcon} alt="location" className="w-4 h-4" />
            <Input
              placeholder="Search by location"
              variant="borderless"
              className="!text-sm"
            />
          </div>

          <div className="flex-1 flex items-center bg-white rounded-md px-3">
            <img src={categoryIcon} alt="category" className="w-4 h-4" />
            <Select
              placeholder="Search Categories"
              variant="borderless"
              className="w-full"
              options={[
                { value: "residential", label: "Residential" },
                { value: "commercial", label: "Commercial" },
                { value: "agricultural", label: "Agricultural" },
              ]}
            />
          </div>

          <Button type="primary" className="!bg-secondary !h-auto md:!px-8">
            Search
          </Button>
        </div>

        {/* Heading */}
        <div className="mt-10 max-w-[70%]">
          <h1 className="text-3xl md:text-5xl font-bold text-start text-white leading-tight">
            Find A Place You&rsquo;ll Love To Call Home
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-200 text-start max-w-[80%]">
            Discover verified properties that match your lifestyle, budget, and
            location. Buy, sell, or rent your perfect property with confidence.
          </p>

          <div className="flex items-center gap-x-4 mt-6">
            <Button className="!bg-white !text-secondary !border-none !font-medium !py-5 !px-9">
              Explore
            </Button>
            <Button
              ghost
              className="!text-white !border-white !font-medium !py-5 !px-7"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
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
                <h3 className="text-white text-sm font-semibold text-start">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-xs text-start mt-1 w-50">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating action icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-y-3 z-50">
        <a
          href="#"
          className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <img src={whatsappIcon} alt="whatsapp" className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <img src={callFloatIcon} alt="call" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
