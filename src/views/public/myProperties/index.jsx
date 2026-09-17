import React, { useEffect, useState } from "react";

import MyPropertyCard from "../../../components/cards/MyProperties";
import Header from "./MyPropertiesHeader";
import Pagination from "../../../components/common/pagination/Pagination";
import CategoryFilter from "./CategoryFilter";
import images from "../../../config/Images";

// ============================================================
// API Service
// ============================================================
// import { getMyProperties } from "../../../services/propertyService";

const MyProperties = () => {
  const filterOptions = [
    {
      id: 1,
      name: "Agriculture Land",
      value: "agriculture-land",
    },
    {
      id: 2,
      name: "Commercial Land",
      value: "commercial-land",
    },
    {
      id: 3,
      name: "Investment",
      value: "investment",
    },
    {
      id: 4,
      name: "Commercial / Residential Buildings",
      value: "commercial-residential-buildings",
    },
  ];
  const mockProperties = [
    {
      id: 1,
      image: images.farmLand,
      title: "Green Valley Agricultural Land",
      category: "Agriculture Land",
      location: "Thanjavur, Tamil Nadu",
      area: "2.5 Acres",
      hospitals: "2 Hospitals nearby",
      schools: "4 Schools nearby",

      statusLabel: "Posted On",
      statusDate: "02-03-2026",
      isRejected: false,

      plan: "365 days plan",
      expiredInDays: "25",
      rejectedReason: "Personal details has been shared",
    },
    {
      id: 2,
      image: images.thanjavur,
      title: "Green Valley Agricultural Land",
      category: "Agriculture Land",
      location: "Thanjavur, Tamil Nadu",
      area: "2.5 Acres",
      hospitals: "2 Hospitals nearby",
      schools: "4 Schools nearby",

      statusLabel: "Posted On",
      statusDate: "02-03-2026",
      isRejected: false,

      plan: "365 days plan",
      expiredInDays: "25",
      rejectedReason: undefined,
    },
    {
      id: 3,
      image: images.agricultureLand,
      title: "Green Valley Agricultural Land",
      category: "Agriculture Land",
      location: "Thanjavur, Tamil Nadu",
      area: "2.5 Acres",
      hospitals: "2 Hospitals nearby",
      schools: "4 Schools nearby",

      statusLabel: "Posted On",
      statusDate: "02-03-2026",
      isRejected: false,

      plan: "365 days plan",
      expiredInDays: "25",
      rejectedReason: undefined,
    },
  ];
  const requestCategories = [
    { label: "All Requests", value: "all" },
    { label: "Requested", value: "requested" },
    { label: "Approved", value: "approved" },
    { label: "Posted", value: "posted" },
    { label: "Sold", value: "sold" },
    { label: "Expired", value: "expired" },
    { label: "Rejected", value: "rejected" },
  ];

  // Selected property categories
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Search text
  const [search, setSearch] = useState("");

  // Properties returned from API
  const [properties, setProperties] = useState([]);

  // API loading state
  const [loading, setLoading] = useState(false);

  // ACTIVE CATEGORY
  const [activeCategory, setActiveCategory] = useState("all");

  // ============================================================
  // FILTER CHANGE
  // ============================================================
  // This function will be passed to Header.
  //
  // Header does not directly manage the main page state.
  // It simply tells this page when the user changes a filter.
  // ============================================================

  const handleFilterChange = (values) => {
    setSelectedFilters(values);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  // ============================================================
  // FETCH PROPERTIES
  // ============================================================
  // Whenever selectedFilters or search changes,
  // this API call will run again.
  // ============================================================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // Data we are sending to the backend
        const payload = {
          categories: selectedFilters,
          search: search,
        };

        // API call
        // const response = await getMyProperties(payload);

        // Store API response in state
        // setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);

        // If API fails, clear the properties
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [selectedFilters, search]);

  // ============================================================
  // SELL PROPERTY
  // ============================================================
  // This can later use navigate("/sell-property")
  // ============================================================

  const handleSellProperty = () => {
    // console.log("Sell my property");
  };

  // ============================================================
  // SORT
  // ============================================================
  // We can add sorting functionality later.
  // ============================================================

  const handleSort = () => {
    // console.log("Sort clicked");
  };

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto my-5">
        <Header
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onSellProperty={handleSellProperty}
          onSortClick={handleSort}
        />

        <div className="flex flex-col lg:flex-row gap-0 mt-6">
          {/* LEFT SIDE - 35%*/}

          <div className="w-full lg:w-[30%] shrink-0 justify-items-center">
            <CategoryFilter
              options={requestCategories}
              value={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* RIGHT SIDE - 65% */}

          <div className="w-full lg:w-[70%]">
            <div className="bg-white border border-gray-100 rounded-xl min-h-[400px] p-4">
              {/* ==================================================
                  LOADING
                  ================================================== */}

              {loading ? (
                <div className="flex justify-center py-10">Loading...</div>
              ) : mockProperties.length === 0 ? (
                /* ================================================
                   EMPTY STATE
                   ================================================ */

                <div className="flex justify-center py-10 text-gray-500">
                  No properties found
                </div>
              ) : (
                /* ================================================
                   PROPERTY LIST
                   ================================================ */

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  {mockProperties.map((property) => (
                    <MyPropertyCard key={property.id} data={property} />
                  ))}
                </div>
              )}
              <div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
