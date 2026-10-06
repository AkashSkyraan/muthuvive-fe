import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

/*
 * Get the exact scroll position of a category button
 * relative to the scroll container.
 */
const getItemScrollLeft = (item, container) => {
  const itemRect = item.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return itemRect.left - containerRect.left + container.scrollLeft;
};

/*
 * Finds which category button sits closest to the
 * current scroll position.
 */
const getClosestIndex = (items, container) => {
  if (!items.length) return 0;

  let closestIndex = 0;
  let closestDistance = Infinity;

  items.forEach((item, index) => {
    const itemScrollLeft = getItemScrollLeft(item, container);

    const distance = Math.abs(itemScrollLeft - container.scrollLeft);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};

const CategoryTabs = ({ categories = [], onChange }) => {
  const scrollRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.key || "",
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  /*
   * These are based on the actual scroll position
   * of the container.
   */
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /*
   * Check the actual scroll position and find
   * the category closest to the left edge.
   */
  const checkCurrentSlide = () => {
    const el = scrollRef.current;

    if (!el) return;

    /*
     * Only get category buttons.
     *
     * This avoids counting the divider <span>
     * as a category.
     */
    const items = Array.from(el.querySelectorAll("[data-category-tab]"));

    if (!items.length) return;

    /*
     * Check the actual scroll position.
     *
     * Small tolerance is used because browsers can
     * have fractional pixel values while scrolling.
     */
    const isAtStart = el.scrollLeft <= 1;

    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);

    /*
     * Find the category closest to the
     * current scroll position.
     */
    setCurrentSlide(getClosestIndex(items, el));
  };

  useEffect(() => {
    setActiveCategory(categories[0]?.key || "");
    setCurrentSlide(0);

    const el = scrollRef.current;

    if (!el) return;

    /*
     * Wait until categories are rendered
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

    /*
     * Only get category buttons.
     * Dividers are excluded.
     */
    const items = Array.from(el.querySelectorAll("[data-category-tab]"));

    if (!items[index]) return;

    const targetItem = items[index];

    /*
     * Calculate the exact position of the target
     * category relative to the scroll container.
     */
    const targetScrollLeft = getItemScrollLeft(targetItem, el);

    /*
     * Explicitly guarantee that the first category
     * goes all the way to the beginning.
     */
    const finalScrollLeft = index === 0 ? 0 : targetScrollLeft;

    el.scrollTo({
      left: finalScrollLeft,
      behavior: "smooth",
    });

    setCurrentSlide(index);
  };

  /*
   * Move exactly one category at a time.
   *
   * The current position is always calculated directly
   * from the DOM so it does not depend on potentially
   * stale React state.
   */
  const scrollBy = (direction) => {
    const el = scrollRef.current;

    if (!el) return;

    const items = Array.from(el.querySelectorAll("[data-category-tab]"));

    if (!items.length) return;

    /*
     * Get the category that is actually closest
     * to the current scroll position.
     */
    const closestIndex = getClosestIndex(items, el);

    const lastIndex = items.length - 1;

    let targetIndex;

    if (direction === "left") {
      /*
       * If we are already at the first category,
       * there is nowhere further to go.
       */
      if (closestIndex <= 0) {
        /*
         * Make sure we are completely at the beginning.
         */
        if (el.scrollLeft > 0) {
          el.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }

        return;
      }

      targetIndex = closestIndex - 1;
    } else {
      /*
       * If we are already at the last category,
       * there is nowhere further to go.
       */
      if (closestIndex >= lastIndex) {
        return;
      }

      targetIndex = closestIndex + 1;
    }

    scrollToCategory(targetIndex);
  };

  const handleTabClick = (category) => {
    setActiveCategory(category.key);

    // Tell the parent which tab was clicked
    onChange?.(category.key);
  };

  return (
    <div className="flex w-full items-center gap-2 sm:gap-3">
      {/* Previous */}
      <button
        type="button"
        onClick={() => scrollBy("left")}
        disabled={!canScrollLeft}
        className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
          canScrollLeft
            ? "bg-[#1557e8] text-white enabled:hover:bg-[#1148c4]"
            : "bg-gray-100 text-gray-400"
        }`}
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
                data-category-tab
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
        className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
          canScrollRight
            ? "bg-[#1557e8] text-white enabled:hover:bg-[#1148c4]"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        <RightOutlined className="text-xs" />
      </button>
    </div>
  );
};

export default CategoryTabs;
