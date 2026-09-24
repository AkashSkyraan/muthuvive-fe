import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MOBILE_MAX_VISIBLE = 3;
const DESKTOP_MAX_VISIBLE = 5;

// Sliding window of page numbers, capped at maxVisible,
// centered on the current page and clamped to the valid range.
const getPageNumbers = (current, totalPages, maxVisible) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(current - Math.floor(maxVisible / 2), 1);

  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = end - maxVisible + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const Pagination = ({ current = 1, totalPages = 1, onChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  // console.log(current, totalPages);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 369px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    // Initial value
    setIsMobile(mediaQuery.matches);

    // Listen for screen-size changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Mobile = 3 pages
  // sm and above = 5 pages
  const maxVisible = isMobile ? MOBILE_MAX_VISIBLE : DESKTOP_MAX_VISIBLE;

  const pages = getPageNumbers(current, totalPages, maxVisible);

  const showLeadingDots = pages[0] > 1;

  const showTrailingDots = pages[pages.length - 1] < totalPages;

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === current) {
      return;
    }

    onChange?.(page);
  };

  return (
    <div className="mt-14 flex w-full justify-center">
      <div className="flex items-center gap-2 overflow-x-auto">
        {/* Previous */}
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={current === 1}
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#ededed] text-gray-700 transition-colors hover:bg-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <LeftOutlined className="text-xs" />
        </button>

        {/* Leading dots */}
        {showLeadingDots && (
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center text-sm text-gray-800">
            ....
          </span>
        )}

        {/* Page numbers */}
        {pages.map((page) => {
          const isActive = page === current;

          return (
            <button
              key={page}
              type="button"
              onClick={() => goTo(page)}
              className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#1557e8] font-medium text-white"
                  : "text-gray-800 hover:bg-gray-100 hover:text-[#1557e8]"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Trailing dots */}
        {showTrailingDots && (
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center text-sm text-gray-800">
            ....
          </span>
        )}

        {/* Next */}
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          disabled={current === totalPages}
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#ededed] text-gray-700 transition-colors hover:bg-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RightOutlined className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
