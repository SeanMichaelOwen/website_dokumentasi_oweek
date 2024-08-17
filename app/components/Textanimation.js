import { useState, useEffect, useRef } from 'react';

const languages = [
  "Hallo", "Hello", "Hola", "Bonjour", "Ciao", "こんにちは", 
];

export default function TextAnimation({ onLoadingComplete }) {
  const [currentLang, setCurrentLang] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % languages.length);
    }, 2000); // Change language every 2 seconds

    const timer = setTimeout(() => {
      clearInterval(interval);
      onLoadingComplete(); // Notify when loading is complete
    }, 10000); // Duration of loading

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const particles = [];
    const numParticles = 200;

    // Generate random fire particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speed: Math.random() * 3 + 1,
        opacity: Math.random(),
      });
    }

    const draw = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fire particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
        gradient.addColorStop(0, `rgba(255, 69, 0, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 140, 0, ${particle.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas.height;
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
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0 bg-white"></div> {/* Set background to white */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="relative text-center">
        <div
          className="text-4xl font-semibold text-gray-800"
          style={{
            animation: 'fadeScale 2s ease-in-out infinite',
            opacity: 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          {languages[currentLang]}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
