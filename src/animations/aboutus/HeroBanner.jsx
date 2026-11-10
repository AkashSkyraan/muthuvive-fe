export const aboutLeftContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

export const aboutFadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Right image composition

export const aboutImageContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

export const aboutMainImage = {
  hidden: {
    opacity: 0,
    clipPath: "inset(100% 0 0 0)",
    scale: 1.08,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const aboutBuildingImage = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    scale: 1.08,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const aboutGreenImage = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    scale: 1.08,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const aboutLogoReveal = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      delay: 0.65,
    },
  },
};
