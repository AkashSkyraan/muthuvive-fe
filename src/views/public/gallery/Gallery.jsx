import React, { useEffect, useState } from "react";
import { getGalleryImages } from "../../../api/gallery.api.js";

const formatCategoryLabel = (category) => {
  if (!category) return "";

  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// ---------------------------------------------------------
// Helper: Split images into groups of 5
// ---------------------------------------------------------
const chunkIntoFives = (items) => {
  const chunks = [];

  for (let i = 0; i < items.length; i += 5) {
    chunks.push(items.slice(i, i + 5));
  }

  return chunks;
};

// ---------------------------------------------------------
// Helper: Put hero image first in each cluster
// ---------------------------------------------------------
const prepareClusters = (images) => {
  const chunks = chunkIntoFives(images);

  return chunks.map((chunk) => {
    const heroIndex = chunk.findIndex((image) => Number(image.is_hero) === 1);

    if (heroIndex !== -1) {
      const hero = chunk[heroIndex];

      const remainingImages = chunk.filter((_, index) => index !== heroIndex);

      return [hero, ...remainingImages];
    }

    // If there is no hero in this cluster,
    // keep the original order.
    return chunk;
  });
};

// ---------------------------------------------------------
// Gallery Image
// ---------------------------------------------------------
const GalleryImage = ({ src }) => (
  <div className="w-full h-full overflow-hidden rounded-lg">
    <img src={src} alt="gallery" className="w-full h-full object-cover" />
  </div>
);

// ---------------------------------------------------------
// Image Stack
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// Masonry Cluster
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// Main Gallery
// ---------------------------------------------------------
const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Threshold moved from 768px (md) to 1024px (lg) - the desktop
  // 3-slot masonry now only applies at true lg widths and up; every
  // width below that (including what used to fall in the 768-1023px
  // "desktop" range) gets the hero + 2x2 stacked mobile layout.
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  // -------------------------------------------------------
  // Fetch Gallery
  // -------------------------------------------------------
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getGalleryImages();

        // Convert API response into the structure
        // your existing UI already expects.
        const formattedData = data.map((image) => ({
          id: image.id,
          src: image.image,
          category: image.type,
          is_hero: image.is_hero,
        }));

        setGalleryImages(formattedData);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // -------------------------------------------------------
  // Desktop / Mobile Detection
  // -------------------------------------------------------
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e) => setIsDesktop(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // -------------------------------------------------------
  // Create categories dynamically from API response
  //
  // "All" is always included.
  // Duplicate categories are removed automatically.
  // -------------------------------------------------------
  const categories = [
    {
      key: "all",
      label: "All",
    },

    ...[
      ...new Set(galleryImages.map((image) => image.category).filter(Boolean)),
    ]
      .sort((a, b) => a.localeCompare(b))
      .map((category) => ({
        key: category,
        label: formatCategoryLabel(category),
      })),
  ];

  // -------------------------------------------------------
  // Filter images based on active category
  // -------------------------------------------------------
  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeTab);

  // -------------------------------------------------------
  // Prepare clusters
  //
  // The image with is_hero === 1 is moved
  // to the first position of its cluster.
  // -------------------------------------------------------
  const clusters = prepareClusters(filteredImages);

  // -------------------------------------------------------
  // Hero positions
  // -------------------------------------------------------
  const heroPositions = ["middle", "left", "right"];

  // -------------------------------------------------------
  // Loading
  // -------------------------------------------------------
  if (loading) {
    return (
      <div className="w-full py-16">
        <div className="w-[90%] mx-auto">Loading gallery...</div>
      </div>
    );
  }

  // -------------------------------------------------------
  // Error
  // -------------------------------------------------------
  if (error) {
    return (
      <div className="w-full py-16">
        <div className="w-[90%] mx-auto">Failed to load gallery.</div>
      </div>
    );
  }

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto">
        {/* Tabs */}
        <div className="flex items-center gap-x-6 overflow-x-auto pb-3 border-b border-gray-200 whitespace-nowrap justify-start md:justify-center overflow-y-hidden">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveTab(category.key)}
              className={`text-base pb-3 -mb-[13px] border-b-2 transition-colors shrink-0 ${
                activeTab === category.key
                  ? "border-secondary text-secondary font-medium"
                  : "border-transparent text-gray-600 hover:text-secondary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Clusters */}
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
              // Leftover images
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
