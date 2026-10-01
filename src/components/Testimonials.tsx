import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Veritas",
    content: "Samuel completely transformed our design system. His attention to detail and ability to bridge design with engineering is unmatched. Our frontend velocity increased by 40%.",
    rating: 5,
  },
  {
    name: "David Okafor",
    role: "Founder at TechStart",
    content: "Working with Samuel was a game-changer for our startup. He built a pixel-perfect, performant web app that our users absolutely love. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amara Diallo",
    role: "CTO at FinanceHub",
    content: "The level of craftsmanship Samuel brings to every project is incredible. He doesn't just write code - he architects solutions that scale. A true professional.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28 bg-slate-900">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-indigo-500 text-xs font-mono tracking-widest">
            06. TESTIMONIALS
          </span>
          <div className="h-px w-16 bg-indigo-500/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
        >
          Kind{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Words
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-base leading-relaxed max-w-lg mb-16"
        >
          Don't just take my word for it. Here's what clients and colleagues have to say about working together.
        </motion.p>

        {/* Testimonials grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl p-6 bg-slate-950/70 border border-slate-800 hover:border-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors">
                <Quote size={32} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                &quot;{t.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
