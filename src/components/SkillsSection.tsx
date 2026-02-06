import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'Adobe Premiere Pro', level: 95, icon: 'Pr' },
  { name: 'After Effects', level: 90, icon: 'Ae' },
  { name: 'Photoshop', level: 85, icon: 'Ps' },
  { name: 'Illustrator', level: 75, icon: 'Ai' },
  { name: 'Content Creation', level: 92, icon: '📹' },
  { name: 'Storytelling', level: 88, icon: '📖' },
];

const workflow = [
  { step: '01', title: 'SHOOT', description: 'Capture the raw moments' },
  { step: '02', title: 'EDIT', description: 'Craft the narrative' },
  { step: '03', title: 'PUBLISH', description: 'Deliver the story' },
  { step: '04', title: 'REACH', description: 'Connect with audience' },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="skills"
      className="relative min-h-screen py-24 px-6 bg-secondary/30"
    >
      <div className="container max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary text-sm font-mono tracking-wider">02</span>
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Skills & Tools</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills bars */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-headline text-3xl md:text-4xl mb-10"
            >
              Technical <span className="text-primary">Arsenal</span>
            </motion.h2>
            
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-muted rounded-sm flex items-center justify-center text-sm font-bold">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/60"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Workflow */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-headline text-3xl md:text-4xl mb-10"
            >
              The <span className="text-primary">Process</span>
            </motion.h2>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-4 top-8 bottom-8 w-[1px] bg-border" />
              
              <div className="space-y-8">
                {workflow.map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    className="relative pl-12"
                  >
                    {/* Step number */}
                    <div className="absolute left-0 top-0 w-8 h-8 bg-background border border-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-mono text-primary">{item.step}</span>
                    </div>
                    
                    <div className="bg-card border border-border p-5 rounded-sm hover:border-primary transition-colors group">
                      <h3 className="text-xl font-bold tracking-wider mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute right-10 top-1/2 -translate-y-1/2 text-[300px] font-bold text-muted/5 pointer-events-none select-none hidden lg:block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          ✂
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
