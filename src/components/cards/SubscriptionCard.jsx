import React, { useEffect } from "react";
import icons from "../../config/Icons.jsx";
import { getSubscriptionPlans } from "../../api/subscriptionPlans.api.js";
import { useState } from "react";

// const planFeatures = [
//   "365 Days Listing",
//   "Wider Visibility",
//   "Property Promotion",
//   "Regular Verification",
//   "Better Selling Opportunity",
// ];

const SubscriptionCard = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchsubscriptionsPlans = async () => {
      const data = await getSubscriptionPlans();

      setPlans(data);
    };

    fetchsubscriptionsPlans();
  }, []);
  return (
    <div className="bg-white rounded-lg border border-secondary w-full max-w-md mx-auto lg:mx-0">
      <div className="border-b border-gray-200 px-5 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Plan Details</h3>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-md sm:text-xl font-bold text-secondary">
              {plans[0]?.new_amount}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {plans[0]?.old_amount}
            </span>
          </div>

          <span className="text-xs font-medium text-secondary border border-secondary rounded-sm px-2 sm:px-3 py-1 hover:bg-secondary hover:text-primary transition-colors">
            {plans[0]?.duration} Plan
          </span>
        </div>

        <ul className="flex flex-col gap-y-3 mt-5">
          {plans[0]?.features.map((feature) => (
            <li key={feature} className="flex items-center gap-x-2">
              <img src={icons.checkIcon} alt="check" className="w-4 h-4" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionCard;
