import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import { preventInvalidSpaces } from "../../utils/helper";
import { verifyPassword } from "../../api/auth.api";
import { useAuth } from "../../context/UserContext";
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

function EnterPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const { field } = location.state || {};

  // console.log("Verify Password Route State:", location.state);
  // console.log("Field:", field);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        user_id: user?.id,
        password,
      };

      // console.log("Verify Password Payload:", payload);

      const response = await verifyPassword(payload);

      // console.log("Verify Password Response:", response);

      if (response?.success === true || response?.success === 1) {
        if (field === "mobile") {
          navigate("/change", {
            state: {
              field: "mobile",
            },
          });
        } else if (field === "email") {
          navigate("/change", {
            state: {
              field: "email",
            },
          });
        }

        return;
      }

      setError(response?.message || "Invalid Password");
    } catch (err) {
      console.error("Verify Password Error:", err);

      setError(err?.response?.data?.message || "Invalid Password");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const descriptionText =
    field === "mobile"
      ? "Mobile number"
      : field === "email"
        ? "Email address"
        : "your account details";

  return (
    <>
      <div className="flex h-[10px] w-full items-center justify-center">
        <img src={images.logo} alt="Logo" className="w-[180px]" />
      </div>

      <h4 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
        Enter Password
      </h4>

      <p className="mt-3 text-sm leading-5 text-gray-500">
        Enter your login password to proceed to change
        <br className="hidden sm:block" />
        {descriptionText}
      </p>

      <form onSubmit={handleSubmit} className="mt-9 text-left">
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              onKeyDown={preventInvalidSpaces}
              className={`h-10 w-full rounded-lg border bg-white px-3 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
                error ? "border-red-400" : "border-gray-200"
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
  );
}

export default EnterPassword;
