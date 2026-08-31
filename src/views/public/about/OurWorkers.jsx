import React from "react";
import images from "../../../config/Images.jsx";

// Dynamic data - replace with API response
const team = [
  {
    id: 1,
    image: images.worker,
    name: "Raguvaran R",
    role: "Commercial Engineer",
  },
  {
    id: 2,
    image: images.worker,
    name: "Jagadeesh Kumar",
    role: "Farmland Engineer",
  },
  {
    id: 3,
    image: images.worker,
    name: "Vengateshwaran",
    role: "Residential Expert",
  },
  {
    id: 4,
    image: images.worker,
    name: "Gokulakrishna",
    role: "Renovation & Remodeling",
  },
  {
    id: 5,
    image: images.worker,
    name: "Mukeshwar",
    role: "General Engineering",
  },
];

const TeamCard = ({ member }) => (
  <div className="w-[180px] sm:w-[200px] shrink-0">
    <div className="h-[220px] sm:h-[240px] rounded-lg overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>

    <h3 className="text-sm font-semibold text-gray-900 text-center mt-4">
      {member.name}
    </h3>
    <p className="text-xs text-gray-500 text-center mt-1">{member.role}</p>
  </div>
);

const OurTeam = () => {
  return (
    <div className="w-full py-16">
      <div className="text-center px-4">
        <span className="inline-block bg-[#dbe4fb] text-secondary text-xs font-medium px-3 py-1.5 rounded-md">
          Our Team
        </span>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
          Our Construction Workers
        </h2>

        <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto">
          Highlight the best of your properties by using the List Category
          shortcode. You can list categories, types, cities, areas and states of
          your choice.
        </p>
      </div>

      <div className="mt-10 overflow-hidden group">
        <div className="flex gap-x-6 w-max animate-marquee-team group-hover:[animation-play-state:paused]">
          {/* Rendered twice back-to-back so the scroll loops seamlessly */}
          {[...team, ...team, ...team].map((member, index) => (
            <TeamCard key={`${member.id}-${index}`} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
