'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ParticleConstellation() {
  const canvasRef = useRef(null);
  const [selectedParticle, setSelectedParticle] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

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
    if (!canvas) {
      console.log('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Context not found');
      return;
    }

    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let animationId = null;

    // Initialize canvas size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * window.devicePixelRatio;
      height = canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      // Initialize particles
      particles = infoData.map((info, i) => ({
        id: info.id,
        x: (width / window.devicePixelRatio) * (0.2 + (i * 0.15)),
        y: (height / window.devicePixelRatio) * (0.3 + Math.random() * 0.4),
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: 6,
        info: info
      }));
      
      console.log('Canvas initialized:', width / window.devicePixelRatio, 'x', height / window.devicePixelRatio);
      console.log('Particles:', particles.length);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      // Check hover
      let foundHover = null;
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          foundHover = p.id;
        }
      });
      setHoveredId(foundHover);
    };

    // Click handler
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      particles.forEach(p => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 30) {
          setSelectedParticle(p.info);
        }
      });
    };

    // Animation loop
    const animate = () => {
      const w = width / window.devicePixelRatio;
      const h = height / window.devicePixelRatio;
      
      // Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Update and draw particles
      particles.forEach((p, i) => {
        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200 && dist > 0) {
          p.vx += (dx / dist) * 0.01;
          p.vy += (dy / dist) * 0.01;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundaries
        if (p.x < 20) { p.x = 20; p.vx *= -0.8; }
        if (p.x > w - 20) { p.x = w - 20; p.vx *= -0.8; }
        if (p.y < 20) { p.y = 20; p.vy *= -0.8; }
        if (p.y > h - 20) { p.y = h - 20; p.vy *= -0.8; }

        // Friction
        p.vx *= 0.97;
        p.vy *= 0.97;

        const isHovered = p.id === hoveredId;
        const size = isHovered ? 10 : 6;

        // Draw glow
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 25, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 25);
          grad.addColorStop(0, 'rgba(255,255,255,0.3)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ffffff' : '#cccccc';
        ctx.shadowBlur = isHovered ? 20 : 10;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 300) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = Math.max(0, 0.3 * (1 - dist / 300));
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = isHovered || p2.id === hoveredId ? 2 : 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [hoveredId]);

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
          style={{ display: 'block' }}
        />

        <AnimatePresence>
          {selectedParticle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50"
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
