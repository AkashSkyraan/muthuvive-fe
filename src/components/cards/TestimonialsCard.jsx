import React, { useRef, useState, useEffect } from "react";
import icons from "../../config/Icons.jsx";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { getTestimonials } from "../../api/home.api.js";

const Testimonials = () => {
  const scrollRef = useRef(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const checkScrollBounds = () => {
    const el = scrollRef.current;

    if (!el) return;

    setIsAtStart(el.scrollLeft <= 4);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  // FETCH TESTIMONIALS
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonials([]);
      }
    };

    fetchTestimonials();
  }, []);

  // CHECK SCROLL POSITION
  useEffect(() => {
    checkScrollBounds();

    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener("scroll", checkScrollBounds);
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [testimonials]);

  // MANUAL CARD SCROLL
  const scrollByCard = (direction) => {
    if (!scrollRef.current) return;

    const card = scrollRef.current.querySelector("[data-card]");
    const cardWidth = card ? card.offsetWidth + 20 : 260;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  // AUTOMATIC CAROUSEL
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      const el = scrollRef.current;

      if (!el) return;

      const card = el.querySelector("[data-card]");

      if (!card) return;

      const cardWidth = card.offsetWidth + 20;
      const maxScroll = el.scrollWidth - el.clientWidth;

      // Return to the first card when reaching the end
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Move to the next card
        el.scrollTo({
          left: Math.min(el.scrollLeft + cardWidth, maxScroll),
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, testimonials]);

  return (
    <div className="w-full py-16">
      <div className="w-[95%] sm:w-[90%] mx-auto">
        <div className="text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Testimonials
          </h2>

          <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </p>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* PREVIOUS BUTTON */}
          <button
            onClick={() => scrollByCard("left")}
            disabled={isAtStart}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeftOutlined />
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={() => scrollByCard("right")}
            disabled={isAtEnd}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRightOutlined />
          </button>

          {/* TESTIMONIAL CARDS */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-x-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testimonials
              ?.filter((testimonial) => testimonial)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  data-card
                  className="bg-white border border-gray-100 rounded-lg p-5 w-full sm:w-[240px] lg:w-[calc(33.33%-14px)] shrink-0 snap-center md:snap-start text-start flex flex-col"
                >
                  <div className="flex items-center gap-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover shrink-0"
                    />

                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-0.5">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                    {testimonial.content}
                  </p>

                  <div className="flex items-center gap-x-1 mt-auto pt-4">
                    {Array.from({
                      length: testimonial.rating || 0,
                    }).map((_, index) => (
                      <img
                        key={index}
                        src={icons.starIcon}
                        alt="star"
                        className="w-5 h-5"
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
