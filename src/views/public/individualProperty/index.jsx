import React from "react";

// ============================================================
// Full-width components
// ============================================================
import PropertyHeader from "./PropertyHeader.jsx";
import PropertyGallery from "./PropertyGallery.jsx";
// import PropertyTabs from "./PropertyTabs.jsx";

// ============================================================
// Left-side components
// ============================================================
import OverviewSection from "./OverviewSection.jsx";
import LocationSection from "./LocationSection.jsx";
import AmenitiesSection from "./AmenitiesSection.jsx";
import HighlightsSection from "./HighlightsSection.jsx";
import PriceDetailsSection from "./PriceDetailsSection.jsx";
import DocumentSection from "./PropertyDocument.jsx";
import NearbyProperties from "../../../components/cards/NearByProperties.jsx";

// ============================================================
// Right-side components
// ============================================================
import Enquiry from "./Enquiry.jsx";
import PostInformation from "./PostInformation.jsx";
import PlanDetails from "../../../components/cards/SubscriptionCard.jsx";
import images from "../../../config/Images.jsx";
import TabListing from "../properties/TabListing.jsx";

const PropertyDetails = () => {
  const Heading = {
    title: "Ragavaa Commercial Land For Sale",
    propertyId: "2345678",
    location: "Pollachi, Coimbatore, Tamil Nadu",
  };
  const mockPropertyImages = [
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
    { id: 4, url: images.farmLand, alt: "Landmark" },
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
  ];
  const tabs = [
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
  ];
  const overviewFields = [
    { label: "Project Name", value: "Muthvive's Agriculture Land For Sale" },
    { label: "Property Category", value: "Agricultural Land" },
    { label: "Area Unit", value: "Acre" },
    { label: "Property Area", value: "200" },
    { label: "Road Plan", value: "Interior" },
    { label: "Pathway Available", value: "Available" },
    { label: "Pathway Length", value: "200  Sq.Ft" },
    { label: "Pathway Length", value: "123 Sq.Ft" },
    { label: "HP (Horsepower)", value: "2000HP" },
    { label: "Electricity Available", value: "Individual Electricity" },
    { label: "Construction", value: "Commercial Building" },
    { label: "Property Facing", value: "North" },
  ];
  const locationFields = [
    { label: "State", value: "Tamil Nadu" },
    { label: "District", value: "Coimbatore" },
    { label: "Taluk", value: "Pollachi" },
    { label: "Village", value: "Anaimalai" },
    { label: "Locality", value: "Sethumadai Road" },
    { label: "Pincode", value: "642104" },
  ];
  const amenitiesFields = [
    "Borewell/Tank",
    "Swimming Pool",
    "Garden",
    "Security / Firm Alarm",
  ];
  const highlightsFields = [
    { label: "State", value: "Tamil Nadu" },
    { label: "District", value: "Coimbatore" },
    { label: "Taluk", value: "Pollachi" },
    { label: "Village", value: "Anaimalai" },
    { label: "Locality", value: "Sethumadai Road" },
    { label: "Pincode", value: "642104" },
  ];
  const priceDetailsFields = [
    { label: "Expected Price", value: "₹4,50,00,000" },
    { label: "Price Per Acre", value: "₹90,00,000" },
    { label: "Price Negotiable", value: "Yes" },
    { label: "Additional Charges", value: "₹1,00,000" },
  ];
  const documentsFields = [
    { id: 1, url: images.propertydocument, alt: "Document" },
    { id: 2, url: images.propertydocument, alt: "Document" },
    { id: 3, url: images.propertydocument, alt: "Document" },
  ];
  const nearByFields = [
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
  ];

  const handleTabChange = (key) => {
    const section = document.getElementById(key);
    const header = document.getElementById("main-header");
    // console.log(header);

    if (!section) return;

    const headerHeight = header?.getBoundingClientRect().height ?? 0;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop - headerHeight,
      behavior: "smooth",
    });
  };

  return (
    <main className="w-[90%] mx-auto min-h-screen bg-white">
      {/* ============================================================
          PROPERTY HEADER
          Full Width
          ============================================================ */}
      <PropertyHeader data={Heading} />

      {/* ============================================================
          PROPERTY GALLERY
          Full Width
          ============================================================ */}
      <PropertyGallery data={mockPropertyImages} />

      {/* ============================================================
          PROPERTY TABS
          Full Width
          ============================================================ */}
      <TabListing categories={tabs} onChange={handleTabChange} />

      {/* ============================================================
          MAIN PROPERTY CONTENT
          Desktop  : 65% Left + 35% Right
          Mobile   : Stacked
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
              {/* Gallery */}{" "}
              <div id="price-details">
                <PriceDetailsSection fields={priceDetailsFields} />
              </div>
              {/* Gallery */}
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
          {/* Nearby Properties */}
          <div id="Near-by-properties">
            <NearbyProperties properties={nearByFields} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetails;
