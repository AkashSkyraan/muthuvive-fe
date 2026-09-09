import LocationForm from "../../components/forms/locationForms/LocationForm";
import DetailForm from "../../components/forms/detailforms/AgricultureDetailForm";
import CommercialDetailForm from "../../components/forms/detailforms/CommercialdetailForm";
import FeatureForm from "../../components/forms/featuresForms/AgricultureFeatureForm";
import CommercialFeatureForm from "../../components/forms/featuresForms/CommercialFeatureForm";
import MediaForm from "../../components/forms/mediaForms/MediaForm";

export const categoryConfigMap = {
  1: "Agriculture Land",
  2: "Commercial Land",
  3: "Investment Land",
  4: "Commercial / Residential Buildings",
};
export const sellPropertyFormConfig = {
  "Agriculture Land": {
    location: LocationForm,
    details: DetailForm,
    features: FeatureForm,
    media: MediaForm,
  },

  "Commercial Land": {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
    media: MediaForm,
  },

  "Investment Land": {
    location: LocationForm,
    details: DetailForm,
    features: FeatureForm,
    media: MediaForm,
  },

  "Commercial / Residential Buildings": {
    location: LocationForm,
    details: CommercialDetailForm,
    features: CommercialFeatureForm,
    media: MediaForm,
  },

  // commercial_Building: {
  //   location: LocationForm,
  //   details: CommercialDetailForm,
  //   features: CommercialFeatureForm,
  //   media: MediaForm,
  // },
};
