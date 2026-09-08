import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../../../context/SearchContext";
import Button from "../../../components/common/Button";

function LocationIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PropertyIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 19h16" />
      <path d="M6 16.5 12 11l6 5.5" />
      <path d="M8 16v-4" />
      <path d="M12 12V7" />
      <path d="M16 16v-4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function ChevronDownIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={`transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const propertyTypes = [
  "Agriculture Land",
  "Residential Land",
  "Commercial Land",
  "Farm House",
  "Residential Property",
  "Commercial Property",
];

function SearchPage() {
  const {
    location,
    setLocation,
    propertyType,
    setPropertyType,
    clearLocation,
    clearPropertyType,
    search,
  } = useSearch();

  const [openPropertyType, setOpenPropertyType] = useState(false);

  const propertyTypeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        propertyTypeRef.current &&
        !propertyTypeRef.current.contains(event.target)
      ) {
        setOpenPropertyType(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-stretch gap-3 py-4 px-4 sm:px-3 min-[850px]:flex-row md:items-center md:gap-8 md:py-3">
      {/* Location */}
      <div className="flex min-h-[45px] w-full items-center rounded-sm border border-[#999999] bg-white px-5 md:flex-1">
        <div className="flex shrink-0 items-center text-[#17213D]">
          <LocationIcon />
        </div>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="ml-3 min-w-0 flex-1 bg-transparent text-[16px] text-[#111827] outline-none placeholder:text-[#777]"
        />

        {location && (
          <button
            type="button"
            onClick={clearLocation}
            className="ml-3 flex shrink-0 items-center justify-center text-[#17213D]"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Property Type */}
      <div className="relative w-full md:flex-1" ref={propertyTypeRef}>
        <div className="flex h-[45px] items-center rounded-sm border border-[#999999] bg-white px-5">
          <div className="flex shrink-0 items-center text-[#17213D]">
            <PropertyIcon />
          </div>

          <button
            type="button"
            onClick={() => setOpenPropertyType((prev) => !prev)}
            className="ml-3 flex min-w-0 flex-1 items-center text-left text-[16px] text-[#111827]"
          >
            <span className="truncate">
              {propertyType || "Select property type"}
            </span>
          </button>

          {propertyType && (
            <button
              type="button"
              onClick={clearPropertyType}
              className="ml-3 flex shrink-0 items-center justify-center text-[#17213D]"
            >
              <CloseIcon />
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpenPropertyType((prev) => !prev)}
            className="ml-3 flex shrink-0 items-center text-[#17213D]"
          >
            <ChevronDownIcon open={openPropertyType} />
          </button>
        </div>

        {/* Dropdown */}
        {openPropertyType && (
          <div className="absolute left-0 right-0 top-[58px] z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setPropertyType(type);
                  setOpenPropertyType(false);
                }}
                className={`block w-full px-5 py-3 text-left text-sm transition hover:bg-gray-50 ${
                  propertyType === type
                    ? "bg-gray-50 font-medium text-blue-600"
                    : "text-gray-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      <Button
        type="primary"
        htmlType="button"
        onClick={search}
        className="!h-10 w-full shrink-0 rounded-lg px-11 text-[18px] font-medium text-white transition !bg-blue hover:!bg-blue min-[850px]:!w-25"
      >
        Search
      </Button>
    </div>
  );
}

export default SearchPage;
