import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    role: "Software Developer & Engineer",
    company: "Ted-prime Hub",
    period: "2024 – Present",
    location: "Abeokuta, Nigeria",
    description:
      "Lead designer and frontend engineer on Veritas's core SaaS platform. Rebuilt the design system from scratch, reducing design debt by 70% and cutting frontend development time by 40%. Architected a new real-time collaboration feature used daily by 50K+ users.",
    tags: ["React", "TypeScript", "Figma", "GraphQL"],
    current: true,
  },
  {
    type: "work",
    role: "Motion Graphics Designer",
    company: "Remote",
    period: "2025 – Present",
    location: "Remote",
    description:
      "Owned the full design-to-code pipeline for 4 client products. Established design guidelines that were adopted company-wide. Delivered projects 20% under budget on average by building a robust component library.",
    tags: ["Adobe Photoshop", "Adobe After Effect", "Adobe Premiere pro"],
    current: false,
  },
  {
    type: "work",
    role: "Frontend Developer",
    company: "Ted-prime Hub",
    period: "2023 – 2024",
    location: "Abeokuta, Nigeria",
    description:
      "Built interactive, animation-rich marketing sites and web apps for startups. Collaborated directly with founders to translate rough ideas into polished, high-converting products.",
    tags: ["React", "GSAP", "CSS", "Webflow"],
    current: false,
  },
  {
    type: "education",
    role: "B.Sc. Software Engineering",
    company: "Osun State University",
    period: "2015 – 2019",
    location: "Osogbo, Nigeria",
    description:
      "Graduated with honors. Specialized in Software Engineering. Thesis: \"Adaptive UI Systems Driven by User Behavioral Patterns.\"",
    tags: ["HCI", "Algorithms", "Systems Design"],
    current: false,
  },
];

export function Experience() {
  const [visible, setVisible] = useState<boolean[]>(
    new Array(experiences.length).fill(false)
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 120);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section
      id="experience"
      className="relative py-28 bg-slate-900"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-indigo-500 text-xs font-mono tracking-widest">
            04. EXPERIENCE
          </span>
          <div className="h-px w-16 bg-indigo-500/40" />
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-16">
          Career{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Journey
          </span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 hidden lg:block w-px bg-gradient-to-b from-indigo-500/60 to-indigo-500/10" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="relative lg:pl-20 transition-all duration-700"
                style={{
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i] ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-6 hidden lg:flex w-12 h-12 rounded-full items-center justify-center ${
                    exp.type === "work"
                      ? "bg-indigo-500/15 border border-indigo-500/40 text-indigo-400"
                      : "bg-emerald-500/12 border border-emerald-500/30 text-emerald-400"
                  }`}
                >
                  {exp.type === "work" ? (
                    <Briefcase size={18} />
                  ) : (
                    <GraduationCap size={18} />
                  )}
                </div>

                {/* Card */}
                <div className="rounded-2xl p-6 bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-black/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/12 border border-emerald-500/25">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-indigo-400">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs font-mono text-slate-500">
                        {exp.period}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-400 bg-indigo-500/7 border border-indigo-500/14"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}