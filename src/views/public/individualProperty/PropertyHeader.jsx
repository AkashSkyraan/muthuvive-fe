import React from "react";
import { Button } from "antd";
import {
  EnvironmentOutlined,
  CopyOutlined,
  SendOutlined,
  BookOutlined,
} from "@ant-design/icons";
import icons from "../../../config/Icons";

const PropertyHeader = ({ data = {} }) => {
  const {
    title = "Commercial Land for sale",
    propertyId = "424233",
    location = "Coimbatore, Ganapathy",
  } = data;

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1400px] py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* ============================================================
              LEFT - Property Information
              ============================================================ */}
          <div className="min-w-0">
            {/* Property Title */}
            <h1 className="text-xl sm:text-2xl text-start font-semibold text-gray-950 leading-tight">
              {title}
            </h1>

            {/* Property Location */}
            <div className="flex items-center gap-x-2 mt-2">
              <EnvironmentOutlined className="text-sm text-gray-800 shrink-0" />

              <span className="text-sm sm:text-base text-secondary">
                {location}
              </span>
            </div>
          </div>

          {/* ============================================================
              RIGHT - Property ID + Actions + Contact Seller
              ============================================================ */}
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            {/* Property ID + Action Icons */}
            <div className="flex items-center justify-end gap-x-5">
              {/* Property ID */}
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Property ID :{" "}
                <span className="font-medium text-gray-900">{propertyId}</span>
              </p>

              {/* Copy */}
              <button
                type="button"
                className="flex items-center justify-center text-gray-800 hover:text-secondary transition-colors duration-200 cursor-pointer w-5"
                aria-label="Copy property ID"
                onClick={() =>
                  navigator.clipboard?.writeText(String(propertyId))
                }
              >
                <img src={icons.copyIcon} />
              </button>

              {/* Share */}
              <button
                type="button"
                className="flex items-center justify-center text-gray-800 hover:text-secondary transition-colors duration-200 cursor-pointer w-5"
                aria-label="Share property"
              >
                <img src={icons.sentIcon} />
              </button>

              {/* Bookmark */}
              <button
                type="button"
                className="flex items-center justify-center text-gray-800 hover:text-secondary transition-colors duration-200 cursor-pointer w-5"
                aria-label="Bookmark property"
              >
                <img src={icons.bookmarkIcon2} />
              </button>
            </div>

            {/* Contact Seller */}
            <Button
              type="primary"
              className="
                !bg-secondary
                !border-secondary
                !h-9
                !px-10
                !text-sm md:!text-base
                w-full
                sm:w-auto
                mt-3
              "
            >
              Contact Seller
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeader;
