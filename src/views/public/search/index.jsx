import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Drawer } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import SearchBar from "./SearhPage.jsx";
import ProjectCard from "../../../components/cards/ProjectCard";
import Pagination from "../../../components/common/pagination/Pagination";
import images from "../../../config/Images";
import SearchFilters from "./SearchFilter.jsx";
import { getAmenities, getPropertyTypes } from "../../../api/search.api.js";
import axiosInstance from "../../../api/axios";
import { useSearch } from "../../../context/SearchContext.jsx";

const PropertySearchResults = () => {
  // ============================================================
  // Filter option definitions
  // ============================================================
  const sortByOptions = [
    { label: "Available", value: "available" },
    { label: "Sold", value: "sold" },
  ];

  const ownershipTypeOptions = [
    { label: "Freehold", value: "freehold" },
    { label: "Leasehold", value: "leasehold" },
    { label: "Co-operative Society", value: "co-operative-society" },
    { label: "Power of Attorney", value: "power-of-attorney" },
  ];

  const facingDirectionOptions = [
    { label: "North Facing", value: 1 },
    { label: "North East Facing", value: 2 },
    { label: "East Facing", value: 3 },
    { label: "South East Facing", value: 4 },
    { label: "South Facing", value: 5 },
    { label: "South West Facing", value: 6 },
    { label: "West Facing", value: 7 },
    { label: "North West Facing", value: 8 },
  ];

  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);

  // ============================================================
  // URL params — source of truth for API fetch
  // ============================================================
  const [searchParams] = useSearchParams();

  const urlLocation = searchParams.get("location") || "";
  const urlPropertyType = searchParams.get("propertyType") || "";

  // ============================================================
  // Local sidebar filters
  // ============================================================
  const [filters, setFilters] = useState({
    sortBy: [],
    propertyType: [],
    ownershipType: [],
    amenities: [],
    facingDirection: [],
    priceMin: null,
    priceMax: null,
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleChipFilterChange = (filterKey, values) => {
    setFilters((prev) => ({ ...prev, [filterKey]: values }));
  };

  const handlePriceChange = (priceMin, priceMax) => {
    setFilters((prev) => ({ ...prev, priceMin, priceMax }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      sortBy: [],
      propertyType: [],
      ownershipType: [],
      amenities: [],
      facingDirection: [],
      priceMin: null,
      priceMax: null,
    });
  };

  // ============================================================
  // FETCH PROPERTIES — URL params + filters change aanaa re-run
  // ============================================================
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/property/list", {
          params: {
            ...(urlLocation && { location: urlLocation }),
            ...(urlPropertyType && { propertyType: urlPropertyType }),
            ...filters,
          },
        });

        const data = response?.data?.data || [];
        setProperties(data);

        // Fallback mock (until API ready)
        // setProperties([]);
      } catch (err) {
        console.error("Fetch properties error:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    // fetchProperties();
  }, [urlLocation, urlPropertyType, filters]);

  // ============================================================
  // Fetch filter options
  // ============================================================
  useEffect(() => {
    (async () => {
      try {
        const [amenities, types] = await Promise.all([
          getAmenities(),
          getPropertyTypes(),
        ]);
        setAmenitiesOptions(amenities || []);
        console.log(types , "type")
        setPropertyTypeOptions(types || []);
      } catch (err) {
        console.error("Filter options fetch error:", err);
      }
    })();
  }, []);

  // ============================================================
  // Breadcrumb
  // ============================================================
  const breadcrumbParts = [
    propertyTypeOptions.find((o) => o.value === filters.propertyType[0])?.label,
    facingDirectionOptions.find((o) => o.value === filters.facingDirection[0])
      ?.label,
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto my-5 text-start">
        {/* SEARCH BAR — no props, reads from context */}
        <SearchBar />

        {/* MOBILE FILTER BUTTON */}
        <div className="flex lg:hidden justify-start mt-4">
          <Button
            type="default"
            icon={<FilterOutlined />}
            onClick={() => setIsFilterOpen(true)}
            className="!h-10 !rounded-md"
          >
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 my-6">
          {/* LEFT — Desktop Filters (STICKY) */}
          <aside
            className="
      hidden
      lg:block
      w-full
      lg:w-[30%]
      shrink-0
      lg:sticky
      lg:top-[80px]
      lg:self-start
      lg:max-h-[calc(100vh-100px)]
      lg:overflow-y-auto
      pr-1
    "
          >
            <SearchFilters
              sortByOptions={sortByOptions}
              propertyTypeOptions={propertyTypeOptions}
              ownershipTypeOptions={ownershipTypeOptions}
              amenitiesOptions={amenitiesOptions}
              facingDirectionOptions={facingDirectionOptions}
              filters={filters}
              onChipChange={handleChipFilterChange}
              onPriceChange={handlePriceChange}
              onClearAll={handleClearAllFilters}
            />
          </aside>

          {/* RIGHT — Results */}
          <div className="w-full lg:w-[65%] mx-auto">
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-semibold text-gray-900">
                {properties.length} Results
              </span>
              {/* 
              {breadcrumbParts.length > 0 && (
                <span className="text-black font-semibold">
                  {" "}
                  / {breadcrumbParts.join(" / ")}
                </span>
              )} */}
            </p>

            {loading ? (
              <div className="flex justify-center py-10">Loading...</div>
            ) : properties.length === 0 ? (
              <div className="flex justify-center py-10 text-gray-500">
                No properties found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {properties.map((property) => (
                  <ProjectCard key={property.id} listing={property} />
                ))}
              </div>
            )}

            <div className="mt-6">
              <Pagination />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <Drawer
        title={<span className="text-base">Filters</span>}
        placement="left"
        size="90%"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        styles={{ body: { padding: 16 } }}
      >
        <SearchFilters
          sortByOptions={sortByOptions}
          propertyTypeOptions={propertyTypeOptions}
          ownershipTypeOptions={ownershipTypeOptions}
          amenitiesOptions={amenitiesOptions}
          facingDirectionOptions={facingDirectionOptions}
          filters={filters}
          onChipChange={handleChipFilterChange}
          onPriceChange={handlePriceChange}
          onClearAll={handleClearAllFilters}
        />

        <Button
          type="primary"
          block
          className="!mt-5 !h-10 !rounded-md !text-base"
          onClick={() => setIsFilterOpen(false)}
        >
          Apply Filters
        </Button>
      </Drawer>
    </div>
  );
};

export default PropertySearchResults;
