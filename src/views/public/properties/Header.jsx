import React from "react";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  headerContent,
  headerFadeUp,
  headerButtonReveal,
} from "../../../animations/properties/PropertiesHeroAnimation";

// data shape: { image, title, description, buttonText?, onButtonClick? }
const Header = ({ data }) => {
  const location = useLocation();

  const {
    image,
    title,
    description,
    buttonText = "Send Enquiries",
    onButtonClick,
  } = data || {};

  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden text-start">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full bg-cover bg-center lg:bg-right"
      />

      {/* Gradient fade so the text stays readable regardless of what's
          behind it in the photo, while the right side of the image
          (where the subject usually is) stays untouched */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      <div className="relative z-10 h-full flex items-center">
        <motion.div
          key={`${location.pathname}-${title}`}
          variants={headerContent}
          initial="hidden"
          animate="visible"
          className="w-[90%] sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto sm:mx-0 sm:ml-[5%]"
        >
          <motion.h1
            variants={headerFadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={headerFadeUp}
            className="text-xs sm:text-base text-gray-200 mt-3 max-w-[75%] md:max-w-[80%]"
          >
            {description}
          </motion.p>
          <motion.div variants={headerButtonReveal}>
            <Link to="/contactus">
              <Button
                onClick={onButtonClick}
                className="!bg-white !text-sm md:!text-base !text-secondary !border-none !font-medium mt-5"
              >
                {buttonText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
