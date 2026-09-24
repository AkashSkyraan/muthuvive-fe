import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useSearch } from "../../../context/SearchContext";

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

// Multi-select 2-column grid of toggle buttons, shared by every
// checkbox-style section (Sort By, Types Of Property, Ownership Type,
// Amenities, Facing Direction).
const ToggleGrid = ({ options, selectedValues, onToggle }) => (
  <div className="grid grid-cols-2 gap-2">
    {options.map((option) => {
      console.log(option)
      const isActive = selectedValues.includes(option.value);
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
}) => {
  const { propertyType: contextPropertyType, setPropertyType } = useSearch();



  useEffect(() => {
    if (contextPropertyType) {
      onChipChange("propertyType", [contextPropertyType]);
    } else {
      onChipChange("propertyType", []);
    }
  }, [contextPropertyType]);

  const [openSections, setOpenSections] = useState({
    sortBy: true,
    price: true,
    propertyType: true,
    ownershipType: true,
    amenities: true,
    facingDirection: true,
  });

  const [priceRange, setPriceRange] = useState(null);
  const [priceRangeLoading, setPriceRangeLoading] = useState(false);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const groups = [
    { key: "sortBy", title: "Sort By", options: sortByOptions },
    {
      key: "propertyType",
      title: "Types Of Property",
      options: propertyTypeOptions,
    },
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

  const activeChips = groups.flatMap(({ key, options }) =>
    filters[key].map((value) => ({
      key,
      value,
      label: options.find((option) => option.value === value)?.label ?? value,
    })),
  );

  const handleRemoveChip = (key, value) => {
    onChipChange(
      key,
      filters[key].filter((v) => v !== value),
    );
  };

  useEffect(() => {
    const fetchRange = async () => {
      setPriceRangeLoading(true);
      const data = await getPriceRange();
      setPriceRange(data);
      setPriceRangeLoading(false);
    };
    fetchRange();
  }, []);

  // Format ₹ Indian style
  const formatINR = (value) => {
    if (value === null || value === undefined || value === "") return "—";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Text input -> number
  const handleMinChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = raw ? Number(raw) : null;
    onPriceChange(num, filters.priceMax);
  };

  const handleMaxChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = raw ? Number(raw) : null;
    onPriceChange(filters.priceMin, num);
  };
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      {/* Filter By - active chips + Clear All */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Filter By</h3>
        {activeChips.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-medium text-[#d41010]"
          >
            Clear All
          </button>
        )}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activeChips.map((chip) => (
            <span
              key={`${chip.key}-${chip.value}`}
              className="inline-flex items-center gap-x-1.5 bg-white border border-gray-500 text-sm text-gray-700 pl-3 pr-2 py-2 rounded-md"
            >
              {chip.label}
              <button
                type="button"
                onClick={() => handleRemoveChip(chip.key, chip.value)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseOutlined className="text-[12px]" />
              </button>
            </span>
          ))}
        </div>
      )}

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
              placeholder="Min"
              value={filters.priceMin ?? ""}
              onChange={handleMinChange}
              inputMode="numeric"
              prefix="₹"
              className="
              !h-10
              !rounded-lg
              !border-gray-300
              hover:!border-blue-500
              focus:!border-blue-500
            "
            ></input>

            <input
              placeholder="Max"
              value={filters.priceMax ?? ""}
              onChange={handleMaxChange}
              inputMode="numeric"
              prefix="₹"
              className="
              !h-10
              !rounded-lg
              !border-gray-300
              hover:!border-blue-500
              focus:!border-blue-500
            "
            ></input>
          </div>

          {/* ============================================================
            API RANGE DISPLAY
        ============================================================ */}
          <div className="mt-3 text-xs text-gray-500 leading-relaxed">
            {priceRangeLoading ? (
              <span>Loading price range...</span>
            ) : priceRange ? (
              <span>
                Available range:{" "}
                <span className="font-medium text-gray-700">
                  {formatINR(priceRange.min)}
                </span>{" "}
                –{" "}
                <span className="font-medium text-gray-700">
                  {formatINR(priceRange.max)}
                </span>
              </span>
            ) : (
              <span className="text-gray-400">Price range unavailable</span>
            )}
          </div>
        </FilterSection>

        <FilterSection
          title="Types Of Property"
          isOpen={openSections.propertyType}
          onToggle={() => toggleSection("propertyType")}
        >
          <ToggleGrid
            options={propertyTypeOptions}
            selectedValues={filters.propertyType}
            onToggle={(value) => {
              onChipChange("propertyType", [value]);
              setPropertyType(value);
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
