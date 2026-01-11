"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Github, Code2 } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-500" />

      <div className="container mx-auto px-4 text-center z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-1 bg-primary/5 rounded-full border border-primary/20 backdrop-blur-sm"
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
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-white/50"
        >
          Faris Hamad
          <br />{" "}
          <span className="text-4xl md:text-6xl bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Building Digital Excellence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button size="lg" className="gap-2 h-12 px-8 text-base" asChild>
            <a href="#projects">
              View My Projects <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2 h-12 px-8 text-base"
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
