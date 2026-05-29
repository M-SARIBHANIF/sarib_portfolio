"use client";

import { motion } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

export function About() {
  return (
    <section id="about" className="py-24 px-8 md:px-12 lg:px-16 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-number">01.</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-line" />
          </div>

          {/* Terminal Window */}
          <div className="terminal-window mb-10">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="terminal-title">~/sarib</span>
            </div>
            <div className="terminal-body space-y-4">
              {/* whoami command */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="text-[var(--text)]">whoami</span>
              </div>
              <div className="terminal-output pl-4 flex items-center gap-2">
                <span className="text-[var(--cyan)]">sarib_hanif</span>
                <span className="text-[var(--text3)]">//</span>
                <span className="text-[var(--text2)]">software engineer</span>
              </div>

              {/* cat interests.txt */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="text-[var(--text)]">cat</span>
                <span className="text-[var(--green)]">interests.txt</span>
              </div>
              <div className="terminal-output pl-4">
                <span className="text-[var(--purple)]">[</span>
                <span className="text-[var(--green)]">&quot;automation&quot;</span>
                <span className="text-[var(--text3)]">, </span>
                <span className="text-[var(--green)]">&quot;systems&quot;</span>
                <span className="text-[var(--text3)]">, </span>
                <span className="text-[var(--green)]">&quot;clean code&quot;</span>
                <span className="text-[var(--text3)]">, </span>
                <span className="text-[var(--green)]">&quot;coffee&quot;</span>
                <span className="text-[var(--purple)]">]</span>
              </div>

              {/* echo current role */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="text-[var(--text)]">echo</span>
                <span className="text-[var(--amber)]">$CURRENT_ROLE</span>
              </div>
              <div className="terminal-output pl-4">
                <span className="text-[var(--cyan)]">Full Stack Developer</span>
                <span className="text-[var(--text3)]"> @ </span>
                <span className="text-[var(--amber)]">CYMAX TECH</span>
              </div>

              {/* Blinking cursor */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[var(--green)]">sarib@dev</span>
                <span className="text-[var(--text3)]">in</span>
                <span className="text-[var(--blue)]">~</span>
                <span className="text-[var(--amber)]">$</span>
                <span className="w-2 h-5 bg-[var(--cyan)] cursor-blink" />
              </div>
            </div>
          </div>

          {/* About Paragraphs with Highlighted Text */}
          <div className="space-y-6 text-[var(--text2)] leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              I started my career in <span className="text-highlight">Software Development</span>, but not in a shallow surface-level way. From the beginning, I gravitated toward <span className="text-highlight">automation</span>, <span className="text-highlight">APIs</span>, and <span className="text-highlight">infrastructure-level thinking</span>. I wanted to understand how systems actually work, not just verify that buttons click.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Today, I work as a Full Stack Developer at <a href="#" className="text-highlight hover:text-[var(--cyan)] transition-colors">CYMAX TECH <span className="inline-block ml-1">&#8599;</span></a>, where I finally enjoy development because of real ownership and trust. I work heavily with <span className="text-highlight">UI automation</span>, <span className="text-highlight">API automation</span>, and system workflows. I collaborate closely with engineers instead of being siloed — I&apos;m trusted as a technical problem-solver, not just a coder.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Outside of work, I build things. I&apos;ve shipped <span className="text-highlight">FastAPI projects</span>, integrated <span className="text-highlight">OpenAI and Perplexity APIs</span>, and I run <span className="text-highlight">Linux</span> because I can&apos;t stand bloated systems. I like my tools clean, my coffee hand-brewed, and my code well-tested.
            </motion.p>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
