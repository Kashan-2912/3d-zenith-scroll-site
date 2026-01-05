'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 120;

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload all images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `/headphone-sequence/ezgif-frame-${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  // Draw frame on canvas based on scroll position
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const render = () => {
      const scrollProgress = scrollYProgress.get();
      const frameIndex = Math.min(
        Math.floor(scrollProgress * FRAME_COUNT),
        FRAME_COUNT - 1
      );

      const img = images[frameIndex];
      if (!img) return;

      // Set canvas size to match window
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.scale(dpr, dpr);

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate scale to fit image while maintaining aspect ratio
      const canvasAspect = window.innerWidth / window.innerHeight;
      const imageAspect = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imageAspect) {
        // Canvas is wider than image
        drawWidth = window.innerWidth;
        drawHeight = drawWidth / imageAspect;
        offsetX = 0;
        offsetY = (window.innerHeight - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawHeight = window.innerHeight;
        drawWidth = drawHeight * imageAspect;
        offsetX = (window.innerWidth - drawWidth) / 2;
        offsetY = 0;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = scrollYProgress.on('change', render);
    render(); // Initial render

    // Handle resize
    const handleResize = () => render();
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [images, imagesLoaded, scrollYProgress]);

  // Text opacity animations based on scroll progress
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const precisionOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.5], [0, 1, 0]);
  const titaniumOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.75], [0, 1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Loading State */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white"></div>
            <p className="text-sm text-white/60 tracking-wider">LOADING EXPERIENCE</p>
          </div>
        </div>
      )}

      {/* Sticky Canvas */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 h-screen w-full"
      />

      {/* Text Overlays */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        {/* Hero Title - 0% */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute text-center"
        >
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white/90 mb-4">
            Zenith X
          </h1>
          <p className="text-xl md:text-2xl tracking-widest text-white/60">
            PURE SOUND
          </p>
        </motion.div>

        {/* Precision Engineering - 30% */}
        <motion.div
          style={{ opacity: precisionOpacity }}
          className="absolute left-8 md:left-20 max-w-md"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-2">
            Precision
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-4">
            Engineering
          </h2>
          <p className="text-sm md:text-base tracking-wide text-white/60">
            Every component meticulously crafted for acoustic perfection
          </p>
        </motion.div>

        {/* Titanium Drivers - 60% */}
        <motion.div
          style={{ opacity: titaniumOpacity }}
          className="absolute right-8 md:right-20 max-w-md text-right"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-2">
            Titanium
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-4">
            Drivers
          </h2>
          <p className="text-sm md:text-base tracking-wide text-white/60">
            40mm high-fidelity drivers with crystalline clarity
          </p>
        </motion.div>

        {/* CTA - 90% */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="absolute text-center"
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white/90 mb-6">
            Hear Everything
          </h2>
          <button className="pointer-events-auto px-8 py-4 bg-white text-[#050505] text-sm tracking-widest font-semibold hover:bg-white/90 transition-colors">
            EXPLORE ZENITH X
          </button>
        </motion.div>
      </div>
    </div>
  );
}
