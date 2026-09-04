import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-32 right-5 sm:right-5 z-60
        w-9 h-9 sm:w-9 sm:h-9
        rounded-lg
        bg-secondary
        flex items-center justify-center
        transition-all duration-300
        ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
    >
      <span className="text-white text-2xl sm:text-lg">↑</span>
    </button>
  );
};

export default ScrollToTop;
