"use client";

import { motion } from "framer-motion";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-8 md:px-12 lg:px-16 bg-[var(--bg)]">
      <div className="max-w-4xl">
        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm font-mono text-[var(--text2)] hover:text-[var(--cyan)] transition-colors mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          BACK TO TOP
        </motion.button>

        {/* Info Lines */}
        <motion.div
          className="space-y-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="text-[var(--purple)]">◆</span>
            <span className="text-[var(--purple)]">feat:</span>
            <span className="text-[var(--text2)]">launched portfolio v1.0</span>
            <span className="text-[var(--text3)]">1 day ago</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="text-[var(--amber)]">{"</>"}</span>
            <span className="text-[var(--amber)]">stack:</span>
            <span className="text-[var(--text2)]">Next.js + Tailwind + TypeScript</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="text-[var(--red)]">☕</span>
            <span className="text-[var(--red)]">fuel:</span>
            <span className="text-[var(--text2)]">V60 pour-over, late night sessions</span>
          </div>
        </motion.div>

        {/* Designed/Coded/Deployed */}
        <motion.p
          className="text-sm text-[var(--text2)] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Designed in <span className="text-[var(--text)] font-medium">Figma</span>, 
          coded in <span className="text-[var(--text)] font-medium">VS Code</span>, 
          deployed on <span className="text-[var(--text)] font-medium">Vercel</span>.
        </motion.p>

        {/* Bottom Row */}
        <motion.div
          className="flex items-center justify-between pt-6 border-t border-[var(--border)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[var(--text3)] font-mono">
            © {new Date().getFullYear()} sarib_hanif
          </p>
          <div className="flex items-center gap-2 text-sm font-mono text-[var(--text3)]">
            <span className="w-2 h-2 rounded-full bg-[var(--green)]" />
            all systems operational
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
