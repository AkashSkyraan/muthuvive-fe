import React from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";

const NearbyProperties = ({ properties = [] }) => {
  return (
    <section className="w-full py-10 text-start">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        Nearby Properties
      </h2>

      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-5">
        {properties.map((listing) => (
          <Link to={`/properties/${listing.category}/${listing.id}`}>
            <ProjectCard key={listing.id} listing={listing} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NearbyProperties;
