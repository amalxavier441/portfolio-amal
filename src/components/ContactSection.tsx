import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import CrowdFigures from './CrowdFigures';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsTyping(false);
    
    // Reset after animation
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 500);
  };

  return (
    <section 
      ref={ref}
      id="contact"
      className="relative min-h-screen py-24 px-6 bg-secondary/20"
    >
      <div className="container max-w-4xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-primary text-sm font-mono tracking-wider">04</span>
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Get In Touch</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-headline text-4xl md:text-5xl lg:text-6xl mb-6"
        >
          Let's Create <span className="text-primary">Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-12 max-w-2xl"
        >
          Have a project in mind? Let's talk about how we can bring your vision to life 
          through compelling visual storytelling.
        </motion.p>

        {/* Crowd figures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <CrowdFigures isTyping={isTyping} showConfetti={isSubmitted} />
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="relative"
        >
          {/* Success overlay */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-background/95 z-10 flex flex-col items-center justify-center rounded-sm border border-primary glow-red"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl mb-4"
              >
                ✓
              </motion.div>
              <h3 className="text-2xl font-bold text-primary mb-2">EXPORT COMPLETE</h3>
              <p className="text-muted-foreground">Message delivered successfully</p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={() => setIsTyping(true)}
                required
                className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:glow-red transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={() => setIsTyping(true)}
                required
                className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:glow-red transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm text-muted-foreground mb-2 uppercase tracking-wider">
              Project Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={() => setIsTyping(true)}
              required
              rows={5}
              className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:glow-red transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="btn-cinematic w-full md:w-auto group"
          >
            <span className="flex items-center justify-center gap-3">
              <span>Send Message</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>

          {/* Form decoration */}
          <div className="absolute -bottom-4 -right-4 text-xs text-muted-foreground font-mono opacity-50">
            RENDER_QUEUE: 1
          </div>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-sm text-muted-foreground">
            © 2024 Amal Xavier. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {['Instagram', 'YouTube', 'LinkedIn', 'Behance'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wider"
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
