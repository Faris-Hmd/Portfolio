"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yOffset = useTransform(scrollYProgress, [0, 1], [30, -30]);

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

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-transparent z-10"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-2 block">
            Direct Connection
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Let&apos;s Build Together
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Interested in collaborating, need cloud router orchestration, or looking to build a high-performance web app? Drop me a line directly.
          </p>
        </div>

        {/* Contact Layout */}
        <motion.div
          style={{ y: yOffset }}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Quick Action Button */}
            <a
              href={`https://wa.me/${phoneNumber}?text=Hi%20Faris,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 group shadow-lg shadow-emerald-500/5"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-emerald-500 transition-colors">
                    Chat Directly on WhatsApp
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    +249 966626693
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Email Card with One-Click Copy */}
            <div className="p-6 rounded-3xl border border-border/70 bg-card/85 dark:bg-card/65 backdrop-blur-xl flex items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wider block">
                    Email
                  </span>
                  <p className="text-sm font-medium text-foreground truncate mt-0.5">
                    {emailAddress}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="h-9 px-3.5 text-xs font-semibold rounded-xl flex-shrink-0 gap-1.5"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Location & Availability */}
            <div className="p-6 rounded-3xl border border-border/70 bg-card/85 dark:bg-card/65 backdrop-blur-xl flex items-center gap-3.5 shadow-md">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wider block">
                  Location &amp; Availability
                </span>
                <p className="text-sm font-medium text-foreground mt-0.5">
                  Remote Worldwide / Sudan (Available full-time)
                </p>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="p-6 rounded-3xl border border-border/70 bg-card/85 dark:bg-card/65 backdrop-blur-xl flex items-center gap-3.5 shadow-md">
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wider block">
                  Phone
                </span>
                <p className="text-sm font-medium text-foreground font-mono mt-0.5">
                  +249 966626693
                </p>
              </div>
            </div>
          </div>

          {/* Send Message Form */}
          <div className="lg:col-span-7">
            <Card className="rounded-3xl border border-border/70 bg-card/85 dark:bg-card/70 backdrop-blur-xl p-7 sm:p-9 shadow-2xl shadow-black/5">
              <CardHeader className="p-0 pb-6 text-left">
                <CardTitle className="text-2xl font-bold">
                  Send a Message
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  Fill out your inquiry to start a direct message thread.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-muted-foreground">
                        Your Name
                      </label>
                      <Input
                        required
                        placeholder="e.g. Alex Smith"
                        className="rounded-xl h-11 bg-muted/30 border-border/60 focus:border-primary"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-muted-foreground">
                        Email Address
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="alex@example.com"
                        className="rounded-xl h-11 bg-muted/30 border-border/60 focus:border-primary"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Subject
                    </label>
                    <Input
                      required
                      placeholder="e.g. Project Collaboration / Next.js Development"
                      className="rounded-xl h-11 bg-muted/30 border-border/60 focus:border-primary"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Message
                    </label>
                    <Textarea
                      required
                      placeholder="Tell me about your project, goals, or timeline..."
                      className="min-h-[140px] resize-none rounded-xl bg-muted/30 border-border/60 focus:border-primary text-sm"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-sm font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 rounded-xl gap-2 active:scale-[0.99] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via WhatsApp</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
