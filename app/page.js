import Navbar from "./(components)/Navbar";
import AnimatedBg from "./(components)/AnimatedBg";
import ChestsGame from "./(components)/ChestsGame";

export default function Page() {
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
      <section
        id="home"
        className="relative pt-28 lg:pt-32 pb-16 lg:pb-20 min-h-[80vh]"
      >
        <AnimatedBg />
        <div className="section-container flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="flex-1 relative z-10">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-100 mb-3">
            Software Engineer • Full Stack • ML
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Hi, I'm <span className="text-indigo-200">Zabir Azmayan</span>
          </h1>
          <p className="text-slate-200/90 max-w-2xl mb-6">
            CS student at BRAC University (Dhaka, Bangladesh) building modern web apps,
            mobile apps, and AI-powered systems. I love creating polished, performant products.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:zabirazmyan53@gmail.com"
              className="bg-indigo-500 hover:bg-indigo-400 px-5 py-2 rounded-lg font-medium"
            >
              Let's Talk
            </a>
            <a
              href="#projects"
              className="border border-slate-500 hover:border-indigo-300 px-5 py-2 rounded-lg font-medium"
            >
              View Projects
            </a>
            <a href="tel:+8801969526795" className="text-slate-100 underline underline-offset-4">
              +880 1969 526795
            </a>
          </div>
          <div className="flex gap-4 mt-6 text-slate-100/80">
            <a href="https://linkedin.com/in/Zabir-Azmayan" className="hover:text-white text-sm">
              LinkedIn
            </a>
            <a href="https://github.com/" className="hover:text-white text-sm">
              GitHub
            </a>
            <a href="https://x.com/" className="hover:text-white text-sm">
              X/Twitter
            </a>
          </div>
        </div>
        <div className="flex-1 max-w-sm lg:max-w-md xl:max-w-lg relative z-10">
          <div className="bg-slate-950/40 border border-slate-100/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
            <p className="text-sm text-slate-200">Currently</p>
            <h2 className="text-xl font-semibold mb-2">B.Sc. in CSE, BRAC University</h2>
            <p className="text-sm text-slate-200/90">
              Relevant Coursework: Software Engineering, System Analysis & Design, Machine Learning,
              Android App Development, Data Structures & Algorithms.
            </p>
            <p className="mt-4 inline-flex px-3 py-1 text-xs uppercase tracking-widest bg-emerald-400/10 text-emerald-200 rounded">
              Open to internships • remote / onsite
            </p>
          </div>
        </div>
        </div>
      </section>

      <section id="game" className="py-16 bg-slate-950">
        <div className="section-container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl lg:text-3xl font-semibold">Mini Game</h2>
            <p className="text-slate-400 text-sm">Click chests to reveal info.</p>
          </div>
          <ChestsGame />
        </div>
      </section>

      <section id="about" className="py-14 lg:py-16 bg-slate-950">
        <div className="section-container grid md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">About</h2>
              <p className="text-slate-200 mb-3">
                I architect and develop web & mobile solutions using modern frameworks like React, Vite,
                TypeScript, Tailwind, Flutter, and Supabase.
              </p>
              <p className="text-slate-200">
                I also have experience in AI/ML — I've built detection systems with YOLOv8, applied transformer-based models,
                and worked on intelligent surveillance frameworks.
              </p>
            </div>
            <div className="bg-slate-900/40 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Education</h3>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">BRAC University</p>
                <p className="text-xs text-slate-300">Dhaka, Bangladesh</p>
              </div>
              <p className="text-slate-200 text-sm mb-1">
                B.Sc. in Computer Science and Engineering
              </p>
              <p className="text-xs text-slate-400 mb-3">June 2021 – Present</p>
              <p className="text-xs text-slate-200">
                Coursework: Software Engineering, System Analysis & Design, Machine Learning,
                Android App Development, Data Structures & Algorithms.
              </p>
            </div>
        </div>
      </section>

      <section id="projects" className="py-16 bg-slate-950">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold">Selected Projects</h2>
            <p className="text-slate-400 text-sm">Real, shipped projects.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <article key={p.title} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-indigo-400 transition-colors">
                <p className="text-[10px] tracking-[0.3em] uppercase text-indigo-200 mb-2">{p.tech}</p>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-slate-200 mb-3">{p.desc}</p>
                <p className="text-xs text-slate-400">Role: {p.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="thesis" className="py-16 bg-slate-950">
        <div className="section-container">
          <h2 className="text-2xl font-semibold mb-4">Academic Thesis</h2>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3">
            <p className="text-sm text-slate-200">
              AI-driven multi-modal surveillance framework to detect insider threats in high-security facilities.
            </p>
            <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
              <li>Used transformer-based pose encoders, 3D CNNs, and YOLOv8 for detection.</li>
              <li>Applied SVM, Random Forest, Decision Trees, and BERT for analytics.</li>
              <li>Integrated modules into a unified risk assessment & alert system.</li>
            </ul>
            <p className="text-xs text-slate-400">Completion target: Oct 2025</p>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16 bg-slate-950">
        <div className="section-container">
          <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="bg-slate-900/50 border border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-100">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-slate-950">
        <div className="section-container text-center">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 inline-block">
            <h2 className="text-2xl font-semibold mb-2">Let's build something</h2>
            <p className="text-slate-200 mb-4">
              Whether it's a startup MVP, dashboard, or ML-powered solution — I can help.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-3">
              <a href="mailto:zabirazmyan53@gmail.com" className="bg-indigo-500 hover:bg-indigo-400 px-5 py-2 rounded-lg font-medium">
                Email me
              </a>
              <a href="tel:+8801969526795" className="border border-slate-500 hover:border-indigo-300 px-5 py-2 rounded-lg font-medium">
                Call: +880 1969 526795
              </a>
            </div>
            <p className="text-xs text-slate-400">Banani, Dhaka</p>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-500 bg-slate-950">
        © {new Date().getFullYear()} Zabir Azmayan. All rights reserved.
      </footer>
    </>
  );
}
