import React from "react";
import icons from "../../config/Icons.jsx";

// Renders a single property listing card. Pass one `listing` object with
// { id, image, category, title, price, address, area, hospitals, schools }.
const ProjectCard = ({ listing }) => {
  // console.log(listing);
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 cursor-pointer">
      <div className="relative h-48 sm:h-44 lg:h-48">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />

        <button className="absolute top-2 right-2 w-8 h-8 rounded-md flex items-center justify-center hover:cursor-pointer">
          <img src={icons.bookmarkIcon} alt="bookmark" className="w-5 h-5" />
        </button>

        <span className="absolute bottom-3 right-3 bg-white text-secondary text-sm font-medium px-3 py-1 rounded-md">
          {listing.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">{listing.title}</h3>
        <p className="text-secondary text-base font-semibold mt-1">
          {listing.price}
        </p>

        <div className="flex items-start gap-x-2 mt-3">
          <img
            src={icons.locationBlackIcon}
            alt="location"
            className="w-4 h-4 mt-0.5 shrink-0"
          />
          <p className="text-sm text-gray-500 line-clamp-2">
            {listing.address}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 pt-4 justify-between">
          <div className="flex items-center gap-x-1.5">
            <img src={icons.areaIcon} alt="area" className="w-4 h-4" />
            <span className="text-sm text-gray-500">{listing.area}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <img src={icons.areaIcon} alt="hospitals" className="w-4 h-4" />
            <span className="text-sm text-gray-500">{listing.hospitals}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <img src={icons.areaIcon} alt="schools" className="w-4 h-4" />
            <span className="text-sm text-gray-500">{listing.schools}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
