import React from "react";
import Contact from "./Contact";
import HeroCard from "../../../components/cards/HeroCard";

const index = () => {
  return (
    <div>
      <HeroCard
        title="Contact Us"
        description="Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable,"
      />
      <Contact />
    </div>
  );
};

export default index;
