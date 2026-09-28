import React from "react";
import ProjectCard from "../../../components/cards/ProjectCard";
import { Link } from "react-router-dom";

// listings shape: array of the same objects ProjectCard already expects
// { id, image, category, title, price, address, area, hospitals, schools }
// Renders one ProjectCard per item - however many the API returns.
const PropertyGrid = ({ listings = [] }) => {
  if (listings.length === 0) {
    return (
      <div className="w-full py-16 text-center text-sm text-gray-500">
        No properties found.
      </div>
    );
  }

  const categorySlugMap = {
    1: "agriculture-land",
    2: "commercial-land",
    3: "investment-land",
    4: "commercial-building",
    7: "residential-building",
  };

  return (
    <div className="w-full py-10">
      <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
        {listings.map((listing) => (
          <Link
            to={`/properties/${categorySlugMap[listing?.category]}/${listing.prop_id}`}
          >
            <ProjectCard key={listing.id} listing={listing} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
