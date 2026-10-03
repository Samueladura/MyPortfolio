import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "~/portfolio", href: "#hero" },
  { label: "~/projects", href: "#projects" },
  { label: "~/experience", href: "#experience" },
  { label: "~/contact", href: "#contact" },
];

// deviceMemory is a Chromium-only API, so it isn't in TypeScript's built-in Navigator type.
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
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

function formatUptime(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  return `${d}d, ${h}h, ${m}m`;
}

// Read once from the visitor's browser. Nothing is sent anywhere.
function readSystemInfo() {
  const nav = navigator as NavigatorWithMemory;
  const ua = nav.userAgent;
  return {
    host: parseOS(ua).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    shell: parseBrowser(ua),
    cores: nav.hardwareConcurrency || null,
    ramGB: nav.deviceMemory ?? null,
  };
}

export function TerminalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [headerOffset, setHeaderOffset] = useState(0);
  const [pageLoadedAt] = useState(() => Date.now());
  const [uptime, setUptime] = useState("0d, 0h, 0m");
  const [info] = useState(readSystemInfo);

  const statusRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // Measure the fixed header height. Observing only the status bar and the tab row
  // (not the mobile menu) keeps the offset stable while the menu is open.
  useEffect(() => {
    const status = statusRef.current;
    const row = rowRef.current;
    if (!status || !row) return;
    const measure = () => setHeaderOffset(status.offsetHeight + row.offsetHeight + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(status);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= headerOffset + 20) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerOffset]);

  // Clock and uptime
  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(new Date()), 15000);
    const up = setInterval(() => setUptime(formatUptime(Date.now() - pageLoadedAt)), 30000);
    return () => {
      clearInterval(clock);
      clearInterval(up);
    };
  }, [pageLoadedAt]);

  // Close the menu on Escape or when the viewport grows to desktop size
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const handleNav = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    const menuWasOpen = mobileOpen;
    setMobileOpen(false);
    // If the mobile menu was open, wait for its 250ms closing animation so the
    // layout has settled before measuring. On desktop, scroll immediately.
    setTimeout(
      () => {
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset + 8;
        window.scrollTo({ top, behavior: "smooth" });
      },
      menuWasOpen ? 300 : 0
    );
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <>
      {/* Top Status Bar */}
      <div ref={statusRef} className="fixed top-0 left-0 right-0 z-60 status-bar">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs terminal-font">
              <span className="text-terminal-green">samuel</span>
              <span className="text-terminal-muted">@</span>
              <span className="text-terminal-text">{info.host}</span>
              <span className="text-terminal-muted">:</span>
              <span className="text-terminal-cyan">~</span>
              <span className="text-terminal-muted">({info.shell})</span>
              <span className="text-terminal-muted ml-2">UP: {uptime}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs terminal-font">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-terminal-muted">
                CPU:{" "}
                <span className="text-terminal-green">{info.cores ? `${info.cores} cores` : "n/a"}</span>
              </span>
              <span className="text-terminal-muted">
                RAM:{" "}
                <span className="text-terminal-green">
                  {info.ramGB ? `${info.ramGB >= 8 ? "8+" : info.ramGB}GB` : "n/a"}
                </span>
              </span>
              <span className="text-terminal-muted">
                GIT: <span className="text-terminal-green">main*</span>
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-terminal-green/20 border border-terminal-green/30 flex items-center justify-center">
              <span className="text-terminal-green text-xs font-bold">A</span>
            </div>
            <span className="text-terminal-muted hidden sm:block">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Tap-outside backdrop (mobile only) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Tab Navigation */}
      <div
        className={`fixed top-12 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-terminal-bg/95 backdrop-blur-xl border-b border-terminal-border"
            : "bg-terminal-bg/80 backdrop-blur-md border-b border-terminal-border/50"
        }`}
      >
        <div ref={rowRef} className="w-full md:max-w-6xl md:mx-auto px-4 py-2 flex items-center">
          <nav className="hidden md:flex items-center gap-1 mr-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.button
                  key={link.href}
                  type="button"
                  onClick={() => handleNav(link.href)}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  className={`terminal-tab ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 text-xs terminal-font">
            <span className="text-terminal-muted">tty1</span>
            <span className="text-terminal-muted">|</span>
            <span className="text-terminal-cyan">ssh-256</span>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-terminal-text p-2 ml-auto rounded-md border border-terminal-border bg-terminal-bg/80 min-h-11 flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu: rendered inside the bar so it sits below the toggle, not over it */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-terminal-border"
            >
              <div className="px-4 py-3">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => handleNav(link.href)}
                      className={`block w-full text-left px-4 py-3 min-h-12 rounded-lg mb-1 text-sm terminal-font transition-colors ${
                        isActive
                          ? "text-terminal-green bg-terminal-green/10"
                          : "text-terminal-muted hover:text-terminal-green hover:bg-terminal-green/5"
                      }`}
                    >
                      <span className="text-terminal-green mr-2">❯</span>
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}