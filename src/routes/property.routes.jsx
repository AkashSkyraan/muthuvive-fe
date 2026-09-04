import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Properties from "../views/public/properties/index";

const publicRoutes = (
  <Route path="/properties" element={<MainLayout />}>
    <Route path=":categorySlug" element={<Properties />} />
  </Route>
);

export default publicRoutes;
