import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { images } from "../../config/Images";
import Button from "../../components/common/Button";
import { preventInvalidSpaces } from "../../utils/helper";
import { requestOTP } from "../../api/auth.api";
import EmailOtpModal from "../../components/modals/email.modal";

function EyeIcon({ visible }) {
  return visible ? (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M2.5 12s3.5-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10.6 6.7A10.4 10.4 0 0 1 12 6.5c6 0 9.5 5.5 9.5 5.5a17 17 0 0 1-3.1 3.5M6.1 6.9C3.8 8.5 2.5 12 2.5 12s3.5 5.5 9.5 5.5c.8 0 1.5-.1 2.2-.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verifyingMobile, setVerifyingMobile] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  // email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  const isValidMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const email = value.trim();

      if (emailVerified) return;

      setFormData((prev) => ({
        ...prev,
        email,
      }));

      // Clear error while typing
      if (!email) {
        setEmailError("");
        return;
      }

      if (!isValidEmail(email)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEmailVerify = async () => {
    const email = formData.email.trim();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (emailVerified || verifyingEmail) {
      return;
    }

    try {
      setEmailError("");
      setVerifyingEmail(true);

      const response = await requestOTP({
        type: "email",
        purpose: 1,
        email,
      });

      if (response?.success === 1) {
        message.success("OTP sent to your email");

        navigate("/verify-otp", {
          state: {
            identifier: email,
            type: "email",
            purpose: 1,
          },
        });
      } else {
        setEmailError(response?.data?.message || "Unable to send OTP");
      }
    } catch (error) {
      console.error("Email OTP Error:", error);

      setEmailError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setVerifyingEmail(false);
    }
  };

  // mobile

  const handleMobileVerify = async () => {
    const mobile = formData.mobile.trim();

    if (!mobile) {
      setMobileError("Mobile number is required");
      return;
    }

    if (!isValidMobile(mobile)) {
      setMobileError("Please enter a valid mobile number");
      return;
    }

    if (mobileVerified || verifyingMobile) {
      return;
    }

    try {
      setMobileError("");
      setVerifyingMobile(true);

      const response = await requestOTP({
        type: "mobile",
        purpose: 1,
        mobile: `+91${mobile}`,
      });

      if (response?.success === 1) {
        message.success("OTP sent to your mobile");

        navigate("/verify-otp", {
          state: {
            identifier: `+91 ${mobile}`,
            mobile,
            type: "mobile",
            purpose: 1,
          },
        });
      } else {
        setMobileError(
          response?.message || response?.data?.message || "Unable to send OTP",
        );
      }
    } catch (error) {
      console.error("Mobile OTP Error:", error);

      setMobileError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setVerifyingMobile(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailVerified) {
      setEmailError("Please verify your email");
      return;
    }

    if (!mobileVerified) {
      setMobileError("Please verify your mobile number");
      return;
    }

    console.log("Signup Data:", formData);
  };

  return (
    <>
      {/* Logo */}
      <div className="flex h-[10px] w-full items-center justify-center">
        <img src={images.logo} alt="Logo" className="w-[150px]" />
      </div>

      {/* Title */}
      <h5 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
        Sign up
      </h5>

      {/* Description */}
      <p className="mt-3 text-sm leading-5 text-gray-500">
        Highlight the best of your properties by using the List
        <br className="hidden sm:block" />
        Category shortcode. You can list categories
      </p>

      <form onSubmit={handleSubmit} className="mt-9 text-left">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={preventInvalidSpaces}
            placeholder="Enter your Full name"
            autoComplete="name"
            required
            maxLength={50}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-300"
          />
        </div>

        {/* Email */}
        <div className="mt-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email
          </label>

          <div
            className={`flex h-10 w-full overflow-hidden rounded-lg border bg-white ${
              emailError ? "border-red-500" : "border-gray-200"
            }`}
          >
            <input
              id="email"
              name="email"
              type="email"
              maxLength={50}
              value={formData.email}
              onChange={handleChange}
              onKeyDown={preventInvalidSpaces}
              placeholder="Enter your email"
              autoComplete="email"
              required
              disabled={emailVerified}
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:bg-gray-50"
            />

            <button
              type="button"
              onClick={handleEmailVerify}
              disabled={
                !formData.email ||
                !isValidEmail(formData.email) ||
                emailVerified ||
                verifyingEmail
              }
              className="w-[88px] shrink-0 bg-[#A5A5A5] text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {verifyingEmail
                ? "Sending..."
                : emailVerified
                  ? "Verified"
                  : "Verify"}
            </button>
          </div>

          {emailError && (
            <p className="mt-1.5 text-xs text-red-500">{emailError}</p>
          )}
        </div>

        {/* Mobile */}
        <div className="mt-5">
          <label
            htmlFor="mobile"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Mobile Number
          </label>

          <div
            className={`flex h-10 w-full overflow-hidden rounded-lg border bg-white ${
              mobileError ? "border-red-500" : "border-gray-200"
            }`}
          >
            <div className="flex h-full w-[65px] shrink-0 items-center justify-center bg-black text-sm font-medium text-white">
              +91
            </div>

            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setFormData((prev) => ({
                    ...prev,
                    mobile: value,
                  }));

                  setMobileVerified(false);

                  if (!value) {
                    setMobileError("");
                  } else if (!isValidMobile(value)) {
                    setMobileError("Please enter a valid mobile number");
                  } else {
                    setMobileError("");
                  }
                }
              }}
              placeholder="Enter your mobile number"
              autoComplete="tel"
              required
              disabled={mobileVerified}
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:bg-gray-50"
            />

            <button
              type="button"
              onClick={handleMobileVerify}
              disabled={
                !isValidMobile(formData.mobile) ||
                mobileVerified ||
                verifyingMobile
              }
              className="w-[88px] shrink-0 bg-[#A5A5A5] text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {verifyingMobile
                ? "Sending..."
                : mobileVerified
                  ? "Verified"
                  : "Verify"}
            </button>
          </div>

          {mobileError && (
            <p className="mt-1.5 text-xs text-red-500">{mobileError}</p>
          )}
        </div>

        {/* Password */}
        <div className="mt-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              maxLength={50}
              value={formData.password}
              onChange={handleChange}
              onKeyDown={preventInvalidSpaces}
              placeholder="Enter your Password"
              autoComplete="new-password"
              required
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 pr-11 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-300"
            />

            <Button
              type="text"
              onClick={() => setShowPassword((prev) => !prev)}
              ariaLabel={showPassword ? "Hide password" : "Show password"}
              className="!absolute !right-1 !top-1/2 !m-0 !flex !h-8 !w-8 !-translate-y-1/2 !items-center !justify-center !p-0 !text-gray-400"
            >
              <EyeIcon visible={showPassword} />
            </Button>
          </div>
        </div>

        {/* Sign Up */}
        <Button
          htmlType="submit"
          type="primary"
          className="mt-6 !h-10 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white"
        >
          Sign Up
        </Button>

        {/* Back */}
        <Button
          htmlType="button"
          type="default"
          onClick={() => window.history.back()}
          className="mt-4 !h-10 w-full rounded-lg border border-gray-300 bg-white text-md font-medium text-gray-900"
        >
          Back
        </Button>
      </form>

      {/* Login */}
      <p className="mt-7 text-center text-sm text-gray-500">
        You Already have Account ?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}

export default Signup;
