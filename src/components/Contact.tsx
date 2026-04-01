import { useState } from "react";
import { Mail, MapPin, Send, Github, Instagram, Twitter, CheckCircle } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiBase = import.meta.env.VITE_EMAIL_API_URL || "http://localhost:4000";

    try {
      const res = await fetch(`${apiBase}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error('Email API error:', data);
        alert('Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Network error sending email:', err);
      alert('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-slate-950"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-indigo-500 text-xs font-mono tracking-widest">
            05. CONTACT
          </span>
          <div className="h-px w-16 bg-indigo-500/40" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Let's Build{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Something
              </span>{" "}
              Great
            </h2>

            <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-10">
              Whether you have a project in mind, want to collaborate, or just
              want to say hello, my inbox is always open.
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-10">
              {[
                { icon: <Mail size={18} />, label: "Email", value: "babayemiayomide87@gmail.com" },
                { icon: <MapPin size={18} />, label: "Location", value: "Remote" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-slate-200">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-3">
                Find me on
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <Github size={18} />, href: "https://github.com/Samueladura", label: "GitHub" },
                  { icon: <Instagram size={18} />, href: "https://www.instagram.com/babayemi_bukunmi", label: "Instargram" },
                  { icon: <Twitter size={18} />, href: "https://x.com/buildwithadura", label: "Twitter" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 border border-slate-800 bg-white/4 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Form */}
          <div className="rounded-2xl p-8 bg-slate-900/60 border border-slate-800">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-emerald-500/12 border border-emerald-500/30">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  className="mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold text-indigo-400 border border-indigo-500/30 bg-indigo-500/8 hover:bg-indigo-500/15 transition-colors"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      required
                      placeholder="Samuel"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white bg-slate-950/80 border border-slate-700 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      required
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white bg-slate-950/80 border border-slate-700 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    placeholder="Project Collaboration"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white bg-slate-950/80 border border-slate-700 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white bg-slate-950/80 border border-slate-700 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/30 active:scale-95"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}