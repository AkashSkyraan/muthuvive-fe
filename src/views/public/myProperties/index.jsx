import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/UserContext";

import MyPropertyCard from "../../../components/cards/MyProperties";
import Header from "./MyPropertiesHeader";
import Pagination from "../../../components/common/pagination/Pagination";
import CategoryFilter from "./CategoryFilter";

import { getProperties } from "../../../api/getProperties.api";

const MyProperties = () => {
  const { user } = useAuth();

  // ==========================================================
  // Property Filter Options
  // ==========================================================

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

  // ==========================================================
  // Request Categories
  // ==========================================================

  const requestCategories = [
    { label: "All Requests", value: "all" },
    { label: "Requested", value: "requested" },
    { label: "Approved", value: "approved" },
    { label: "Posted", value: "posted" },
    { label: "Sold", value: "sold" },
    { label: "Expired", value: "expired" },
    { label: "Rejected", value: "rejected" },
  ];

  // ==========================================================
  // Selected Property Categories
  // ==========================================================

  const [selectedFilters, setSelectedFilters] = useState([]);

  // ==========================================================
  // Search
  // ==========================================================

  const [search, setSearch] = useState(null);

  // ==========================================================
  // Active Request Category
  // ==========================================================

  const [activeCategory, setActiveCategory] = useState(null);

  // ----------------------------------------------------------
  // Pagination
  // ----------------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  // ----------------------------------------------------------
  // Total properties
  // ----------------------------------------------------------

  const [totalPages, setTotalPages] = useState(0);

  // ==========================================================
  // Properties
  // ==========================================================

  const [properties, setProperties] = useState([]);

  // ==========================================================
  // Loading
  // ==========================================================

  const [loading, setLoading] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(Number(page));
  };

  // ==========================================================
  // Category Change
  // ==========================================================

  const handleCategoryChange = (value) => {
    setActiveCategory(value);
  };

  // ==========================================================
  // Fetch Properties
  // ==========================================================
  //
  // API runs whenever:
  //
  // 1. User changes property checkbox filter
  // 2. User changes search
  // 3. User changes request category
  // 4. User changes
  //
  // ==========================================================

  useEffect(() => {
    const fetchProperties = async () => {
      // if (!user?.id) {
      //   setProperties([]);
      //   return;
      // }

      try {
        setLoading(true);

        const payload = {
          user_id: 1,
          type: selectedFilters,
          search: search,
          status: activeCategory,
          limit: 6,
          page: Number(currentPage),
        };

        const response = await getProperties(payload);

        // console.log("My Properties Response:", response);

        const responseProperties = response?.properties;
        const responsePagination = response?.pagination;

        setProperties(responseProperties);
        setTotalPages(responsePagination?.totalPages);
      } catch (error) {
        console.error("Failed to fetch properties:", error);

        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [selectedFilters, search, activeCategory, currentPage]);

  // ==========================================================
  // Sell Property
  // ==========================================================

  const handleSellProperty = () => {
    // console.log("Sell my property");
  };

  // ==========================================================
  // Sort
  // ==========================================================

  const handleSort = () => {
    // console.log("Sort clicked");
  };

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto my-5">
        <Header
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          setSearch={setSearch}
          onSellProperty={handleSellProperty}
          onSortClick={handleSort}
        />

        <div className="flex flex-col lg:flex-row gap-0 mt-6">
          {/* LEFT SIDE - 35% */}

          <div className="w-full lg:w-[30%] shrink-0 justify-items-center">
            <CategoryFilter
              options={requestCategories}
              value={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {/* RIGHT SIDE - 65% */}

          <div className="w-full lg:w-[70%]">
            <div className="bg-white border border-gray-100 rounded-xl min-h-[400px] p-4">
              {loading ? (
                <div className="flex justify-center py-10">Loading...</div>
              ) : properties.length === 0 ? (
                <div className="flex justify-center py-10 text-gray-500">
                  No properties found
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  {properties.map((property) => (
                    <MyPropertyCard key={property.id} data={property} />
                  ))}
                </div>
              )}
              {totalPages > 0 && (
                <div>
                  <Pagination
                    current={currentPage}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
