import React from "react";
import images from "../../../config/Images.jsx";
// Dynamic data - replace with API response
const areas = [
  { id: 1, image: images.thanjavur, name: "Tirupur", count: "8 Projects" },
  { id: 2, image: images.thanjavur, name: "Chennai", count: "8 Projects" },
  { id: 3, image: images.thanjavur, name: "Coimbatore", count: "8 Projects" },
  { id: 4, image: images.thanjavur, name: "Pollachi", count: "8 Projects" },
  { id: 5, image: images.thanjavur, name: "Tirupur", count: "8 Projects" },
  { id: 6, image: images.thanjavur, name: "Madurai", count: "8 Projects" },
  { id: 7, image: images.thanjavur, name: "Dindigul", count: "8 Projects" },
  { id: 8, image: images.thanjavur, name: "Thanjavur", count: "8 Projects" },
  { id: 9, image: images.thanjavur, name: "Udumalai", count: "8 Projects" },
  { id: 10, image: images.thanjavur, name: "Dindigul", count: "8 Projects" },
];

const PropertiesByArea = () => {
  return (
    <div className="w-full bg-[#eef2fd] py-16">
      <div className="w-[90%] mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Properties By Area
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto">
            Highlight the best of your properties by using the List Category
            shortcode. You can list categories, types, cities, areas and states
            of your choice.
          </p>
        </div>

        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-10 text-start">
          {areas.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-sm py-0 flex items-center gap-x-5"
            >
              <img
                src={area.image}
                alt={area.name}
                className="w-17 h-17 rounded-sm object-cover shrink-0"
              />

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {area.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{area.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesByArea;
