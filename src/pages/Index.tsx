import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background">
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default Index;
