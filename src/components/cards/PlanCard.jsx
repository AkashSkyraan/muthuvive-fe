import React from "react";

const PlanCard = ({ plans = [] }) => {
  if (!plans.length) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        No plans found.
      </div>
    );
  }

  // ---------------------------------------------------------
  // Format date
  // Example:
  // 2026-10-01T07:58:20.000Z
  // →
  // 01-10-2026, Thursday, 01:28 PM
  // ---------------------------------------------------------
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .formatToParts(date)
      .reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {});
  };

  // ---------------------------------------------------------
  // Format date for display
  // ---------------------------------------------------------
  const formatDisplayDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    const parts = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).formatToParts(date);

    const get = (type) => parts.find((item) => item.type === type)?.value || "";

    return `${get("day")}-${get("month")}-${get(
      "year",
    )}, ${get("weekday")}, ${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
  };

  // ---------------------------------------------------------
  // Check expired
  // ---------------------------------------------------------
  const isPlanExpired = (expiredAt) => {
    if (!expiredAt) {
      return true;
    }

    const expiredDate = String(expiredAt).slice(0, 10);

    const today = new Date();

    const todayDate =
      `${today.getFullYear()}-` +
      `${String(today.getMonth() + 1).padStart(2, "0")}-` +
      `${String(today.getDate()).padStart(2, "0")}`;

    return expiredDate <= todayDate;
  };

  // ---------------------------------------------------------
  // Parse features
  // API:
  // features: "[\"Make possibilieties\",\"Filter Check\"]"
  // ---------------------------------------------------------
  const getFeatures = (features) => {
    if (!features) {
      return [];
    }

    if (Array.isArray(features)) {
      return features;
    }

    try {
      const parsed = JSON.parse(features);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Feature parse error:", error);
      return [];
    }
  };

  // ---------------------------------------------------------
  // Generate Invoice HTML
  // ---------------------------------------------------------
  const generateInvoiceHtml = (plan) => {
    const expired = isPlanExpired(plan.expired_at);

    const status = expired ? "EXPIRED" : "ACTIVE PLAN";

    const features = getFeatures(plan.features);

    const planNumber = plan.plan_id
      ? String(plan.plan_id).padStart(2, "0")
      : "--";

    const newAmount = Number(plan.new_amount || 0);

    const oldAmount = Number(plan.old_amount || 0);

    const formattedNewAmount = newAmount.toLocaleString("en-IN");

    const formattedOldAmount = oldAmount.toLocaleString("en-IN");

    return `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>
  Muth Vive - Plan Invoice
</title>

<style>

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: #f3f4f6;
  font-family:
    Arial,
    Helvetica,
    sans-serif;

  color: #111827;
}

/* --------------------------------------------------
   PAGE
-------------------------------------------------- */

.page {
  width: 210mm;
  min-height: 297mm;

  margin: 20px auto;

  background: #ffffff;

  padding: 16mm;
}

/* --------------------------------------------------
   HEADER
-------------------------------------------------- */

.header {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  padding-bottom: 24px;

  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-size: 28px;

  font-weight: 800;

  color: #077442;

  letter-spacing: -0.5px;
}

.logo-subtitle {
  margin-top: 5px;

  color: #6b7280;

  font-size: 12px;
}

.invoice-info {
  text-align: right;
}

.invoice-title {
  font-size: 22px;

  font-weight: 800;

  color: #111827;
}

.invoice-subtitle {
  margin-top: 5px;

  font-size: 12px;

  color: #6b7280;
}

/* --------------------------------------------------
   PLAN HEADER
-------------------------------------------------- */

.plan-header {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  padding: 30px 0;
}

.plan-label {
  color: #6b7280;

  font-size: 11px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 1px;
}

.plan-name {
  margin-top: 8px;

  font-size: 30px;

  font-weight: 800;

  color: #111827;
}

.property-id {
  margin-top: 8px;

  font-size: 13px;

  color: #6b7280;
}

.status {
  display: inline-block;

  padding: 8px 14px;

  border-radius: 5px;

  font-size: 11px;

  font-weight: 700;

  ${
    expired
      ? `
        background: #f3f4f6;
        color: #6b7280;
      `
      : `
        background: #e8f7ef;
        color: #077442;
      `
  }
}

/* --------------------------------------------------
   DATES
-------------------------------------------------- */

.date-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 20px;

  margin-bottom: 25px;
}

.date-card {
  padding: 18px;

  border: 1px solid #e5e7eb;

  border-radius: 8px;

  background: #f8fafc;
}

.date-label {
  font-size: 11px;

  color: #6b7280;

  font-weight: 700;

  text-transform: uppercase;
}

.date-value {
  margin-top: 7px;

  font-size: 14px;

  font-weight: 700;

  color: #111827;
}

/* --------------------------------------------------
   CONTENT
-------------------------------------------------- */

.content {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 20px;
}

.card {
  border: 1px solid #e5e7eb;

  border-radius: 10px;

  padding: 22px;
}

.card-title {
  margin-bottom: 20px;

  font-size: 13px;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.5px;
}

/* --------------------------------------------------
   PRICE
-------------------------------------------------- */

.price {
  font-size: 34px;

  font-weight: 800;

  color: #077442;
}

.old-price {
  margin-top: 5px;

  font-size: 14px;

  color: #9ca3af;

  text-decoration: line-through;
}

.duration {
  margin-top: 22px;

  padding-top: 18px;

  border-top: 1px solid #e5e7eb;
}

.duration-label {
  font-size: 11px;

  color: #6b7280;
}

.duration-value {
  margin-top: 5px;

  font-size: 16px;

  font-weight: 700;
}

/* --------------------------------------------------
   FEATURES
-------------------------------------------------- */

.feature {
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 13px;

  font-size: 13px;

  color: #374151;
}

.check {
  display: flex;

  align-items: center;

  justify-content: center;

  width: 20px;

  height: 20px;

  border-radius: 50%;

  background: #e8f7ef;

  color: #077442;

  font-size: 11px;

  font-weight: 700;

  flex-shrink: 0;
}

/* --------------------------------------------------
   PROPERTY INFORMATION
-------------------------------------------------- */

.property-info {
  margin-top: 25px;

  padding: 20px;

  background: #f8fafc;

  border: 1px solid #e5e7eb;

  border-radius: 8px;
}

.info-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;
}

.info-label {
  font-size: 10px;

  color: #6b7280;

  font-weight: 700;

  text-transform: uppercase;
}

.info-value {
  margin-top: 5px;

  font-size: 13px;

  font-weight: 700;

  color: #111827;

  word-break: break-word;
}

/* --------------------------------------------------
   FOOTER
-------------------------------------------------- */

.footer {
  margin-top: 35px;

  padding-top: 20px;

  border-top: 1px solid #e5e7eb;

  text-align: center;

  font-size: 11px;

  color: #9ca3af;

  line-height: 1.6;
}

.footer strong {
  color: #077442;
}

/* --------------------------------------------------
   PRINT
-------------------------------------------------- */

@page {
  size: A4;

  margin: 0;
}

@media print {

  html,
  body {
    width: 210mm;

    min-height: 297mm;

    background: #ffffff;
  }

  .page {
    width: 210mm;

    min-height: 297mm;

    margin: 0;

    padding: 16mm;
  }

}

</style>

</head>

<body>

<div class="page">

  <!-- HEADER -->

  <div class="header">

    <div>

      <div class="logo">
        MUTH VIVE
      </div>

      <div class="logo-subtitle">
        Real Estate & Property Solutions
      </div>

    </div>

    <div class="invoice-info">

      <div class="invoice-title">
        PLAN RECEIPT
      </div>

      <div class="invoice-subtitle">
        Property Plan Purchase
      </div>

    </div>

  </div>


  <!-- PLAN -->

  <div class="plan-header">

    <div>

      <div class="plan-label">
        Property Plan
      </div>

      <div class="plan-name">
        Plan ${planNumber}
      </div>

      <div class="property-id">
        Property ID:
        <strong>${plan.prop_id || "-"}</strong>
      </div>

    </div>

    <div>

      <span class="status">
        ${status}
      </span>

    </div>

  </div>


  <!-- DATES -->

  <div class="date-grid">

    <div class="date-card">

      <div class="date-label">
        Paid & Post On
      </div>

      <div class="date-value">
        ${formatDisplayDate(plan.purchased_at)}
      </div>

    </div>


    <div class="date-card">

      <div class="date-label">
        ${expired ? "Plan Expired On" : "Plan Expires On"}
      </div>

      <div
        class="date-value"
        style="${expired ? "color:#d41010;" : "color:#111827;"}"
      >
        ${formatDisplayDate(plan.expired_at)}
      </div>

    </div>

  </div>


  <!-- CONTENT -->

  <div class="content">

    <!-- PLAN DETAILS -->

    <div class="card">

      <div class="card-title">
        Plan Details
      </div>

      <div class="price">
        ₹${formattedNewAmount}
      </div>

      ${
        oldAmount > 0
          ? `
            <div class="old-price">
              ₹${formattedOldAmount}
            </div>
          `
          : ""
      }

      <div class="duration">

        <div class="duration-label">
          Plan Duration
        </div>

        <div class="duration-value">
          ${plan.duration || 0} Days
        </div>

      </div>

    </div>


    <!-- FEATURES -->

    <div class="card">

      <div class="card-title">
        Features
      </div>

      ${
        features.length
          ? features
              .map(
                (feature) => `
                  <div class="feature">

                    <div class="check">
                      ✓
                    </div>

                    <div>
                      ${feature}
                    </div>

                  </div>
                `,
              )
              .join("")
          : `
              <div
                style="
                  font-size:13px;
                  color:#9ca3af;
                "
              >
                No features available
              </div>
            `
      }

    </div>

  </div>


  <!-- PROPERTY INFO -->

  <div class="property-info">

    <div class="info-grid">

      <div>

        <div class="info-label">
          Property ID
        </div>

        <div class="info-value">
          ${plan.prop_id || "-"}
        </div>

      </div>


      <div>

        <div class="info-label">
          User ID
        </div>

        <div class="info-value">
          ${plan.user_id || "-"}
        </div>

      </div>


      <div>

        <div class="info-label">
          Plan ID
        </div>

        <div class="info-value">
          ${plan.plan_id || "-"}
        </div>

      </div>

    </div>

  </div>


  <!-- FOOTER -->

  <div class="footer">

    Thank you for choosing
    <strong>Muth Vive</strong>

    <br />

    This is a system generated plan receipt.

  </div>

</div>

<script>

window.onload = function () {

  setTimeout(function () {

    window.focus();

    window.print();

  }, 300);

};

</script>

</body>

</html>
    `;
  };

  // ---------------------------------------------------------
  // Download / Print Invoice
  // ---------------------------------------------------------
  const handleDownloadInvoice = (plan) => {
    try {
      if (!plan) {
        return;
      }

      const html = generateInvoiceHtml(plan);

      const printWindow = window.open("", "_blank", "width=1000,height=900");

      if (!printWindow) {
        alert("Please allow popups in your browser to download the invoice.");

        return;
      }

      printWindow.document.open();

      printWindow.document.write(html);

      printWindow.document.close();
    } catch (error) {
      console.error("Invoice generation error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {plans.map((plan) => {
        const isExpired = isPlanExpired(plan.expired_at);

        const status = isExpired ? "Expired" : "Active Plan";

        return (
          <article key={plan.id} className="flex h-full w-full flex-col">
            {/* Plan Card */}

            <div className="flex-1 overflow-hidden rounded-md border border-gray-200 bg-white">
              {/* Card Header */}

              <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2.5">
                <h3 className="text-base font-medium text-gray-900">
                  {plan.name || `Plan ${plan.plan_id}`}
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
                  <p className="text-base font-medium text-gray-400">
                    Paid & Post On
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {formatDisplayDate(plan.purchased_at)}
                  </p>
                </div>

                {/* Expiry */}

                <div>
                  <p className="text-base font-medium text-gray-400">
                    {isExpired ? "Plan Expired On" : "Plan Expires On"}
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${
                      isExpired ? "text-[#d41010]" : "text-gray-900"
                    }`}
                  >
                    {formatDisplayDate(plan.expired_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Invoice */}

            <button
              type="button"
              onClick={() => handleDownloadInvoice(plan)}
              className="mt-2.5 w-full cursor-pointer rounded-md bg-blue-600 px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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
