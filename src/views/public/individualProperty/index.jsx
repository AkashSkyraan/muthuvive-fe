import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PropertyHeader from "./PropertyHeader.jsx";
import PropertyGallery from "./PropertyGallery.jsx";
import TabListing from "../properties/TabListing.jsx";

import OverviewSection from "./OverviewSection.jsx";
import LocationSection from "./LocationSection.jsx";
import AmenitiesSection from "./AmenitiesSection.jsx";
import HighlightsSection from "./HighlightsSection.jsx";
import PriceDetailsSection from "./PriceDetailsSection.jsx";
import DocumentSection from "./PropertyDocument.jsx";
import NearbyProperties from "../../../components/cards/NearByProperties.jsx";

import Enquiry from "./Enquiry.jsx";
import PostInformation from "./PostInformation.jsx";
import PlanDetails from "../../../components/cards/SubscriptionCard.jsx";

import images from "../../../config/Images.jsx";
import { getProperties } from "../../../api/getProperties.api.js";

const initialPropertyData = {
  Heading: {
    title: "Ragavaa Commercial Land For Sale",
    propertyId: "2345678",
    location: "Pollachi, Coimbatore, Tamil Nadu",
  },

  mockPropertyImages: [
    {
      id: 1,
      url: images.farmLand,
      alt: "Building exterior",
    },
    {
      id: 2,
      url: images.farmLand,
      alt: "Aerial city view",
    },
    {
      id: 3,
      url: images.farmLand,
      alt: "Aerial village view",
    },
    {
      id: 4,
      url: images.farmLand,
      alt: "Landmark",
    },
    {
      id: 5,
      url: images.farmLand,
      alt: "Street view",
    },
    {
      id: 6,
      url: images.farmLand,
      alt: "Extra photo 1",
    },
    {
      id: 7,
      url: images.farmLand,
      alt: "Extra photo 2",
    },
  ],

  tabs: [
    {
      key: "overview",
      label: "Overview",
    },
    {
      key: "location",
      label: "Location",
    },
    {
      key: "locality-guides",
      label: "Locality Guides",
    },
    {
      key: "amenities",
      label: "Amenities",
    },
    {
      key: "property-highlight",
      label: "Property Highlight",
    },
    {
      key: "gallery",
      label: "Gallery",
    },
    {
      key: "Near-by-properties",
      label: "Near By Properties",
    },
  ],

  overviewFields: [
    {
      label: "Project Name",
      value: "Muthvive's Agriculture Land For Sale",
    },
    {
      label: "Property Category",
      value: "Agricultural Land",
    },
    {
      label: "Area Unit",
      value: "Acre",
    },
    {
      label: "Property Area",
      value: "200",
    },
    {
      label: "Road Plan",
      value: "Interior",
    },
    {
      label: "Pathway Available",
      value: "Available",
    },
    {
      label: "Pathway Length",
      value: "200 Sq.Ft",
    },
    {
      label: "Pathway Length",
      value: "123 Sq.Ft",
    },
    {
      label: "HP (Horsepower)",
      value: "2000HP",
    },
    {
      label: "Electricity Available",
      value: "Individual Electricity",
    },
    {
      label: "Construction",
      value: "Commercial Building",
    },
    {
      label: "Property Facing",
      value: "North",
    },
  ],

  locationFields: [
    {
      label: "State",
      value: "Tamil Nadu",
    },
    {
      label: "District",
      value: "Coimbatore",
    },
    {
      label: "Taluk",
      value: "Pollachi",
    },
    {
      label: "Village",
      value: "Anaimalai",
    },
    {
      label: "Locality",
      value: "Sethumadai Road",
    },
    {
      label: "Pincode",
      value: "642104",
    },
  ],

  amenitiesFields: [
    "Borewell/Tank",
    "Swimming Pool",
    "Garden",
    "Security / Firm Alarm",
  ],

  highlightsFields: [
    {
      label: "State",
      value: "Tamil Nadu",
    },
    {
      label: "District",
      value: "Coimbatore",
    },
    {
      label: "Taluk",
      value: "Pollachi",
    },
    {
      label: "Village",
      value: "Anaimalai",
    },
    {
      label: "Locality",
      value: "Sethumadai Road",
    },
    {
      label: "Pincode",
      value: "642104",
    },
  ],

  priceDetailsFields: [
    {
      label: "Expected Price",
      value: "₹4,50,00,000",
    },
    {
      label: "Price Per Acre",
      value: "₹90,00,000",
    },
    {
      label: "Price Negotiable",
      value: "Yes",
    },
    {
      label: "Additional Charges",
      value: "₹1,00,000",
    },
  ],

  documentsFields: [
    {
      id: 1,
      url: images.propertydocument,
      alt: "Document",
    },
    {
      id: 2,
      url: images.propertydocument,
      alt: "Document",
    },
    {
      id: 3,
      url: images.propertydocument,
      alt: "Document",
    },
  ],

  nearByFields: [
    {
      id: 1,
      image: images.agricultureLand,
      category: "Agriculture-land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 Sf",
      hospitals: "Hospitals",
      schools: "Schools",
    },
    {
      id: 2,
      image: images.agricultureLand,
      category: "Agriculture-land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 Sf",
      hospitals: "Hospitals",
      schools: "Schools",
    },
    {
      id: 3,
      image: images.agricultureLand,
      category: "Agriculture-land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 Sf",
      hospitals: "Hospitals",
      schools: "Schools",
    },
    {
      id: 4,
      image: images.agricultureLand,
      category: "Agriculture-land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 Sf",
      hospitals: "Hospitals",
      schools: "Schools",
    },
    {
      id: 5,
      image: images.agricultureLand,
      category: "Agriculture-land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 Sf",
      hospitals: "Hospitals",
      schools: "Schools",
    },
    {
      id: 6,
      image: images.agricultureLand,
      category: "Agriculture-land",
      title: "Boutique Space On Greenville Road",
      price: "₹ 12,00,000 / Per Acre",
      address:
        "Sri Venkateshwara Towers, FCI Rd, Opp. Fire Station, Gandhimaa Nagar, Peelamedu, Coimbatore, Tamil Nadu 64...",
      area: "5000 Sf",
      hospitals: "Hospitals",
      schools: "Schools",
    },
  ],
};

const PropertyDetails = () => {
  // ----------------------------------------------------------
  // Get property id from URL
  // ----------------------------------------------------------

  const { propertyId, id } = useParams();
  console.log("property id", propertyId);

  // Supports either:
  // /properties/.../:propertyId
  // or
  // /properties/.../:id

  const currentPropertyId = propertyId;

  // ----------------------------------------------------------
  // Keep same naming convention as your existing mock data
  // ----------------------------------------------------------

  const [propertyData, setPropertyData] = useState(initialPropertyData);

  // ----------------------------------------------------------
  // Fetch individual property
  // ----------------------------------------------------------

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!currentPropertyId) {
        console.error("Property ID not found in URL");
        return;
      }

      try {
        const response = await getProperties(currentPropertyId);

        const apiData = response || response || {};

        const property = apiData?.property || apiData;

        const Heading = {
          title: property?.prop_name || initialPropertyData.Heading.title,

          propertyId: property?.id?.toString() || currentPropertyId,

          location: [property?.city, property?.district, property?.state]
            .filter(Boolean)
            .join(", "),
        };

        const apiImages = [];

        // Cover image
        if (property?.cover_image?.url) {
          apiImages.push({
            id: property.cover_image.id || "cover",
            url: property.cover_image.url,
            alt: "Property cover",
          });
        }

        // Property images
        if (Array.isArray(property?.pr_img)) {
          property.pr_img.forEach((image, index) => {
            const imageUrl = image?.url || image?.path || image;

            if (imageUrl) {
              apiImages.push({
                id: image?.id || `image-${index}`,
                url: imageUrl,
                alt: `Property image ${index + 1}`,
              });
            }
          });
        }

        // Use API images only when they exist
        const mockPropertyImages =
          apiImages.length > 0
            ? apiImages
            : initialPropertyData.mockPropertyImages;

        // ----------------------------------------------------
        // Overview
        // ----------------------------------------------------

        const overviewFields = [
          {
            label: "Project Name",
            value: property?.prop_name || "",
          },
          {
            label: "Property Category",
            value: property?.property_category || property?.category_name || "",
          },
          {
            label: "Area Unit",
            value: property?.area_unit || "",
          },
          {
            label: "Property Area",
            value: property?.prop_area ?? property?.property_area ?? "",
          },
          {
            label: "Road Plan",
            value:
              property?.road_plan === "on"
                ? "On Road"
                : property?.road_plan === "off"
                  ? "Interior"
                  : property?.road_plan || "",
          },
          {
            label: "Pathway Available",
            value:
              property?.pathway === 1
                ? "Available"
                : property?.pathway === 0
                  ? "Not Available"
                  : property?.pathway || "",
          },
          {
            label: "Pathway Length",
            value: property?.length
              ? `${property.length} ${property?.length_unit || ""}`
              : "",
          },
          {
            label: "Road Length",
            value: property?.road_length
              ? `${property.road_length} ${property?.road_length_unit || ""}`
              : "",
          },
          {
            label: "HP (Horsepower)",
            value: property?.hp ? `${property.hp}HP` : "",
          },
          {
            label: "Electricity Available",
            value: property?.electricity ?? "",
          },
          {
            label: "Construction",
            value: property?.construct_type ?? property?.construct ?? "",
          },
          {
            label: "Property Facing",
            value: property?.facing ?? "",
          },
        ];

        // ----------------------------------------------------
        // Location
        // ----------------------------------------------------

        const locationFields = [
          {
            label: "State",
            value: property?.state || "",
          },
          {
            label: "District",
            value: property?.district || "",
          },
          {
            label: "Taluk",
            value: property?.taluk || "",
          },
          {
            label: "Village",
            value: property?.village || "",
          },
          {
            label: "Locality",
            value: property?.locality || "",
          },
          {
            label: "Pincode",
            value: property?.pincode || "",
          },
        ];

        // ----------------------------------------------------
        // Amenities
        // ----------------------------------------------------

        const amenitiesFields = Array.isArray(property?.amenities)
          ? property.amenities
              .map((item) => (typeof item === "object" ? item?.name : item))
              .filter(Boolean)
          : initialPropertyData.amenitiesFields;

        // ----------------------------------------------------
        // Property Highlights
        // ----------------------------------------------------

        const highlightsFields = Array.isArray(property?.prop_highs)
          ? property.prop_highs
              .map((item) => {
                if (typeof item === "object") {
                  return {
                    label: item?.name || "Highlight",
                    value: item?.value || "",
                  };
                }

                return {
                  label: "Highlight",
                  value: item,
                };
              })
              .filter((item) => item.value)
          : initialPropertyData.highlightsFields;

        // ----------------------------------------------------
        // Price Details
        // ----------------------------------------------------

        const priceDetailsFields = [
          {
            label: "Expected Price",
            value: property?.expected_price ?? property?.price ?? "",
          },
          {
            label: "Price Per Acre",
            value: property?.price_per_acre ?? "",
          },
          {
            label: "Price Negotiable",
            value: property?.price_negotiable ?? "",
          },
          {
            label: "Additional Charges",
            value: property?.additional_charges ?? "",
          },
        ];

        // ----------------------------------------------------
        // Documents
        // ----------------------------------------------------

        const documentsFields = Array.isArray(property?.pr_doc)
          ? property.pr_doc.map((document, index) => ({
              id: document?.id || index + 1,
              url: document?.url || document?.path || document,
              alt: "Document",
            }))
          : initialPropertyData.documentsFields;

        // ----------------------------------------------------
        // Update the complete page data
        // ----------------------------------------------------

        setPropertyData((prev) => ({
          ...prev,

          Heading,
          mockPropertyImages,
          overviewFields,
          locationFields,
          amenitiesFields,
          highlightsFields,
          priceDetailsFields,
          documentsFields,
        }));
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [currentPropertyId]);

  // ==========================================================
  // Extract data using your existing naming
  // ==========================================================

  const {
    Heading,
    mockPropertyImages,
    tabs,
    overviewFields,
    locationFields,
    amenitiesFields,
    highlightsFields,
    priceDetailsFields,
    documentsFields,
    nearByFields,
  } = propertyData;

  // ==========================================================
  // TAB SCROLL
  // ==========================================================

  const handleTabChange = (key) => {
    const section = document.getElementById(key);
    const header = document.getElementById("main-header");

    if (!section) return;

    const headerHeight = header?.getBoundingClientRect().height ?? 0;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop - headerHeight,
      behavior: "smooth",
    });
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <main className="w-[90%] mx-auto min-h-screen bg-white">
      {/* ============================================================
          PROPERTY HEADER
          ============================================================ */}

      <PropertyHeader data={Heading} />

      {/* ============================================================
          PROPERTY GALLERY
          ============================================================ */}

      <PropertyGallery data={mockPropertyImages} />

      {/* ============================================================
          PROPERTY TABS
          ============================================================ */}

      <TabListing categories={tabs} onChange={handleTabChange} />

      {/* ============================================================
          MAIN PROPERTY CONTENT
          ============================================================ */}

      <section className="w-full">
        <div className="w-[95%] lg:w-[90%] max-w-[1400px] mx-auto py-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
            {/* ========================================================
                LEFT SIDE - 65%
                ======================================================== */}

            <div className="w-full lg:w-[65%] flex flex-col gap-4">
              {/* Property Overview */}

              <div id="overview">
                <OverviewSection fields={overviewFields} />
              </div>

              {/* Property Location */}

              <div id="location">
                <LocationSection fields={locationFields} />
              </div>

              {/* Amenities */}

              <div id="amenities">
                <AmenitiesSection fields={amenitiesFields} />
              </div>

              {/* Property Highlights */}

              <div id="property-highlight">
                <HighlightsSection fields={highlightsFields} />
              </div>

              {/* Price Details */}

              <div id="price-details">
                <PriceDetailsSection fields={priceDetailsFields} />
              </div>

              {/* Gallery / Documents */}

              <div id="gallery">
                <DocumentSection fields={documentsFields} />
              </div>
            </div>

            {/* ========================================================
                RIGHT SIDE - 35%
                ======================================================== */}

            <aside className="w-full lg:w-[45%] xl:w-[35%] flex flex-col gap-4 items-end">
              {/* Enquiry Form */}

              <Enquiry />

              {/* Property Post Information */}

              <PostInformation />

              {/* Plan Details */}

              <PlanDetails />
            </aside>
          </div>

          {/* ==========================================================
              Nearby Properties
              ========================================================== */}

          <div id="Near-by-properties">
            <NearbyProperties properties={nearByFields} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetails;
