'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

const FRAME_COUNT = 120;

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isInView, setIsInView] = useState(true);

  // Track scroll progress within the container
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

  // Track if we're within the scroll section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Check if container is in view (top is above viewport bottom, bottom is below viewport top)
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setIsInView(inView || rect.top > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update frame based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest: number) => {
    if (!imagesLoaded) return;
    const frameIndex = Math.min(
      Math.floor(latest * FRAME_COUNT),
      FRAME_COUNT - 1
    );
    setCurrentFrame(Math.max(0, frameIndex));
  });

  // Render current frame to canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded || images.length === 0) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const img = images[currentFrame];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
    context.clearRect(0, 0, width, height);

    // Cover fit the image
    const canvasAspect = width / height;
    const imageAspect = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imageAspect) {
      drawWidth = width;
      drawHeight = drawWidth / imageAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = drawHeight * imageAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images, imagesLoaded, currentFrame]);

  // Render on frame change and resize
  useEffect(() => {
    renderCanvas();
    window.addEventListener('resize', renderCanvas);
    return () => window.removeEventListener('resize', renderCanvas);
  }, [renderCanvas]);

  // Text opacity animations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 1, 0]);
  const precisionOpacity = useTransform(scrollYProgress, [0.22, 0.30, 0.45], [0, 1, 0]);
  const titaniumOpacity = useTransform(scrollYProgress, [0.48, 0.55, 0.72], [0, 1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.88, 1], [0, 1, 1]);
  
  // Smooth exit transition - fade out and scale down as we leave the section
  const containerOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.92, 1], [1, 0.95]);
  const containerY = useTransform(scrollYProgress, [0.92, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      {/* Loading State */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white" />
            <p className="text-sm text-white/60 tracking-wider">LOADING EXPERIENCE</p>
          </div>
        </div>
      )}

      {/* Fixed canvas wrapper - only shows when section is in view */}
      {isInView && (
        <motion.div 
          style={{ 
            opacity: containerOpacity,
          }}
          className="fixed inset-0 w-full h-screen z-10 origin-center"
        >
          {/* Canvas for frame sequence */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Text Overlays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Hero Title - 0-15% */}
            <motion.div
              style={{ opacity: titleOpacity }}
              className="absolute text-center px-4 w-full"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white/90 mb-3 md:mb-4">
                Zenith X
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl tracking-widest text-white/60">
                PURE SOUND
              </p>
            </motion.div>

            {/* Precision Engineering - 25-35% */}
            <motion.div
              style={{ opacity: precisionOpacity }}
              className="absolute left-4 sm:left-6 md:left-8 lg:left-20 max-w-xs sm:max-w-sm md:max-w-md pr-4"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white/90 mb-1 sm:mb-2">
                Precision
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white/90 mb-2 sm:mb-3 md:mb-4">
                Engineering
              </h2>
              <p className="text-xs sm:text-sm md:text-base tracking-wide text-white/60 leading-relaxed">
                Every component meticulously crafted for acoustic perfection
              </p>
            </motion.div>

            {/* Titanium Drivers - 50-60% */}
            <motion.div
              style={{ opacity: titaniumOpacity }}
              className="absolute right-4 sm:right-6 md:right-8 lg:right-20 max-w-xs sm:max-w-sm md:max-w-md text-right pl-4"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white/90 mb-1 sm:mb-2">
                Titanium
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white/90 mb-2 sm:mb-3 md:mb-4">
                Drivers
              </h2>
              <p className="text-xs sm:text-sm md:text-base tracking-wide text-white/60 leading-relaxed">
                40mm high-fidelity drivers with crystalline clarity
              </p>
            </motion.div>

            {/* CTA - 80-90% */}
            <motion.div
              style={{ opacity: ctaOpacity }}
              className="absolute text-center px-4 w-full"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white/90 mb-4 sm:mb-6">
                Hear Everything
              </h2>
              <button className="pointer-events-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#050505] text-xs sm:text-sm tracking-widest font-semibold hover:bg-white/90 active:scale-95 transition-all rounded-full touch-manipulation">
                EXPLORE ZENITH X
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
