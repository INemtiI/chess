import { useEffect, useRef } from 'react';

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
    this.y = Math.random() * canvas.height;
    this.baseSpeed = 0.3 + Math.random() * 0.5;
    this.glowing = Math.random() < 0.15; // 15% шанс быть "тлеющим угольком"
    this.glowPhase = Math.random() * Math.PI * 2;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height + 10;
    this.size = 1 + Math.random() * 2;
    this.speed = this.baseSpeed;
    this.opacity = 0.2 + Math.random() * 0.4;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.02 + Math.random() * 0.03;
  }

  update(mouseX, mouseY) {
    // Плавное движение вверх
    this.y -= this.speed;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 0.3;

    // Реакция на курсор
    if (mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 120;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        this.x += (dx / distance) * force * 2;
        this.y += (dy / distance) * force * 2;
      }
    }

    // Эффект тления для "угольков"
    if (this.glowing) {
      this.glowPhase += 0.05;
    }

    // Сброс когда частица уходит за верхний край
    if (this.y < -10) {
      this.reset();
    }

    // Сброс если частица ушла за границы по X
    if (this.x < -10 || this.x > this.canvas.width + 10) {
      this.reset();
    }
  }

  draw(ctx, isDark) {
    // Проверка на валидные значения
    if (!isFinite(this.x) || !isFinite(this.y) || !isFinite(this.size) || this.size <= 0) {
      return;
    }

    if (this.glowing) {
      // "Тлеющий уголёк"
      const glowIntensity = 0.5 + Math.sin(this.glowPhase) * 0.5;
      const glowSize = Math.max(0.1, this.size * 3 * glowIntensity);

      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
      gradient.addColorStop(0, `rgba(232, 73, 41, ${this.opacity * glowIntensity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(232, 73, 41, ${this.opacity * glowIntensity * 0.3})`);
      gradient.addColorStop(1, 'rgba(232, 73, 41, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Обычная пылинка
      const color = isDark ? '255, 255, 255' : '0, 0, 0';
      const particleSize = Math.max(0.1, this.size);
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, particleSize);
      gradient.addColorStop(0, `rgba(${color}, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isDark = document.documentElement.classList.contains('dark');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Создаём частицы (50 штук)
      if (particlesRef.current.length === 0) {
        for (let i = 0; i < 50; i++) {
          particlesRef.current.push(new Particle(canvas));
        }
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentIsDark = document.documentElement.classList.contains('dark');

      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx, currentIsDark);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}

export default ParticleBackground;
