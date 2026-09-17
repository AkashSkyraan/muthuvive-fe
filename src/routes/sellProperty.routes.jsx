import { Route } from "react-router-dom";
import SellPropertyLayout from "../layouts/SellPropertyLayout";
import SellCategoryForm from "../components/forms/categoryForms/CategoryForm";
import LocationForm from "../views/sellPropertyForms/Location";
import DetailsForm from "../views/sellPropertyForms/Propertydetails";
import FeaturesForm from "../views/sellPropertyForms/Propertyfeatures";
import MediaForm from "../views/sellPropertyForms/PropertyMedia";

const publicRoutes = (
  <Route path="/sell-property" element={<SellPropertyLayout />}>
    <Route index element={<SellCategoryForm />} />
    <Route path="location" element={<LocationForm />} />
    <Route path="details" element={<DetailsForm />} />
    <Route path="features" element={<FeaturesForm />} />
    <Route path="media" element={<MediaForm />} />
  </Route>
);

export default publicRoutes;
