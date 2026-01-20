import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Wrench, Users } from 'lucide-react';

const teamMembers = [
  {
    name: 'Eliaz Törnqvist',
    role: 'Web & EFB Developer',
    description: 'Building the digital experience and Electronic Flight Bag systems.',
    icon: Code,
    highlight: true,
  },
  {
    name: 'Sebastian Asatpov',
    role: 'Systems Engineer and Founder',
    description: 'Core aircraft systems and flight model development.',
    icon: Wrench,
    highlight: true,
  },
  {
    name: '3D Artist',
    role: 'Visual Designer',
    description: 'Cockpit and exterior modeling with high-fidelity textures.',
    icon: Palette,
    highlight: true,
  },
  {
    name: 'Community Manager',
    role: 'Engagement Lead',
    description: 'Connecting with the community and gathering feedback.',
    icon: Users,
    highlight: true,
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="team"
      ref={ref}
      className="section-container"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            The Team
          </span>
          <h2 className="section-title">
            Meet the Crew
          </h2>
          <p className="section-subtitle">
            A dedicated team of professionals bringing the A220 to life in the virtual skies.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`feature-card text-center ${
                member.highlight ? 'border-primary/50 ring-1 ring-primary/20' : ''
              }`}
            >
              <div 
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  member.highlight 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <member.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className={`text-sm font-medium mb-3 ${
                member.highlight ? 'text-primary' : 'text-secondary'
              }`}>
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
