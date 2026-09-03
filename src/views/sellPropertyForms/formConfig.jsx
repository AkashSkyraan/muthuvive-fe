import LocationForm from "../../components/forms/locationForms/LocationForm";
import DetailForm from "../../components/forms/detailforms/AgricultureDetailForm";
import CommercialDetailForm from "../../components/forms/detailforms/CommercialdetailForm";
import FeatureForm from "../../components/forms/featuresForms/AgricultureFeatureForm";
import CommercialFeatureForm from "../../components/forms/featuresForms/CommercialFeatureForm";
import MediaForm from "../../components/forms/mediaForms/MediaForm";

const sellPropertyFormConfig = {
  agriculture_land: {
    location: LocationForm,
    details: DetailForm,
    features: FeatureForm,
    media: MediaForm,
  },

  commercial_land: {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
    media: MediaForm,
  },

  investment_land: {
    location: LocationForm,
    details: DetailForm,
    features: FeatureForm,
    media: MediaForm,
  },

  residential_Building: {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
    media: MediaForm,
  },

  commercial_Building: {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
    media: MediaForm,
  },
};

export default sellPropertyFormConfig;
