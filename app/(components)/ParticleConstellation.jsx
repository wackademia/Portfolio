'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ParticleConstellation() {
  const canvasRef = useRef(null);
  const [selectedParticle, setSelectedParticle] = useState(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef();

  const infoData = [
    {
      id: 1,
      title: "Full Stack Development",
      description: "Building modern web & mobile applications with React, Next.js, Flutter, and TypeScript.",
      icon: "⚡"
    },
    {
      id: 2,
      title: "Machine Learning",
      description: "YOLOv8, transformer models, and AI-powered detection systems for real-world applications.",
      icon: "🤖"
    },
    {
      id: 3,
      title: "Backend Engineering",
      description: "Django, FastAPI, Supabase, Firebase - scalable and secure backend architectures.",
      icon: "⚙️"
    },
    {
      id: 4,
      title: "Database Design",
      description: "MySQL, PostgreSQL, MongoDB - optimized data structures and query performance.",
      icon: "🗄️"
    },
    {
      id: 5,
      title: "Cloud & DevOps",
      description: "Deployment, CI/CD pipelines, and cloud infrastructure management.",
      icon: "☁️"
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Beautiful, responsive interfaces with Tailwind CSS and modern design principles.",
      icon: "🎨"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = infoData.map((info, index) => ({
        id: info.id,
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 6,
        info: info,
        hovered: false
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particlesRef.current.forEach(particle => {
        const dx = particle.x - clickX;
        const dy = particle.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 15) {
          setSelectedParticle(particle.info);
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Mouse attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          particle.vx += dx * 0.0002;
          particle.vy += dy * 0.0002;
          particle.hovered = true;
        } else {
          particle.hovered = false;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check with bounce
        if (particle.x < particle.radius) {
          particle.x = particle.radius;
          particle.vx *= -1;
        } else if (particle.x > width - particle.radius) {
          particle.x = width - particle.radius;
          particle.vx *= -1;
        }
        if (particle.y < particle.radius) {
          particle.y = particle.radius;
          particle.vy *= -1;
        } else if (particle.y > height - particle.radius) {
          particle.y = height - particle.radius;
          particle.vy *= -1;
        }

        // Friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw particle glow (outer)
        if (particle.hovered) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 20, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 20);
          glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
          glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.hovered ? 8 : particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.hovered ? '#ffffff' : '#cccccc';
        ctx.shadowBlur = particle.hovered ? 15 : 5;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw particle ring when hovered
        if (particle.hovered) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 0.4 * (1 - distance / 250);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = p1.hovered || p2.hovered ? 2 : 1;
            ctx.stroke();
          }
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative">
      <div className="mb-6 text-center">
        <p className="text-gray-400 text-sm">
          Hover over the particles and click to reveal information
        </p>
      </div>
      
      <div className="relative h-[60vh] md:h-[70vh] rounded-2xl border border-white/10 bg-black overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          data-testid="particle-constellation-canvas"
        />

        <AnimatePresence>
          {selectedParticle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md"
            >
              <div className="bg-black border-2 border-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedParticle.icon}</span>
                    <h3 className="text-xl font-bold text-white">{selectedParticle.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedParticle(null)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
                    data-testid="close-particle-info"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedParticle.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {infoData.map((info) => (
          <motion.button
            key={info.id}
            onClick={() => setSelectedParticle(info)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/5 border border-white/10 hover:border-white/30 rounded-lg p-3 text-left transition-all group"
            data-testid={`particle-button-${info.id}`}
          >
            <span className="text-2xl mb-1 block group-hover:scale-110 transition-transform">{info.icon}</span>
            <p className="text-xs text-gray-400 group-hover:text-white transition-colors">{info.title}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
