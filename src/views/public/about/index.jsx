import React from "react";
import Hero from "./Hero";
import Count from "./Count";
import Mission from "./Mission";
import LegarCards from "./legalCards";
import OurWorkers from "./OurWorkers";
import Testimonials from "../../../components/cards/TestimonialsCard";
import Enquiry from "./Enquiry";

const index = () => {
  return (
    <div>
      <Hero />
      <Count />
      <Mission />
      <LegarCards />
      <OurWorkers />
      <Testimonials />
      <Enquiry />
    </div>
  );
};

export default index;
