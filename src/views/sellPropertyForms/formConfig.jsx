import LocationForm from "../../components/forms/locationForms/LocationForm";
import DetailForm from "../../components/forms/detailforms/AgricultureDetailForm";
import CommercialDetailForm from "../../components/forms/detailforms/CommercialdetailForm";
import FeatureForm from "../../components/forms/featuresForms/AgricultureFeatureForm";
import CommercialFeatureForm from "../../components/forms/featuresForms/CommercialFeatureForm";

const sellPropertyFormConfig = {
  agriculture_land: {
    location: LocationForm,
    details: DetailForm,
    features: FeatureForm,
  },

  commercial_land: {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
  },

  investment_land: {
    location: LocationForm,
    details: DetailForm,
    features: FeatureForm,
  },

  residential_Building: {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
  },

  commercial_Building: {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
  },
};

export default sellPropertyFormConfig;
