import React from "react";
import { Button } from "antd";

const Categories = ({ services = [] }) => {
  const columns = services.length >= 6 ? 3 : 2;
  return (
    <div className="w-full bg-[#eef2fd] py-16">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left content */}
        <div className="lg:w-[35%] shrink-0 text-start">
          <span className="inline-block bg-[#dbe4fb] text-secondary w-[45%] sm:[35%] text-center text-md font-medium px-5 py-1.5 rounded-md">
            Categories
          </span>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-4">
            We Have The Service You Need
          </h2>

          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.Highlight the best of your properties by using the
            List Category shortcode.
          </p>

          <Button type="primary" className="!bg-secondary mt-6">
            Explore All Services
          </Button>
        </div>

        {/* Right grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4 flex-1 text-start`}
        >
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg p-5">
              <div className="w-10 h-10 rounded-md bg-[#eef2fd] flex items-center justify-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-5 h-5"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-900 mt-4">
                {service.title}
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
