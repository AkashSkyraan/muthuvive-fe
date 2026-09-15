import React, { useEffect, useState } from "react";
import { Steps } from "antd";

import "./SellPropertyStepper.css";
import { useLocation } from "react-router-dom";

const stepLabels = [
  "Select Land Category",
  "Location",
  "Property Details",
  "Property Features",
  "Add Photo / Video Of Property",
];

const StepCircle = ({ index, current }) => {
  const isCompleted = index < current;
  const isActive = index === current;

  return (
    <div
      className={`
        flex
        items-center
        justify-center
        shrink-0

        w-11
        h-11

        rounded-full
        border-2

        text-base
        font-medium

        transition-all
        duration-300

        ${
          isCompleted
            ? "bg-blue-600 border-blue-600 text-white shadow-md" // ✅ completed step → solid blue
            : isActive
              ? "bg-blue-100 border-blue-600 text-blue-600 shadow-md" // ✅ current step → slight blue
              : "bg-white border-gray-300 text-gray-800 shadow-sm" // ✅ upcoming step → white
        }
      `}
    >
      {index + 1}
    </div>
  );
};

const PropertyStepper = () => {
  const location = useLocation();

  const currentStep =
    location.pathname === "/sell-property"
      ? 0
      : location.pathname === "/sell-property/location"
        ? 1
        : location.pathname === "/sell-property/details"
          ? 2
          : location.pathname === "/sell-property/features"
            ? 3
            : location.pathname === "/sell-property/media"
              ? 4
              : 0;
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(min-width: 1024px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const items = stepLabels.map((label, index) => {
    const isCompleted = index < currentStep;
    const isActive = index === currentStep;

    return {
      title: (
        <span
          className={`
            text-base
            leading-5
            transition-colors
            duration-300

            ${
              isCompleted
                ? "text-secondary font-medium"
                : "text-gray-800 font-medium"
            }
             ${
               isActive
                 ? "text-secondary font-medium"
                 : "text-gray-800 font-medium"
             }
          `}
        >
          {label}
        </span>
      ),

      icon: <StepCircle index={index} current={currentStep} />,
    };
  });

  return (
    <div className="property-stepper w-full">
      {/* DESKTOP Vertical Stepper */}

      {isDesktop && (
        <Steps
          direction="vertical"
          current={currentStep}
          items={items}
          className="property-stepper-desktop"
        />
      )}

      {/* MOBILE + TABLET Horizontal Stepper */}

      {!isDesktop && (
        <div
          className="
            overflow-x-auto
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
        >
          <Steps
            direction="horizontal"
            labelPlacement="vertical"
            current={currentStep}
            items={items}
            responsive={false}
            className="property-stepper-mobile"
          />
        </div>
      )}
    </div>
  );
};

export default PropertyStepper;
