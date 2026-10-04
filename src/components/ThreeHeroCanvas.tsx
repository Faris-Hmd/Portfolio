"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // COLORS ACCORDING TO THEME
    const isDark = resolvedTheme !== "light";
    const primaryColor = isDark ? 0x00d4ff : 0x0284c7;
    const secondaryColor = isDark ? 0x6366f1 : 0x4f46e5;
    const accentColor = isDark ? 0xec4899 : 0xd946ef;

    // ROOT INTERACTIVE GROUP
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 1. CENTRAL GEOMETRIC POLYHEDRON / GLOBE (Inner solid core + outer glowing wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(4.8, 1);
    const coreMat = new THREE.MeshPhongMaterial({
      color: isDark ? 0x081326 : 0xe0f2fe,
      emissive: isDark ? 0x0f2744 : 0xbae6fd,
      shininess: 80,
      flatShading: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sceneGroup.add(coreMesh);

    // Outer Wireframe Cage — softer opacity to keep text in foreground razor-sharp
    const wireGeo = new THREE.IcosahedronGeometry(5.0, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.28 : 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sceneGroup.add(wireMesh);

    // 2. ORBITING TORUS RINGS
    const ringGeo1 = new THREE.TorusGeometry(8.5, 0.05, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    sceneGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(10.2, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 4;
    sceneGroup.add(ringMesh2);

    // 3. FLOATING PARTICLE CONSTELLATION
    const particleCount = isDark ? 280 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 9 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      scales[i] = Math.random() * 2 + 0.5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: primaryColor,
      size: isDark ? 0.22 : 0.18,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    sceneGroup.add(particles);

    // 4. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColor, isDark ? 4 : 2, 40);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accentColor, isDark ? 3 : 1.5, 40);
    pointLight2.position.set(-10, -10, 8);
    scene.add(pointLight2);

    // MOUSE INTERACTION & LERP
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

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Group rotation
      sceneGroup.rotation.y = elapsedTime * 0.15 + targetX * 0.4;
      sceneGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.15 - targetY * 0.4;

      // Inner and Outer elements counter-rotations
      coreMesh.rotation.y = -elapsedTime * 0.08;
      coreMesh.rotation.x = elapsedTime * 0.05;

      wireMesh.rotation.y = elapsedTime * 0.12;
      wireMesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.1;

      ringMesh1.rotation.z = elapsedTime * 0.2;
      ringMesh2.rotation.z = -elapsedTime * 0.25;

      particles.rotation.y = -elapsedTime * 0.04;

      // Gentle floating breathing animation
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80 dark:opacity-75 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
