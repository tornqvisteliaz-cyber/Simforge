import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ProjectSection from '@/components/sections/ProjectSection';
import AboutSection from '@/components/sections/AboutSection';
import TeamSection from '@/components/sections/TeamSection';
import EFBSection from '@/components/sections/EFBSection';
import CommunitySection from '@/components/sections/CommunitySection';
import Footer from '@/components/Footer'; // Footer är nu default-exporterad

const Index = () => {
  return (
    <div className="relative bg-background text-foreground">
      <Navigation />

      <main>
        <HeroSection />
        <ProjectSection />
        <AboutSection />
        <TeamSection />
        <EFBSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
