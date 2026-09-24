import React from "react";
import AppRoutes from "./routes";
import Loader from "./components/common/loader/loader";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Loader />
    </>
  );
};

export default App;
