import React, { useEffect, useState } from "react";
import { Button } from "antd";
import images from "../../../config/Images.jsx";
import ProjectCard from "../../../components/cards/ProjectCard.jsx";
import { Link } from "react-router-dom";

import { getProperties } from "../../../api/getProperties.api.js";
import { useAuth } from "../../../context/UserContext.jsx";
import { createSlug } from "../../../utils/helper.js";
import { motion } from "framer-motion";

import {
  marketHeading,
  marketText,
  marketCardsContainer,
  marketCard,
  marketButton,
} from "../../../animations/home/MarketList.jsx";
import AnimatedButton from "../../../animations/common/ButtonShine.jsx";

// Dynamic data - now comes from API
const MarketListings = () => {
  const [listings, setListings] = useState([]);

  const { user } = useAuth();
  console.log("abc", user);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getProperties({
          limit: 6,
          status: "posted",
          filter_by_owner: false,
          user_id: user?.id,
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
        <motion.div
          variants={marketHeading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2
            variants={marketText}
            className="text-2xl md:text-3xl font-bold text-gray-900"
          >
            Listing On The Market
          </motion.h2>

          <motion.p
            variants={marketText}
            className="text-base text-gray-500 mt-3 max-w-2xl mx-auto"
          >
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </motion.p>
        </motion.div>

        {/* Renders however many cards the API returns */}
        <motion.div
          variants={marketCardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-start"
        >
          {listings.map((listing) => (
            <motion.div key={listing.id} variants={marketCard}>
              <Link
                to={`/properties/${createSlug(listing.category_name)}/${listing.prop_id}`}
                key={listing.id}
              >
                <ProjectCard listing={listing} user={user?.id || null} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={marketButton}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center mt-10"
        >
          <Link to="search">
            <AnimatedButton type="primary" className="!bg-secondary !text-base">
              Explore All Lands
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketListings;
