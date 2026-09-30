import React from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const NearbyProperties = ({ properties = [] }) => {
  const { user } = useAuth();
  return (
    <section className="w-full py-10 text-start">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        Nearby Properties
      </h2>

      <div className="grid grid-cols-1 min-[720px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-5">
        {properties.map((listing) => (
          <Link to={`/properties/${listing.category}/${listing.prop_id}`}>
            <ProjectCard key={listing.id} listing={listing} user={user?.id} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NearbyProperties;
