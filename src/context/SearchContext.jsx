import React, { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState("unknown");

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported");
      setLocationPermission("denied");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);
        setLocationPermission("granted");

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          );

          const data = await response.json();

          const address = data.address || {};

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "";

          const state = address.state || "";

          const formattedLocation = [city, state].filter(Boolean).join(", ");

          setLocation(formattedLocation);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationPermission("denied");
        }

        if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationPermission("unavailable");
        }

        if (error.code === error.TIMEOUT) {
          setLocationPermission("timeout");
        }

        console.error("Location error:", error);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  // First time only
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // User manually changes location
  const handleLocationChange = (value) => {
    setLocation(value);

    // Important:
    // Manual location means coordinates are no longer reliable
    setLatitude(null);
    setLongitude(null);
  };

  // Clear location
  const clearLocation = () => {
    setLocation("");
    setLatitude(null);
    setLongitude(null);
  };

  const search = () => {
    const searchData = {
      location,
      latitude,
      longitude,
    };

    console.log("Search:", searchData);

    // API call / navigation here
  };

  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation: handleLocationChange,

        latitude,
        longitude,

        locationLoading,
        locationPermission,

        getCurrentLocation,
        clearLocation,

        search,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }

  return context;
};
