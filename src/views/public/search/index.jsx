import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { FilterOutlined } from "@ant-design/icons";

// ============================================================
// Already built
// ============================================================
import SearchBar from "./SearhPage.jsx";
import ProjectCard from "../../../components/cards/ProjectCard";
import Pagination from "../../../components/common/pagination/Pagination";
import images from "../../../config/Images";

// ============================================================
// To be built separately - the ENTIRE left sidebar (active filter
// chips, Sort By, Price Range, Types Of Property, Ownership Type,
// Amenities, Facing Direction) lives inside this one component.
// index.jsx just hands it the option lists + current filter state +
// change handlers.
// ============================================================
import SearchFilters from "./SearchFilter.jsx";

const PropertySearchResults = () => {
  // ============================================================
  // Filter option definitions - replace with API response later
  // ============================================================
  const sortByOptions = [
    { label: "Available", value: "available" },
    { label: "Sold", value: "sold" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Upcoming", value: "upcoming" },
  ];

  const propertyTypeOptions = [
    { label: "Agriculture Land", value: "agriculture-land" },
    { label: "Farmland", value: "farmland" },
    { label: "Classification", value: "classification" },
    { label: "Commercial Land", value: "commercial-land" },
    { label: "Construction", value: "construction" },
    { label: "DTCP Approved", value: "dtcp-approved" },
  ];

  const ownershipTypeOptions = [
    { label: "Freehold", value: "freehold" },
    { label: "Leasehold", value: "leasehold" },
    { label: "Co-operative Society", value: "co-operative-society" },
    { label: "Power of Attorney", value: "power-of-attorney" },
  ];

  const amenitiesOptions = [
    { label: "Gated Society", value: "gated-society" },
    { label: "Club House", value: "club-house" },
    { label: "Drip Irrigation", value: "drip-irrigation" },
    { label: "Borewell", value: "borewell" },
  ];

  const facingDirectionOptions = [
    { label: "North Facing", value: "north-facing" },
    { label: "East Facing", value: "east-facing" },
    { label: "North East Facing", value: "north-east-facing" },
    { label: "West Facing", value: "west-facing" },
  ];

  // Dynamic data - replace with API response
  const mockProperties = [
    {
      id: 1,
      image: images.agricultureLand,
      category: "Agriculture Land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 SF",
      hospitals: "5 Hospitals",
      schools: "6 Schools",
    },
    {
      id: 2,
      image: images.agricultureLand,
      category: "Agriculture Land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 SF",
      hospitals: "5 Hospitals",
      schools: "5 Schools",
    },
    {
      id: 3,
      image: images.agricultureLand,
      category: "Agriculture Land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 SF",
      hospitals: "5 Hospitals",
      schools: "6 Schools",
    },
    {
      id: 4,
      image: images.agricultureLand,
      category: "Agriculture Land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 SF",
      hospitals: "5 Hospitals",
      schools: "6 Schools",
    },
  ];

  // ============================================================
  // Search bar state
  // ============================================================
  const [location, setLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  // ============================================================
  // One consolidated object for every sidebar filter group.
  // Each key holds an array of currently-selected values for that
  // group (multi-select), except priceMin/priceMax which are single
  // values.
  // ============================================================
  const [filters, setFilters] = useState({
    sortBy: [],
    propertyType: ["agriculture-land"],
    ownershipType: [],
    amenities: [],
    facingDirection: ["north-facing"],
    priceMin: null,
    priceMax: null,
  });

  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);

  // ============================================================
  // Mobile filter drawer state
  // ============================================================
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Generic handler - PropertyFilters calls this with whichever key
  // changed (e.g. "propertyType") and its new array of selected values.
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

  const handleSearch = () => {
    // Wire up the real fetch here later - location, searchCategory,
    // and filters are all already available in this scope.
    // console.log("Search:", { location, searchCategory, filters });
  };

  // Breadcrumb-style summary text next to the results count -
  // built from the first selected propertyType + facingDirection,
  // matching "Agriculture Land / North Facing" in the design.
  const breadcrumbParts = [
    propertyTypeOptions.find((o) => o.value === filters.propertyType[0])?.label,

    facingDirectionOptions.find((o) => o.value === filters.facingDirection[0])
      ?.label,
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto my-5 text-start">
        {/* ============================================================
            SEARCH BAR
            ============================================================ */}
        <SearchBar
          location={location}
          onLocationChange={setLocation}
          category={searchCategory}
          onCategoryChange={setSearchCategory}
          onSearch={handleSearch}
        />

        {/* ============================================================
            MOBILE FILTER BUTTON
            Only visible below lg
            ============================================================ */}
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
          {/* ========================================================
              LEFT SIDE - Filters
              Desktop only
              ======================================================== */}
          <aside className="hidden lg:block w-full lg:w-[30%] shrink-0">
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

          {/* ========================================================
              RIGHT SIDE - Results
              ======================================================== */}
          <div className="w-full lg:w-[65%] mx-auto">
            {/* Results count + breadcrumb */}
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-semibold text-gray-900">1234 Results</span>

              {breadcrumbParts.length > 0 && (
                <span className="text-black font-semibold">
                  {" "}
                  / {breadcrumbParts.join(" / ")}
                </span>
              )}
            </p>

            {loading ? (
              <div className="flex justify-center py-10">Loading...</div>
            ) : mockProperties.length === 0 ? (
              <div className="flex justify-center py-10 text-gray-500">
                No properties found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockProperties.map((property) => (
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

      {/* ============================================================
          MOBILE FILTER DRAWER
          ============================================================ */}

      <Drawer
        title={<span className="text-base">Filters</span>}
        placement="left"
        size="90%"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        styles={{
          body: {
            padding: 16,
          },
        }}
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

        {/* Optional close/apply button */}
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
