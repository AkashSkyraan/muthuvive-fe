import React, { useState } from "react";
import { Input } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import showStatusMessage from "../../../components/common/MessagePopup";

// Mock async "update" - swap this out for your real API call. Resolves
// or rejects so both success and failure paths through showStatusMessage
// can be demonstrated/tested.
const mockUpdateField = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const succeeded = Math.random() > 0.15;
      succeeded ? resolve() : reject();
    }, 600);
  });

const ProfilePage = () => {
  const [savedFullName, setSavedFullName] = useState("Muthvive's Properties");
  const [fullName, setFullName] = useState(savedFullName);
  const [isEditingName, setIsEditingName] = useState(false);

  const [mobileNumber, setMobileNumber] = useState("9234675890");
  const [isChangingMobile, setIsChangingMobile] = useState(false);

  const [email, setEmail] = useState("muthuvivesmroducts@gmail.com");
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleCancelName = () => {
    setFullName(savedFullName);
    setIsEditingName(false);
  };

  const handleSaveName = () => {
    mockUpdateField()
      .then(() => {
        setSavedFullName(fullName);
        setIsEditingName(false);
        showStatusMessage({
          type: "success",
          text: "Name Changed Successfully",
        });
      })
      .catch(() => {
        showStatusMessage({ type: "error", text: "Name Change Failed" });
      });
  };

  const handleChangeMobile = () => {
    setIsChangingMobile(true);
    mockUpdateField()
      .then(() => {
        showStatusMessage({
          type: "success",
          text: "Mobile Number Changed Successfully",
        });
      })
      .catch(() => {
        showStatusMessage({
          type: "error",
          text: "Mobile Number Change Failed",
        });
      })
      .finally(() => setIsChangingMobile(false));
  };

  const handleChangeEmail = () => {
    setIsChangingEmail(true);
    mockUpdateField()
      .then(() => {
        showStatusMessage({
          type: "success",
          text: "Email Changed Successfully",
        });
      })
      .catch(() => {
        showStatusMessage({ type: "error", text: "Email Change Failed" });
      })
      .finally(() => setIsChangingEmail(false));
  };

  return (
    <div className="w-[60%] mx-auto my-1.5 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="w-full max-w-[965px] max-h-fit mx-auto rounded-xl border border-gray-200 bg-white text-start">
        {/* Header */}
        <div className="border-b border-gray-200 px-5 py-4 sm:px-6 lg:px-7">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
            My Profile
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 px-5 py-6 sm:px-6 lg:px-7 lg:py-7">
          {/* Full Name */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-900">
              Full Name
            </p>

            {isEditingName ? (
              <>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="!rounded-full !px-5 !py-2.5 !text-sm"
                  autoFocus
                />

                <div className="mt-2 flex justify-end gap-x-5">
                  <button
                    type="button"
                    onClick={handleCancelName}
                    className="text-sm font-semibold text-red-500 transition-colors hover:text-red-600"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-stretch overflow-hidden rounded-lg border border-gray-200 sm:flex-row">
                <span className="min-w-0 flex-1 truncate px-5 py-2.5 text-sm text-gray-800">
                  {savedFullName}
                </span>

                <button
                  type="button"
                  onClick={handleEditName}
                  className="shrink-0 bg-secondary px-6 py-3 text-sm font-medium text-white transition-colors"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-900">
              Mobile Number
            </p>

            <div className="flex flex-col items-stretch overflow-hidden rounded-lg border border-gray-200 sm:flex-row">
              <span className="flex shrink-0 items-center justify-center bg-[#10182b] px-4 py-2.5 text-sm font-medium text-white">
                +91
              </span>

              <Input
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                variant="borderless"
                className="!flex-1 !rounded-none !px-4 !py-2.5 !text-sm"
              />

              <button
                type="button"
                onClick={handleChangeMobile}
                disabled={isChangingMobile}
                className="shrink-0 bg-secondary px-6 py-3 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingMobile ? "Changing..." : "Change"}
              </button>
            </div>

            <p className="mt-1.5 flex items-center gap-x-2 text-xs text-gray-700">
              <InfoCircleOutlined />
              Mobile number can be changed only once every 30 days.
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-900">Email</p>

            <div className="flex flex-col items-stretch overflow-hidden rounded-lg border border-gray-200 sm:flex-row">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="borderless"
                className="!flex-1 !rounded-none !px-4 !py-2.5 !text-sm"
              />

              <button
                type="button"
                onClick={handleChangeEmail}
                disabled={isChangingEmail}
                className="shrink-0 bg-secondary px-6 py-3 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingEmail ? "Changing..." : "Change"}
              </button>
            </div>

            <p className="mt-1.5 flex items-center gap-x-2 text-xs text-gray-700">
              <InfoCircleOutlined />
              Email ID can be changed only once every 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
