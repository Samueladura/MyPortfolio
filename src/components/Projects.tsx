import { useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import axiomtracker from "../assets/axiomtracker.png";
import alivio from "../assets/alivio.png";
import eStudy from "../assets/eStudy.png";
import gopherscents from "../assets/gopherscents.png";
import financeOS from "../assets/financeOS.png";

const projects = [
  {
    id: 1,
    title: "Axiomtracker",
    category: "Web App",
    description:
      "Smart certificate tracking that keeps your team compliant, certified, and audit-ready. Automated alerts, and real-time compliance dashboards in one powerful platform.",
    image: axiomtracker,
    tags: ["React", "Supabase", "Node.js", "Tailwind"],
    accent: "indigo",
    github: "https://github.com/Samueladura/axiomtracker",
    external: "https://axiomtracker.vercel.app",
  },
  {
    id: 2,
    title: "Alivio",
    category: "Personalized guidance",
    description:
      "Everyone experiences stress in different ways. Let Alivio guide you, in a personalized journal experience, to overcome your stress.",
    image: alivio,
    tags: ["TypeScript", "Storybook", "Figma", "Tailwind"],
    accent: "violet",
    github: "https://github.com/Samueladura/alivio",
    external: "https://alivio-omega.vercel.app",
  },
  {
    id: 3,
    title: "eStudy",
    category: "Study App",
    description:
      "eStudy is your gateway to a world of limitless learning possibilities. With our cutting-edge eLearning platform, you can explore a vast library of courses, from academic subjects to practical skills, all designed to help you achieve your goals.",
    image: eStudy,
    tags: ["Next.js", "Prisma", "Stripe", "Redis"],
    accent: "emerald",
    github: "https://github.com/Samueladura/estudy",
    external: "https://e-study-rvys.vercel.app",
  },
  {
    id: 4,
    title: "Gopherscents",
    category: "Developer Tool",
    description:
      "A cloud-based IDE with live collaboration, AI code suggestions, and one-click environment provisioning. Supports 20+ languages with syntax highlighting.",
    image: gopherscents,
    tags: ["Next.js", "My SQL", "Supabase", "Tailwind"],
    accent: "cyan",
    github: "https://github.com/Samueladura/gopherscents",
    external: "https://gopherscents.vercel.app",
  },
  {
    id: 5,
    title: "FinanceOS",
    category: "FinTech",
    description:
      "A cloud-based IDE with live collaboration, AI code suggestions, and one-click environment provisioning. Supports 20+ languages with syntax highlighting.",
    image: financeOS,
    tags: ["Next.js", "My SQL", "Supabase", "Tailwind"],
    accent: "cyan",
    github: "https://github.com/Samueladura/FinanceOS",
    external: "https://finance-os-liard.vercel.app",
  },
];

const accentMap: Record<string, { badge: string; link: string; hover: string }> = {
  indigo: {
    badge: "text-indigo-400 bg-indigo-500/15 border-indigo-500/30",
    link: "text-indigo-400 hover:text-indigo-300",
    hover: "hover:border-indigo-500/30",
  },
  violet: {
    badge: "text-violet-400 bg-violet-500/15 border-violet-500/30",
    link: "text-violet-400 hover:text-violet-300",
    hover: "hover:border-violet-500/30",
  },
  emerald: {
    badge: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    link: "text-emerald-400 hover:text-emerald-300",
    hover: "hover:border-emerald-500/30",
  },
  cyan: {
    badge: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
    link: "text-cyan-400 hover:text-cyan-300",
    hover: "hover:border-cyan-500/30",
  },
};

const FILTERS = ["All", "Web App", "Personalized guidance", "Study App", "Commercial website"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeFilter === "All"
    ? (showAll ? projects : projects.slice(0, 4))
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-28 bg-slate-950"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-indigo-500 text-xs font-mono tracking-widest">
            03. PROJECTS
          </span>
          <div className="h-px w-16 bg-indigo-500/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Selected{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeFilter === f
                    ? "text-white bg-indigo-500/30 border border-indigo-500/50"
                    : "text-slate-400 bg-white/5 border border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => {
            const ac = accentMap[project.accent];
            return (
              <div
                key={project.id}
                className={`group rounded-2xl overflow-hidden bg-slate-900/70 border border-slate-800 ${ac.hover} hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                  {/* Category badge */}
                  <div
                    className={`absolute top-4 left-4 px-2.5 py-1 rounded-md text-xs font-mono border ${ac.badge}`}
                  >
                    {project.category}
                  </div>

                  {/* Action icons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-950/85 text-white border border-slate-700 hover:border-slate-500 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={14} />
                    </a>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} Live site`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-950/85 text-white border border-slate-700 hover:border-slate-500 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-400 bg-slate-800 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 ${ac.link}`}
                  >
                    View Case Study
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 border border-slate-700 bg-white/4 hover:bg-indigo-500 hover:text-white transition-all duration-200"
          >
            {showAll ? "Show Less" : "Show All Projects"}
            <ArrowRight size={15} className={`transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
}