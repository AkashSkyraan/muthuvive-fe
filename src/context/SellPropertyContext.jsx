import React, { createContext, useContext, useState } from "react";

const SellPropertyContext = createContext(null);

export const SellPropertyProvider = ({ children }) => {
  // ---------------------------------------------
  // PROPERTY CATEGORY
  // ---------------------------------------------

  const [category, setCategory] = useState(null);

  // ---------------------------------------------
  // CURRENT STEP
  // ---------------------------------------------

  const [currentStep, setCurrentStep] = useState(0);

  // ---------------------------------------------
  // FORM DATA
  // ---------------------------------------------

  const [formData, setFormData] = useState({
    location: {},
    propertyDetails: {},
    propertyFeatures: {},
    media: {},
  });

  // ---------------------------------------------
  // UPDATE FORM DATA
  // ---------------------------------------------

  const updateFormData = (section, values) => {
    setFormData((previous) => ({
      ...previous,
      [section]: values,
    }));
  };

  // ---------------------------------------------
  // CONTEXT VALUE
  // ---------------------------------------------
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
