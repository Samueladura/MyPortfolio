import { useEffect, useRef, useState } from "react";
import samuel1 from "../assets/samuel1.png";
import { Download, Code2, Palette, Zap } from "lucide-react";

const ABOUT_TEXT = `I'm a software designer and developer with over 5 years of experience building products that people love to use. My work spans the full spectrum — from pixel-perfect UI design to architecting scalable backend systems.\n\nI believe great software is built at the intersection of empathy, craftsmanship, and technical excellence. Every project I take on, I bring a designer's eye and an engineer's discipline to ensure the result is both beautiful and bulletproof.\n\nWhen I'm not coding, you'll find me exploring design systems, contributing to open source, or mentoring the next generation of developers.`;

const highlights = [
  { icon: <Code2 size={18} />, label: "Clean Code", desc: "Maintainable & scalable" },
  { icon: <Palette size={18} />, label: "Design Systems", desc: "Consistent UI/UX" },
  { icon: <Zap size={18} />, label: "Performance", desc: "Optimized & fast" },
];

export function About() {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    indexRef.current = 0;
    setDisplayed("");

    const typeNext = () => {
      if (indexRef.current <= ABOUT_TEXT.length) {
        setDisplayed(ABOUT_TEXT.slice(0, indexRef.current));
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNext, 18);
      }
    };
    timeoutRef.current = setTimeout(typeNext, 200);
    return () => clearTimeout(timeoutRef.current);
  }, [started]);

  const paragraphs = displayed.split("\n\n");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 bg-slate-950"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-indigo-500 text-xs font-mono tracking-widest">
            01. ABOUT ME
          </span>
          <div className="h-px w-16 bg-indigo-500/40" />
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-16">
          Crafting Digital{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Experiences
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – Image */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-cyan-500/20 blur-xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-indigo-500/20">
                <img
                  src={samuel1}
                  alt="Samuel – Software Designer & Developer"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 px-4 py-3 rounded-xl bg-slate-900/95 border border-indigo-500/25 backdrop-blur-md">
              <div className="text-2xl font-bold text-indigo-400 leading-none">5+</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                Years of
                <br />
                Experience
              </div>
            </div>
          </div>

          {/* Right – Typing text */}
          <div>
            {/* Terminal card */}
            <div className="rounded-2xl p-6 mb-8 bg-slate-900/60 border border-slate-800">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-xs font-mono text-slate-600 ml-2">about.md</span>
              </div>

              <div className="text-slate-300 text-sm leading-relaxed min-h-52">
                {paragraphs.map((para, i) => (
                  <p key={i} className={i < paragraphs.length - 1 ? "mb-4" : ""}>
                    {para}
                    {i === paragraphs.length - 1 && (
                      <span className="inline-block w-0.5 h-4 bg-indigo-500 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* Highlight cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl p-4 text-center bg-indigo-500/7 border border-indigo-500/15 hover:border-indigo-500/35 hover:bg-indigo-500/12 transition-all duration-200"
                >
                  <div className="flex justify-center mb-2 text-indigo-400">{h.icon}</div>
                  <div className="text-xs font-semibold text-white">{h.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{h.desc}</div>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30 active:scale-95">
              <Download size={16} />
              Download Resume
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}