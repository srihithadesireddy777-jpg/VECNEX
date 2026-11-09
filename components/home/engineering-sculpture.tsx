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
      const parent = canvas.parentElement;
      const w = rect.width || parent?.clientWidth || 360;
      const h = rect.height || parent?.clientHeight || 360;
      width = Math.max(w, 200);
      height = Math.max(h, 200);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(canvas);
      if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
      }
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    // Mouse interactive tilt state
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = x * 0.8;
      targetTiltX = -y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Icosahedron Geometry (Golden ratio phi)
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseScale = 1.0;

    const rawVertices = [
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

    // Floating particles
    const particles = Array.from({ length: 28 }, () => ({
      x: (Math.random() - 0.5) * 360,
      y: (Math.random() - 0.5) * 360,
      z: (Math.random() - 0.5) * 260,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.3,
      speed: Math.random() * 0.3 + 0.1,
    }));

    // 3D rotation math
    const rotatePoint = (
      p: number[],
      rx: number,
      ry: number,
      rz: number
    ): [number, number, number] => {
      let [x, y, z] = p;

      // Rotate Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Rotate Z
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;

      return [x3, y3, z2];
    };

    // Normalized light direction (key light from top-front-right, fill from bottom-left)
    const keyLight: [number, number, number] = [0.55, 0.65, 0.52];
    const keyLen = Math.hypot(...keyLight);
    const keyNorm: [number, number, number] = [
      keyLight[0] / keyLen,
      keyLight[1] / keyLen,
      keyLight[2] / keyLen,
    ];

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.009; // Continuous smooth, slow rotation

      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      const rotX = 0.25 + Math.sin(time * 0.4) * 0.1 + currentTiltX;
      const rotY = time * 0.45 + currentTiltY; // Perpetual continuous rotation
      const rotZ = Math.cos(time * 0.3) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(Math.min(width, height) * 0.36, 60);
      const fov = 420;

      // 1. Soft Warm Ambient Glow Field
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        Math.max(radius * 0.15, 10),
        centerX,
        centerY,
        Math.max(radius * 1.5, 100)
      );
      glowGrad.addColorStop(0, 'rgba(232, 210, 214, 0.5)');
      glowGrad.addColorStop(0.5, 'rgba(244, 232, 232, 0.3)');
      glowGrad.addColorStop(1, 'rgba(247, 245, 239, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Depth Particles
      particles.forEach((pt) => {
        pt.y -= pt.speed;
        if (pt.y < -180) pt.y = 180;

        const rotated = rotatePoint([pt.x, pt.y, pt.z], rotX * 0.4, rotY * 0.4, 0);
        const pz = rotated[2] + fov;
        if (pz <= 0) return;
        const scale = fov / pz;
        const px = centerX + rotated[0] * scale;
        const py = centerY + rotated[1] * scale;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(pt.size * scale * 0.8, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 38, 61, ${pt.alpha * 0.35})`;
        ctx.fill();
      });

      // 3. Concentric Metallic Gimbal Rings (Deep Burgundy & Platinum Champagne)
      const ringConfigs = [
        { r: radius * 1.25, rx: rotX + 0.3, ry: time * 0.25, stroke: 'rgba(110, 38, 61, 0.45)', width: 1.5, dash: [6, 4] },
        { r: radius * 1.48, rx: rotX - 0.25, ry: -time * 0.2, stroke: 'rgba(168, 78, 105, 0.35)', width: 1.2, dash: [3, 6] },
      ];

      ringConfigs.forEach((cfg) => {
        ctx.beginPath();
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const p = [Math.cos(theta) * cfg.r, 0, Math.sin(theta) * cfg.r];
          const [rx, ry, rz] = rotatePoint(p, cfg.rx, cfg.ry, 0);
          const pz = rz + fov;
          const sx = centerX + (rx * fov) / pz;
          const sy = centerY + (ry * fov) / pz;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = cfg.stroke;
        ctx.lineWidth = cfg.width;
        ctx.setLineDash(cfg.dash);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 4. Transform Vertices
      const transformedVertices = rawVertices.map((v) => {
        const scaled: [number, number, number] = [v[0] * radius, v[1] * radius, v[2] * radius];
        const [rx, ry, rz] = rotatePoint(scaled, rotX, rotY, rotZ);
        const pz = rz + fov;
        const sx = centerX + (rx * fov) / pz;
        const sy = centerY + (ry * fov) / pz;
        return { x: sx, y: sy, z: rz, orig: [rx, ry, rz] as [number, number, number] };
      });

      // 5. Compute Normals & Depth Sort Faces
      const sortedFaces = icosaFaces
        .map((faceIndices) => {
          const v0 = transformedVertices[faceIndices[0]];
          const v1 = transformedVertices[faceIndices[1]];
          const v2 = transformedVertices[faceIndices[2]];

          const avgZ = (v0.z + v1.z + v2.z) / 3;

          // Cross product (v1 - v0) x (v2 - v0)
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

          // Camera points along +Z axis towards origin
          const isFacingCamera = nz > -0.2;

          return {
            indices: faceIndices,
            avgZ,
            normal: [nx, ny, nz] as [number, number, number],
            isFacingCamera,
            v0,
            v1,
            v2,
          };
        })
        .filter((f) => f.isFacingCamera)
        .sort((a, b) => a.avgZ - b.avgZ);

      // 6. Render Facets with Rich Burgundy Luxury & Metallic Shading
      sortedFaces.forEach((face) => {
        const { v0, v1, v2, normal } = face;

        // Diffuse lighting from key light
        const dot = Math.max(
          0,
          normal[0] * keyNorm[0] + normal[1] * keyNorm[1] + normal[2] * keyNorm[2]
        );

        // Specular reflection (Blinn-Phong)
        const halfX = keyNorm[0];
        const halfY = keyNorm[1];
        const halfZ = keyNorm[2] + 1; // Camera is at +Z
        const hLen = Math.hypot(halfX, halfY, halfZ) || 1;
        const specDot = Math.max(
          0,
          normal[0] * (halfX / hLen) + normal[1] * (halfY / hLen) + normal[2] * (halfZ / hLen)
        );
        const spec = Math.pow(specDot, 18);

        // Palette blending:
        // Shadow/Ambient: Soft Burgundy (#C59DA6: 197, 157, 166)
        // Mid-tone: Champagne / Platinum (#E5E0D8: 229, 224, 216)
        // Highlight: Pure Polished Platinum / White (#FFFFFF)
        const baseR = 195 + dot * 50 + spec * 60;
        const baseG = 155 + dot * 70 + spec * 60;
        const baseB = 165 + dot * 65 + spec * 60;

        const rVal = Math.min(255, Math.floor(baseR));
        const gVal = Math.min(255, Math.floor(baseG));
        const bVal = Math.min(255, Math.floor(baseB));

        ctx.beginPath();
        ctx.moveTo(v0.x, v0.y);
        ctx.lineTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.closePath();

        // Facet fill
        ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
        ctx.fill();

        // Sharp Deep Burgundy Wireframe Facet Edges (#6E263D)
        ctx.strokeStyle = `rgba(110, 38, 61, ${0.45 + dot * 0.45})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      // 7. Apex Vertices: Precision Pins with Deep Burgundy & Specular Points
      transformedVertices.forEach((v) => {
        if (v.z < -radius * 0.3) return;
        const depthNorm = Math.min(1, Math.max(0.3, (v.z + radius) / (radius * 2)));

        ctx.beginPath();
        ctx.arc(v.x, v.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 38, 61, ${depthNorm * 0.95})`;
        ctx.fill();

        // Outer halo ring on closest vertices
        if (v.z > radius * 0.25) {
          ctx.beginPath();
          ctx.arc(v.x, v.y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(110, 38, 61, ${depthNorm * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
