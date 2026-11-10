import React, { useEffect, useState } from "react";
import { Button } from "antd";
import {
  CrownOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import icons from "../../config/Icons.jsx";
import { CircleSmall } from "lucide-react";
import { getSubscriptionPlans } from "../../api/subscriptionPlans.api.js";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { myPropertyCardVariants } from "../../animations/myproperties/MyPropertiesAnimation.jsx";

const MyPropertyCard = ({ data }) => {
  const {
    cover_image,
    prop_name,
    prop_id,
    category,
    category_name,
    state,
    district,
    city,
    requested_at,
    approved_at,
    rejected_at,
    rejected_reason,
    amenities,
    property_highs,
    purchase_plan,
    purchased_at,
  } = data;

  const categorySlugMap = {
    3: "agriculture-land",
    4: "commercial-land",
    6: "investment-land",
    7: "commercial-building",
    8: "residential-building",
  };
  // ----------------------------------------------------------
  // Plan Details
  // ----------------------------------------------------------
  const navigate = useNavigate();

  const [planDetails, setPlanDetails] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);

  // ----------------------------------------------------------
  // Get Plan Details
  // ----------------------------------------------------------

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!purchase_plan) {
        setPlanDetails(null);
        return;
      }

      try {
        setPlanLoading(true);

        const payload = {
          plan_id: purchase_plan,
        };

        // console.log("Plan Details Payload:", payload);

        const response = await getSubscriptionPlans(payload);

        // console.log("Plan Details Response:", response);

        const planData = response[0] || response;

        setPlanDetails(planData);
      } catch (error) {
        console.error("Failed to fetch plan details:", error);
        setPlanDetails(null);
      } finally {
        setPlanLoading(false);
      }
    };

    fetchPlanDetails();
  }, [purchase_plan]);

  // ----------------------------------------------------------
  // Format date
  // ----------------------------------------------------------

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // ----------------------------------------------------------
  // Decide which status date to show
  // ----------------------------------------------------------

  const getStatusDate = () => {
    if (rejected_at) {
      return {
        label: "Rejected On",
        date: formatDate(rejected_at),
      };
    }

    if (approved_at) {
      return {
        label: "Approved On",
        date: formatDate(approved_at),
      };
    }

    if (requested_at) {
      return {
        label: "Posted On",
        date: formatDate(requested_at),
      };
    }

    return null;
  };

  const statusDateInfo = getStatusDate();

  // ----------------------------------------------------------
  // Rejected reason
  // ----------------------------------------------------------

  const showRejectedReason =
    rejected_at !== null &&
    rejected_at !== undefined &&
    rejected_reason !== null &&
    rejected_reason !== undefined &&
    String(rejected_reason).trim() !== "";

  // ----------------------------------------------------------
  // Plan Expiry
  // ----------------------------------------------------------

  const getExpiredInDays = (expiredAt) => {
    if (!expiredAt) {
      return null;
    }

    const today = new Date();

    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const expiredDate = new Date(expiredAt);

    if (Number.isNaN(expiredDate.getTime())) {
      return null;
    }

    const expiredDateOnly = new Date(
      expiredDate.getFullYear(),
      expiredDate.getMonth(),
      expiredDate.getDate(),
    );

    const difference = expiredDateOnly.getTime() - todayDate.getTime();

    return Math.floor(difference / (1000 * 60 * 60 * 24));
  };

  const expiredInDays = getExpiredInDays(planDetails?.expired_at);

  const handleViewMore = () => {
    const categorySlug = categorySlugMap[Number(category)];

    if (!categorySlug || !prop_id) {
      console.error("Category or property ID is missing");
      return;
    }

    navigate(`/properties/${categorySlug}/${prop_id}`);
  };

  return (
    <motion.div
      variants={myPropertyCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-gray-100 rounded-xl p-4"
    >
      <div className="flex flex-col sm:flex-row gap-7">
        {/* Image */}
        <div className="w-full h-40 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0">
          <motion.img
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={cover_image?.url}
            alt={prop_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 text-start">
          {/* Title row + status date */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
            <h3 className="text-base sm:text-base font-semibold text-gray-900">
              {prop_name}
            </h3>

            {statusDateInfo && (
              <span
                className={`text-sm shrink-0 ${
                  rejected_at ? "text-[#d41010]" : "text-gray-500"
                }`}
              >
                {statusDateInfo.label} {statusDateInfo.date}
              </span>
            )}
          </div>

          {/* Category badge */}
          {category_name && (
            <span className="inline-block bg-blue-50 text-secondary text-sm font-medium px-3 py-1 rounded-md mt-2">
              {category_name}
            </span>
          )}

          {/* Location */}
          {(city || district || state) && (
            <div className="flex items-center gap-x-1.5 mt-2">
              <img
                src={icons.locationBlackIcon}
                alt="location"
                className="w-3.5 h-3.5 shrink-0"
              />

              <span className="text-sm text-secondary truncate">
                {[city, district, state].filter(Boolean).join(", ")}
              </span>
            </div>
          )}

          {/* Amenities + Property Highlights */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mt-2">
            {amenities?.name && (
              <div className="flex items-center gap-x-1.5 max-w-[45%]">
                <CircleSmall className="w-5 h-5 shrink-0" />

                <span
                  className="text-sm text-gray-500 truncate"
                  title={amenities.name}
                >
                  {amenities.name}
                </span>
              </div>
            )}

            {property_highs?.name && (
              <div className="flex items-center gap-x-1.5 max-w-[45%]">
                <CircleSmall className="w-5 h-5 shrink-0" />

                <span
                  className="text-sm text-gray-500 truncate"
                  title={property_highs.name}
                >
                  {property_highs.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 pt-3 border-t border-gray-100">
        <div className="flex-1 min-w-0">
          {showRejectedReason ? (
            <div className="flex items-start gap-x-1.5 !items-end">
              <ExclamationCircleOutlined className="text-red-500 mt-0.5 shrink-0" />

              <p className="text-sm truncate">
                <span className="font-bold text-[#d41010]">
                  Rejected Reason :
                </span>{" "}
                <span className="text-[#d41010]">{rejected_reason}</span>
              </p>
            </div>
          ) : purchase_plan ? (
            <div className="flex flex-nowrap items-center gap-x-3 gap-y-2">
              {/* Plan */}
              <span className="inline-flex items-center gap-x-1.5 bg-secondary border-2 [border-image:linear-gradient(to_right,#EDBB04,#FFE449)_1] text-white text-sm font-medium px-3 py-1.5 rounded-md">
                <img
                  src={icons.diamondIcon}
                  alt="location"
                  className="w-5.5 h-5.5 shrink-0"
                />

                {planLoading
                  ? "Loading..."
                  : planDetails?.duration?.toLowerCase() === "year"
                    ? "365 Days Plan"
                    : planDetails?.duration || ""}
              </span>

              {/* Expiry */}
              {expiredInDays !== null && (
                <span
                  className={`inline-flex items-center gap-x-1.5 text-sm font-medium ${
                    expiredInDays <= 0 ? "text-[#d41010]" : "text-[#d41010]"
                  }`}
                >
                  <ClockCircleOutlined />

                  {expiredInDays > 0
                    ? `Expires In ${purchased_at} Days`
                    : "Plan Expired"}
                </span>
              )}
            </div>
          ) : null}
        </div>

        <Button
          onClick={handleViewMore}
          className="!border-secondary !text-secondary !font-medium shrink-0 w-full sm:w-auto !text-base hover:!bg-secondary hover:!text-white transition-colors duration-400 ease-in-out"
        >
          View More
        </Button>
      </div>
    </motion.div>
  );
};

export default MyPropertyCard;
