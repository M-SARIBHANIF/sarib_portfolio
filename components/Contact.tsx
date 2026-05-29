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
  phone: "+92-340-5344160",
  location: "Islamabad, Pakistan",
  github: "github.com/M-SARIBHANIF",
  linkedin: "linkedin.com/in/m-sarib-hanif",
  timezone: "Asia/Karachi",
  available: true,
};

const contactJson = `{
  "name": "${contactData.name}",
  "email": "${contactData.email}",
  "phone": "${contactData.phone}",
  "location": "${contactData.location}",
  "available": ${contactData.available}
}`;

const socialButtons: SocialButton[] = [
  {
    name: "LinkedIn",
    href: `https://${contactData.linkedin}`,
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
    href: `https://${contactData.github}`,
    color: "pink",
    primary: false,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

export function Contact() {
  const [typedJson, setTypedJson] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isInView, setIsInView] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const WORD_LIMIT = 250;
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; subject?: boolean; message?: boolean }>({});
  const [submitAttempt, setSubmitAttempt] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i <= contactJson.length) {
        setTypedJson(contactJson.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [isInView]);

  // Listen for a global event to open the contact modal (used by other components)
  useEffect(() => {
    const handler = () => setShowForm(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('openContact', handler as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('openContact', handler as EventListener);
      }
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const sendEmail = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setSubmitAttempt(true);
    const valid = validateForm();
    if (!valid) return;
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFormStatus('Message sent — thank you!');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowForm(false), 1200);
      } else {
        setFormStatus(data?.error || 'Failed to send message');
      }
    } catch (err) {
      setFormStatus('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const validateForm = () => {
    const next: typeof errors = {};
    const wordCount = form.message.trim() ? form.message.trim().split(/\s+/).filter(Boolean).length : 0;

    // Only show errors if the field has content or user attempted to submit
    if ((form.name && form.name.trim().length > 0) || submitAttempt) {
      if (!form.name || form.name.trim().length < 2) next.name = 'Please enter your name (min 2 characters)';
    }

    if ((form.email && form.email.trim().length > 0) || submitAttempt) {
      if (!form.email || !validateEmail(form.email)) next.email = 'Please enter a valid email address';
    }

    if ((form.message && form.message.trim().length > 0) || submitAttempt) {
      if (!form.message || form.message.trim().length < 6) next.message = 'Please enter a message (min 6 characters)';
      if (wordCount > WORD_LIMIT) next.message = `Message too long — limit ${WORD_LIMIT} words`;
    } else {
      // if empty and not submitAttempt, don't set message error
    }

    if ((form.subject && form.subject.length > 0) || submitAttempt) {
      if (form.subject && form.subject.length > 200) next.subject = 'Subject is too long';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  useEffect(() => {
    // live-validate lightly as the user types (don't overwhelm)
    if (!showForm) return;
    const t = setTimeout(() => validateForm(), 220);
    return () => clearTimeout(t);
  }, [form, showForm]);

  const wordCount = form.message.trim() ? form.message.trim().split(/\s+/).filter(Boolean).length : 0;
  const isFormValid = form.name.trim().length >= 2 && validateEmail(form.email) && form.message.trim().length >= 6 && wordCount <= WORD_LIMIT;
  const modalChildrenCount = 6; // header, name, email, subject, message, buttons
  const staggerDelay = 0.12;
  const baseAppearDelay = 0.25;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: baseAppearDelay },
    },
  };

  const itemVariants: Variants = {
    hidden: (i: number) => ({ opacity: 0, y: 18 + i * 2, scale: 0.985 }),
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 500, damping: 28 } },
  };

  return (
    <section id="contact" className="py-20 px-8 md:px-12 bg-[var(--bg)]">
      <RevealWrapper>
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-12 flex items-baseline gap-4">
            <span className="text-[var(--cyan)] font-mono text-lg font-bold">08.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
              Get In Touch
            </h2>
          </div>

          {/* Terminal Card */}
          <motion.div
            ref={ref}
            className="bg-[var(--bg2)] border border-[var(--border)] rounded-2xl overflow-hidden max-w-xl mx-auto hover:border-[var(--cyan)] transition-colors gradient-border-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 0 30px var(--cyan-glow)" }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg3)]/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--red)]" style={{ boxShadow: "0 0 8px var(--red-glow)" }} />
                <div className="w-3 h-3 rounded-full bg-[var(--amber)]" style={{ boxShadow: "0 0 8px var(--amber-glow)" }} />
                <div className="w-3 h-3 rounded-full bg-[var(--green)]" style={{ boxShadow: "0 0 8px var(--green-glow)" }} />
              </div>
              <span className="text-xs font-mono text-[var(--text3)] ml-2">
                contact.json
              </span>
              {/* Status indicator */}
              <motion.div
                className="ml-auto flex items-center gap-2"
                animate={{ opacity: typedJson.length >= contactJson.length ? 1 : 0 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-[var(--green)]"
                  animate={{ boxShadow: ["0 0 5px var(--green-glow)", "0 0 15px var(--green-glow)", "0 0 5px var(--green-glow)"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[10px] font-mono text-[var(--green)]">ready</span>
              </motion.div>
            </div>

            {/* JSON Content */}
            <div className="p-6 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-[var(--text2)]">
                {typedJson.split("\n").map((line, i) => {
                  const highlighted = line
                    .replace(
                      /"([^"]+)":/g,
                      '<span class="text-[var(--cyan)]" style="text-shadow: 0 0 8px var(--cyan-glow)">"$1"</span>:'
                    )
                    .replace(
                      /: "([^"]+)"/g,
                      ': <span class="text-[var(--green)]" style="text-shadow: 0 0 8px var(--green-glow)">"$1"</span>'
                    )
                    .replace(
                      /: (true|false)/g,
                      ': <span class="text-[var(--amber)]" style="text-shadow: 0 0 8px var(--amber-glow)">$1</span>'
                    );
                  return (
                    <span
                      key={i}
                      dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                  );
                })}
                <motion.span 
                  className="w-2 h-4 bg-[var(--cyan)] inline-block ml-1 cursor-blink"
                  animate={{ boxShadow: ["0 0 5px var(--cyan-glow)", "0 0 15px var(--cyan-glow)", "0 0 5px var(--cyan-glow)"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </pre>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <button
                onClick={() => setShowForm(true)}
                className={`relative px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all overflow-hidden bg-[var(--blue)] text-white`}
                style={hoveredButton === 'Get in touch' ? { boxShadow: `0 0 25px var(--blue-glow)` } : {}}
                onMouseEnter={() => setHoveredButton('Get in touch')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12V8a4 4 0 10-8 0v4M5 12h14l-1 8H6l-1-8z" />
                </svg>
                Get in touch
              </button>
            </motion.div>

            {socialButtons.map((button, index) => {
              const isHovered = hoveredButton === button.name;
              const ButtonWrapper = button.action ? "button" : "a";
              const props = button.action 
                ? { onClick: copyEmail } 
                : { href: button.href, target: "_blank", rel: "noopener noreferrer" };

              return (
                <motion.div
                  key={button.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onHoverStart={() => setHoveredButton(button.name)}
                  onHoverEnd={() => setHoveredButton(null)}
                >
                  <ButtonWrapper
                    {...props}
                    className={`relative px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all overflow-hidden ${
                      button.primary
                        ? `bg-[var(--${button.color})] text-white`
                        : `border border-[var(--${button.color})] text-[var(--${button.color})] hover:bg-[var(--${button.color}-dim)]`
                    }`}
                    style={isHovered ? { boxShadow: `0 0 25px var(--${button.color}-glow)` } : {}}
                  >
                    <motion.span
                      animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {button.icon}
                    </motion.span>
                    {button.name}
                    {button.primary && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                        initial={{ x: "-100%" }}
                        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                        transition={{ duration: 0.42 }}
                      />
                    )}
                  </ButtonWrapper>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Modal Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div className="relative w-full max-w-lg mx-4" initial={{ scale: 0.98 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }}>

                  {/* Permanent border: removed animated SVG stroke */}

                  <motion.form
                    onSubmit={sendEmail}
                    className="relative z-10 bg-[var(--bg)] rounded-xl p-6 shadow-lg border border-[var(--cyan)]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                  >
                    <motion.div variants={itemVariants} custom={0} className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Send a message</h3>
                      <button type="button" onClick={() => setShowForm(false)} className="text-[var(--text2)]">Close</button>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-3">
                      <motion.div variants={itemVariants} custom={1}>
                        <input
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => { setForm({ ...form, name: e.target.value }); if (e.target.value.trim().length > 0) setTouched(t => ({ ...t, name: true })); }}
                          onBlur={() => setTouched(t => ({ ...t, name: true }))}
                          aria-invalid={!!errors.name}
                          className={`px-3 py-2 rounded border ${errors.name ? 'border-red-400' : ''} bg-[var(--bg2)] w-full`}
                        />
                        {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
                      </motion.div>

                      <motion.div variants={itemVariants} custom={2}>
                        <input
                          required
                          placeholder="Your email"
                          type="email"
                          value={form.email}
                          onChange={(e) => { setForm({ ...form, email: e.target.value }); if (e.target.value.trim().length > 0) setTouched(t => ({ ...t, email: true })); }}
                          onBlur={() => setTouched(t => ({ ...t, email: true }))}
                          aria-invalid={!!errors.email}
                          className={`px-3 py-2 rounded border ${errors.email ? 'border-red-400' : ''} bg-[var(--bg2)] w-full`}
                        />
                        {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                      </motion.div>

                      <motion.div variants={itemVariants} custom={3}>
                        <input
                          placeholder="Subject"
                          value={form.subject}
                          onChange={(e) => { setForm({ ...form, subject: e.target.value }); if (e.target.value.trim().length > 0) setTouched(t => ({ ...t, subject: true })); }}
                          onBlur={() => setTouched(t => ({ ...t, subject: true }))}
                          aria-invalid={!!errors.subject}
                          className={`px-3 py-2 rounded border ${errors.subject ? 'border-red-400' : ''} bg-[var(--bg2)] w-full`}
                        />
                        {errors.subject && <div className="text-xs text-red-400 mt-1">{errors.subject}</div>}
                      </motion.div>

                      <motion.div variants={itemVariants} custom={4}>
                        <textarea
                          required
                          placeholder="Message"
                          value={form.message}
                          onChange={(e) => { setForm({ ...form, message: e.target.value }); if (e.target.value.trim().length > 0) setTouched(t => ({ ...t, message: true })); }}
                          onBlur={() => setTouched(t => ({ ...t, message: true }))}
                          aria-invalid={!!errors.message}
                          className={`px-3 py-2 rounded border ${errors.message ? 'border-red-400' : ''} bg-[var(--bg2)] h-32 resize-none w-full`}
                        />
                        <div className="flex items-center justify-between text-xs mt-1">
                          <div className={` ${errors.message ? 'text-red-400' : 'text-[var(--text2)]'}`}>
                            {form.message.trim() ? form.message.trim().split(/\s+/).filter(Boolean).length : 0}/{WORD_LIMIT} words
                          </div>
                          {errors.message && <div className="text-xs text-red-400">{errors.message}</div>}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} custom={5} className="flex items-center justify-between gap-4">
                        <button type="submit" disabled={sending || !isFormValid} className="px-4 py-2 bg-[var(--cyan)] text-white rounded disabled:opacity-50">
                          {sending ? 'Sending…' : 'Send'}
                        </button>
                        <button type="button" onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setFormStatus(null); setErrors({}); setTouched({}); setSubmitAttempt(false); }} className="px-4 py-2 border rounded">
                          Reset
                        </button>
                      </motion.div>

                      <motion.div variants={itemVariants} custom={6}>
                        {formStatus && <div className="text-sm mt-2">{formStatus}</div>}
                      </motion.div>
                    </div>
                  </motion.form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </RevealWrapper>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-8 right-8 bg-[var(--green)] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-[1000]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ boxShadow: "0 0 30px var(--green-glow)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
