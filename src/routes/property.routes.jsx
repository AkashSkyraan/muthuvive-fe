import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Properties from "../views/public/properties/index.jsx";
import Construction from "../views/public/construction/index.jsx";
import PropertyDetails from "../views/public/individualProperty/index.jsx";
import MyProperties from "../views/public/myProperties/index.jsx";
import MyPlans from "../views/public/myplans/index.jsx";
import SavedProperties from "../views/public/savedProperties/index.jsx";
import RecentProperties from "../views/public/recentlyviewed/index.jsx";

const publicRoutes = (
  <Route path="/properties" element={<MainLayout />}>
    <Route path=":categorySlug" element={<Properties />} />
    <Route path="construction-services" element={<Construction />} />
    {/* Individual property */}
    <Route path=":categorySlug/:propertyId" element={<PropertyDetails />} />
    {/* My Properties */}
    <Route path="my-properties" element={<MyProperties />} />

    {/* My Plan Activity */}
    <Route path="my-plans" element={<MyPlans />} />
    {/* My Saved Properties */}
    <Route path="saved-properties" element={<SavedProperties />} />
    {/* My recently Viewed Properties */}
    <Route path="recent-properties" element={<RecentProperties />} />
  </Route>
);

export default publicRoutes;
