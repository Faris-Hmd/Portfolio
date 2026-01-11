"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { Moon, Sun, Github } from "lucide-react";

import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-border/50 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105 shadow-sm">
            <Image
              src="/images/logo.jpg"
              alt="Faris Hamad Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            Faris<span className="text-foreground">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#skills"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Skills
          </Link>
          <Link
            href="#projects"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>

          <div className="flex items-center gap-4 border-l pl-4 border-border/50">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-6"
              asChild
            >
              <Link href="#contact">Hire Me</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-border/50 mb-4 shadow-sm">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <SheetTitle className="text-2xl font-bold">
                  Faris Hamad
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  Full Stack Developer
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href="#skills"
                  className="flex items-center gap-2 text-lg font-medium p-2 rounded-md hover:bg-muted transition-colors transition-all active:scale-95"
                >
                  Skills
                </Link>
                <Link
                  href="#projects"
                  className="flex items-center gap-2 text-lg font-medium p-2 rounded-md hover:bg-muted transition-colors transition-all active:scale-95"
                >
                  Projects
                </Link>
                <Link
                  href="#contact"
                  className="flex items-center gap-2 text-lg font-medium p-2 rounded-md hover:bg-muted transition-colors transition-all active:scale-95"
                >
                  Contact
                </Link>
              </div>

              <div className="mt-auto items-center flex flex-col gap-6 pb-8">
                <Button className="w-full" size="lg" asChild>
                  <Link href="#contact">Hire Me</Link>
                </Button>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    asChild
                  >
                    <a
                      href="https://github.com/Faris-Hmd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
