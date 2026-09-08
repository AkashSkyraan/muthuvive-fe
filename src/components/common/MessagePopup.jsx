import React, { useRef } from "react";
import { message } from "antd";

// Module-level reference so showStatusMessage() can be called from any
// file, without needing to pass the api down through props everywhere.
let messageApi = null;

// Mount this ONCE near the root of your app (e.g. in App.jsx) so
// showStatusMessage() works from anywhere. Mounting it inside
// ProfilePage works too, but only while ProfilePage is on screen.
const StatusMessage = () => {
  const containerRef = useRef(null);

  // getContainer makes antd render notices as position:absolute inside
  // OUR div instead of its own fixed top-center portal - so positioning
  // becomes a plain Tailwind-styled wrapper, no CSS override needed.
  const [api, contextHolder] = message.useMessage({
    getContainer: () => containerRef.current,
    top: 8,
  });

  messageApi = api;

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] max-w-[90vw] w-fit"
    >
      {contextHolder}
    </div>
  );
};

// showStatusMessage({ type: "success", text: "Mobile Number Changed Successfully" })
// showStatusMessage({ type: "error", text: "Mobile Number Change Failed" })
export const showStatusMessage = ({ type = "success", text }) => {
  if (!messageApi) return;
  messageApi.open({
    type,
    icon: null,
    className: "!bg-transparent !shadow-none !p-0",
    content: (
      <span
        className={`inline-block rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap ${
          type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {text}
      </span>
    ),
  });
};

export default StatusMessage;
