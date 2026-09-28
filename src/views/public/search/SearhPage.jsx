import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../../../context/SearchContext";
import Button from "../../../components/common/Button";
import axiosInstance from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

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

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function SearchPage() {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const {
    location,
    setLocation,
    propertyType,
    setPropertyType,
    clearLocation,
    clearPropertyType,
  } = useSearch();

  // =========================
  // STATES
  // =========================

  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);
    const queryPropertyType = params.get("propertyType");

    if (!queryPropertyType) {
      return;
    }

    const numericId = Number(queryPropertyType);

    if (!Number.isNaN(numericId) && Number(propertyType) !== numericId) {
      setPropertyType(numericId);
    }
  }, [routerLocation.search]);

  const handlePropertyTypeChange = (id) => {
    const numericId = Number(id);

    setPropertyType(numericId);
    setOpenPropertyType(false);

    const params = new URLSearchParams(routerLocation.search);

    if (numericId) {
      params.set("propertyType", String(numericId));
    } else {
      params.delete("propertyType");
    }

    const query = params.toString();

    navigate(query ? `/search?${query}` : "/search", {
      replace: true,
    });
  };

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [openPropertyType, setOpenPropertyType] = useState(false);

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locationSearched, setLocationSearched] = useState(false);

  const propertyTypeRef = useRef(null);
  const locationRef = useRef(null);

  // =========================
  // GET PROPERTY TYPES
  // =========================
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axiosInstance.get("/property/properties");
        const data = response?.data?.data || [];

        setPropertyTypes(data);
      } catch (error) {
        console.error("Property types fetch error:", error);
        setPropertyTypes([]);
      }
    };

    fetchPropertyTypes();
  }, []);

  // =========================
  // CLICK OUTSIDE
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        propertyTypeRef.current &&
        !propertyTypeRef.current.contains(event.target)
      ) {
        setOpenPropertyType(false);
      }

      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // LOCATION SEARCH API
  // =========================
  useEffect(() => {
    const keyword = location.trim();

    if (keyword.length < 3) {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
      setLocationSearched(false);
      setLoadingLocations(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoadingLocations(true);
        setLocationSearched(false);

        const response = await axiosInstance.get("/src/find-address", {
          params: { search: keyword },
          signal: controller.signal,
        });

        const data = response?.data?.data || [];

        setLocationSuggestions(data);
        setShowLocationSuggestions(true);
        setLocationSearched(true);
      } catch (error) {
        if (error?.name !== "CanceledError" && error?.code !== "ERR_CANCELED") {
          console.error("Location search error:", error);

          setLocationSuggestions([]);
          setShowLocationSuggestions(true);
          setLocationSearched(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingLocations(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [location]);

  // =========================
  // SELECT LOCATION
  // =========================
  const handleLocationSelect = (item) => {
    let locationText = "";

    if (item.post) {
      locationText = item.post;
      if (item.district) locationText += `, ${item.district}`;
      if (item.state) locationText += `, ${item.state}`;
    } else if (item.district) {
      locationText = item.district;
      if (item.state) locationText += `, ${item.state}`;
    } else if (item.state) {
      locationText = item.state;
    }

    setLocation(locationText);
    setShowLocationSuggestions(false);
    setLocationSuggestions([]);
    setLocationSearched(false);
  };

  // =========================
  // CLEAR LOCATION
  // =========================
  const handleClearLocation = () => {
    clearLocation();
    setLocationSuggestions([]);
    setShowLocationSuggestions(false);
    setLocationSearched(false);
  };

  // =========================
  // SEARCH CLICK
  // =========================
  const handleSearchClick = () => {
    const params = new URLSearchParams();

    if (location?.trim()) {
      params.set("search_loc", location.trim());
    }

    if (propertyType) {
      params.set("propertyType", propertyType);
    }

    const qs = params.toString();

    navigate(qs ? `/search?${qs}` : "/search");
  };

  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);

    const queryLocation = params.get("search_loc");
    const queryPropertyType = params.get("propertyType");

    if (queryLocation && location !== queryLocation) {
      setLocation(queryLocation);
    }

    if (!queryLocation && location) {
      clearLocation();
    }

    if (queryPropertyType) {
      const numericId = Number(queryPropertyType);

      if (!Number.isNaN(numericId) && Number(propertyType) !== numericId) {
        setPropertyType(numericId);
      }
    }
  }, [routerLocation.search]);

  return (
    <div
      className="
        relative
        z-[2]
        flex
        w-full
        flex-col
        gap-3
        overflow-visible
        rounded-md
        bg-white/20
        px-4
        py-8
        sm:px-5
        min-[850px]:flex-row
        min-[850px]:items-center
        min-[850px]:gap-5
        min-[850px]:px-3
        min-[850px]:py-3
      "
    >
      {/* =========================
          LOCATION
      ========================== */}
      <div
        ref={locationRef}
        className="
          relative
          z-[10000]
          w-full
          min-[850px]:flex-1
        "
      >
        <div
          className="
            relative
            z-[10001]
            flex
            h-[48px]
            w-full
            items-center
            rounded-lg
            border
            border-[#999999]
            bg-white
            px-4
            transition
            focus-within:border-blue-500
            focus-within:ring-2
            focus-within:ring-blue-100
            min-[850px]:h-[45px]
            min-[850px]:rounded-sm
            min-[850px]:px-5
          "
        >
          <div className="flex shrink-0 items-center text-[#17213D]">
            <LocationIcon />
          </div>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => {
              if (
                location.trim().length >= 3 &&
                (locationSuggestions.length > 0 || locationSearched)
              ) {
                setShowLocationSuggestions(true);
              }
            }}
            placeholder="Enter location"
            autoComplete="off"
            className="
              ml-3
              min-w-0
              flex-1
              bg-transparent
              text-[15px]
              text-[#111827]
              outline-none
              placeholder:text-[#777]
              sm:text-[16px]
            "
          />

          {loadingLocations && (
            <div
              className="
                mr-2
                h-4
                w-4
                shrink-0
                animate-spin
                rounded-full
                border-2
                border-gray-300
                border-t-blue-600
              "
            />
          )}

          {location && !loadingLocations && (
            <button
              type="button"
              onClick={handleClearLocation}
              aria-label="Clear location"
              className="
                ml-2
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[#17213D]
                transition
                hover:bg-gray-100
                active:bg-gray-200
              "
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* LOCATION SUGGESTIONS */}
        {showLocationSuggestions && (
          <div
            className="
              absolute
              left-0
              right-0
              top-[55px]
              z-[99999]
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-2xl
              ring-1
              ring-black/5
              min-[850px]:top-[52px]
              min-[850px]:rounded-lg
            "
          >
            {loadingLocations && (
              <div className="px-5 py-4 text-center text-sm text-gray-500">
                Searching locations...
              </div>
            )}

            {!loadingLocations && locationSuggestions.length > 0 && (
              <div className="max-h-[280px] overflow-y-auto overscroll-contain">
                {locationSuggestions.map((item, index) => (
                  <button
                    key={`${item.post || "location"}-${
                      item.district || ""
                    }-${item.state || ""}-${index}`}
                    type="button"
                    onClick={() => handleLocationSelect(item)}
                    className="
                      flex
                      min-h-[64px]
                      w-full
                      items-center
                      border-b
                      border-gray-100
                      px-4
                      py-3
                      text-left
                      transition
                      hover:bg-gray-50
                      active:bg-gray-100
                      last:border-b-0
                      sm:px-5
                    "
                  >
                    <div
                      className="
                        mr-3
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-50
                        text-[#17213D]
                      "
                    >
                      <LocationIcon />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                          truncate
                          text-[15px]
                          font-medium
                          text-[#111827]
                          sm:text-[16px]
                        "
                      >
                        {item.post || item.district || item.state}
                      </div>

                      <div
                        className="
                          mt-0.5
                          truncate
                          text-[13px]
                          text-gray-500
                          sm:text-[14px]
                        "
                      >
                        {item.post && item.district
                          ? `${item.district}${
                              item.state ? `, ${item.state}` : ""
                            }`
                          : item.district && item.state
                            ? item.state
                            : ""}
                      </div>
                    </div>

                    <div className="ml-2 shrink-0 text-gray-400">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================
          PROPERTY TYPE
      ========================== */}
      <div
        ref={propertyTypeRef}
        className="
          relative
          z-[10]
          w-full
          min-[850px]:flex-1
        "
      >
        <div
          className="
            relative
            z-[11]
            flex
            h-[48px]
            items-center
            rounded-lg
            border
            border-[#999999]
            bg-white
            px-4
            min-[850px]:h-[45px]
            min-[850px]:rounded-sm
            min-[850px]:px-5
          "
        >
          <button
            type="button"
            onClick={() => setOpenPropertyType((prev) => !prev)}
            className="
              ml-3
              flex
              min-w-0
              flex-1
              items-center
              text-left
              text-[15px]
              text-[#111827]
              sm:text-[16px]
            "
          >
            <span className="truncate">
              {propertyTypes.find(
                (type) => Number(type.id) === Number(propertyType),
              )?.name || "Select property type"}
            </span>
          </button>

          {propertyType && (
            <button
              type="button"
              onClick={clearPropertyType}
              aria-label="Clear property type"
              className="
      ml-2
      flex
      h-9
      w-9
      shrink-0
      items-center
      justify-center
      rounded-full
      text-[#17213D]
      hover:bg-gray-100
    "
            >
              <CloseIcon />
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpenPropertyType((prev) => !prev)}
            aria-label="Open property types"
            className="
              ml-1
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              text-[#17213D]
            "
          >
            <ChevronDownIcon open={openPropertyType} />
          </button>
        </div>

        {openPropertyType && (
          <div
            className="
              absolute
              left-0
              right-0
              top-[54px]
              z-[9999]
              max-h-[280px]
              overflow-y-auto
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-2xl
              ring-1
              ring-black/5
              min-[850px]:top-[52px]
              min-[850px]:rounded-lg
            "
          >
            {propertyTypes.length > 0 ? (
              propertyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handlePropertyTypeChange(type.id)}
                  className={`
        flex
        min-h-[48px]
        w-full
        items-center
        px-4
        py-3
        text-left
        text-[15px]
        transition
        hover:bg-gray-50
        active:bg-gray-100
        sm:px-5
        sm:text-base
       ${
         Number(propertyType) === Number(type.id)
           ? "bg-blue-50 font-medium text-blue-600"
           : "text-gray-800"
       }
      `}
                >
                  {type.name}
                </button>
              ))
            ) : (
              <div className="px-5 py-6 text-center text-sm text-gray-500">
                No property types found
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================
          SEARCH BUTTON
      ========================== */}
      <Button
        type="primary"
        htmlType="button"
        onClick={handleSearchClick}
        className="
          relative
          z-[1]
          !h-[48px]
          w-full
          shrink-0
          rounded-lg
          px-8
          !bg-blue
          !text-[15px]
          font-medium
          text-white
          transition
          hover:!bg-blue
          active:scale-[0.99]
          sm:!text-base
          min-[850px]:!h-10
          min-[850px]:!w-auto
          min-[850px]:!px-11
        "
      >
        <span className="flex items-center justify-center gap-2">
          <SearchIcon />
          Search
        </span>
      </Button>
    </div>
  );
}

export default SearchPage;
