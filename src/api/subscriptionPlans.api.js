import axiosInstance from "./axios";

export const getSubscriptionPlans = async (filters = {}) => {
  const response = await axiosInstance.get("/plan/plans", {
    params: filters,
  });
  //   console.log(response.data.data)
  return response.data.data;
};
