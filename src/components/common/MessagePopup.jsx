import React, { useEffect, useState } from "react";

let showMessage = null;

const StatusMessage = ({ placement = "top-right" }) => {
  const [message, setMessage] = useState(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    showMessage = (data) => {
      setMessage(data);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    };

    return () => {
      showMessage = null;
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const header = document.getElementById("main-header");

      if (!header) return;

      const rect = header.getBoundingClientRect();

      setTop(rect.bottom + 16);
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  if (!message) return null;

  const placementClasses = {
    "top-right": "right-4 sm:right-6",
    "top-left": "left-4 sm:left-6",
    "top-center": "left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`
        fixed
        z-[9999]
        ${placementClasses[placement]}
      `}
      style={{ top: `${top}px` }}
    >
      <div
        className={`
          rounded-lg
          px-5
          py-2.5
          text-sm
          font-medium
          whitespace-nowrap
          ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }
        `}
      >
        {message.text}
      </div>
    </div>
  );
};

export const showStatusMessage = ({ type = "success", text }) => {
  if (!showMessage) return;

  showMessage({
    type,
    text,
  });
};

export default StatusMessage;
