import React from "react";

import PlanCard from "../../../components/cards/PlanCard";
import PlanDetailsCard from "../../../components/cards/SubscriptionCard";

const MyPlans = () => {
  const plans = [
    {
      id: 4,
      name: "Plan 04",
      status: "Active Plan",
      paidDate: "23-04-2026, Wednesday, 02:12 PM",
      expiryDate: "23-04-2027, Wednesday, 02:12 PM",
      new_amount: 3999,
      old_amount: 6999,
      duration: "Year",
      features: [
        "365 Days Listing",
        "Wider Visibility",
        "Property Promotion",
        "Regular Verification",
        "Better Selling Opportunity",
      ],
    },

    {
      id: 3,
      name: "Plan 03",
      status: "Expired",
      paidDate: "23-04-2025, Wednesday, 03:12 PM",
      expiryDate: "23-04-2026, Wednesday, 03:12 PM",
      price: 3999,
      originalPrice: 6999,
      features: [
        "365 Days Listing",
        "Wider Visibility",
        "Property Promotion",
        "Regular Verification",
        "Better Selling Opportunity",
      ],
    },

    {
      id: 2,
      name: "Plan 02",
      status: "Expired",
      paidDate: "23-04-2024, Wednesday, 03:12 PM",
      expiryDate: "23-04-2025, Wednesday, 03:12 PM",
      price: 3999,
      originalPrice: 6999,
      features: [
        "365 Days Listing",
        "Wider Visibility",
        "Property Promotion",
        "Regular Verification",
        "Better Selling Opportunity",
      ],
    },

    {
      id: 1,
      name: "Plan 01",
      status: "Expired",
      paidDate: "23-04-2023, Wednesday, 03:12 PM",
      expiryDate: "23-04-2024, Wednesday, 03:12 PM",
      price: 3999,
      originalPrice: 6999,
      features: [
        "365 Days Listing",
        "Wider Visibility",
        "Property Promotion",
        "Regular Verification",
        "Better Selling Opportunity",
      ],
    },
  ];

  return (
    <main className="w-[90%] mx-auto py-6">
      {/* Page Title */}
      <h1 className="mb-5 text-2xl font-semibold text-gray-900 text-start">
        My Plans Activity
      </h1>

      {/* Plans Content - map here, but pass each plan wrapped in a
          single-item array ([plan], not plan) so PlanCard and
          PlanDetailsCard don't need ANY internal changes - they still
          receive a `plans` array and still run their own .map() over
          it, it just happens to iterate exactly once per call. Because
          each call is now its own direct grid child (not one giant
          column doing all 4 internally), native CSS Grid pairs "Plan
          04"'s card with "Plan 04"'s details card into the same row and
          stretches both to match heights automatically - no manual
          height sync needed. */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 text-start">
        {plans.map((plan) => (
          <React.Fragment key={plan.id}>
            <PlanCard plans={[plan]} />
            <PlanDetailsCard plans={[plan]} />
          </React.Fragment>
        ))}
      </div>
    </main>
  );
};

export default MyPlans;
