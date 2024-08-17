"use client"; // Menandai file ini sebagai Client Component

import { useEffect, useRef, useState } from 'react';

export default function SplashScreen({ onAnimationComplete }) {
  const [hidden, setHidden] = useState(false);
  const splashRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      if (splashRef.current) {
        splashRef.current.style.transition = 'opacity 3s ease-out, transform 1s ease-out';
        splashRef.current.style.opacity = '0';
        splashRef.current.style.transform = 'scale(1.2)';

        const timer = setTimeout(() => {
          setHidden(true);
          onAnimationComplete();
        }, 3000); // Durasi animasi splash screen

        return () => clearTimeout(timer);
      }
    };

    animate();
  }, [onAnimationComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fireParticles = [];
    const numParticles = 200;

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

    // Draw fire particles on canvas
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fire particles
      fireParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
        gradient.addColorStop(0, `rgba(255, 69, 0, ${particle.opacity})`); // Bright orange
        gradient.addColorStop(0.5, `rgba(255, 140, 0, ${particle.opacity * 0.5})`); // Darker orange
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`); // Fade to transparent
        ctx.fillStyle = gradient;
        ctx.fill();

        particle.y -= particle.speed; // Move particle upwards
        if (particle.y < 0) {
          particle.y = canvas.height;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <div
      ref={splashRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(to bottom, #FF4500, #FF8C00)', // Gradien api
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        opacity: '1',
        transform: 'scale(1)',
        overflow: 'hidden'
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
