export const galleryGrid = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const galleryItem = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
