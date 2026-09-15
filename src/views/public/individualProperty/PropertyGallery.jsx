import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./PropertyGallery.css";

const PropertyGallery = ({ data = [] }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Mobile/tablet strip scroll tracking - drives the gray/blue nav arrows
  const scrollRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!data.length) return null;

  const visible = data.slice(0, 5);
  const remainingCount = data.length - visible.length;

  const openPreview = (index) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  };

  const showPreviousImage = () => setPreviewIndex((i) => (i === 0 ? i : i - 1));

  const showNextImage = () =>
    setPreviewIndex((i) => (i === data.length - 1 ? i : i + 1));

  const checkCurrentSlide = () => {
    const el = scrollRef.current;

    if (!el) return;

    const slides = Array.from(el.children);

    if (!slides.length) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - el.scrollLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentSlide(closestIndex);
  };

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    // Set initial slide
    checkCurrentSlide();

    el.addEventListener("scroll", checkCurrentSlide);
    window.addEventListener("resize", checkCurrentSlide);

    return () => {
      el.removeEventListener("scroll", checkCurrentSlide);
      window.removeEventListener("resize", checkCurrentSlide);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible.length]);

  const scrollStripTo = (index) => {
    const el = scrollRef.current;

    if (!el) return;

    const slides = el.children;

    if (!slides[index]) return;

    const targetSlide = slides[index];

    el.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: "smooth",
    });

    setCurrentSlide(index);
  };

  const scrollStripBy = (direction) => {
    const nextIndex =
      direction === "left" ? currentSlide - 1 : currentSlide + 1;

    // Don't allow scrolling outside the available images
    if (nextIndex < 0 || nextIndex >= visible.length) {
      return;
    }

    scrollStripTo(nextIndex);
  };

  const isAtStart = currentSlide === 0;
  const isAtEnd = currentSlide === visible.length - 1;

  return (
    <div className="w-full mb-10">
      {/* Mobile & tablet - horizontal scroll strip, one big image per
          slide, with left/right nav arrows so users know there are more
          photos to see. Arrows gray out at each end. */}
      <div className="relative lg:hidden w-[90%] mx-auto">
        <button
          type="button"
          onClick={() => scrollStripBy("left")}
          disabled={isAtStart}
          className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md transition-colors ${
            isAtStart ? "bg-gray-300 cursor-not-allowed" : "bg-secondary"
          }`}
        >
          <LeftOutlined className="text-base" />
        </button>

        <button
          type="button"
          onClick={() => scrollStripBy("right")}
          disabled={isAtEnd}
          className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md transition-colors ${
            isAtEnd ? "bg-gray-300 cursor-not-allowed" : "bg-secondary"
          }`}
        >
          <RightOutlined className="text-base" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((image, index) => {
            const showOverlay =
              index === visible.length - 1 && remainingCount > 0;

            return (
              <button
                key={image.id ?? index}
                type="button"
                onClick={() => openPreview(index)}
                className="relative h-64 sm:h-72 w-full shrink-0 snap-start overflow-hidden rounded-lg min-w-0 min-h-0"
              >
                <img
                  src={image.url}
                  alt={image.alt || "Property"}
                  className="block h-full w-full object-cover"
                />

                {showOverlay && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-lg font-semibold text-white">
                      +{remainingCount}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop - large image left half + thumbnail grid right half */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-2 lg:h-96">
        <button
          type="button"
          onClick={() => openPreview(0)}
          className="relative h-full w-full min-w-0 min-h-0 overflow-hidden rounded-lg"
        >
          <img
            src={visible[0].url}
            alt={visible[0].alt || "Property"}
            className="block h-full w-full object-cover"
          />
        </button>

        {visible.length > 1 && (
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full min-h-0">
            {visible.slice(1).map((image, i) => {
              const index = i + 1;
              const isWide = index === 4;
              const showOverlay = index === 3 && remainingCount > 0;

              return (
                <button
                  key={image.id ?? index}
                  type="button"
                  onClick={() => openPreview(index)}
                  className={`relative min-w-0 min-h-0 overflow-hidden rounded-lg ${
                    isWide ? "col-span-3" : ""
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || "Property"}
                    className="block h-full w-full object-cover"
                  />

                  {showOverlay && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-lg font-semibold text-white">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview modal */}
      <Modal
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        closable={false}
        centered
        width="fit-content"
        className="image-preview-modal"
        styles={{
          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.65)",
          },
          content: {
            padding: 0,
            margin: 0,
            background: "transparent",
            boxShadow: "none",
            borderRadius: 0,
          },
          body: {
            padding: 0,
            margin: 0,
          },
        }}
      >
        <div className="image-preview-shell">
          {/* Header */}
          <div className="image-preview-header">
            <span>Image Preview</span>

            <button
              type="button"
              className="image-preview-close"
              onClick={() => setPreviewVisible(false)}
            >
              <CloseOutlined />
            </button>
          </div>

          {/* Image + arrows */}
          <div className="image-preview-row">
            <button
              type="button"
              className="image-preview-arrow image-preview-arrow-left"
              onClick={showPreviousImage}
              disabled={previewIndex === 1}
            >
              <LeftOutlined />
            </button>

            {data[previewIndex] && (
              <img
                src={data[previewIndex].url}
                alt={`Preview ${previewIndex + 1}`}
                className="image-preview-image"
              />
            )}

            <button
              type="button"
              className="image-preview-arrow image-preview-arrow-right"
              onClick={showNextImage}
              disabled={previewIndex === data.length - 1}
            >
              <RightOutlined />
            </button>
          </div>

          {/* Counter */}
          <div className="image-preview-count">
            {previewIndex + 1} / {data.length}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyGallery;
