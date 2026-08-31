import React from "react";
import Gallery from "./Gallery";
import HeroCard from "../../../components/cards/HeroCard";

const index = () => {
  return (
    <div>
      <HeroCard
        title="Our Gallery"
        description="Trusted by industry leaders, built for long-lasting results, and designed to deliver reliable,"
      />
      <Gallery />
    </div>
  );
};

export default index;
