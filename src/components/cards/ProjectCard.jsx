import React from "react";
import icons from "../../config/Icons.jsx";
import { IndianRupee, LeafyGreen } from "lucide-react";

// Renders a singling card. Pass one `listing` object with
// { id, image, category, title, price, address, area, hospitals, schools }.
const ProjectCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 cursor-pointer">
      <div className="relative h-48 sm:h-44 lg:h-48">
        <img
          src={listing.cover_image?.url}
          alt={listing.prop_name}
          className="w-full h-full object-cover"
        />

        <button className="absolute top-2 right-2 w-8 h-8 rounded-md flex items-center justify-center hover:cursor-pointer">
          <img src={icons.bookmarkIcon} alt="bookmark" className="w-5 h-5" />
        </button>

        <span className="absolute bottom-3 right-3 bg-white text-secondary text-sm font-medium px-3 py-1 rounded-md">
          {listing.category_name}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">
          {listing.prop_name}
        </h3>
        {/* Show price only if category_name is dtcp or farmland */}
        {(listing.category_name === "dtcp" ||
          listing.category_name === "farmland") && (
          <p className="text-secondary text-base font-semibold mt-1">
            Starts from{" "}
            <span className="inline-flex items-center">
              <span className="mr-1">₹</span>
              {Number(listing.min_price).toLocaleString("en-IN")}
            </span>
          </p>
        )}
        <div className="flex items-start gap-x-2 mt-3">
          <img
            src={icons.locationBlackIcon}
            alt="location"
            className="w-4 h-4 mt-0.5 shrink-0"
          />
          <p className="text-sm text-gray-500 line-clamp-2">
            {listing.city}, {listing.district}, {listing.state}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 pt-4 justify-between">
          <div className="flex items-center gap-x-1.5">
            {/* <img src={icons.areaIcon} alt="area" className="w-4 h-4" /> */}
            <LeafyGreen className="w-4 h-4" />
            <span className="text-sm text-gray-500">{listing.area}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            {/* <img src={icons.areaIcon} alt="hospitals" className="w-4 h-4" /> */}
            <LeafyGreen className="w-4 h-4" />
            <span className="text-sm text-gray-500">{listing.hospitals}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            {/* <img src={icons.areaIcon} alt="schools" className="w-4 h-4" /> */}
            <LeafyGreen className="w-4 h-4" />
            <span className="text-sm text-gray-500">{listing.schools}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
