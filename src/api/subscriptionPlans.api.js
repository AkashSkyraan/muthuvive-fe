import axiosInstance from "./axios";

export const getSubscriptionPlans = async (filters = {}) => {
  const response = await axiosInstance.get("/plan/plans", {
    params: filters,
  });
  return response.data.data;
};
