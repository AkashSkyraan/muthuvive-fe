import React, { createContext, useContext, useState } from "react";

const SignupContext = createContext(null);

export const SignupProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({
    name : "",
    email: "",
    mobile: "",
    emailVerified: false,
    mobileVerified: false,
  });

  const verifyEmail = (email) => {
    setSignupData((prev) => ({
      ...prev,
      email,
      emailVerified: true,
    }));
  };

  const verifyMobile = (mobile) => {
    const cleanMobile = mobile.replace("+91", "").replace(/\s/g, "");

    setSignupData((prev) => ({
      ...prev,
      mobile: cleanMobile,
      mobileVerified: true,
    }));
  };

  const resetEmailVerification = () => {
    setSignupData((prev) => ({
      ...prev,
      emailVerified: false,
    }));
  };

  const resetMobileVerification = () => {
    setSignupData((prev) => ({
      ...prev,
      mobileVerified: false,
    }));
  };

  const clearSignupData = () => {
    setSignupData({
      name : "",
      email: "",
      mobile: "",
      emailVerified: false,
      mobileVerified: false,
    });
  };


  const updateSignupData = (data) => {
  setSignupData((prev) => ({
    ...prev,
    ...data,
  }));
};
  return (
    <SignupContext.Provider
      value={{
        signupData,
        setSignupData,
        updateSignupData,
        verifyEmail,
        verifyMobile,
        resetEmailVerification,
        resetMobileVerification,
        clearSignupData,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);

  if (!context) {
    throw new Error("useSignup must be used inside SignupProvider");
  }

  return context;
};