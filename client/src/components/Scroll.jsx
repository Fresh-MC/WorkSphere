import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaVideo,
  FaPenFancy,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    title: "Learn a Skill",
    desc: "Choose a freelancing skill and master it.",
    details: [
      "Research high-demand skills (web dev, design, writing).",
      "Pick one and commit to 30–60 minutes daily.",
      "Complete a beginner-friendly project.",
    ],
    icon: <FaLaptopCode size={32} />,
    link: "/learn-skill",
  },
  {
    title: "Create Portfolio",
    desc: "Showcase your best work and projects.",
    details: [
      "Build 2–3 sample projects.",
      "Present them with clear screenshots & writeups.",
      "Use a clean portfolio site or Behance/Dribbble.",
    ],
    icon: <FaPaintBrush size={32} />,
    link: "/portfolio",
  },
  {
    title: "Start Small Projects",
    desc: "Gain real-world experience with simple gigs.",
    details: [
      "Look for beginner-friendly freelance sites.",
      "Charge low initially to get testimonials.",
      "Document your process for case studies.",
    ],
    icon: <FaVideo size={32} />,
    link: "/projects",
  },
  {
    title: "Get Reviews",
    desc: "Collect client feedback to build trust.",
    details: [
      "Always ask for reviews after delivery.",
      "Highlight reviews on your portfolio.",
      "Respond professionally to feedback.",
    ],
    icon: <FaPenFancy size={32} />,
    link: "/reviews",
  },
  {
    title: "Scale Up",
    desc: "Specialize and take larger projects.",
    details: [
      "Increase your rates gradually.",
      "Niche down into a specific industry.",
      "Automate outreach & repeat clients.",
    ],
    icon: <FaChartLine size={32} />,
    link: "/scale-up",
  },
];

export default function FreelancerTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="min-h-[200vh] bg-[#F9F7F7] py-32 px-6">
      <h2 className="text-6xl md:text-7xl uppercase font-heading font-bold text-[#FF4C8B] text-center mb-24">
        Freelancer Journey
      </h2>

      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        {/* Vertical Timeline Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#FF4C8B] via-[#320E3B] to-[#320E3B] rounded-full"
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const stepStart = index / steps.length;
          const stepEnd = (index + 1) / steps.length;

          const opacity = useTransform(
            scrollYProgress,
            [stepStart, stepEnd],
            [0, 1]
          );
          const xLeft = useTransform(
            scrollYProgress,
            [stepStart, stepEnd],
            [-100, 0]
          );
          const xRight = useTransform(
            scrollYProgress,
            [stepStart, stepEnd],
            [100, 0]
          );

          return (
            <div
              key={index}
              className="flex w-full relative mb-28 md:mb-40 z-10"
              id={`timeline-${index}`}
            >
              {/* Left Section */}
              <motion.div
                className="flex flex-col items-end w-1/2 pr-6 text-right"
                style={{ opacity, x: xLeft }}
              >
                <div className="flex items-center justify-end mb-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4C8B] text-white shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#320E3B] ml-4">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[#667E7F] text-lg mb-2">{step.desc}</p>
              </motion.div>

              {/* Right Section */}
              <motion.div
                className="flex-1 max-w-lg pl-8 text-left"
                style={{ opacity, x: xRight }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer bg-white border-l-4 border-[#FF4C8B] p-6 rounded-xl shadow-md transition-all duration-300"
                  onClick={() => (window.location.href = step.link)}
                >
                  <ul className="list-disc pl-6 space-y-2 text-sm text-[#555]">
                    {step.details.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
