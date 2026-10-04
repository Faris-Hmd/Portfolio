"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ExternalLink,
  Github,
  Server,
  ShoppingBag,
  ArrowUpRight,
  Layers,
  Shield,
  Radio,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  category: string;
  categoryIcon: React.ElementType;
  categoryColor: string;
  title: string;
  tagline: string;
  description: string;
  architecturePoints: { title: string; desc: string; icon: React.ElementType }[];
  tags: string[];
  image: string;
  badge?: string;
  links: { label: string; href: string; primary?: boolean; icon?: React.ElementType }[];
}

const PROJECTS: Project[] = [
  {
    id: "mikman",
    category: "Distributed Cloud Infrastructure",
    categoryIcon: Server,
    categoryColor: "text-cyan-400",
    title: "MikMan — Cloud Router Orchestration",
    tagline: "Centralized remote MikroTik automation over an encrypted WireGuard VPN mesh.",
    description:
      "A high-throughput cloud management platform for remote multi-site MikroTik fleets. Integrates a Node.js MVC gateway, real-time WebSocket telemetry stream, zero-touch idempotent RouterOS scripts, and dynamic voucher batch generation via Next.js and React Native clients.",
    architecturePoints: [
      {
        title: "BFF API Proxy Gateway",
        desc: "Aggregates RouterOS endpoints and handles token authentication to eliminate mobile client latency.",
        icon: Server,
      },
      {
        title: "Encrypted WireGuard Mesh",
        desc: "Automated site-to-VPS tunnels securely routing remote CHR instances over private subnets.",
        icon: Shield,
      },
      {
        title: "Live WebSocket Telemetry",
        desc: "Sub-second streaming of real-time interface throughput, CPU loads, and active user sessions.",
        icon: Radio,
      },
    ],
    tags: [
      "Node.js",
      "Express MVC",
      "WireGuard VPN",
      "MikroTik RouterOS",
      "WebSockets",
      "Next.js",
      "React Native",
      "PM2",
    ],
    image: "/images/mikman.jpg",
    links: [
      {
        label: "View Repository",
        href: "https://github.com/Faris-Hmd",
        primary: true,
        icon: Github,
      },
    ],
  },
  {
    id: "liper-pizza",
    category: "Full-Stack Production Ecosystem",
    categoryIcon: ShoppingBag,
    categoryColor: "text-amber-400",
    title: "Liper Pizza — Commercial Platform",
    tagline: "Live customer storefront, realtime kitchen dispatch & driver logistics.",
    description:
      "A complete digital restaurant ecosystem built from the ground up and running actively in production. Powers customer ordering with real-time Firestore sync, an interactive menu customizer, an operational kitchen Kanban board, and a delivery driver mobile PWA.",
    badge: "Active in Production",
    architecturePoints: [
      {
        title: "Reactive Customer Storefront",
        desc: "Dynamic cart, crust & topping customizer, and instantaneous Firestore inventory synchronization.",
        icon: Sparkles,
      },
      {
        title: "Operational Admin & Kitchen Hub",
        desc: "Realtime Kanban order management, kitchen prep timers, and operational revenue analytics.",
        icon: Layers,
      },
      {
        title: "Delivery Driver PWA",
        desc: "GPS dispatching, instant status notifications, and role-based Firebase authentication.",
        icon: Shield,
      },
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Firebase Firestore",
      "Firebase Auth",
      "Tailwind CSS",
      "Framer Motion",
      "PWA",
    ],
    image: "/images/liper-pizza.jpg",
    links: [
      {
        label: "Live Storefront",
        href: "https://liper-pizza.vercel.app/",
        primary: true,
        icon: ArrowUpRight,
      },
      {
        label: "Admin Hub",
        href: "https://lp-admin-sd.vercel.app/",
        icon: ExternalLink,
      },
      {
        label: "GitHub",
        href: "https://github.com/Faris-Hmd/liper-pizza",
        icon: Github,
      },
    ],
  },
];

/**
 * 3D Interactive Project Card with cursor perspective tilt and specular highlight
 */
function InteractiveProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt animation values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const CategoryIcon = project.categoryIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group rounded-3xl border border-border/70 bg-card/85 dark:bg-card/65 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/10 hover:border-primary/50 transition-colors duration-500"
      >
        {/* Specular mouse spotlight glow */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-100 transition-opacity duration-300 -z-0"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), transparent 50%)`,
            }}
          />
        )}

        <div className="grid lg:grid-cols-12 gap-0 relative z-10">
          {/* Project Media Visual */}
          <div className="lg:col-span-6 relative overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] bg-slate-950 flex items-center justify-center">
            {/* Ambient backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-cyan-500/10 z-10 pointer-events-none" />

            {/* Status Badge */}
            {project.badge && (
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-300">
                  {project.badge}
                </span>
              </div>
            )}

            {/* Project Image */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Subtle bottom vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Project Content & Architectural Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between p-7 sm:p-10 lg:p-11 relative">
            {/* Space HUD Corner Marks */}
            <span className="absolute top-3 right-4 font-mono text-[10px] text-primary/40 select-none tracking-widest hidden sm:block">
              [ SYS.ORBIT // 0{index + 1} ]
            </span>
            <span className="absolute bottom-3 right-4 font-mono text-[9px] text-muted-foreground/40 select-none tracking-wider hidden sm:block">
              COORD // 15.5°N • SECTOR 0{index + 1}
            </span>

            <div className="space-y-6">
              {/* Category */}
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider">
                <CategoryIcon className={`w-4 h-4 ${project.categoryColor}`} />
                <span className={project.categoryColor}>{project.category}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-1.5 leading-snug">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/80 dark:text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Architecture Highlights */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block">
                  Core Architecture
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {project.architecturePoints.map((point) => {
                    const PointIcon = point.icon;
                    return (
                      <div
                        key={point.title}
                        className="flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm"
                      >
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5 flex-shrink-0">
                          <PointIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground">
                            {point.title}
                          </h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                            {point.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-muted/60 text-muted-foreground border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-border/50">
              {project.links.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <Button
                    key={link.label}
                    size="sm"
                    variant={link.primary ? "default" : "outline"}
                    className={`h-10 px-5 text-xs font-semibold rounded-xl gap-2 active:scale-95 transition-all ${
                      link.primary
                        ? "shadow-lg shadow-primary/25 hover:shadow-primary/35"
                        : "border-border/70 hover:bg-muted/70"
                    }`}
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <span>{link.label}</span>
                      {LinkIcon && <LinkIcon className="w-3.5 h-3.5" />}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-transparent z-10"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20 text-left"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2 block">
            Featured Systems
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Production Engineering
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real-world systems architected for high throughput, distributed networking, and mission-critical reliability.
          </p>
        </motion.div>

        {/* Project 3D Tilt Cards */}
        <div className="space-y-16 sm:space-y-24">
          {PROJECTS.map((project, i) => (
            <InteractiveProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
