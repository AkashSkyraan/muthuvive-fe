import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import images from "../../../config/Images";

const SWITCH_EVERY_MS = 10000;

// Only this block changes. Default language is English.
const content = {
  en: [
    "Building Dreams Through Land!",
    "Creating Lasting Value For Generations!",
    "• Trust • Transparency • Dedicated Service",
  ],
  ta: [
    "நிலத்தின் மூலம் கனவுகளை உருவாக்குவோம்!",
    "தலைமுறைகளுக்கான மதிப்பை உருவாக்குவோம்!",
    "• நம்பிக்கை • வெளிப்படைத்தன்மை • அர்ப்பணிப்பான சேவை",
  ],
};
const languages = Object.keys(content); // ["en", "ta"]

// The lines of one language
const Lines = ({ lines, as: Tag = "p", ...props }) =>
  lines.map((text) => (
    <Tag key={text} {...props}>
      {text}
    </Tag>
  ));

const lineClass =
  "text-sm font-semibold leading-7 text-[#1e2a4a] sm:text-base md:text-lg";

const FounderMessage = () => {
  const [langIndex, setLangIndex] = useState(0); // 0 = English
  const reduceMotion = useReducedMotion();
  const lang = languages[langIndex];

  // switch language every 10 seconds
  useEffect(() => {
    const id = setInterval(
      () => setLangIndex((i) => (i + 1) % languages.length),
      SWITCH_EVERY_MS,
    );
    return () => clearInterval(id);
  }, []);

  // Animation: lines fade + slide up one after another, then fade out the other way.
  // With "reduce motion" on, only the fade is used.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };
  const line = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 14,
      filter: reduceMotion ? "blur(0px)" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -14,
      filter: reduceMotion ? "blur(0px)" : "blur(6px)",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <section className="w-full mx-auto bg-white px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-[95%] flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-center md:gap-12">
        {/* Photo */}
        <div className="aspect-square w-44 shrink-0 overflow-hidden rounded-tl-[2rem] rounded-br-[3.5rem] bg-sky-100 sm:w-56 md:w-64 lg:w-72">
          <img
            src={images.FounderImage}
            alt="Mr. Ponmuthuvel, Founder & CEO"
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Text */}
        <div className="flex min-w-0 flex-col items-center text-center md:max-w-xl md:flex-none md:items-start md:text-left">
          <img
            src={images.logo}
            alt="MuthVive's Properties"
            className="h-12 w-auto sm:h-14"
          />

          {/* Changing block. Both languages are rendered invisibly in the same grid cell,
              so the block is always as tall as the taller one and nothing jumps. */}
          <div className="mt-5 grid w-full sm:mt-6">
            {languages.map((code) => (
              <div
                key={code}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1"
              >
                <Lines lines={content[code]} className={lineClass} />
              </div>
            ))}

            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                lang={lang}
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="col-start-1 row-start-1"
              >
                {content[lang].map((text) => (
                  <motion.p key={text} variants={line} className={lineClass}>
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-5 font-serif text-xl font-semibold text-black sm:mt-6 sm:text-2xl md:text-[26px]">
            Founder &amp; CEO : Mr. Ponmuthuvel
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
