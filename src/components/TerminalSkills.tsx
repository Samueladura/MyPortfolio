import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "LANGUAGES",
    icon: "⟨/⟩",
    skills: [
      { name: "Rust", level: 95 },
      { name: "TypeScript/Node", level: 90 },
      { name: "Go", level: 85 },
      { name: "Python", level: 78 },
      { name: "C++", level: 65 },
    ],
  },
  {
    title: "SYSTEMS & CLOUD",
    icon: "☁",
    skills: [
      { name: "Linux/Kernel", level: 92 },
      { name: "Docker & K8s", level: 90 },
      { name: "AWS / GCP", level: 82 },
      { name: "eBPF Monitoring", level: 80 },
      { name: "Terraform/IaC", level: 88 },
    ],
  },
  {
    title: "DATABASES",
    icon: "▣",
    skills: [
      { name: "PostgreSQL", level: 94 },
      { name: "Redis", level: 92 },
      { name: "ClickHouse", level: 76 },
      { name: "Kafka", level: 89 },
      { name: "ScyllaDB", level: 74 },
    ],
  },
];

const shortcuts = [
  { cmd: "man", desc: "System manual" },
  { cmd: "ls -la projects/", desc: "List repos" },
  { cmd: "cat experience.log", desc: "Career log" },
  { cmd: "send_message.sh", desc: "Send dispatch" },
];

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1 gap-2">
        <span className="text-xs terminal-font text-terminal-text truncate">{name}</span>
        <span className="text-xs terminal-font text-terminal-green shrink-0">{level}%</span>
      </div>
      <div className="h-1.5 bg-terminal-bg rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-terminal-green/60 to-terminal-green rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: animate ? `${level}%` : "0%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function TerminalSkills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-10 md:py-20 bg-terminal-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <span className="text-terminal-green text-xs terminal-font tracking-widest">
            ❯ buildwithsam: ~/skills
          </span>
        </motion.div>

        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm terminal-font overflow-x-auto whitespace-nowrap"
        >
          <span className="text-terminal-green">buildwithsam</span>
          <span className="text-terminal-muted">:</span>
          <span className="text-terminal-cyan">~/skills</span>
          <span className="text-terminal-muted">$</span>
          <span className="text-terminal-text">cat skills.json</span>
          <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor shrink-0"></span>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="terminal-card p-4 md:p-6 min-w-0"
            >
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <span className="text-terminal-green text-lg">{category.icon}</span>
                <h3 className="text-sm font-bold text-terminal-green terminal-font">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} animate={animate} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick launch shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12 terminal-card p-4 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs terminal-font text-terminal-green">⚡ QUICK LAUNCH SHORTCUTS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {shortcuts.map((item) => (
              <div
                key={item.cmd}
                className="flex items-center gap-3 p-3 min-h-11 rounded border border-terminal-border hover:border-terminal-green/30 transition-colors cursor-pointer group min-w-0"
              >
                <span className="text-xs terminal-font text-terminal-green group-hover:animate-pulse shrink-0">❯</span>
                <div className="min-w-0">
                  <div className="text-xs terminal-font text-terminal-text truncate">{item.cmd}</div>
                  <div className="text-xs terminal-font text-terminal-muted truncate">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}