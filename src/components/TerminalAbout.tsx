import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function TerminalAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section id="about" ref={sectionRef} className="relative py-10 md:py-20 bg-terminal-bg">
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
            ❯ buildwithsam: ~/about
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
          <span className="text-terminal-cyan">~/about</span>
          <span className="text-terminal-muted">$</span>
          <span className="text-terminal-text">cat bio.md</span>
          <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor shrink-0"></span>
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="terminal-card p-4 md:p-8 mb-6 md:mb-8"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <span className="text-xs terminal-font text-terminal-muted">bio.md</span>
              <span className="text-xs terminal-font text-terminal-muted ml-3">[rw-r--r--] 1.2KB</span>
            </div>
            <span className="text-xs terminal-font text-terminal-cyan">MARKDOWN RENDERED</span>
          </div>

          <div className="text-xs md:text-sm terminal-font text-terminal-text leading-relaxed">
            <p className="mb-4">
              Staff-level systems architect & software engineer dedicated to building resilient distributed backends,
              ultra-low latency data pipelines, and rock-solid platform infrastructure.
            </p>
            <p className="mb-4">
              Extensive production experience orchestrating concurrent engines with{" "}
              <span className="text-terminal-green">Rust</span>, designing mission-critical services in{" "}
              <span className="text-terminal-green">Go</span>, and scaling modern high-throughput web fronts via{" "}
              <span className="text-terminal-green">TypeScript</span>.
            </p>
            <p>
              When I'm not pushing pixels or debugging race conditions, you'll find me contributing to open-source,
              optimizing build pipelines, or mentoring the next generation of engineers.
            </p>
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="terminal-card p-4 md:p-6 border-l-2 border-l-terminal-green/50"
        >
          <div className="text-xs terminal-font text-terminal-green mb-2">PHILOSOPHY // AXIOM</div>
          <blockquote className="text-sm terminal-font text-terminal-text italic">
            "Write simple code that executes fast and rarely breaks."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}