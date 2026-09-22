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
      // property_id: "",
      name: "",
      mobile: "",
      email: "",
      message: "",
      regarding: "General Enquiry",
      status: "pending",
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
