import React from "react";
import { Button } from "antd";
import images from "../../../config/Images.jsx";
import ProjectCard from "../../../components/cards/ProjectCard.jsx";

// Dynamic data - replace with API response
const listings = [
  {
    id: 1,
    image: images.agricultureLand,
    category: "Agriculture Land",
    title: "Boutique Space On Greenville Road",
    price: "₹ 12,00,000 / Per Acre",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
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
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
    hospitals: "Hospitals",
    schools: "Schools",
  },
  {
    id: 3,
    image: images.agricultureLand,
    category: "Agriculture Land",
    title: "Boutique Space On Greenville Road",
    price: "₹ 12,00,000 / Per Acre",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
    hospitals: "Hospitals",
    schools: "Schools",
  },
  {
    id: 4,
    image: images.agricultureLand,
    category: "Agriculture Land",
    title: "Boutique Space On Greenville Road",
    price: "₹ 12,00,000 / Per Acre",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
    hospitals: "Hospitals",
    schools: "Schools",
  },
  {
    id: 5,
    image: images.agricultureLand,
    category: "Agriculture Land",
    title: "Boutique Space On Greenville Road",
    price: "₹ 12,00,000 / Per Acre",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
    hospitals: "Hospitals",
    schools: "Schools",
  },
  {
    id: 6,
    image: images.agricultureLand,
    category: "Agriculture Land",
    title: "Boutique Space On Greenville Road",
    price: "₹ 12,00,000 / Per Acre",
    address:
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
    hospitals: "Hospitals",
    schools: "Schools",
  },
  // {
  //   id: 7,
  //   image: images.agricultureLand,
  //   category: "Agriculture Land",
  //   title: "Boutique Space On Greenville Road",
  //   price: "₹ 12,00,000 / Per Acre",
  //   address:
  //     "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
  //   area: "5000 Sf",
  //   hospitals: "Hospitals",
  //   schools: "Schools",
  // },
];

const MarketListings = () => {
  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Listing On The Market
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </p>
        </div>

        {/* Renders however many cards the API returns - 1 listing = 1 card,
            10 listings = 10 cards, laid out in this responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-start">
          {listings.map((listing) => (
            <ProjectCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button type="primary" className="!bg-secondary">
            Explore All Lands
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketListings;
