"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const h = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: sx, top: sy, translateX: "-50%", translateY: "-50%", background: "radial-gradient(circle, #00ff8812 0%, transparent 70%)" }}
      className="fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full"
      aria-hidden
    />
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = Date.now();
      const dur = 1000;
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function HeroV3() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-14 pt-28 pb-10 overflow-hidden" style={{ background: "#080808" }}>

      {/* Neon glow blob — top left */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #00ff8840 0%, transparent 70%)" }}
      />

      {/* Neon glow blob — bottom right */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #00ff8820 0%, transparent 70%)" }}
      />

      {/* Horizontal scan line */}
      <motion.div
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, #00ff8830 40%, #00ff8860 50%, #00ff8830 60%, transparent 100%)" }}
      />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative flex items-center gap-4"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Two Otters Studio</span>
        <span className="w-8 h-px" style={{ background: "#00ff88" }} />
        <span className="font-mono text-[10px]" style={{ color: "#00ff88" }}>EST. 2024</span>
      </motion.div>

      {/* HEADLINE */}
      <div className="relative my-auto py-8">
        {/* Line 1 */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-black text-white leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
          >
            You know
          </motion.p>
        </div>

        {/* Line 2 — neon word */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex flex-wrap items-baseline gap-x-6 leading-[0.9]"
          >
            <span
              className="font-black text-white tracking-[-0.04em]"
              style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
            >
              what you
            </span>
            {/* NEON highlighted word */}
            <span
              className="font-black tracking-[-0.04em] relative"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 11rem)",
                color: "#00ff88",
                textShadow: "0 0 40px #00ff88, 0 0 80px #00ff8860",
              }}
            >
              want.
            </span>
          </motion.div>
        </div>

        {/* Line 3 — thin weight contrast */}
        <div className="overflow-hidden mt-2">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="font-thin text-white/30 leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
          >
            We&apos;ll show it.
          </motion.p>
        </div>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        className="relative grid md:grid-cols-3 gap-8 items-end border-t pt-8"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="text-sm text-white/40 leading-relaxed font-light">
          Most studios ask you to imagine the result. We build it in two weeks —
          so you can see, feel, and change it before you commit to anything.
        </p>

        {/* Stats */}
        <div className="flex gap-10 md:justify-center">
          {[{ n: 2, s: " wks", l: "to prototype" }, { n: 0, s: "", l: "emails needed" }].map(({ n, s, l }) => (
            <div key={l}>
              <p
                className="text-5xl font-black tabular-nums"
                style={{ color: "#00ff88", textShadow: "0 0 20px #00ff8880" }}
              >
                <CountUp to={n} suffix={s} />
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">{l}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a
            href="#tiers"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#080808] transition-all hover:scale-105"
            style={{ background: "#00ff88", boxShadow: "0 0 20px #00ff8870, 0 0 40px #00ff8830" }}
          >
            How it works
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#audit"
            className="flex items-center gap-2 px-6 py-3 rounded-full border text-sm text-white/50 hover:text-white hover:border-white/30 transition-all"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            Free audit
          </a>
        </div>
      </motion.div>
    </section>
  );
}
