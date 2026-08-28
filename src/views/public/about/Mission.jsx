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
    title: "Our Mission",
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
                className="bg-gradient-to-br from-[#fff6f6] to-[#eef3ff] rounded-xl p-6 md:p-8 flex flex-col justify-center"
              >
                <div className="flex items-center gap-x-3">
                  <img src={block.icon} alt={block.title} className="w-6 h-6" />
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {block.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                  {block.description}
                </p>
              </div>
            );
          }

          // Image collage: main image + a smaller overlaid image with a white border
          const overlayPositionClasses =
            block.overlayPosition === "top-left"
              ? "top-3 left-3 sm:-top-4 sm:-left-4"
              : "bottom-3 right-3 sm:-bottom-4 sm:-right-4";

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
                className={`absolute ${overlayPositionClasses} w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg`}
              >
                <img
                  src={block.overlayImage}
                  alt="mission detail"
                  className="w-full h-full object-cover"
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
