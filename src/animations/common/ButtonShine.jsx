import { Button } from "antd";
import { motion } from "framer-motion";

const MotionButton = motion.create(Button);

const AnimatedButton = ({ children, className = "", ...props }) => {
  return (
    <MotionButton
      {...props}
      className={`!relative !overflow-hidden ${className}`}
    >
      <span className="relative z-10">{children}</span>

      <motion.span
        initial={{
          x: "-100%",
          rotate: 25,
        }}
        animate={{
          x: "400%",
          rotate: 25,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
          delay: 1,
        }}
        className="absolute top-[-50%] bottom-[-50%] left-[-45%] w-[45%] pointer-events-none z-20"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0.7) 50%,
            rgba(255,255,255,0.15) 80%,
            transparent 100%
          )`,
        }}
      />
    </MotionButton>
  );
};

export default AnimatedButton;
