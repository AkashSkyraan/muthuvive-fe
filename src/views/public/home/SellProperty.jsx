import React, { useEffect, useState } from "react";
import { Button } from "antd";
import icons from "../../../config/Icons.jsx";
import SubscriptionCard from "../../../components/cards/SubscriptionCard.jsx";
import { getSubscriptionPlans } from "../../../api/subscriptionPlans.api.js";
import { Link } from "react-router-dom";

const SellProperty = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getSubscriptionPlans();
      setPlans(data);
    };

    fetchPlans();
  }, []);
  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto rounded-xl bg-gradient-to-r from-[#FFF6F6] via-[#EEF3FF] to-[#e8ecfb] p-6 md:p-10">
        <div className="flex flex-col lg:flex-row items-center gap-y-10 gap-x-16 text-start justify-center">
          {/* Left content */}
          <div className="lg:w-1/2 flex flex-col gap-y-2">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              You Want To Sell Your Property ?
            </h2>

            <p className="text-base text-gray-500 mt-4 leading-relaxed">
              Highlight the best of your properties by using the List Category
              shortcode. You can list categories, types, cities, areas and
              states of your choice.
            </p>
            <div>
              <Link to="/sell-property">
                <Button
                  type="primary"
                  className="!bg-secondary mt-6 w-[55%] sm:w-[45%] !text-base !py-4.5"
                >
                  Sell my property
                </Button>
              </Link>
            </div>
          </div>

          {/* Right plan card */}
          <div className="w-full lg:w-1/3">
            {/* <div className="bg-white rounded-lg border border-secondary max-w-md mx-auto lg:mx-0">
              <div className="border-b border-gray-200 px-5 py-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Plan Details
                </h3>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <span className="text-md sm:text-xl font-bold text-secondary">
                      ₹ 3999
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      ₹ 6999
                    </span>
                  </div>

                  <span className="text-xs font-medium text-secondary border border-secondary rounded-sm px-2 sm:px-3 py-1 hover:bg-secondary hover:text-primary transition-colors">
                    Year Plan
                  </span>
                </div>

                <ul className="flex flex-col gap-y-3 mt-5">
                  {planFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-2">
                      <img
                        src={icons.checkIcon}
                        alt="check"
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
            <SubscriptionCard plans={plans} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProperty;
