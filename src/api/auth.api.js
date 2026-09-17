import axiosInstance from "./axios";

export const requestOTP = async ({ type, purpose, email, mobile }) => {
  const payload = {
    type,
    purpose,
    ...(type === "email" ? { email } : { mobile }),
  };

  const response = await axiosInstance.post("/auth/request-otp", payload);

  return response.data;
};
