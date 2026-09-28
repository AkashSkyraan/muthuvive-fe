import React, { useState } from "react";
import { Button, Checkbox, Input, Popover, Spin } from "antd";
import { SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/UserContext";
import { useLoginModal } from "../../../context/LoginModalContext";
import { useNavigate } from "react-router-dom";

const MyPropertiesHeader = ({
  // ============================================================
  // Data coming from MyProperties/index.jsx
  // ============================================================

  filterOptions = [],
  selectedFilters = [],

  // ============================================================
  // State setters coming from MyProperties/index.jsx
  // ============================================================

  setSelectedFilters,
  setSearch,

  // ============================================================
  // Other functions coming from MyProperties/index.jsx
  // ============================================================

  // onSellProperty = () => {},
  onSortClick = () => {},

  // ============================================================
  // Loading state for filter options
  // ============================================================

  loadingFilters = false,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();

  const handleSellProperty = () => {
    if (!user?.user_id) {
      openLoginModal();
      return;
    }

    navigate("/sell-property");
  };

  const [popoverOpen, setPopoverOpen] = useState(false);

  // ============================================================
  // Search Handler
  // ============================================================

  const handleSearch = (event) => {
    const value = event.target.value;

    if (value.trim().length >= 3 || value.trim().length === 0) {
      setSearch(value);
    }
  };

  // ============================================================
  // Filter Handler
  // ============================================================

  const handleFilterChange = (option, checked) => {
    setSelectedFilters(() => {
      if (checked) {
        return [option.id];
      }

      return [];
    });
  };

  const filterContent = (
    <div
      className="
        w-[320px]
        max-w-[calc(100vw-32px)]
      "
    >
      {loadingFilters ? (
        <div className="flex items-center justify-center py-6">
          <Spin size="small" />
        </div>
      ) : filterOptions.length === 0 ? (
        <div className="py-5 text-center text-sm text-gray-500">
          No options available
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1">
          {filterOptions.map((option) => {
            const isSelected = selectedFilters.includes(option.id);

            return (
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
                <span className="flex-1 leading-5">{option.name}</span>

                <Checkbox
                  checked={isSelected}
                  onChange={(e) => handleFilterChange(option, e.target.checked)}
                />
              </label>
            );
          })}
        </div>
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
              !text-base
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
                Sort By
              </Button>
            </Popover>

            {/* ==================================================
                Sell My Properties
            =================================================== */}

            <Button
              type="primary"
              onClick={handleSellProperty}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPropertiesHeader;
