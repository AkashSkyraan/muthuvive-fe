import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../../context/LoaderContext";
import { loaderManager } from "../../../utils/loaderManager"; // path maathikonga

const MIN_VISIBLE = 500; // loader kuraindha pakshm 300ms theriyanum

const waitForImages = () => {
  const pendingImgs = Array.from(document.images).filter(
    (img) => !img.complete,
  );
  return Promise.all(
    pendingImgs.map(
      (img) =>
        new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        }),
    ),
  );
};

const nextPaint = () =>
  new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );

const Loader = () => {
  const { isLoading } = useLoader(); // existing context, unchanged
  const location = useLocation();

  const [globalLoading, setGlobalLoading] = useState(true);
  const timer = useRef(null);
  const runId = useRef(0);

  // Minimum-visible-time logic
  const [visible, setVisible] = useState(true);
  const shownAt = useRef(Date.now());
  const hideTimer = useRef(null);

  const check = useCallback(() => {
    clearTimeout(timer.current);
    const id = ++runId.current;

    timer.current = setTimeout(async () => {
      if (loaderManager.getPending() > 0) return;

      await Promise.race([
        waitForImages(),
        new Promise((r) => setTimeout(r, 8000)), // safety timeout
      ]);
      await nextPaint();

      if (id === runId.current && loaderManager.getPending() === 0) {
        setGlobalLoading(false);
      }
    }, 300);
  }, []);

  // API start/end
  useEffect(() => {
    return loaderManager.subscribe((count) => {
      if (count > 0) setGlobalLoading(true);
      check();
    });
  }, [check]);

  // Route change
  useEffect(() => {
    setGlobalLoading(true);
    check();
    return () => clearTimeout(timer.current);
  }, [location.pathname, check]);

  const shouldShow = isLoading || globalLoading;

  // Loader actual ah screen la show aana time note pannum
  useEffect(() => {
    if (visible) shownAt.current = Date.now();
  }, [visible]);

  // Show immediately, hide only after MIN_VISIBLE
  useEffect(() => {
    clearTimeout(hideTimer.current);

    if (shouldShow) {
      setVisible(true);
      return;
    }

    const elapsed = Date.now() - shownAt.current;
    const remaining = Math.max(0, MIN_VISIBLE - elapsed);
    hideTimer.current = setTimeout(() => setVisible(false), remaining);

    return () => clearTimeout(hideTimer.current);
  }, [shouldShow]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      role="status"
      aria-label="Loading"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-gray-200 border-t-secondary animate-spin" />
    </div>
  );
};

export default Loader;
