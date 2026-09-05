import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CategoryTabs = ({ categories = [], onChange }) => {
  const scrollRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.key || "",
  );

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;

    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);

    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    setActiveCategory(categories[0]?.key || "");

    updateScrollState();

    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [categories]);

  const scrollBy = (amount) => {
    scrollRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  const handleTabClick = (category) => {
    setActiveCategory(category.key);

    // Tell the parent which tab was clicked
    onChange?.(category.key);
  };

  return (
    <div className={`flex w-full items-center gap-2 sm:gap-3`}>
      {/* Previous */}
      <button
        type="button"
        onClick={() => scrollBy(-200)}
        disabled={!canScrollLeft}
        className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors disabled:cursor-not-allowed disabled:opacity-60 enabled:text-gray-700 enabled:hover:bg-gray-200"
      >
        <LeftOutlined className="text-xs" />
      </button>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex flex-1 items-center gap-6 sm:gap-8 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category, index) => {
          const isActive = category.key === activeCategory;

          return (
            <React.Fragment key={category.key}>
              <button
                type="button"
                onClick={() => handleTabClick(category)}
                className={`shrink-0 whitespace-nowrap border-b-2 pb-1 text-sm font-medium transition-colors hover:cursor-pointer ${
                  isActive
                    ? "border-[#1557e8] text-[#1557e8]"
                    : "border-transparent text-gray-700 hover:text-gray-900"
                }`}
              >
                {category.label}
              </button>

              {category.dividerAfter && index !== categories.length - 1 && (
                <span className="h-5 shrink-0 border-l border-dashed border-gray-300" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => scrollBy(200)}
        disabled={!canScrollRight}
        className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#1557e8] text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-[#1148c4]"
      >
        <RightOutlined className="text-xs" />
      </button>
    </div>
  );
};

export default CategoryTabs;
