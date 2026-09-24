import React, { useEffect, useState } from "react";
import { Button } from "antd";
import SubscriptionCard from "../../../components/cards/SubscriptionCard.jsx";
import { getSubscriptionPlans } from "../../../api/subscriptionPlans.api.js";
import { useLoginModal } from "../../../context/LoginModalContext.jsx";
import axiosInstance from "../../../api/axios.js";

const SellProperty = () => {
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const { openLoginModal } = useLoginModal();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getSubscriptionPlans();

        setPlans(data?.[0] ? [data[0]] : []);
      } catch (error) {
        console.error("Fetch Plans Error:", error);
      }
    };

    fetchPlans();
  }, []);

  // Check logged-in user
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setUserLoading(true);

        const response = await axiosInstance.get(
          "/user/get-user"
        );

        if (
          response?.data?.success === 1 &&
          response?.data?.data?.length > 0
        ) {
          setUser(response.data.data[0]);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Get User Error:", error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  // If not logged in, show global login modal
  useEffect(() => {
    if (!userLoading && !user) {
      openLoginModal();
    }
  }, [userLoading, user, openLoginModal]);

  const isLoggedIn = !!user;

  const handleSellProperty = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    // Continue your sell property flow here
    console.log("User can sell property");
  };

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto rounded-xl bg-gradient-to-r from-[#FFF6F6] via-[#EEF3FF] to-[#e8ecfb] p-6 md:p-10">
        <div className="flex flex-col lg:flex-row items-center gap-y-10 gap-x-16 text-start justify-center">

          {/* Left content */}
          <div className="lg:w-1/2 flex flex-col gap-y-2">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              You Want To Sell Your Property?
            </h2>

            <p className="text-base text-gray-500 mt-4 leading-relaxed">
              Highlight the best of your properties by using the List Category
              shortcode. You can list categories, types, cities, areas and
              states of your choice.
            </p>

            <div>
              <Button
                onClick={handleSellProperty}
                type="primary"
                className="!bg-secondary mt-6 w-[55%] sm:w-[45%] !text-base !py-4.5"
              >
                Sell my property
              </Button>
            </div>
          </div>

          {/* Right plan card */}
          <div className="w-full lg:w-1/3">
            <SubscriptionCard plans={plans} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellProperty;