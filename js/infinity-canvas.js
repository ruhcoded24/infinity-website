/**
 * INFINITY Canvas Engine
 * Cinematic 3D Lemniscate (Infinity Symbol) Particle Stream & Energy Ribbons
 * Inspired by reference imagery: Electric Purple, Cyan, Violet glowing particle streams
 */

export class InfinityCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 280;
    this.width = 0;
    this.height = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.scale = 1;
    this.time = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.tiltX = 0;
    this.tiltY = 0;
    this.isInteracting = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent || !parent.clientWidth || !parent.clientHeight) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.scale = Math.min(this.width * 0.38, this.height * 0.36, 260);
    if (this.reducedMotion) {
      this.renderStatic();
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      // parameter t along lemniscate from 0 to 2*PI
      const t = Math.random() * Math.PI * 2;
      const speed = 0.003 + Math.random() * 0.005;
      const radius = 1.0 + Math.random() * 2.5;
      const offset = (Math.random() - 0.5) * 28; // ribbon thickness dispersion
      const zOffset = (Math.random() - 0.5) * 40;
      // Color palette: Cyan (#06b6d4), Purple (#a855f7), Electric Pink (#ec4899), Blue (#3b82f6)
      const colors = [
        { r: 6, g: 182, b: 212 },   // Neon cyan
        { r: 168, g: 85, b: 247 },  // Electric violet
        { r: 236, g: 72, b: 153 },  // Magenta
        { r: 99, g: 102, b: 241 }   // Indigo
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const alpha = 0.3 + Math.random() * 0.7;

      this.particles.push({
        t,
        speed,
        baseRadius: radius,
        radius,
        offset,
        zOffset,
        color,
        alpha,
        trail: []
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      // When the canvas is hidden (display: none), rect.width/height are 0;
      // skipping prevents division by zero from poisoning mouseX/mouseY with Infinity/NaN.
      if (!rect.width || !rect.height) {
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        return;
      }
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = (x - rect.width / 2) / (rect.width / 2);
      const ny = (y - rect.height / 2) / (rect.height / 2);
      this.targetMouseX = Number.isFinite(nx) ? Math.max(-1.5, Math.min(1.5, nx)) : 0;
      this.targetMouseY = Number.isFinite(ny) ? Math.max(-1.5, Math.min(1.5, ny)) : 0;
    });

    this.canvas.addEventListener('mouseenter', () => {
      this.isInteracting = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.isInteracting = false;
      this.targetMouseX = 0;
      this.targetMouseY = 0;
    });
  }

  // Lemniscate of Gerono / Bernoulli 3D projected coordinates
  getPointOnInfinity(t, offset, zOffset, tiltX, tiltY) {
    // Standard Bernoulli lemniscate:
    // x = a * cos(t) / (1 + sin^2(t))
    // y = a * sin(t) * cos(t) / (1 + sin^2(t))
    const denom = 1 + Math.sin(t) * Math.sin(t);
    const baseX = (this.scale * Math.cos(t)) / denom;
    const baseY = (this.scale * Math.sin(t) * Math.cos(t)) / denom;

    // Normal vector perpendicular to tangent for ribbon width
    const dt = 0.01;
    const denom2 = 1 + Math.sin(t + dt) * Math.sin(t + dt);
    const nextX = (this.scale * Math.cos(t + dt)) / denom2;
    const nextY = (this.scale * Math.sin(t + dt) * Math.cos(t + dt)) / denom2;

    const dx = nextX - baseX;
    const dy = nextY - baseY;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    // 3D coordinate
    let x = baseX + nx * offset;
    let y = baseY + ny * offset;
    let z = Math.sin(t * 2) * 45 + zOffset; // undulating depth

    // Apply interactive 3D rotation based on mouse tilt
    const cosY = Math.cos(tiltX * 0.45);
    const sinY = Math.sin(tiltX * 0.45);
    const cosX = Math.cos(tiltY * 0.35);
    const sinX = Math.sin(tiltY * 0.35);

    // Rotate around Y axis
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    // Rotate around X axis
    const y1 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    // Perspective projection
    const fov = 400;
    const perspective = fov / (fov + z2);

    return {
      x: this.centerX + x1 * perspective,
      y: this.centerY + y1 * perspective,
      z: z2,
      scale: perspective
    };
  }

  animate() {
    if (this.reducedMotion) {
      this.renderStatic();
      return;
    }

    if (!Number.isFinite(this.mouseX)) this.mouseX = 0;
    if (!Number.isFinite(this.mouseY)) this.mouseY = 0;
    if (!Number.isFinite(this.targetMouseX)) this.targetMouseX = 0;
    if (!Number.isFinite(this.targetMouseY)) this.targetMouseY = 0;

    if (!this.width || !this.height) {
      this.resize();
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smooth tilt interpolation
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    this.time += 0.01;

    // Draw central ambient glow
    const radialGlow = this.ctx.createRadialGradient(
      this.centerX, this.centerY, 10,
      this.centerX, this.centerY, this.scale * 1.5
    );
    radialGlow.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
    radialGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
    radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = radialGlow;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Render underlying glowing ribbon backbone
    this.ctx.save();
    this.ctx.beginPath();
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const pt = this.getPointOnInfinity(t, 0, 0, this.mouseX, this.mouseY);
      if (i === 0) {
        this.ctx.moveTo(pt.x, pt.y);
      } else {
        this.ctx.lineTo(pt.x, pt.y);
      }
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
    this.ctx.lineWidth = 3;
    this.ctx.shadowColor = '#a855f7';
    this.ctx.shadowBlur = 15;
    this.ctx.stroke();

    // Second cyan core strand
    this.ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2 + Math.PI;
      const pt = this.getPointOnInfinity(t, 2, 5, this.mouseX, this.mouseY);
      if (i === 0) {
        this.ctx.moveTo(pt.x, pt.y);
      } else {
        this.ctx.lineTo(pt.x, pt.y);
      }
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
    this.ctx.lineWidth = 1.8;
    this.ctx.shadowColor = '#06b6d4';
    this.ctx.shadowBlur = 12;
    this.ctx.stroke();
    this.ctx.restore();

    // Sort particles by Z-depth for correct layered drawing
    const calculatedParticles = this.particles.map(p => {
      p.t = (p.t + p.speed) % (Math.PI * 2);
      const pos = this.getPointOnInfinity(p.t, p.offset, p.zOffset, this.mouseX, this.mouseY);
      return { particle: p, pos };
    });

    calculatedParticles.sort((a, b) => a.pos.z - b.pos.z);

    // Draw individual particles & trails
    for (const item of calculatedParticles) {
      const { particle: p, pos } = item;
      const r = Math.max(0.5, p.baseRadius * pos.scale);
      const alpha = Math.min(1, Math.max(0.1, p.alpha * pos.scale));

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
      this.ctx.shadowColor = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`;
      this.ctx.shadowBlur = 8 * pos.scale;
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  renderStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const pt = this.getPointOnInfinity(t, 0, 0, 0, 0);
      if (i === 0) this.ctx.moveTo(pt.x, pt.y);
      else this.ctx.lineTo(pt.x, pt.y);
    }
    this.ctx.strokeStyle = '#a855f7';
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
