import { useEffect } from "react";

const useScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return;

    const preventPageScroll = (event) => {
      const target = event.target;

      // Allow scrolling inside the Popover
      if (
        target instanceof Element &&
        target.closest(".account-popover-scroll")
      ) {
        return;
      }

      // Prevent page scrolling
      event.preventDefault();
    };

    document.addEventListener("wheel", preventPageScroll, {
      passive: false,
    });

    document.addEventListener("touchmove", preventPageScroll, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", preventPageScroll);
      document.removeEventListener("touchmove", preventPageScroll);
    };
  }, [locked]);
};

export default useScrollLock;
