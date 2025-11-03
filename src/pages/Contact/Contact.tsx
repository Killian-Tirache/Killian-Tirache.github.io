import "./Contact.css";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setStatus({ ok: true, msg: "Merci ! Ton message a bien été envoyé." });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="contact">
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
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
      >
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
            <div className={`form__status ${status.ok ? "ok" : "error"}`}>
              {status.msg}
            </div>
          )}
        </div>
      </motion.form>
    </main>
  );
}
