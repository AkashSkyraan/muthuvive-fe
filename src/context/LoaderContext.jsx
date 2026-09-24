import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext(undefined);

// Wrap your app with this once (e.g. in App.jsx), then any component
// can call showLoader()/hideLoader() around an API call - no prop
// drilling needed, the <Loader /> component below reacts automatically.

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider
      value={{ isLoading, showLoader, hideLoader, setIsLoading }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
