import React, { useEffect, useState } from "react";

import ProjectCard from "../../../components/cards/ProjectCard";
import Header from "./header";
import Pagination from "../../../components/common/pagination/Pagination";
import CategoryFilter from "../myProperties/CategoryFilter";

import { getBookmarkedProperties } from "../../../api/getProperties.api";

import { Link } from "react-router-dom";
import { useLoader } from "../../../context/LoaderContext";
import { useAuth } from "../../../context/UserContext";
import axiosInstance from "../../../api/axios";

const MyProperties = () => {
  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  // ============================================================
  // CATEGORY DATA
  // ============================================================

  const [requestCategories, setRequestCategories] = useState([
    {
      value: "all",
      label: "All",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("all");

  // ============================================================
  // SEARCH
  // ============================================================

  const [search, setSearch] = useState("");

  // ============================================================
  // PROPERTY DATA
  // ============================================================

  const [properties, setProperties] = useState([]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const LIMIT = 10;

  // ============================================================
  // GET PROPERTY CATEGORIES
  // ============================================================
  //
  // Separate API:
  //
  // GET /property/get-prop-category
  //
  // Expected:
  //
  // {
  //   success: 1,
  //   data: [
  //     {
  //       id: 1,
  //       name: "Agriculture"
  //     },
  //     {
  //       id: 2,
  //       name: "Commercial"
  //     }
  //   ]
  // }
  //
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    const fetchPropertyCategories = async () => {
      try {
        const response = await axiosInstance.get("/property/properties");

        if (cancelled) return;

        // ========================================================
        // GET CATEGORY DATA
        // ========================================================

        const responseData = response?.data?.data;

        const categories = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData?.categories)
            ? responseData.categories
            : [];

        // ========================================================
        // MAP id + name
        // ========================================================

        const categoryOptions = categories
          .filter(
            (item) => item?.id !== undefined && item?.id !== null && item?.name,
          )
          .map((item) => ({
            value: Number(item.id),
            label: String(item.name).trim(),
          }));

        // ========================================================
        // REMOVE DUPLICATES
        // ========================================================

        const uniqueCategories = Array.from(
          new Map(categoryOptions.map((item) => [item.value, item])).values(),
        );

        // ========================================================
        // ALL ALWAYS FIRST
        // ========================================================

        setRequestCategories([
          {
            value: "all",
            label: "All",
          },
          ...uniqueCategories,
        ]);
      } catch (error) {
        if (cancelled) return;

        console.error(
          "Failed to fetch property categories:",
          error?.response?.data || error,
        );

        // Keep All if API fails
        setRequestCategories([
          {
            value: "all",
            label: "All",
          },
        ]);
      }
    };

    fetchPropertyCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // CATEGORY CHANGE
  // ============================================================

  const handleCategoryChange = (value) => {
    setActiveCategory(value);
    setCurrentPage(1);
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = (value) => {
    setSearch(value || "");
    setCurrentPage(1);
  };

  // ============================================================
  // PAGINATION
  // ============================================================

  const handlePageChange = (page) => {
    setCurrentPage(Number(page) || 1);
  };

  // ============================================================
  // GET BOOKMARKED PROPERTIES
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async () => {
      if (!user?.id) {
        setProperties([]);
        setTotalPages(0);
        return;
      }

      try {
        setIsLoading(true);

        const payload = {
          user_id: Number(user.id),
          search: search.trim(),
          page: currentPage,
          limit: LIMIT,

          // ======================================================
          // ONLY SEND TYPE WHEN CATEGORY SELECTED
          // ======================================================

          ...(activeCategory !== "all" && {
            type: Number(activeCategory),
          }),
        };

        console.log("BOOKMARK PAYLOAD:", payload);

        const response = await getBookmarkedProperties(payload);

        if (cancelled) return;

        const data = Array.isArray(response)
          ? response?.[0] || {}
          : response || {};

        const propertyList = Array.isArray(data?.properties)
          ? data.properties
          : [];

        setProperties(propertyList);

        setTotalPages(Number(data?.pagination?.totalPages) || 0);
      } catch (error) {
        if (cancelled) return;

        console.error(
          "Failed to fetch bookmarked properties:",
          error?.response?.data || error,
        );

        setProperties([]);
        setTotalPages(0);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      cancelled = true;
    };
  }, [user?.id, currentPage, activeCategory, search, setIsLoading]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="w-full">
      <div className="mx-auto my-5 w-[95%] text-start">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <Header onSearch={handleSearch} />

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="mt-6 flex flex-col gap-0 lg:flex-row">
          {/* ====================================================
              CATEGORY FILTER
          ==================================================== */}

          <div className="w-full shrink-0 justify-items-center lg:w-[30%]">
            <CategoryFilter
              options={requestCategories}
              value={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {/* ====================================================
              PROPERTY LIST
          ==================================================== */}

          <div className="w-full lg:w-[70%]">
            <div className="min-h-[400px] rounded-xl border border-gray-100 bg-white p-4">
              {properties.length === 0 ? (
                <div className="flex min-h-[350px] items-center justify-center text-gray-500">
                  No properties found
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {properties.map((property) => (
                    <Link
                      key={property?.prop_id}
                      to={`/properties/${property?.category}/${property?.prop_id}`}
                      className="block"
                    >
                      <ProjectCard listing={property} user={user?.id} />
                    </Link>
                  ))}
                </div>
              )}

              {/* ==================================================
                  PAGINATION
              ================================================== */}

              {totalPages > 1 && (
                <div className="mt-6">
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
