import React from "react";
import images from "../../../config/Images.jsx";
import icons from "../../../config/Icons.jsx";

// Dynamic data - replace with API response if this content becomes CMS-driven
const missionBlocks = [
  {
    id: 1,
    type: "image",
    mainImage: images.missio1_img,
    overlayImage: images.mission1_sub_img,
    overlayPosition: "top-left",
  },
  {
    id: 2,
    type: "text",
    icon: icons.viewIcon,
    title: "Our Mission",
    description:
      "Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable, enduring success.Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable, enduring success.Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable, enduring success.",
  },
  {
    id: 3,
    type: "text",
    icon: icons.targetIcon,
    title: "Our Vision",
    description:
      "Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable, enduring success.Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable, enduring success.Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable, enduring success.",
  },
  {
    id: 4,
    type: "image",
    mainImage: images.missio2_img,
    overlayImage: images.mission2_sub_img,
    overlayPosition: "bottom-right",
  },
];

const Mission = () => {
  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {missionBlocks.map((block) => {
          if (block.type === "text") {
            return (
              <div
                key={block.id}
                className="bg-gradient-to-br from-[#fff6f6] to-[#eef3ff] rounded-xl p-6 md:p-8 flex flex-col justify-center text-start"
              >
                <div className="flex items-center gap-x-3">
                  <img src={block.icon} alt={block.title} className="w-8 h-8" />
                  <h3 className="text-xl md:text-3xl font-semibold text-gray-900">
                    {block.title}
                  </h3>
                </div>

                <p className="text-base text-gray-600 mt-4 leading-relaxed">
                  {block.description}
                </p>
              </div>
            );
          }

          // Image collage: main image + a smaller overlaid image with a white border
          const overlayPositionClasses =
            block.overlayPosition === "top-left"
              ? "top-0 left-0 sm:-top-2 sm:-left-2 border-b-5 border-r-5 border-white md:border-b-10 md:border-r-10 rounded-2xl md:rounded-xl"
              : "bottom-0 right-0 sm:-bottom-2 sm:-right-2 border-t-5 border-l-5 border-white md:border-b-10 md:border-r-10 rounded-2xl md:rounded-xl";

          return (
            <div
              key={block.id}
              className="relative h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden"
            >
              <img
                src={block.mainImage}
                alt="mission"
                className="w-full h-full object-cover rounded-xl"
              />

              <div
                className={`absolute ${overlayPositionClasses} w-36 h-26 sm:w-56 sm:h-40 overflow-hidden border-white shadow-lg`}
              >
                <img
                  src={block.overlayImage}
                  alt="mission detail"
                  className="w-full h-full object-center"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mission;
