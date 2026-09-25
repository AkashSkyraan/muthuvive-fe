import React, { createContext, useContext, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const LoginModalContext = createContext(null);

export const LoginModalProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const goToLogin = () => {
    setIsLoginModalOpen(false);
    navigate("/login");
  };

  return (
    <LoginModalContext.Provider
      value={{
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}

      <Modal
        open={isLoginModalOpen}
        onCancel={closeLoginModal}
        footer={null}
        centered
        width={420}
        destroyOnClose
        closable={true}
        styles={{
          content: {
            padding: 0,
            borderRadius: 20,
            overflow: "hidden",
          },
          mask: {
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <div className="relative bg-white">
          {/* Top Section */}
          <div className="px-8 pt-8 pb-5 text-center">
            {/* Icon */}
            {/* <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <UserOutlined className="text-white text-xl" />
              </div>
            </div> */}

            {/* Heading */}
            <h2 className="mt-5 text-2xl font-semibold text-gray-900">
              Login Required
            </h2>

            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Please login to your account to continue and access this feature.
            </p>
          </div>

          {/* Bottom Section */}
          <div className="px-8 pb-8">
            <div className="flex flex-col gap-3">
              {/* Login */}
              <Button
                type="primary"
                block
                size="large"
                className="!h-12 !rounded-xl !bg-secondary !border-secondary !font-semibold !text-base"
                onClick={goToLogin}
              >
                Login
              </Button>

              {/* Cancel */}
              <Button
                block
                size="large"
                className="!h-12 !rounded-xl !font-medium !text-gray-600 !border-gray-200 hover:!border-gray-300"
                onClick={closeLoginModal}
              >
                Maybe Later
              </Button>
            </div>

            {/* Footer text */}
          </div>
        </div>
      </Modal>
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);

  if (!context) {
    throw new Error("useLoginModal must be used inside LoginModalProvider");
  }

  return context;
};
