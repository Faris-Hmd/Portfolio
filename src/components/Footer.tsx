"use client";

import React from "react";
import { Github, Mail, MessageSquare, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border/50 bg-card/40 backdrop-blur-md relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
          <p className="text-sm font-medium text-foreground/90">
            © {new Date().getFullYear()} Faris Hamad.
          </p>
          <p className="text-xs text-muted-foreground">
            All rights reserved. Designed for digital performance and resilience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl w-9 h-9 border-border/60 hover:text-primary transition-colors"
            asChild
            title="GitHub"
          >
            <a
              href="https://github.com/Faris-Hmd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl w-9 h-9 border-border/60 hover:text-emerald-500 transition-colors"
            asChild
            title="WhatsApp"
          >
            <a
              href="https://wa.me/249966626693"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl w-9 h-9 border-border/60 hover:text-cyan-500 transition-colors"
            asChild
            title="Email"
          >
            <a href="mailto:faris.hamad.sd@gmail.com">
              <Mail className="w-4 h-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="rounded-xl w-9 h-9 hover:bg-muted"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
