import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyStepper from "../components/stepper/SellPropertyStepper.jsx";
import { SellPropertyProvider } from "../context/SellPropertyContext.jsx";
import { AboutUsProvider } from "../context/AboutusContext.jsx";

const SellPropertyLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check whether current route is the first step
  const isFirstStep = location.pathname === "/sell-property";

  // Controls the confirmation modal
  const [showBackModal, setShowBackModal] = useState(false);

  // Open confirmation modal only for first step
  const handleBackClick = () => {
    if (isFirstStep) {
      setShowBackModal(true);
    } else {
      navigate(-1);
    }
  };

  // Close modal and stay on current form
  const handleCancelBack = () => {
    setShowBackModal(false);
  };

  // Confirm back navigation
  const handleConfirmBack = () => {
    setShowBackModal(false);

    // Go to home page
    navigate("/");
  };

  return (
    <AboutUsProvider>
      <SellPropertyProvider>
        <div className="min-h-screen flex flex-col">
          {/* ==================== Header ==================== */}
          {/* <Header /> */}

          {/* ==================== Page Content ==================== */}
          <main className="flex-1 w-[90%] md:w-[80%] mx-auto">
            {/* ---------- Page Heading ---------- */}
            <section className="container mx-auto px-4 py-8 text-start">
              {/* Back / Previous Button */}
              <button
                type="button"
                onClick={handleBackClick}
                className="
              mb-5 
              inline-flex items-center gap-x-1 
              text-sm font-medium text-gray-600 
              transition-colors duration-200 
              hover:text-gray-900 
              focus:outline-none 
              cursor-pointer
            "
              >
                <LeftOutlined className="text-base" />

                <span className="text-base">
                  {isFirstStep ? "Back" : "Previous"}
                </span>
              </button>

              <h1 className="text-2xl font-semibold">Sell Your Property</h1>

              <p className="mt-2 text-base text-gray-500">
                Fill in your property details, photos, documents, and other
                required information. Then submit the request for review.
              </p>
            </section>

            {/* ---------- Stepper + Form ---------- */}
            <section className="container mx-auto px-4 pb-10">
              <div className="flex flex-col lg:flex-row gap-8 lg:h-[80vh]">
                {/* Stepper */}
                <aside
                  className="
                lg:w-[380px] 
                lg:h-full 
                lg:overflow-y-auto 
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-track]:bg-gray-100 
                [&::-webkit-scrollbar-thumb]:bg-gray-300 
                [&::-webkit-scrollbar-thumb]:rounded-full 
              "
                >
                  <PropertyStepper />
                </aside>

                {/* Dynamic Form */}
                <section
                  className="
                flex-1 
                px-0 sm:px-7 
                lg:h-full 
                lg:overflow-y-auto 
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-track]:bg-gray-100 
                [&::-webkit-scrollbar-thumb]:bg-gray-300 
                [&::-webkit-scrollbar-thumb]:rounded-full 
              "
                >
                  <Outlet />
                </section>
              </div>
            </section>
          </main>

          {/* ==================== Footer ==================== */}
          {/* <Footer /> */}

          {/* ==================== Back Confirmation Modal ==================== */}
          <Modal
            open={showBackModal}
            onCancel={handleCancelBack}
            centered
            footer={null}
            styles={{
              content: {
                width: "80%",
                maxWidth: "420px",
              },
            }}
          >
            <div className="px-1 py-2 text-center sm:px-3">
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900">
                Leave this form?
              </h2>

              {/* Description */}
              <p className="mt-2 text-base leading-6 text-gray-500">
                If you go back, the details you have entered in this form will
                be erased. Are you sure you want to leave?
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCancelBack}
                  className="
                w-full sm:w-auto 
                rounded-md 
                border border-gray-300 
                bg-white 
                px-5 py-2.5 
                text-base font-medium text-gray-700 
                transition-colors duration-200 
                hover:bg-gray-50 
                focus:outline-none 
                cursor-pointer 
              "
                >
                  Cancel
                </button>

                {/* Confirm */}
                <button
                  type="button"
                  onClick={handleConfirmBack}
                  className="
                w-full sm:w-auto 
                rounded-md 
                bg-red-500 
                px-5 py-2.5 
                text-base font-medium text-white 
                transition-colors duration-200 
                hover:bg-red-600 
                focus:outline-none
                cursor-pointer
              "
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </SellPropertyProvider>
    </AboutUsProvider>
  );
};

export default SellPropertyLayout;
