import React from "react";
import icons from "../../../config/Icons.jsx";

// Dynamic data - replace with API response
const features = [
  {
    id: 1,
    icon: icons.verifiedDocsIcon,
    iconBg: "bg-[#dbeafe]",
    title: "Verified Documents",
    description:
      "Highlight the best of your properties by using the List Category shortcode. You can list categories, types, cities, areas and states of your choice.",
  },
  {
    id: 2,
    icon: icons.dtcpApprovedIcon,
    iconBg: "bg-[#ccfbf1]",
    title: "Verified Documents",
    description:
      "Highlight the best of your properties by using the List Category shortcode. You can list categories, types, cities, areas and states of your choice.",
  },
  {
    id: 3,
    icon: icons.legalIcon,
    iconBg: "bg-[#ede9fe]",
    title: "Legal Assistance",
    description:
      "Highlight the best of your properties by using the List Category shortcode. You can list categories, types, cities, areas and states of your choice.",
  },
  {
    id: 4,
    icon: icons.siteVisitIcon,
    iconBg: "bg-[#ffedd5]",
    title: "Legal Assistance",
    description:
      "Highlight the best of your properties by using the List Category shortcode. You can list categories, types, cities, areas and states of your choice.",
  },
];

const Features = () => {
  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-gradient-to-br from-[#fdeeea] to-[#eef0fa] rounded-xl p-5 sm:p-6 flex items-start gap-x-4"
          >
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center shrink-0 ${feature.iconBg} self-center`}
            >
              <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
            </div>

            <div className="text-start">
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-base text-gray-500 mt-2 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
