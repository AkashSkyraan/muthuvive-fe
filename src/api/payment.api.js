import axiosInstance from "./axios";

export const createPaymentOrder = async ({ prop_id, plan_id }) => {
  try {
    const response = await axiosInstance.post("/payment/create-order", {
      prop_id,
      plan_id,
    });

    return response.data;
  } catch (error) {
    console.error("Create payment order error:", error);
    throw error;
  }
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  try {
    const response = await axiosInstance.post("/payment/verify", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return response.data;
  } catch (error) {
    console.error("Verify payment error:", error);
    throw error;
  }
};
