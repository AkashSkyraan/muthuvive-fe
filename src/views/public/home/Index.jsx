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
      desc: "Cum Sociis Natoque Penatibus Et Magnis Dis Cum Sociis Natoque Penatibus Et Magnis Dis",
    },
    {
      icon: icons.dtcpApprovedIcon,
      title: "DTCP Approved",
      desc: "Cum Sociis Natoque Penatibus Et Magnis Dis Cum Sociis Natoque Penatibus Et Magnis Dis",
    },
    {
      icon: icons.constructionIcon,
      title: "Construction",
      desc: "Cum Sociis Natoque Penatibus Et Magnis Dis Cum Sociis Natoque Penatibus Et Magnis Dis",
    },
    {
      icon: icons.agriculturalLandsIcon,
      title: "Agricultural Lands",
      desc: "Cum Sociis Natoque Penatibus Et Magnis Dis Cum Sociis Natoque Penatibus Et Magnis Dis",
    },
    {
      icon: icons.commercialLandIcon,
      title: "Commercial Land",
      desc: "Cum Sociis Natoque Penatibus Et Magnis Dis Cum Sociis Natoque Penatibus Et Magnis Dis",
    },
    {
      icon: icons.investmentLandIcon,
      title: "Investment Land",
      desc: "Cum Sociis Natoque Penatibus Et Magnis Dis",
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
