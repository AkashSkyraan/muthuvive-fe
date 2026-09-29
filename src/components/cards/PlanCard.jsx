import React from "react";

const PlanCard = ({ plans = [], onDownloadInvoice }) => {
  // console.log(plans);

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
  // Check whether plan is expired
  //
  // expired_at === today → Expired
  // expired_at < today    → Expired
  // expired_at > today    → Active
  // ---------------------------------------------------------
  const isPlanExpired = (expiredAt) => {
    if (!expiredAt) {
      return true;
    }

    // API value:
    // "2026-04-23 15:12:00"
    // Take only:
    // "2026-04-23"
    const expiredDate = String(expiredAt).slice(0, 10);

    const today = new Date();

    const todayDate =
      `${today.getFullYear()}-` +
      `${String(today.getMonth() + 1).padStart(2, "0")}-` +
      `${String(today.getDate()).padStart(2, "0")}`;

    return expiredDate <= todayDate;
  };

  return (
    <div className="flex flex-col gap-4">
      {plans.map((plan) => {
        const isExpired = isPlanExpired(plan.expired_at);
        const status = isExpired ? "Expired" : "Active Plan";

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
                    isExpired
                      ? "bg-gray-200 text-gray-500"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Card Details */}
              <div className="px-3 py-3">
                {/* Paid Date */}
                <div className="mb-3">
                  <p className="text-base text-gray-400 font-medium">
                    Paid & Post On
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {formatDate(plan.purchased_at)}
                  </p>
                </div>

                {/* Expiry Date */}
                <div>
                  <p className="text-base text-gray-400 font-medium">
                    {isExpired ? "Plan Expired On" : "Plan Expires In"}
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${
                      isExpired ? "text-[#d41010]" : "text-gray-900"
                    }`}
                  >
                    {formatDate(plan.expired_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Invoice */}
            <button
              type="button"
              onClick={() => onDownloadInvoice?.(plan)}
              className="mt-2.5 w-full rounded-md bg-blue-600 px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer"
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
