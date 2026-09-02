import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyStepper from "../components/stepper/SellPropertyStepper.jsx";

const SellPropertyLayout = () => {
  // Track progress here and pass it down - bump this as each step's form is completed

  return (
    <div className="min-h-screen flex flex-col">
      {/* ==================== Header ==================== */}
      <Header />

      {/* ==================== Page Content ==================== */}
      <main className="flex-1 w-[80%] mx-auto">
        {/* ---------- Page Heading ---------- */}
        <section className="container mx-auto px-4 py-8 text-start">
          <h1 className="text-2xl font-semibold">Sell Your Property</h1>

          <p className="mt-2 text-sm text-gray-500">
            Fill in your property details, photos, documents, and other required
            information. Then submit the request for review.
          </p>
        </section>

        {/* ---------- Stepper + Form ---------- */}
        {/* flex-col keeps mobile & tablet stacked (stepper row on top,
            form below) - only lg: and up switches to side-by-side, where
            both columns share a fixed height % of viewport so the outlet
            scrolls internally instead of pushing the page height */}
        <section className="container mx-auto px-4 pb-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:h-[80vh]">
            {/* Stepper - first row on mobile/tablet, left sidebar on desktop */}
            <aside
              className="lg:w-[400px] lg:h-full lg:overflow-y-auto [&::-webkit-scrollbar]:w-2 
                 [&::-webkit-scrollbar-track]:bg-gray-100 
                 [&::-webkit-scrollbar-thumb]:bg-gray-300 
                 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              <PropertyStepper />
            </aside>

            {/* Dynamic Form - below the stepper on mobile/tablet, right column on desktop */}
            <section
              className="flex-1 lg:h-full lg:overflow-y-auto [&::-webkit-scrollbar]:w-2 
                    [&::-webkit-scrollbar-track]:bg-gray-100 
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              <Outlet />
            </section>
          </div>
        </section>
      </main>

      {/* ==================== Footer ==================== */}
      <Footer />
    </div>
  );
};

export default SellPropertyLayout;
