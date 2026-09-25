import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../config/Images";
import Button from "../../components/common/Button";
import { preventInvalidSpaces } from "../../utils/helper";
import { requestOTP } from "../../api/auth.api";
import { message } from "antd";

function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const flowType = location.state?.type;
  const isChangePassword = flowType === "change-password";
  // console.log(flowType);

  const [identifier, setIdentifier] = useState(
    location.state?.identifier || "",
  );

  const [loading, setLoading] = useState(false);

  const isMobile = /^\d+$/.test(identifier) && identifier.length > 0;

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier.trim()) {
      message.error("Please enter your email or mobile number");
      return;
    }

    await handleOTPGenerate();
  };

  const handleOTPGenerate = async () => {
    const value = identifier.trim();

    if (!value) {
      message.error("Please enter your email or mobile number");
      return;
    }

    try {
      setLoading(true);

      const type = /^\d+$/.test(value) ? "mobile" : "email";

      const response = await requestOTP({
        type,
        purpose: 2,
        ...(type === "email" ? { email: value } : { mobile: value }),
      });

      if (response?.success === true || response?.success === 1) {
        message.success(response?.message || "OTP sent successfully");

        navigate("/verify-otp", {
          state: {
            identifier: value,
            from: "forgot-password",
            type,
            purpose: 2,
          },
        });

        return;
      }

      message.error(response?.message || "Failed to send OTP");
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-[10px] w-full items-center justify-center">
        <img src={images.logo} alt="Logo" className="w-[180px]" />
      </div>

      <h5 className="mt-8 text-4xl font-[400px] tracking-tight text-gray-900">
        {isChangePassword ? "Change Password" : "Forgot Password"}
      </h5>

      <p className="mt-3 text-sm leading-5 text-gray-500">
        Highlight the best of your properties by using the List
        <br className="hidden sm:block" />
        Category shortcode. You can list categories
      </p>

      <form onSubmit={handleSubmit} className="mt-9 text-left">
        {/* Email / Mobile */}
        <div>
          <label
            htmlFor="identifier"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email / Mobile number
          </label>

          <div className="flex h-10 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
            {isMobile && (
              <div className="flex h-full w-[65px] shrink-0 items-center justify-center bg-[#165BEF] text-sm font-medium text-white">
                +91
              </div>
            )}

            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={handleIdentifierChange}
              onKeyDown={preventInvalidSpaces}
              placeholder={
                isMobile ? "Enter phone number" : "Enter your Email or Mobile"
              }
              autoComplete="username"
              required
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 !outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={loading}
          className="mt-6 !h-11 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
        >
          Send OTP
        </Button>

        <Link to="/login">
          <Button className="mt-6 !h-11 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]">
            Back
          </Button>
        </Link>
      </form>
    </>
  );
}

export default ForgotPassword;
