import axiosInstance from "./axios";

export const getSubscriptionPlans = async (filters = {}) => {
  const response = await axiosInstance.get("/plan/plans", {
    params: filters,
  });
  return response.data.data;
};
export const getMyPlans = async (filters = {}) => {
  const response = await axiosInstance.get("/plan/get-property-plan", {
    params: filters,
  });
  return response.data.data;
};
