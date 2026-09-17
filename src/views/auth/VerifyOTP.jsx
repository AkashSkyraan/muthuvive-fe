import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { images } from "../../config/Images";
import Button from "../../components/common/Button";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(131);

  const inputRefs = useRef([]);

  const identifier = location.state?.identifier || "muthuvive's@gmail.com";

  // OTP timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  };

  const handleOtpChange = (index, value) => {
    // Only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // Only keep one digit
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace → move to previous input
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

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = (event) => {
    event.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return;
    }

    // console.log("OTP:", otpValue);

    // Example:
    // navigate("/reset-password", {
    //   state: { identifier, otp: otpValue },
    // });
  };

  const handleResend = () => {
    if (timer > 0) return;

    // console.log("Resend OTP");

    setOtp(["", "", "", "", "", ""]);
    setTimer(131);

    inputRefs.current[0]?.focus();
  };

  const handleBack = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      {/* Logo */}
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

      {/* Email */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="text-sm font-medium text-gray-700">{identifier}</span>

        <button
          type="button"
          onClick={() => navigate("/signup")}
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

        {/* Timer */}
        <div className="mt-8 text-center">
          {timer > 0 ? (
            <p className="text-sm font-medium text-gray-500">
              Resend OTP in {formatTimer()}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-semibold text-[#165BEF] hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Verify */}
        <Button
          htmlType="submit"
          type="primary"
          disabled={otp.join("").length !== 6}
          className="mt-8 !h-12 w-full rounded-lg bg-[#165BEF] text-md font-semibold text-white shadow-sm transition hover:bg-[#0f4ed8] hover:shadow-md active:scale-[0.99]"
        >
          Verify
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
