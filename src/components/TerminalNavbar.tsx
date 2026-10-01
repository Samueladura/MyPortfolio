import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "~/portfolio", href: "#hero" },
  { label: "~/projects", href: "#projects" },
  { label: "~/experience", href: "#experience" },
  { label: "~/contact", href: "#contact" },
];

// Height of the two fixed bars (status bar 48px + tab bar ~61px)
const HEADER_OFFSET = 112;

export function TerminalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Scroll spy
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "hero";
      for (const id of ids) {
        if (id === "hero") continue;
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= HEADER_OFFSET + 20) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clock
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 15000);
    return () => clearInterval(t);
  }, []);

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
    setMobileOpen(false);
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    // Manual offset so the section isn't hidden under the fixed bars
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <>
      {/* Top Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-60 status-bar">
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
              <span className="text-terminal-text">macbook-pro</span>
              <span className="text-terminal-muted">:</span>
              <span className="text-terminal-cyan">~</span>
              <span className="text-terminal-muted">(zsh)</span>
              <span className="text-terminal-muted ml-2">UP: 42d 13h</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs terminal-font">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-terminal-muted">
                CPU: <span className="text-terminal-green">12%</span>
              </span>
              <span className="text-terminal-muted">
                RAM: <span className="text-terminal-green">4.8GB</span>
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
        <div className="w-full md:max-w-6xl md:mx-auto px-4 py-2 flex items-center">
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