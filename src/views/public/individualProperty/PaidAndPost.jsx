import React, { useState } from "react";
import { message } from "antd";
import { createPaymentOrder, verifyPayment } from "../../../api/payment.api";

const PaidAndPost = () => {
  // { prop_id, plan_id }

  const prop_id = "Pf0XLk248";
  const plan_id = 3;

  const [loading, setLoading] = useState(false);

  const handlePaidAndPost = async () => {
    try {
      setLoading(true);

      // -----------------------------------------
      // 1. Create Razorpay order
      // -----------------------------------------

      const orderResponse = await createPaymentOrder({
        prop_id,
        plan_id,
      });

      if (!orderResponse?.success) {
        throw new Error(
          orderResponse?.message || "Unable to create payment order",
        );
      }

      const order = orderResponse.data;

      // -----------------------------------------
      // 2. Open Razorpay
      // -----------------------------------------

      const options = {
        key: order.key_id,

        amount: order.amount,

        currency: order.currency,

        name: "MuthVives",

        description: "Property Paid & Post",

        order_id: order.order_id,

        handler: async (response) => {
          try {
            setLoading(true);

            
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            });

            if (!verifyResponse?.success) {
              throw new Error(
                verifyResponse?.message || "Payment verification failed",
              );
            }

            message.success(
              "Payment successful. Property posted successfully.",
            );

            // Refresh page / navigate
            window.location.reload();
          } catch (error) {
            console.error(error);

            message.error(error?.message || "Payment verification failed");
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#00942A",
        },
      };

      

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response);

        message.error(response?.error?.description || "Payment failed");

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error(error);

      message.error(error?.message || "Unable to start payment");

      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handlePaidAndPost}
      className="
        w-full
        rounded-md
        bg-[#00942A]
        px-4
        py-3
        text-sm
        font-medium
        text-white
        transition-colors
        hover:bg-green-700
        disabled:cursor-not-allowed
        disabled:opacity-60
        sm:py-3.5
        sm:text-base
        cursor-pointer
      "
    >
      {loading ? "Processing..." : "Paid & Post"}
    </button>
  );
};

export default PaidAndPost;
