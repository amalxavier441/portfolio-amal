import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CrowdFiguresProps {
  isTyping?: boolean;
  showConfetti?: boolean;
}

const Figure = ({ 
  index, 
  mousePosition, 
  isTyping,
  containerRef
}: { 
  index: number; 
  mousePosition: { x: number; y: number };
  isTyping: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const figureRef = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!figureRef.current || !containerRef.current) return;
    
    const figureRect = figureRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const figureCenterX = figureRect.left + figureRect.width / 2;
    const figureCenterY = figureRect.top + figureRect.height / 2;
    
    const deltaX = mousePosition.x - figureCenterX;
    const deltaY = mousePosition.y - figureCenterY;
    
    const maxOffset = 3;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normalizedX = distance > 0 ? (deltaX / distance) * maxOffset : 0;
    const normalizedY = distance > 0 ? (deltaY / distance) * maxOffset : 0;
    
    setEyePosition({ x: normalizedX, y: normalizedY });
  }, [mousePosition, containerRef]);

  const variations = [
    { height: 60, headSize: 14 },
    { height: 55, headSize: 12 },
    { height: 65, headSize: 15 },
    { height: 58, headSize: 13 },
    { height: 62, headSize: 14 },
    { height: 52, headSize: 11 },
    { height: 68, headSize: 16 },
    { height: 56, headSize: 12 },
    { height: 63, headSize: 14 },
    { height: 54, headSize: 11 },
    { height: 59, headSize: 13 },
  ];

  const { height, headSize } = variations[index % variations.length];

  return (
    <motion.div
      ref={figureRef}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Head with eyes */}
      <div 
        className="relative rounded-full bg-foreground mb-1"
        style={{ width: headSize, height: headSize }}
      >
        {/* Eyes container */}
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          {isTyping ? (
            // Covering eyes animation
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div 
                className="bg-background rounded-full"
                style={{ width: headSize - 4, height: headSize / 2 }}
              />
            </motion.div>
          ) : (
            // Normal eyes following cursor
            <>
              <div 
                className="relative bg-background rounded-full overflow-hidden"
                style={{ width: headSize / 3.5, height: headSize / 3.5 }}
              >
                <motion.div 
                  className="absolute bg-primary rounded-full"
                  style={{ 
                    width: headSize / 7, 
                    height: headSize / 7,
                    left: '50%',
                    top: '50%',
                    x: eyePosition.x - headSize / 14,
                    y: eyePosition.y - headSize / 14,
                  }}
                />
              </div>
              <div 
                className="relative bg-background rounded-full overflow-hidden"
                style={{ width: headSize / 3.5, height: headSize / 3.5 }}
              >
                <motion.div 
                  className="absolute bg-primary rounded-full"
                  style={{ 
                    width: headSize / 7, 
                    height: headSize / 7,
                    left: '50%',
                    top: '50%',
                    x: eyePosition.x - headSize / 14,
                    y: eyePosition.y - headSize / 14,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Body */}
      <div 
        className="bg-foreground rounded-t-full"
        style={{ 
          width: headSize * 0.8, 
          height: height - headSize - 10,
          borderRadius: '40% 40% 0 0'
        }}
      />
    </motion.div>
  );
};

const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2"
          style={{ 
            left: `${piece.x}%`,
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ 
            y: '100vh', 
            rotate: piece.rotation + 720,
            opacity: 0 
          }}
          transition={{ 
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn'
          }}
        />
      ))}
    </div>
  );
};

const CrowdFigures = ({ isTyping = false, showConfetti = false }: CrowdFiguresProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative py-12">
      {showConfetti && <Confetti />}
      
      <div className="flex items-end justify-center gap-4 md:gap-6">
        {Array.from({ length: 11 }, (_, i) => (
          <Figure
            key={i}
            index={i}
            mousePosition={mousePosition}
            isTyping={isTyping}
            containerRef={containerRef}
          />
        ))}
      </div>
      
      {/* Label */}
      <motion.p 
        className="mt-6 text-center text-xs text-muted-foreground tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Your Audience Awaits
      </motion.p>
    </div>
  );
};

export default CrowdFigures;
