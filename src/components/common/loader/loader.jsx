import React from "react";
import { Spin } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useLoader } from "../../../context/LoaderContext";

// Mount this ONCE near the root of your app (e.g. right inside
// <LoaderProvider> in App.jsx). It renders nothing while isLoading is
// false, and a full-screen overlay while it's true - driven entirely by
// the global context, no props needed anywhere it's used.
const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white backdrop-blur-sm px-4">
      <div className="flex flex-col items-center gap-y-4 sm:gap-y-5">
        {/* Animated house icon in a pulsing brand-colored ring */}
        <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
          <span className="absolute inset-0 rounded-full bg-secondary/15 animate-ping" />
          <span className="absolute inset-0 rounded-full bg-secondary/10" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-md flex items-center justify-center">
            <HomeOutlined className="text-secondary text-2xl sm:text-3xl" />
          </div>
        </div>

        {/* <Spin size="default" /> */}

        <p className="text-sm sm:text-base font-medium text-gray-700 text-center">
          Finding your perfect property...
        </p>
      </div>
    </div>
  );
};

export default Loader;
