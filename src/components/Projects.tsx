"use client";
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
import { motion } from "framer-motion";

const projects = [
  {
    title: "Liper Pizza",
    description:
      "A premium storefront for Liper Pizza, featuring real-time inventory, localized categories, and a seamless shopping experience.",
    tags: ["Next.js", "Tailwind", "Firebase"],
    link: "https://liper-pizza.vercel.app/",
    github: "https://github.com/Faris-Hmd/liper-pizza",
  },
  {
    title: "LP Dashboard",
    description:
      "A robust administrative suite for managing orders, products, and real-time shop analytics with secure authentication.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    link: "https://lp-admin-sd.vercel.app/",
    github: "https://github.com/Faris-Hmd/lp-admin",
  },
  {
    title: "LP Driver",
    description:
      "A specialized logistics application for order fulfillment, featuring real-time status updates and delivery management.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    link: "https://lp-driver.vercel.app/",
    github: "https://github.com/Faris-Hmd/lp-driver",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-muted/20 mt-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Highlighting my expertise in building scalable web applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={cardVariants}>
              <Card className="flex flex-col h-full hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-border/50 bg-card md:bg-card/50 md:backdrop-blur-md group hover:-translate-y-3 overflow-hidden relative">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
