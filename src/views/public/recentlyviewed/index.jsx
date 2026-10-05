import React, { useEffect, useState } from "react";

import ProjectCard from "../../../components/cards/ProjectCard";
import Header from "./Header";
import Pagination from "../../../components/common/pagination/Pagination";
import { getRecentViews } from "../../../api/auth.api";
import { useAuth } from "../../../context/UserContext";

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
    { label: "All Requests", value: "all" },
    { label: "Requested", value: "requested" },
    { label: "Approved", value: "approved" },
    { label: "Posted", value: "posted" },
    { label: "Sold", value: "sold" },
    { label: "Expired", value: "expired" },
    { label: "Rejected", value: "rejected" },
  ];

  // ============================================================
  // STATE
  // ============================================================

  const [selectedFilters, setSelectedFilters] = useState([]);

  const [search, setSearch] = useState("");

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(false);

  const [activeCategory, setActiveCategory] = useState("all");

  // Pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const { user } = useAuth();

  const user_id = user?.id;

  // ============================================================
  // FILTER CHANGE
  // ============================================================

  const handleFilterChange = (values) => {
    setSelectedFilters(values);

    // Filter change -> page 1
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = (value) => {
    setSearch(value);

    // Search -> page 1
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // ============================================================
  // FETCH RECENT VIEWS
  // ============================================================

  useEffect(() => {
    const fetchRecentViews = async () => {
      if (!user_id) {
        setProperties([]);
        return;
      }

      try {
        setLoading(true);

        const response = await getRecentViews({
          user_id,
          page: pagination.page,
          limit: pagination.limit,
        });

        // console.log("Recent Views:", response);

        if (response?.success === 1) {
          const recentData = response?.data?.[0];

          setProperties(recentData?.properties || []);

          setPagination((prev) => ({
            ...prev,
            page: recentData?.pagination?.page || prev.page,
            limit: recentData?.pagination?.limit || prev.limit,
            total: recentData?.pagination?.total || 0,
            totalPages: recentData?.pagination?.totalPages || 0,
          }));
        } else {
          setProperties([]);

          setPagination((prev) => ({
            ...prev,
            total: 0,
            totalPages: 0,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch recent views:", error);

        setProperties([]);

        setPagination((prev) => ({
          ...prev,
          total: 0,
          totalPages: 0,
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchRecentViews();
  }, [user_id, pagination.page, pagination.limit]); // ============================================================
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

  // ============================================================
  // PAGINATION
  // ============================================================

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto my-5 text-start">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Header
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onSellProperty={handleSellProperty}
          onSortClick={handleSort}
        />

        <div className="flex flex-col lg:flex-row gap-0 mt-6">
          {/* ===================================================
              LEFT SIDE
          =================================================== */}

          {/* 
          <div className="w-full lg:w-[30%] shrink-0 justify-items-center">
            <CategoryFilter
              options={requestCategories}
              value={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
          */}

          {/* ===================================================
              RIGHT SIDE
          =================================================== */}

          <div className="w-full lg:w-[95%] mx-auto">
            <div className="bg-white  rounded-xl min-h-[400px] p-4">
              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <p className="text-gray-500">Loading recent views...</p>
                </div>
              ) : properties.length === 0 ? (
                /* ===============================================
                   EMPTY
                =============================================== */

                <div className="flex flex-col justify-center items-center py-16">
                  <p className="text-gray-500">No recently viewed properties</p>
                </div>
              ) : (
                /* ===============================================
                   PROPERTY LIST
                =============================================== */

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {properties?.map((property) => (
                    <ProjectCard
                      key={property?.prop_id}
                      listing={property}
                      user={user_id}
                    />
                  ))}
                </div>
              )}

              {/* =================================================
                  PAGINATION
              ================================================= */}

              {pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
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
