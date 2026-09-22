import axiosInstance from "./axios";

export const getAboutus = async (filters = {}) => {
  const response = await axiosInstance.get("/about/about-data", {
    params: filters,
  });
  return response.data.data;
};
export const getConsultant = async (filters = {}) => {
  const response = await axiosInstance.get("/about/consultant", {
    params: filters,
  });
  return response.data.data;
};

export const postEnquiry = async (payload = {}) => {
  const response = await axiosInstance.post("/enquiry/add-enquiry", payload);
  return response.data;
};
