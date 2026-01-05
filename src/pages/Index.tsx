import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialIcons from "@/components/SocialIcons";

const Index = () => {
  return (
    <main className="bg-background">
      <Navigation />
      <SocialIcons />
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default Index;
