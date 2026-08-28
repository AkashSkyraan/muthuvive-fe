import React from "react";
import Hero from "./Hero.jsx";
import OurProjects from "./OurProjects.jsx";
import Categories from "./Categories.jsx";
import MarketList from "./MarketList.jsx";
import PropertiesArea from "./PropertiesArea.jsx";
import SellProperty from "./SellProperty.jsx";
import Testimonials from "../../../components/cards/TestimonialsCard.jsx";

const index = () => {
  return (
    <div>
      <Hero />
      <OurProjects />
      <Categories />
      <MarketList />
      <PropertiesArea />
      <SellProperty />
      <Testimonials />
    </div>
  );
};

export default index;
