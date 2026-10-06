"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  Wifi,
  FileSpreadsheet,
  Code2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArchitecturePoint {
  title: string;
  desc: string;
  icon: React.ElementType;
}

interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
  icon?: React.ElementType;
}

interface Project {
  id: string;
  filterCategories: ("network" | "fullstack")[];
  category: string;
  categoryIcon: React.ElementType;
  categoryColor: string;
  title: string;
  tagline: string;
  description: string;
  architecturePoints: ArchitecturePoint[];
  tags: string[];
  image: string;
  links: ProjectLink[];
}

const PROJECTS: Project[] = [
  {
    id: "mikman",
    filterCategories: ["network", "fullstack"],
    category: "Cloud & Network Infrastructure",
    categoryIcon: Server,
    categoryColor: "text-cyan-400",
    title: "MikMan — Cloud Router Orchestration",
    tagline: "Centralized remote MikroTik automation over an encrypted WireGuard VPN mesh.",
    description:
      "A high-throughput cloud management platform for remote multi-site MikroTik fleets. Integrates a Node.js MVC gateway, real-time WebSocket telemetry stream, zero-touch idempotent RouterOS scripts, and dynamic voucher batch generation via Next.js and React Native clients.",
    architecturePoints: [
      {
        title: "BFF API Proxy Gateway",
        desc: "Aggregates RouterOS endpoints and handles token authentication to eliminate client latency.",
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
    filterCategories: ["fullstack"],
    category: "Full-Stack Web & Mobile",
    categoryIcon: ShoppingBag,
    categoryColor: "text-amber-400",
    title: "Liper Pizza — Commercial Platform",
    tagline: "Live customer storefront, realtime kitchen dispatch & driver logistics.",
    description:
      "A complete digital restaurant ecosystem built from the ground up and running actively in production. Powers customer ordering with real-time Firestore sync, an interactive menu customizer, an operational kitchen Kanban board, and a delivery driver mobile PWA.",
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
  {
    id: "omada-voucher",
    filterCategories: ["network", "fullstack"],
    category: "Network Tooling & Automation",
    categoryIcon: Wifi,
    categoryColor: "text-emerald-400",
    title: "Omada Voucher Studio — SDN Batch Engine",
    tagline: "High-density voucher designer & batch generation engine for TP-Link Omada SDN.",
    description:
      "A specialized web application engineered for network administrators to design, customize, and batch-print branded Wi-Fi access vouchers for TP-Link Omada controller fleets. Parses multi-column Excel spreadsheets, binds dynamic QR codes and speed tiers into visual templates, and renders print-ready high-density PDF sheets.",
    architecturePoints: [
      {
        title: "Client-Side XLSX Batch Parser",
        desc: "High-throughput in-memory parsing of thousands of voucher codes, quotas, and expiration timestamps.",
        icon: FileSpreadsheet,
      },
      {
        title: "Dynamic Canvas Templating",
        desc: "Customizable visual voucher layout editor with live preview, QR code generator, and localized typography.",
        icon: Sparkles,
      },
      {
        title: "Precision Print Matrix",
        desc: "High-density CSS print grid & PDF generator calibrated for A4 and Letter thermal/laser printers.",
        icon: Layers,
      },
    ],
    tags: [
      "Next.js",
      "React",
      "XLSX Engine",
      "HTML5 Canvas",
      "Omada SDN",
      "Tailwind CSS",
      "PDF Generation",
    ],
    image: "/images/voucher-designer.png",
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
    id: "asis-it",
    filterCategories: ["fullstack"],
    category: "Corporate Web Development",
    categoryIcon: Globe,
    categoryColor: "text-blue-400",
    title: "ASIS IT — Corporate Landing Page",
    tagline: "Modern responsive web presence for an enterprise IT solutions provider.",
    description:
      "A clean, responsive corporate landing page built for Advanced Solutions for Information Systems (ASIS). Features structured sections showcasing enterprise IT services, software offerings, a dynamic partner carousel, and optimized lead-capture touchpoints.",
    architecturePoints: [
      {
        title: "Clean Corporate Presentation",
        desc: "Structured layout highlighting IT service verticals, ERP systems, and hospital management solutions.",
        icon: Sparkles,
      },
      {
        title: "Touch-Optimized Carousel",
        desc: "Smooth Embla Carousel integration rendering enterprise technology partners seamlessly across devices.",
        icon: Layers,
      },
      {
        title: "Optimized Next.js Stack",
        desc: "Fast load times, responsive typography, and mobile-friendly PWA capabilities using Next.js and Tailwind CSS.",
        icon: Shield,
      },
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Embla Carousel",
      "PWA",
    ],
    image: "/images/asis-it.png",
    links: [
      {
        label: "View Repository",
        href: "https://github.com/Faris-Hmd/asis-it-landing-page",
        primary: true,
        icon: Github,
      },
    ],
  },
];

type FilterType = "all" | "network" | "fullstack";

interface FilterOption {
  id: FilterType;
  label: string;
  icon: React.ElementType;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "network", label: "Network & Cloud Infra", icon: Server },
  { id: "fullstack", label: "Full-Stack & Web", icon: Code2 },
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

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
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
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
          <div className="lg:col-span-6 relative overflow-hidden min-h-[280px] sm:min-h-[360px] lg:min-h-[460px] bg-slate-950 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border/50">
            {/* Ambient backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-cyan-500/5 z-10 pointer-events-none" />

            {/* Project Image */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Bottom vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Project Content & Architectural Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between p-7 sm:p-9 lg:p-10 relative">
            <div className="space-y-5">
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
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block">
                  Core Highlights
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
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    return p.filterCategories.includes(activeFilter);
  });

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
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-left"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2 block">
              Production Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              Production Engineering
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real-world systems spanning cloud router orchestration, commercial full-stack applications, and network tooling.
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-card/70 border border-border/70 backdrop-blur-xl self-start md:self-auto"
          >
            {FILTER_OPTIONS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              const count =
                tab.id === "all"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.filterCategories.includes(tab.id as "network" | "fullstack")).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/25"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground font-mono"
                          : "bg-muted text-muted-foreground font-mono"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Project 3D Tilt Cards */}
        <motion.div layout className="space-y-16 sm:space-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <InteractiveProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
