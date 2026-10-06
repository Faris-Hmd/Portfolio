"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Layers,
  Server,
  Network,
  Cpu,
  Code2,
  Terminal,
  Radio,
  Flame,
  Shield,
  Atom,
  Wind,
  Workflow,
  Sparkles,
  GitBranch,
  Database,
} from "lucide-react";

const PILLARS = [
  {
    title: "Frontend Engineering",
    subtitle: "Fast, reactive user interfaces with strict TypeScript safety.",
    color: "from-blue-500/15 via-cyan-500/8 to-transparent",
    border: "hover:border-cyan-500/50",
    icon: Layers,
    skills: [
      { name: "Next.js 16", note: "App Router, SSR & Turbopack", icon: Layers },
      { name: "React 19", note: "Concurrent hooks & custom state", icon: Atom },
      { name: "TypeScript", note: "Strict end-to-end contracts", icon: Code2 },
      { name: "Tailwind CSS", note: "Fluid design systems & dark modes", icon: Wind },
      { name: "Framer Motion", note: "Physics-based gestures & layout transitions", icon: Sparkles },
    ],
  },
  {
    title: "Backend & Real-Time Streaming",
    subtitle: "High-throughput REST APIs and sub-second WebSockets.",
    color: "from-emerald-500/15 via-teal-500/8 to-transparent",
    border: "hover:border-emerald-500/50",
    icon: Server,
    skills: [
      { name: "Node.js & Express", note: "MVC architecture, middleware, secure auth", icon: Server },
      { name: "WebSockets (/ws)", note: "Bi-directional telemetry streaming", icon: Radio },
      { name: "Firebase Firestore", note: "Realtime reactive database sync", icon: Flame },
      { name: "Supabase", note: "PostgreSQL, Auth & Edge Functions", icon: Database },
      { name: "Firebase Auth", note: "Role-based session tokens & security rules", icon: Shield },
    ],
  },
  {
    title: "Distributed Networks & Cloud",
    subtitle: "Remote router orchestration, VPN tunnels & VPS infrastructure.",
    color: "from-indigo-500/15 via-purple-500/8 to-transparent",
    border: "hover:border-indigo-500/50",
    icon: Network,
    skills: [
      { name: "MikroTik RouterOS", note: "REST API scripting & idempotency", icon: Network },
      { name: "WireGuard VPN", note: "Encrypted mesh tunnels connecting CHRs to VPS", icon: Shield },
      { name: "Linux Ubuntu VPS", note: "Daemon management, SSH & firewall rules", icon: Terminal },
      { name: "Nginx Reverse Proxy", note: "TLS termination & dual-stack routing", icon: Cpu },
      { name: "PM2 Process Cluster", note: "Zero-downtime reloads & log aggregations", icon: Server },
    ],
  },
  {
    title: "Engineering Disciplines",
    subtitle: "Systematic quality, performance auditing & automation.",
    color: "from-amber-500/15 via-orange-500/8 to-transparent",
    border: "hover:border-amber-500/50",
    icon: GitBranch,
    skills: [
      { name: "Git & Collaborative Flow", note: "Trunk-based development & code review", icon: GitBranch },
      { name: "REST API Architecture", note: "Normalized payloads & BFF proxy pattern", icon: Workflow },
      { name: "Core Web Vitals", note: "Rendering performance & bundle auditing", icon: Cpu },
      { name: "Progressive Web Apps", note: "Service workers, offline queues & mobile PWAs", icon: Sparkles },
    ],
  },
];

function BentoSkillCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const PillarIcon = pillar.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-3xl border border-border/70 bg-card/85 dark:bg-card/65 backdrop-blur-xl p-7 sm:p-9 overflow-hidden shadow-xl group ${pillar.border} hover:shadow-2xl hover:shadow-primary/5`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {/* Dynamic Cursor Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl -z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.1), transparent 70%)`,
          }}
        />
      )}

      {/* Atmospheric corner gradient */}
      <div
        className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${pillar.color} rounded-full blur-3xl opacity-50 group-hover:opacity-90 transition-opacity pointer-events-none`}
      />

      {/* Space Station Module Tag */}
      <span className="absolute top-4 right-5 font-mono text-[10px] text-primary/40 select-none tracking-widest hidden sm:block">
        [ MODULE // 0{index + 1} ]
      </span>

      {/* Pillar header */}
      <div className="flex items-center gap-4 mb-7 relative z-10">
        <div className="p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-sm group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
          <PillarIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {pillar.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {pillar.subtitle}
          </p>
        </div>
      </div>

      {/* Skill rows */}
      <div className="space-y-2.5 relative z-10">
        {pillar.skills.map((skill) => {
          const SkillIcon = skill.icon;
          return (
            <div
              key={skill.name}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-border/40 bg-background/40 hover:bg-background/80 hover:border-primary/30 transition-colors group/item"
            >
              <div className="flex items-center gap-3">
                <SkillIcon className="w-4 h-4 text-primary/80 group-hover/item:text-primary transition-colors flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">
                  {skill.name}
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground text-right max-w-[180px]">
                {skill.note}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="stack"
      className="py-32 relative overflow-hidden bg-transparent z-10"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2 block">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Technical Stack &amp; Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Technologies and architectural patterns I deploy to build resilient cloud software and distributed systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, idx) => (
            <BentoSkillCard key={pillar.title} pillar={pillar} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
