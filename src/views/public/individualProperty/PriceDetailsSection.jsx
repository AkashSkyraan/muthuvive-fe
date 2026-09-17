import React from "react";

// Groups fields into pairs of 2 so each pair renders as one row with a
// single divider spanning both columns underneath. Odd counts leave the
// last row's second slot empty rather than erroring.
const chunkIntoPairs = (items) => {
  const pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
};

const InfoCard = ({ title = "Price Details", fields = [] }) => {
  const rows = chunkIntoPairs(fields);

  return (
    <div className="w-full text-start rounded-xl border border-gray-300 bg-white">
      <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="px-5 sm:px-6">
        {rows.map((pair, rowIndex) => {
          const isLastRow = rowIndex === rows.length - 1;
          return (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-4 ${
                isLastRow ? "" : "border-b border-gray-100"
              }`}
            >
              {pair.map((field, colIndex) => (
                <div key={colIndex}>
                  <p className="text-sm text-gray-400">{field.label}</p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoCard;
