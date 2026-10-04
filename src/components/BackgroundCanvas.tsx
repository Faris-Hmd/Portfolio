"use client";

import dynamic from "next/dynamic";

const GlobalCanvas3D = dynamic(
  () => import("./GlobalCanvas3D").then((m) => m.GlobalCanvas3D),
  { ssr: false, loading: () => null }
);

export function BackgroundCanvas() {
  return <GlobalCanvas3D />;
}
