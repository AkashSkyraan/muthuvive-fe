import React, { useEffect, useState } from "react";
import { Button } from "antd";
import images from "../../../config/Images.jsx";
import ProjectCard from "../../../components/cards/ProjectCard.jsx";
import { Link } from "react-router-dom";

import { getProperties } from "../../../api/getProperties.api.js";

// Dynamic data - now comes from API
const MarketListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getProperties({
          limit: 6,
          status: "inprogress",
        });

        const data = response?.data || response || [];

        setListings(data?.properties);
      } catch (error) {
        console.error("Failed to fetch market listings:", error);
        setListings([]);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Listing On The Market
          </h2>

          <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </p>
        </div>

        {/* Renders however many cards the API returns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-start">
          {listings.map((listing) => (
            <Link
              to={`/properties/${listing.category}/${listing.id}`}
              key={listing.id}
            >
              <ProjectCard listing={listing} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="search">
            <Button type="primary" className="!bg-secondary !text-base">
              Explore All Lands
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketListings;
