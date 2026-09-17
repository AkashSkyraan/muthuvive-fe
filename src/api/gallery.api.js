import axiosInstance from "./axios";

export const getGalleryImages = async (filters = {}) => {
  const response = await axiosInstance.get("/gallery/get-gallery", {
    params: filters,
  });
  return response.data.data;
};
