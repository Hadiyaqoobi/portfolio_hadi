import { portfolioData } from "@/data/portfolio-data";
import { useState, FormEvent } from "react";

// Set VITE_WEB3FORMS_ACCESS_KEY in Vercel (Project → Settings → Environment
// Variables; key is free at web3forms.com). Until it is set, the form is
// replaced by a direct-email block, never a silently failing form.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

const inputClasses =
  "w-full font-sans text-sm text-ink bg-paper-raised border border-line rounded-md px-3 py-2 placeholder:text-muted focus:outline-none focus:border-ink transition-colors duration-150";

const labelClasses = "block font-sans text-[0.8rem] text-muted mb-1.5";

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
    <section id="contact" className="mx-auto w-full max-w-3xl px-5 sm:px-6 py-14 sm:py-16">
      <h1 className="mb-5">Contact</h1>
      <p className="prose-measure text-ink-soft mb-10">
        I'm looking for IT BSA, product, and data analyst roles. Email me with
        the role and I'll reply with the parts of my record most relevant to it.
      </p>

      <dl className="facts">
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${personal.email}`} className="link">
            {personal.email}
          </a>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            linkedin.com/in/m-hadi-y-509439215 <span aria-hidden="true">&#8599;</span>
          </a>
        </dd>
        <dt>Location</dt>
        <dd>Boston, MA</dd>
        <dt>Work authorization</dt>
        <dd>U.S. permanent resident (Green Card). No sponsorship needed, now or later.</dd>
        <dt>Status</dt>
        <dd>Open to opportunities</dd>
      </dl>

      <div className="rule" role="presentation" />

      {!WEB3FORMS_KEY ? (
        <div>
          <h2 className="mb-4">Email me directly</h2>
          <p className="prose-measure text-ink-soft mb-6">
            The fastest way to reach me. I reply within a day.
          </p>
          <a href={`mailto:${personal.email}?subject=Portfolio contact`} className="btn-quiet">
            {personal.email}
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
          <h2 className="mb-4">Send a message</h2>

          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClasses}>
              Message
            </label>
            <textarea
              id="contact-message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your message"
              rows={6}
              className={`${inputClasses} resize-none`}
            />
          </div>

          {status === "success" && (
            <p className="font-sans text-sm text-ok" role="status">
              Message sent. I'll get back to you soon.
            </p>
          )}

          {status === "error" && (
            <p className="font-sans text-sm text-accent" role="status">
              Something went wrong. Try emailing me directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-quiet disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </section>
  );
};
