import React, { useEffect, useRef, useState } from "react";

// Dynamic data - replace with API response
const stats = [
  { id: 1, value: 12, suffix: "+", label: "Years of Expertise" },
  { id: 2, value: 500, suffix: "+", label: "Completed Projects" },
  { id: 3, value: 1200, suffix: "+", label: "Happy Clients" },
  { id: 4, value: 50, suffix: "k", label: "Users" },
];

const useCountUp = (target, shouldStart, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);

  return count;
};

const StatItem = ({ stat, shouldStart }) => {
  const count = useCountUp(stat.value, shouldStart);

  return (
    <div className="flex-1 text-center px-4 py-6 sm:py-0">
      <p className="text-3xl md:text-4xl font-bold text-gray-800">
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#f6f8fe] py-12 md:py-0 md:min-h-[220px] flex items-center"
    >
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-2 sm:flex sm:divide-x sm:divide-gray-300 gap-y-6">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} shouldStart={hasStarted} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
