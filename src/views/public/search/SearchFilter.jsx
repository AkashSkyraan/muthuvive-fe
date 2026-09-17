import React, { useState } from "react";
import { Select } from "antd";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

// Local only - not covered by index.jsx state since price uses plain
// min/max values, not an options array like the other sections.
const priceOptions = [
  { label: "₹5,00,000", value: 500000 },
  { label: "₹10,00,000", value: 1000000 },
  { label: "₹20,00,000", value: 2000000 },
  { label: "₹50,00,000", value: 5000000 },
  { label: "₹1,00,00,000", value: 10000000 },
];

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
  const [openSections, setOpenSections] = useState({
    sortBy: true,
    price: true,
    propertyType: true,
    ownershipType: true,
    amenities: true,
    facingDirection: true,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Every group + its option list, used both for building the active
  // chip row and for rendering each ToggleGrid below.
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
            <Select
              placeholder="Min"
              suffixIcon={<DownOutlined className="text-gray-400 text-sm" />}
              value={filters.priceMin ?? undefined}
              onChange={(value) => onPriceChange(value, filters.priceMax)}
              options={priceOptions}
              className="w-full [&_.ant-select-selector]:!rounded-lg [&_.ant-select-selector]:!border-gray-300 [&_.ant-select-selector]:!py-1"
            />
            <Select
              placeholder="Max"
              suffixIcon={<DownOutlined className="text-gray-400 text-sm" />}
              value={filters.priceMax ?? undefined}
              onChange={(value) => onPriceChange(filters.priceMin, value)}
              options={priceOptions}
              className="w-full [&_.ant-select-selector]:!rounded-lg [&_.ant-select-selector]:!border-gray-300 [&_.ant-select-selector]:!py-1"
            />
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
            onToggle={(value) =>
              onChipChange(
                "propertyType",
                toggleValue(filters.propertyType, value),
              )
            }
          />
        </FilterSection>

        <FilterSection
          title="Ownership Type"
          isOpen={openSections.ownershipType}
          onToggle={() => toggleSection("ownershipType")}
        >
          <ToggleGrid
            options={ownershipTypeOptions}
            selectedValues={filters.ownershipType}
            onToggle={(value) =>
              onChipChange(
                "ownershipType",
                toggleValue(filters.ownershipType, value),
              )
            }
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
