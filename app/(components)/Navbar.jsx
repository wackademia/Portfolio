export default function Navbar() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#thesis", label: "Thesis" },
    { href: "#skills", label: "Skills" },
    { href: "#game", label: "Game" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur border-b border-slate-800">
      <nav className="section-container flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
            Z
          </div>
          <span className="font-semibold tracking-tight">Zabir Azmayan</span>
        </a>
        <div className="hidden md:flex gap-6 text-sm text-slate-200">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-indigo-200 transition-colors">
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:zabirazmyan53@gmail.com"
          className="hidden md:inline-flex bg-indigo-500 hover:bg-indigo-400 text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Hire Me
        </a>

        {/* Mobile menu */}
        <details className="md:hidden relative">
          <summary className="list-none inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200">
            Menu
            <span className="i-heroicons-bars-3 w-4 h-4" aria-hidden></span>
          </summary>
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur p-3 space-y-2 shadow-xl">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="block text-sm text-slate-200 hover:text-indigo-200">
                {item.label}
              </a>
            ))}
            <a
              href="mailto:zabirazmyan53@gmail.com"
              className="block bg-indigo-500 hover:bg-indigo-400 text-sm font-semibold px-3 py-2 rounded-lg text-center"
            >
              Hire Me
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
