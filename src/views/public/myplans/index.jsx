import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PlanCard from "../../../components/cards/PlanCard";
import PlanDetailsCard from "../../../components/cards/SubscriptionCard";
import { useAuth } from "../../../context/UserContext";
import { getMyPlans } from "../../../api/subscriptionPlans.api";

const MyPlans = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Change this line if prop_id comes from another source
  const propId = location.state?.prop_id;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);

        const payload = {
          user_id: 1,
          prop_id: propId,
          // user_id: user?.id,
          // prop_id: propId,
        };

        // console.log("My Plans Payload:", payload);

        const response = await getMyPlans(payload);

        // console.log("My Plans Response:", response);

        const responsePlans = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        setPlans(responsePlans);
      } catch (error) {
        console.error("My Plans API Error:", error);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
    // if (user?.id && propId) {
    //   fetchPlans();
    // } else {
    //   setPlans([]);
    //   setLoading(false);
    // }
  }, [user?.id, propId]);

  return (
    <main className="w-[90%] mx-auto py-6">
      {/* Page Title */}
      <h1 className="mb-5 text-2xl font-semibold text-gray-900 text-start">
        My Plans Activity
      </h1>

      {loading ? (
        <div className="text-start text-sm text-gray-500">Loading plans...</div>
      ) : plans.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No plans found
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 text-start">
          {plans.map((plan) => (
            <React.Fragment key={plan.id}>
              <PlanCard plans={[plan]} />
              <PlanDetailsCard plans={[plan]} />
            </React.Fragment>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyPlans;
