import React from "react";
import images from "../../../config/Images.jsx";
import icons from "../../../config/Icons.jsx";
import { motion } from "framer-motion";

import {
  missionContainer,
  missionTextReveal,
  missionContent,
  missionContentItem,
  missionImageReveal,
  missionMainImage,
  missionOverlayReveal,
} from "../../../animations/aboutus/MissionAnimation.jsx";

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
      "Our mission is to make property ownership an accessible, trustworthy and rewarding experience for everyone. We are committed to connecting people with the right land opportunities while ensuring transparency, reliability and customer satisfaction throughout the buying journey.",
  },
  {
    id: 3,
    type: "text",
    icon: icons.targetIcon,
    title: "Our Vision",
    description:
      "We aspire to create a future where owning land is not just a dream but an achievable milestone for individuals and families. By continuously improving our services, identifying promising property opportunities and maintaining the highest standards of transparency, we aim to make a meaningful difference in the real estate industry.",
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
      <motion.div
        variants={missionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {missionBlocks.map((block) => {
          if (block.type === "text") {
            return (
              <motion.div
                key={block.id}
                variants={missionTextReveal}
                className="bg-gradient-to-br from-[#fff6f6] to-[#eef3ff] rounded-xl p-6 md:p-8 flex flex-col justify-center text-start"
              >
                <motion.div variants={missionContent} className="flex flex-col">
                  <motion.div
                    variants={missionContentItem}
                    className="flex items-center gap-x-3"
                  >
                    <img
                      src={block.icon}
                      alt={block.title}
                      className="w-8 h-8"
                    />
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-900">
                      {block.title}
                    </h3>
                  </motion.div>

                  <motion.p
                    variants={missionContentItem}
                    className="text-base text-gray-600 mt-4 leading-relaxed"
                  >
                    {block.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            );
          }

          // Image collage: main image + a smaller overlaid image with a white border
          const overlayPositionClasses =
            block.overlayPosition === "top-left"
              ? "top-0 left-0 sm:-top-2 sm:-left-2 border-b-5 border-r-5 md:border-b-8 md:border-r-8 border-white rounded-2xl md:rounded-xl"
              : "bottom-0 right-0 sm:-bottom-2 sm:-right-2 border-t-5 border-l-5 md:border-t-8 md:border-l-8 border-white rounded-2xl md:rounded-xl";

          return (
            <motion.div
              variants={missionImageReveal}
              key={block.id}
              className="relative h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden"
            >
              <motion.img
                variants={missionMainImage}
                src={block.mainImage}
                alt="mission"
                className="w-full h-full object-cover rounded-xl"
              />

              <motion.div
                variants={missionOverlayReveal}
                className={`absolute ${overlayPositionClasses} w-36 h-26 sm:w-56 sm:h-40 overflow-hidden border-white shadow-lg`}
              >
                <img
                  src={block.overlayImage}
                  alt="mission detail"
                  className="w-full h-full object-center"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Mission;
