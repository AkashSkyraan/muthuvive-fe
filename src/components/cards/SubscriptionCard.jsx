import React from "react";
import icons from "../../config/Icons.jsx";
import { IndianRupee } from "lucide-react";

const SubscriptionCard = ({ plans = [] }) => {
  if (!plans?.length) {
    return (
      <div className="w-full py-10 text-center text-sm text-gray-500">
        No subscription plans found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 w-full mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="w-full mx-auto lg:mx-0 rounded-lg border border-secondary bg-white"
        >
          {/* Card Header */}
          <div className="border-b border-secondary px-5 py-3">
            <h3 className="text-base font-semibold text-gray-900">
              Plan Details
            </h3>
          </div>

          {/* Card Content */}
          <div className="p-5 bg-gradient-to-br from-[#6da4fd2a] via-[#9ec0ff47] to-white">
            {/* Price & Duration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <IndianRupee className="w-5 h-5 text-secondary" />
                <span className="text-md sm:text-xl font-bold text-secondary">
                  {plan.new_amount}
                </span>

                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  {plan.old_amount}
                </span>
              </div>

              <span className="rounded-sm border border-secondary px-2 py-1 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary sm:px-3">
                {plan.duration} Plan
              </span>
            </div>

            {/* Features */}
            <ul className="mt-5 flex flex-col gap-y-3">
              {plan.features?.map((feature, index) => (
                <li
                  key={`${plan.id}-${index}`}
                  className="flex items-center gap-x-2"
                >
                  <img src={icons.checkIcon} alt="check" className="h-4 w-4" />

                  <span className="text-base text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionCard;
