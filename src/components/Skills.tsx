import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Design",
    dotColor: "bg-violet-400",
    barColor: "from-violet-500/60 to-violet-400",
    glow: "shadow-violet-500/40",
    labelColor: "text-violet-400",
    skills: [
      { name: "Figma", level: 65 },
      { name: "UI/UX Design", level: 60 },
      { name: "Graphis Design", level: 80 },
      { name: "Prototyping", level: 70 },
      { name: "Motion Design", level: 80 },
    ],
  },
  {
    title: "Frontend",
    dotColor: "bg-cyan-400",
    barColor: "from-cyan-500/60 to-cyan-400",
    glow: "shadow-cyan-500/40",
    labelColor: "text-cyan-400",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 94 },
      { name: "Vue.js", level: 80 },
      { name: "Three.js / WebGL", level: 70 },
    ],
  },
  {
    title: "Backend",
    dotColor: "bg-emerald-400",
    barColor: "from-emerald-500/60 to-emerald-400",
    glow: "shadow-emerald-500/40",
    labelColor: "text-emerald-400",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "PostgreSQL", level: 84 },
      { name: "GraphQL", level: 80 },
      { name: "Python / Django", level: 76 },
      { name: "MySQL", level: 74 },
    ],
  },
];

const techTags = [
  "React", "TypeScript", "Next.js", "Node.js", "GraphQL", "PostgreSQL",
  "Tailwind CSS", "Figma", "Docker", "AWS", "Redis", "Prisma",
  "Framer Motion", "Three.js", "Python", "Vercel",
];

function SkillBar({
  name,
  level,
  barColor,
  glow,
  labelColor,
  animate,
}: {
  name: string;
  level: number;
  barColor: string;
  glow: string;
  labelColor: string;
  animate: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-300 font-medium">{name}</span>
        <span className={`text-xs font-mono ${labelColor}`}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} shadow-sm ${glow} transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 bg-slate-900"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-indigo-500 text-xs font-mono tracking-widest">
            02. SKILLS
          </span>
          <div className="h-px w-16 bg-indigo-500/40" />
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Tools &{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Expertise
          </span>
        </h2>

        <p className="text-slate-400 text-base leading-relaxed max-w-lg mb-16">
          A curated toolkit built over years of shipping real products, from concept to production.
        </p>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl p-6 bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                <h3 className="text-base font-semibold text-white">{cat.title}</h3>
              </div>
              {cat.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  barColor={cat.barColor}
                  glow={cat.glow}
                  labelColor={cat.labelColor}
                  animate={animate}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tech tag cloud */}
        <div className="text-center">
          <p className="text-xs text-slate-600 uppercase tracking-widest mb-5">
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 bg-indigo-500/7 border border-indigo-500/14 hover:text-indigo-300 hover:border-indigo-500/40 hover:bg-indigo-500/14 transition-all duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}