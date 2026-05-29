"use client";

import { useState, useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { RevealWrapper } from "./RevealWrapper";

type SocialButton = {
  name: string;
  href?: string;
  color: string;
  primary: boolean;
  icon: ReactNode;
  action?: () => void;
};

const contactData = {
  name: "Muhammad Sarib Hanif",
  email: "saribraja1998@gmail.com",
  status: "open to opportunities",
  location: "Islamabad, Pakistan (Remote OK)",
  interests: ["engineering", "coffee", "gaming"],
};

const socialButtons: SocialButton[] = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/m-sarib-hanif",
    color: "cyan",
    primary: false,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/M-SARIBHANIF",
    color: "purple",
    primary: false,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

export function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const WORD_LIMIT = 250;
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});
  const [submitAttempt, setSubmitAttempt] = useState(false);

  // Listen for global event to open the contact modal
  useEffect(() => {
    const handler = () => setShowForm(true);
    if (typeof window !== "undefined") {
      window.addEventListener("openContact", handler as EventListener);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("openContact", handler as EventListener);
      }
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const validateForm = () => {
    const next: typeof errors = {};
    const wordCount = form.message.trim() ? form.message.trim().split(/\s+/).filter(Boolean).length : 0;

    if (submitAttempt) {
      if (!form.name || form.name.trim().length < 2) next.name = "Please enter your name (min 2 characters)";
      if (!form.email || !validateEmail(form.email)) next.email = "Please enter a valid email address";
      if (!form.message || form.message.trim().length < 6) next.message = "Please enter a message (min 6 characters)";
      if (wordCount > WORD_LIMIT) next.message = `Message too long — limit ${WORD_LIMIT} words`;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const sendEmail = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setSubmitAttempt(true);
    const valid = validateForm();
    if (!valid) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFormStatus("Message sent — thank you!");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setShowForm(false), 1200);
      } else {
        setFormStatus(data?.error || "Failed to send message");
      }
    } catch {
      setFormStatus("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!showForm) return;
    const t = setTimeout(() => validateForm(), 220);
    return () => clearTimeout(t);
  }, [form, showForm]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 28 } },
  };

  return (
    <section id="contact" className="py-24 px-8 md:px-12 lg:px-16 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-number">08.</span>
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-line" />
          </div>

          {/* Terminal Code Block */}
          <motion.div
            className="terminal-window max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="terminal-title">contact.ts</span>
            </div>
            <div className="terminal-body">
              <pre className="text-sm leading-relaxed">
                <span className="text-[var(--purple)]">const</span>{" "}
                <span className="text-[var(--text)]">developer</span>{" "}
                <span className="text-[var(--text3)]">=</span>{" "}
                <span className="text-[var(--text3)]">{"{"}</span>
                {"\n"}
                <span className="text-[var(--text3)]">{"  "}</span>
                <span className="text-[var(--cyan)]">name</span>
                <span className="text-[var(--text3)]">:</span>{" "}
                <span className="text-[var(--green)]">&quot;{contactData.name}&quot;</span>
                <span className="text-[var(--text3)]">,</span>
                {"\n"}
                <span className="text-[var(--text3)]">{"  "}</span>
                <span className="text-[var(--cyan)]">status</span>
                <span className="text-[var(--text3)]">:</span>{" "}
                <span className="text-[var(--green)]">&quot;{contactData.status}&quot;</span>
                <span className="text-[var(--text3)]">,</span>
                {"\n"}
                <span className="text-[var(--text3)]">{"  "}</span>
                <span className="text-[var(--cyan)]">location</span>
                <span className="text-[var(--text3)]">:</span>{" "}
                <span className="text-[var(--green)]">&quot;{contactData.location}&quot;</span>
                <span className="text-[var(--text3)]">,</span>
                {"\n"}
                <span className="text-[var(--text3)]">{"  "}</span>
                <span className="text-[var(--cyan)]">interests</span>
                <span className="text-[var(--text3)]">:</span>{" "}
                <span className="text-[var(--text3)]">[</span>
                {contactData.interests.map((interest, i) => (
                  <span key={interest}>
                    <span className="text-[var(--green)]">&quot;{interest}&quot;</span>
                    {i < contactData.interests.length - 1 && <span className="text-[var(--text3)]">, </span>}
                  </span>
                ))}
                <span className="text-[var(--text3)]">]</span>
                <span className="text-[var(--text3)]">,</span>
                {"\n"}
                <span className="text-[var(--text3)]">{"};"}</span>
                {"\n\n"}
                <span className="text-[var(--text3)]">// Let&apos;s build something together</span>
              </pre>
            </div>

            {/* Action buttons in terminal */}
            <div className="flex items-center gap-3 p-4 border-t border-[var(--border)]">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--cyan)] text-[var(--bg)] rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <span className="text-[var(--bg)]">&gt;</span>
                Say Hello
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] text-[var(--text2)] rounded-lg font-medium text-sm hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                {copiedEmail ? "Copied!" : "Copy Email"}
              </button>
            </div>

            {/* Git branch footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg3)] border-t border-[var(--border)] text-xs font-mono">
              <div className="flex items-center gap-2 text-[var(--text3)]">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"/>
                </svg>
                main
              </div>
              <span className="text-[var(--text3)]">ready to merge</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialButtons.map((button, index) => (
              <motion.a
                key={button.name}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] text-[var(--text2)] rounded-lg font-medium text-sm hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {button.icon}
                {button.name}
              </motion.a>
            ))}
          </div>
        </div>
      </RevealWrapper>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="relative w-full max-w-lg mx-4" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <motion.form
                onSubmit={sendEmail}
                className="relative bg-[var(--bg2)] rounded-xl p-6 border border-[var(--cyan)]"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-[var(--text)]">Send a message</h3>
                  <button type="button" onClick={() => setShowForm(false)} className="text-[var(--text3)] hover:text-[var(--text)] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>

                <div className="space-y-4">
                  <motion.div variants={itemVariants}>
                    <input
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`px-4 py-3 rounded-lg border ${errors.name ? "border-red-400" : "border-[var(--border)]"} bg-[var(--bg)] text-[var(--text)] w-full focus:border-[var(--cyan)] focus:outline-none transition-colors`}
                    />
                    {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <input
                      required
                      placeholder="Your email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`px-4 py-3 rounded-lg border ${errors.email ? "border-red-400" : "border-[var(--border)]"} bg-[var(--bg)] text-[var(--text)] w-full focus:border-[var(--cyan)] focus:outline-none transition-colors`}
                    />
                    {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <input
                      placeholder="Subject (optional)"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] w-full focus:border-[var(--cyan)] focus:outline-none transition-colors"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <textarea
                      required
                      placeholder="Your message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`px-4 py-3 rounded-lg border ${errors.message ? "border-red-400" : "border-[var(--border)]"} bg-[var(--bg)] text-[var(--text)] w-full h-32 resize-none focus:border-[var(--cyan)] focus:outline-none transition-colors`}
                    />
                    {errors.message && <div className="text-xs text-red-400 mt-1">{errors.message}</div>}
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-5 py-2.5 text-[var(--text3)] hover:text-[var(--text)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={sending}
                      className="px-6 py-2.5 bg-[var(--cyan)] text-[var(--bg)] rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                  </motion.div>

                  {formStatus && (
                    <motion.div
                      variants={itemVariants}
                      className={`text-sm text-center ${formStatus.includes("thank") ? "text-[var(--green)]" : "text-red-400"}`}
                    >
                      {formStatus}
                    </motion.div>
                  )}
                </div>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
