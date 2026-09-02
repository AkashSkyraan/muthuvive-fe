import React from "react";

import publicRoutes from "./public.routes";
import AuthRoutes from "./auth.routes";
import SellPropertyRoutes from "./sellProperty.routes.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AuthRoutes}
        {publicRoutes}
        {SellPropertyRoutes}

        {/* <Route element={<publicRoutes />}>
          <Route path="/" element={<Header />} />
        </Route> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
