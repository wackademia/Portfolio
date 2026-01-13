'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navbar from "./(components)/Navbar";
import AnimatedBg from "./(components)/AnimatedBg";
import ParticleConstellation from "./(components)/ParticleConstellation";

function SectionReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const projects = [
    {
      title: "Azure Business Solutions",
      tech: "React, Vite, TypeScript, Convex, Tailwind, Framer, Three.js",
      desc: "Modern web presence for a tax & business consulting firm with real-time database & authentication, immersive scroll effects, and a multi-service showcase.",
      role: "Full Stack Developer",
    },
    {
      title: "Medihelp",
      tech: "Flutter, Firebase, Local Notifications",
      desc: "Cross-platform health assistant app with appointments, prescriptions, lab reports, medicine tracking, chat, and secure auth.",
      role: "Mobile Developer",
    },
    {
      title: "Ride Sharing App",
      tech: "Django, SQLite, HTML/CSS, Bootstrap",
      desc: "Campus ride sharing platform connecting university students for safe & cost-effective rides with role-based auth.",
      role: "Backend & UI",
    },
    {
      title: "Pothole Detection Model",
      tech: "Python, YOLOv8",
      desc: "Instance segmentation model to detect potholes on custom datasets using YOLOv8.",
      role: "ML Engineer",
    },
  ];

  const skills = [
    "Python",
    "C",
    "JavaScript",
    "TypeScript",
    "React / Next.js",
    "Tailwind CSS",
    "Django",
    "Flutter",
    "Supabase",
    "Firebase",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "Git / GitHub",
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 min-h-screen flex items-center"
      >
        <AnimatedBg />
        <motion.div 
          style={{ opacity, scale }}
          className="section-container relative z-10 w-full"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">
                  Software Engineer • Full Stack • ML
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight leading-none">
                  Hi, I'm{' '}
                  <span className="gradient-text block mt-2">
                    Zabir Azmayan
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed"
              >
                CS student at BRAC University (Dhaka, Bangladesh) building modern web apps,
                mobile apps, and AI-powered systems. I love creating polished, performant products.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="mailto:zabirazmyan53@gmail.com"
                  whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm transition-all"
                  data-testid="hero-contact-button"
                >
                  Let's Talk
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:bg-white hover:text-black"
                  data-testid="view-projects-button"
                >
                  View Projects
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-6 pt-4"
              >
                <a href="tel:+8801969526795" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +880 1969 526795
                </a>
                <a href="https://linkedin.com/in/Zabir-Azmayan" className="text-gray-400 hover:text-white transition-colors text-sm">
                  LinkedIn
                </a>
                <a href="https://github.com/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  GitHub
                </a>
                <a href="https://x.com/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  X/Twitter
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 max-w-md lg:max-w-lg"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl group-hover:bg-white/20 transition-all"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-3xl p-8 scan-line">
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Currently</p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">B.Sc. in CSE, BRAC University</h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Relevant Coursework: Software Engineering, System Analysis & Design, Machine Learning,
                    Android App Development, Data Structures & Algorithms.
                  </p>
                  <div className="inline-flex px-4 py-2 text-xs uppercase tracking-widest bg-white/10 border border-white/20 text-white rounded-full">
                    Open to internships • remote / onsite
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="section-container relative z-10">
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold mb-6"
                  whileInView={{ x: [0, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  About
                </motion.h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    I architect and develop web & mobile solutions using modern frameworks like React, Vite,
                    TypeScript, Tailwind, Flutter, and Supabase.
                  </p>
                  <p>
                    I also have experience in AI/ML — I've built detection systems with YOLOv8, applied transformer-based models,
                    and worked on intelligent surveillance frameworks.
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4">Education</h3>
                <div className="flex items-start justify-between mb-3">
                  <p className="font-semibold text-lg">BRAC University</p>
                  <p className="text-xs text-gray-400">Dhaka, Bangladesh</p>
                </div>
                <p className="text-gray-300 mb-2">
                  B.Sc. in Computer Science and Engineering
                </p>
                <p className="text-sm text-gray-400 mb-4">June 2021 – Present</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Coursework: Software Engineering, System Analysis & Design, Machine Learning,
                  Android App Development, Data Structures & Algorithms.
                </p>
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 lg:py-32 bg-black">
        <div className="section-container">
          <SectionReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-3">Selected Projects</h2>
                <p className="text-gray-400">Real, shipped projects.</p>
              </div>
              <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-white to-transparent"></div>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <SectionReveal key={project.title} delay={index * 0.1}>
                <motion.article
                  whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.4)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full group cursor-pointer"
                  data-testid={`project-card-${index}`}
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-3 group-hover:text-gray-300 transition-colors">
                    {project.tech}
                  </p>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  <p className="text-sm text-gray-500">
                    Role: <span className="text-gray-300">{project.role}</span>
                  </p>
                </motion.article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis Section */}
      <section id="thesis" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="section-container relative z-10">
          <SectionReveal>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">Academic Thesis</h2>
            <motion.div 
              className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12"
              whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                AI-driven multi-modal surveillance framework to detect insider threats in high-security facilities.
              </p>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <span>Used transformer-based pose encoders, 3D CNNs, and YOLOv8 for detection.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <span>Applied SVM, Random Forest, Decision Trees, and BERT for analytics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white text-xl">•</span>
                  <span>Integrated modules into a unified risk assessment & alert system.</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">Completion target: Oct 2025</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 lg:py-32 bg-black">
        <div className="section-container">
          <SectionReveal>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-center font-medium hover:border-white/30 transition-all cursor-default"
                  data-testid={`skill-${index}`}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Interactive Section */}
      <section id="interactive" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="section-container relative z-10">
          <SectionReveal>
            <div className="mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Interactive Experience</h2>
              <p className="text-gray-400 text-lg">Explore my expertise through an interactive particle constellation</p>
            </div>
            <ParticleConstellation />
          </SectionReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-black">
        <div className="section-container">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl group-hover:bg-white/20 transition-all"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-12">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">Let's build something</h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Whether it's a startup MVP, dashboard, or ML-powered solution — I can help.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <motion.a
                      href="mailto:zabirazmyan53@gmail.com"
                      whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-8 py-3 rounded-full font-semibold transition-all"
                      data-testid="contact-email-button"
                    >
                      Email me
                    </motion.a>
                    <motion.a
                      href="tel:+8801969526795"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all"
                      data-testid="contact-call-button"
                    >
                      Call: +880 1969 526795
                    </motion.a>
                  </div>
                  <p className="text-sm text-gray-500">Banani, Dhaka</p>
                </div>
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-600 bg-black border-t border-white/10">
        <div className="section-container">
          <p>© {new Date().getFullYear()} Zabir Azmayan. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
