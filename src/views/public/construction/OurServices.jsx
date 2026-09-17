import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import images from "../../../config/Images";

// Dynamic data - kept as a local array for now; pass this in as a prop
// later if this ever needs to be reused on another page with different content.
const services = [
  {
    id: 1,
    number: "01",
    title: "General Contracting",
    description:
      "End-to-end management for seamless project execution, ensuring timely delivery and high-quality.",
    image: images.rectangle,
  },
  {
    id: 2,
    number: "02",
    title: "Residential Construction",
    description:
      "End-to-end management for seamless project execution, ensuring timely delivery and high-quality.",
    image: images.rectangle,
  },
  {
    id: 3,
    number: "03",
    title: "Commercial Construction",
    description:
      "End-to-end management for seamless project execution, ensuring timely delivery and high-quality.",
    image: images.rectangle,
  },
  {
    id: 4,
    number: "04",
    title: "Renovation",
    description:
      "End-to-end management for seamless project execution, ensuring timely delivery and high-quality.",
    image: images.rectangle,
  },
  {
    id: 5,
    number: "05",
    title: "Interior Fit-Out",
    description:
      "End-to-end management for seamless project execution, ensuring timely delivery and high-quality.",
    image: images.rectangle,
  },
];

const ServicesShowcase = () => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollBounds = () => {
    const el = scrollRef.current;
    if (!el) return;
    setIsAtStart(el.scrollLeft <= 4);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

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
  }, []);

  const scrollByCard = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const cardWidth = card ? card.offsetWidth + 24 : 320; // +24 for gap-x-6
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        {/* Static heading + description */}
        <div className="text-center">
          <span className="inline-block bg-[#dbe4fb] text-secondary text-xs font-medium px-3 py-1.5 rounded-md">
            Our Services
          </span>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-4">
            We Build Everything You Need
          </h2>

          <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto">
            We provide tailored construction solutions, designed to meet your
            needs and executed with precision and expertise.
          </p>
        </div>

        {/* Scrollable service cards */}
        <div
          ref={scrollRef}
          className="flex gap-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory mt-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {services.map((service) => (
            <div
              key={service.id}
              data-card
              className="w-[260px] sm:w-[300px] shrink-0 snap-start text-start"
            >
              <span className="text-sm font-bold text-secondary">
                {service.number}
              </span>

              <h3 className="text-lg font-bold text-gray-900 mt-2">
                {service.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {service.description}
              </p>

              <div className="h-56 rounded-lg overflow-hidden mt-5">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Prev / next controls */}
        <div className="flex items-center justify-end gap-x-3 mt-6">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={isAtStart}
            className={`w-9 h-9 rounded-md flex items-center justify-center text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed  ${isAtStart ? "bg-gray-400 text-black" : "bg-secondary text-white"}`}
          >
            <LeftOutlined className="text-xs" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={isAtEnd}
            className={`w-9 h-9 rounded-md  flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${isAtEnd ? "bg-gray-400 text-black" : "bg-secondary text-white"}`}
          >
            <RightOutlined className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesShowcase;
