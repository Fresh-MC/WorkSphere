import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const categories = [
  { name: 'Graphic Design', icon: '🎨', desc: 'Logos, Posters', popular: true },
  { name: 'Web Development', icon: '💻', desc: 'Frontend, Backend' },
  { name: 'Video Editing', icon: '🎬', desc: 'YouTube, Ads', popular: true },
  { name: 'Content Writing', icon: '✍️', desc: 'Blogs, SEO' },
];

export default function CategoryCards() {
  const controls = useAnimation();
  const ref = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const offset = window.scrollY / 2; // adjust speed
        setScrollX(offset);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden py-12 bg-[#E9DBDE]">
      <motion.div
        className="flex gap-6 px-6"
        style={{ x: -scrollX }}
        ref={ref}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            className="relative w-64 h-72 bg-[#E9DBDE] rounded-xl shadow-lg flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05 }}
            onClick={() => alert(`Clicked on ${cat.name}`)}
          >
            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#CBA7B0]/30 via-[#B67679]/30 to-[#E9DBDE]/30 opacity-0"
              whileHover={{ opacity: 1 }}
            ></motion.div>

            {/* Popular Badge */}
            {cat.popular && (
              <div className="absolute top-2 right-2 bg-[#CBA7B0] text-white text-xs px-2 py-1 rounded-full font-bold">
                Popular
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 text-5xl mb-4">{cat.icon}</div>
            <h3 className="relative z-10 font-heading font-bold text-[#513934] mb-2">
              {cat.name}
            </h3>
            <p className="relative z-10 text-sm text-[#667E7F]">{cat.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
