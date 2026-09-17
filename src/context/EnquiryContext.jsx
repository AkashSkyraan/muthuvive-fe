import { createContext, useContext, useState } from "react";

const EnquiryContext = createContext(null);

export const EnquiryProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    regarding: "General Enquiry",
    status: "pending",
  });

  const resetFormData = () => {
    setFormData({
      property_id: "",
      regarding: "",
      name: "",
      mobile: "",
      email: "",
      message: "",
    });
  };
  return (
    <EnquiryContext.Provider
      value={{
        formData,
        setFormData,
        resetFormData,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);

  if (!context) {
    throw new Error("useEnquiry must be used inside AboutUsProvider");
  }

  return context;
};
