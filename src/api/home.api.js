import axiosInstance from "./axios";

export const getTestimonials = async (filters = {}) => {
  const response = await axiosInstance.get("/testimonial/testimonials", {
    params: filters,
  });
  return response.data.data;
};

export const getPropertiesByArea = async (filters = {}) => {
  const response = await axiosInstance.get("/property/property-area", {
    params: filters,
  });
  return response.data.data;
};
