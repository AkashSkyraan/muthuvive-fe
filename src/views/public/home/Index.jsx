import React from "react";
import Hero from "./Hero.jsx";
import OurProjects from "./OurProjects.jsx";
import Categories from "./Categories.jsx";
import MarketList from "./MarketList.jsx";
import PropertiesArea from "./PropertiesArea.jsx";
import SellProperty from "./SellProperty.jsx";
import Testimonials from "../../../components/cards/TestimonialsCard.jsx";
import icons from "../../../config/Icons.jsx";
import { Link } from "react-router-dom";

const index = () => {
  const GeneralServices = [
    {
      icon: icons.farmlandIcon,
      title: "Farmland",
      desc: "Explore peaceful farmland opportunities surrounded by nature, ideal for agricultural activities, farmhouse development and long-term land ownership.",
    },
    {
      icon: icons.dtcpApprovedIcon,
      title: "DTCP Approved",
      desc: "Choose DTCP-approved plots with proper planning and documentation, offering greater confidence and clarity when investing in residential land.",
    },
    {
      icon: icons.constructionIcon,
      title: "Construction",
      desc: "Get expert guidance for your construction needs through trusted consultancy referrals, helping you connect with the right professionals for your building plans.",
    },
    {
      icon: icons.agriculturalLandsIcon,
      title: "Agricultural Lands",
      desc: "Discover agricultural land opportunities suitable for farming, cultivation and other permitted agricultural activities.",
    },
    {
      icon: icons.commercialLandIcon,
      title: "Commercial Land",
      desc: "Find strategically located commercial properties suitable for business establishments, commercial development and future expansion.",
    },
    {
      icon: icons.investmentLandIcon,
      title: "Investment Land",
      desc: "Explore promising land investment opportunities with the potential for long-term value, helping you make informed decisions for your financial future.",
    },
  ];
  return (
    <div>
      <Hero />
      <OurProjects />
      <Categories services={GeneralServices} />
      <MarketList />
      <PropertiesArea />
      <SellProperty />
      <Testimonials />
    </div>
  );
};

export default index;
