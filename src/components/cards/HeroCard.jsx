import React from "react";

import { motion } from "framer-motion";
import {
  bannerContainer,
  bannerFadeUp,
} from "../../animations/contactus/BannerAnimation";

const PageBanner = ({ title, description }) => {
  return (
    <div className="w-full relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Diagonal lighter stripe to mimic the two-tone banner look, done in pure CSS */}
      <div className="absolute inset-0 bg-blue-500/40 [clip-path:polygon(0_0,55%_0,30%_100%,0%_100%)]"></div>
      <div className="absolute inset-0 bg-blue-400/20 [clip-path:polygon(0_0,20%_0,0%_35%)]"></div>

      <motion.div
        variants={bannerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          variants={bannerFadeUp}
          className="text-3xl sm:text-3xl md:text-4xl font-bold text-white"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={bannerFadeUp}
            className="text-sm sm:text-sm lg:text-base text-gray-200 mt-3 max-w-xl w-[85%] md:w-[55%] lg:w-[50%] xl:w-[30%]"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default PageBanner;
