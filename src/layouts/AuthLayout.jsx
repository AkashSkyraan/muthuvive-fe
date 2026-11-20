import React from "react";
import { Outlet } from "react-router-dom";
import { images } from "../config/Images";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Documents",
    description: "Ensuring property documents are properly verified.",
    icon: images.document,
    iconClass: "blue",
  },
  {
    title: "Legal Assistance",
    description: "Expert guidance for a smooth property transaction.",
    icon: images.legal,
    iconClass: "purple",
  },
  {
    title: "DTCP Approved",
    description: "Explore properties with valid DTCP approval.",
    icon: images.dtcp,
    iconClass: "cyan",
  },
  {
    title: "Site Visit Support",
    description: "Visit and explore your property with our assistance.",
    icon: images.map,
    iconClass: "orange",
  },
];

function AuthLayout() {
  return (
    <main className="flex h-screen w-full overflow-hidden bg-white lg:flex-row">
      {/* LEFT SIDE - FIXED */}
      <section
        className="relative hidden h-full w-full items-center overflow-hidden bg-cover bg-center lg:flex lg:w-[55%]"
        style={{
          backgroundImage: `url(${images.park})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full px-8 py-6 text-left lg:px-14 xl:px-20">
          <h1 className="max-w-xl text-left text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-2xl xl:text-[42px]">
            Find A Place You’ll Love
            <br />
            To Call Home
          </h1>

          <p className="mt-6 max-w-2xl text-left text-sm leading-5 text-white/85 sm:text-base">
            Discover verified properties that match your lifestyle, budget,
            <br className="hidden sm:block" />
            and location. Buy, sell, or rent your perfect property with
            <br className="hidden sm:block" />
            confidence.
          </p>

          <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {features.map((feature, index) => {
              const SWEEP = 2;
              const PAUSE = 3;
              const CYCLE = SWEEP + PAUSE;
              const slot = SWEEP / features.length;
              const start = (index * slot) / CYCLE;
              const end = ((index + 1) * slot) / CYCLE;

              return (
                <motion.div
                  key={feature.title}
                  className="relative overflow-hidden flex min-h-[85px] items-center gap-4 rounded-sm border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                >
                  {/* Shiny glare */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ skewX: -20 }}
                    initial={{ x: "-100%" }}
                    animate={{ x: ["-100%", "-100%", "300%", "300%"] }}
                    transition={{
                      duration: CYCLE,
                      times: [0, start, end, 1],
                      ease: "linear",
                      repeat: Infinity,
                      delay: 1,
                    }}
                  />

                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                      feature.iconClass === "blue"
                        ? "bg-blue-50"
                        : feature.iconClass === "purple"
                          ? "bg-purple-50"
                          : feature.iconClass === "cyan"
                            ? "bg-cyan-50"
                            : "bg-orange-50"
                    }`}
                  >
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="h-7 w-7 object-contain"
                    />
                  </div>

                  <div className="relative">
                    <h3 className="text-sm font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-white/65">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RIGHT SIDE - ONLY THIS SCROLLS */}
      <section className="h-full w-full overflow-y-auto bg-white lg:w-[45%]">
        <div className="flex min-h-full w-full items-center justify-center px-6 py-12 lg:px-12 xl:px-20">
          <div className="w-full max-w-[480px]">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
