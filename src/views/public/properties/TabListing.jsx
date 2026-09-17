import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CategoryTabs = ({ categories = [], onChange }) => {
  const scrollRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.key || "",
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  /*
   * Find which category is currently closest
   * to the left edge of the scroll container.
   */
  const checkCurrentSlide = () => {
    const el = scrollRef.current;

    if (!el) return;

    const items = Array.from(el.children);

    if (!items.length) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const distance = Math.abs(item.offsetLeft - el.scrollLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentSlide(closestIndex);
  };

  useEffect(() => {
    setActiveCategory(categories[0]?.key || "");
    setCurrentSlide(0);

    const el = scrollRef.current;

    if (!el) return;

    /*
     * Wait until categories have been rendered
     * before checking the scroll position.
     */
    requestAnimationFrame(() => {
      checkCurrentSlide();
    });

    el.addEventListener("scroll", checkCurrentSlide);
    window.addEventListener("resize", checkCurrentSlide);

    return () => {
      el.removeEventListener("scroll", checkCurrentSlide);
      window.removeEventListener("resize", checkCurrentSlide);
    };

    // checkCurrentSlide intentionally excluded because
    // it is a component-local function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  /*
   * Scroll directly to a specific category.
   */
  const scrollToCategory = (index) => {
    const el = scrollRef.current;

    if (!el) return;

    const items = el.children;

    if (!items[index]) return;

    const targetItem = items[index];

    el.scrollTo({
      left: targetItem.offsetLeft,
      behavior: "smooth",
    });

    setCurrentSlide(index);
  };

  /*
   * Move exactly one category at a time.
   */
  const scrollBy = (direction) => {
    const nextIndex =
      direction === "left" ? currentSlide - 1 : currentSlide + 1;

    if (nextIndex < 0 || nextIndex >= categories.length) {
      return;
    }

    scrollToCategory(nextIndex);
  };

  const handleTabClick = (category) => {
    setActiveCategory(category.key);

    // Tell the parent which tab was clicked
    onChange?.(category.key);
  };

  /*
   * Button states are now based on the actual
   * first/last category position.
   */
  const canScrollLeft = currentSlide > 0;
  const canScrollRight = currentSlide < categories.length - 1;

  return (
    <div className={`flex w-full items-center gap-2 sm:gap-3`}>
      {/* Previous */}
      <button
        type="button"
        onClick={() => scrollBy("left")}
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
                className={`shrink-0 whitespace-nowrap border-b-2 pb-1 text-sm md:text-base font-medium transition-colors hover:cursor-pointer ${
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
        onClick={() => scrollBy("right")}
        disabled={!canScrollRight}
        className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#1557e8] text-white transition-colors enabled:hover:bg-[#1148c4]"
      >
        <RightOutlined className="text-xs" />
      </button>
    </div>
  );
};

export default CategoryTabs;
