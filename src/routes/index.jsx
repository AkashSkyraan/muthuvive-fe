import React from "react";

import publicRoutes from "./public.routes";
import AuthRoutes from "./auth.routes";
import SellPropertyRoutes from "./sellProperty.routes.jsx";
import PropertyRoutes from "./property.routes.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {AuthRoutes}
        {publicRoutes}
        {SellPropertyRoutes}
        {PropertyRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
