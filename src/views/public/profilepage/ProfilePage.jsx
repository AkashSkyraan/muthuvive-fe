import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { showStatusMessage } from "../../../components/common/MessagePopup.jsx";
import { updateProfile } from "../../../api/auth.api.js";
import { useAuth } from "../../../context/UserContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const { type, emailVerified, mobileVerified, verifiedEmail, verifiedMobile } =
    location.state || {};

  // console.log("user details", user);
  // console.log("Profile Route State:", location.state);

  const [savedFullName, setSavedFullName] = useState(user?.user_name);

  const [fullName, setFullName] = useState(savedFullName);
  const [isEditingName, setIsEditingName] = useState(false);

  const [mobileNumber, setMobileNumber] = useState(user?.mobile);
  const [isChangingMobile, setIsChangingMobile] = useState(false);

  const [email, setEmail] = useState(user?.email);
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  useEffect(() => {
    if (!user || !user.id) return;

    setSavedFullName(user.user_name || "");
    setFullName(user.user_name || "");
    setMobileNumber(user.mobile || "");
    setEmail(user.email || "");
  }, [user]);

  useEffect(() => {
    const updateVerifiedContact = async () => {
      const isMobileUpdate =
        type === "mobile" && mobileVerified === true && verifiedMobile;

      const isEmailUpdate =
        type === "email" && emailVerified === true && verifiedEmail;

      if (!isMobileUpdate && !isEmailUpdate) {
        return;
      }

      try {
        if (isMobileUpdate) {
          setIsChangingMobile(true);

          const payload = {
            user_id: user?.id,
            mobile: verifiedMobile,
          };

          // console.log("Update Mobile Payload:", payload);

          const response = await updateProfile(payload);

          // console.log("Update Mobile Response:", response);

          if (response?.success !== 1) {
            showStatusMessage({
              type: "error",
              text: "Mobile Number Change Failed",
            });

            return;
          }

          setMobileNumber(verifiedMobile);

          setUser((prevUser) => ({
            ...prevUser,
            mobile: verifiedMobile,
          }));

          showStatusMessage({
            type: "success",
            text: "Mobile Number Changed Successfully",
          });
        }

        if (isEmailUpdate) {
          setIsChangingEmail(true);

          const payload = {
            user_id: user?.id,
            email: verifiedEmail,
          };

          // console.log("Update Email Payload:", payload);

          const response = await updateProfile(payload);

          // console.log("Update Email Response:", response);

          if (response?.success !== 1) {
            showStatusMessage({
              type: "error",
              text: "Email Change Failed",
            });

            return;
          }

          setEmail(verifiedEmail);

          setUser((prevUser) => ({
            ...prevUser,
            email: verifiedEmail,
          }));

          showStatusMessage({
            type: "success",
            text: "Email Changed Successfully",
          });
        }
      } catch (error) {
        console.error("Contact update failed:", error);

        showStatusMessage({
          type: "error",
          text:
            type === "mobile"
              ? "Mobile Number Change Failed"
              : "Email Change Failed",
        });
      } finally {
        setIsChangingMobile(false);
        setIsChangingEmail(false);

        // Clear the verification state so the API is not called
        // again if the Profile page is rendered again.
        navigate(location.pathname, {
          replace: true,
          state: null,
        });
      }
    };

    updateVerifiedContact();
  }, [
    type,
    emailVerified,
    mobileVerified,
    verifiedEmail,
    verifiedMobile,
    navigate,
    location.pathname,
    setUser,
  ]);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleCancelName = () => {
    setFullName(savedFullName);
    setIsEditingName(false);
  };

  const handleSaveName = async () => {
    try {
      const payload = {
        user_id: user?.id,
        name: fullName,
      };

      const response = await updateProfile(payload);
      setUser(fullName);

      // console.log("Update Profile Response:", response);

      if (response?.success !== 1) {
        showStatusMessage({
          type: "error",
          text: "Name Change Failed",
        });

        return;
      }

      setSavedFullName(fullName);
      setIsEditingName(false);

      showStatusMessage({
        type: "success",
        text: "Name Changed Successfully",
      });
    } catch (error) {
      console.error("Profile update failed:", error);

      showStatusMessage({
        type: "error",
        text: "Name Change Failed",
      });
    }
  };

  const handleChangeMobile = () => {
    navigate("/verify-password", {
      state: {
        field: "mobile",
      },
    });
  };

  const handleChangeEmail = () => {
    navigate("/verify-password", {
      state: {
        field: "email",
      },
    });
  };

  return (
    <div className="w-full md:w-[90%] lg:w-[60%] mx-auto my-1.5 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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
            <p className="mb-2 text-base font-semibold text-gray-900">
              Full Name
            </p>

            {isEditingName ? (
              <>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="!rounded-full !px-5 !py-2.5 !text-base"
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
              <div className="flex flex-row items-stretch overflow-hidden rounded-lg border border-gray-200">
                <span className="min-w-0 flex-1 truncate px-5 py-2.5 text-sm text-gray-800">
                  {savedFullName}
                </span>

                <button
                  type="button"
                  onClick={handleEditName}
                  className="shrink-0 bg-secondary px-4 sm:px-6 py-3 text-sm font-medium text-white transition-colors"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <p className="mb-2 text-base font-semibold text-gray-900">
              Mobile Number
            </p>

            <div className="flex flex-row overflow-hidden rounded-lg border border-gray-200">
              {/* +91 + Mobile Number */}
              <div className="flex min-w-0 flex-1">
                <span className="flex shrink-0 items-center justify-center bg-[#10182b] px-4 py-2.5 text-sm font-medium text-white">
                  +91
                </span>

                <Input
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  variant="borderless"
                  className="!min-w-0 !flex-1 !rounded-none !px-4 !py-2.5 !text-sm"
                />
              </div>

              {/* Change Button */}
              <button
                type="button"
                onClick={handleChangeMobile}
                disabled={isChangingMobile}
                className="shrink-0 bg-secondary px-4 sm:px-6 py-3 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingMobile ? "Changing..." : "Change"}
              </button>
            </div>

            <p className="mt-1.5 flex items-center gap-x-2 text-sm text-gray-700">
              <InfoCircleOutlined />
              Mobile number can be changed only once every 30 days.
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="mb-2 text-base font-semibold text-gray-900">Email</p>

            <div className="flex flex-row items-stretch overflow-hidden rounded-lg border border-gray-200">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="borderless"
                className="!min-w-0 !flex-1 !rounded-none !px-4 !py-2.5 !text-sm"
              />

              <button
                type="button"
                onClick={handleChangeEmail}
                disabled={isChangingEmail}
                className="shrink-0 bg-secondary px-4 sm:px-6 py-3 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingEmail ? "Changing..." : "Change"}
              </button>
            </div>

            <p className="mt-1.5 flex items-center gap-x-2 text-sm text-gray-700">
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
