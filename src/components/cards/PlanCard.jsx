import React from "react";

const PlanCard = ({ plans = [], onDownloadInvoice }) => {
  console.log(plans);

  if (!plans.length) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        No plans found.
      </div>
    );
  }

  // ---------------------------------------------------------
  // Format API date
  // Example:
  // 2026-04-23 15:12:00
  // → 23-04-2026, Thursday, 03:12 PM
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // Calculate remaining calendar days
  // > 0  → Active
  // <= 0 → Expired
  // ---------------------------------------------------------
  const getRemainingDays = (expiredAt) => {
    if (!expiredAt) {
      return 0;
    }

    const expiredDate = new Date(expiredAt);

    if (Number.isNaN(expiredDate.getTime())) {
      return 0;
    }

    const today = new Date();

    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const expiredDateOnly = new Date(
      expiredDate.getFullYear(),
      expiredDate.getMonth(),
      expiredDate.getDate(),
    );

    const differenceInMs = expiredDateOnly - todayOnly;

    return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col gap-4">
      {plans.map((plan) => {
        const remainingDays = getRemainingDays(plan.expired_at);

        const isActive = remainingDays > 0;

        const status = isActive ? "Active Plan" : "Expired";

        return (
          <article key={plan.id} className="w-full h-full flex flex-col">
            {/* Plan Card */}
            <div className="flex-1 overflow-hidden rounded-md border border-gray-200 bg-white">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2.5">
                <h3 className="text-base font-medium text-gray-900">
                  {plan.name}
                </h3>

                <span
                  className={`rounded-sm px-2 py-0.5 text-xs font-medium ${
                    isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Card Details */}
              <div className="px-3 py-3">
                {/* Paid Date */}
                <div className="mb-3">
                  <p className="text-xs text-gray-400">Paid & Post On</p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatDate(plan.purchased_at)}
                  </p>
                </div>

                {/* Expiry Date */}
                <div>
                  <p className="text-xs text-gray-400">Plan Expired On</p>

                  <p className={`mt-1 text-sm font-medium text-[#d41010]`}>
                    {formatDate(plan.expired_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Invoice */}
            <button
              type="button"
              onClick={() => onDownloadInvoice?.(plan)}
              className="mt-2.5 w-full rounded-md bg-blue-600 px-3 py-3 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              Download Invoice
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default PlanCard;
