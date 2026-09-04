import React from "react";
import { useParams } from "react-router-dom";
import { Empty, Spin } from "antd";
import Header from "./Header.jsx";
import TabSection from "./TabSection.jsx";
import PropertyListings from "./PropertyListings.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import TabListing from "./TabListing.jsx";
import images from "../../../config/Images.jsx";
import icons from "../../../config/Icons.jsx";

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
      {
        key: "ongoing",
        label: "Ongoing Projects",
      },
      {
        key: "sold",
        label: "Sold Projects",
      },
    ],

    properties: [
      {
        id: 1,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 2,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 3,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 4,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 5,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 6,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },
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
      {
        key: "ongoing",
        label: "Ongoing Projects",
      },
      {
        key: "sold",
        label: "Sold Projects",
      },
    ],

    properties: [
      {
        id: 1,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "Hospitals",
        schools: "Schools",
      },

      {
        id: 2,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 3,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 4,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 5,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 6,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },
    ],
  },

  "commercial-residential-building": {
    id: 3,
    slug: "residential",
    name: "Residential Properties",

    hero: {
      title: "Commercial / Residential Buildings",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.residentialBannerImage,
    },

    tabs: [
      {
        key: "Ongoing-Projects",
        label: "Ongoing Projects",
      },
      {
        key: "Sold-Projects",
        label: "Sold Projects",
      },
    ],
    categories: [
      {
        key: "Office Space",
        label: "Office Space",
      },
      {
        key: "Showrooms",
        label: "Showrooms",
      },
      {
        key: "Godowns",
        label: "Godowns",
      },
      {
        key: "Office-in-IT-Park",
        label: "Office in IT Park",
      },
      {
        key: "Shops",
        label: "Shops",
      },
    ],

    properties: [
      {
        id: 1,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 2,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 3,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 4,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 5,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 6,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },
    ],
  },

  "commercial-land": {
    id: 4,
    slug: "commercial",
    name: "Commercial Properties",

    hero: {
      title: "Commercial Land",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.commercialBannerImage,
    },

    tabs: [
      {
        key: "ongoing",
        label: "Ongoing Projects",
      },
      {
        key: "sold",
        label: "Sold Projects",
      },
    ],

    properties: [
      // Add commercial properties here
    ],
  },

  "dtcp-approved": {
    id: 4,
    slug: "commercial",
    name: "Commercial Properties",

    hero: {
      title: "DTCP Approved Plots",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.dtcpBannerImage,
    },

    tabs: [
      {
        key: "ongoing",
        label: "Ongoing Projects",
      },
      {
        key: "sold",
        label: "Sold Projects",
      },
    ],

    properties: [
      {
        id: 1,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 2,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 3,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 4,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 5,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 6,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },
    ],
  },

  construction: {
    id: 4,
    slug: "commercial",
    name: "Commercial Properties",

    hero: {
      title: "Commercial Properties",
      description:
        "Discover commercial properties in strategic locations for your business and investment needs.",
      image: images.commercialBannerImage,
    },

    tabs: [
      {
        key: "ongoing",
        label: "Ongoing Projects",
      },
      {
        key: "sold",
        label: "Sold Projects",
      },
    ],

    properties: [
      {
        id: 1,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 2,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 3,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 4,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 5,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 6,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },
    ],
  },

  "investment-land": {
    id: 4,
    slug: "commercial",
    name: "Commercial Properties",

    hero: {
      title: "Investment Lands",
      description:
        "Discover verified properties that match your lifestyle, budget, and location. Buy, sell, or rent your perfect property with confidence.",
      image: images.commercialBannerImage,
    },

    tabs: [
      {
        key: "ongoing",
        label: "Ongoing Projects",
      },
      {
        key: "sold",
        label: "Sold Projects",
      },
    ],

    properties: [
      {
        id: 1,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 2,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 3,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 4,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "6 Schools",
      },

      {
        id: 5,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },

      {
        id: 6,
        image: images.agricultureLand,
        category: "Agriculture Land",
        title: "Boutique Space On Greenville Road",
        price: "₹ 12,00,000 / Per Acre",
        address:
          "Sri Venkateswara Towers, FCI Rd, Opp. Fire Station, Gandhinagar Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
        area: "5000 SF",
        hospitals: "5 Hospitals",
        schools: "5 Schools",
      },
    ],
  },
};

const Properties = () => {
  // --------------------------------------------------------------------------
  // Get category from URL
  // --------------------------------------------------------------------------
  // Example:
  //
  // /properties/agriculture-land
  // categorySlug = "agriculture-land"
  // --------------------------------------------------------------------------

  const { categorySlug } = useParams();

  // --------------------------------------------------------------------------
  // Find the category data
  // --------------------------------------------------------------------------

  const selectedCategory = categoryData[categorySlug];

  // --------------------------------------------------------------------------
  // Handle invalid category
  // --------------------------------------------------------------------------

  if (!selectedCategory) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Empty description="Property category not found" />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white">
      <Header data={selectedCategory.hero} />

      <section className="w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-5 sm:pt-6">
            {categorySlug === "commercial-residential-building" && (
              <TabListing
                categories={selectedCategory.categories}
                
              />
            )}{" "}
          </div>
          <div className="pt-5 sm:pt-6">
            <TabSection tabs={selectedCategory.tabs} />
          </div>

          <div className="mt-5 sm:mt-6">
            <PropertyListings listings={selectedCategory.properties} />
          </div>

          <div className="flex justify-center py-8 sm:py-10">
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Properties;
