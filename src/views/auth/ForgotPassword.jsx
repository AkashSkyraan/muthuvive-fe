import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../config/Images";
import Button from "../../components/common/Button";
import { preventInvalidSpaces } from "../../utils/helper";

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

function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");

  const isMobile = /^\d+$/.test(identifier) && identifier.length > 0;

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Login submitted");
  };

  const handleOTPGenerate = () => {
    navigate("/verify-otp");
  };

  return (
    <>
      <div className="flex h-[10px] w-full items-center justify-center">
        <img src={images.logo} alt="Logo" className="w-[180px]" />
      </div>

      <h5 className="mt-8 text-4xl font-[400px] tracking-tight text-gray-900">
        Forgot Password
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

        {/* Password */}

        <Button
          htmlType="submit"
          type="primary"
          className="mt-6 !h-11 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
          onClick={handleOTPGenerate}
        >
          Send OTP
        </Button>

        <Link to="/login">
          <Button
            // htmlType="submit"
            className="mt-6 !h-11 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
          >
            Back
          </Button>
        </Link>
      </form>
    </>
  );
}

export default ForgotPassword;
