import axiosInstance from "./axios";

export const getAmenities = async () => {
  try {
    const response = await axiosInstance.get("/src/get-Amenities");

    const data = response?.data?.data || [];

    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  } catch (error) {
    console.error("Get Amenities Error:", error);
    return [];
  }
};

export const getPropertyTypes = async () => {
  try {
    const response = await axiosInstance.get("/property/properties");

    const data = response?.data?.data || [];

    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  } catch (error) {
    console.error("Get Property Types Error:", error);
    return [];
  }
};

export const getPriceRange = async (propertyType) => {
  try {
    const status = null;
    const response = await axiosInstance.get("/property/price-range", {
      params: {
        type : propertyType,
        status,
      },
    });

    return response?.data?.data[0] || response?.data || null;
  } catch (error) {
    console.error("Price range fetch error:", error);
    return null;
  }
};
