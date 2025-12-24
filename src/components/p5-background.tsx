"use client";

import { useEffect, useRef, useState } from "react";
import type p5Type from "p5";

interface Particle {
  pos: p5Type.Vector;
  vel: p5Type.Vector;
  acc: p5Type.Vector;
  size: number;
  alpha: number;
  char: string;
}

export function P5Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5Type | null>(null);
  const [density, setDensity] = useState(10);
  const [velocity, setVelocity] = useState(10);
  const densityRef = useRef(10);
  const velocityRef = useRef(10);

  // Keep refs in sync with state and dispatch events to p5
  useEffect(() => {
    densityRef.current = density;
    window.dispatchEvent(new CustomEvent("densityChange", { detail: { density } }));
  }, [density]);

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  useEffect(() => {
    if (!containerRef.current) return;

    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: p5Type) => {
        let particles: Particle[] = [];
        let isDark = false;

        const codeChars = [
          // Keywords
          "const", "let", "var", "fn", "=>", "async", "await", "return", "import", "export",
          "class", "interface", "type", "enum", "void", "null", "true", "false",
          // CLI tools
          "git", "npm", "yarn", "pnpm", "docker", "kubectl", "helm", "terraform",
          "sudo", "ssh", "curl", "grep", "awk", "sed", "vim", "nano",
          // Syntax
          "{ }", "[ ]", "< />", "( )", "< >", "/*", "*/", "//", "##",
          "0x", "&&", "||", "!=", "===", "!==", ">=", "<=", "++", "--",
          // API/Web
          "API", "GET", "POST", "PUT", "DELETE", "JSON", "XML", "REST", "GraphQL",
          "HTTP", "HTTPS", "TCP", "UDP", "DNS", "SSL", "TLS",
          // Operators & symbols
          ":::", ">>>", "<<<", "|>", "->", "<-", "~>", "@", "#!", "$_",
          // Languages/tech
          "JS", "TS", "PY", "GO", "RS", "C++", "SQL", "K8s", "AWS", "GCP",
          // Single chars
          "λ", "Σ", "Δ", "Ω", "π", "∞", "≈", "≠", "∈", "∀", "∃",
          // Numbers
          "0", "1", "42", "404", "500", "200", "127", "255", "1337",
        ];

        const createParticleAt = (x: number, y: number): Particle => {
          const angle = p.random(p.TAU);
          const velocityMultiplier = velocityRef.current / 50; // 50 is default, so multiplier is 1 at default
          const speed = p.random(0.5, 2) * velocityMultiplier;
          return {
            pos: p.createVector(x, y),
            vel: p.createVector(p.cos(angle) * speed, p.sin(angle) * speed),
            acc: p.createVector(0, 0),
            size: p.random(10, 16),
            alpha: p.random(30, 80),
            char: codeChars[Math.floor(p.random(codeChars.length))],
          };
        };

        const createParticle = (): Particle => {
          return createParticleAt(p.random(p.width), p.random(p.height));
        };

        const spawnNetworkAt = (x: number, y: number, count: number = 15) => {
          for (let i = 0; i < count; i++) {
            particles.push(createParticleAt(x, y));
          }
        };

        const resetParticles = () => {
          particles = [];
          for (let i = 0; i < densityRef.current; i++) {
            particles.push(createParticle());
          }
        };

        p.setup = () => {
          p.pixelDensity(1);
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
          canvas.style("position", "fixed");
          canvas.style("top", "0");
          canvas.style("left", "0");
          canvas.style("z-index", "-1");
          canvas.style("pointer-events", "auto");

          isDark = document.documentElement.classList.contains("dark");
          resetParticles();
        };

        // Find clusters using simple distance-based grouping
        const findClusters = (): number[][] => {
          const clusterRadius = 80; // Distance to consider nodes in same cluster
          const visited = new Set<number>();
          const clusters: number[][] = [];

          for (let i = 0; i < particles.length; i++) {
            if (visited.has(i)) continue;
            
            const cluster: number[] = [i];
            visited.add(i);
            const queue = [i];

            while (queue.length > 0) {
              const current = queue.shift()!;
              for (let j = 0; j < particles.length; j++) {
                if (visited.has(j)) continue;
                const d = particles[current].pos.dist(particles[j].pos);
                if (d < clusterRadius) {
                  cluster.push(j);
                  visited.add(j);
                  queue.push(j);
                }
              }
            }
            clusters.push(cluster);
          }
          return clusters;
        };

        // Disintegrate a cluster by giving particles explosive velocity
        const disintegrateCluster = (clusterIndices: number[]) => {
          // Find cluster center
          let centerX = 0, centerY = 0;
          for (const idx of clusterIndices) {
            centerX += particles[idx].pos.x;
            centerY += particles[idx].pos.y;
          }
          centerX /= clusterIndices.length;
          centerY /= clusterIndices.length;

          // Apply explosive force away from center
          for (const idx of clusterIndices) {
            const particle = particles[idx];
            const dx = particle.pos.x - centerX;
            const dy = particle.pos.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 3 + p.random(2); // Random explosive force
            particle.vel.x = (dx / dist) * force;
            particle.vel.y = (dy / dist) * force;
          }
        };

        p.draw = () => {
          isDark = document.documentElement.classList.contains("dark");
          p.clear();

          const mouse = p.createVector(p.mouseX, p.mouseY);

          // Check for clusters with 10+ nodes and disintegrate them
          const clusters = findClusters();
          for (const cluster of clusters) {
            if (cluster.length >= 10) {
              disintegrateCluster(cluster);
            }
          }

          // Check average velocity - if too low, reset particles
          let totalVelocity = 0;
          for (const particle of particles) {
            totalVelocity += particle.vel.mag();
          }
          const avgVelocity = particles.length > 0 ? totalVelocity / particles.length : 0;
          if (avgVelocity < 0.05 && particles.length > 0) {
            resetParticles();
          }

          // Apply repulsion between particles to prevent overlap
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[j].pos.x - particles[i].pos.x;
              const dy = particles[j].pos.y - particles[i].pos.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const minDist = (particles[i].size + particles[j].size) * 0.8; // Minimum distance based on text size

              if (dist < minDist && dist > 0) {
                const force = (minDist - dist) / dist * 0.3;
                const fx = dx * force;
                const fy = dy * force;
                particles[i].vel.x -= fx;
                particles[i].vel.y -= fy;
                particles[j].vel.x += fx;
                particles[j].vel.y += fy;
              }
            }
          }

          // Get velocity multiplier from ref
          const velocityMultiplier = velocityRef.current / 50;
          const maxSpeed = 1.5 * velocityMultiplier;
          const minSpeed = 0.1 * velocityMultiplier; // Minimum speed to prevent stopping

          for (const particle of particles) {
            const dir = mouse.copy().sub(particle.pos);
            const dist = dir.mag();

            if (dist < 200 && dist > 10) {
              dir.normalize();
              dir.mult(0.02 * velocityMultiplier);
              particle.acc = dir;
            } else {
              particle.acc.mult(0);
            }

            particle.vel.add(particle.acc);
            particle.vel.limit(maxSpeed);
            
            // Ensure minimum velocity - particles should never stop
            const currentSpeed = particle.vel.mag();
            if (currentSpeed < minSpeed) {
              // Give it a random nudge if too slow
              const angle = p.random(p.TAU);
              particle.vel.x = p.cos(angle) * minSpeed;
              particle.vel.y = p.sin(angle) * minSpeed;
            }
            
            particle.pos.add(particle.vel);
            
            // Apply light damping
            particle.vel.mult(0.995);

            if (particle.pos.x < -50) particle.pos.x = p.width + 50;
            if (particle.pos.x > p.width + 50) particle.pos.x = -50;
            if (particle.pos.y < -50) particle.pos.y = p.height + 50;
            if (particle.pos.y > p.height + 50) particle.pos.y = -50;

            p.push();
            p.translate(particle.pos.x, particle.pos.y);

            const baseColor = isDark ? 255 : 0;
            p.fill(baseColor, particle.alpha);
            p.noStroke();
            p.textSize(particle.size);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont("monospace");
            p.text(particle.char, 0, 0);

            p.pop();
          }

          p.stroke(isDark ? 255 : 0, 15);
          p.strokeWeight(0.5);
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const d = particles[i].pos.dist(particles[j].pos);
              if (d < 120) {
                const alpha = p.map(d, 0, 120, 25, 0);
                p.stroke(isDark ? 255 : 0, alpha);
                p.line(
                  particles[i].pos.x,
                  particles[i].pos.y,
                  particles[j].pos.x,
                  particles[j].pos.y
                );
              }
            }
          }
        };

        // Listen for custom spawn event from React click handler
        const handleSpawnEvent = (e: Event) => {
          const customEvent = e as CustomEvent<{ x: number; y: number }>;
          // Limit to 3 nodes per click
          spawnNetworkAt(customEvent.detail.x, customEvent.detail.y, 3);
        };
        window.addEventListener("spawnNetwork", handleSpawnEvent);

        // Listen for density change event to reset particles
        const handleDensityChange = (e: Event) => {
          const customEvent = e as CustomEvent<{ density: number }>;
          const newDensity = customEvent.detail.density;
          // Adjust particle count to match new density
          if (newDensity > particles.length) {
            // Add more particles
            const toAdd = newDensity - particles.length;
            for (let i = 0; i < toAdd; i++) {
              particles.push(createParticle());
            }
          } else if (newDensity < particles.length) {
            // Remove excess particles
            particles.splice(newDensity);
          }
        };
        window.addEventListener("densityChange", handleDensityChange);

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      p5InstanceRef.current = new p5(sketch, containerRef.current!);
    });

    return () => {
      p5InstanceRef.current?.remove();
      window.removeEventListener("spawnNetwork", () => {});
    };
  }, []);

  // Global click handler - spawns nodes unless clicking on interactive elements
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't spawn if clicking on interactive elements
      const isInteractive = target.closest("a, button, input, select, textarea, [role='button'], nav, .controls-panel");
      if (isInteractive) return;
      
      window.dispatchEvent(new CustomEvent("spawnNetwork", { detail: { x: e.clientX, y: e.clientY } }));
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-10" />
      {/* Controls panel */}
      <div className="controls-panel fixed bottom-4 right-4 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-lg pointer-events-auto">
        <div className="flex flex-col gap-4">
          {/* Density control */}
          <div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Network Density
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="200"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-white"
              />
              <input
                type="number"
                min="10"
                max="200"
                value={density}
                onChange={(e) => setDensity(Math.min(200, Math.max(10, Number(e.target.value))))}
                className="w-14 px-2 py-1 text-xs text-center border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black text-gray-900 dark:text-white"
              />
            </div>
          </div>
          {/* Velocity control */}
          <div>
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
              Velocity
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="100"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-white"
              />
              <input
                type="number"
                min="10"
                max="100"
                value={velocity}
                onChange={(e) => setVelocity(Math.min(100, Math.max(10, Number(e.target.value))))}
                className="w-14 px-2 py-1 text-xs text-center border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-500">
            Click anywhere to spawn 3 nodes
          </div>
        </div>
      </div>
    </>
  );
}
