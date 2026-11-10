import React from "react";
import logo from "../assets/icons/Logo.png";
import callIcon from "../assets/icons/call-white.png";
import mailIcon from "../assets/icons/mail-white.png";
import whatsappIcon from "../assets/icons/whatsapp-white.png";
import instagramIcon from "../assets/icons/instagram.png";
import facebookIcon from "../assets/icons/facebook.png";
import twitterIcon from "../assets/icons/twitter.png";
import images from "../config/Images";
import icons from "../config/Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAboutUs } from "../context/AboutusContext";
import { useAuth } from "../context/UserContext";
import { useLoginModal } from "../context/LoginModalContext";

const Footer = () => {
  const { aboutUs, loading, error } = useAboutUs();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { openLoginModal } = useLoginModal();

  const handleFooterNavigation = (path) => {
    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate(path);
    }
  };

  const handleSellProperty = () => {
    if (!user?.id) {
      openLoginModal();
      return;
    }
    navigate("/sell-property");
  };
  return (
    <div className="w-full bg-[#141B34] overflow-x-clip">
      <div className="w-[90%] p-4 mx-auto py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
          <div className="order-4 md:order-none">
            <h3 className="text-white text-xl text-start font-semibold mb-5">
              Contact Us
            </h3>

            <ul className="flex flex-col gap-y-3 text-base text-gray-300">
              <li className="flex items-start text-left gap-x-2">
                <img
                  src={icons.locationWhiteIcon}
                  alt="location"
                  className="w-4 h-4 mt-0.5"
                />
                <span className="truncate" title={aboutUs?.[0]?.address}>
                  {aboutUs?.[0]?.address}
                </span>
              </li>
              <li className="flex items-center gap-x-2">
                <img src={icons.callWhiteIcon} alt="call" className="w-4 h-4" />
                <a href={`tel:+91${aboutUs?.[0]?.mobile}`}>
                  +91 {aboutUs?.[0]?.mobile}
                </a>
              </li>
              <li className="flex items-center gap-x-2">
                <img src={icons.mailIcon} alt="mail" className="w-4 h-4" />
                <a href={`mailto:${aboutUs?.[0]?.email}`}>
                  {aboutUs?.[0]?.email}
                </a>
              </li>
            </ul>

            <div className="mt-4 sm:mt-6 bg-white rounded-md px-6 py-1 sm:px-10 sm:py-2 w-fit">
              <Link
                to="/"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <img
                  src={images.logo}
                  alt="Logo"
                  className="h-9 xs:h-9 sm:h-9 md:h-10 lg:h-11 w-auto"
                />
              </Link>
            </div>
          </div>

          <div className="order-2 md:order-none">
            <h3 className="text-white text-start text-xl font-semibold mb-3 sm:mb-5">
              Quick Access
            </h3>

            <ul className="flex flex-col text-start gap-y-3 text-base text-gray-300">
              {/* <li>
                <Link to="/properties/dtcp-approved">Properties</Link>
              </li> */}
              <li>
                <button onClick={handleSellProperty}>Sell my properties</button>
              </li>
              <li>
                <button onClick={() => handleFooterNavigation("/gallery")}>
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNavigation("/about")}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNavigation("/contactus")}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div className="order-1 md:order-none">
            <h3 className="text-white text-xl text-start font-semibold mb-3 sm:mb-5">
              Properties
            </h3>

            <ul className="flex flex-col text-start gap-y-3 text-base text-gray-300">
              <li>
                <Link to="/properties/agriculture-land">Agricultural</Link>
              </li>
              <li>
                <Link to="/properties/commercial-land">Commercial</Link>
              </li>
              <li>
                <Link to="/properties/dtcp-approved">DTCP Approved</Link>
              </li>
              <li>
                <Link to="/properties/farmland">Farmland</Link>
              </li>
            </ul>
          </div>

          <div className="order-3 md:order-none">
            <h3 className="text-white text-xl text-start font-semibold mb-3 sm:mb-5">
              About Us
            </h3>

            <p className="text-base text-gray-300 leading-relaxed text-left">
              Highlight the best of your properties by using the List Category
              shortcode. You can list categories, types,
            </p>

            <div className="flex items-center gap-x-3 mt-5">
              <a
                href={`https://wa.me/91${aboutUs?.[0]?.mobile}`}
                target="blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-md"
              >
                <img
                  src={icons.whatsappIcon}
                  alt="whatsapp"
                  className="w-9 h-9"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-md"
              >
                <img
                  src={icons.instagramIcon}
                  alt="instagram"
                  className="w-9 h-9"
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-md"
              >
                <img
                  src={icons.facebookIcon}
                  alt="facebook"
                  className="w-9 h-9"
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-md"
              >
                <img
                  src={icons.twitterIcon}
                  alt="twitter"
                  className="w-9 h-9"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom bar – Terms & Privacy */}
      <div className="w-full bg-white">
        <div className="mx-auto flex w-[90%] flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-3 text-xs text-black sm:justify-end">
          <button
            type="button"
            onClick={() => handleFooterNavigation("/terms-and-conditions")}
            className="flex cursor-pointer items-center gap-1.5 transition hover:text-secondary"
          >
            <span className="text-xs">&#9679;</span>
            <span className="underline underline-offset-2 text-xs">
              Terms &amp; Conditions
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleFooterNavigation("/privacy-policy")}
            className="flex cursor-pointer items-center gap-1.5 transition hover:text-secondary"
          >
            <span className="text-xs">&#9679;</span>
            <span className="underline underline-offset-2 text-xs">
              Privacy Policy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
