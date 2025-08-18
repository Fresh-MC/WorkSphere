import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; 

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setDone(true);
          return 100;
        }
        return old + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Circle math
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center h-1px  bg-[primary]">
      {/* Motion wrapper: controls position of loader */}
      <motion.div
        initial={{ y: 250 }} // start centered
        animate={{ y: done ? 30 : 200 }} // move up when done
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative"
      >
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle - fades in at 100% */}
          <motion.circle
            initial={{ fill: "rgba(229,99,153,0)" }}
            animate={{
              fill: done
                ? "rgba(229,99,153,1)"
                : "rgba(229,99,153,0)",
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            stroke="#a6cfd5"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Progress stroke */}
          <motion.circle
            stroke="#e56399"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: "linear" }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Text inside circle */}
        
      </motion.div>
    </div>
  );
};

export default Loader;
