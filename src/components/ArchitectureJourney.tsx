"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Network, Layers, Server } from "lucide-react";

function TimelineMilestoneCard({
  item,
  index,
}: {
  item: {
    period: string;
    role: string;
    project: string;
    description: string;
    tags: string[];
    icon: React.ElementType;
  };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const MilestoneIcon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative pl-16 sm:pl-20"
    >
      {/* Animated glowing timeline node */}
      <div className="absolute left-6 sm:left-8 -translate-x-1/2 top-6 w-9 h-9 rounded-full border-4 border-background bg-card shadow-lg shadow-primary/25 flex items-center justify-center group-hover:scale-110 transition-transform">
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 pointer-events-none" />
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <MilestoneIcon className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Milestone Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-3xl border border-border/70 bg-card/85 dark:bg-card/65 backdrop-blur-xl p-7 sm:p-9 shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden group"
      >
        {/* Dynamic Cursor Spotlight */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 -z-0"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 70%)`,
            }}
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.period}</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {item.project}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors relative z-10">
          {item.role}
        </h3>

        <p className="text-sm text-foreground/80 dark:text-muted-foreground mt-3 leading-relaxed relative z-10">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5 relative z-10">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-muted/60 text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ArchitectureJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const milestones = [
    {
      period: "2024 — Present",
      role: "Lead Systems & Full-Stack Developer",
      project: "MikMan Cloud Architecture",
      description:
        "Architected and deployed a multi-tenant MikroTik router orchestration platform across remote VPS nodes, encrypted WireGuard VPN tunnels, Node.js proxy gateways, and Next.js / React Native client applications.",
      tags: ["Next.js", "Node.js", "WireGuard", "RouterOS", "WebSockets", "PM2"],
      icon: Network,
    },
    {
      period: "2024 — Present",
      role: "Full-Stack Web Developer",
      project: "Liper Pizza Ecosystem",
      description:
        "Engineered the complete digital infrastructure for a high-volume food brand: customer ordering web app, real-time kitchen operations Kanban dashboard, and driver logistics mobile application.",
      tags: ["Next.js", "TypeScript", "Firebase Firestore", "Tailwind CSS", "PWA"],
      icon: Layers,
    },
    {
      period: "2023 — 2024",
      role: "Network Automation & Systems Engineer",
      project: "MikroTik Infrastructure",
      description:
        "Configured and managed enterprise router fleets, automated bandwidth shaping policies, captive portal environments, and network diagnostics.",
      tags: ["RouterOS", "Networking", "Bash Scripts", "Linux Systems"],
      icon: Server,
    },
  ];

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-transparent z-10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2 block">
            Experience &amp; Journey
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Architecture Milestones
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Proven track record in deploying production cloud systems, network automations, and full-stack web platforms.
          </p>
        </div>

        {/* Timeline */}
        <motion.div style={{ y: yOffset }} className="relative max-w-4xl">
          {/* Vertical timeline spine with gradient */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-primary via-cyan-400 to-border/40" />

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <TimelineMilestoneCard key={index} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
