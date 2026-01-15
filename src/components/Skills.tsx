"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Atom,
  Code2,
  Flame,
  Github,
  Layers,
  Palette,
  Server,
  Wind,
} from "lucide-react";

const skills = [
  { name: "React", level: "Advanced", icon: Atom },
  { name: "Next.js", level: "Advanced", icon: Layers },
  { name: "TypeScript", level: "Intermediate", icon: Code2 },
  { name: "Tailwind CSS", level: "Advanced", icon: Wind },
  { name: "Firebase", level: "Intermediate", icon: Flame },
  { name: "Shadcn UI", level: "Advanced", icon: Palette },
  { name: "Node.js", level: "Intermediate", icon: Server },
  { name: "Git & GitHub", level: "Advanced", icon: Github },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 relative mt-4 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies I use to build scalable and performant applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              custom={index}
              className="h-full"
            >
              <Card className="group h-full relative overflow-hidden transition-all duration-300 hover:border-primary/50 bg-card md:bg-card/50 md:backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="flex flex-col items-center justify-center p-6 gap-4 relative z-10">
                  <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <skill.icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/70">
                      {skill.level}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
