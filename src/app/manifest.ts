import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Faris Hamad | Full Stack Developer",
    short_name: "Faris Hamad",
    description:
      "Portfolio of Faris Hamad, a Full Stack Developer based in Sudan specializing in Next.js, TypeScript, and Firebase.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
