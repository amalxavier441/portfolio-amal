import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Vertical lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-muted to-transparent opacity-20" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-muted to-transparent opacity-20" />
      </div>
      
      <div className="container max-w-4xl relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-primary text-sm font-mono tracking-wider">01</span>
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">About</span>
        </motion.div>
        
        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-headline text-4xl md:text-5xl mb-6"
            >
              Every frame tells a <span className="text-primary">story</span>.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              I'm Amal Xavier — a video editor and designer who transforms raw footage into 
              compelling visual narratives. With precision cuts and creative vision, I craft 
              content that captivates audiences and drives engagement.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted-foreground leading-relaxed"
            >
              From concept to final export, I handle every stage of the editing process — 
              color grading, sound design, motion graphics, and everything in between.
            </motion.p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border"
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '1M+', label: 'Views' },
                { value: '3+', label: 'Years' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Visual element - editing UI mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square bg-secondary rounded-sm border border-border p-6 relative overflow-hidden">
              {/* Fake timeline UI */}
              <div className="space-y-3">
                <div className="h-8 bg-muted rounded-sm flex items-center px-2 gap-2">
                  <div className="w-6 h-4 bg-primary/30 rounded-sm" />
                  <div className="flex-1 h-3 bg-primary/20 rounded-sm" />
                </div>
                <div className="h-8 bg-muted rounded-sm flex items-center px-2 gap-2">
                  <div className="w-6 h-4 bg-foreground/20 rounded-sm" />
                  <div className="flex-1 h-3 bg-foreground/10 rounded-sm" />
                </div>
                <div className="h-8 bg-muted rounded-sm flex items-center px-2 gap-2">
                  <div className="w-6 h-4 bg-primary/30 rounded-sm" />
                  <div className="w-1/2 h-3 bg-primary/20 rounded-sm" />
                </div>
              </div>
              
              {/* Playhead */}
              <div className="absolute top-6 bottom-6 left-1/3 w-[2px] bg-primary">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-primary" />
              </div>
              
              {/* Preview window */}
              <div className="absolute bottom-6 right-6 w-32 h-20 bg-background border border-border rounded-sm flex items-center justify-center">
                <span className="text-primary text-2xl">▶</span>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute top-2 right-2 text-xs text-muted-foreground font-mono">
                v1.0
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✂
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
