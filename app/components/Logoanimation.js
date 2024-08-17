"use client";

import { useEffect, useRef, useState } from 'react';

export default function LogoAnimation({ onComplete }) {
  const [hidden, setHidden] = useState(false);
  const splashRef = useRef(null);
  const canvasRef = useRef(null); // Define the canvasRef here

  useEffect(() => {
    const animateLogo = () => {
      if (splashRef.current) {
        splashRef.current.style.transition = 'opacity 3s ease-out, transform 1s ease-out';
        splashRef.current.style.opacity = '0';
        splashRef.current.style.transform = 'scale(1.2)';

        const timer = setTimeout(() => {
          setHidden(true);
          onComplete(); // Notify that logo animation is complete
        }, 3000); // Duration of the splash screen animation

        return () => clearTimeout(timer);
      }
    };

    animateLogo();
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const fireParticles = [];
    const numParticles = 200;
    const splashParticles = [];
    const numSplashParticles = 100;

    // Generate random fire particles
    for (let i = 0; i < numParticles; i++) {
      fireParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random(),
      });
    }

    // Generate random splash particles
    for (let i = 0; i < numSplashParticles; i++) {
      splashParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 4 + 1,
        direction: Math.random() * Math.PI * 2, // Random direction
        opacity: Math.random(),
      });
    }

    const draw = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fire particles
      fireParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
        gradient.addColorStop(0, `rgba(255, 69, 0, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 140, 0, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas.height;
        }
      });

      // Draw splash particles
      splashParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${particle.opacity})`;
        ctx.fill();

        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={splashRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to bottom, #FF4500, #FF8C00)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        opacity: hidden ? '0' : '1',
        transform: hidden ? 'scale(1.2)' : 'scale(1)',
        transition: 'opacity 3s ease-out, transform 1s ease-out',
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          position: 'relative',
          width: '8rem',
          height: '8rem',
          zIndex: 100
        }}
      />
    </div>
  );
}
