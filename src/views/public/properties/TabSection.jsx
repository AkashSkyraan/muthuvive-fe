import React, { useState } from "react";

// tabs shape:
// [
//   { key: "ongoing", label: "Ongoing Projects" },
//   { key: "completed", label: "Completed Projects" },
// ]

// Works as:
// Controlled:
// <TabSection
//   tabs={tabs}
//   activeKey={activeKey}
//   onChange={setActiveKey}
// />
//
// Uncontrolled:
// <TabSection
//   tabs={tabs}
//   defaultActiveKey="ongoing"
// />

const TabSection = ({ tabs = [], activeKey, onChange, defaultActiveKey }) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || tabs[0]?.key,
  );

  const isControlled = activeKey !== undefined;

  const currentKey = isControlled ? activeKey : internalActiveKey;

  const handleClick = (key) => {
    if (!isControlled) {
      setInternalActiveKey(key);
    }

    onChange?.(key);
  };

  return (
    <div className="flex w-[90%] mx-auto justify-start">
      <div
        className="
          flex
          w-fit
          max-w-full
          overflow-x-auto
          rounded-lg
          border
          border-gray-200
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        {tabs.map((tab) => {
          const isActive = tab.key === currentKey;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleClick(tab.key)}
              className={`
                whitespace-nowrap
                px-6
                py-2.5
                text-sm
                font-medium
                transition-colors
                ${
                  isActive
                    ? "bg-secondary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSection;
