import React, { useState, useEffect } from "react";

// CategoryFilter
// - options: [{ label: "All Requests", value: "all" }, ...]
// - value: currently selected option's value (controlled - lives in the parent)
// - onChange: called with the clicked option's value
//
// Desktop/tablet-large (lg+): vertical stack of individual pill buttons,
// tightly spaced, matching the design screenshot - each option is its
// own rounded-full bordered pill, selected one gets a blue border + blue
// bold text, rest stay thin gray border + gray text.
// Mobile/tablet (below lg): same pill styling, laid out horizontally in
// a scrollable strip since the vertical stack doesn't fit that width.
const CategoryFilter = ({ options = [], value, onChange }) => {
  if (!options.length) return null;
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const element = document.getElementById("main-header");

    if (!element) return;

    const updateOffset = () => {
      setTopOffset(element.getBoundingClientRect().height);
    };

    // Get initial height
    updateOffset();

    // Watch for height changes
    const observer = new ResizeObserver(updateOffset);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!options.length) return null;

  const renderPill = (option) => {
    const isSelected = option.value === value;
    return (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange?.(option.value)}
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
      {/* Mobile & tablet - horizontal scroll strip. w-full + min-w-0
          constrain this to its parent's actual width first - without
          that, a row of fixed-width pills renders at its natural full
          width and pushes past the viewport, giving the whole PAGE a
          horizontal scrollbar instead of just this strip scrolling
          internally. */}
      <div
        className="lg:hidden flex items-center gap-2 overflow-x-auto pb-1 w-full min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          position: "sticky",
          top: `${topOffset}px`,
          zIndex: 20,
        }}
      >
        {options.map((option) => (
          <div key={option.value} className="shrink-0 w-36">
            {renderPill(option)}
          </div>
        ))}
      </div>

      {/* Desktop - vertical stack of pills */}
      <div
        className="hidden lg:flex lg:flex-col lg:gap-1.5 lg:gap-y-5 w-48"
        style={{
          position: "sticky",
          top: `${topOffset}px`,
          zIndex: 20,
        }}
      >
        {options.map((option) => (
          <div key={option.value}>{renderPill(option)}</div>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
