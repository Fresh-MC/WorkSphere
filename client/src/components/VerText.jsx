    import { motion, useScroll, useTransform, useSpring } from "framer-motion";
    import React, { useRef } from "react";

    export const VelocityText = () => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Scale up text based on scroll
    const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const scaleSpring = useSpring(scale, { stiffness: 300, damping: 30 });

    // Horizontal movement ranges
    const xLeftToRight = useTransform(scrollYProgress, [0, 1], [-2000, 0]);
    const xLeftToRightSpring = useSpring(xLeftToRight, { stiffness: 300, damping: 30 });

    const xRightToLeft = useTransform(scrollYProgress, [0, 1], [0, -2000]);
    const xRightToLeftSpring = useSpring(xRightToLeft, { stiffness: 300, damping: 30 });

    return (
        <section
        ref={targetRef}
        className="h-[50vh] bg-[] text-[#A6CFD5] overflow-hidden flex flex-col justify-center"
        >
        {/* Text moving left → right */}
        <motion.p
            style={{ x: xLeftToRightSpring, scale: scaleSpring }}
            className="whitespace-nowrap text-3xl md:text-5xl font-heading font-bold uppercase mb-8"
        >
            Editing , Designing, Writing, and Developing
        </motion.p>

        {/* Text moving right → left */}
        <motion.p
            style={{ x: xRightToLeftSpring, scale: scaleSpring }}
            className="whitespace-nowrap text-4xl md:text-6xl font-heading font-bold uppercase"
        >
        A Guide to Freelancing Success and Growth
        </motion.p>
        </section>
    );
    };
