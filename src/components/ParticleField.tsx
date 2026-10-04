"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

/**
 * Lightweight interactive 3D particle field for sections,
 * providing visual continuity with the Hero's 3D canvas.
 */
export function ParticleField({ count = 140 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
    camera.position.z = 45;

    const isDark = resolvedTheme !== "light";

    // Ambient floating particles
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(isDark ? 0x00d4ff : 0x0284c7); // cyan
    const color2 = new THREE.Color(isDark ? 0x6366f1 : 0x4f46e5); // indigo

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const mixed = Math.random() > 0.5 ? color1 : color2;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: isDark ? 0.32 : 0.25,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.45,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const nW = container.clientWidth;
      const nH = container.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", handleResize);

    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerping
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      points.rotation.y = t * 0.02 + targetX * 0.25;
      points.rotation.x = Math.sin(t * 0.015) * 0.08 - targetY * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme, count]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none -z-10 opacity-70"
      aria-hidden="true"
    />
  );
}
