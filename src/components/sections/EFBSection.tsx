import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Tablet, Map, FileText, Calculator, Sliders, Gauge, Settings2 } from 'lucide-react';

const efbFeatures = [
  { icon: Map, title: 'Interactive Charts', description: 'Airport diagrams and approach plates' },
  { icon: FileText, title: 'Smart Checklists', description: 'Automated procedure tracking' },
  { icon: Calculator, title: 'Performance', description: 'Takeoff and landing calculations' },
  { icon: Sliders, title: 'Realistic Controls', description: 'Authentic cockpit interactions' },
  { icon: Gauge, title: 'System Fidelity', description: 'True-to-life aircraft behavior' },
  { icon: Settings2, title: 'Custom Settings', description: 'Tailor your flight experience' },
];

const EFBSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="efb"
      ref={ref}
      className="section-container"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
              Our Focus
            </span>
            <h2 className="section-title">
              EFB & Realistic Controls
            </h2>
            <p className="section-subtitle mb-8">
              We're dedicated to building an immersive Electronic Flight Bag and authentic 
              cockpit controls. Every switch, dial, and system is designed with realism in mind, 
              giving you the most true-to-life A220 experience possible.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {efbFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* EFB Device Mockup */}
            <div className="relative mx-auto max-w-md">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              
              {/* Tablet frame */}
              <div className="relative bg-card border-4 border-muted rounded-3xl p-4 shadow-2xl">
                <div className="bg-background rounded-2xl aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                  {/* Screen content */}
                  <div className="absolute inset-0 p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Tablet className="w-5 h-5 text-primary" />
                        <span className="font-display font-semibold text-sm">Flight Forge EFB</span>
                      </div>
                      <div className="text-xs text-muted-foreground">A220-300</div>
                    </div>
                    
                    {/* Grid of mock features */}
                    <div className="grid grid-cols-3 gap-2">
                      {['Charts', 'Perf', 'Weather', 'Checklist', 'FPL', 'Settings'].map((item) => (
                        <div
                          key={item}
                          className="bg-card/50 rounded-lg p-3 text-center hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                          <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-primary/20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-primary/50" />
                          </div>
                          <span className="text-xs text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Status bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                      <span>FLT: FFG001</span>
                      <span>UTC 14:32</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EFBSection;
