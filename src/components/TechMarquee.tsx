import { motion } from "framer-motion";

const techStack = [
  "React", "TypeScript", "Next.js", "Node.js", "GraphQL", "PostgreSQL",
  "Tailwind CSS", "Figma", "Docker", "AWS", "Redis", "Prisma",
  "Framer Motion", "Three.js", "Python", "Vercel", "Supabase", "GSAP",
  "MongoDB", "Express", "Vue.js", "Angular", "MySQL", "Git",
];

export function TechMarquee() {
  const duplicated = [...techStack, ...techStack];

  return (
    <section className="relative py-16 bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs text-slate-600 uppercase tracking-widest"
        >
          Technologies I work with
        </motion.p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex overflow-hidden"
        >
          <div
            className="flex gap-6 animate-marquee whitespace-nowrap"
            style={{ animation: "marquee 30s linear infinite" }}
          >
            {duplicated.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 bg-slate-900/50 border border-slate-800/50 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
