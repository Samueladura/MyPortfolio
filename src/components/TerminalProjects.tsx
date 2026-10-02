import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  path: string;
  tags: string[];
  category: string;
  github: string;
  external: string;
  featured: boolean;
}

interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits30d: number;
  commitChart: number[];
  ciPassing: string | null;
  latestRepo: { name: string; fullName: string } | null;
}

const FALLBACK_STATS: GitHubStats = {
  totalStars: 8100,
  totalForks: 1006,
  totalRepos: 19,
  totalCommits30d: 318,
  commitChart: [28, 45, 70, 35, 82, 64, 90, 100],
  ciPassing: "99.98",
  latestRepo: null,
};

const projects: Project[] = [
  {
    id: 1,
    name: "Axiomtracker",
    description:
      "Smart certificate tracking that keeps your team compliant, certified, and audit-ready. Automated alerts, and real-time compliance dashboards in one powerful platform.",
    path: "Axiomtracker/",
    tags: ["React", "Supabase", "Node.js/Express", "Tailwind"],
    category: "Web App",
    github: "https://github.com/Samueladura/axiomtracker",
    external: "https://axiomtracker.vercel.app",
    featured: true,
  },
  {
    id: 2,
    name: "Alivio",
    description:
      "Alivio is a mental wellness app that helps users manage stress through a personalized journal experience. The landing page promotes the app's guided journaling feature to help people overcome stress.",
    path: "Alivio/",
    tags: ["TypeScript", "Storybook", "Figma", "Tailwind"],
    category: "Personalized guidance",
    github: "https://github.com/Samueladura/alivio",
    external: "https://alivio-omega.vercel.app",
    featured: false,
  },
  {
    id: 3,
    name: "eStudy",
    description:
      "eStudy is your gateway to a world of limitless learning possibilities. With our cutting-edge eLearning platform, you can explore a vast library of courses, from academic subjects to practical skills, all designed to help you achieve your goals.",
    path: "eStudy/",
    tags: ["Next.js", "Tailwind CSS"],
    category: "Study App",
    github: "https://github.com/Samueladura/estudy",
    external: "https://e-study-rvys.vercel.app",
    featured: false,
  },
  {
    id: 4,
    name: "Gopherscents",
    description:
      "GopherScents is a Next.js-based e-commerce web application for selling scented products. It features product browsing, shopping cart, wishlist, user authentication (login/signup with OTP verification), checkout, and order management. Built with Vite, Supabase for backend/auth, and Tailwind CSS for styling.",
    path: "Gopherscents/",
    tags: ["Next.js", "My SQL", "PHP", "Tailwind CSS"],
    category: "Commercial website",
    github: "https://github.com/Samueladura/gopherscents",
    external: "https://gopherscents.vercel.app",
    featured: false,
  },
  {
    id: 5,
    name: "FinanceOS",
    description:
      "A personal expense tracking application built with React, TypeScript, My SQL and Tailwind CSS. Features include transaction management, budget tracking, account management, and analytics with visual charts. Uses Supabase for authentication and data storage.",
    path: "FinanceOS/",
    tags: ["React", "Supabase", "Tailwind"],
    category: "FinTech",
    github: "https://github.com/Samueladura/FinanceOS",
    external: "https://finance-os-murex-nine.vercel.app",
    featured: false,
  },
];

const FILTERS = [
  { id: "All", label: "--all" },
  { id: "Web App", label: "--cat=web-app" },
  { id: "Personalized guidance", label: "--cat=personalized-guidance" },
  { id: "Study App", label: "--cat=study-app" },
  { id: "Commercial website", label: "--cat=commercial" },
];

// Used for Tab autocomplete in the CLI
const CLI_COMMANDS = ["help", "man", "ls -la projects/", "filter ", "sort", "reset", "clear"];

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export function TerminalProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [tagFilter, setTagFilter] = useState("");
  const [sortAz, setSortAz] = useState(false);
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_STATS);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [cliInput, setCliInput] = useState("");
  const [cliOutput, setCliOutput] = useState("");
  const [showCli, setShowCli] = useState(false);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_EMAIL_API_URL || "http://localhost:4000";
    fetch(`${apiBase}/api/github/stats?owner=Samueladura`)
      .then((res) => (res.ok ? res.json() : Promise.resolve(FALLBACK_STATS)))
      .then((data) => {
        if (data && !data.error) {
          setStats({ ...FALLBACK_STATS, ...data });
          setLastSynced(new Date().toLocaleTimeString());
        }
      })
      .catch(() => {
        // keep fallback on network error
      });
  }, []);

  // Category + tag filters, optional A-Z sort, then the "show 4 / show all" limit
  let list = projects.filter(
    (p) =>
      (activeFilter === "All" || p.category === activeFilter) &&
      (!tagFilter || p.tags.some((t) => t.toLowerCase().includes(tagFilter)))
  );
  if (sortAz) list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  const isUnfiltered = activeFilter === "All" && !tagFilter;
  const filtered = isUnfiltered && !showAll ? list.slice(0, 4) : list;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission)
    }
  };

  const resetAll = () => {
    setActiveFilter("All");
    setTagFilter("");
    setSortAz(false);
    setShowAll(false);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();
    let out = "";

    if (lower === "help" || lower === "man") {
      out =
        '&gt; Available commands:<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-green font-bold">ls -la projects/</span> : List all repositories<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">filter &lt;tag&gt;</span> : Show projects using a technology (e.g. filter react)<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">sort</span> : Toggle A-Z ordering<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-text font-bold">reset</span> : Clear all filters and sorting<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-muted font-bold">clear</span> : Clear this output';
    } else if (lower === "ls" || lower === "ls -la projects/" || lower === "ls projects" || lower === "ls -la") {
      const rows = projects
        .map(
          (p) =>
            `&gt; drwxr-xr-x samuel staff <span class="text-terminal-green">${escapeHtml(p.path)}</span> <span class="text-terminal-muted">[${escapeHtml(p.category)}]</span>`
        )
        .join("<br/>");
      out = `&gt; total ${projects.length}<br/>${rows}`;
    } else if (lower === "filter" || lower === "filter reset" || lower === "filter clear") {
      setTagFilter("");
      out = "&gt; Tag filter cleared.";
    } else if (lower.startsWith("filter ")) {
      const tag = lower.slice(7).trim();
      const matches = projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(tag)));
      setTagFilter(tag);
      setActiveFilter("All");
      out = matches.length
        ? `&gt; Showing <span class="text-terminal-green font-bold">${matches.length}</span> project(s) using <span class="text-terminal-cyan">${escapeHtml(tag)}</span>`
        : `&gt; No projects use <span class="text-red-400">${escapeHtml(tag)}</span>. Try: react, tailwind, supabase, next.js`;
    } else if (lower === "sort") {
      out = sortAz ? "&gt; Sorting reset to default order." : "&gt; Sorted A-Z.";
      setSortAz(!sortAz);
    } else if (lower === "reset") {
      resetAll();
      out = "&gt; Filters and sorting reset.";
    } else if (lower === "clear") {
      setShowCli(false);
      setCliOutput("");
      return;
    } else {
      out = `<span class="text-red-400 font-semibold">zsh: command not found: ${escapeHtml(cmd)}</span>. Type <span class="text-terminal-green">'help'</span> for reference.`;
    }

    setCliOutput(out);
    setShowCli(true);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    runCommand(cliInput);
    setCliInput("");
  };

  const handleCliKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setCliInput("");
      setShowCli(false);
      setCliOutput("");
    } else if (e.key === "Tab") {
      const value = cliInput.toLowerCase();
      if (!value) return;
      const match = CLI_COMMANDS.find((c) => c.startsWith(value) && c !== value);
      if (match) {
        e.preventDefault();
        setCliInput(match);
      }
    }
  };

  return (
    <section id="projects" className="relative py-10 md:py-20 bg-terminal-bg">
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
            ❯ buildwithsam: ~/projects
          </span>
        </motion.div>

        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm terminal-font overflow-x-auto"
        >
          <span className="text-terminal-green whitespace-nowrap">buildwithsam</span>
          <span className="text-terminal-muted">:</span>
          <span className="text-terminal-cyan whitespace-nowrap">~/projects</span>
          <span className="text-terminal-muted">$</span>
          <span className="text-terminal-text whitespace-nowrap">tree -L 2 --dirsfirst -C ~/projects</span>
          <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor shrink-0"></span>
        </motion.div>

        {/* Tree Output with Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="lg:col-span-8 min-w-0 bg-terminal-bg p-3 md:p-4 rounded border border-terminal-border text-terminal-muted text-xs terminal-font leading-relaxed overflow-x-auto">
            <div className="text-terminal-muted pb-2 text-xs uppercase tracking-wider flex flex-wrap items-center justify-between gap-x-3">
              <span>Directory Tree Index</span>
              <span className="text-terminal-green">
                {projects.length} directories, {projects.length * 3} files
              </span>
            </div>
            <p className="text-terminal-cyan font-semibold">~/projects</p>
            {projects.map((project, i) => (
              <p key={project.id} className="whitespace-nowrap">
                <span className="text-terminal-muted">{i === projects.length - 1 ? "└── " : "├── "}</span>
                <span className="text-terminal-green font-medium">{project.name}</span>
                <span className="text-terminal-muted text-xs ml-2">({project.path})</span>
              </p>
            ))}
          </div>

          {/* Telemetry Bento */}
          <div className="lg:col-span-4 bg-terminal-bg p-3 md:p-4 rounded border border-terminal-border flex flex-col justify-between gap-3 md:gap-4">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs terminal-font text-terminal-muted uppercase tracking-wider mb-2">
                <span>Workspace Analytics</span>
                <div className="flex items-center gap-2">
                  {lastSynced && (
                    <span className="text-terminal-green text-[10px] normal-case tracking-normal">
                      synced {lastSynced}
                    </span>
                  )}
                  <span className="text-terminal-cyan font-semibold">Active Cycle</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs terminal-font text-terminal-muted">Total Commits (30d):</span>
                <span className="text-lg font-bold text-terminal-green">
                  {stats.totalCommits30d.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-14 bg-terminal-bg/50 rounded p-1 flex items-end justify-between gap-1 overflow-hidden">
                {stats.commitChart.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-terminal-green/30 hover:bg-terminal-green transition-colors"
                    style={{ height: `${h}%` }}
                    title={`Day ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-terminal-bg/50 p-2 flex flex-wrap items-center justify-around gap-x-3 gap-y-1 text-xs terminal-font">
              <span className="text-terminal-text">
                <span className="text-terminal-green font-bold">{stats.totalStars.toLocaleString()}</span> Total Stars
              </span>
              <span className="text-terminal-muted hidden sm:inline">|</span>
              <span className="text-terminal-text">
                <span className="text-terminal-cyan font-bold">{stats.totalForks.toLocaleString()}</span> Forks
              </span>
              <span className="text-terminal-muted hidden sm:inline">|</span>
              <span className="text-terminal-text">
                <span className="text-terminal-cyan font-bold">{stats.ciPassing ? `${stats.ciPassing}%` : "—"}</span>{" "}
                CI Passing
              </span>
            </div>
          </div>
        </div>

        {/* Filter Catalog */}
        <div className="flex flex-col gap-3 md:gap-4 pt-2 mb-4 md:mb-6">
          <div className="flex items-center gap-2 text-xs md:text-sm terminal-font flex-wrap">
            <span className="text-terminal-green font-semibold">buildwithsam</span>
            <span className="text-terminal-muted">:</span>
            <span className="text-terminal-cyan font-medium">~/projects</span>
            <span className="text-terminal-muted">$</span>
            <span className="text-terminal-text">filter-catalog --view=cards</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs terminal-font">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-2 md:py-1.5 rounded flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                  activeFilter === f.id
                    ? "bg-terminal-green text-terminal-bg font-bold"
                    : "bg-terminal-border text-terminal-text hover:bg-terminal-green/20"
                }`}
              >
                <span>{activeFilter === f.id ? "[x]" : "[ ]"}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Active CLI filters */}
          {(tagFilter || sortAz) && (
            <div className="flex flex-wrap items-center gap-2 text-xs terminal-font">
              {tagFilter && (
                <button
                  type="button"
                  onClick={() => setTagFilter("")}
                  className="px-2 py-1 rounded bg-terminal-cyan/10 text-terminal-cyan hover:bg-terminal-cyan/20 transition-colors"
                >
                  tag: {tagFilter} ✕
                </button>
              )}
              {sortAz && (
                <button
                  type="button"
                  onClick={() => setSortAz(false)}
                  className="px-2 py-1 rounded bg-terminal-cyan/10 text-terminal-cyan hover:bg-terminal-cyan/20 transition-colors"
                >
                  sorted A-Z ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Project Cards */}
        {filtered.length === 0 ? (
          <div className="terminal-card p-6 text-center text-xs terminal-font text-terminal-muted">
            No projects match the current filters.{" "}
            <button type="button" onClick={resetAll} className="text-terminal-green underline">
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="terminal-card p-3 md:p-4 hover:border-terminal-green/30 transition-all duration-200 group min-w-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs terminal-font text-terminal-muted mb-2 md:mb-3">
                  <span className="text-terminal-muted font-semibold">-rwxr-xr-x 1 samuel staff</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.featured && (
                      <span className="text-terminal-cyan bg-terminal-cyan/10 px-1 rounded">★ FEATURED</span>
                    )}
                    <span className="text-terminal-cyan bg-terminal-cyan/10 px-1 rounded">{project.category}</span>
                  </div>
                </div>

                <div className="mb-2 md:mb-3">
                  <h3 className="text-sm md:text-base font-bold text-terminal-green terminal-font mb-1 md:mb-2">
                    {project.name}
                  </h3>
                  <p className="text-xs terminal-font text-terminal-muted leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4 text-xs terminal-font">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-terminal-border text-terminal-cyan flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal-cyan"></span>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="bg-terminal-bg/50 rounded p-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs terminal-font">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 text-terminal-muted hover:text-terminal-green transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="text-terminal-muted">|</span>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 text-terminal-muted hover:text-terminal-green transition-colors"
                    >
                      Live Demo
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(project.github)}
                    className="p-2 text-terminal-muted hover:text-terminal-green transition-colors"
                    title="Copy GitHub URL"
                    aria-label={`Copy GitHub URL for ${project.name}`}
                  >
                    <Copy size={15} className="text-terminal-cyan" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View all: only relevant when no category or tag filter is active */}
        {isUnfiltered && (
          <div className="text-center mt-8 md:mt-12">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-terminal-text border border-terminal-border bg-terminal-bg hover:bg-terminal-green hover:text-terminal-bg transition-all duration-200"
            >
              {showAll ? "Show Less" : "Show All Projects"}
            </button>
          </div>
        )}

        {/* CLI Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 md:mt-6"
        >
          <form
            onSubmit={handleCliSubmit}
            className="flex items-center gap-2 bg-terminal-bg p-2 md:p-3 rounded border border-terminal-border"
          >
            <div className="hidden md:flex items-center gap-1 text-sm terminal-font">
              <span className="text-terminal-green font-semibold">buildwithsam</span>
              <span className="text-terminal-muted">:</span>
              <span className="text-terminal-cyan font-medium">~/projects</span>
              <span className="text-terminal-muted">$</span>
            </div>
            <input
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              onKeyDown={handleCliKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Projects terminal input"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-terminal-text font-mono text-sm placeholder:text-terminal-muted focus:ring-0 p-0"
              placeholder="Type 'help', 'ls -la projects/', or 'filter react'..."
              spellCheck={false}
              type="text"
            />
            <span
              className="inline-block w-2 h-4 bg-terminal-green pointer-events-none shrink-0"
              style={{ animation: "blink 1s step-end infinite" }}
              id="cli-cursor"
            />
          </form>

          {/* CLI Output */}
          <div
            className={`flex-col gap-1 p-3 bg-terminal-bg rounded border border-terminal-border mt-2 text-xs terminal-font text-terminal-text wrap-break-word ${
              showCli ? "flex" : "hidden"
            }`}
            dangerouslySetInnerHTML={{ __html: cliOutput }}
          />

          <div
            className="text-xs terminal-font text-terminal-muted flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pt-1"
            id="cli-feedback"
          >
            <span>
              Type <kbd className="bg-terminal-border px-1 rounded text-terminal-green">man</kbd> to inspect available
              arguments, or press <kbd className="bg-terminal-border px-1 rounded text-terminal-cyan">Tab</kbd> to
              autocomplete
            </span>
            <span className="text-terminal-muted hidden sm:inline">ESC to clear</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}