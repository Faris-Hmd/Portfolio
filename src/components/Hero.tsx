"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Github } from "lucide-react";
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 z-10"
    >
      {/* Radial soft scrim to guarantee 100% text readability over the 3D canvas */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, hsl(var(--background) / 0.5) 0%, hsl(var(--background) / 0.25) 45%, transparent 75%)",
        }}
      />

      {/* Subtle ambient dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        <motion.div
          style={{ y: contentY, opacity }}
          className="flex flex-col items-center text-center backdrop-blur-[2px] rounded-3xl py-4"
        >
          {/* Main Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 mb-6"
          >

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
              <span className="text-foreground">Hi, I&apos;m </span>
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Faris Hamad
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground/90 leading-snug">
              Full-Stack Developer &amp; Cloud Systems Builder
            </h2>
          </motion.div>

          {/* Description — focused on engineering craft & philosophy, without naming projects */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="text-base sm:text-lg lg:text-xl text-foreground/85 dark:text-muted-foreground/95 max-w-2xl leading-relaxed mb-10 font-normal"
          >
            Crafting high-performance web platforms, resilient cloud architectures, and distributed systems. Focused on clean engineering, end-to-end reliability, and intuitive digital experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-4 justify-center"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-sm font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 group rounded-xl transition-all"
              asChild
            >
              <a href="#projects">
                View Projects
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 text-sm font-semibold border-border/80 hover:bg-muted/70 active:scale-95 rounded-xl gap-2 transition-all"
              asChild
            >
              <a href="https://github.com/Faris-Hmd" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
