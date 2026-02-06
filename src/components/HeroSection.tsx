import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  onZoomComplete?: () => void;
}

const HeroSection = ({ onZoomComplete }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for the zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 3, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 10]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ['-0.05em', '0.1em']);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.6 && !isZooming) {
        setIsZooming(true);
        onZoomComplete?.();
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, isZooming, onZoomComplete]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[300vh]"
    >
      {/* Sticky hero container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Film grain */}
        <div className="film-grain" />
        <div className="scanlines" />
        
        {/* Background texture - abstract editing elements */}
        <div className="absolute inset-0 bg-background">
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
          
          {/* Editing element silhouettes */}
          <div className="absolute top-1/4 left-10 opacity-5 text-[200px] font-bold rotate-12">
            ✂
          </div>
          <div className="absolute bottom-1/4 right-10 opacity-5 text-[150px] font-bold -rotate-12">
            🎬
          </div>
        </div>
        
        {/* Main hero content */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ 
            scale,
            opacity,
            filter: useTransform(blur, (v) => `blur(${v}px)`)
          }}
        >
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 text-sm tracking-[0.5em] text-muted-foreground uppercase"
          >
            Amal Xavier
          </motion.div>
          
          {/* Main title - "I CUT STORIES" */}
          <motion.h1 
            className="text-hero text-[15vw] md:text-[18vw] lg:text-[20vw] text-center leading-none"
            style={{ letterSpacing }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.span 
              className="block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              I CUT
            </motion.span>
            <motion.span 
              className="block text-primary"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              STORIES
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground tracking-wider"
          >
            Video Editor & Designer
          </motion.p>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Scroll to Enter
            </span>
            <motion.div 
              className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
        
        {/* Corner UI elements */}
        <div className="absolute top-8 left-8 text-xs text-muted-foreground font-mono flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LIVE
          </span>
        </div>
        
        <div className="absolute top-8 right-8 text-xs text-muted-foreground font-mono">
          PORTFOLIO_V1.0
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
