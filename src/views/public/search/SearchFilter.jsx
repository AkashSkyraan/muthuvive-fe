import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useSearch } from "../../../context/SearchContext";
import { getPriceRange } from "../../../api/search.api";

// Local only - not covered by index.jsx state since price uses plain
// min/max values, not an options array like the other sections.

const toggleValue = (array, value) =>
  array.includes(value) ? array.filter((v) => v !== value) : [...array, value];

// One collapsible section wrapper - title + chevron, content only
// rendered while open.
const FilterSection = ({ title, isOpen, onToggle, children }) => (
  <div className="pt-4 border-t border-[#808080] first:border-t-0 first:pt-0">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between w-full text-sm font-semibold text-gray-900"
    >
      {title}
      {isOpen ? (
        <UpOutlined className="text-xs text-gray-400" />
      ) : (
        <DownOutlined className="text-xs text-gray-400" />
      )}
    </button>
    {isOpen && <div className="mt-3">{children}</div>}
  </div>
);

// const ToggleGrid = ({ options, selectedValues = [], onToggle }) => (
//   <div className="grid grid-cols-2 gap-2">
//     {options.map((option) => {
//       const isActive = selectedValues.some(
//         (value) => Number(value) === Number(option.value),
//       );

//       return (
//         <button
//           key={option.value}
//           type="button"
//           onClick={() => onToggle(option.value)}
//           className={`px-3 py-2 rounded-lg border text-sm text-center transition-colors cursor-pointer ${
//             isActive
//               ? "bg-blue-50 border-secondary text-secondary"
//               : "bg-white border-[#3e3e3e] text-gray-600"
//           }`}
//         >
//           {option.label}
//         </button>
//       );
//     })}
//   </div>
// );

const ToggleGrid = ({ options, selectedValues = [], onToggle }) => (
  <div className="grid grid-cols-2 gap-2">
    {options.map((option) => {
      const isActive = selectedValues.some(
        (value) => String(value) === String(option.value),
      );

      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onToggle(option.value)}
          className={`px-3 py-2 rounded-lg border text-sm text-center transition-colors cursor-pointer ${
            isActive
              ? "bg-blue-50 border-secondary text-secondary"
              : "bg-white border-[#3e3e3e] text-gray-600"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
const PropertyFilters = ({
  sortByOptions,
  propertyTypeOptions,
  ownershipTypeOptions,
  amenitiesOptions,
  facingDirectionOptions,
  filters,
  onChipChange,
  onPriceChange,
  onClearAll,
  onPropertyTypeChange,
}) => {
  const { propertyType, setPropertyType, clearPropertyType } = useSearch();
  const priceEnabled = Number(propertyType) === 1 || Number(propertyType) === 2;
  const [openSections, setOpenSections] = useState({
    sortBy: true,
    price: true,
    propertyType: true,
    ownershipType: true,
    amenities: true,
    facingDirection: true,
  });

  const [priceRange, setPriceRange] = useState(null);

  const [priceInput, setPriceInput] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    setPriceInput({
      min: filters.min_price ?? "",
      max: filters.max_price ?? "",
    });
  }, [filters.min_price, filters.max_price]);

  const [priceRangeLoading, setPriceRangeLoading] = useState(false);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const groups = [
    { key: "sortBy", title: "Sort By", options: sortByOptions },

    {
      key: "ownershipType",
      title: "Ownership Type",
      options: ownershipTypeOptions,
    },
    { key: "amenities", title: "Amenities", options: amenitiesOptions },
    {
      key: "facingDirection",
      title: "Facing Direction",
      options: facingDirectionOptions,
    },
  ];

  const activeChips = [
    ...groups.flatMap(({ key, options }) =>
      (filters[key] || []).map((value) => ({
        key,
        value,
        label:
          options.find((option) => Number(option.value) === Number(value))
            ?.label ?? value,
      })),
    ),

    ...(propertyType
      ? [
          {
            key: "propertyType",
            value: propertyType,
            label:
              propertyTypeOptions.find(
                (option) => Number(option.value) === Number(propertyType),
              )?.label ?? propertyType,
          },
        ]
      : []),
  ];

  const handleRemoveChip = (key, value) => {
    if (key === "propertyType") {
      clearPropertyType();
      return;
    }

    onChipChange(
      key,
      (filters[key] || []).filter((v) => v !== value),
    );
  };

  useEffect(() => {
    const fetchRange = async () => {
      if (!propertyType) {
        setPriceRange(null);
        return;
      }

      setPriceRangeLoading(true);

      try {
        // console.log(propertyType, "ptype");

        const data = await getPriceRange(propertyType);

        setPriceRange(data);
      } catch (error) {
        console.error("Price range fetch error:", error);
        setPriceRange(null);
      } finally {
        setPriceRangeLoading(false);
      }
    };

    fetchRange();
  }, [propertyType]);

  // Format ₹ Indian style
  const formatINR = (value) => {
    if (value === null || value === undefined || value === "") return "—";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      {/* Filter By - active chips + Clear All */}

      <div>
        {/* Header */}

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Filter By</h3>

            {activeChips.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-sm font-medium text-[#d41010] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {activeChips.length > 0 && (
            <div
              className="
        mt-3
        max-h-[120px]
        overflow-auto
        pr-1
        scrollbar-thin
        scrollbar-thumb-gray-300
        scrollbar-track-transparent
      "
            >
              <div className="flex flex-wrap gap-2 w-max min-w-full">
                {activeChips.map((chip) => (
                  <span
                    key={`${chip.key}-${chip.value}`}
                    className="
              inline-flex
              items-center
              gap-2
              w-fit
              whitespace-nowrap
              shrink-0
              bg-[#165BEF]
              text-white
              text-sm
              font-medium
              pl-3
              pr-2
              py-2
              rounded-md
              shadow-sm
              hover:bg-[#0f4fd6]
              transition-colors
            "
                  >
                    <span>{chip.label}</span>

                    <button
                      type="button"
                      onClick={() => handleRemoveChip(chip.key, chip.value)}
                      className="
                flex
                items-center
                justify-center
                w-5
                h-5
                rounded-full
                text-white
                hover:bg-white/20
                transition-colors
              "
                    >
                      <CloseOutlined className="text-[11px] text-white" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <FilterSection
          title="Sort By"
          isOpen={openSections.sortBy}
          onToggle={() => toggleSection("sortBy")}
        >
          <ToggleGrid
            options={sortByOptions}
            selectedValues={filters.sortBy}
            onToggle={(value) =>
              onChipChange("sortBy", toggleValue(filters.sortBy, value))
            }
          />
        </FilterSection>

        <FilterSection
          title="Price"
          isOpen={openSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Min"
              value={priceInput.min}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");

                setPriceInput((prev) => ({
                  ...prev,
                  min: value,
                }));
              }}
              inputMode="numeric"
              className="
        h-10
        w-full
        rounded-lg
        border
        border-gray-300
        px-3
        outline-none
        focus:border-blue-500
      "
            />

            <input
              type="text"
              placeholder="Max"
              value={priceInput.max}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");

                setPriceInput((prev) => ({
                  ...prev,
                  max: value,
                }));
              }}
              inputMode="numeric"
              className="
        h-10
        w-full
        rounded-lg
        border
        border-gray-300
        px-3
        outline-none
        focus:border-blue-500
      "
            />
          </div>

          <button
            type="button"
            disabled={!priceEnabled}
            onClick={() => {
              const minPrice = priceInput.min ? Number(priceInput.min) : null;

              const maxPrice = priceInput.max ? Number(priceInput.max) : null;

              onPriceChange(minPrice, maxPrice);
            }}
            className="
      mt-3
      w-full
      h-10
      rounded-lg
      bg-secondary
      text-white
      text-sm
      font-medium
      hover:opacity-90
      transition
       disabled:bg-gray-300
        disabled:text-gray-500
        disabled:cursor-not-allowed
    "
          >
            Apply
          </button>

          {priceEnabled && (
            <div className="mt-3 text-xs text-gray-500 leading-relaxed">
              {priceRangeLoading ? (
                <span>Loading price range...</span>
              ) : priceRange ? (
                <span>
                  Available range:{" "}
                  <span className="font-medium text-gray-700">
                    {formatINR(priceRange.minPrice)}
                  </span>{" "}
                  –{" "}
                  <span className="font-medium text-gray-700">
                    {formatINR(priceRange.maxPrice)}
                  </span>
                </span>
              ) : (
                <span className="text-gray-400">Price range unavailable</span>
              )}
            </div>
          )}
        </FilterSection>

        <FilterSection
          title="Types Of Property"
          isOpen={openSections.propertyType}
          onToggle={() => toggleSection("propertyType")}
        >
          <ToggleGrid
            options={propertyTypeOptions}
            selectedValues={propertyType ? [propertyType] : []}
            onToggle={(value) => {
              const numericId = Number(value);

              if (numericId === Number(propertyType)) {
                clearPropertyType();
                onPropertyTypeChange(null);
                return;
              }

              setPropertyType(numericId);
              onPropertyTypeChange(numericId);
            }}
          />
        </FilterSection>

        <FilterSection
          title="Amenities"
          isOpen={openSections.amenities}
          onToggle={() => toggleSection("amenities")}
        >
          <ToggleGrid
            options={amenitiesOptions}
            selectedValues={filters.amenities}
            onToggle={(value) =>
              onChipChange("amenities", toggleValue(filters.amenities, value))
            }
          />
        </FilterSection>

        <FilterSection
          title="Facing Direction"
          isOpen={openSections.facingDirection}
          onToggle={() => toggleSection("facingDirection")}
        >
          <ToggleGrid
            options={facingDirectionOptions}
            selectedValues={filters.facingDirection}
            onToggle={(value) =>
              onChipChange(
                "facingDirection",
                toggleValue(filters.facingDirection, value),
              )
            }
          />
        </FilterSection>
      </div>
    </div>
  );
};

export default PropertyFilters;
