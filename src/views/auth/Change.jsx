import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import { preventInvalidSpaces } from "../../utils/helper";
import { requestOTP } from "../../api/auth.api";
import { useAuth } from "../../context/UserContext";
import images from "../../config/Images";

function ChangeContact() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const { field: fieldFromState, type, identifier } = location.state || {};

  // First time:
  // field = "mobile" / "email"
  //
  // Coming from Verify OTP edit:
  // type = "mobile" / "email"
  //
  // Forgot Password flow:
  // type = "password"
  const field = fieldFromState || type;

  console.log("Change Contact Route State:", location.state);
  console.log("Field:", field);
  console.log("Type:", type);
  console.log("Identifier:", identifier);

  const [value, setValue] = useState(identifier || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(identifier || "");
  }, [identifier]);

  const isMobile = field === "mobile";
  const isEmail = field === "email";
  const isPassword = field === "password";

  const fieldLabel = isMobile ? "Mobile Number" : "Email Address";

  const description = isMobile
    ? "We’ll send an OTP to verify this number. Confirm your number using the OTP sent"
    : "We’ll send an OTP to verify this email. Confirm your email using the OTP sent";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!value.trim()) {
      setError(
        isPassword
          ? "Please enter your email or mobile number"
          : `Please enter your ${isMobile ? "mobile number" : "email address"}`,
      );
      return;
    }

    // Password / Forgot Password flow
    if (isPassword) {
      try {
        setLoading(true);
        setError("");

        console.log("Change Password Identifier:", value.trim());

        // Configure the route state as needed for your Verify OTP page.
        navigate("/verify-otp", {
          state: {
            type: "password",
            identifier: value.trim(),
          },
        });

        return;
      } finally {
        setLoading(false);
      }
    }

    // Existing Mobile / Email flow
    try {
      setLoading(true);
      setError("");

      const payload = {
        type: field,
        purpose: 1,
        ...(isMobile
          ? {
              mobile: value.trim(),
            }
          : {
              email: value.trim(),
            }),
      };

      console.log("Change email Payload:", payload);

      const response = await requestOTP(payload);

      console.log("Change Contact Response:", response);

      if (response?.success === true || response?.success === 1) {
        navigate("/verify-otp", {
          state: {
            identifier: value.trim(),
            from: "profile",
            type: field,
            purpose: 1,
          },
        });

        return;
      }

      setError(
        response?.message ||
          `Unable to change your ${
            isMobile ? "mobile number" : "email address"
          }`,
      );
    } catch (err) {
      console.error("Change Contact Error:", err);

      setError(
        err?.response?.data?.message ||
          `Unable to change your ${
            isMobile ? "mobile number" : "email address"
          }`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex h-[10px] w-full items-center justify-center">
        <img src={images.logo} alt="Logo" className="w-[180px]" />
      </div>

      {isPassword ? (
        <>
          {/* Change Password */}
          <h4 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
            Change Password
          </h4>

          <p className="mt-3 text-sm leading-5 text-gray-500">
            Highlight the best of your properties by using the List
            <br className="hidden sm:block" />
            Category shortcode. You can list categories
          </p>

          <form onSubmit={handleSubmit} className="mt-9 text-left">
            {/* Email / Mobile Number */}
            <div>
              <label
                htmlFor="contactValue"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Email / Mobile Number
              </label>

              <input
                id="contactValue"
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                placeholder="Enter your email or mobile number"
                autoComplete="email"
                required
                onKeyDown={preventInvalidSpaces}
                className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
                  error ? "border-red-400" : "border-gray-200"
                }`}
              />

              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>

            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={loading}
              className="mt-6 !h-12 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
            >
              Send OTP
            </Button>

            <Button
              type="default"
              htmlType="button"
              onClick={handleBack}
              className="mt-3 !h-12 w-full rounded-lg border border-gray-200 bg-white text-md font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
            >
              Back
            </Button>
          </form>
        </>
      ) : (
        <>
          {/* Existing Mobile / Email Flow */}
          <h4 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
            Enter New {isMobile ? "Mobile Number" : "Email Address"}
          </h4>

          <p className="mt-3 text-sm leading-5 text-gray-500">{description}</p>

          <form onSubmit={handleSubmit} className="mt-9 text-left">
            {/* Mobile / Email */}
            <div>
              <label
                htmlFor="contactValue"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                {fieldLabel}
              </label>

              <input
                id="contactValue"
                type={isEmail ? "email" : "tel"}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                placeholder={
                  isMobile
                    ? "Enter your new mobile number"
                    : "Enter your new email address"
                }
                inputMode={isMobile ? "numeric" : "email"}
                autoComplete={isMobile ? "tel" : "email"}
                required
                onKeyDown={preventInvalidSpaces}
                className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
                  error ? "border-red-400" : "border-gray-200"
                }`}
              />

              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>

            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={loading}
              className="mt-6 !h-12 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
            >
              Verify
            </Button>

            <Button
              type="default"
              htmlType="button"
              onClick={handleBack}
              className="mt-3 !h-12 w-full rounded-lg border border-gray-200 bg-white text-md font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
            >
              Back
            </Button>
          </form>
        </>
      )}
    </>
  );
}

export default ChangeContact;
