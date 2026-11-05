import React, { useEffect, useState } from "react";
import { Segmented } from "antd";
import images from "../../../config/Images.jsx";
import TabSection from "../properties/TabSection.jsx";
import { getProperties } from "../../../api/getProperties.api.js";
import { IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

import {
  dtcpSection,
  dtcpCardsContainer,
  dtcpCard,
  dtcpImageTap,
} from "../../../animations/home/DtcpProjectAnimation.jsx";

const tabOptions = [
  {
    key: "available",
    label: "Available",
  },
  {
    key: "sold",
    label: "Sold",
  },
];

const DTCP_TYPE = 2;

// ============================================================
// FORMAT PRICE
// ============================================================

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const price = Number(value);

  if (Number.isNaN(price)) {
    return value;
  }

  // 1 Lakh and above
  if (price >= 100000) {
    const lakh = price / 100000;

    return `${Number(lakh.toFixed(2))}LK`;
  }

  // 1 Thousand and above
  if (price >= 1000) {
    const thousand = price / 1000;

    return `${Number(thousand.toFixed(2))}K`;
  }

  return `${price}`;
};

// ============================================================
// PROJECT CARD
// ============================================================

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      variants={dtcpCard}
      className="relative rounded-lg overflow-hidden h-64 shrink-0 w-full sm:w-[calc(50%-11px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)] group"
    >
      <img
        src={project.cover_image?.url}
        alt={project.prop_name}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

      <div className="absolute top-3 right-3 text-right">
        {/* Rupee + Price */}
        <div className="flex items-center justify-end gap-1">
          <IndianRupee className="w-4 h-4 text-white" />

          <p className="text-white font-semibold text-base">
            {formatPrice(project.min_price)}
          </p>
        </div>

        {/* Area Unit */}
        <p className="text-white text-[12px]">per {project.area_unit}</p>
      </div>

      <div className="absolute bottom-3 left-3 right-3 text-start">
        <h3 className="text-white text-sm font-semibold">
          {project.prop_name}
        </h3>

        <p className="text-gray-300 text-xs mt-1 line-clamp-2">
          {project.city}, {project.district}, {project.state}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const DTCPProjects = () => {
  const [activeTab, setActiveTab] = useState(tabOptions[0].key);

  const [projects, setProjects] = useState([]);

  // ==========================================================
  // FETCH DTCP PROJECTS
  // ==========================================================

  const fetchProjects = async (tab) => {
    try {
      // Convert UI tab value to API status value
      const status = tab === "available" ? "posted" : "sold";

      const response = await getProperties({
        limit: 5,
        type: DTCP_TYPE,
        status,
      });

      const data = response?.data || response || [];

      setProjects(data?.properties || []);
    } catch (error) {
      console.error("Failed to fetch DTCP projects:", error);

      setProjects([]);
    }
  };

  // ==========================================================
  // INITIAL API CALL
  // ==========================================================

  useEffect(() => {
    fetchProjects("available");
  }, []);

  // ==========================================================
  // TAB CHANGE
  // ==========================================================

  const handleTabChange = (value) => {
    setActiveTab(value);

    fetchProjects(value);
  };

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        <motion.div
          variants={dtcpSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Our DTCP Projects
          </h2>

          <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </p>
        </motion.div>

        <motion.div
          variants={dtcpSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.15 }}
          className="mt-6"
        >
          <TabSection
            tabs={tabOptions}
            alignment="center"
            value={activeTab}
            onChange={handleTabChange}
          />
        </motion.div>

        <motion.div
          key={projects.map((project) => project.id).join("-")}
          variants={dtcpCardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap gap-4 mt-12"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DTCPProjects;
