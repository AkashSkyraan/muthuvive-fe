import React, { useEffect, useState } from "react";
import images from "../../../config/Images.jsx";
import { getConsultant } from "../../../api/aboutus.api.js";

const TeamCard = ({ member }) => (
  <div className="w-[180px] sm:w-[200px] shrink-0">
    <div className="h-[220px] sm:h-[240px] rounded-lg overflow-hidden">
      <img
        src={member.assetUrl}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>

    <h3 className="text-base font-semibold text-gray-900 text-center mt-4">
      {member.name}
    </h3>

    <p className="text-sm text-gray-500 text-center mt-1">{member.role}</p>
  </div>
);

// ============================================================
// MAIN COMPONENT
// ============================================================

const OurTeam = () => {
  const [team, setTeam] = useState([]);

  // ==========================================================
  // FETCH TEAM
  // ==========================================================

  const fetchTeam = async () => {
    try {
      const response = await getConsultant();

      const data = response?.data || response || [];

      setTeam(data);
    } catch (error) {
      console.error("Failed to fetch team members:", error);

      setTeam([]);
    }
  };
  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="w-full py-16">
      <div className="text-center px-4">
        <span className="inline-block bg-[#dbe4fb] text-secondary text-base font-medium px-3 py-1.5 rounded-md">
          Our Team
        </span>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
          Our Construction Workers
        </h2>

        <p className="text-base text-center text-gray-500 mt-3 max-w-2xl mx-auto">
          Highlight the best of your properties by using the List Category
          shortcode. You can list categories, types, cities, areas and states of
          your choice.
        </p>
      </div>

      <div className="mt-10 overflow-hidden group">
        <div className="flex gap-x-6 w-max animate-marquee-team group-hover:[animation-play-state:paused]">
          {/* Rendered three times so the scroll loops seamlessly */}
          {[...team, ...team, ...team].map((member, index) => (
            <TeamCard key={`${member.id}-${index}`} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
