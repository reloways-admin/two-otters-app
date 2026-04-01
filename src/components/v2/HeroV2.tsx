"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Floating cursor glow that follows the mouse */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: springX, top: springY, translateX: "-50%", translateY: "-50%" }}
      className="fixed pointer-events-none z-0 w-64 h-64 rounded-full bg-teal-500/8 blur-[80px] mix-blend-screen"
    />
  );
}

/** Slowly rotating badge ring */
function RotatingBadge() {
  const text = "FREE AUDIT · NO EMAIL · TWO OTTERS STUDIO · ";
  const chars = text.split("");
  const radius = 58;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className="w-32 h-32 relative flex-shrink-0"
    >
      <svg viewBox="0 0 140 140" className="w-full h-full">
        {chars.map((char, i) => {
          const angle = (i / chars.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const cx = 70 + radius * Math.cos(rad);
          const cy = 70 + radius * Math.sin(rad);
          return (
            <text
              key={i}
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
              fontSize="8"
              fontFamily="'Google Sans', system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="0.5"
              fill="#2dd4bf"
              opacity="0.7"
            >
              {char}
            </text>
          );
        })}
        {/* Centre dot */}
        <circle cx="70" cy="70" r="6" fill="#0d9488" opacity="0.8" />
        <circle cx="70" cy="70" r="3" fill="#2dd4bf" />
      </svg>
    </motion.div>
  );
}

/** Animated count-up stat */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = Date.now();
      const dur = 1200;
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function HeroV2() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-10 overflow-hidden bg-stone-950">
      <CursorGlow />

      {/* Animated mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full bg-teal-950/60 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full bg-amber-950/40 blur-[120px]"
        />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }}
      />

      {/* Top row — eyebrow + badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">
            Two Otters Studio
          </span>
          <span className="w-12 h-px bg-stone-800" />
          <span className="font-mono text-[10px] text-stone-600">Design · Strategy · Prototype</span>
        </div>
        <RotatingBadge />
      </motion.div>

      {/* MAIN HEADLINE — brutally large, editorial */}
      <div className="relative my-auto py-10">
        {/* Ghost watermark */}
        <span
          aria-hidden="true"
          className="absolute -top-8 -left-4 text-[22vw] font-black text-white/[0.022] leading-none select-none pointer-events-none"
        >
          🦦
        </span>

        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-[clamp(3.5rem,11vw,10rem)] font-black text-white leading-[0.95] tracking-[-0.03em]"
          >
            You know
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-1">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="flex flex-wrap items-baseline gap-x-5"
          >
            <span className="text-[clamp(3.5rem,11vw,10rem)] font-black text-white leading-[0.95] tracking-[-0.03em]">
              what you
            </span>
            {/* WANT — highlighted box */}
            <span className="inline-block bg-teal-500 text-stone-950 text-[clamp(3.5rem,11vw,10rem)] font-black leading-[0.95] tracking-[-0.03em] px-4 rounded-2xl">
              want.
            </span>
          </motion.div>
        </div>

        <div className="overflow-hidden mt-2">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            className="text-[clamp(3.5rem,11vw,10rem)] font-black leading-[0.95] tracking-[-0.03em] text-stone-500"
          >
            We&apos;ll show it.
          </motion.h1>
        </div>
      </div>

      {/* Bottom row — subline, stats, CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        className="relative grid md:grid-cols-3 gap-8 md:gap-12 items-end border-t border-white/5 pt-8"
      >
        {/* Subline */}
        <p className="text-sm text-stone-400 leading-relaxed md:col-span-1">
          Most studios ask you to imagine the result. We build it in two weeks —
          so you can see, feel, and change it before you commit to anything.
        </p>

        {/* Stats */}
        <div className="flex gap-8 md:justify-center">
          {[
            { n: 2, suffix: " wks", label: "to prototype" },
            { n: 0, suffix: "", label: "emails needed" },
          ].map(({ n, suffix, label }) => (
            <div key={label}>
              <p className="text-4xl md:text-5xl font-black text-white tabular-nums">
                <CountUp to={n} suffix={suffix} />
              </p>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a
            href="#tiers"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-stone-950 text-sm font-bold hover:bg-teal-400 transition-colors"
          >
            How it works
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#audit"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-stone-400 text-sm font-medium hover:border-teal-500/40 hover:text-teal-400 transition-all"
          >
            Free audit ↑
          </a>
        </div>
      </motion.div>
    </section>
  );
}
