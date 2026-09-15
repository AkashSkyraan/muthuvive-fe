import React, { useEffect, useRef, useState } from "react";
import { Modal, Slider } from "antd";
import {
  PictureOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import FormNavigationButtons from "../../fornNavButtons";
import "../mediaForms/MediaForm.css";

// ============================================================
// COVER IMAGE CROP SETTINGS
// ============================================================

const COVER_IMAGE_WIDTH = 1200;
const COVER_IMAGE_HEIGHT = 675;
const COVER_ASPECT_RATIO = COVER_IMAGE_WIDTH / COVER_IMAGE_HEIGHT;

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.1;
const ROTATE_STEP = 90;

// ============================================================
// HELPERS
// ============================================================

const formatFileSize = (bytes) => {
  if (!bytes) return "";

  const mb = bytes / (1024 * 1024);

  return mb >= 1 ? `${mb.toFixed(1)}MB` : `${(bytes / 1024).toFixed(0)}KB`;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeRotation = (deg) => {
  let d = deg % 360;

  if (d > 180) d -= 360;
  if (d < -180) d += 360;

  return d;
};

// ============================================================
// COVER IMAGE CROP MODAL
// ============================================================

const CoverCropModal = ({ open, imageFile, onCancel, onSave }) => {
  const frameRef = useRef(null);
  const imgElRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);

  const [naturalSize, setNaturalSize] = useState({
    w: 0,
    h: 0,
  });

  const [frameSize, setFrameSize] = useState({
    w: 0,
    h: 0,
  });

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const dragState = useRef(null);

  // ----------------------------------------------------------
  // LOAD IMAGE
  // ----------------------------------------------------------

  useEffect(() => {
    if (!open || !imageFile) return;

    const url = URL.createObjectURL(imageFile);

    setImageSrc(url);

    const img = new window.Image();

    img.onload = () => {
      setNaturalSize({
        w: img.naturalWidth,
        h: img.naturalHeight,
      });
    };

    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [open, imageFile]);

  // ----------------------------------------------------------
  // MEASURE FRAME
  // ----------------------------------------------------------

  useEffect(() => {
    if (!open) return;

    const measure = () => {
      if (!frameRef.current) return;

      const rect = frameRef.current.getBoundingClientRect();

      setFrameSize({
        w: rect.width,
        h: rect.height,
      });
    };

    measure();

    const observer = new ResizeObserver(measure);

    if (frameRef.current) {
      observer.observe(frameRef.current);
    }

    return () => observer.disconnect();
  }, [open]);

  // ----------------------------------------------------------
  // CALCULATE BASE SCALE
  // ----------------------------------------------------------

  const computeBaseScale = (rotationDeg) => {
    if (!naturalSize.w || !frameSize.w) {
      return 0;
    }

    const rad = (rotationDeg * Math.PI) / 180;

    const cos = Math.abs(Math.cos(rad));
    const sin = Math.abs(Math.sin(rad));

    const bboxWAtScale1 = naturalSize.w * cos + naturalSize.h * sin;

    const bboxHAtScale1 = naturalSize.w * sin + naturalSize.h * cos;

    return Math.max(frameSize.w / bboxWAtScale1, frameSize.h / bboxHAtScale1);
  };

  const baseScale = computeBaseScale(rotation);

  const effectiveScale = baseScale * zoom;

  // ----------------------------------------------------------
  // GET ROTATED BOUNDING BOX
  // ----------------------------------------------------------

  const getBBoxSize = (scale, rotationDeg) => {
    if (!naturalSize.w || !scale) {
      return {
        w: 0,
        h: 0,
      };
    }

    const rad = (rotationDeg * Math.PI) / 180;

    const cos = Math.abs(Math.cos(rad));
    const sin = Math.abs(Math.sin(rad));

    return {
      w: (naturalSize.w * cos + naturalSize.h * sin) * scale,

      h: (naturalSize.w * sin + naturalSize.h * cos) * scale,
    };
  };

  const bboxSize = getBBoxSize(effectiveScale, rotation);

  // ----------------------------------------------------------
  // RESET CROP
  // ----------------------------------------------------------

  useEffect(() => {
    if (!naturalSize.w || !frameSize.w) {
      return;
    }

    setZoom(1);
    setRotation(0);

    const scale = computeBaseScale(0);

    const dispW = naturalSize.w * scale;
    const dispH = naturalSize.h * scale;

    setPos({
      x: (frameSize.w - dispW) / 2,
      y: (frameSize.h - dispH) / 2,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naturalSize.w, naturalSize.h, frameSize.w, frameSize.h]);

  // ----------------------------------------------------------
  // CLAMP POSITION
  // ----------------------------------------------------------

  const clampPos = (candidate, zoomValue, rotationValue) => {
    const scale = computeBaseScale(rotationValue) * zoomValue;

    const { w: bboxW, h: bboxH } = getBBoxSize(scale, rotationValue);

    const minX = frameSize.w - bboxW;
    const minY = frameSize.h - bboxH;

    return {
      x: clamp(candidate.x, Math.min(minX, 0), 0),

      y: clamp(candidate.y, Math.min(minY, 0), 0),
    };
  };

  // ----------------------------------------------------------
  // ZOOM
  // ----------------------------------------------------------

  const handleZoomChange = (value) => {
    setZoom(value);

    setPos((prev) => clampPos(prev, value, rotation));
  };

  const handleZoomOut = () => {
    const next = clamp(zoom - ZOOM_STEP, ZOOM_MIN, ZOOM_MAX);

    setZoom(next);

    setPos((prev) => clampPos(prev, next, rotation));
  };

  const handleZoomIn = () => {
    const next = clamp(zoom + ZOOM_STEP, ZOOM_MIN, ZOOM_MAX);

    setZoom(next);

    setPos((prev) => clampPos(prev, next, rotation));
  };

  // ----------------------------------------------------------
  // ROTATION
  // ----------------------------------------------------------

  const handleRotateChange = (value) => {
    setRotation(value);

    setPos((prev) => clampPos(prev, zoom, value));
  };

  const handleRotateLeft = () => {
    const next = normalizeRotation(rotation - ROTATE_STEP);

    setRotation(next);

    setPos((prev) => clampPos(prev, zoom, next));
  };

  const handleRotateRight = () => {
    const next = normalizeRotation(rotation + ROTATE_STEP);

    setRotation(next);

    setPos((prev) => clampPos(prev, zoom, next));
  };

  // ----------------------------------------------------------
  // DRAG
  // ----------------------------------------------------------

  const handlePointerDown = (e) => {
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: pos,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current) return;

    const dx = e.clientX - dragState.current.startX;

    const dy = e.clientY - dragState.current.startY;

    const next = {
      x: dragState.current.startPos.x + dx,

      y: dragState.current.startPos.y + dy,
    };

    setPos(clampPos(next, zoom, rotation));
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  // ----------------------------------------------------------
  // SAVE CROPPED IMAGE
  // ----------------------------------------------------------

  const handleSave = () => {
    if (!imgElRef.current || !frameSize.w) {
      return;
    }

    const outputScale = COVER_IMAGE_WIDTH / frameSize.w;

    const canvas = document.createElement("canvas");

    canvas.width = COVER_IMAGE_WIDTH;

    canvas.height = COVER_IMAGE_HEIGHT;

    const ctx = canvas.getContext("2d");

    ctx.save();

    ctx.translate(pos.x * outputScale, pos.y * outputScale);

    ctx.translate(
      (bboxSize.w * outputScale) / 2,
      (bboxSize.h * outputScale) / 2,
    );

    ctx.rotate((rotation * Math.PI) / 180);

    const drawW = naturalSize.w * effectiveScale * outputScale;

    const drawH = naturalSize.h * effectiveScale * outputScale;

    ctx.drawImage(imgElRef.current, -drawW / 2, -drawH / 2, drawW, drawH);

    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const croppedFile = new File([blob], imageFile.name || "cover.jpg", {
          type: "image/jpeg",
        });

        onSave(croppedFile);
      },
      "image/jpeg",
      0.92,
    );
  };

  // ----------------------------------------------------------
  // RENDER CROP MODAL
  // ----------------------------------------------------------

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Edit Cover Image"
      okText="Save"
      cancelText="Cancel"
      onOk={handleSave}
      width={620}
      centered
    >
      <div
        ref={frameRef}
        className="
          relative
          w-full
          overflow-hidden
          rounded-lg
          bg-black
          touch-none
          select-none
          cursor-move
        "
        style={{
          aspectRatio: COVER_ASPECT_RATIO,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {imageSrc && (
          <div
            className="
              absolute
              top-0
              left-0
              pointer-events-none
            "
            style={{
              width: bboxSize.w || undefined,

              height: bboxSize.h || undefined,

              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
          >
            <img
              ref={imgElRef}
              src={imageSrc}
              alt="crop preview"
              draggable={false}
              className="
                absolute
                top-1/2
                left-1/2
              "
              style={{
                width: naturalSize.w * effectiveScale || undefined,

                height: naturalSize.h * effectiveScale || undefined,

                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
            />
          </div>
        )}
      </div>

      {/* Zoom */}
      <div className="flex items-center gap-x-3 mt-4">
        <button
          type="button"
          onClick={handleZoomOut}
          className="
            text-gray-500
            hover:text-gray-700
            shrink-0
          "
        >
          <MinusOutlined />
        </button>

        <Slider
          min={ZOOM_MIN}
          max={ZOOM_MAX}
          step={0.01}
          value={zoom}
          onChange={handleZoomChange}
          className="flex-1"
          tooltip={{
            open: false,
          }}
        />

        <button
          type="button"
          onClick={handleZoomIn}
          className="
            text-gray-500
            hover:text-gray-700
            shrink-0
          "
        >
          <PlusOutlined />
        </button>
      </div>

      {/* Rotate */}
      <div className="flex items-center gap-x-3 mt-3">
        <button
          type="button"
          onClick={handleRotateLeft}
          className="
            text-gray-500
            hover:text-gray-700
            shrink-0
          "
        >
          <RotateLeftOutlined />
        </button>

        <Slider
          min={-180}
          max={180}
          step={1}
          value={rotation}
          onChange={handleRotateChange}
          className="flex-1"
          tooltip={{
            open: false,
          }}
        />

        <button
          type="button"
          onClick={handleRotateRight}
          className="
            text-gray-500
            hover:text-gray-700
            shrink-0
          "
        >
          <RotateRightOutlined />
        </button>
      </div>
    </Modal>
  );
};

// ============================================================
// MAIN MEDIA UPLOAD FORM
// ============================================================

const MediaUploadForm = () => {
  const [coverImage, setCoverImage] = useState(null);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const [images, setImages] = useState([]);

  const [videos, setVideos] = useState([]);

  const [documents, setDocuments] = useState([]);

  // IMAGE PREVIEW
  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewIndex, setPreviewIndex] = useState(0);

  // VIDEO PREVIEW
  const [videoPreviewVisible, setVideoPreviewVisible] = useState(false);

  const [videoPreviewIndex, setVideoPreviewIndex] = useState(0);

  const coverInputRef = useRef(null);

  const imagesInputRef = useRef(null);

  const videosInputRef = useRef(null);

  const documentsInputRef = useRef(null);

  // ==========================================================
  // COVER IMAGE
  // ==========================================================

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverImage((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }

      return {
        file,
        url: URL.createObjectURL(file),
      };
    });

    e.target.value = "";
  };

  const handleCropSave = (croppedFile) => {
    setCoverImage((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }

      return {
        file: croppedFile,
        url: URL.createObjectURL(croppedFile),
      };
    });

    setIsCropModalOpen(false);
  };

  // ==========================================================
  // IMAGES
  // ==========================================================

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    e.target.value = "";
  };

  // ==========================================================
  // VIDEOS
  // ==========================================================

  const handleVideosChange = (e) => {
    const files = Array.from(e.target.files || []);

    const newVideos = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setVideos((prev) => [...prev, ...newVideos]);

    e.target.value = "";
  };

  // ==========================================================
  // DOCUMENTS
  // ==========================================================

  const handleDocumentsChange = (e) => {
    const files = Array.from(e.target.files || []);

    const newDocs = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
    }));

    setDocuments((prev) => [...prev, ...newDocs]);

    e.target.value = "";
  };

  // ==========================================================
  // REMOVE
  // ==========================================================

  const removeImage = (id) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);

      if (imageToRemove?.url) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      return prev.filter((img) => img.id !== id);
    });
  };

  const removeVideo = (id) => {
    setVideos((prev) => {
      const videoToRemove = prev.find((vid) => vid.id === id);

      if (videoToRemove?.url) {
        URL.revokeObjectURL(videoToRemove.url);
      }

      return prev.filter((vid) => vid.id !== id);
    });
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  // ==========================================================
  // IMAGE PREVIEW NAVIGATION
  // ==========================================================

  const showPreviousImage = () => {
    setPreviewIndex((current) =>
      current > 0 ? current - 1 : images.length - 1,
    );
  };

  const showNextImage = () => {
    setPreviewIndex((current) =>
      current < images.length - 1 ? current + 1 : 0,
    );
  };

  // ==========================================================
  // VIDEO PREVIEW NAVIGATION
  // ==========================================================

  const showPreviousVideo = () => {
    setVideoPreviewIndex((current) =>
      current > 0 ? current - 1 : videos.length - 1,
    );
  };

  const showNextVideo = () => {
    setVideoPreviewIndex((current) =>
      current < videos.length - 1 ? current + 1 : 0,
    );
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <div className="w-full max-w-4xl">
        {/* ====================================================
            TITLE
        ==================================================== */}

        <h2 className="text-xl font-semibold text-gray-900">
          Add Photos / Videos of Property
        </h2>

        <p className="text-base text-gray-500 mt-1">
          Upload Photos minimum(10) per photo within 3 mb &amp; Video Minimum(2)
          Per video within 20 mb &amp; document within 5 mb.
        </p>

        {/* ====================================================
            WARNING
        ==================================================== */}

        <div
          className="
            flex
            items-start
            gap-x-2
            bg-[#fff0b9]
            border
            border-yellow-200
            rounded-lg
            p-4
            mt-4
          "
        >
          <InfoCircleOutlined
            className="
              text-yellow-700!
              mt-0.5
              shrink-0
            "
          />

          <p className="text-sm">
            Please ensure that your uploaded photos and videos do not contain
            any personal contact information, including phone numbers, email
            addresses, website URLs, social media handles, or other contact
            details.
          </p>
        </div>

        {/* ====================================================
            COVER IMAGE
        ==================================================== */}

        <div className="mt-6">
          <p
            className="
              text-base
              font-semibold
              text-gray-900
              mb-2
            "
          >
            Upload Cover image
          </p>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleCoverUpload}
          />

          {coverImage ? (
            <div
              className="
                relative
                rounded-lg
                overflow-hidden
                h-40
                sm:h-48
                md:h-56
                w-full
              "
            >
              <img
                src={coverImage.url}
                alt="cover"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  top-3
                  right-3
                  flex
                  items-center
                  gap-x-2
                "
              >
                <button
                  type="button"
                  onClick={() => setIsCropModalOpen(true)}
                  className="
                    w-8
                    h-8
                    rounded-full
                    bg-white/90
                    flex
                    items-center
                    justify-center
                    text-gray-700
                    hover:bg-white
                  "
                >
                  <EditOutlined />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (coverImage?.url) {
                      URL.revokeObjectURL(coverImage.url);
                    }

                    setCoverImage(null);
                  }}
                  className="
                    w-8
                    h-8
                    rounded-full
                    bg-white/90
                    flex
                    items-center
                    justify-center
                    text-red-500
                    hover:bg-white
                  "
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="
                w-full
                h-24
                sm:h-28
                rounded-lg
                border-2
                border-dashed
                border-gray-300
                bg-[#f2f2f2]
                flex
                flex-col
                items-center
                justify-center
                gap-y-1
                hover:border-secondary
                transition-colors
              "
            >
              <PictureOutlined
                className="
                  text-lg
                  text-gray-400
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-secondary
                "
              >
                Upload Photos
              </span>

              <span className="text-xs text-gray-400 font-semibold">
                Support format jpeg, Png
              </span>
            </button>
          )}
        </div>

        {/* ====================================================
            COVER CROP MODAL
        ==================================================== */}

        <CoverCropModal
          open={isCropModalOpen}
          imageFile={coverImage?.file}
          onCancel={() => setIsCropModalOpen(false)}
          onSave={handleCropSave}
        />

        {/* ====================================================
            PROPERTY PHOTOS / VIDEOS
        ==================================================== */}

        <div className="mt-6">
          <p
            className="
              text-base
              font-semibold
              text-gray-900
              mb-2
            "
          >
            Upload property Photos / Videos
          </p>

          <input
            ref={imagesInputRef}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={handleImagesChange}
          />

          <input
            ref={videosInputRef}
            type="file"
            accept="video/mp4"
            multiple
            className="hidden"
            onChange={handleVideosChange}
          />

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            "
          >
            <button
              type="button"
              onClick={() => imagesInputRef.current?.click()}
              className="
                h-32
                rounded-lg
                border-2
                border-dashed
                border-gray-300
                bg-[#f2f2f2]
                flex
                flex-col
                items-center
                justify-center
                gap-y-1
                hover:border-secondary
                transition-colors
              "
            >
              <PictureOutlined
                className="
                  text-xl
                  text-gray-400
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-secondary
                "
              >
                Upload Photos
              </span>

              <span className="text-xs text-gray-400 font-semibold">
                Support format jpeg, Png
              </span>
            </button>

            <button
              type="button"
              onClick={() => videosInputRef.current?.click()}
              className="
                h-32
                rounded-lg
                border-2
                border-dashed
                border-gray-300
                bg-[#f2f2f2]
                flex
                flex-col
                items-center
                justify-center
                gap-y-1
                hover:border-secondary
                transition-colors
              "
            >
              <VideoCameraOutlined
                className="
                  text-xl
                  text-gray-400
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-secondary
                "
              >
                Upload Videos
              </span>

              <span className="text-xs text-gray-400 font-semibold">Support format mp4</span>
            </button>
          </div>
        </div>

        {/* ====================================================
            UPLOADED IMAGES
        ==================================================== */}

        {images.length > 0 && (
          <div className="mt-6">
            <p
              className="
                text-sm
                font-semibold
                text-gray-900
                mb-3
              "
            >
              Uploaded Images
            </p>

            <div
              className="
                grid
                grid-cols-3
                sm:grid-cols-4
                md:grid-cols-6
                gap-3
              "
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="
                      relative
                      h-24
                      sm:h-28
                      rounded-lg
                      overflow-hidden
                    "
                >
                  <img
                    src={image.url}
                    alt="uploaded"
                    className="
                        w-full
                        h-full
                        object-cover
                        cursor-pointer
                      "
                    onClick={() => {
                      setPreviewIndex(index);

                      setPreviewVisible(true);
                    }}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      removeImage(image.id);
                    }}
                    className="
                        absolute
                        top-1.5
                        right-1.5
                        z-10
                        w-6
                        h-6
                        rounded-full
                        bg-white/90
                        flex
                        items-center
                        justify-center
                        text-red-500
                      "
                  >
                    <DeleteOutlined className="text-xs" />
                  </button>
                </div>
              ))}
            </div>

            {/* ==================================================
                IMAGE PREVIEW MODAL
            ================================================== */}

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
                  {/* Previous */}
                  <button
                    type="button"
                    className="
                      image-preview-arrow
                      image-preview-arrow-left
                    "
                    onClick={showPreviousImage}
                    disabled={images.length <= 1}
                  >
                    <LeftOutlined />
                  </button>

                  {/* Image */}
                  {images[previewIndex] && (
                    <img
                      src={images[previewIndex].url}
                      alt={`Preview ${previewIndex + 1}`}
                      className="image-preview-image"
                    />
                  )}

                  {/* Next */}
                  <button
                    type="button"
                    className="
                      image-preview-arrow
                      image-preview-arrow-right
                    "
                    onClick={showNextImage}
                    disabled={images.length <= 1}
                  >
                    <RightOutlined />
                  </button>
                </div>

                {/* Counter */}
                <div className="image-preview-count">
                  {previewIndex + 1} / {images.length}
                </div>
              </div>
            </Modal>
          </div>
        )}

        {/* ====================================================
            UPLOADED VIDEOS
        ==================================================== */}

        {videos.length > 0 && (
          <div className="mt-6">
            <p
              className="
                text-sm
                font-semibold
                text-gray-900
                mb-3
              "
            >
              Uploaded Videos
            </p>

            <div
              className="
                grid
                grid-cols-3
                sm:grid-cols-4
                md:grid-cols-6
                gap-3
              "
            >
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="
                      relative
                      h-24
                      sm:h-28
                      rounded-lg
                      overflow-hidden
                      bg-black
                      cursor-pointer
                    "
                  onClick={() => {
                    setVideoPreviewIndex(index);

                    setVideoPreviewVisible(true);
                  }}
                >
                  <video
                    src={video.url}
                    className="
                        w-full
                        h-full
                        object-cover
                      "
                    muted
                    preload="metadata"
                  />

                  {/* Play icon */}
                  <div
                    className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        pointer-events-none
                      "
                  >
                    <PlayCircleOutlined
                      className="
                          text-white
                          text-2xl
                        "
                    />
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      removeVideo(video.id);
                    }}
                    className="
                        absolute
                        top-1.5
                        right-1.5
                        z-10
                        w-6
                        h-6
                        rounded-full
                        bg-white/90
                        flex
                        items-center
                        justify-center
                        text-red-500
                      "
                  >
                    <DeleteOutlined className="text-xs" />
                  </button>
                </div>
              ))}
            </div>

            {/* ==================================================
                VIDEO PREVIEW MODAL
            ================================================== */}

            <Modal
              open={videoPreviewVisible}
              onCancel={() => setVideoPreviewVisible(false)}
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
                  <span>Video Preview</span>

                  <button
                    type="button"
                    className="image-preview-close"
                    onClick={() => setVideoPreviewVisible(false)}
                  >
                    <CloseOutlined />
                  </button>
                </div>

                {/* Video + arrows */}
                <div className="image-preview-row">
                  {/* Previous */}
                  <button
                    type="button"
                    className="
                      image-preview-arrow
                      image-preview-arrow-left
                    "
                    onClick={showPreviousVideo}
                    disabled={videos.length <= 1}
                  >
                    <LeftOutlined />
                  </button>

                  {/* Video */}
                  {videos[videoPreviewIndex] && (
                    <video
                      src={videos[videoPreviewIndex].url}
                      className="video-preview-player"
                      controls
                      preload="metadata"
                    />
                  )}

                  {/* Next */}
                  <button
                    type="button"
                    className="
                      image-preview-arrow
                      image-preview-arrow-right
                    "
                    onClick={showNextVideo}
                    disabled={videos.length <= 1}
                  >
                    <RightOutlined />
                  </button>
                </div>

                {/* Counter */}
                <div className="image-preview-count">
                  {videoPreviewIndex + 1} / {videos.length}
                </div>
              </div>
            </Modal>
          </div>
        )}

        {/* ====================================================
            DOCUMENTS
        ==================================================== */}

        <div className="mt-6">
          <p
            className="
              text-sm
              font-semibold
              text-gray-900
              mb-2
            "
          >
            Upload property Documents
          </p>

          <input
            ref={documentsInputRef}
            type="file"
            accept="image/jpeg,application/pdf"
            multiple
            className="hidden"
            onChange={handleDocumentsChange}
          />

          <button
            type="button"
            onClick={() => documentsInputRef.current?.click()}
            className="
              w-full
              h-32
              sm:h-36
              rounded-lg
              border-2
              border-dashed
              border-gray-300
              bg-[#F2F2F2]
              flex
              flex-col
              items-center
              justify-center
              gap-y-1
              hover:border-secondary
              transition-colors
            "
          >
            <FileTextOutlined
              className="
                text-xl
                text-gray-400
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-secondary
              "
            >
              Upload Document
            </span>

            <span className="text-xs text-gray-400">
              Support format PDF, PPT
            </span>
          </button>

          {documents.length > 0 && (
            <div
              className="
                flex
                flex-col
                gap-y-2
                mt-3
              "
            >
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="
                      flex
                      items-center
                      gap-x-3
                      bg-[#F2F2F2]
                      border
                      border-gray-200
                      rounded-lg
                      px-4
                      py-3
                    "
                >
                  <FilePdfOutlined
                    className="
                        text-red-500!
                        text-lg
                        shrink-0
                        border-8
                        border-white
                        rounded-md
                      "
                  />

                  <div
                    className="
                        flex-1
                        min-w-0
                      "
                  >
                    <p
                      className="
                          text-sm
                          text-gray-800
                          truncate
                        "
                    >
                      {doc.file.name}
                    </p>

                    <p
                      className="
                          text-xs
                          text-gray-400
                        "
                    >
                      {formatFileSize(doc.file.size)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    className="
                        text-gray-400
                        hover:text-gray-600
                        shrink-0
                      "
                  >
                    <CloseOutlined />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ==================================================
              FORM NAVIGATION
          ================================================== */}

          <FormNavigationButtons nextLabel="submit" />
        </div>
      </div>
    </>
  );
};

export default MediaUploadForm;
