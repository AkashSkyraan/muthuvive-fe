import axiosInstance from "./axios";

const createPaymentOrder = async () => {
  try {
    const response = await axiosInstance.post("/payment/create-order", {
      prop_id,
      plan_id,
    });

    const order = response?.data?.data;

    openRazorpayCheckout(order);
  } catch (error) {
    console.error(
      "Create payment order error:",
      error?.response?.data || error,
    );
  }
};
