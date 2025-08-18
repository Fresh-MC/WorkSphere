// src/components/Image.jsx
import React from 'react';
import { motion } from 'framer-motion';
import cityImage from '../assets/city2.png'; // Import from assets

export default function Image({ src = cityImage, alt = "City" }) {
  return (
  <motion.img
  src={src}
  alt={alt}
  className="w-full max-w-[1600px] h-auto max-h-[800px] object-cover mx-auto"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: -150 }}
  transition={{ duration: 1, ease: "easeOut" }}
/>

  );
}
