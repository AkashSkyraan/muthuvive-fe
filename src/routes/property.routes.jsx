import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Properties from "../views/public/properties/index.jsx";
import Construction from "../views/public/construction/index.jsx";
import PropertyDetails from "../views/public/individualProperty/index.jsx";

const publicRoutes = (
  <Route path="/properties" element={<MainLayout />}>
    <Route path=":categorySlug" element={<Properties />} />
    <Route
      path="/properties/construction-services"
      element={<Construction />}
    />
    {/* Individual property */}
    <Route path=":categorySlug/:propertyId" element={<PropertyDetails />} />
  </Route>
);

export default publicRoutes;
