import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [displayNumber, setDisplayNumber] = useState('000');

  useEffect(() => {
    const duration = 2500;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      setDisplayNumber(Math.floor(newProgress).toString().padStart(3, '0'));
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsComplete(true);
        setTimeout(onComplete, 800);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Film grain overlay */}
          <div className="film-grain" />
          
          {/* Scanlines */}
          <div className="scanlines" />
          
          {/* Progress counter */}
          <div className="relative">
            {/* Counter display - cinematic style */}
            <motion.div 
              className="font-display text-[20vw] font-bold tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`transition-all duration-100 ${isComplete ? 'text-primary text-glow-red' : 'text-foreground'}`}>
                {displayNumber}
              </span>
            </motion.div>
            
            {/* Percent symbol */}
            <motion.span 
              className="absolute -right-8 top-4 text-2xl font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              %
            </motion.span>
            
            {/* Progress bar */}
            <motion.div 
              className="mt-8 h-[2px] bg-muted overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
            
            {/* Loading text */}
            <motion.div 
              className="mt-6 flex items-center justify-center gap-2 text-sm tracking-[0.3em] text-muted-foreground uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Loading Timeline</span>
            </motion.div>
          </div>
          
          {/* Corner decorations - film editing UI feel */}
          <div className="absolute top-8 left-8 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              REC
            </div>
          </div>
          
          <div className="absolute top-8 right-8 text-xs text-muted-foreground font-mono tracking-wider">
            00:00:00:00
          </div>
          
          <div className="absolute bottom-8 left-8 text-xs text-muted-foreground font-mono">
            TIMELINE
          </div>
          
          <div className="absolute bottom-8 right-8 text-xs text-muted-foreground font-mono">
            24 FPS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
