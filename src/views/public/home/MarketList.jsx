import React from "react";
import { Button } from "antd";
import icons from "../../../config/Icons.jsx";
import images from "../../../config/Images.jsx";

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
    hospitals: "5 Hospitals",
    schools: "5 Schools",
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
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
    hospitals: "5 Hospitals",
    schools: "5 Schools",
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
    hospitals: "5 Hospitals",
    schools: "5 Schools",
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
      "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
    area: "5000 Sf",
    hospitals: "5 Hospitals",
    schools: "5 Schools",
  },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-start">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 sm:h-44 lg:h-48">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                <button className="absolute top-2 right-2 w-8 h-8 rounded-md flex items-center justify-center hover:cursor-pointer">
                  <img
                    src={icons.bookmarkIcon}
                    alt="bookmark"
                    className="w-5 h-5"
                  />
                </button>

                <span className="absolute bottom-3 right-3 bg-white text-secondary text-xs font-medium px-3 py-1 rounded-md">
                  {listing.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  {listing.title}
                </h3>
                <p className="text-secondary text-sm font-semibold mt-1">
                  {listing.price}
                </p>

                <div className="flex items-start gap-x-2 mt-3">
                  <img
                    src={icons.locationBlackIcon}
                    alt="location"
                    className="w-4 h-4 mt-0.5 shrink-0"
                  />
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {listing.address}
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 pt-4 justify-between">
                  <div className="flex items-center gap-x-1.5">
                    <img src={icons.areaIcon} alt="area" className="w-4 h-4" />
                    <span className="text-xs text-gray-500">
                      {listing.area}
                    </span>
                  </div>
                  <div className="flex items-center gap-x-1.5">
                    <img
                      src={icons.hospitalIcon}
                      alt="hospitals"
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-gray-500">
                      {listing.hospitals}
                    </span>
                  </div>
                  <div className="flex items-center gap-x-1.5">
                    <img
                      src={icons.schoolIcon}
                      alt="schools"
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-gray-500">
                      {listing.schools}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
