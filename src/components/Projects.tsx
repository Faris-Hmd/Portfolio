import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Website",
    description:
      "A premium storefront for PC hardware, featuring real-time inventory, localized categories, and a seamless shopping experience.",
    tags: ["Next.js", "Tailwind", "Firebase"],
    link: "https://sudan-pc-shop.vercel.app/",
    github: "https://github.com/Faris-Hmd/sudan_pc_shop",
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "A robust administrative suite for managing orders, products, and real-time shop analytics with secure authentication.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    link: "https://sps-admin-sd.vercel.app/",
    github: "https://github.com/Faris-Hmd/sps-admin",
  },
  {
    title: "E-Commerce Driver",
    description:
      "A specialized logistics application for order fulfillment, featuring real-time status updates and delivery management.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    link: "https://sps-driver.vercel.app/",
    github: "https://github.com/Faris-Hmd/sps-driver",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-muted/20 mt-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Highlighting my expertise in building scalable web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <Card
              key={i}
              className="flex flex-col h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-md group hover:-translate-y-2 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-cyan-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors text-xl">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground/90 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-primary/5 border-primary/20 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-3 pt-6 flex ">
                <Button size="sm" variant="outline" className="gap-2" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" /> Source
                  </a>
                </Button>
                <Button size="sm" className="gap-2" asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
