import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Meta Ads Campaign',
    category: 'Instagram Reel',
    description: 'High-converting ad creative for social media marketing',
    thumbnail: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--background)) 100%)',
    duration: '0:30',
    views: '250K+',
  },
  {
    id: 2,
    title: 'Brand Story',
    category: 'Documentary',
    description: 'Compelling brand narrative for lifestyle company',
    thumbnail: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)',
    duration: '2:45',
    views: '180K+',
  },
  {
    id: 3,
    title: 'Product Launch',
    category: 'Commercial',
    description: 'Dynamic product reveal with motion graphics',
    thumbnail: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 100%)',
    duration: '1:15',
    views: '420K+',
  },
  {
    id: 4,
    title: 'Event Highlight',
    category: 'Recap Video',
    description: 'Energy-packed event coverage and highlights',
    thumbnail: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--muted)) 100%)',
    duration: '3:20',
    views: '95K+',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 10;
    const rotateX = -((e.clientY - centerY) / rect.height) * 10;
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:glow-red">
        {/* Thumbnail */}
        <div 
          className="aspect-video relative overflow-hidden"
          style={{ background: project.thumbnail }}
        >
          {/* Film frame overlay */}
          <div className="absolute inset-0 border-l-8 border-r-8 border-background/20" />
          
          {/* Play button */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
            animate={isHovered ? { scale: 1 } : { scale: 0.8 }}
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-2xl ml-1">▶</span>
            </div>
          </motion.div>
          
          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 text-xs font-mono">
            {project.duration}
          </div>
          
          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-primary/90 px-2 py-1 text-xs text-primary-foreground font-medium uppercase tracking-wider">
            {project.category}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {project.description}
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span>👁</span> {project.views}
            </span>
            <span className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View Project
              <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="projects"
      className="relative min-h-screen py-24 px-6"
    >
      <div className="container max-w-6xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-primary text-sm font-mono tracking-wider">03</span>
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Featured Work</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <h2 className="text-headline text-4xl md:text-5xl">
            Selected <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-md">
            A curated selection of recent work showcasing storytelling through visual media.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="btn-cinematic">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
