import React, { useState, useEffect } from "react";

// CategoryFilter
// - options: [{ id, label, value }, ...]
// - value: currently selected option's id (controlled - lives in parent)
// - onChange: called with the clicked option's id
const CategoryFilter = ({ options = [], value, onChange }) => {
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const element = document.getElementById("main-header");

    if (!element) return;

    const updateOffset = () => {
      setTopOffset(element.getBoundingClientRect().height);
    };

    updateOffset();

    const observer = new ResizeObserver(updateOffset);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!options.length) return null;

  const renderPill = (option) => {
    const selectedId = option.id ?? option.value;

    const isSelected =
      option.value === "all" ? value === null : selectedId === value;

    return (
      <button
        key={selectedId}
        type="button"
        onClick={() => onChange?.(option.value === "all" ? null : selectedId)}
        className={`cursor-pointer w-full rounded-xl border px-5 py-2.5 text-sm text-center transition-colors ${
          isSelected
            ? "border-2 border-blue-500 font-semibold text-blue-600"
            : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
        }`}
      >
        {option.label}
      </button>
    );
  };

  return (
    <>
      {/* Mobile & tablet */}
      <div
        className="lg:hidden flex items-center gap-2 mb-5 overflow-x-auto pb-1 w-full min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          position: "sticky",
          top: `${topOffset}px`,
          zIndex: 20,
        }}
      >
        {options.map((option) => (
          <div key={option.id ?? option.value} className="shrink-0 w-36">
            {renderPill(option)}
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div
        className="hidden lg:flex lg:flex-col lg:gap-1.5 lg:gap-y-5 w-48"
        style={{
          position: "sticky",
          top: `${topOffset}px`,
          zIndex: 20,
        }}
      >
        {options.map((option) => (
          <div key={option.id ?? option.value}>{renderPill(option)}</div>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
