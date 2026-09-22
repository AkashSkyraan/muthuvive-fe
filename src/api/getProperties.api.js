import axiosInstance from "./axios";

export const getProperties = async (filters = {}) => {
  const response = await axiosInstance.get("/property/get-property", {
    params: filters,
  });
  return response.data.data;
};
