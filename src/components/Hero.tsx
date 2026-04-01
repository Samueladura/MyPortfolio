import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const ROLES = [
  "Software Designer & Engineer",
  "Frontend Developer",
  "Motion Graphics Designer",
  "Full-Stack Developer",
];

export function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = ROLES[roleIndex];
      const el = roleRef.current;
      if (!el) return;

      if (!isDeleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          timeoutId = setTimeout(type, 300);
          return;
        }
      }
      timeoutId = setTimeout(type, isDeleting ? 55 : 95);
    };

    timeoutId = setTimeout(type, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    let visible = true;
    const interval = setInterval(() => {
      visible = !visible;
      el.style.opacity = visible ? "1" : "0";
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/8 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono tracking-wide">
              Available for opportunities
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-4">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Babayemi Samuel
            </span>
          </h1>

          {/* Typing role */}
          <div className="flex items-center gap-0 mb-6 h-12">
            <span className="text-2xl lg:text-4xl font-semibold text-indigo-300">
              <span ref={roleRef} />
              <span
                ref={cursorRef}
                className="inline-block w-[3px] h-8 bg-indigo-500 ml-1 rounded-sm align-middle"
              />
            </span>
          </div>

          {/* Description */}
          <p className="text-base lg:text-lg text-slate-400 leading-relaxed max-w-xl mb-10">
            I craft exceptional digital experiences that live at the
            intersection of elegant design and robust engineering turning
            complex problems into intuitive, pixel-perfect products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30 active:scale-95"
            >
              View My Work
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 rounded-xl font-semibold text-slate-300 border border-slate-700 bg-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              Get In Touch
            </button>
          </div>

          {/* Social links */}
          {/* <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-slate-600 uppercase tracking-widest">
              Follow me
            </span>
            <div className="flex gap-3">
              {[
                { icon: <Github size={18} />, href: "https://github.com/Samueladura", label: "GitHub" },
                { icon: <Instagram size={18} />, href: "#", label: "Instargram" },
                { icon: <Twitter size={18} />, href: "https://x.com/buildwithadura", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 border border-slate-800 bg-white/4 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div> */}
        </div>

        {/* Stats row */}
        <div className="hidden lg:flex items-center gap-0 absolute bottom-12 left-6">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "60+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
            { value: "15+", label: "Open Source" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
              {i < 3 && (
                <div className="w-px h-9 bg-slate-800 mr-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ArrowDown size={16} className="text-slate-600" />
      </div>
    </section>
  );
}