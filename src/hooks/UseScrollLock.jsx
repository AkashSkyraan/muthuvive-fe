import { useEffect } from "react";

const useScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return;

    const preventScroll = (event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [locked]);
};

export default useScrollLock;
