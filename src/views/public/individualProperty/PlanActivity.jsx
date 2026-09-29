import React, { useState } from "react";
import { Link } from "react-router-dom";

const PlanActivity = ({ prop_id }) => {
  return (
    <div className="flex w-full items-center justify-between border border-gray-300 bg-white px-5 py-4 sm:px-6 sm:py-5 rounded-xl">
      <p className="text-sm font-medium text-gray-900 sm:text-base">
        Plan Activity
      </p>

      <Link
        to="/properties/my-plans"
        state={{ prop_id }}
        className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 sm:text-base"
      >
        View All
      </Link>
    </div>
  );
};

export default PlanActivity;
