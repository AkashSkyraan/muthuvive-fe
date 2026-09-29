import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

import Header from "./Header.jsx";
import TabSection from "./TabSection.jsx";
import PropertyListings from "./PropertyListings.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import TabListing from "./TabListing.jsx";

import images from "../../../config/Images.jsx";
import { getProperties } from "../../../api/getProperties.api.js";

const categoryData = {
  "agriculture-land": {
    id: 1,
    slug: "agriculture-land",
    name: "Agriculture Lands",
    hero: {
      title: "Agriculture Lands",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.agriBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
  },
  farmland: {
    id: 2,
    slug: "farmland",
    name: "Farmland",
    hero: {
      title: "Farmland",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.farmlandBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
  },
  "commercial-building": {
    id: 3,
    slug: "residential",
    name: "Residential Properties",
    hero: {
      title: "Commercial Buildings",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.residentialBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
    categories: [
      { key: "Office Space", label: "Office Space" },
      { key: "Showrooms", label: "Showrooms" },
      { key: "Godowns", label: "Godowns" },
      { key: "Office-in-IT-Park", label: "Office in IT Park" },
      { key: "Shops", label: "Shops" },
    ],
  },
  "residential-building": {
    id: 4,
    slug: "residential",
    name: "Residential Properties",
    hero: {
      title: "Residential Buildings",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.residentialBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
    categories: [
      { key: "Office Space", label: "Office Space" },
      { key: "Showrooms", label: "Showrooms" },
      { key: "Godowns", label: "Godowns" },
      { key: "Office-in-IT-Park", label: "Office in IT Park" },
      { key: "Shops", label: "Shops" },
    ],
  },
  "commercial-land": {
    id: 5,
    slug: "commercial",
    name: "Commercial Properties",
    hero: {
      title: "Commercial Land",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.commercialBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
  },
  "dtcp-approved": {
    id: 6,
    slug: "commercial",
    name: "Commercial Properties",
    hero: {
      title: "DTCP Approved Plots",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.dtcpBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
  },
  construction: {
    id: 7,
    slug: "commercial",
    name: "Commercial Properties",
    hero: {
      title: "Commercial Properties",
      description:
        "Discover commercial properties in strategic locations for your business and investment needs.",
      image: images.commercialBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
  },
  "investment-land": {
    id: 8,
    slug: "commercial",
    name: "Commercial Properties",
    hero: {
      title: "Investment Lands",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.commercialBannerImage,
    },
    tabs: [
      { key: "posted", label: "Available Projects" },
      { key: "sold", label: "Sold Projects" },
    ],
  },
};

const CATEGORY_TYPE_MAP = {
  "agriculture-land": 1,
  farmland: 6,
  "commercial-building": 4,
  "commercial-land": 2,
  "dtcp-approved": 5,
  "investment-land": 3,
  "residential-building": 7,
};

// ============================================================
// TAB -> API STATUS
// ============================================================

const TAB_STATUS_MAP = {
  available: "posted",
  sold: "sold",

  // For your commercial/residential tabs
  "Ongoing-Projects": "inprogress",
  "Sold-Projects": "sold",
};

// ============================================================
// API LIMIT
// ============================================================

const LIMIT = 2;

// ============================================================
// COMPONENT
// ============================================================

const Properties = () => {
  // ----------------------------------------------------------
  // Get category from URL
  // ----------------------------------------------------------

  const { categorySlug } = useParams();

  // ----------------------------------------------------------
  // Get static category information
  // ----------------------------------------------------------

  const selectedCategory = categoryData[categorySlug];

  // ----------------------------------------------------------
  // API properties
  // ----------------------------------------------------------

  const [properties, setProperties] = useState([]);

  // ----------------------------------------------------------
  // Pagination
  // ----------------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  // ----------------------------------------------------------
  // Active tab
  // ----------------------------------------------------------

  const [activeTab, setActiveTab] = useState(
    selectedCategory?.tabs?.[0]?.key || "",
  );

  // ----------------------------------------------------------
  // Total properties
  // ----------------------------------------------------------

  const [totalPages, setTotalPages] = useState(0);

  // ----------------------------------------------------------
  // Loading
  // ----------------------------------------------------------

  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------------
  // Category type
  // ----------------------------------------------------------

  const propertyType = CATEGORY_TYPE_MAP[categorySlug];

  // ----------------------------------------------------------
  // Make sure active tab belongs to current category
  // ----------------------------------------------------------

  const validActiveTab = selectedCategory?.tabs?.some(
    (tab) => tab.key === activeTab,
  )
    ? activeTab
    : selectedCategory?.tabs?.[0]?.key || "";

  // ----------------------------------------------------------
  // API status
  // ----------------------------------------------------------

  const status = TAB_STATUS_MAP[validActiveTab];

  // ----------------------------------------------------------
  // Reset when category changes
  // ----------------------------------------------------------

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }

    setCurrentPage(1);

    setActiveTab(selectedCategory.tabs?.[0]?.key || "");
  }, [categorySlug]);

  // ----------------------------------------------------------
  // Fetch properties
  // ----------------------------------------------------------

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const response = await getProperties({
          page: Number(currentPage),
          limit: Number(LIMIT),
          status,
          type: Number(propertyType),
        });

        const data = response?.data || response || {};

        setProperties(data?.properties || []);
        setTotalPages(data?.pagination?.totalPages);
      } catch (error) {
        console.error("Failed to fetch properties:", error);

        setProperties([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    if (propertyType && status) {
      fetchProperties();
    }
  }, [categorySlug, currentPage, validActiveTab, propertyType, status]);

  // ----------------------------------------------------------
  // Handle tab change
  // ----------------------------------------------------------

  const handleTabChange = (value) => {
    setActiveTab(value);

    // When changing tab, always go to first page
    setCurrentPage(1);
  };

  // ----------------------------------------------------------
  // Handle pagination
  // ----------------------------------------------------------

  const handlePageChange = (page) => {
    setCurrentPage(Number(page));
  };

  // ----------------------------------------------------------
  // Invalid category
  // ----------------------------------------------------------

  if (!selectedCategory) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Empty description="Property category not found" />
      </main>
    );
  }

  // ==========================================================
  // UI
  // ==========================================================
  return (
    <main className="w-full min-h-screen bg-white">
      {/* ======================================================
          HERO
      ====================================================== */}

      <Header data={selectedCategory.hero} />

      <section className="w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* ==================================================
              CATEGORY LISTING
              Only for commercial/residential
          ================================================== */}

          <div className="pt-5 sm:pt-6">
            {categorySlug === "commercial-residential-building" && (
              <TabListing categories={selectedCategory.categories} />
            )}
          </div>

          {/* ==================================================
              STATUS TABS
          ================================================== */}

          <div className="pt-6 sm:pt-6">
            <TabSection
              tabs={selectedCategory.tabs}
              value={validActiveTab}
              onChange={handleTabChange}
            />
          </div>

          {/* ==================================================
              PROPERTY LISTINGS
              API DATA IS PASSED HERE
          ================================================== */}

          <div className="mt-5 sm:mt-6">
            <PropertyListings listings={properties} loading={loading} />
          </div>

          {/* ==================================================
              PAGINATION
          ================================================== */}

          {totalPages > 0 && (
            <div className="flex justify-center py-8 sm:py-10">
              <Pagination
                current={currentPage}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Properties;
