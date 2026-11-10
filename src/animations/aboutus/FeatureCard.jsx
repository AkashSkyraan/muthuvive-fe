export const featuresContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

export const featureCardReveal = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const featureIconReveal = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.65,
      ease: "backOut",
    },
  },
};

export const featureContentReveal = {
  hidden: {
    opacity: 0,
    x: 15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.12,
    },
  },
};
