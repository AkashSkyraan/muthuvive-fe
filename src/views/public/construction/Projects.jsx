import React, { useState } from "react";
import TabSection from "../properties/TabSection.jsx";
import images from "../../../config/Images.jsx";

// Dynamic data - replace with API response
const tabs = [
  { key: "ongoing", label: "Ongoing Projects" },
  { key: "completed", label: "Completed Projects" },
];

// Dynamic data - replace with API response. Each item's `category` matches
// one of the tab keys above, so the grid below can filter by active tab.
const projects = [
  {
    id: 1,
    image: images.farmLand,
    category: "ongoing",
    title: "General Contracting",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 2,
    image: images.farmLand,
    category: "ongoing",
    title: "Commercial Construction",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 3,
    image: images.farmLand,
    category: "ongoing",
    title: "Residential Construction",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 4,
    image: images.farmLand,
    category: "ongoing",
    title: "Arjunavel Plots",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 5,
    image: images.farmLand,
    category: "ongoing",
    title: "General Contracting",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 6,
    image: images.farmLand,
    category: "completed",
    title: "Completed Villa Project",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
];

const ConstructionProjects = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const filteredProjects = projects.filter(
    (project) => project.category === activeTab,
  );

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        {/* Static heading + description */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Our Construction Projects
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </p>
        </div>

        {/* Dynamic tabs - reused component, labels/keys come from `tabs` */}
        <div className="flex justify-center mt-6">
          <TabSection
            tabs={tabs}
            activeKey={activeTab}
            onChange={setActiveTab}
            alignment="center"
          />
        </div>

        {/* Dynamic project cards - filtered by the active tab */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative h-64 rounded-lg overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white text-sm font-semibold">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                  {project.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConstructionProjects;
