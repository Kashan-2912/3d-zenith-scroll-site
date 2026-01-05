'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(false);
  };

  return (
    <section ref={ref} className="relative bg-[#050505] py-32 overflow-hidden">
      <motion.div
        style={{ scale, opacity }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-bold tracking-tighter text-white/90 mb-6"
          >
            Sound That Moves You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Experience the difference that precision engineering makes
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/20 group"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            playsInline
            onEnded={handleVideoEnd}
            controls={showControls}
            poster=""
          >
            <source src="/vid2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer z-10"
              onClick={handlePlayVideo}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all"
                >
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <p className="text-white/80 text-sm font-medium">Watch the Story</p>
              </div>
            </motion.div>
          )}

          {/* Pause overlay when playing (click to pause) */}
          {isPlaying && (
            <div
              className="absolute inset-0 z-5 cursor-pointer"
              onClick={handlePauseVideo}
            />
          )}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20">
          {[
            { value: '99%', label: 'Noise Reduction' },
            { value: '40hrs', label: 'Battery Life' },
            { value: '4.9★', label: 'User Rating' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl lg:text-6xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
