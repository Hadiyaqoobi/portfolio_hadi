import { motion } from "framer-motion";
import { Mail, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { useState, FormEvent } from "react";

// Set VITE_WEB3FORMS_ACCESS_KEY in Vercel (Project → Settings → Environment
// Variables; key is free at web3forms.com). Until it is set, the form is
// replaced by a direct-email card — never a silently failing form.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

export const Contact = () => {
  const { personal } = portfolioData;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-4xl mx-auto"
        >
          <div className="accent-line mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-base max-w-lg">
            Looking for IT BSA, Product, or Data Analyst roles. Let's connect
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="glass-card p-7 overflow-hidden">
              <h3 className="text-base font-bold text-slate-100 mb-6">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Mail className="text-indigo-400" size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">
                      {personal.email}
                    </div>
                  </div>
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Linkedin className="text-indigo-400" size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">LinkedIn</div>
                    <div className="text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">
                      Connect with me
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-700">
                <div className="text-xs text-slate-500">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-2" />
                  Available for opportunities
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (or direct-email card when no form key is configured) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {!WEB3FORMS_KEY ? (
              <div className="glass-card p-7 overflow-hidden flex flex-col items-start justify-center h-full gap-4">
                <h3 className="text-base font-bold text-slate-100">Email me directly</h3>
                <p className="text-sm text-slate-400">
                  The fastest way to reach me — I reply within a day.
                </p>
                <a
                  href={`mailto:${personal.email}?subject=Portfolio contact`}
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm"
                >
                  <Mail size={14} />
                  {personal.email}
                </a>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="glass-card p-7 space-y-4 overflow-hidden">
              <div>
                <label htmlFor="contact-name" className="text-xs text-slate-500 mb-2 block">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="text-xs text-slate-500 mb-2 block">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs text-slate-500 mb-2 block">Message</label>
                <textarea
                  id="contact-message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 transition-colors resize-none"
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle size={16} />
                  Message sent. I'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Try emailing me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm disabled:opacity-50"
              >
                <Send size={14} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20 pt-8 border-t border-slate-700"
      >
        <p className="text-slate-500 text-sm">
          © 2026 {personal.name}
        </p>
      </motion.div>
    </section>
  );
};
