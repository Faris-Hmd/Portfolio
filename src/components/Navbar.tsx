"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Github, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between max-w-7xl">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-xl border border-primary/30 group-hover:border-primary/80 transition-all duration-300 shadow-md shadow-primary/10">
            <Image
              src="/images/logo.png"
              alt="Faris Hamad"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Faris Hamad
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground -mt-0.5">
              Full-Stack &amp; Systems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#stack"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Tech Stack
          </Link>
          <Link
            href="#architecture"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Architecture
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>

          <div className="flex items-center gap-3 border-l pl-5 border-border/60">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted/80"
                title="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              className="rounded-xl h-9 px-3 gap-1.5 border-border/70 hover:border-primary/50 text-xs font-semibold"
              asChild
            >
              <a
                href="https://github.com/Faris-Hmd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </Button>

            <Button
              size="sm"
              className="rounded-xl h-9 px-4 text-xs font-semibold shadow-md shadow-primary/20"
              asChild
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav Bar Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl w-9 h-9"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl w-9 h-9"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Inline Mobile Dropdown Menu (No Side Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl px-4 py-5"
          >
            <div className="flex flex-col gap-2">
              <Link
                href="#projects"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between text-sm font-medium p-3 rounded-xl hover:bg-muted/70 transition-colors"
              >
                <span>Projects</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="#stack"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between text-sm font-medium p-3 rounded-xl hover:bg-muted/70 transition-colors"
              >
                <span>Tech Stack</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="#architecture"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between text-sm font-medium p-3 rounded-xl hover:bg-muted/70 transition-colors"
              >
                <span>Architecture</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between text-sm font-medium p-3 rounded-xl hover:bg-muted/70 transition-colors"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </Link>

              <div className="pt-3 mt-1 border-t border-border/40 flex items-center gap-3">
                <Button
                  className="flex-1 rounded-xl h-10 font-semibold text-xs"
                  size="sm"
                  onClick={() => setMobileOpen(false)}
                  asChild
                >
                  <Link href="#contact">Get in Touch</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl h-10 gap-1.5 text-xs"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://github.com/Faris-Hmd"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
