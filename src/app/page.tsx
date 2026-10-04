import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { ArchitectureJourney } from "@/components/ArchitectureJourney";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 relative">
      {/* Persistent 3D Globe & Atmospheric Galaxy Across Entire Website */}
      <BackgroundCanvas />

      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <ArchitectureJourney />
      <Contact />
      <Footer />
    </main>
  );
}
