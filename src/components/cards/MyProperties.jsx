import React from "react";
import { Button } from "antd";
import {
  CrownOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import icons from "../../config/Icons.jsx";

const MyPropertyCard = ({ data }) => {
  const {
    image,
    title,
    category,
    location,
    area,
    hospitals,
    schools,
    statusLabel,
    statusDate,
    isRejected,
    plan,
    expiredInDays,
    rejectedReason,
    // onViewMore,
  } = data;
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row gap-7">
        {/* Image */}
        <div className="w-full h-40 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 text-start">
          {/* Title row + status date */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              {title}
            </h3>
            {statusLabel && statusDate && (
              <span
                className={`text-xs shrink-0 ${
                  isRejected ? "text-[#d41010]" : "text-gray-500"
                }`}
              >
                {statusLabel} {statusDate}
              </span>
            )}
          </div>

          {/* Category badge */}
          {category && (
            <span className="inline-block bg-blue-50 text-secondary text-xs font-medium px-3 py-1 rounded-md mt-2">
              {category}
            </span>
          )}

          {/* Location */}
          {location && (
            <div className="flex items-center gap-x-1.5 mt-2">
              <img
                src={icons.locationBlackIcon}
                alt="location"
                className="w-3.5 h-3.5 shrink-0"
              />
              <span className="text-xs text-secondary truncate">
                {location}
              </span>
            </div>
          )}

          {/* Stats row */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mt-2">
            {area && (
              <div className="flex items-center gap-x-1.5">
                <img src={icons.areaIcon} alt="area" className="w-3.5 h-3.5" />
                <span className="text-xs text-gray-500">{area}</span>
              </div>
            )}
            {hospitals && (
              <div className="flex items-center gap-x-1.5">
                <img
                  src={icons.areaIcon}
                  alt="hospitals"
                  className="w-3.5 h-3.5"
                />
                <span className="text-xs text-gray-500">{hospitals}</span>
              </div>
            )}
            {schools && (
              <div className="flex items-center gap-x-1.5">
                <img
                  src={icons.areaIcon}
                  alt="schools"
                  className="w-3.5 h-3.5"
                />
                <span className="text-xs text-gray-500">{schools}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row - conditional content + View More, always present */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 pt-3 border-t border-gray-100">
        <div className="flex-1 min-w-0">
          {rejectedReason ? (
            <div className="flex items-start gap-x-1.5 !items-end">
              <ExclamationCircleOutlined className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs truncate">
                <span className="font-bold text-[#d41010]">
                  Rejected Reason :
                </span>{" "}
                <span className="text-[#d41010]">{rejectedReason}</span>
              </p>
            </div>
          ) : plan ? (
            <div className="flex flex-nowrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-x-1.5 bg-secondary border-2 [border-image:linear-gradient(to_right,#EDBB04,#FFE449)_1] text-white text-xs font-medium px-3 py-1.5 rounded-md">
                {plan}
              </span>
              {typeof expiredInDays === "string" && (
                <span className="inline-flex items-center gap-x-1.5 text-[#d41010] text-xs font-medium">
                  <ClockCircleOutlined />
                  Expired In {expiredInDays} Days
                </span>
              )}
            </div>
          ) : null}
        </div>

        <Button
          onClick={() => {}}
          className="!border-secondary !text-secondary !font-medium shrink-0 w-full sm:w-auto"
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default MyPropertyCard;
