import React, { createContext, useContext, useEffect, useState } from "react";

import { getAboutus } from "../api/aboutus.api";

// Create the Context
const AboutUsContext = createContext(null);

export const AboutUsProvider = ({ children }) => {
  // Stores the About Us API response
  const [aboutUs, setAboutUs] = useState(null);

  // Used when the API is loading
  const [loading, setLoading] = useState(true);

  // Stores API error if the request fails
  const [error, setError] = useState(null);

  // Fetch About Us data when the Provider is mounted
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAboutus();

        setAboutUs(data);
      } catch (error) {
        console.error("Failed to fetch About Us data:", error);

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  const value = { aboutUs, loading, error };
  return (
    <AboutUsContext.Provider value={value}>{children}</AboutUsContext.Provider>
  );
};

// Custom hook for accessing About Us Context
export const useAboutUs = () => {
  const context = useContext(AboutUsContext);

  if (!context) {
    throw new Error("useAboutUs must be used inside AboutUsProvider");
  }

  return context;
};
