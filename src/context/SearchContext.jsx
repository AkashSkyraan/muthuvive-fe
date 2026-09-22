import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchParams] = useSearchParams();

  // =========================
  // STATE
  // =========================
  const [location, setLocationState] = useState("");
  const [propertyType, setPropertyTypeState] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState("unknown");

  // =========================
  // URL -> STATE (initial + back/forward)
  // =========================
  useEffect(() => {
    const urlLocation = searchParams.get("location") || "";
    const urlPropertyType = searchParams.get("propertyType") || "";

    setLocationState((prev) => (prev !== urlLocation ? urlLocation : prev));
    setPropertyTypeState((prev) =>
      prev !== urlPropertyType ? urlPropertyType : prev,
    );
  }, [searchParams]);

  // =========================
  // GET CURRENT LOCATION
  // =========================
  const getCurrentLocation = useCallback(() => {
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

          const formattedLocation = [city, state]
            .filter(Boolean)
            .join(", ");

          setLocationState(formattedLocation);
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
  }, []);

  // =========================
  // FIRST MOUNT — geolocation (URL la location illena mattum)
  // =========================
  useEffect(() => {
    if (!searchParams.get("location")) {
      getCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // SET LOCATION (manual)
  // =========================
  const setLocation = useCallback((value) => {
    setLocationState(value);
    setLatitude(null);
    setLongitude(null);
  }, []);

  // =========================
  // SET PROPERTY TYPE
  // =========================
  const setPropertyType = useCallback((value) => {
    setPropertyTypeState(value);
  }, []);

  // =========================
  // CLEAR LOCATION
  // =========================
  const clearLocation = useCallback(() => {
    setLocationState("");
    setLatitude(null);
    setLongitude(null);
  }, []);

  // =========================
  // CLEAR PROPERTY TYPE
  // =========================
  const clearPropertyType = useCallback(() => {
    setPropertyTypeState("");
  }, []);

  // =========================
  // CLEAR ALL
  // =========================
  const clearAll = useCallback(() => {
    setLocationState("");
    setPropertyTypeState("");
    setLatitude(null);
    setLongitude(null);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        // location
        location,
        setLocation,
        clearLocation,

        // property type
        propertyType,
        setPropertyType,
        clearPropertyType,

        // coordinates
        latitude,
        longitude,

        // status
        locationLoading,
        locationPermission,

        // actions
        getCurrentLocation,
        clearAll,
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