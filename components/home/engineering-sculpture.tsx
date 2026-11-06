'use client';

import { useEffect, useRef } from 'react';

export default function EngineeringSculpture({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Mouse interactive tilt
    let targetRotX = 0.2;
    let targetRotY = 0.3;
    let rotX = 0.2;
    let rotY = 0.3;
    let rotZ = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 1.4;
      targetRotX = -y * 1.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Polyhedron Vertices (Golden ratio)
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseScale = 1.0;

    const icosaVertices = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [(x / len) * baseScale, (y / len) * baseScale, (z / len) * baseScale];
    });

    const icosaFaces = [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ];

    // Studio floating metallic micro-particles
    const particles = Array.from({ length: 36 }, () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      z: (Math.random() - 0.5) * 300,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.4 + 0.2,
      speed: Math.random() * 0.25 + 0.08,
    }));

    const rotatePoint = (
      p: number[],
      rx: number,
      ry: number,
      rz: number
    ): [number, number, number] => {
      let [x, y, z] = p;

      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;

      return [x3, y3, z2];
    };

    // Studio Light Sources: High-key keylight + Soft warm fill light
    const lightKey = [0.577, -0.65, -0.49];
    const lightFill = [-0.6, 0.5, 0.62];

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.007;

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;
      rotZ = time * 0.12;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.34;
      const fov = 450;

      // 1. Warm Studio Ambient Glow Field (Blush Burgundy / Ivory Soft Glow)
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.1,
        centerX,
        centerY,
        radius * 1.7
      );
      glowGrad.addColorStop(0, 'rgba(232, 210, 214, 0.45)');
      glowGrad.addColorStop(0.4, 'rgba(244, 232, 232, 0.25)');
      glowGrad.addColorStop(0.75, 'rgba(232, 229, 220, 0.1)');
      glowGrad.addColorStop(1, 'rgba(247, 245, 239, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Depth Particles
      particles.forEach((pt) => {
        pt.y -= pt.speed;
        if (pt.y < -200) pt.y = 200;

        const rotated = rotatePoint([pt.x, pt.y, pt.z], rotX * 0.5, rotY * 0.5 + time * 0.1, 0);
        const pz = rotated[2] + 400;
        if (pz <= 0) return;
        const scale = fov / pz;
        const px = centerX + rotated[0] * scale;
        const py = centerY + rotated[1] * scale;

        ctx.beginPath();
        ctx.arc(px, py, pt.size * scale * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 38, 61, ${pt.alpha * 0.3})`;
        ctx.fill();
      });

      // 3. Concentric Studio Gimbal Rings (Deep Burgundy Accents)
      const ringRadii = [radius * 1.25, radius * 1.45];
      ringRadii.forEach((r, idx) => {
        ctx.beginPath();
        const steps = 64;
        const ringRotX = rotX + (idx === 0 ? 0.35 : -0.28);
        const ringRotY = rotY + (idx === 0 ? time * 0.2 : -time * 0.15);

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const p = [Math.cos(theta) * r, 0, Math.sin(theta) * r];
          const [rx, ry, rz] = rotatePoint(p, ringRotX, ringRotY, 0);
          const pz = rz + fov;
          const sx = centerX + (rx * fov) / pz;
          const sy = centerY + (ry * fov) / pz;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = idx === 0 ? 'rgba(110, 38, 61, 0.25)' : 'rgba(232, 210, 214, 0.5)';
        ctx.lineWidth = idx === 0 ? 1.2 : 0.8;
        ctx.setLineDash(idx === 0 ? [5, 5] : [2, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 4. Transform 3D Vertices
      const transformedVertices = icosaVertices.map((v) => {
        const scaled: [number, number, number] = [v[0] * radius, v[1] * radius, v[2] * radius];
        const [rx, ry, rz] = rotatePoint(scaled, rotX, rotY + time * 0.25, rotZ);
        const pz = rz + fov;
        const sx = centerX + (rx * fov) / pz;
        const sy = centerY + (ry * fov) / pz;
        return { x: sx, y: sy, z: rz, orig: [rx, ry, rz] as [number, number, number] };
      });

      // 5. Sort Faces by Depth
      const sortedFaces = icosaFaces
        .map((faceIndices) => {
          const v0 = transformedVertices[faceIndices[0]];
          const v1 = transformedVertices[faceIndices[1]];
          const v2 = transformedVertices[faceIndices[2]];

          const avgZ = (v0.z + v1.z + v2.z) / 3;

          const ax = v1.orig[0] - v0.orig[0];
          const ay = v1.orig[1] - v0.orig[1];
          const az = v1.orig[2] - v0.orig[2];
          const bx = v2.orig[0] - v0.orig[0];
          const by = v2.orig[1] - v0.orig[1];
          const bz = v2.orig[2] - v0.orig[2];

          let nx = ay * bz - az * by;
          let ny = az * bx - ax * bz;
          let nz = ax * by - ay * bx;
          const nLen = Math.hypot(nx, ny, nz) || 1;
          nx /= nLen;
          ny /= nLen;
          nz /= nLen;

          const isFacingCamera = nz > -0.15;

          return {
            indices: faceIndices,
            avgZ,
            normal: [nx, ny, nz],
            isFacingCamera,
            v0,
            v1,
            v2,
          };
        })
        .filter((f) => f.isFacingCamera)
        .sort((a, b) => a.avgZ - b.avgZ);

      // 6. Render Facets with Bright Studio Titanium & Blush Reflection
      sortedFaces.forEach((face) => {
        const { v0, v1, v2, normal } = face;

        const dotKey = Math.max(
          0,
          normal[0] * lightKey[0] + normal[1] * lightKey[1] + normal[2] * lightKey[2]
        );
        const dotFill = Math.max(
          0,
          normal[0] * lightFill[0] + normal[1] * lightFill[1] + normal[2] * lightFill[2]
        );

        // Blinn-phong specular gleam highlight
        const halfX = lightKey[0];
        const halfY = lightKey[1];
        const halfZ = lightKey[2] - 1;
        const hLen = Math.hypot(halfX, halfY, halfZ) || 1;
        const specDot = Math.max(
          0,
          normal[0] * (halfX / hLen) + normal[1] * (halfY / hLen) + normal[2] * (halfZ / hLen)
        );
        const spec = Math.pow(specDot, 28);

        // Bright Studio Color Blending: Warm White, Champagne, and Soft Blush Burgundy
        const rVal = Math.min(255, Math.floor(240 + dotKey * 15 + spec * 25));
        const gVal = Math.min(255, Math.floor(226 + dotKey * 24 + dotFill * 5));
        const bVal = Math.min(255, Math.floor(230 + dotKey * 22 + dotFill * 4));

        ctx.beginPath();
        ctx.moveTo(v0.x, v0.y);
        ctx.lineTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.closePath();

        ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
        ctx.fill();

        // Edge Lines: Deep Burgundy Accent
        ctx.strokeStyle = `rgba(110, 38, 61, ${0.25 + dotKey * 0.45 + spec * 0.3})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      });

      // 7. Core Precision Apex Markers with Deep Burgundy Pins
      transformedVertices.forEach((v) => {
        if (v.z < -radius * 0.4) return;
        const alpha = Math.min(1, Math.max(0.3, (v.z + radius) / (radius * 2)));

        ctx.beginPath();
        ctx.arc(v.x, v.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 38, 61, ${alpha * 0.9})`;
        ctx.fill();

        if (v.z > radius * 0.4) {
          ctx.beginPath();
          ctx.arc(v.x, v.y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(110, 38, 61, ${alpha * 0.3})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
