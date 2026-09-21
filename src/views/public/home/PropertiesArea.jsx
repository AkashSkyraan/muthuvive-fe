import React, { useEffect, useState } from "react";
import { getPropertiesByArea } from "../../../api/home.api.js";

const PropertiesByArea = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await getPropertiesByArea();

        // Map the actual API response here
        const formattedAreas = (response || []).map((item) => ({
          id: item.id,
          image: item.image,
          name: item.name,
          count: item.property_count,
        }));

        setAreas(formattedAreas);
      } catch (error) {
        console.error("Failed to fetch properties by area:", error);
        setAreas([]);
      }
    };

    fetchAreas();
  }, []);

  return (
    <div className="w-full bg-[#eef2fd] py-16">
      <div className="w-[90%] mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Properties By Area
          </h2>

          <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto">
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
                className="w-20 h-20 rounded-sm object-cover shrink-0"
              />

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {area.name}
                </h3>

                <p className="text-sm text-gray-500 mt-0.5">{area.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesByArea;
