import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  servicesLeftReveal,
  servicesItemReveal,
  servicesCardsContainer,
  serviceCardReveal,
} from "../../../animations/home/ServicesAnimation.jsx";
import AnimatedButton from "../../../animations/common/ButtonShine.jsx";

const Categories = ({ services = [] }) => {
  const columns = services.length >= 6 ? 3 : 2;
  return (
    <div className="w-full bg-[#eef2fd] py-16">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left content */}
        <motion.div className="lg:w-[35%] shrink-0 text-start">
          <motion.span
            variants={servicesItemReveal}
            className="inline-block bg-[#dbe4fb] text-secondary w-[45%] sm:[35%] text-center text-md font-medium px-5 py-1.5 rounded-md"
          >
            Categories
          </motion.span>

          <motion.h2
            variants={servicesItemReveal}
            className="text-2xl md:text-4xl font-bold text-gray-900 mt-4"
          >
            We Have The Service You Need
          </motion.h2>

          <motion.p
            variants={servicesItemReveal}
            className="text-base text-gray-500 mt-4 leading-relaxed"
          >
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.Highlight the best of your properties by using the
            List Category shortcode.
          </motion.p>
          <motion.div variants={servicesItemReveal}>
            <Link to="/search">
              <AnimatedButton
                type="primary"
                className="!bg-secondary mt-6 !text-base"
              >
                Explore All Services
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right grid */}
        <motion.div
          variants={servicesCardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4 flex-1 text-start`}
        >
          {services.map((service) => (
            <motion.div
              variants={serviceCardReveal}
              key={service.title}
              className="bg-white rounded-lg p-5"
            >
              <div className="w-10 h-10 rounded-md bg-[#eef2fd] flex items-center justify-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-7 h-7"
                />
              </div>

              <h3 className="text-base font-semibold text-gray-900 mt-4">
                {service.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
