import React, { useEffect, useRef, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { message } from "antd";

import { images } from "../../config/Images";
import Button from "../../components/common/Button";

import { requestOTP, verifyOTP } from "../../api/auth.api";

import { useSignup } from "../../context/SignupContext";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    verifyEmail,
    verifyMobile,
    resetEmailVerification,
    resetMobileVerification,
  } = useSignup();

  const { identifier, type, purpose, from, name } = location.state || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState(20);

  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);

    const seconds = timer % 60;

    return `${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleBack = () => {
    // from profile
    if (from === "profile") {
      navigate("/change", {
        state: {
          editing: true,
          type,
          identifier,
        },
      });

      return;
    }

    if (from === "signup" || purpose === 1) {
      if (type === "email") {
        resetEmailVerification();
      }

      if (type === "mobile") {
        resetMobileVerification();
      }

      navigate("/signup", {
        state: {
          editing: true,
          type,
          identifier,
          name,
        },
      });

      return;
    }

    if (from === "forgot-password") {
      navigate("/forgot-password", {
        state: {
          identifier,
          type,
        },
      });

      return;
    }

    navigate("/forgot-password", {
      state: {
        identifier,
        type,
      },
    });
  };
  const handleEdit = () => {
    handleBack();
  };

  const handleResend = async () => {
    if (timer > 0 || resendLoading) {
      return;
    }

    try {
      setResendLoading(true);

      const payload = {
        type,
        purpose,
      };

      if (type === "email") {
        payload.email = identifier;
      } else if (type === "mobile") {
        payload.mobile = identifier;
      }

      const response = await requestOTP(payload);

      if (response?.success === 1) {
        message.success("OTP sent successfully");

        setOtp(["", "", "", "", "", ""]);

        // Restart timer
        setTimer(180);

        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } else {
        message.error(response?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);

      message.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerify = async (event) => {
    event?.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOTP({
        type,
        purpose,
        otp: otpValue,

        ...(type === "email"
          ? {
              email: identifier,
            }
          : {
              mobile: identifier,
            }),
      });

      if (response?.success === 1) {
        message.success("OTP verified successfully");

        // new number or email change
        if (from === "profile") {
          if (type === "mobile") {
            navigate("/profile", {
              replace: true,
              state: {
                type: type,
                mobileVerified: true,
                verifiedMobile: identifier,
              },
            });
            return;
          }
          navigate("/profile", {
            replace: true,
            state: {
              type: type,
              emailVerified: true,
              verifiedEmail: identifier,
            },
          });

          return;
        }

        // Signup OTP
        if (purpose === 1) {
          if (type === "email") {
            verifyEmail(identifier);

            navigate("/signup", {
              replace: true,
            });

            return;
          }

          if (type === "mobile") {
            const cleanMobile = identifier
              .replace("+91", "")
              .replace(/\s/g, "");

            verifyMobile(cleanMobile);

            navigate("/signup", {
              replace: true,
            });

            return;
          }
        }

        // Forgot Password OTP
        if (purpose === 2) {
          navigate("/reset-password", {
            replace: true,
            state: {
              passwordResetVerified: true,
              identifier,
              type,
            },
          });

          return;
        }

        // Login email verification
        if (from === "login-email") {
          navigate("/login", {
            replace: true,
            state: {
              emailVerified: true,
              verifiedEmail: identifier,
            },
          });

          return;
        }

        navigate("/forgot-password", {
          replace: true,
          state: {
            identifier,
            type,
          },
        });
      } else {
        message.error(response?.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);

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

      {/* Heading */}
      <h4 className="mt-8 text-4xl font-normal tracking-tight text-gray-900">
        Verification
      </h4>

      {/* Description */}
      <p className="mt-5 text-center text-sm leading-6 text-gray-500">
        Enter Please enter One Time Password(OTP) that we
        <br />
        sent to your registered Email Address
      </p>

      {/* Identifier */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="text-sm font-medium text-gray-700">{identifier}</span>

        <button
          type="button"
          onClick={handleEdit}
          aria-label="Edit email"
          className="flex h-6 w-6 items-center justify-center text-gray-500 transition hover:text-gray-800"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="m14 8 2 2"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* OTP */}
      <form onSubmit={handleVerify} className="mt-5">
        <label
          htmlFor="identifier"
          className="mb-4 block text-sm font-medium text-gray-800 text-left"
        >
          Email / Mobile number
        </label>

        <div className="flex justify-start gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-12 w-12 rounded-xl border border-gray-300 bg-white text-center text-xl font-semibold text-gray-900 outline-none transition focus:border-[#165BEF] focus:ring-1 focus:ring-[#165BEF]"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Resend */}
        <div className="mt-8 flex h-5 justify-center">
          {timer > 0 ? (
            <div className="flex items-center text-sm font-medium text-gray-500">
              <span className="w-[100px] text-right">Resend OTP in</span>

              <span className="ml-2 w-[45px] text-left tabular-nums">
                {formatTimer()}
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="w-[147px] text-left text-sm font-semibold text-[#165BEF] hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>

        {/* Verify */}
        <Button
          htmlType="submit"
          type="primary"
          disabled={otp.join("").length !== 6 || loading || timer === 0}
          className="mt-8 !h-12 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>

        {/* Back */}
        <Button
          htmlType="button"
          type="default"
          onClick={handleBack}
          className="mt-3 !h-12 w-full rounded-lg border border-gray-300 bg-white text-md font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
        >
          Back
        </Button>
      </form>
    </>
  );
}

export default VerifyOTP;
