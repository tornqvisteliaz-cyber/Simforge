import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Zap } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-container bg-card/50"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            About Us
          </span>
          <h2 className="section-title">
            Flight Forge Simulations
          </h2>
          <p className="section-subtitle">
            A passionate team of aviation enthusiasts and developers dedicated to 
            creating the most immersive flight simulation experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To bridge the gap between virtual and real aviation by delivering 
              aircraft add-ons that set new standards in fidelity, performance, 
              and user experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
              <Eye className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To become a leading force in flight simulation development, 
              known for innovation, authenticity, and community-driven design 
              that exceeds expectations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Our Approach
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Combining cutting-edge technology with deep aviation knowledge, 
              we iterate based on real pilot feedback and community input to 
              ensure maximum authenticity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
