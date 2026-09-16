import React, { createContext, useContext, useState } from "react";

const SellPropertyContext = createContext(null);

export const SellPropertyProvider = ({ children }) => {
  const [category, setCategory] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    category: {},
    location: {},
    propertyDetails: {},
    propertyFeatures: {},
    media: {},
  });

  const updateFormData = (section, values) => {
    setFormData((previous) => ({
      ...previous,
      [section]: values,
    }));
  };

  const value = {
    category,
    setCategory,

    // currentStep,
    // setCurrentStep,

    formData,
    updateFormData,
  };

  return (
    <SellPropertyContext.Provider value={value}>
      {children}
    </SellPropertyContext.Provider>
  );
};

export const useSellProperty = () => {
  const context = useContext(SellPropertyContext);

  if (!context) {
    throw new Error("useSellProperty must be used inside SellPropertyProvider");
  }

  return context;
};
