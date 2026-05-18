"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/cn";

export default function HeroThree({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.35, 2);
    const solid = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.35,
        metalness: 0.05,
        transparent: true,
        opacity: 0.12,
      })
    );
    group.add(solid);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 })
    );
    group.add(wire);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(2.2, 1.8, 3.2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.35);
    rim.position.set(-2.4, -1.2, -2.2);
    scene.add(rim);

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    let raf = 0;
    let alive = true;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = ny * 0.6;
      target.y = nx * 0.8;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer?.setSize(w, h, false);
    };

    resize();

    const tick = (t: number) => {
      if (!alive) return;

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      group.rotation.x = current.x + (reduceMotion ? 0 : t * 0.00025);
      group.rotation.y = current.y + (reduceMotion ? 0 : t * 0.00035);

      const wobble = reduceMotion ? 0 : Math.sin(t * 0.0009) * 0.08;
      group.position.y = wobble;

      renderer!.render(scene, camera);
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });

    raf = window.requestAnimationFrame(tick);

    return () => {
      alive = false;
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(raf);

      geometry.dispose();
      (solid.material as THREE.Material).dispose();
      (wire.material as THREE.Material).dispose();
      (wire.geometry as THREE.BufferGeometry).dispose();
      renderer?.dispose();
      renderer = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}

