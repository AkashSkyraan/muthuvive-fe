import React from "react";
import { Button } from "antd";

// data shape: { image, title, description, buttonText?, onButtonClick? }
const Header = ({ data }) => {
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
        <div className="w-[90%] sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto sm:mx-0 sm:ml-[5%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 mt-3 max-w-md">
            {description}
          </p>

          <Button
            onClick={onButtonClick}
            className="!bg-white !text-secondary !border-none !font-medium mt-5"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
