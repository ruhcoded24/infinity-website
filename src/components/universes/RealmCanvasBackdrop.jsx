import React, { useEffect, useRef } from 'react';

export default function RealmCanvasBackdrop({ realmId, color }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // AI Realm: Neural Nodes & Synapses
    const neuralNodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5,
    }));

    // Cybersecurity Realm: Hex / Binary Streamers
    const hexChars = "01010101ABCDEF!#*<>/\\";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));

    // Cloud Realm: Floating Distributed Cluster Nodes
    const clusterNodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 10,
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    // Robotics Realm: Kinetic Radar Grid & Particles
    let radarAngle = 0;

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      if (realmId === 'ai') {
        // AI SYNAPTIC NETWORK
        ctx.fillStyle = 'rgba(7, 7, 17, 0.4)';
        ctx.fillRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < neuralNodes.length; i++) {
          for (let j = i + 1; j < neuralNodes.length; j++) {
            const dx = neuralNodes[i].x - neuralNodes[j].x;
            const dy = neuralNodes[i].y - neuralNodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.35;
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(neuralNodes[i].x, neuralNodes[i].y);
              ctx.lineTo(neuralNodes[j].x, neuralNodes[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        for (const node of neuralNodes) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          ctx.fillStyle = '#8B5CF6';
          ctx.shadowColor = '#8B5CF6';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (realmId === 'cybersecurity') {
        // CYBERSECURITY HEX RAIN
        ctx.fillStyle = 'rgba(7, 7, 17, 0.25)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const char = hexChars[Math.floor(Math.random() * hexChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillStyle = '#FF0055';
          ctx.shadowColor = '#FF0055';
          ctx.shadowBlur = 6;
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else if (realmId === 'webdev') {
        // CREATION REALM: PERSPECTIVE MATRIX GRID
        ctx.fillStyle = 'rgba(7, 7, 17, 0.4)';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
        ctx.lineWidth = 1;

        const horizon = height * 0.45;
        const gridSpacing = 40;

        // Vertical converging lines
        const vanishingX = width * 0.5;
        for (let x = -width; x < width * 2; x += gridSpacing * 1.5) {
          ctx.beginPath();
          ctx.moveTo(vanishingX, horizon);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal moving lines
        const offset = (frame * 0.8) % gridSpacing;
        for (let y = horizon; y < height; y += (y - horizon) * 0.2 + 8) {
          ctx.beginPath();
          ctx.moveTo(0, y + offset * ((y - horizon) / height));
          ctx.lineTo(width, y + offset * ((y - horizon) / height));
          ctx.stroke();
        }
      } else if (realmId === 'robotics') {
        // ROBOTICS: KINETIC RADAR SWEEP & GAUGES
        ctx.fillStyle = 'rgba(7, 7, 17, 0.35)';
        ctx.fillRect(0, 0, width, height);

        const cx = width * 0.5;
        const cy = height * 0.4;
        const maxR = Math.min(width, height) * 0.35;

        // Concentric rings
        ctx.strokeStyle = 'rgba(255, 107, 0, 0.15)';
        ctx.lineWidth = 1;
        for (let r = maxR * 0.25; r <= maxR; r += maxR * 0.25) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy);
        ctx.lineTo(cx + maxR, cy);
        ctx.moveTo(cx, cy - maxR);
        ctx.lineTo(cx, cy + maxR);
        ctx.stroke();

        // Sweeping beam
        radarAngle += 0.02;
        ctx.strokeStyle = 'rgba(255, 107, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(radarAngle) * maxR, cy + Math.sin(radarAngle) * maxR);
        ctx.stroke();
      } else {
        // CLOUD REALM: DISTRIBUTED TOPOLOGY MESH
        ctx.fillStyle = 'rgba(7, 7, 17, 0.35)';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < clusterNodes.length; i++) {
          const n = clusterNodes[i];
          n.pulse += 0.03;
          const currentSize = n.size + Math.sin(n.pulse) * 4;

          // Box node
          ctx.strokeStyle = `rgba(0, 176, 255, ${0.3 + Math.sin(n.pulse) * 0.2})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(n.x - currentSize / 2, n.y - currentSize / 2, currentSize, currentSize);

          // Connect to next
          if (i > 0) {
            const prev = clusterNodes[i - 1];
            ctx.strokeStyle = 'rgba(0, 176, 255, 0.15)';
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(prev.x, prev.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [realmId]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}
