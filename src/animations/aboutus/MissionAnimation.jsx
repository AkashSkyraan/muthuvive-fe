export const missionContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
    },
  },
};

// Text card
export const missionTextReveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5,
    },
  },
};

// Text content stagger
export const missionContent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const missionContentItem = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Image card
export const missionImageReveal = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

// Main image mask reveal
export const missionMainImage = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    scale: 1.12,
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Small overlay image
export const missionOverlayReveal = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    x: -25,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.35,
    },
  },
};
