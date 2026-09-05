import React, { useState } from "react";
import { Modal } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./PropertyGallery.css";

const PropertyGallery = ({ data = [] }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

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

  return (
    <div className="w-full mb-10">
      {/* Mobile & tablet - horizontal scroll strip of all visible images */}
      <div className="flex lg:hidden gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-[90%] mx-auto">
        {visible.map((image, index) => {
          const showOverlay = index === 3 && remainingCount > 0;
          return (
            <button
              key={image.id ?? index}
              type="button"
              onClick={() => openPreview(index)}
              className="relative h-36 w-36 sm:h-44 sm:w-44 shrink-0 snap-start overflow-hidden rounded-lg min-w-0 min-h-0"
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
              disabled={previewIndex === 0}
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
