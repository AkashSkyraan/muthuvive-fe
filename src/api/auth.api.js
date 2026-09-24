import axiosInstance from "./axios";

export const requestOTP = async ({ type, purpose, email, mobile }) => {
  const payload = {
    type,
    purpose,
    ...(type === "email" ? { email } : { mobile }),
  };

  const response = await axiosInstance.post("/auth/request-otp", payload);
  console.log(response.data?.data[0].otp);

  return response.data;
};

export const verifyOTP = async ({ type, purpose, email, mobile, otp }) => {
  const payload = {
    purpose,
    otp,
    ...(type === "email" ? { email } : { mobile }),
  };

  const response = await axiosInstance.post("/auth/verify-otp", payload);

  return response.data;
};

export const signup = async (payload) => {
  const response = await axiosInstance.post("/auth/signup", payload);

  return response.data;
};

export const LoginRequest = async ({ identifier, password }) => {
  try {
    if (!identifier) {
      return {
        success: false,
        message: "Email or mobile number is required",
      };
    }

    if (!password) {
      return {
        success: false,
        message: "Password is required",
      };
    }

    const isMobile = /^\d+$/.test(identifier);

    const payload = {
      ...(isMobile ? { mobile: identifier } : { email: identifier }),
      password,
    };

    const response = await axiosInstance.post("/auth/login", payload);

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user/get-user");
    return response.data;
  } catch (error) {
    console.error("Get User Error:", error);

    throw error;
  }
};

export const updateProfile = async (payload = {}) => {
  try {
    const response = await axiosInstance.put("/user/update-profile", payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};
