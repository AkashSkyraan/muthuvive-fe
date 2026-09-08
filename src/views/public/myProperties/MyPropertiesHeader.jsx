import React, { useState } from "react";
import { Button, Checkbox, Input, Popover, Spin } from "antd";
import { SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MyPropertiesHeader = ({
  // ============================================================
  // Data coming from MyProperties/index.jsx
  // ============================================================

  filterOptions = [],
  selectedFilters = [],

  // ============================================================
  // Functions coming from MyProperties/index.jsx
  // ============================================================

  onFilterChange = () => {},
  onSearch = () => {},
  onSellProperty = () => {},
  onSortClick = () => {},

  // ============================================================
  // Loading state for filter options
  // ============================================================

  loadingFilters = false,
}) => {
  // ============================================================
  // Local State
  // ============================================================
  // This state belongs only to the Header.
  //
  // It controls whether the filter Popover is open or closed.
  //
  // We do NOT keep selectedFilters or searchValue here because
  // those states are managed by MyProperties/index.jsx.
  // ============================================================

  const [popoverOpen, setPopoverOpen] = useState(false);

  // ============================================================
  // Search Handler
  // ============================================================
  // User types something in the search box.
  //
  // We don't store the value here.
  // We send it directly to index.jsx.
  // ============================================================

  const handleSearch = (event) => {
    const value = event.target.value;

    onSearch(value);
  };

  // ============================================================
  // Filter Handler
  // ============================================================
  // User selects/unselects a checkbox.
  //
  // Ant Design gives us the selected values.
  //
  // Example:
  // ["agriculture-land", "commercial-land"]
  //
  // We send those values to index.jsx.
  // ============================================================

  const handleFilterChange = (checkedValues) => {
    onFilterChange(checkedValues);
  };

  const filterContent = (
    <div
      className="
        w-[320px]
        max-w-[calc(100vw-32px)]
      "
    >
      {/* ======================================================
          Loading
      ======================================================= */}

      {loadingFilters ? (
        <div className="flex items-center justify-center py-6">
          <Spin size="small" />
        </div>
      ) : filterOptions.length === 0 ? (
        /* ====================================================
           Empty State
        ===================================================== */

        <div className="py-5 text-center text-sm text-gray-500">
          No options available
        </div>
      ) : (
        /* ====================================================
           Filter Options
        ===================================================== */

        <Checkbox.Group
          value={selectedFilters}
          onChange={handleFilterChange}
          className="w-full"
        >
          <div className="flex w-full flex-col gap-1">
            {filterOptions.map((option) => (
              <label
                key={option.id}
                className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-between
                  gap-4
                  rounded-md
                  px-1
                  py-2

                  text-sm
                  text-gray-900

                  transition-colors
                  duration-150

                  hover:bg-gray-50
                "
              >
                {/* ==================================================
                    Option Name
                =================================================== */}

                <span className="flex-1 leading-5">{option.name}</span>

                {/* ==================================================
                    Checkbox
                =================================================== */}

                <Checkbox value={option.value} />
              </label>
            ))}
          </div>
        </Checkbox.Group>
      )}
    </div>
  );

  return (
    <section className="w-[90%] mx-auto py-4 sm:py-2">
      <div
        className="
          flex
          w-full
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:gap-5
        "
      >
        {/* ======================================================
            Page Title
        ======================================================= */}

        <div className="w-full shrink-0 lg:w-auto">
          <h1
            className="
              text-xl
              font-semibold
              leading-tight
              text-black

              sm:text-2xl
            "
          >
            My Properties
          </h1>
        </div>

        {/* ======================================================
            Search + Actions
        ======================================================= */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-3

            sm:flex-row
            sm:items-center

            lg:flex-1
            lg:justify-end
          "
        >
          {/* ====================================================
              Search
          ===================================================== */}

          <Input
            onChange={handleSearch}
            prefix={<SearchOutlined className="text-base text-gray-700" />}
            placeholder="Search your Request"
            allowClear
            className="
              h-10
              w-full
            !bg-[#f7f7f7]
              sm:flex-1

              lg:max-w-[510px]
            "
          />

          {/* ====================================================
              Action Buttons
          ===================================================== */}

          <div
            className="
              flex
              w-full
              items-center
              gap-3

              sm:w-auto
            "
          >
            {/* ==================================================
                Short By
            =================================================== */}

            <Popover
              trigger="click"
              placement="bottomRight"
              open={popoverOpen}
              onOpenChange={setPopoverOpen}
              content={filterContent}
              styles={{
                body: {
                  padding: "12px 16px",
                },
              }}
            >
              <Button
                type="default"
                icon={<SortAscendingOutlined className="text-base" />}
                onClick={onSortClick}
                className={`
                  h-10
                  flex-1
                  rounded-lg
                  px-4
                  text-sm

                  sm:flex-none
                  sm:px-5

                  ${
                    popoverOpen
                      ? "border-[#1557E8] text-[#1557E8]"
                      : "border-gray-900 text-gray-900"
                  }
                `}
              >
                Short By
              </Button>
            </Popover>

            {/* ==================================================
                Sell My Properties
            =================================================== */}
            <Link to="/sell-property">
              <Button
                type="primary"
                onClick={onSellProperty}
                className="
                h-10
                flex-1
                rounded-lg
                px-4

                sm:flex-none
                sm:px-5

                text-sm
                font-medium
              "
              >
                Sell my Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPropertiesHeader;
