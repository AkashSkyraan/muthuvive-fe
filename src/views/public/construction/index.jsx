import React from "react";
import { useLocation } from "react-router-dom";
import { Empty, Spin } from "antd";
import images from "../../../config/Images.jsx";
import icons from "../../../config/Icons.jsx";
import Header from "../properties/Header.jsx";
import Projects from "./Projects.jsx";
import Count from "../about/Count.jsx";
import OurWorkers from "../about/OurWorkers.jsx";
import Categories from "../home/Categories.jsx";
import Testimonials from "../../../components/cards/TestimonialsCard.jsx";
import Enquiry from "../about/Enquiry.jsx";
import Ourservices from "./OurServices.jsx";

const categoryData = {
  "construction-services": {
    id: 4,
    slug: "commercial",
    name: "Commercial Properties",

    hero: {
      title: "Construction Service",
      description:
        "Discover trusted construction services that match your project needs, budget, and timeline. Build, renovate, or remodel your dream space with confidence.",
      image: images.constructionBannerImage,
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
const ConstructionServices = [
  {
    icon: icons.qualityIcon,
    title: "Quality Craftsmanship",
    desc: "We prioritize attention and use high-quality materials for lasting, exceptional results.",
  },
  {
    icon: icons.deliveryIcon,
    title: "Timely Delivery",
    desc: "We value your time and ensure projects are completed on schedule.",
  },
  {
    icon: icons.safetyIcon,
    title: "Safety First",
    desc: "We maintain top safety standards to protect both our team and your property.",
  },
  {
    icon: icons.solutionsIcon,
    title: "Innovative Solutions",
    desc: "We prioritize attention to detail and use high-quality materials for lasting results.",
  },
];

const Properties = () => {
  const location = useLocation();

  const selectedCategory =
    categoryData[location.pathname.split("/").filter(Boolean).pop()];

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
      {/* <Projects /> */}
      {/* <Count /> */}
      {/* <Ourservices /> */}
      <OurWorkers />
      {/* <Categories services={ConstructionServices} /> */}
      {/* <Testimonials /> */}
      <Enquiry />

      {/* <section className="w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-5 sm:pt-6">
            {categorySlug === "commercial-residential-building" && (
              <TabListing categories={selectedCategory.categories} />
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
      </section> */}
    </main>
  );
};

export default Properties;
