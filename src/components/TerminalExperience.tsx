import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface Experience {
  hash: string;
  branch: string;
  tag?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  verified: boolean;
}

const experiences: Experience[] = [
  {
    hash: "f9a2c31",
    branch: "HEAD → main",
    tag: "v2024.present",
    role: "Software Developer & Engineer",
    company: "Ted-prime Hub",
    period: "2024 – Present",
    description:
      "Lead designer and frontend engineer on Veritas's core SaaS platform. Rebuilt the design system from scratch, reducing design debt by 70% and cutting frontend development time by 40%. Architected a new real-time collaboration feature used daily by 50K+ users.",
    tags: ["React", "TypeScript", "Figma", "GraphQL"],
    verified: true,
  },
  {
    hash: "e4b1088",
    branch: "feat/design",
    tag: "v2025.present",
    role: "Motion Graphics Designer",
    company: "Remote",
    period: "2025 – Present",
    description:
      "Owned the full design-to-code pipeline for 4 client products. Established design guidelines that were adopted company-wide. Delivered projects 20% under budget on average by building a robust component library.",
    tags: ["Adobe Photoshop", "Adobe After Effect", "Adobe Premiere pro"],
    verified: true,
  },
  {
    hash: "d1c9204",
    branch: "v2023.2024",
    role: "Frontend Developer",
    company: "Ted-prime Hub",
    period: "2023 – 2024",
    description:
      "Built interactive, animation-rich marketing sites and web apps for startups. Collaborated directly with founders to translate rough ideas into polished, high-converting products.",
    tags: ["React", "GSAP", "CSS", "Webflow"],
    verified: true,
  },
  {
    hash: "a07f321",
    branch: "initial_commit",
    tag: "v2023.2027",
    role: "B.Sc. Software Engineering(in view)",
    company: "Osun State University",
    period: "2023 – 2027",
    description:
      'Graduated with honors. Specialized in Software Engineering. Thesis: "Adaptive UI Systems Driven by User Behavioral Patterns."',
    tags: ["HCI", "Algorithms", "Systems Design"],
    verified: true,
  },
];

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export function TerminalExperience() {
  const [visible, setVisible] = useState<boolean[]>(new Array(experiences.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cliInput, setCliInput] = useState("");
  const [cliOutput, setCliOutput] = useState("");
  const [showCli, setShowCli] = useState(false);
  const [ghStats, setGhStats] = useState({
    contributions: "1,842",
    prs: "42",
    repos: "19",
  });

  useEffect(() => {
    const apiBase = import.meta.env.VITE_EMAIL_API_URL || "http://localhost:4000";
    fetch(`${apiBase}/api/github/stats?owner=Samueladura`)
      .then((res) => (res.ok ? res.json() : Promise.resolve(null)))
      .then((data) => {
        if (data && !data.error) {
          setGhStats({
            contributions: data.totalCommits30d.toLocaleString(),
            prs: data.totalForks.toLocaleString(),
            repos: String(data.totalRepos),
          });
        }
      })
      .catch(() => {
        // keep fallback on network error
      });
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timers.push(
              setTimeout(() => {
                setVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 150)
            );
          }
        },
        // Low threshold so tall cards on small screens still trigger
        { threshold: 0.05 }
      );
      observer.observe(el);
      return observer;
    });
    return () => {
      observers.forEach((obs) => obs?.disconnect());
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = cliInput.trim();
    if (!val) return;
    setShowCli(true);

    if (val === "help") {
      setCliOutput(
        'Available Commands:<br/>• <span class="text-terminal-cyan">show all</span> : View all experience entries<br/>• <span class="text-terminal-cyan">clear</span> : Clear standard terminal output'
      );
    } else if (val === "clear") {
      setShowCli(false);
      setCliOutput("");
    } else if (val === "show all") {
      setCliOutput(
        `<span class="text-terminal-green font-bold">Showing all experience entries</span><br/><span class="text-terminal-muted">${experiences.length} entries found in career.git</span>`
      );
    } else {
      setCliOutput(
        `<span class="text-red-400 font-semibold">zsh: command not found: ${escapeHtml(val)}</span>. Type <span class="text-terminal-green">'help'</span> for reference.`
      );
    }
    setCliInput("");
  };

  return (
    <section id="experience" className="relative py-10 md:py-20 bg-terminal-bg">
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
            ❯ buildwithsam: ~/experience
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
          <span className="text-terminal-cyan whitespace-nowrap">~/experience</span>
          <span className="text-terminal-muted">$</span>
          <span className="text-terminal-text whitespace-nowrap">
            git log --graph --pretty=format:"%h - %an, %ar : %s" career/
          </span>
          <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor shrink-0"></span>
        </motion.div>

        {/* Repository info */}
        <div className="terminal-card p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs terminal-font text-terminal-muted">
            <span>
              repository: <span className="text-terminal-green">career.git</span>
            </span>
            <span>
              encoding: <span className="text-terminal-cyan">utf-8</span>
            </span>
            <span>
              commits: <span className="text-terminal-green">{experiences.length}</span>
            </span>
            <span>
              branches: <span className="text-terminal-cyan">main, feat/design</span>
            </span>
          </div>
        </div>

        {/* Experience timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left - Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6 min-w-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.hash}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={visible[i] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="terminal-card p-4 md:p-6 hover:border-terminal-green/30 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Graph line: hidden on phones to save width */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div className="text-terminal-green text-xs terminal-font mt-1">│</div>
                    <div className="text-terminal-green text-xs terminal-font">╰──</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Commit header */}
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs terminal-font text-terminal-green">* {exp.hash}</span>
                          {exp.tag && <span className="text-xs terminal-font text-terminal-cyan">({exp.tag})</span>}
                          <span className="text-xs terminal-font text-terminal-muted">({exp.branch})</span>
                        </div>
                        <h3 className="text-base font-bold text-terminal-text terminal-font">{exp.role}</h3>
                        <div className="text-sm text-terminal-green terminal-font">{exp.company}</div>
                      </div>
                      <div className="text-xs terminal-font text-terminal-muted sm:text-right sm:shrink-0">
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-xs md:text-sm terminal-font text-terminal-muted leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs terminal-font text-terminal-muted border border-terminal-border hover:border-terminal-green/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {exp.verified && (
                      <div className="flex items-center gap-2 text-xs terminal-font text-terminal-green">
                        <span>✓ verified commit</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6 min-w-0">
            {/* GitHub Stats */}
            <div className="terminal-card p-3 md:p-4">
              <div className="flex items-center gap-2 mb-3 md:mb-4 text-xs md:text-sm terminal-font text-terminal-green font-semibold flex-wrap">
                <span className="text-terminal-cyan">terminal</span>
                github --stats --user=samuel
              </div>
              <div className="flex flex-col gap-3">
                {[
                  ["Annual Contributions", ghStats.contributions, "text-terminal-green"],
                  ["Upstream PRs Merged", ghStats.prs, "text-terminal-cyan"],
                  ["Active Repositories", ghStats.repos, "text-terminal-text"],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-2 p-2 rounded bg-terminal-bg/50 text-xs terminal-font"
                  >
                    <span className="text-terminal-muted">{label}</span>
                    <span className={`${color} font-bold`}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1 text-xs terminal-font gap-2">
                  <span className="text-terminal-muted">CONTRIBUTION ACTIVITY</span>
                  <span className="text-terminal-green font-semibold shrink-0">Q1-Q4 2024</span>
                </div>
                <div className="grid grid-cols-12 gap-1 p-2 rounded bg-terminal-bg/50">
                  {[20, 50, 100, 30, 100, 80, 100, 40, 90, 100, 70, 100].map((opacity, i) => (
                    <div key={i} className="h-3 rounded bg-terminal-green" style={{ opacity: opacity / 100 }} />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 text-xs terminal-font text-terminal-muted">
                <div className="text-terminal-muted font-semibold">CORE UPSTREAM MERGES:</div>
                {[
                  ["rust-lang/rust-clippy", "(18 PRs)"],
                  ["tokio-rs/tokio", "(14 PRs)"],
                  ["helm/helm", "(10 PRs)"],
                ].map(([repo, prs]) => (
                  <div key={repo} className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-terminal-green">✓</span>
                    <span>{repo}</span>
                    <span className="text-terminal-muted">{prs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="terminal-card p-3 md:p-4">
              <div className="flex items-center justify-between gap-2 mb-3 md:mb-4 text-xs md:text-sm terminal-font">
                <span className="text-terminal-cyan font-semibold truncate">sysctl -a | grep perf</span>
                <span className="text-terminal-muted text-xs shrink-0">PID 4108</span>
              </div>
              <div className="space-y-2 md:space-y-3 text-xs terminal-font">
                {[
                  ["Concurrency & Locks", "98%", "text-terminal-green"],
                  ["Distributed Storage (Raft/Paxos)", "92%", "text-terminal-cyan"],
                  ["Memory Reclamation & Zero-Copy", "95%", "text-terminal-green"],
                ].map(([label, pct, color]) => (
                  <div key={label}>
                    <div className="flex justify-between gap-2 text-terminal-muted mb-1">
                      <span>{label}</span>
                      <span className={`${color} shrink-0`}>{pct}</span>
                    </div>
                    <div className="w-full bg-terminal-bg rounded h-1.5">
                      <div className={`${color} h-1.5 rounded`} style={{ width: pct }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 rounded bg-terminal-bg/50 mt-3 text-xs terminal-font text-terminal-muted leading-relaxed">
                <span className="text-terminal-green font-bold">STATUS:</span> Actively reviewing kernel patch
                submissions and distributed consensus RFCs.
              </div>
            </div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="terminal-card p-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Download size={16} className="text-terminal-cyan shrink-0" />
                <span className="text-xs md:text-sm terminal-font text-terminal-text break-all">
                  Babayemi_Ayomide_Samuel_Resume.pdf
                </span>
              </div>
              <a
                href="/Babayemi_Ayomide_Samuel_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-terminal-border hover:bg-terminal-green hover:text-terminal-bg text-terminal-green transition-colors px-3 py-2 md:py-1 rounded text-xs terminal-font text-center shrink-0"
              >
                cat resume
              </a>
            </motion.div>
          </div>
        </div>

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
            className="flex flex-col md:flex-row md:items-center gap-2 bg-terminal-bg p-3 rounded border border-terminal-border"
          >
            <div className="flex items-center gap-1 text-xs md:text-sm terminal-font overflow-x-auto whitespace-nowrap">
              <span className="text-terminal-green font-bold">buildwithsam</span>
              <span className="text-terminal-muted">:</span>
              <span className="text-terminal-cyan font-semibold">~/experience</span>
              <span className="text-terminal-muted">$</span>
            </div>
            <input
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Experience terminal input"
              className="flex-1 min-w-0 w-full bg-transparent border-0 outline-none text-terminal-text font-mono text-xs md:text-sm placeholder:text-terminal-muted focus:ring-0 p-0"
              placeholder="type 'help', 'show all', or press Enter..."
              spellCheck={false}
              type="text"
            />
            <span
              className="w-2 h-4 bg-terminal-green pointer-events-none hidden md:inline-block"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </form>

          <div
            className={`rounded border border-terminal-border mt-2 p-4 text-xs terminal-font text-terminal-text wrap-break-word transition-all ${
              showCli ? "flex flex-col gap-1 bg-terminal-bg" : "hidden"
            }`}
            dangerouslySetInnerHTML={{ __html: cliOutput }}
          />
        </motion.div>
      </div>
    </section>
  );
}