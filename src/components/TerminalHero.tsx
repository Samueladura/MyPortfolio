import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DEFAULT_ACCENT, getSavedAccent, setAccent } from "./Theme";

const bannerArt = `
███████╗ █████╗ ███╗   ███╗██╗   ██╗███████╗██╗     
██╔════╝██╔══██╗████╗ ████║██║   ██║██╔════╝██║     
███████╗███████║██╔████╔██║██║   ██║█████╗  ██║     
╚════██║██╔══██║██║╚██╔╝██║██║   ██║██╔══╝  ██║     
███████║██║  ██║██║ ╚═╝ ██║╚██████╔╝███████╗███████╗
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚══════╝
`;

const neofetchArt = `
       .---.
      /     \\
     | () () |
      \\  -  /
     .-'---'-.
    / /     \\ \\
   / / |   | \\ \\
  / /  |   |  \\ \\
 ( (   |   |   ) )
  \\ \\  |   |  / /
   \\ \\_|___|_/ /
    \\_________/
     |   |   |
     |   |   |
     (___|___)
`;

const skillCategories = [
  {
    title: "DESIGN",
    icon: "🎨",
    label: "CREATIVE",
    color: "text-terminal-green",
    skills: [
      { name: "Figma", level: "[█████████░] 65%" },
      { name: "UI/UX Design", level: "[████████░░] 60%" },
      { name: "Graphic Design", level: "[██████████] 80%" },
      { name: "Prototyping", level: "[██████████] 70%" },
      { name: "Motion Design", level: "[██████████] 80%" },
    ],
  },
  {
    title: "FRONTEND",
    icon: "⟨/⟩",
    label: "CLIENT",
    color: "text-terminal-cyan",
    skills: [
      { name: "React / Next.js", level: "[██████████] 95%" },
      { name: "TypeScript", level: "[██████████] 92%" },
      { name: "Tailwind CSS", level: "[██████████] 94%" },
      { name: "Vue.js", level: "[████████░░] 80%" },
      { name: "Angular", level: "[████████░░] 70%" },
    ],
  },
  {
    title: "BACKEND",
    icon: "⚙",
    label: "SERVER",
    color: "text-terminal-cyan",
    skills: [
      { name: "Node.js / Express", level: "[██████████] 90%" },
      { name: "PostgreSQL", level: "[█████████░] 84%" },
      { name: "MongoDB", level: "[████████░░] 80%" },
      { name: "Python", level: "[████████░░] 76%" },
      { name: "MySQL", level: "[████████░░] 74%" },
    ],
  },
];

const shortcuts = [
  { cmd: "help", label: "System manual", icon: "terminal", color: "text-terminal-green" },
  { cmd: "ls -la projects/", label: "List repos", icon: "folder_open", color: "text-terminal-cyan" },
  { cmd: "cat experience.log", label: "Career log", icon: "history", color: "text-terminal-cyan" },
  { cmd: 'mail -s "Hire Me"', label: "Send dispatch", icon: "mail", color: "text-red-400" },
  { cmd: "curl -s resume.pdf", label: "Raw resume", icon: "download", color: "text-terminal-green" },
  { cmd: "uptime && uname -a", label: "Arch kernel", icon: "info", color: "text-terminal-green" },
];

// Your real projects (same entries as TerminalProjects), used by the `ls` / `filter` / `sort` commands.
const projects = [
  { name: "Axiomtracker", path: "Axiomtracker/", category: "Web App", tags: ["React", "Supabase", "Node.js/Express", "Tailwind"] },
  { name: "Alivio", path: "Alivio/", category: "Personalized guidance", tags: ["TypeScript", "Storybook", "Figma", "Tailwind"] },
  { name: "eStudy", path: "eStudy/", category: "Study App", tags: ["Next.js", "Tailwind CSS"] },
  { name: "Gopherscents", path: "Gopherscents/", category: "Commercial website", tags: ["Next.js", "My SQL", "PHP", "Tailwind CSS"] },
  { name: "FinanceOS", path: "FinanceOS/", category: "FinTech", tags: ["React", "Supabase", "Tailwind"] },
];

// Used for Tab autocomplete in the terminal
const CLI_COMMANDS = [
  "help",
  "man",
  "ls -la projects/",
  "filter ",
  "sort",
  "reset",
  "clear",
  "theme ",
  "cd .secret",
  "cd ..",
  "ls -la .secret/",
  "cat manifesto.txt",
  "cat tech_preferences.txt",
  "cat fun_facts.txt",
];

const secretFiles = {
  "manifesto.txt": `> Write simple code that executes fast and rarely breaks.
> 
> I believe the best software is built at the intersection of empathy,
> craftsmanship, and technical excellence. Every project I take on,
> I bring a designer's eye and an engineer's discipline to ensure
> the result is both beautiful and bulletproof.
> 
> — buildwithsam`,
  "tech_preferences.txt": `> PREFERRED STACK:
>   Runtime:   Node.js / Bun
>   Frontend:  React, Next.js, TypeScript, Tailwind CSS
>   Backend:   Express, Fastify, Supabase, PostgreSQL
>   Design:    Figma, Storybook, Framer Motion
>   DevOps:   Docker, GitHub Actions, Vercel
> 
> I avoid over-engineering. If a simpler solution exists,
> I choose it—unless the complex one is measurably better.`,
  "fun_facts.txt": `> • I can name every country in the world from memory.
> • My first program was a QBASIC adventure game.
> • I once debugged a production issue while on a 12-hour bus ride.
> • I drink exactly 2 cups of coffee before writing any code.
> • I contribute to open source because the internet gave me free lessons.
> • I have a rubber duck on my desk. We pair-program often.`,
};

const secretDirListing = [
  { name: "manifesto.txt", perms: "-rw-r--r--", size: "1.2KB" },
  { name: "tech_preferences.txt", perms: "-rw-r--r--", size: "0.8KB" },
  { name: "fun_facts.txt", perms: "-rw-r--r--", size: "0.5KB" },
  { name: "hidden_gem.log", perms: "-rw-------", size: "0.1KB" },
];

// Built once from the data above, so the listing is defined in a single place.
const secretLsOutput =
  "&gt; total 4<br/>" +
  secretDirListing
    .map((f) => `&nbsp;&nbsp;&nbsp;${f.perms} 1 buildwithsam staff ${f.size} ${f.name}`)
    .join("<br/>");

// Clicking a swatch sets the site's accent color. The black swatch resets to the default theme.
const palette = [
  { bg: "bg-[#0d1117]", hex: "#0d1117", label: "Reset", reset: true },
  { bg: "bg-[#f87171]", hex: "#f87171", label: "Red" },
  { bg: "bg-[#00ff88]", hex: "#00ff88", label: "Green" },
  { bg: "bg-[#facc15]", hex: "#facc15", label: "Yellow" },
  { bg: "bg-[#00e5ff]", hex: "#00e5ff", label: "Cyan" },
  { bg: "bg-[#c084fc]", hex: "#c084fc", label: "Magenta" },
  { bg: "bg-[#00cc6a]", hex: "#00cc6a", label: "Dim green" },
  { bg: "bg-[#e5e7eb]", hex: "#e5e7eb", label: "White" },
];

const telemetry = [
  ["Production Nodes", "1,480+", "text-terminal-green"],
  ["P99 Query Latency", "&lt;1.8ms", "text-terminal-green"],
  ["Total MTBF Target", "99.999%", "text-terminal-green"],
  ["Core Locality", "Nigeria / Remote", "text-terminal-text"],
];

const MAIL_HREF = "mailto:babayemiayomide87@gmail.com?subject=Inquiry%20from%20Portfolio%20CLI";

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);

type Row = [label: string, value: string];

interface NavigatorExtras extends Navigator {
  deviceMemory?: number;
  userAgentData?: { platform?: string };
}

function parseOS(ua: string): string {
  if (/Windows NT 10/.test(ua)) return "Windows 10/11";
  if (/Windows/.test(ua)) return "Windows";
  const android = ua.match(/Android ([\d.]+)/);
  if (android) return `Android ${android[1]}`;
  const ios = ua.match(/OS (\d+)[_\d]* like Mac OS X/);
  if (ios) return `iOS ${ios[1]}`;
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/CrOS/.test(ua)) return "ChromeOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown OS";
}

function parseBrowser(ua: string): string {
  const pick = (re: RegExp, name: string) => {
    const m = ua.match(re);
    return m ? `${name} ${m[1]}` : null;
  };
  return (
    pick(/Edg\/(\d+)/, "Edge") ||
    pick(/OPR\/(\d+)/, "Opera") ||
    pick(/Firefox\/(\d+)/, "Firefox") ||
    pick(/Chrome\/(\d+)/, "Chrome") ||
    pick(/Version\/(\d+).*Safari/, "Safari") ||
    "Unknown browser"
  );
}

function parseDevice(ua: string): string {
  if (/iPad|Tablet/.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone/.test(ua)) return "Mobile device";
  return "Desktop / Laptop";
}

function formatUptime(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  return `${d}d, ${h}h, ${m}m`;
}

function useSystemInfo(): Row[] {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const t = setInterval(() => setElapsed(Date.now() - start), 30000);
    return () => clearInterval(t);
  }, []);

  const nav = navigator as NavigatorExtras;
  const ua = nav.userAgent;
  const dpr = window.devicePixelRatio || 1;
  const width = Math.round(window.screen.width * dpr);
  const height = Math.round(window.screen.height * dpr);
  const cores = nav.hardwareConcurrency;
  const memory = nav.deviceMemory;

  return [
    ["OS:", parseOS(ua)],
    ["Host:", parseDevice(ua)],
    ["Kernel:", nav.userAgentData?.platform || nav.platform || "unknown"],
    ["Uptime:", formatUptime(elapsed)],
    ["Shell:", parseBrowser(ua)],
    ["Resolution:", `${width}x${height} @ ${dpr}x`],
    ["WM:", Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown"],
    ["Terminal:", nav.language || "unknown"],
    ["CPU:", cores ? `${cores} logical cores` : "unknown"],
    ["Memory:", memory ? `${memory >= 8 ? "8+" : memory} GB` : "not exposed"],
  ];
}

interface HeapStats {
  used: number;
  limit: number;
}

// performance.memory exists in Chromium browsers only (Chrome, Edge, Opera, Brave).
function readHeap(): HeapStats | null {
  const mem = (
    performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }
  ).memory;
  return mem ? { used: mem.usedJSHeapSize, limit: mem.jsHeapSizeLimit } : null;
}

// Lives in its own component so the 5-second refresh doesn't re-render the whole hero.
function MemoryBar() {
  const [heap, setHeap] = useState<HeapStats | null>(readHeap);

  useEffect(() => {
    if (!readHeap()) return;
    const t = setInterval(() => setHeap(readHeap()), 5000);
    return () => clearInterval(t);
  }, []);

  if (!heap) {
    return (
      <div className="w-full bg-terminal-bg p-2 rounded text-xs terminal-font text-terminal-muted mt-2">
        JS HEAP: not exposed by this browser
      </div>
    );
  }

  const mb = (n: number) => `${Math.round(n / 1048576)} MB`;
  const pct = Math.min(100, (heap.used / heap.limit) * 100);

  return (
    <div className="w-full bg-terminal-bg p-2 rounded flex flex-col gap-1 mt-2">
      <div className="flex justify-between gap-2 text-xs terminal-font text-terminal-muted">
        <span>JS HEAP</span>
        <span>
          {pct.toFixed(1)}% USED · {mb(heap.used)} / {mb(heap.limit)}
        </span>
      </div>
      <div className="w-full bg-terminal-border h-2 rounded overflow-hidden">
        <div className="bg-terminal-cyan h-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function PromptLine({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 md:mb-4 text-xs md:text-sm terminal-font overflow-x-auto whitespace-nowrap">
      <span className="text-terminal-green font-semibold">buildwithsam</span>
      <span className="text-terminal-muted">:</span>
      <span className="text-terminal-cyan font-medium">~</span>
      <span className="text-terminal-muted">$</span>
      <span className="text-terminal-text">{command}</span>
    </div>
  );
}

export function TerminalHero() {
  const [cliOutput, setCliOutput] = useState<string>("");
  const [showCli, setShowCli] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [tagFilter, setTagFilter] = useState("");
  const [sortAz, setSortAz] = useState(false);
  const [accent, setAccentState] = useState<string>(getSavedAccent());
  const [themeNote, setThemeNote] = useState<string | null>(null);
  const [inSecret, setInSecret] = useState(false);
  const noteTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const systemInfo = useSystemInfo();

  useEffect(() => () => clearTimeout(noteTimer.current), []);

  // Projects shown by the terminal after filter / sort
  let visibleProjects = projects.filter(
    (p) => !tagFilter || p.tags.some((t) => t.toLowerCase().includes(tagFilter))
  );
  if (sortAz) visibleProjects = [...visibleProjects].sort((a, b) => a.name.localeCompare(b.name));

  const applyTheme = (swatch: (typeof palette)[number]) => {
    const hex = swatch.reset ? DEFAULT_ACCENT : swatch.hex;
    setAccent(hex);
    setAccentState(hex);
    setThemeNote(swatch.reset ? "Theme reset to default" : `Theme: ${swatch.label} ${swatch.hex}`);
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setThemeNote(null), 2500);
  };

  const dispatchCLI = (cmd: string) => {
    const clean = cmd.toLowerCase().trim();
    let output = "";
    if (clean === "help" || clean === "man") {
      output =
        '&gt; Available executable commands:<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-green font-bold">ls -la projects/</span> : List all repositories<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">filter &lt;tag&gt;</span> : Show projects using a technology (e.g. filter react)<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">sort</span> : Toggle A-Z ordering<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-text font-bold">reset</span> : Clear all filters and sorting<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">cat bio.md</span> : Read full background summary<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">cat experience.log</span> : View 8+ years engineering tenure<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-text font-bold">mail -s "Hire Me"</span> : Open primary email client<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-green font-bold">theme &lt;color&gt;</span> : Change the site color (red, yellow, cyan, magenta, white, reset)<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-green font-bold">cd .secret</span> : Enter hidden directory<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">cat manifesto.txt</span> : Read personal manifesto (in .secret)<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">cat tech_preferences.txt</span> : Read tech stack preferences (in .secret)<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-cyan font-bold">cat fun_facts.txt</span> : Read fun facts (in .secret)<br/>&nbsp;&nbsp;&bull; <span class="text-terminal-muted font-bold">clear</span> : Clear this output';
    } else if (
      clean === "ls projects" ||
      clean === "ls -la projects" ||
      clean === "ls -la projects/" ||
      // Plain `ls` lists projects only when you're NOT inside .secret
      (!inSecret && (clean === "ls" || clean === "ls -la"))
    ) {
      output = `&gt; total ${projects.length}`;
      setShowProjects(true);
    } else if (clean === "filter" || clean === "filter reset" || clean === "filter clear") {
      setTagFilter("");
      output = "&gt; Tag filter cleared.";
      setShowProjects(true);
    } else if (clean.startsWith("filter ")) {
      const tag = clean.slice(7).trim();
      const matches = projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(tag)));
      setTagFilter(tag);
      setShowProjects(true);
      output = matches.length
        ? `&gt; Showing <span class="text-terminal-green font-bold">${matches.length}</span> project(s) using <span class="text-terminal-cyan">${escapeHtml(tag)}</span>`
        : `&gt; No projects use <span class="text-red-400">${escapeHtml(tag)}</span>. Try: react, tailwind, supabase, next.js`;
    } else if (clean === "sort") {
      output = sortAz ? "&gt; Sorting reset to default order." : "&gt; Sorted A-Z.";
      setSortAz(!sortAz);
      setShowProjects(true);
    } else if (clean === "reset") {
      setTagFilter("");
      setSortAz(false);
      setInSecret(false);
      output = "&gt; Filters and sorting reset.";
    } else if (clean.startsWith("theme")) {
      const name = clean.replace("theme", "").trim();
      const swatch = palette.find(
        (p) => p.label.toLowerCase() === name || (name === "default" && p.reset)
      );
      if (swatch) {
        applyTheme(swatch);
        output = `&gt; Theme set to <span class="text-terminal-green font-bold">${swatch.label}</span>`;
      } else {
        output = "&gt; Usage: theme &lt;red|green|yellow|cyan|magenta|white|reset&gt;";
      }
    } else if (clean.includes("clear")) {
      setShowCli(false);
      setShowProjects(false);
      setCliOutput("");
      setInSecret(false);
      return;
    } else if (clean.includes("mail")) {
      output =
        "&gt; Initiating mailto:buildwithsam.internal...<br/>&gt; Protocol dispatch handed off to client user-agent.";
      setTimeout(() => {
        window.location.href = MAIL_HREF;
      }, 500);
    } else if (clean.includes("resume")) {
      output =
        '&gt; HTTP/2 200 OK<br/>&gt; Content-Type: application/pdf [Content-Length: 142.6KB]<br/>&gt; Resume download completed. Link: <a href="/Babayemi_Ayomide_Samuel_Resume.pdf" class="underline text-terminal-cyan" target="_blank" rel="noopener noreferrer">Babayemi_Ayomide_Samuel_Resume.pdf</a>';
    } else if (clean.includes("uname")) {
      output =
        "&gt; Linux devbox 6.8.9-zen1-1-zen #1 ZEN SMP PREEMPT_DYNAMIC SMP PREEMPT Tue, 02 May 2024 16:32:01 +0000 x86_64 GNU/Linux";
    } else if (clean === "cd .secret" || clean === "cd .secret/") {
      setInSecret(true);
      // Template literal (backticks) so the double quotes in class="..." don't end the string.
      output = `&gt; cd .secret<br/>&gt; ~/.secret $ ls -la<br/>${secretLsOutput}<br/><br/>&gt; Type <span class="text-terminal-cyan">cat &lt;filename&gt;</span> to read a file.`;
    } else if (clean === "cd ..") {
      setInSecret(false);
      output = "&gt; cd ..<br/>&gt; ~ $";
    } else if (
      clean === "ls -la .secret" ||
      clean === "ls -la .secret/" ||
      clean === "ls .secret" ||
      (inSecret && (clean === "ls" || clean === "ls -la"))
    ) {
      output = secretLsOutput;
    } else if (clean.startsWith("cat ") && inSecret) {
      const file = clean.slice(4).trim();
      const content = secretFiles[file as keyof typeof secretFiles];
      if (content) {
        // Files already start each line with "> ", so strip it and let the prompt marker be added once.
        const body = content
          .split("\n")
          .map((line) => `&gt; ${escapeHtml(line.replace(/^> ?/, ""))}`)
          .join("<br/>");
        output = `&gt; --- ${escapeHtml(file)} ---<br/>${body}`;
      } else {
        output = `&gt; cat: ${escapeHtml(file)}: No such file in .secret/. Try: manifesto.txt, tech_preferences.txt, fun_facts.txt`;
      }
    } else {
      output = `&gt; zsh: command not found: ${escapeHtml(cmd)}<br/>&gt; Type 'help' for available CLI directives.`;
    }
    setCliOutput(output);
    setShowCli(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input || !input.value.trim()) return;
    dispatchCLI(input.value.trim());
    input.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (e.key === "Escape") {
      input.value = "";
      setShowCli(false);
      setShowProjects(false);
      setCliOutput("");
    } else if (e.key === "Tab") {
      const value = input.value.toLowerCase();
      if (!value) return; // let Tab move focus normally when the box is empty
      const match = CLI_COMMANDS.find((c) => c.startsWith(value) && c !== value);
      if (match) {
        e.preventDefault();
        input.value = match;
      }
    }
  };

  const handleShortcut = (cmd: string) => {
    if (cmd === "ls -la projects/") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === "cat experience.log") {
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === 'mail -s "Hire Me"') {
      window.location.href = MAIL_HREF;
    } else {
      dispatchCLI(cmd);
    }
  };

  return (
    <section id="hero" className="relative py-8 md:py-20 bg-terminal-bg">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <span className="text-terminal-green text-xs terminal-font tracking-widest">
            ❯ buildwithsam: ~/portfolio
          </span>
        </motion.div>

        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4 md:mb-6 text-sm terminal-font overflow-x-auto"
        >
          <span className="text-terminal-green">buildwithsam</span>
          <span className="text-terminal-muted">:</span>
          <span className="text-terminal-cyan">{inSecret ? "~/.secret" : "~"}</span>
          <span className="text-terminal-muted">$</span>
          <span className="text-terminal-text">neofetch</span>
          <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor shrink-0"></span>
        </motion.div>

        {/* Main terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="terminal-card overflow-hidden"
        >
          {/* Banner Section */}
          <div className="p-3 md:p-6 border-b border-terminal-border">
            <PromptLine command="banner --phosphor-glow" />
            <div className="bg-terminal-bg rounded p-2 md:p-4 overflow-x-auto shadow-inner">
              <pre
                className="text-terminal-green font-bold leading-none select-none"
                style={{
                  textShadow: "0 0 12px color-mix(in srgb, var(--terminal-green) 45%, transparent)",
                  fontSize: "clamp(5px, 2.2vw, 10px)",
                }}
              >
                {bannerArt}
              </pre>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mt-3 pt-2 text-[10px] sm:text-xs terminal-font text-terminal-muted">
                <span>TTY session #0412 • VT100 UTF-8 EMULATOR</span>
                <span className="text-terminal-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal-green inline-block"></span>
                  STABLE_LINK_OK
                </span>
              </div>
            </div>
          </div>

          {/* Neofetch Section */}
          <div className="p-3 md:p-6 border-b border-terminal-border">
            <PromptLine command="neofetch" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
              {/* Left - ASCII art and palette */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start p-3 md:p-4 bg-terminal-bg/50 rounded">
                {/* Hidden on phones to save vertical space */}
                <pre className="hidden sm:block text-terminal-cyan font-semibold leading-tight select-none text-[10px] md:text-xs">
                  {neofetchArt}
                </pre>
                <div className="w-full flex flex-col gap-2 sm:mt-4">
                  <span className="text-xs terminal-font text-terminal-muted uppercase tracking-wider">
                    Color Palette Swatches
                  </span>
                  <div className="grid grid-cols-8 gap-1.5 w-full h-8 md:h-6">
                    {palette.map((swatch) => {
                      const isActive = !swatch.reset && accent.toLowerCase() === swatch.hex;
                      return (
                        <button
                          key={swatch.label}
                          type="button"
                          onClick={() => applyTheme(swatch)}
                          className={`${swatch.bg} w-full h-full rounded border cursor-pointer transition-transform hover:scale-110 active:scale-95 relative ${
                            isActive
                              ? "border-white ring-2 ring-white/70"
                              : "border-terminal-muted/40"
                          }`}
                          title={swatch.reset ? "Reset to default theme" : `Switch site color to ${swatch.label}`}
                          aria-label={
                            swatch.reset ? "Reset theme to default" : `Switch site color to ${swatch.label}`
                          }
                          aria-pressed={isActive}
                        >
                          {swatch.reset && (
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-terminal-muted">
                              ↺
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="min-h-4 text-xs terminal-font text-terminal-muted" aria-live="polite">
                    {themeNote ?? "Click a swatch to change the site color"}
                  </div>
                </div>
              </div>

              {/* Right - System info */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-4 min-w-0">
                <div className="flex items-baseline gap-2 pb-2 min-w-0">
                  <span className="text-terminal-green font-bold text-base md:text-lg">samuel</span>
                  <span className="text-terminal-muted">@</span>
                  <span className="text-terminal-cyan font-bold text-base md:text-lg">buildwithsam</span>
                  <span className="text-terminal-muted text-xs ml-auto hidden sm:inline">
                    ----------------------------
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 md:gap-x-4 gap-y-1 text-xs terminal-font">
                  {systemInfo.map(([label, value]) => (
                    <div key={label} className="flex items-center gap-2 min-w-0">
                      <span className="text-terminal-green font-semibold w-20 sm:w-24 shrink-0">{label}</span>
                      <span className="text-terminal-text truncate">{value}</span>
                    </div>
                  ))}
                </div>
                <MemoryBar />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="p-3 md:p-6 border-b border-terminal-border">
            <PromptLine command="cat bio.md" />
            <div className="bg-terminal-bg/50 rounded p-3 md:p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs terminal-font text-terminal-muted pb-2 mb-3 md:mb-4">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-terminal-cyan" style={{ fontSize: "16px" }}>
                    description
                  </span>
                  bio.md [rw-r--r--] 1.2KB
                </span>
                <span className="text-terminal-cyan">MARKDOWN RENDERED</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                <div className="md:col-span-8 flex flex-col gap-3 md:gap-4">
                  <p className="text-xs md:text-sm terminal-font text-terminal-text leading-relaxed">
                    I'm a software designer and developer with over 5 years of experience building products that
                    people love to use. My work spans the full spectrum from pixel-perfect UI design to architecting
                    scalable backend systems. I believe great software is built at the intersection of empathy,
                    craftsmanship, and technical excellence. Every project I take on, I bring a designer's eye and an
                    engineer's discipline to ensure the result is both beautiful and bulletproof. When I'm not coding,
                    you'll find me exploring design systems, contributing to open source, or mentoring the next
                    generation of developers.
                  </p>
                  <div className="p-2 md:p-3 bg-terminal-bg rounded-l-md pl-3 md:pl-4">
                    <span className="text-xs terminal-font text-terminal-muted uppercase block mb-0.5">
                      Philosophy // Axiom
                    </span>
                    <span className="text-sm terminal-font text-terminal-green font-semibold italic">
                      "Write simple code that executes fast and rarely breaks."
                    </span>
                  </div>
                </div>
                <div className="md:col-span-4 bg-terminal-bg/30 p-2 md:p-3 flex flex-col gap-1 md:gap-2">
                  <span className="text-xs terminal-font text-terminal-cyan font-semibold uppercase">
                    Cluster Telemetry
                  </span>
                  {telemetry.map(([label, value, color]) => (
                    <div key={label} className="flex justify-between gap-2 text-xs terminal-font text-terminal-muted">
                      <span>{label}</span>
                      <span className={color} dangerouslySetInnerHTML={{ __html: value }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="p-3 md:p-6 border-b border-terminal-border">
            <PromptLine command="skills --matrix --visual" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="bg-terminal-bg/50 rounded p-3 md:p-4">
                  <div className="flex items-center justify-between pb-2 mb-2">
                    <span className={`text-xs terminal-font ${cat.color} font-bold flex items-center gap-1`}>
                      <span className="text-terminal-cyan">{cat.icon}</span>
                      {cat.title}
                    </span>
                    <span className="text-xs terminal-font text-terminal-muted">{cat.label}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:gap-2 text-xs terminal-font">
                    {cat.skills.map((item) => (
                      <div key={item.name} className="flex justify-between items-center gap-2">
                        <span className="text-terminal-text font-medium truncate">{item.name}</span>
                        <span className={`font-mono whitespace-nowrap text-[10px] sm:text-xs ${cat.color}`}>
                          {item.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-3 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <span className="text-xs terminal-font text-terminal-muted flex items-center gap-1">
                <span className="material-symbols-outlined text-terminal-cyan" style={{ fontSize: "16px" }}>
                  flash_on
                </span>
                QUICK LAUNCH SHORTCUTS
              </span>
              <span className="text-xs terminal-font text-terminal-muted hidden sm:inline">
                Click any badge to invoke
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {shortcuts.map((item) => (
                <button
                  key={item.cmd}
                  onClick={() => handleShortcut(item.cmd)}
                  className="terminal-card p-3 text-left hover:border-terminal-green/30 transition-all duration-150 flex items-center justify-between gap-2 group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`material-symbols-outlined ${item.color}`} style={{ fontSize: "18px" }}>
                      {item.icon}
                    </span>
                    <span className="text-xs text-terminal-text font-mono group-hover:text-terminal-green transition-colors truncate">
                      {item.cmd}
                    </span>
                  </div>
                  <span className="text-xs terminal-font text-terminal-muted group-hover:text-terminal-text transition-colors shrink-0">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CLI Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 md:mt-6"
        >
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-terminal-bg p-2 md:p-3 rounded border border-terminal-border"
          >
            <label className="hidden md:flex items-center gap-1 text-sm terminal-font select-none shrink-0">
              <span className="text-terminal-green font-bold">buildwithsam</span>
              <span className="text-terminal-muted">:</span>
              <span className="text-terminal-cyan font-medium">{inSecret ? "~/.secret" : "~"}</span>
              <span className="text-terminal-muted">$</span>
            </label>
            <div className="relative flex-1 min-w-0 flex items-center">
              <input
                ref={inputRef}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="Terminal command input"
                className="w-full bg-transparent border-0 outline-none text-terminal-text font-mono text-sm placeholder:text-terminal-muted focus:ring-0 p-0"
                placeholder="type commands ('help', 'ls -la projects/', 'filter react')..."
                spellCheck={false}
                type="text"
              />
              <span
                className="inline-block w-2.5 h-4 bg-terminal-green ml-0.5 pointer-events-none"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            </div>
            <button
              type="submit"
              className="bg-terminal-border hover:bg-terminal-green/20 text-terminal-green px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 shrink-0"
            >
              <span>RUN</span>
              <span className="text-terminal-cyan">↵</span>
            </button>
          </form>

          {/* CLI Output */}
          <div
            className={`flex-col gap-1 p-3 bg-terminal-bg rounded border border-terminal-border mt-2 text-xs terminal-font text-terminal-text wrap-break-word ${
              showCli ? "flex" : "hidden"
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: cliOutput }} />
          </div>

          {/* Project results: removable filter chips, repo list, empty state */}
          {showProjects && (
            <div className="mt-2 p-3 bg-terminal-bg rounded border border-terminal-border text-xs terminal-font">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-terminal-cyan font-semibold">~/projects</span>
                <span className="text-terminal-muted">
                  {visibleProjects.length} of {projects.length}
                </span>
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

              {visibleProjects.length === 0 ? (
                <div className="text-terminal-muted">
                  No projects match the current filters.{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setTagFilter("");
                      setSortAz(false);
                    }}
                    className="text-terminal-green underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-1 overflow-x-auto">
                  {visibleProjects.map((p) => (
                    <div key={p.name} className="whitespace-nowrap text-terminal-muted">
                      drwxr-xr-x samuel staff <span className="text-terminal-green font-medium">{p.path}</span>{" "}
                      <span className="text-terminal-cyan">[{p.category}]</span>{" "}
                      <span>{p.tags.join(", ")}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="pt-1 text-xs terminal-font text-terminal-muted flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Type <kbd className="bg-terminal-border px-1 rounded text-terminal-green">help</kbd> for commands, press{" "}
              <kbd className="bg-terminal-border px-1 rounded text-terminal-cyan">Tab</kbd> to autocomplete
            </span>
            <span className="hidden sm:inline">ESC to clear</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}