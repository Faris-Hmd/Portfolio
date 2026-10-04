"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function GlobeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth || 520;
    const H = container.clientHeight || 520;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 1000);
    camera.position.z = 3.2;

    const isDark = resolvedTheme !== "light";
    const PRIMARY = isDark ? 0x38bdf8 : 0x0284c7;
    const GRID = isDark ? 0x1e40af : 0x93c5fd;
    const GLOW = isDark ? 0x0ea5e9 : 0x38bdf8;

    // --- Globe base (translucent sphere) ---
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: isDark ? 0x0a1628 : 0xdbeafe,
      emissive: isDark ? 0x0c2a4e : 0xbfdbfe,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
      shininess: 60,
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globe);

    // --- Latitude / Longitude wire grid ---
    const gridMat = new THREE.LineBasicMaterial({
      color: GRID,
      transparent: true,
      opacity: isDark ? 0.22 : 0.3,
    });

    const SEGMENTS = 64;
    const LAT_LINES = 10;
    const LON_LINES = 18;

    for (let i = 1; i < LAT_LINES; i++) {
      const phi = (Math.PI / LAT_LINES) * i;
      const r = Math.sin(phi);
      const y = Math.cos(phi);
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= SEGMENTS; j++) {
        const theta = (2 * Math.PI * j) / SEGMENTS;
        pts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    for (let i = 0; i < LON_LINES; i++) {
      const theta = (2 * Math.PI * i) / LON_LINES;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= SEGMENTS; j++) {
        const phi = (Math.PI * j) / SEGMENTS;
        pts.push(new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta),
        ));
      }
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    // --- Glowing equator ring ---
    const eqGeo = new THREE.TorusGeometry(1.01, 0.008, 16, 120);
    const eqMat = new THREE.MeshBasicMaterial({ color: PRIMARY, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Mesh(eqGeo, eqMat));

    // --- Outer halo ring ---
    const haloGeo = new THREE.TorusGeometry(1.18, 0.004, 16, 120);
    const haloMat = new THREE.MeshBasicMaterial({ color: GLOW, transparent: true, opacity: 0.35 });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 5;
    scene.add(haloMesh);

    // --- City dots (random dots scattered on the sphere surface) ---
    const dotMat = new THREE.MeshBasicMaterial({ color: PRIMARY });
    const DOT_POSITIONS: [number, number][] = [
      [51.5, -0.1],   // London
      [40.7, -74],    // New York
      [35.7, 139.7],  // Tokyo
      [48.9, 2.3],    // Paris
      [1.3, 103.8],   // Singapore
      [-33.9, 18.4],  // Cape Town
      [15.6, 32.5],   // Khartoum (Sudan!)
      [25.2, 55.3],   // Dubai
      [-23.5, -46.6], // São Paulo
      [37.6, -122.4], // San Francisco
      [55.7, 37.6],   // Moscow
      [30.0, 31.2],   // Cairo
    ];

    const toRad = (d: number) => (d * Math.PI) / 180;

    DOT_POSITIONS.forEach(([lat, lon]) => {
      const phi = Math.PI / 2 - toRad(lat);
      const theta = toRad(lon);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), dotMat.clone());
      dot.position.set(x, y, z);
      scene.add(dot);
    });

    // --- Arcs connecting some cities ---
    const arcMat = new THREE.LineBasicMaterial({ color: PRIMARY, transparent: true, opacity: 0.5 });
    const ARC_PAIRS: [[number, number], [number, number]][] = [
      [[51.5, -0.1], [40.7, -74]],
      [[35.7, 139.7], [1.3, 103.8]],
      [[15.6, 32.5], [25.2, 55.3]],
      [[48.9, 2.3], [30.0, 31.2]],
      [[37.6, -122.4], [35.7, 139.7]],
    ];

    const latLonToVec = (lat: number, lon: number) => {
      const phi = Math.PI / 2 - toRad(lat);
      const theta = toRad(lon);
      return new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
    };

    ARC_PAIRS.forEach(([a, b]) => {
      const va = latLonToVec(a[0], a[1]);
      const vb = latLonToVec(b[0], b[1]);
      const mid = va.clone().add(vb).multiplyScalar(0.5).normalize().multiplyScalar(1.35);
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      const pts = curve.getPoints(40);
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat));
    });

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.4));
    const p1 = new THREE.PointLight(PRIMARY, isDark ? 3 : 1.5, 8);
    p1.position.set(3, 2, 2);
    scene.add(p1);
    const p2 = new THREE.PointLight(GLOW, isDark ? 2 : 1, 8);
    p2.position.set(-2, -1, 2);
    scene.add(p2);

    // --- Mouse drag / auto-rotate ---
    let autoRotY = 0;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let rotX = 0.25, rotY = 0;
    let velX = 0, velY = 0.002;

    const onMouseDown = (e: MouseEvent) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      velY = (e.clientX - lastX) * 0.005;
      velX = (e.clientY - lastY) * 0.003;
      lastX = e.clientX; lastY = e.clientY;
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    // Touch support
    const onTouchStart = (e: TouchEvent) => { isDragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; };
    const onTouchEnd = () => { isDragging = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      velY = (e.touches[0].clientX - lastX) * 0.005;
      velX = (e.touches[0].clientY - lastY) * 0.003;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    };
    renderer.domElement.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove);

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

      if (!isDragging) {
        velY += (0.0018 - velY) * 0.02;
        velX += (0 - velX) * 0.05;
      }

      rotY += velY;
      rotX += velX;
      rotX = Math.max(-0.6, Math.min(0.6, rotX));

      globe.rotation.y = rotY;
      globe.rotation.x = rotX;

      // Grid lines are children of scene, not globe — attach them to a group instead
      scene.children.forEach((c) => {
        if (c instanceof THREE.Line || c instanceof THREE.Mesh) {
          c.rotation.y = rotY;
          c.rotation.x = rotX;
        }
      });

      // Halo independent slow orbit
      haloMesh.rotation.z = t * 0.18;
      haloMesh.rotation.y = rotY * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
}
