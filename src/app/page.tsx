import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <p>
            © {new Date().getFullYear()} Portfolio. Built with Next.js,
            Tailwind, and Shadcn UI.
          </p>
        </div>
      </footer>
    </main>
  );
}
