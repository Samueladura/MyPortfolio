import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { AnimatedCounter } from "./AnimatedCounter";

const ROLES = [
  "Software Designer & Engineer",
  "Frontend Developer",
  "Motion Graphics Designer",
  "Full-Stack Developer",
];

export function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const rotateX = useTransform(smoothY, [-300, 300], [5, -5]);
  const rotateY = useTransform(smoothX, [-300, 300], [-5, 5]);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = ROLES[roleIndex];
      const el = roleRef.current;
      if (!el) return;

      if (!isDeleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          timeoutId = setTimeout(type, 300);
          return;
        }
      }
      timeoutId = setTimeout(type, isDeleting ? 55 : 95);
    };

    timeoutId = setTimeout(type, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    let visible = true;
    const interval = setInterval(() => {
      visible = !visible;
      el.style.opacity = visible ? "1" : "0";
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950"
    >
      {/* Grid overlay */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          backgroundImage: `linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        transition={{ type: "spring", damping: 50, stiffness: 400 }}
        className="absolute inset-0 opacity-30"
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Available badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/8 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono tracking-wide">
              Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-4">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Babayemi Samuel
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.div variants={itemVariants} className="flex items-center gap-0 mb-6 h-12">
            <span className="text-2xl lg:text-4xl font-semibold text-indigo-300">
              <span ref={roleRef} />
              <span
                ref={cursorRef}
                className="inline-block w-[3px] h-8 bg-indigo-500 ml-1 rounded-sm align-middle"
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-base lg:text-lg text-slate-400 leading-relaxed max-w-xl mb-10">
            I craft exceptional digital experiences that live at the
            intersection of elegant design and robust engineering turning
            complex problems into intuitive, pixel-perfect products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-14">
            <Magnetic strength={0.2}>
              <button
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30 active:scale-95"
              >
                View My Work
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-xl font-semibold text-slate-300 border border-slate-700 bg-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-95"
              >
                Get In Touch
              </button>
            </Magnetic>
          </motion.div>

          {/* Social links */}
          {/* <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-slate-600 uppercase tracking-widest">
              Follow me
            </span>
            <div className="flex gap-3">
              {[
                { icon: <Github size={18} />, href: "https://github.com/Samueladura", label: "GitHub" },
                { icon: <Instagram size={18} />, href: "#", label: "Instargram" },
                { icon: <Twitter size={18} />, href: "https://x.com/buildwithadura", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 border border-slate-800 bg-white/4 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div> */}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden lg:flex items-center gap-0 absolute bottom-12 left-6"
        >
          {[
            { value: "5", label: "Years Experience", suffix: "+" },
            { value: "60", label: "Projects Delivered", suffix: "+" },
            { value: "30", label: "Happy Clients", suffix: "+" },
            { value: "15", label: "Open Source", suffix: "+" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              {i < 3 && (
                <div className="w-px h-9 bg-slate-800 mr-8" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ArrowDown size={16} className="text-slate-600" />
      </div>
    </motion.section>
  );
}