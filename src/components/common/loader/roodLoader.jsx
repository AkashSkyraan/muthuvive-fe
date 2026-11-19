import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { loaderManager } from "../../../utils/loaderManager.js";
import YourLoader from "./loader.jsx"; // unga existing loader

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

const RootLoader = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const timer = useRef(null);
  const runId = useRef(0);

  const check = useCallback(() => {
    clearTimeout(timer.current);
    const id = ++runId.current;

    // debounce: API mudinja piragu React render aaga konjam time kudukkaradhu
    timer.current = setTimeout(async () => {
      if (loaderManager.getPending() > 0) return;

      // images load aaganum (max 8s wait, stuck aagama irukka)
      await Promise.race([
        waitForImages(),
        new Promise((r) => setTimeout(r, 8000)),
      ]);
      await nextPaint();

      if (id === runId.current && loaderManager.getPending() === 0) {
        setLoading(false);
      }
    }, 300);
  }, []);

  // API start/end aagum podhu
  useEffect(() => {
    return loaderManager.subscribe((count) => {
      if (count > 0) setLoading(true);
      check();
    });
  }, [check]);

  // route maarum podhu
  useEffect(() => {
    setLoading(true);
    check();
    return () => clearTimeout(timer.current);
  }, [location.pathname, check]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <YourLoader />
    </div>
  );
};

export default RootLoader;
