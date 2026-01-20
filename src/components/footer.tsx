import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="font-display font-semibold">Flight Forge Simulations</span>
            <p className="text-xs text-muted-foreground">Crafting authentic flight experiences</p>
          </motion.div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#home" className="hover:text-foreground transition-colors">Home</a>
            <a href="#project" className="hover:text-foreground transition-colors">Project</a>
            <a href="#community" className="hover:text-foreground transition-colors">Community</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Flight Forge Simulations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
