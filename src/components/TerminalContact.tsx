import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Instagram, Twitter, CheckCircle, Calendar, Clock } from "lucide-react";

const socials = [
  { icon: <Github size={14} />, host: "github.com/Samueladura", ip: "20.205.243.166", status: "ESTABLISHED", time: "14.2ms" },
  { icon: <Instagram size={14} />, host: "instagram.com/babayemi_bukunmi", ip: "108.157.14.33", status: "ESTABLISHED", time: "18.5ms" },
  { icon: <Twitter size={14} />, host: "x.com/buildwithadura", ip: "104.244.42.121", status: "ESTABLISHED", time: "12.1ms" },
  { icon: <Mail size={14} />, host: "mailto:babayemiayomide87@gmail.com", ip: "mail.devbox.io:25", status: "READY", time: "0.0%" },
];

const emptyForm = { name: "", email: "", subject: "", message: "" };

export function TerminalContact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const apiBase = import.meta.env.VITE_EMAIL_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiBase}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSent(true);
        setForm(emptyForm);
      } else {
        setError("Message failed to send. Try again, or email me directly.");
      }
    } catch (err) {
      console.error("Network error sending email:", err);
      setError("Network error. Check your connection, or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-10 md:py-20 bg-terminal-bg">
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
            ❯ buildwithsam: ~/contact
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
          <span className="text-terminal-cyan whitespace-nowrap">~/contact</span>
          <span className="text-terminal-muted">$</span>
          <span className="text-terminal-text whitespace-nowrap">./send_message.sh --interactive --pgp-sign</span>
          <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-cursor shrink-0"></span>
        </motion.div>

        {/* Status */}
        <div className="terminal-card p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs terminal-font">
            <span className="text-terminal-muted">STATUS:</span>
            <span className="text-terminal-green">ONLINE</span>
            <span className="text-terminal-muted">::</span>
            <span className="text-terminal-cyan">AUTH: GPG-VERIFIED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left - Dialog form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="terminal-card overflow-hidden min-w-0"
          >
            <div className="px-4 py-3 border-b border-terminal-border bg-terminal-bg/50">
              <div className="flex items-center gap-2">
                <span className="text-xs terminal-font text-terminal-green">DIALOG : DISPATCH PACKET</span>
                <span className="text-xs terminal-font text-terminal-muted ml-auto hidden sm:inline">
                  tty-mode: raw/echo
                </span>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-terminal-green/10 border border-terminal-green/30">
                    <CheckCircle size={28} className="text-terminal-green" />
                  </div>
                  <h3 className="text-xl font-bold text-terminal-green mb-2 terminal-font">MESSAGE SENT</h3>
                  <p className="text-sm text-terminal-muted terminal-font">
                    Transmission successful. Awaiting response...
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm(emptyForm);
                    }}
                    className="mt-6 terminal-btn"
                  >
                    [SEND ANOTHER]
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs terminal-font text-terminal-muted mb-1 md:mb-2">
                      &gt; NAME_IDENTIFIER <span className="text-terminal-green">[REQUIRED]</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      required
                      autoComplete="name"
                      placeholder="[ Your Name ]"
                      className="terminal-input w-full"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs terminal-font text-terminal-muted mb-1 md:mb-2">
                      &gt; RETURN_PAYLOAD_ADDRESS <span className="text-terminal-cyan">[RFC-5322]</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      required
                      autoComplete="email"
                      placeholder="[ your@email.com ]"
                      className="terminal-input w-full"
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs terminal-font text-terminal-muted mb-1 md:mb-2">
                      &gt; ROUTING_SUBJECT <span className="text-terminal-green">[REQUIRED]</span>
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      required
                      placeholder="[ Subject ]"
                      className="terminal-input w-full"
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs terminal-font text-terminal-muted mb-1 md:mb-2">
                      &gt; PAYLOAD_STREAM (UTF-8){" "}
                      <span className="text-terminal-muted">[{new Blob([form.message]).size} bytes]</span>
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      required
                      placeholder="[ Your message ]"
                      className="terminal-input w-full resize-none"
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {error && (
                    <div role="alert" className="text-xs terminal-font text-red-400">
                      &gt; ERROR: {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 pt-1 md:pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="terminal-btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <Send size={14} />
                      {loading ? "TRANSMITTING..." : "[ SEND PING ]"}
                    </button>
                    <button
                      type="button"
                      className="terminal-btn"
                      onClick={() => {
                        setForm(emptyForm);
                        setError("");
                      }}
                    >
                      [ RESET ]
                    </button>
                    <span className="text-xs terminal-font text-terminal-muted ml-auto hidden md:inline">
                      ESC to abort dialog
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right - Network info */}
          <div className="space-y-4 md:space-y-6 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="terminal-card p-3 md:p-4"
            >
              <div className="text-xs terminal-font text-terminal-muted mb-3">
                Active routing gateways mapped to social, code hosting, and direct SMTP:
              </div>
              <div className="space-y-2">
                {socials.map((route) => (
                  <div
                    key={route.host}
                    className="flex items-center justify-between gap-3 p-2 rounded border border-terminal-border hover:border-terminal-green/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-terminal-green shrink-0">{route.icon}</span>
                      <span className="text-xs terminal-font text-terminal-text truncate">
                        {route.host.replace("mailto:", "")}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs terminal-font text-terminal-muted hidden sm:block">{route.ip}</div>
                      <div className="text-xs terminal-font text-terminal-green">{route.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs terminal-font text-terminal-muted">
                PACKETS: 4 sent, 4 received · rtt avg: <span className="text-terminal-green">14.93ms</span>
              </div>
            </motion.div>

            {/* Book a Call */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="terminal-card p-3 md:p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-terminal-cyan shrink-0" />
                  <div>
                    <div className="text-sm terminal-font text-terminal-text">Book a Call</div>
                    <div className="text-xs terminal-font text-terminal-muted">Schedule a 30-min consultation</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-terminal-green">
                  <Clock size={18} className="text-terminal-cyan" />
                  Available now
                </div>
              </div>
            </motion.div>

            {/* Gateway status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="terminal-card p-3 md:p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></div>
                  <span className="text-xs terminal-font text-terminal-green">GATEWAY READY</span>
                </div>
                <span className="text-xs terminal-font text-terminal-muted">SSL/TLS 1.3</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}