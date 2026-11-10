import React from "react";
import icons from "../../../config/Icons.jsx";
import { motion } from "framer-motion";

import {
  featuresContainer,
  featureCardReveal,
  featureIconReveal,
  featureContentReveal,
} from "../../../animations/aboutus/FeatureCard.jsx";

// Dynamic data - replace with API response
const features = [
  {
    id: 1,
    icon: icons.verifiedDocsIcon,
    iconBg: "bg-[#dbeafe]",
    title: "Verified Documents",
    description: "Ensuring property documents are properly verified.",
  },
  {
    id: 2,
    icon: icons.dtcpApprovedIcon,
    iconBg: "bg-[#ccfbf1]",
    title: "Legal Assistance",
    description: "Expert guidance for a smooth property transaction.",
  },
  {
    id: 3,
    icon: icons.legalIcon,
    iconBg: "bg-[#ede9fe]",
    title: "DTCP Approved",
    description: "Explore properties with valid DTCP approval.",
  },
  {
    id: 4,
    icon: icons.siteVisitIcon,
    iconBg: "bg-[#ffedd5]",
    title: "Site Visit Support",
    description: "Visit and explore your property with our assistance.",
  },
];

const Features = () => {
  return (
    <div className="w-full py-16">
      <motion.div
        variants={featuresContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={featureCardReveal}
            className="bg-gradient-to-br from-[#fdeeea] to-[#eef0fa] rounded-xl p-5 sm:p-6 flex items-start gap-x-4"
          >
            <motion.div
              variants={featureIconReveal}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center shrink-0 ${feature.iconBg} self-center`}
            >
              <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
            </motion.div>

            <motion.div variants={featureContentReveal} className="text-start">
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-base text-gray-500 mt-2 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
