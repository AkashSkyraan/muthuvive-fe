import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MAX_VISIBLE = 5;

// Sliding window of page numbers, capped at MAX_VISIBLE, centered on the
// current page and clamped to the valid range.
const getPageNumbers = (current, totalPages) => {
  if (totalPages <= MAX_VISIBLE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  let start = Math.max(current - Math.floor(MAX_VISIBLE / 2), 1);
  let end = start + MAX_VISIBLE - 1;
  if (end > totalPages) {
    end = totalPages;
    start = end - MAX_VISIBLE + 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const Pagination = ({ current = 1, total = 50, pageSize = 10, onChange }) => {
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const pages = getPageNumbers(current, totalPages);
  const showLeadingDots = pages[0] > 1;
  const showTrailingDots = pages[pages.length - 1] < totalPages;

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === current) return;
    onChange?.(page, pageSize);
  };

  return (
    <div className="mt-14 flex w-full justify-center">
      <div className="flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={current === 1}
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#ededed] text-gray-700 transition-colors hover:bg-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <LeftOutlined className="text-xs" />
        </button>

        {showLeadingDots && (
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center text-sm text-gray-800">
            ....
          </span>
        )}

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

        {showTrailingDots && (
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center text-sm text-gray-800">
            ....
          </span>
        )}

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
