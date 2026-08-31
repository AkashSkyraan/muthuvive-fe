import React, { useEffect, useState } from "react";
import images from "../../../config/Images.jsx";

// Dynamic data - replace with API response
const categories = [
  { key: "all", label: "All" },
  { key: "farmland", label: "Farmland" },
  { key: "commercial-land", label: "Commercial Land" },
  { key: "agriculture-land", label: "Agriculture Land" },
  { key: "commercial-residential", label: "Commercial / Residential Building" },
  { key: "dtcp-approved", label: "DTCP Approved" },
];

// Dynamic data - replace with API response. Each image belongs to one category key above.

const galleryImages = [
  { id: 1, src: images.agricultureLand, category: "farmland" },
  { id: 2, src: images.agriland, category: "farmland" },
  { id: 3, src: images.farmLand, category: "commercial-residential" },
  { id: 4, src: images.missio1_img, category: "farmland" },
  { id: 5, src: images.park, category: "agriculture-land" },
  { id: 6, src: images.thanjavur, category: "commercial-residential" },
  { id: 7, src: images.agriland, category: "farmland" },
  { id: 8, src: images.missio2_img, category: "commercial-land" },
  { id: 9, src: images.farmLand, category: "commercial-residential" },
  { id: 10, src: images.agricultureLand, category: "farmland" },
  { id: 11, src: images.thanjavur, category: "agriculture-land" },
  { id: 12, src: images.missio1_img, category: "agriculture-land" },
  { id: 13, src: images.agriland, category: "farmland" },
  { id: 14, src: images.agricultureLand, category: "agriculture-land" },
  { id: 15, src: images.farmLand, category: "commercial-residential" },
];

const chunkIntoFives = (items) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += 5) {
    chunks.push(items.slice(i, i + 5));
  }
  return chunks;
};

const GalleryImage = ({ src }) => (
  <div className="w-full h-full overflow-hidden rounded-lg">
    <img src={src} alt="gallery" className="w-full h-full object-cover" />
  </div>
);

// A "stack" is 2 images placed one above the other, splitting the available
// height equally. flex-1 on each image guarantees they never exceed the
// height handed to them by the parent slot.
const ImageStack = ({ topImage, bottomImage }) => (
  <div className="flex flex-col gap-3 h-full w-full">
    <div className="flex-1 min-h-0">
      <GalleryImage src={topImage.src} />
    </div>
    <div className="flex-1 min-h-0">
      <GalleryImage src={bottomImage.src} />
    </div>
  </div>
);

// One cluster = 1 hero image (full available height) + 4 small images split
// into two stacks. heroPosition ("left" | "middle" | "right") decides which
// of the three slots the hero sits in - only relevant on desktop, since
// mobile always falls back to a simple vertical layout below.
const MasonryCluster = ({ images, isDesktop, heroPosition }) => {
  const [hero, a, b, c, d] = images;

  if (!isDesktop) {
    return (
      <div className="flex flex-col gap-3">
        <div className="h-[220px] sm:h-[260px] w-full overflow-hidden rounded-lg">
          <img
            src={hero.src}
            alt="gallery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[a, b, c, d].map(
            (image, index) =>
              image && (
                <div
                  key={index}
                  className="h-[130px] sm:h-[150px] w-full overflow-hidden rounded-lg"
                >
                  <img
                    src={image.src}
                    alt="gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
              ),
          )}
        </div>
      </div>
    );
  }

  const heroSlot = (
    <div className="h-full w-full">
      <GalleryImage src={hero.src} />
    </div>
  );
  const stackOne = <ImageStack topImage={a} bottomImage={b} />;
  const stackTwo = <ImageStack topImage={c} bottomImage={d} />;

  const slots =
    heroPosition === "left"
      ? [heroSlot, stackOne, stackTwo]
      : heroPosition === "right"
        ? [stackOne, stackTwo, heroSlot]
        : [stackOne, heroSlot, stackTwo];

  return (
    <div className="flex gap-3 h-[420px] md:h-[480px]">
      {slots.map((slot, index) => (
        <div key={index} className="flex-1 h-full min-w-0">
          {slot}
        </div>
      ))}
    </div>
  );
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeTab);

  const clusters = chunkIntoFives(filteredImages);
  const heroPositions = ["middle", "left", "right"];

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        {/* Tabs */}
        <div className="flex items-center gap-x-6 overflow-x-auto pb-3 border-b border-gray-200 whitespace-nowrap justify-center overflow-y-hidden">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveTab(category.key)}
              className={`text-sm pb-3 -mb-[13px] border-b-2 transition-colors shrink-0 ${
                activeTab === category.key
                  ? "border-secondary text-secondary font-medium"
                  : "border-transparent text-gray-600 hover:text-secondary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Clusters - rendered in order: first section, then second, then third */}
        <div className="flex flex-col gap-6 mt-8">
          {clusters.map((cluster, index) =>
            cluster.length === 5 ? (
              <MasonryCluster
                key={index}
                images={cluster}
                isDesktop={isDesktop}
                heroPosition={heroPositions[index % 3]}
              />
            ) : (
              // Leftover images that don't fill a full 5-image cluster
              <div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              >
                {cluster.map((image) => (
                  <div
                    key={image.id}
                    className="h-[160px] sm:h-[180px] w-full overflow-hidden rounded-lg"
                  >
                    <img
                      src={image.src}
                      alt="gallery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
