"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const emailAddress = "faris.hamad.sd@gmail.com";
  const phoneNumber = "249966626693";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `*New Portfolio Message*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-36 relative overflow-hidden bg-transparent z-10"
    >
      {/* Ambient gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[200px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-[180px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "8s", animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Heading */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="max-w-3xl mb-20"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-4 block">
            Contact
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
            Let&apos;s Build
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Something Exceptional
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Whether it&apos;s a full-stack product, cloud router orchestration, or a high-performance web app — I&apos;m ready to collaborate.
          </motion.p>
        </motion.div>

        {/* Main Layout */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid lg:grid-cols-12 gap-6 items-start"
        >
          {/* ─── Left Column ─── */}
          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-4">

            {/* WhatsApp Quick Action */}
            <a
              href={`https://wa.me/${phoneNumber}?text=Hi%20Faris,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl border border-emerald-500/30 bg-card/60 dark:bg-card/40 backdrop-blur-xl hover:bg-emerald-500/8 hover:border-emerald-500/60 transition-all duration-300 group shadow-lg shadow-emerald-500/5"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 group-hover:shadow-emerald-500/50 transition-all duration-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-emerald-400 transition-colors">
                    Message on WhatsApp
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    +249 966 626 693
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-emerald-500/70 hidden sm:block">Fastest response</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Email with copy */}
            <div className="p-5 rounded-3xl border border-border/70 bg-card/60 dark:bg-card/40 backdrop-blur-xl flex items-center justify-between gap-4 shadow-md hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-[18px] h-[18px]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider block">Email</span>
                  <p className="text-sm font-medium text-foreground truncate mt-0.5">{emailAddress}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="h-9 px-3.5 text-xs font-semibold rounded-xl flex-shrink-0 gap-1.5 hover:border-primary/50"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Phone */}
            <div className="p-5 rounded-3xl border border-border/70 bg-card/60 dark:bg-card/40 backdrop-blur-xl flex items-center gap-3.5 shadow-md hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500/20 transition-colors">
                <Phone className="w-[18px] h-[18px]" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider block">Phone</span>
                <p className="text-sm font-medium text-foreground font-mono mt-0.5">+249 966 626 693</p>
              </div>
            </div>

            {/* Location */}
            <div className="p-5 rounded-3xl border border-border/70 bg-card/60 dark:bg-card/40 backdrop-blur-xl flex items-center gap-3.5 shadow-md hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500/20 transition-colors">
                <MapPin className="w-[18px] h-[18px]" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider block">Location</span>
                <p className="text-sm font-medium text-foreground mt-0.5">Sudan · Remote Worldwide</p>
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column: Form ─── */}
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <div className="relative rounded-3xl border border-border/60 bg-card/70 dark:bg-card/50 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-black/10 overflow-hidden">
              {/* Card shimmer gradient */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/8 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Form Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Send a Message</h3>
                    <p className="text-xs text-muted-foreground mt-1">Routed instantly to WhatsApp — typically replied within the hour.</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
                    <Phone className="w-3 h-3" />
                    <span>via WhatsApp</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Your Name</label>
                      <Input
                        required
                        placeholder="e.g. Alex Smith"
                        className="rounded-xl h-11 bg-muted/30 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                      <Input
                        required
                        type="email"
                        placeholder="alex@example.com"
                        className="rounded-xl h-11 bg-muted/30 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Subject</label>
                    <Input
                      required
                      placeholder="e.g. Full-Stack Project · Cloud Router Orchestration"
                      className="rounded-xl h-11 bg-muted/30 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Message</label>
                    <Textarea
                      required
                      placeholder="Tell me about your project, goals, timeline, or any questions..."
                      className="min-h-[150px] resize-none rounded-xl bg-muted/30 border-border/60 focus:border-primary/60 focus:ring-primary/20 text-sm transition-all"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      className="w-full text-sm font-bold shadow-xl shadow-primary/20 hover:shadow-primary/35 rounded-xl gap-2.5 active:scale-[0.99] transition-all duration-200 group relative overflow-hidden"
                      style={{ height: "52px" }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Send via WhatsApp</span>
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground mt-3 font-mono">
                      Your message opens directly in WhatsApp — no app required on desktop.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
