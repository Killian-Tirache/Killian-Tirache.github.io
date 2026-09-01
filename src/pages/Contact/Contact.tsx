import "./Contact.css";
import { motion } from "framer-motion";
import { useState } from "react";
import usePageMeta from "../../hooks/usePageMeta";
import { PAGE_META } from "../../data/pageMeta";

// L'adresse reste décodable côté client, mais n'apparaît pas en clair pour les
// robots qui se contentent de chercher des emails dans le HTML et le JavaScript.
const FORM_RECIPIENT = atob("a2lsbGlhbnRpcmFjaGUyQGdtYWlsLmNvbQ==");
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_RECIPIENT}`;

interface FormSubmitResponse {
  success?: boolean | "true" | "false";
}

export default function Contact() {
  usePageMeta(PAGE_META.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: "Nouveau message depuis le portfolio",
          _template: "table",
          _honey: honeypot,
          _url: window.location.href,
        }),
      });

      const result = await response.json().catch(() => null) as FormSubmitResponse | null;
      const serviceRejected = result?.success === false || result?.success === "false";

      if (!response.ok || serviceRejected) {
        throw new Error("FormSubmit a refusé le message");
      }

      setStatus({ ok: true, msg: "Ton message a bien été envoyé. Merci !" });
      setFormData({ name: "", email: "", message: "" });
      setHoneypot("");
    } catch {
      setStatus({
        ok: false,
        msg: "Le message n'a pas pu être envoyé. Réessaie dans quelques instants.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="contact" tabIndex={-1}>
      <section className="contact__intro">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.h1>

        <motion.p
          className="contact__subtitle"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true }}
        >
          Une idée, un projet, une collaboration ? <br />
          N’hésite pas à m’envoyer un message, je te répondrai avec plaisir.
        </motion.p>
      </section>

      <motion.form
        className="contact__form"
        onSubmit={handleSubmit}
        aria-busy={submitting}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
      >
        <input
          className="form__honeypot"
          name="_honey"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          hidden
        />
        <div className="form__row">
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ton nom"
            required
            autoComplete="name"
          />
        </div>

        <div className="form__row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ton email"
            required
            autoComplete="email"
          />
        </div>

        <div className="form__row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Dis-moi tout !"
            rows={6}
            required
          />
        </div>

        <div className="form__actions">
          <motion.button
            type="submit"
            className="contact__button"
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
          >
            {submitting ? "Envoi..." : "Envoyer"}
          </motion.button>

          {status && (
            <div
              className={`form__status ${status.ok ? "ok" : "error"}`}
              role={status.ok ? "status" : "alert"}
              aria-live={status.ok ? "polite" : "assertive"}
              aria-atomic="true"
            >
              {status.msg}
            </div>
          )}
        </div>
      </motion.form>
    </main>
  );
}
