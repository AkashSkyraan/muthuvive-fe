import React, { useState } from "react";
import { Modal } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./PropertyGallery.css";

const defaultDocuments = [
  { id: 1, url: "/docs/land-certificate.jpg", alt: "Land certificate" },
  { id: 2, url: "/docs/stamp-paper-1.jpg", alt: "Stamp paper page 1" },
  { id: 3, url: "/docs/stamp-paper-2.jpg", alt: "Stamp paper page 2" },
];

const Documents = ({ title = "Documents", fields = [] }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const openPreview = (index) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  };

  const showPreviousImage = () => setPreviewIndex((i) => (i === 0 ? i : i - 1));

  const showNextImage = () =>
    setPreviewIndex((i) => (i === fields.length - 1 ? i : i + 1));

  return (
    <div className="w-full text-start rounded-xl border border-gray-300 bg-white">
      <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      {fields.length > 0 && (
        <div className="flex flex-wrap gap-3 px-5 py-5 sm:px-6">
          {fields.map((doc, index) => (
            <button
              key={doc.id ?? index}
              type="button"
              onClick={() => openPreview(index)}
              className="h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-lg border border-gray-200 min-w-0 min-h-0"
            >
              <img
                src={doc.url}
                alt={doc.alt || `Document ${index + 1}`}
                className="block h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

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
          <div className="image-preview-header">
            <span>Document Preview</span>

            <button
              type="button"
              className="image-preview-close"
              onClick={() => setPreviewVisible(false)}
            >
              <CloseOutlined />
            </button>
          </div>

          <div className="image-preview-row">
            <button
              type="button"
              className="image-preview-arrow image-preview-arrow-left"
              onClick={showPreviousImage}
              disabled={previewIndex === 0}
            >
              <LeftOutlined />
            </button>

            {fields[previewIndex] && (
              <img
                src={fields[previewIndex].url}
                alt={fields[previewIndex].alt || `Preview ${previewIndex + 1}`}
                className="image-preview-image"
              />
            )}

            <button
              type="button"
              className="image-preview-arrow image-preview-arrow-right"
              onClick={showNextImage}
              disabled={previewIndex === fields.length - 1}
            >
              <RightOutlined />
            </button>
          </div>

          <div className="image-preview-count">
            {previewIndex + 1} / {fields.length}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Documents;
