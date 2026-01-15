"use client";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50 bg-background md:bg-background/50 md:backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <p>
          {t.footer.text.replace("{year}", new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
}
