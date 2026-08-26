import React from "react";

import publicRoutes from "./public.routes";
import AuthRoutes from "./auth.routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AuthRoutes()}

        <Route element={<publicRoutes />}>
          {/* <Route path="/" element={<Home />} />
           */}
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
