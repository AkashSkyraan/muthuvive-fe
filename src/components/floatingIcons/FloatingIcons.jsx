import React from "react";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import callFloatIcon from "../../assets/icons/mobile.png";

const FloatingIcons = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-y-3 z-50">
      <a
        href="https://wa.me/919456783490"
        target="blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        <img src={whatsappIcon} alt="whatsapp" className="w-6 h-6" />
      </a>
      <a
        href="tel:+919456783490"
        target="blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        <img src={callFloatIcon} alt="call" className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingIcons;
