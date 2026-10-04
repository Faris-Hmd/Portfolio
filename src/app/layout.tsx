import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faris-hamad.vercel.app"),
  title: "Faris Hamad | Full-Stack & Cloud Systems Developer",
  description:
    "Portfolio of Faris Hamad — Full-Stack Developer specializing in Next.js, Node.js, real-time systems, and MikroTik cloud router automation (MikMan) & Liper Pizza.",
  keywords: [
    "Faris Hamad",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "MikMan",
    "MikroTik",
    "WireGuard",
    "Liper Pizza",
    "Node.js",
    "WebSockets",
  ],
  authors: [{ name: "Faris Hamad" }],
  creator: "Faris Hamad",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Faris Hamad | Full-Stack & Cloud Systems Developer",
    description:
      "Crafting production web applications, real-time backend architectures, and cloud network automation.",
    url: "https://github.com/Faris-Hmd",
    siteName: "Faris Hamad Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
