"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Github,
  Code2,
  Database,
  Globe,
  Smartphone,
  Coffee,
} from "lucide-react";

const FloatingIcon = ({
  icon: Icon,
  className,
  delay,
}: {
  icon: any;
  className: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.2, 0.5, 0.2],
      scale: 1,
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute hidden lg:block text-primary/20 ${className}`}
  >
    <Icon size={48} />
  </motion.div>
);

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse hidden md:block" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700 hidden md:block" />

      {/* Floating Icons */}
      <FloatingIcon icon={Code2} className="top-[20%] left-[15%]" delay={0} />
      <FloatingIcon
        icon={Database}
        className="bottom-[25%] left-[20%]"
        delay={1}
      />
      <FloatingIcon icon={Globe} className="top-[25%] right-[20%]" delay={2} />
      <FloatingIcon
        icon={Smartphone}
        className="bottom-[20%] right-[15%]"
        delay={3}
      />
      <FloatingIcon
        icon={Coffee}
        className="top-[10%] left-[50%] -translate-x-1/2"
        delay={4}
      />

      <div className="container mx-auto px-4 text-center z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-1 bg-primary/10 md:bg-primary/5 rounded-full border border-primary/20 md:backdrop-blur-sm"
        >
          <span className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-black dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-white/50"
        >
          Faris Hamad
          <br />{" "}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Building Digital Excellence
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Hi, I'm a{" "}
          <span className="text-primary font-bold">Full Stack Developer</span>{" "}
          based in Sudan, passionate about building high-performance web
          applications using
          <span className="text-foreground font-semibold"> Next.js</span>,
          <span className="text-foreground font-semibold"> TypeScript</span>,
          and
          <span className="text-foreground font-semibold"> Firebase</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            size="lg"
            className="gap-2 h-14 px-10 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 group"
            asChild
          >
            <a href="#projects">
              View My Projects{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 h-14 px-10 text-lg hover:bg-muted transition-all active:scale-95 border-2"
            asChild
          >
            <a
              href="https://github.com/Faris-Hmd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
