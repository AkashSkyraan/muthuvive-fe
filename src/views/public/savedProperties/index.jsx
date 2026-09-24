import React, { useEffect, useState } from "react";

import ProjectCard from "../../../components/cards/ProjectCard";
import Header from "./header";
import Pagination from "../../../components/common/pagination/Pagination";
import CategoryFilter from "../myProperties/CategoryFilter";
import images from "../../../config/Images";

import { getBookmarkedProperties } from "../../../api/getProperties.api";
import { Link } from "react-router-dom";
import { useLoader } from "../../../context/LoaderContext";

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

  const requestCategories = [
    { value: "all", label: "All" },
    { value: 6, label: "farmland" },
    { value: 1, label: "agriculture" },
    { value: 5, label: "dtcp" },
    { value: 3, label: "investment" },
    { value: 2, label: "commercial-land" },
    { value: 4, label: "Commercial-buildings" },
    { value: 7, label: "residential-buildings" },
  ];

  // ============================================================
  // FILTER STATES
  // ============================================================

  const { setIsLoading } = useLoader();
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Search text
  const [search, setSearch] = useState("");

  // Active category
  const [activeCategory, setActiveCategory] = useState("all");

  // ============================================================
  // PROPERTY DATA
  // ============================================================

  const [properties, setProperties] = useState([]);

  // API loading state
  const [loading, setLoading] = useState(false);

  // ============================================================
  // PAGINATION
  // ============================================================

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  // ============================================================
  // FILTER CHANGE
  // ============================================================

  const handleFilterChange = (values) => {
    setSelectedFilters(values);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // ============================================================
  // CATEGORY CHANGE
  // ============================================================

  const handleCategoryChange = (value) => {
    setActiveCategory(value);
    setCurrentPage(1);
  };

  // ============================================================
  // PAGINATION CHANGE
  // ============================================================

  const handlePageChange = (page) => {
    setCurrentPage(Number(page));
  };

  // ============================================================
  // FETCH SAVED PROPERTIES
  // ============================================================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 9000));

        const payload = {
          user_id: 1,
          search: search,
          page: Number(currentPage),
          limit: 1,
          type: activeCategory,
          // categories: selectedFilters,
        };

        // ------------------------------------------------------
        // API CALL
        // ------------------------------------------------------

        const response = await getBookmarkedProperties(payload);

        const data = response[0] || response || {};
        // console.log(data?.pagination?.totalPages);

        setProperties(data?.properties || []);
        setTotalPages(data?.pagination?.totalPages || 0);

        // ------------------------------------------------------
        // TEMPORARY
        // ------------------------------------------------------

        // setProperties([]);
        // setTotalPages(0);
      } catch (error) {
        console.error("Failed to fetch properties:", error);

        setProperties([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage, activeCategory, search, selectedFilters]);

  // ============================================================
  // SELL PROPERTY
  // ============================================================

  const handleSellProperty = () => {
    // console.log("Sell my property");
  };

  // ============================================================
  // SORT
  // ============================================================

  const handleSort = () => {
    // console.log("Sort clicked");
  };

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto my-5 text-start">
        <Header
          onSearch={handleSearch}
          // filterOptions={filterOptions}
          // selectedFilters={selectedFilters}
          // onFilterChange={handleFilterChange}
          // onSellProperty={handleSellProperty}
          // onSortClick={handleSort}
        />

        <div className="flex flex-col lg:flex-row gap-0 mt-6">
          {/* LEFT SIDE - 35%*/}

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
              {/* ==================================================
                  LOADING
                  ================================================== */}

              {loading ? (
                <div className="flex justify-center py-10">Loading...</div>
              ) : properties.length === 0 ? (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {properties.map((property) => (
                    <Link
                      to={`/properties/${property.category}/${property.prop_id}`}
                    >
                      <ProjectCard key={property.id} listing={property} />
                    </Link>
                  ))}
                </div>
              )}

              {/* ==================================================
                  PAGINATION
                  ================================================== */}

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
