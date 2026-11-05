import React from "react";
import { Input, Select, Button } from "antd";
import hero_image from "../../../assets/images/hero_img.png";
import images from "../../../config/Images.jsx";
import icons from "../../../config/Icons.jsx";
import SearchPage from "../search/SearhPage.jsx";
import { Link } from "react-router-dom";
import PaidAndPost from "../individualProperty/PaidAndPost.jsx";
import {
  heroContainer,
  heroFadeUp,
  heroFadeDown,
} from "../../../animations/home/HeroAnimations.jsx";
import { motion } from "framer-motion";

const features = [
  {
    icon: icons.verifiedDocsIcon,
    iconBg: "bg-[#dbeafe]",
    title: "Verified Documents",
    desc: " Ensuring property documents are properly verified.",
  },
  {
    icon: icons.legalIcon,
    iconBg: "bg-[#ede9fe]",
    title: "Legal Assistance",
    desc: " Expert guidance for a smooth property transaction.",
  },
  {
    icon: icons.dtcpIcon,
    iconBg: "bg-[#d1fae5]",
    title: "DTCP Approved",
    desc: "Explore properties with valid DTCP approval.",
  },

  {
    icon: icons.siteVisitIcon,
    iconBg: "bg-[#ffedd5]",
    title: "Site Visit Support",
    desc: "Visit and explore your property with our assistance.",
  },
];

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={images.heroImage}
        alt="hero-background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-[90%] mx-auto min-h-[85vh] flex flex-col justify-center py-4">
        {/* Search bar */}

        <div className="flex-1 flex items-center rounded-lg px-3 mt-5">
          <motion.div
            variants={heroFadeDown}
            initial="hidden"
            animate="visible"
            className="flex-1 flex items-center rounded-lg px-3"
          >
            <SearchPage />
          </motion.div>
        </div>

        {/* Heading */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 max-w-full md:max-w-[70%]"
        >
          <motion.h1
            variants={heroFadeUp}
            className="text-3xl sm:text-3xl md:text-5xl font-bold text-start text-white leading-tight"
          >
            Find A Place You&rsquo;ll Love To Call Home
          </motion.h1>

          <motion.p
            variants={heroFadeUp}
            className="mt-4 text-base md:text-base text-gray-200 text-start max-w-full md:max-w-[80%]"
          >
            Discover verified properties that match your lifestyle, budget, and
            location. Buy, sell your perfect property with confidence.
          </motion.p>

          <motion.div
            variants={heroFadeUp}
            className="flex flex-wrap items-center gap-4 mt-6 !z-[1]"
          >
            <Link to="/search">
              <Button className=" !z-[1] !bg-white !text-secondary !border-2 !border-transparent !font-medium !py-5 !px-9 !text-base">
                Explore
              </Button>
            </Link>
            <Link to="/contactus">
              <Button
                ghost
                className="!text-white !border-white !font-medium !py-5 !px-7 !border-2 !text-base hover:!bg-white hover:!text-secondary !transition-colors !duration-300 !ease-in-out"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pb-6"
        >
          {features.map((feature) => (
            <motion.div
              variants={heroFadeUp}
              key={feature.title}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-start gap-x-3"
            >
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 self-center ${feature.iconBg}`}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-5 h-5"
                />
              </div>

              <div>
                <h3 className="text-white text-base font-semibold text-start">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm text-start mt-1 w-full">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
