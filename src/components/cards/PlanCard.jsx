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

  return (
    <div className="flex flex-col gap-4">
      {plans.map((plan) => (
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
                  plan.status === "Active Plan"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {plan.status}
              </span>
            </div>

            {/* Card Details */}
            <div className="px-3 py-3">
              {/* Paid Date */}
              <div className="mb-3">
                <p className="text-xs text-gray-400">Paid & Post On</p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {plan.paidDate}
                </p>
              </div>

              {/* Expiry Date */}
              <div>
                <p className="text-xs text-gray-400">Plan Expired On</p>

                <p
                  className={`mt-1 text-sm font-medium ${
                    plan.status === "Active Plan"
                      ? "text-gray-900"
                      : "text-[#d41010]"
                  }`}
                >
                  {plan.expiryDate}
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
      ))}
    </div>
  );
};

export default PlanCard;
