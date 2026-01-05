'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TechSpecs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const specs = [
    { label: 'Driver Size', value: '40mm' },
    { label: 'Frequency Response', value: '20Hz - 40kHz' },
    { label: 'Impedance', value: '32Ω' },
    { label: 'Weight', value: '250g' },
    { label: 'Bluetooth', value: '5.3' },
    { label: 'Codec Support', value: 'LDAC, aptX HD' },
  ];

  return (
    <section id="specs" ref={ref} className="relative bg-[#050505] py-20 sm:py-24 md:py-32">
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90 mb-4 sm:mb-6 px-4">
            Technical Excellence
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Specifications that define audiophile-grade performance
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-xs sm:text-sm text-white/40 tracking-wider uppercase mb-2 sm:mb-3">
                {spec.label}
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {spec.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-xs sm:text-sm font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 touch-manipulation">
            Download Full Specs Sheet
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
