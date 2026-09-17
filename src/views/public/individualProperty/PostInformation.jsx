import React, { useState } from "react";
import { InfoCircleOutlined, DownOutlined } from "@ant-design/icons";

const defaultSteps = [
  {
    label: "Submit Property",
    description:
      "Fill In Your Property Details, Photos, Documents, And Other Required Information, Then Submit The Request. The Request Will Be Sent To The Admin For Review.",
  },
  {
    label: "Admin Review",
    description:
      "The Admin Team Will Review Your Property Details And Either Approve Or Reject The Request.",
  },
  {
    label: "Requested",
    description:
      "Until The Admin Completes The Review, Your Property Will Remain In The Requested List.",
  },
  {
    label: "Approved",
    description:
      "Once Your Property Is Approved, It Will Move To The Approved List.",
  },
  {
    label: "Choose & Pay For A Plan",
    description:
      "Select A Suitable Posting Plan And Complete The Payment. Your Property Will Become Visible On The Website Only After The Payment Is Completed.",
  },
  {
    label: "Posted",
    description:
      "After Successful Payment, Your Property Will Move To The Posted List And Become Visible To All Users. It Will Remain Posted Until Your Selected Plan Expires.",
  },
  {
    label: "Expired",
    description:
      "Once Your Plan Expires, Your Property Will Move To The Expired List. You Can Renew Your Plan And Post The Property Again.",
  },
  {
    label: "Property Status Verification",
    description:
      "Our Team Will Contact You Once Every 7 Days To Check And Verify The Current Status Of Your Property.",
  },
  {
    label: "Sold",
    description:
      "Once Your Property Is Sold, Update The Property Status. After Verification, The Property Will Be Moved To The Sold List.",
  },
  {
    label: "Rejected",
    description:
      "If Your Property Request Is Rejected By The Admin, It Will Move To The Rejected List. You Cannot Resubmit The Same Request; You Will Need To Create And Submit A New Request.",
  },
];

// Custom-built accordion (no antd Collapse) so the header/body backgrounds
// sit flush against each other with zero unwanted inset padding - antd's
// internal .ant-collapse-content-box padding kept leaving a visible gap
// around the body, which this sidesteps entirely.
const PropertyPostInfo = ({
  title = "Property Post Information",
  intro = "Please Read Carefully",
  steps = defaultSteps,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full rounded-xl border border-amber-200 overflow-hidden text-start">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 bg-[#fbe6a2] px-4 py-3 sm:px-5 sm:py-4 text-left"
      >
        <span className="flex items-center gap-2 text-base sm:text-base font-semibold text-gray-900">
          <InfoCircleOutlined className="text-gray-900" />
          {title}
        </span>
        <DownOutlined
          className={`text-gray-800 text-sm shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="bg-[#fff8db] px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-base font-semibold text-gray-900 mb-3">{intro}</p>
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={step.label} className="text-sm leading-relaxed">
                <span className="font-semibold text-amber-700">
                  {index + 1}. {step.label}:
                </span>{" "}
                <span className="text-gray-700">{step.description}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default PropertyPostInfo;
