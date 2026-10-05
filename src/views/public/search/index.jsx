import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Drawer } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import SearchBar from "./SearhPage.jsx";
import ProjectCard from "../../../components/cards/ProjectCard";
import Pagination from "../../../components/common/pagination/Pagination";
import SearchFilters from "./SearchFilter.jsx";

import { getAmenities, getPropertyTypes } from "../../../api/search.api.js";

import axiosInstance from "../../../api/axios";

const DEFAULT_FILTERS = {
  sortBy: ["posted", "sold"],
  propertyType: [],
  ownershipType: [],
  amenities: [],
  facingDirection: [],
  min_price: null,
  max_price: null,
};

const PropertySearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const params = new URLSearchParams(routerLocation.search);
  const urlLocation = searchParams.get("location")?.trim() || "";
  const urlPropertyType = searchParams.get("propertyType")?.trim() || "";

  const sortByOptions = useMemo(
    () => [
      { label: "Available", value: "posted" },
      { label: "Sold", value: "sold" },
    ],
    [],
  );

  const ownershipTypeOptions = useMemo(
    () => [
      { label: "Freehold", value: "freehold" },
      { label: "Leasehold", value: "leasehold" },
      {
        label: "Co-operative Society",
        value: "co-operative-society",
      },
      {
        label: "Power of Attorney",
        value: "power-of-attorney",
      },
    ],
    [],
  );

  const facingDirectionOptions = useMemo(
    () => [
      { label: "North Facing", value: 1 },
      { label: "North East Facing", value: 2 },
      { label: "East Facing", value: 3 },
      { label: "South East Facing", value: 4 },
      { label: "South Facing", value: 5 },
      { label: "South West Facing", value: 6 },
      { label: "West Facing", value: 7 },
      { label: "North West Facing", value: 8 },
    ],
    [],
  );

  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);

  // ============================================================
  // FILTER STATE
  // ============================================================
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // ============================================================
  // RESULT STATE
  // ============================================================
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ============================================================
  // PAGINATION
  // ============================================================
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // ============================================================
  // RESET PAGE WHEN SEARCH/FILTER CHANGES
  // ============================================================
  useEffect(() => {
    setPage(1);
  }, [
    urlLocation,
    urlPropertyType,
    filters.sortBy,
    filters.propertyType,
    filters.ownershipType,
    filters.amenities,
    filters.facingDirection,
    filters.priceMin,
    filters.priceMax,
  ]);

  // ============================================================
  // SYNC PROPERTY TYPE FROM URL
  // ============================================================
  useEffect(() => {
    if (!urlPropertyType) {
      setFilters((prev) => ({
        ...prev,
        propertyType: [],
      }));

      return;
    }

    setFilters((prev) => {
      if (
        prev.propertyType.length === 1 &&
        String(prev.propertyType[0]) === String(urlPropertyType)
      ) {
        return prev;
      }

      return {
        ...prev,
        propertyType: [urlPropertyType],
      };
    });
  }, [urlPropertyType]);

  // ============================================================
  // FILTER CHANGE
  // ============================================================
  const handleChipFilterChange = (key, values) => {
    setFilters((prev) => ({
      ...prev,
      [key]: values,
    }));

    const params = new URLSearchParams(window.location.search);

    if (values?.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }

    navigate(`/search?${params.toString()}`, {
      replace: true,
    });
  };

  const handlePropertyTypeChange = (value) => {
    const params = new URLSearchParams(routerLocation.search);

    if (value !== null && value !== undefined) {
      params.set("propertyType", String(Number(value)));
    } else {
      params.delete("propertyType");
    }

    const query = params.toString();

    navigate(query ? `/search?${query}` : "/search", {
      replace: true,
    });
  };
  // ============================================================
  // PRICE CHANGE
  // ============================================================
  const handlePriceChange = (minPrice, maxPrice) => {
    setFilters((prev) => ({
      ...prev,
      min_price: minPrice,
      max_price: maxPrice,
    }));

    setPage(1);
  };

  // ============================================================
  // CLEAR FILTERS
  // ============================================================
  const handleClearAllFilters = () => {
    setFilters({
      ...DEFAULT_FILTERS,
      propertyType: urlPropertyType ? [urlPropertyType] : [],
    });

    setPage(1);
  };

  // ============================================================
  // CONVERT ARRAY TO API VALUE
  // ============================================================
  const arrayToParam = (value) => {
    if (!Array.isArray(value) || value.length === 0) {
      return undefined;
    }

    return value.join(",");
  };

  // ============================================================
  // FETCH PROPERTIES
  // ============================================================
  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async () => {
      try {
        setLoading(true);

        const params = {
          page,
          limit: 6,

          ...(urlLocation && {
            location: urlLocation,
          }),

          ...(filters.propertyType.length > 0 && {
            type: arrayToParam(filters.propertyType),
          }),

          ...(filters.sortBy.length > 0 && {
            status: arrayToParam(filters.sortBy),
          }),

          ...(filters.ownershipType.length > 0 && {
            ownershipType: arrayToParam(filters.ownershipType),
          }),

          ...(filters.amenities.length > 0 && {
            amenities: arrayToParam(filters.amenities),
          }),

          ...(filters.facingDirection.length > 0 && {
            facingDirection: arrayToParam(filters.facingDirection),
          }),

          ...(filters.min_price !== null &&
            filters.min_price !== undefined && {
              min_price: filters.min_price,
            }),

          ...(filters.max_price !== null &&
            filters.max_price !== undefined && {
              max_price: filters.max_price,
            }),
        };

        const response = await axiosInstance.get("/property/get-property", {
          params,
        });

        if (cancelled) return;

        const responseData = response?.data?.data;

        const data = Array.isArray(responseData?.properties)
          ? responseData.properties
          : [];

        const total = Number(responseData?.pagination?.total) || data.length;

        setProperties(data);
        setTotalResults(total);
      } catch (error) {
        if (cancelled) return;

        console.error(
          "Fetch properties error:",
          error?.response?.data || error,
        );

        setProperties([]);
        setTotalResults(0);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      cancelled = true;
    };
  }, [
    page,
    limit,
    urlLocation,
    filters.propertyType,
    filters.sortBy,
    filters.ownershipType,
    filters.amenities,
    filters.facingDirection,
    filters.min_price,
    filters.max_price,
  ]);

  // ============================================================
  // FETCH FILTER OPTIONS
  // ============================================================
  useEffect(() => {
    let mounted = true;

    const fetchFilterOptions = async () => {
      try {
        const [amenities, types] = await Promise.all([
          getAmenities(),
          getPropertyTypes(),
        ]);

        if (!mounted) return;

        setAmenitiesOptions(Array.isArray(amenities) ? amenities : []);

        setPropertyTypeOptions(Array.isArray(types) ? types : []);
      } catch (error) {
        console.error("Filter options fetch error:", error);

        if (!mounted) return;

        setAmenitiesOptions([]);
        setPropertyTypeOptions([]);
      }
    };

    fetchFilterOptions();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================================
  // PAGE CHANGE
  // ============================================================
  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // LIMIT CHANGE
  // ============================================================
  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit) || 5);
    setPage(1);
  };

  // ============================================================
  // RESULT COUNT
  // ============================================================
  const resultCount = totalResults || properties.length;

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto my-5 text-start">
        <SearchBar />

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

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div
          className="
    flex
    flex-col
    lg:flex-row
    gap-6
    my-6
    lg:h-[calc(100vh-80px)]
    lg:overflow-hidden
  "
        >
          {/* FILTER */}
          <aside
            className="
      hidden
      lg:block
      w-full
      lg:w-[30%]
      shrink-0
      lg:h-full
      lg:overflow-y-auto

      [scrollbar-width:none]
      [-ms-overflow-style:none]
      [&::-webkit-scrollbar]:hidden
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
              onPropertyTypeChange={handlePropertyTypeChange}
            />
          </aside>

          {/* RESULTS - ONLY THIS SCROLLS */}
          <div
            className="
      w-full
      lg:w-[65%]
      mx-auto

      lg:h-full
      lg:overflow-y-auto
      lg:scroll-smooth
      lg:overscroll-contain

      [scrollbar-width:none]
      [-ms-overflow-style:none]
      [&::-webkit-scrollbar]:hidden
    "
          >
            {/* RESULT COUNT */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">
                  {resultCount}
                </span>{" "}
                {resultCount === 1 ? "Result" : "Results"}
              </p>
            </div>

            {/* RESULTS */}
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-gray-200
              border-t-blue-600
            "
                  />

                  <p className="text-sm text-gray-500">Loading properties...</p>
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-base font-medium text-gray-700">
                  No properties found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {properties.map((property, index) => (
                  <ProjectCard
                    key={property.id ?? property.prop_id ?? index}
                    listing={property}
                  />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalResults > 0 && (
              <div className="mt-8 flex justify-center pb-8">
                <Pagination
                  current={page}
                  pageSize={limit}
                  totalPages={Math.ceil(totalResults / 6)}
                  onChange={handlePageChange}
                  onShowSizeChange={(_, size) => handleLimitChange(size)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}
      <Drawer
        title={<span className="text-base font-semibold">Filters</span>}
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

        <Button
          type="primary"
          block
          className="
            !mt-5
            !h-10
            !rounded-md
            !text-base
          "
          onClick={() => setIsFilterOpen(false)}
        >
          Apply Filters
        </Button>
      </Drawer>
    </div>
  );
};

export default PropertySearchResults;
