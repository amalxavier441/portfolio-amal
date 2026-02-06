import { useState } from 'react';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Film grain overlay - always visible */}
      <div className="film-grain" />
      
      {/* Preloader */}
      {!isLoaded && (
        <Preloader onComplete={() => setIsLoaded(true)} />
      )}

      {/* Navigation */}
      {isLoaded && <Navigation />}

      {/* Main content */}
      {isLoaded && (
        <main>
          {/* Hero Section with scroll zoom */}
          <HeroSection />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Skills Section */}
          <SkillsSection />
          
          {/* Projects Section */}
          <ProjectsSection />
          
          {/* Contact Section with Crowd Figures */}
          <ContactSection />
        </main>
      )}
    </div>
  );
};

export default Index;
