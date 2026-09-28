import React, { useState } from "react";
import {
  UpOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const mockActivities = [
  {
    id: 1,
    requested_at: "2026-04-23 15:12:00",
    is_approved: 1,
    approved_at: "2026-04-23 15:12:00",
    is_rejected: 1,
    rejected_reason:
      "Your Request Was Rejected Because The Submitted Property Details Or Documents Did Not Meet Our Listing Requirements.",
  },
  {
    id: 2,
    requested_at: "2026-04-20 11:30:00",
    is_approved: 0,
    approved_at: null,
    is_rejected: 0,
    rejected_reason: null,
  },
];

const PropertyActivity = ({ activities = mockActivities }) => {
  const [isOpen, setIsOpen] = useState(true);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${day}-${month}-${year}, ${weekday}, ${time}`;
  };

  // Find the rejected activity, if any
  const rejectedActivity = activities.find(
    (activity) => Number(activity.is_rejected) === 1,
  );

  return (
    <div className="w-full">
      {/* Property Activity Accordion */}
      <div className="w-full text-start overflow-hidden rounded-md border border-gray-200 bg-white">
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-4 sm:px-5 sm:py-5"
        >
          <span className="text-sm font-semibold text-gray-900 sm:text-base">
            Property Activity
          </span>

          {isOpen ? (
            <UpOutlined className="text-sm text-gray-800 sm:text-base" />
          ) : (
            <DownOutlined className="text-sm text-gray-800 sm:text-base" />
          )}
        </button>

        {/* Accordion Content */}
        {isOpen && (
          <div className="border-t border-gray-200 px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex flex-col gap-6">
              {activities.map((activity) => (
                <div key={activity.id}>
                  {/* Request Sent */}
                  <div>
                    <p className="text-xs text-gray-400 sm:text-sm">
                      Request Send
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-900 sm:text-sm">
                      {formatDate(activity.requested_at)}
                    </p>
                  </div>

                  {/* Request Approved */}
                  {Number(activity.is_approved) === 1 &&
                    activity.approved_at && (
                      <div className="mt-6">
                        <p className="text-xs text-gray-400 sm:text-sm">
                          Request Approved
                        </p>

                        <p className="mt-1 text-xs font-semibold text-gray-900 sm:text-sm">
                          {formatDate(activity.approved_at)}
                        </p>
                      </div>
                    )}

                  {/* Request Pending */}
                  {Number(activity.is_approved) !== 1 &&
                    Number(activity.is_rejected) !== 1 && (
                      <div className="mt-6">
                        <p className="text-xs text-gray-400 sm:text-sm">
                          Request Status
                        </p>

                        <p className="mt-1 text-xs font-semibold text-gray-900 sm:text-sm">
                          Pending Approval
                        </p>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rejected Reason */}
      {rejectedActivity && (
        <div className="mt-4 text-start w-full rounded-lg bg-[#FFC2C2] px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-x-2">
            <InfoCircleOutlined className="text-xs text-[#D41010] sm:text-sm" />

            <p className="text-xs font-semibold text-[#D41010] sm:text-sm">
              Rejected Reason
            </p>
          </div>

          <p className="mt-2 text-xs leading-4 text-gray-900 sm:text-sm sm:leading-5 font-medium">
            {rejectedActivity.rejected_reason}
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyActivity;
