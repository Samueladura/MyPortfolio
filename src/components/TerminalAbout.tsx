import { motion } from "framer-motion";

// Moved here from TerminalHero
const telemetry = [
  ["Production Nodes", "1,480+", "text-terminal-green"],
  ["P99 Query Latency", "<1.8ms", "text-terminal-green"],
  ["Total MTBF Target", "99.999%", "text-terminal-green"],
  ["Core Locality", "Nigeria / Remote", "text-terminal-text"],
];

export function TerminalAbout() {
  return (
    <section id="about" className="relative py-10 md:py-20 bg-terminal-bg">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Left - Bio + philosophy */}
          <div className="md:col-span-8 flex flex-col gap-4 md:gap-6 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="terminal-card p-4 md:p-8"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
                <span className="flex items-center gap-1 text-xs terminal-font text-terminal-muted">
                  <span className="material-symbols-outlined text-terminal-cyan" style={{ fontSize: "16px" }}>
                    description
                  </span>
                  bio.md [rw-r--r--] 1.2KB
                </span>
                <span className="text-xs terminal-font text-terminal-cyan">MARKDOWN RENDERED</span>
              </div>

              <div className="text-xs md:text-sm terminal-font text-terminal-text leading-relaxed">
                <p className="mb-4">
                  I'm a software designer and developer with over 5 years of experience building products that people
                  love to use. My work spans the full spectrum from pixel-perfect UI design to architecting scalable
                  backend systems.
                </p>
                <p className="mb-4">
                  I believe great software is built at the intersection of empathy, craftsmanship, and technical
                  excellence. Every project I take on, I bring a designer's eye and an engineer's discipline to ensure
                  the result is both beautiful and bulletproof.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring design systems, contributing to open source, or
                  mentoring the next generation of developers.
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

          {/* Right - Cluster telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-4 terminal-card p-4 md:p-6 flex flex-col gap-2 md:gap-3 self-start"
          >
            <span className="text-xs terminal-font text-terminal-cyan font-semibold uppercase">
              Cluster Telemetry
            </span>
            {telemetry.map(([label, value, color]) => (
              <div key={label} className="flex justify-between gap-2 text-xs terminal-font text-terminal-muted">
                <span>{label}</span>
                <span className={color}>{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}