// @ts-nocheck
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    title: 'Active Noise Cancellation',
    description: 'Immerse yourself in pure sound. Our advanced ANC technology blocks out the world, letting only the music through.',
    icon: '🎧',
  },
  {
    title: '40-Hour Battery Life',
    description: 'Power through your longest days with fast charging and all-day battery that keeps the music going.',
    icon: '🔋',
  },
  {
    title: 'Spatial Audio',
    description: 'Experience sound in every dimension. Cinematic audio that surrounds you from every angle.',
    icon: '🌌',
  },
  {
    title: 'Premium Materials',
    description: 'Crafted from aerospace-grade titanium and memory foam. Designed for comfort, built to last.',
    icon: '✨',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 hover:border-white/20 transition-colors touch-manipulation"
    >
      <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{feature.icon}</div>
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white/90 mb-3 sm:mb-4">
        {feature.title}
      </h3>
      <p className="text-base sm:text-lg text-white/60 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative bg-[#050505] py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90 mb-4 sm:mb-6">
            Engineered for
            <br />
            <span className="text-white">Perfection</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Every detail refined. Every feature purposeful.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/2 to-transparent pointer-events-none"></div>
    </section>
  );
}
