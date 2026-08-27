import React from "react";
import logo from "../assets/icons/Logo.png";
import locationIcon from "../assets/icons/location-white.png";
import callIcon from "../assets/icons/call-white.png";
import mailIcon from "../assets/icons/mail-white.png";
import whatsappIcon from "../assets/icons/whatsapp-white.png";
import instagramIcon from "../assets/icons/instagram.png";
import facebookIcon from "../assets/icons/facebook.png";
import twitterIcon from "../assets/icons/twitter.png";

const Footer = () => {
  return (
    <div className="w-full bg-[#141B34] overflow-x-clip">
      <div className="w-[90%] p-4 mx-auto py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
          <div className="">
            <h3 className="text-white text-lg text-start font-semibold mb-5">
              Contact Us
            </h3>

            <ul className="flex flex-col gap-y-3 text-sm text-gray-300">
              <li className="flex items-start text-left gap-x-2">
                <img
                  src={locationIcon}
                  alt="location"
                  className="w-4 h-4 mt-0.5"
                />
                <span>Tarde build Road,Chennai, Viruthnagar,-64100</span>
              </li>
              <li className="flex items-center gap-x-2">
                <img src={callIcon} alt="call" className="w-4 h-4" />
                <a href="#">+91 9923 45672</a>
              </li>
              <li className="flex items-center gap-x-2">
                <img src={mailIcon} alt="mail" className="w-4 h-4" />
                <a href="#">muthview's123@gmail.com</a>
              </li>
            </ul>

            <div className="mt-4 sm:mt-6 bg-white rounded-md px-6 py-1 sm:px-10 sm:py-2 w-fit">
              <img src={logo} alt="Logo" className="" />
            </div>
          </div>

          <div className="">
            <h3 className="text-white text-start text-lg font-semibold mb-3 sm:mb-5">
              Quick Access
            </h3>

            <ul className="flex flex-col text-start gap-y-3 text-sm text-gray-300">
              <li>
                <a href="#">Properties</a>
              </li>
              <li>
                <a href="#">Sell my properties</a>
              </li>
              <li>
                <a href="#">Gallery</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="">
            <h3 className="text-white text-lg text-start font-semibold mb-3 sm:mb-5">
              Properties
            </h3>

            <ul className="flex flex-col text-start gap-y-3 text-sm text-gray-300">
              <li>
                <a href="#">Agricultural</a>
              </li>
              <li>
                <a href="#">Commercial</a>
              </li>
              <li>
                <a href="#">DTCP Approved</a>
              </li>
              <li>
                <a href="#">Farmland</a>
              </li>
            </ul>
          </div>

          <div className="">
            <h3 className="text-white text-lg text-start font-semibold mb-3 sm:mb-5">
              About Us
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed text-left">
              Highlight the best of your properties by using the List Category
              shortcode. You can list categories, types,
            </p>

            <div className="flex items-center gap-x-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-md"
              >
                <img src={whatsappIcon} alt="whatsapp" className="w-9 h-9" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-md"
              >
                <img src={instagramIcon} alt="instagram" className="w-9 h-9" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-md"
              >
                <img src={facebookIcon} alt="facebook" className="w-9 h-9" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-md"
              >
                <img src={twitterIcon} alt="twitter" className="w-9 h-9" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
