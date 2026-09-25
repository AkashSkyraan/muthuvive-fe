import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

import Button from "../../components/common/Button";
import { preventInvalidSpaces } from "../../utils/helper";
import { resetPassword } from "../../api/auth.api";
import images from "../../config/Images";

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

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const { identifier, type } = location.state || {};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      message.error("Please enter your new password");
      return;
    }

    if (password.length < 8) {
      message.error("Password must be at least 8 characters");
      return;
    }

    if (!confirmPassword) {
      message.error("Please confirm your new password");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    if (!identifier) {
      message.error("Email or mobile number is missing");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...(type === "email"
          ? {
              email: identifier,
            }
          : {
              mobile: identifier,
            }),
        password,
      };

      const response = await resetPassword(payload);

      if (response?.success === true || response?.success === 1) {
        message.success(response?.message || "Password reset successfully");

        navigate("/login", {
          replace: true,
          state: {
            identifier,
            type,
          },
        });

        return;
      }

      message.error(response?.message || "Password reset failed");
    } catch (error) {
      console.error("Reset Password Error:", error);

      message.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-[10px] w-full items-center justify-center">
        <img src={images.logo} alt="Logo" className="w-[180px]" />
      </div>

      <h4 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
        Change Password
      </h4>

      <p className="mt-3 text-sm leading-5 text-gray-500">
        Create a new password for your account.
        <br className="hidden sm:block" />
        Make sure both passwords match.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 text-left">
        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            New Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              autoComplete="new-password"
              required
              onKeyDown={preventInvalidSpaces}
              className={`h-10 w-full rounded-lg border bg-white px-3 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
                password && password.length < 8
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            />

            <Button
              type="text"
              onClick={() => setShowPassword((prev) => !prev)}
              ariaLabel={showPassword ? "Hide password" : "Show password"}
              className="!absolute !right-1 !top-1/2 !m-0 !flex !h-8 !w-8 !-translate-y-1/2 !items-center !justify-center !p-0 !text-gray-400 hover:!text-gray-700"
            >
              <EyeIcon visible={showPassword} />
            </Button>
          </div>

          {password && password.length < 8 && (
            <p className="mt-2 text-xs text-red-500">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mt-5">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Confirm Password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              autoComplete="new-password"
              required
              onKeyDown={preventInvalidSpaces}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400"
            />

            <Button
              type="text"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              ariaLabel={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="!absolute !right-1 !top-1/2 !m-0 !flex !h-8 !w-8 !-translate-y-1/2 !items-center !justify-center !p-0 !text-gray-400 hover:!text-gray-700"
            >
              <EyeIcon visible={showConfirmPassword} />
            </Button>
          </div>

          {confirmPassword && password !== confirmPassword && (
            <p className="mt-2 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>

        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={loading}
          className="mt-6 !h-12 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
        >
          Change Password
        </Button>
      </form>
    </>
  );
}

export default ChangePassword;
