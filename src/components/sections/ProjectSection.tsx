import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plane, Gauge, Monitor, Settings } from 'lucide-react';

const features = [
  {
    icon: Plane,
    title: 'High-Fidelity Systems',
    description: 'Accurate flight model with authentic flight characteristics and performance data.',
  },
  {
    icon: Gauge,
    title: 'Custom Avionics',
    description: 'Fully functional cockpit with realistic instruments and navigation systems.',
  },
  {
    icon: Monitor,
    title: 'Electronic Flight Bag',
    description: 'Integrated EFB with charts, checklists, and performance calculators.',
  },
  {
    icon: Settings,
    title: 'Advanced Configuration',
    description: 'Extensive customization options for liveries, weight, and fuel management.',
  },
];

const ProjectSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="project"
      ref={ref}
      className="section-container relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            The Project
          </span>
          <h2 className="section-title">
            Airbus A220
          </h2>
          <p className="section-subtitle">
            The next generation of regional aircraft, meticulously recreated for MSFS 2024 
            with uncompromising attention to detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="feature-card group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
