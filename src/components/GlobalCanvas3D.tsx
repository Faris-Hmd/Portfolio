"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

/**
 * Global 3D Space System Canvas
 * Features a complex celestial astrolabe:
 * - Nested geometric polyhedra (Inner Octahedron Core + Icosahedron Globe + Dodecahedron Lattice Shield)
 * - 3 inclined planetary torus rings with orbital markers
 * - Orbiting satellites / moons with energy trails
 * - Drifting deep-space crystalline polyhedra (tetrahedrons & octahedrons)
 * - Constellation connection network beams
 * - Dynamic scroll choreography across sections
 */
export function GlobalCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // COLOR PALETTE (Cosmic Cyber Space)
    const isDark = resolvedTheme !== "light";
    const primaryColor = isDark ? 0x00d4ff : 0x0284c7; // Electric Cyan
    const secondaryColor = isDark ? 0x818cf8 : 0x4f46e5; // Deep Space Indigo
    const accentColor = isDark ? 0xf43f5e : 0xe11d48; // Stellar Rose / Ruby
    const goldColor = isDark ? 0xfbbf24 : 0xd97706; // Solar Amber

    // =========================================================================
    // 1. MAIN CELESTIAL GLOBE GROUP (Nested Astrolabe & Celestial Polyhedra)
    // =========================================================================
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Layer A: Inner Radiant Octahedron Core (Pulsing Heart)
    const innerCoreGeo = new THREE.OctahedronGeometry(2.6, 0);
    const innerCoreMat = new THREE.MeshPhongMaterial({
      color: isDark ? 0x031838 : 0xbae6fd,
      emissive: isDark ? 0x00d4ff : 0x38bdf8,
      emissiveIntensity: isDark ? 0.6 : 0.4,
      shininess: 100,
      flatShading: true,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    globeGroup.add(innerCoreMesh);

    // Layer B: Middle Translucent Icosahedron Body
    const midCoreGeo = new THREE.IcosahedronGeometry(4.7, 1);
    const midCoreMat = new THREE.MeshPhongMaterial({
      color: isDark ? 0x06152b : 0xe0f2fe,
      emissive: isDark ? 0x0d284a : 0xbae6fd,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: isDark ? 0.72 : 0.55,
    });
    const midCoreMesh = new THREE.Mesh(midCoreGeo, midCoreMat);
    globeGroup.add(midCoreMesh);

    // Layer C: Outer Icosahedron Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(5.0, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.55,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Layer D: Outer Geodesic Dodecahedron Energy Lattice Shield
    const dodecaGeo = new THREE.DodecahedronGeometry(5.5, 0);
    const dodecaMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.3,
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    globeGroup.add(dodecaMesh);

    // Layer E: Equator Navigation Grid Ring
    const equatorGeo = new THREE.TorusGeometry(5.1, 0.035, 16, 80);
    const equatorMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.65 : 0.5,
    });
    const equatorMesh = new THREE.Mesh(equatorGeo, equatorMat);
    equatorMesh.rotation.x = Math.PI / 2;
    globeGroup.add(equatorMesh);

    // =========================================================================
    // 2. ORBITING PLANETARY TORUS RINGS (Gimbal System)
    // =========================================================================
    // Ring 1 (Inclined Cyan Ring)
    const ringGeo1 = new THREE.TorusGeometry(8.6, 0.055, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.6 : 0.5,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    globeGroup.add(ringMesh1);

    // Ring 2 (Inclined Indigo Ring)
    const ringGeo2 = new THREE.TorusGeometry(10.8, 0.045, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: isDark ? 0.55 : 0.45,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 4;
    globeGroup.add(ringMesh2);

    // Ring 3 (Outer Ruby / Gold Astrolabe Ring)
    const ringGeo3 = new THREE.TorusGeometry(12.8, 0.04, 16, 140);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const ringMesh3 = new THREE.Mesh(ringGeo3, ringMat3);
    ringMesh3.rotation.x = Math.PI / 6;
    ringMesh3.rotation.z = Math.PI / 4;
    globeGroup.add(ringMesh3);

    // =========================================================================
    // 3. ORBITING SATELLITES / CELESTIAL MOONS
    // =========================================================================
    // Moon 1 (Orbiting on Ring 1 - Cyan Sphere with halo)
    const moonGeo1 = new THREE.SphereGeometry(0.35, 16, 16);
    const moonMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const moonMesh1 = new THREE.Mesh(moonGeo1, moonMat1);
    globeGroup.add(moonMesh1);

    // Moon 2 (Orbiting on Ring 2 - Diamond Octahedron Satellite)
    const moonGeo2 = new THREE.OctahedronGeometry(0.45, 0);
    const moonMat2 = new THREE.MeshPhongMaterial({
      color: primaryColor,
      emissive: primaryColor,
      emissiveIntensity: 0.8,
    });
    const moonMesh2 = new THREE.Mesh(moonGeo2, moonMat2);
    globeGroup.add(moonMesh2);

    // Moon 3 (Orbiting on Ring 3 - Ruby Probe)
    const moonGeo3 = new THREE.TetrahedronGeometry(0.4, 0);
    const moonMat3 = new THREE.MeshPhongMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.9,
    });
    const moonMesh3 = new THREE.Mesh(moonGeo3, moonMat3);
    globeGroup.add(moonMesh3);

    // =========================================================================
    // 4. DRIFTING SPACE CRYSTALS & SATELLITES (Cosmic Debris Floating in View)
    // =========================================================================
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    const crystals: {
      mesh: THREE.Mesh;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      initY: number;
    }[] = [];

    const crystalGeometries = [
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.TetrahedronGeometry(0.7, 0),
      new THREE.DodecahedronGeometry(0.75, 0),
      new THREE.IcosahedronGeometry(0.65, 0),
    ];

    const crystalMaterials = [
      new THREE.MeshPhongMaterial({
        color: isDark ? 0x0a2244 : 0xbae6fd,
        emissive: primaryColor,
        emissiveIntensity: isDark ? 0.4 : 0.2,
        wireframe: true,
      }),
      new THREE.MeshPhongMaterial({
        color: isDark ? 0x1e153b : 0xe0e7ff,
        emissive: secondaryColor,
        emissiveIntensity: isDark ? 0.35 : 0.2,
        wireframe: true,
      }),
      new THREE.MeshPhongMaterial({
        color: isDark ? 0x2d1223 : 0xfce7f3,
        emissive: accentColor,
        emissiveIntensity: isDark ? 0.35 : 0.2,
        wireframe: true,
      }),
    ];

    // Spawn 8 geometric satellites drifting at varied coordinates
    const crystalConfigs = [
      { x: -18, y: 12, z: -8, geo: 0, mat: 0 },
      { x: 19, y: 10, z: -10, geo: 1, mat: 1 },
      { x: -16, y: -12, z: -5, geo: 2, mat: 2 },
      { x: 17, y: -14, z: -6, geo: 0, mat: 0 },
      { x: -22, y: 0, z: -12, geo: 3, mat: 1 },
      { x: 21, y: 2, z: -14, geo: 1, mat: 2 },
      { x: -8, y: 18, z: -10, geo: 2, mat: 0 },
      { x: 10, y: -20, z: -8, geo: 0, mat: 1 },
    ];

    crystalConfigs.forEach((cfg) => {
      const mesh = new THREE.Mesh(
        crystalGeometries[cfg.geo],
        crystalMaterials[cfg.mat]
      );
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      crystalGroup.add(mesh);
      crystals.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.015,
        },
        floatSpeed: 0.5 + Math.random() * 0.8,
        initY: cfg.y,
      });
    });

    // =========================================================================
    // 5. FULL-SITE FLOATING STARFIELD & NEBULA PARTICLES
    // =========================================================================
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const particleCount = isDark ? 420 : 250;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(isDark ? 0x00d4ff : 0x0284c7);
    const cIndigo = new THREE.Color(isDark ? 0x818cf8 : 0x6366f1);
    const cRuby = new THREE.Color(isDark ? 0xf43f5e : 0xe11d48);
    const cGold = new THREE.Color(isDark ? 0xfbbf24 : 0xd97706);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 95;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 75;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      scales[i] = Math.random() * 2.2 + 0.6;

      const rand = Math.random();
      const col =
        rand > 0.65 ? cCyan : rand > 0.4 ? cIndigo : rand > 0.15 ? cRuby : cGold;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isDark ? 0.35 : 0.28,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particleGroup.add(particles);

    // =========================================================================
    // 6. LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.0 : 1.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColor, isDark ? 5 : 3, 50);
    pointLight1.position.set(14, 14, 14);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accentColor, isDark ? 4 : 2, 50);
    pointLight2.position.set(-14, -14, 12);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(secondaryColor, isDark ? 3 : 1.5, 40);
    pointLight3.position.set(0, 16, -10);
    scene.add(pointLight3);

    // MOUSE & SCROLL STATE
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handleScroll = () => {
      const scrollMax = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScrollProgress = Math.min(Math.max(window.scrollY / scrollMax, 0), 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      // Smooth scroll progress lerp
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

      const isMobile = width < 768;
      const baseScale = isMobile ? 0.62 : 1.0;

      // SCROLL-CHOREOGRAPHED POSITIONS
      let targetPosX = 0;
      let targetPosY = 0;
      let targetPosZ = 0;
      let targetScale = baseScale;
      const scrollRotY = scrollProgress * Math.PI * 4;
      const scrollRotX = Math.sin(scrollProgress * Math.PI * 2) * 0.35;

      if (scrollProgress < 0.2) {
        // Hero
        const t = scrollProgress / 0.2;
        targetPosX = THREE.MathUtils.lerp(0, isMobile ? 0 : 5.8, t);
        targetPosY = THREE.MathUtils.lerp(0, -0.5, t);
        targetPosZ = THREE.MathUtils.lerp(0, -2, t);
        targetScale = baseScale * THREE.MathUtils.lerp(1.0, 0.9, t);
      } else if (scrollProgress < 0.48) {
        // Projects
        const t = (scrollProgress - 0.2) / 0.28;
        targetPosX = isMobile ? 0 : THREE.MathUtils.lerp(5.8, 6.4, t);
        targetPosY = THREE.MathUtils.lerp(-0.5, 0.5, t);
        targetPosZ = THREE.MathUtils.lerp(-2, -3, t);
        targetScale = baseScale * 0.92;
      } else if (scrollProgress < 0.75) {
        // Tech Stack
        const t = (scrollProgress - 0.48) / 0.27;
        targetPosX = isMobile ? 0 : THREE.MathUtils.lerp(6.4, -6.2, t);
        targetPosY = THREE.MathUtils.lerp(0.5, -0.2, t);
        targetPosZ = THREE.MathUtils.lerp(-3, -2, t);
        targetScale = baseScale * 0.95;
      } else if (scrollProgress < 0.9) {
        // Architecture Journey
        const t = (scrollProgress - 0.75) / 0.15;
        targetPosX = isMobile ? 0 : THREE.MathUtils.lerp(-6.2, 4.8, t);
        targetPosY = THREE.MathUtils.lerp(-0.2, 0.8, t);
        targetPosZ = THREE.MathUtils.lerp(-2, -3.5, t);
        targetScale = baseScale * 0.88;
      } else {
        // Contact
        const t = (scrollProgress - 0.9) / 0.1;
        targetPosX = isMobile ? 0 : THREE.MathUtils.lerp(4.8, 0, t);
        targetPosY = THREE.MathUtils.lerp(0.8, -1.5, t);
        targetPosZ = THREE.MathUtils.lerp(-3.5, 0.5, t);
        targetScale = baseScale * THREE.MathUtils.lerp(0.88, 1.05, t);
      }

      // Smooth Globe Group Translation
      globeGroup.position.x += (targetPosX - globeGroup.position.x) * 0.08;
      globeGroup.position.y += (targetPosY - globeGroup.position.y) * 0.08;
      globeGroup.position.z += (targetPosZ - globeGroup.position.z) * 0.08;

      // Group Master Rotation
      globeGroup.rotation.y =
        elapsedTime * 0.12 + scrollRotY + targetMouseX * 0.35;
      globeGroup.rotation.x =
        Math.sin(elapsedTime * 0.08) * 0.12 + scrollRotX - targetMouseY * 0.3;

      // Polyhedra Harmonic Counter-Rotations
      innerCoreMesh.rotation.y = -elapsedTime * 0.25;
      innerCoreMesh.rotation.z = Math.sin(elapsedTime * 0.4) * 0.2;
      const corePulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      innerCoreMesh.scale.set(corePulse, corePulse, corePulse);

      midCoreMesh.rotation.y = -elapsedTime * 0.07;
      midCoreMesh.rotation.x = elapsedTime * 0.04;

      wireMesh.rotation.y = elapsedTime * 0.1;
      wireMesh.rotation.z = Math.sin(elapsedTime * 0.15) * 0.1;

      dodecaMesh.rotation.y = -elapsedTime * 0.05;
      dodecaMesh.rotation.x = Math.cos(elapsedTime * 0.12) * 0.1;

      // Planetary Rings Rotations
      ringMesh1.rotation.z = elapsedTime * 0.18 + scrollProgress * 2;
      ringMesh2.rotation.z = -elapsedTime * 0.22 - scrollProgress * 2;
      ringMesh3.rotation.y = elapsedTime * 0.14 + scrollProgress * 1.5;

      // Animate Orbiting Satellites / Moons
      const orbit1Speed = elapsedTime * 0.65;
      moonMesh1.position.set(
        Math.cos(orbit1Speed) * 8.6,
        Math.sin(orbit1Speed) * 8.6 * Math.sin(Math.PI / 3),
        Math.sin(orbit1Speed) * 8.6 * Math.cos(Math.PI / 3)
      );

      const orbit2Speed = -elapsedTime * 0.5;
      moonMesh2.position.set(
        Math.cos(orbit2Speed) * 10.8 * Math.cos(-Math.PI / 4),
        Math.sin(orbit2Speed) * 10.8,
        Math.cos(orbit2Speed) * 10.8 * Math.sin(-Math.PI / 4)
      );
      moonMesh2.rotation.y += 0.04;
      moonMesh2.rotation.x += 0.03;

      const orbit3Speed = elapsedTime * 0.35;
      moonMesh3.position.set(
        Math.sin(orbit3Speed) * 12.8 * Math.cos(Math.PI / 6),
        Math.cos(orbit3Speed) * 12.8 * Math.sin(Math.PI / 4),
        Math.cos(orbit3Speed) * 12.8
      );
      moonMesh3.rotation.z += 0.03;

      // Animate Drifting Deep-Space Satellites / Crystals
      crystals.forEach((item, idx) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;
        item.mesh.position.y =
          item.initY + Math.sin(elapsedTime * item.floatSpeed + idx) * 0.8;
      });
      crystalGroup.position.x = -targetMouseX * 1.5;
      crystalGroup.position.y = targetMouseY * 1.2;

      // Gentle Globe Breathing
      const breathe = 1 + Math.sin(elapsedTime * 1.4) * 0.02;
      const finalScale = targetScale * breathe;
      globeGroup.scale.set(finalScale, finalScale, finalScale);

      // Starfield Rotation & Flight Parallax
      particles.rotation.y = -elapsedTime * 0.025 + targetMouseX * 0.15;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05 - targetMouseY * 0.1;
      particleGroup.position.y = (scrollProgress - 0.5) * 20;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      midCoreGeo.dispose();
      midCoreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      dodecaGeo.dispose();
      dodecaMat.dispose();
      equatorGeo.dispose();
      equatorMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      moonGeo1.dispose();
      moonMat1.dispose();
      moonGeo2.dispose();
      moonMat2.dispose();
      moonGeo3.dispose();
      moonMat3.dispose();
      crystalGeometries.forEach((g) => g.dispose());
      crystalMaterials.forEach((m) => m.dispose());
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
