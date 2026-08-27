import React, { useState } from "react";
import { Segmented } from "antd";

const tabOptions = ["Ongoing Projects", "Upcoming", "Sold Projects"];

// Dynamic data - replace with API response
const projects = [
  {
    id: 1,
    image: "",
    price: "₹ 1.5 Lk",
    unit: "Per Cent",
    title: "Arjunavel Plots",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 2,
    image: "",
    price: "₹ 2.5 Lk",
    unit: "Per Cent",
    title: "Arjunavel Plots",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 3,
    image: "",
    price: "₹ 3.5 Lk",
    unit: "Per Cent",
    title: "Arjunavel Plots",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 4,
    image: "",
    price: "₹ 2.5 Lk",
    unit: "Per Cent",
    title: "Arjunavel Plots",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
  {
    id: 5,
    image: "",
    price: "₹ 2.5 Lk",
    unit: "Per Cent",
    title: "Arjunavel Plots",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Naga...",
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="relative rounded-lg overflow-hidden h-64 shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)]">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

      <div className="absolute top-3 right-3 text-right">
        <p className="text-white font-semibold text-sm">{project.price}</p>
        <p className="text-white text-[10px]">{project.unit}</p>
      </div>

      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="text-white text-sm font-semibold">{project.title}</h3>
        <p className="text-gray-300 text-xs mt-1 line-clamp-2">
          {project.address}
        </p>
      </div>
    </div>
  );
};

const DTCPProjects = () => {
  const [activeTab, setActiveTab] = useState(tabOptions[0]);

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Our DTCP Projects
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <Segmented
            options={tabOptions}
            value={activeTab}
            onChange={setActiveTab}
            className="!bg-gray-100 !p-1"
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DTCPProjects;
