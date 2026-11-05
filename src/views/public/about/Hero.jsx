import React from "react";
import { Button } from "antd";
import images from "../../../config/Images.jsx";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="w-full py-10 sm:py-16">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        {/* Left content */}
        <div className="md:w-1/2 text-start">
          <span className="inline-block bg-[#dbe4fb] text-secondary text-md font-medium px-5 py-1.5 rounded-md w-2/5 sm:w-1/5 md:w-2/5 lg:w-2/6 xl:w-2/6 !max-w-[170px] text-center">
            About Us
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-4 leading-snug">
            Every piece of land holds the potential to build someone's dream and
            create a better future.
          </h2>

          <p className="text-base text-gray-500 mt-4 leading-relaxed">
            With a vision to make property ownership simple, transparent and
            accessible, Mr. Pon Muthuvel founded MuthVives Properties with a
            commitment to helping individuals and families discover the right
            land opportunities.Driven by a passion for real estate and customer
            satisfaction, he believes in building relationships through trust,
            transparency and dedicated service. His vision is to create
            meaningful property ownership opportunities while guiding customers
            towards confident and informed investment decisions. Under his
            leadership, MuthVives Properties strives to deliver reliable
            property solutions and build lasting relationships with every
            customer.
          </p>

          <div className="flex flex-nowrap items-center gap-4 mt-6">
            <Link to="/search" className="w-2/4 sm:w-1/4 md:w-2/4 lg:w-2/5">
              <Button
                type="primary"
                className="!bg-secondary !w-full !text-base !py-5 md:!py-5"
              >
                Explore All Services
              </Button>
            </Link>

            <Link to="/contactus" className="w-2/4 sm:w-1/4 md:w-2/4 lg:w-2/5">
              <Button className="!border-secondary !text-secondary !w-full !text-base !py-5 md:!py-5">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Right image grid */}
        <div className="md:w-1/2 w-full">
          {/* overflow-hidden added as a hard backstop - a fixed CSS height
              alone doesn't clip children that render taller than it, it
              just lets them spill out visually, which is what was
              overlapping the section below */}
          <div className="relative grid grid-cols-2 gap-3 h-[320px] sm:h-[380px] md:h-[420px] lg:h-[500px] overflow-hidden">
            {/* Left column */}
            <div className="h-full min-h-0">
              <img
                src={images.sunset}
                alt="farmland"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right column - min-h-0 added to the flex container AND
                each image. Flex items default to min-height:auto, which
                stops them shrinking below their own intrinsic aspect-
                ratio height - at wider viewports that intrinsic height
                grew past what flex-1 allocated, pushing this column
                (and the grid box around it) taller than its fixed
                height. min-h-0 removes that floor so flex-1 can
                actually shrink the images to fit. */}
            <div className="flex flex-col gap-3 h-full min-h-0">
              <img
                src={images.building}
                alt="building"
                className="w-full flex-1 min-h-0 object-cover rounded-lg"
              />

              <img
                src={images.agriland}
                alt="aerial plot"
                className="w-full flex-1 min-h-0 object-cover rounded-lg"
              />
            </div>

            {/* Logo overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52 rounded-full bg-white shadow-lg flex flex-col items-center justify-center">
              <img
                src={images.logo}
                alt="logo"
                className="w-32 sm:w-32 xl:w-44 xl:h-auto -ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
