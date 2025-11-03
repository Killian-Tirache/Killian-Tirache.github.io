import "./About.css";
import { motion } from "framer-motion";
import profileImage from "./../../assets/home-image.webp";

export default function About() {
  return (
    <main className="about">
      <section className="about__intro">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1>À propos de moi</h1>
          <p>
            Je m'appelle <span>Killian</span>, je suis{" "}
            <span>développeur web full-stack</span> passionné par la création
            d’expériences interactives, esthétiques et fluides.
          </p>
          <p>
            J’aime concevoir des interfaces modernes où le design et la
            performance se rencontrent pour créer une véritable immersion.
          </p>
        </motion.div>

        <motion.div
          className="about__image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="image-glow">
            <img src={profileImage} alt="Développeur au travail" />
          </div>
        </motion.div>
      </section>

      <section className="about__skills">
        <h2>Compétences</h2>
        <div className="skills__grid">
          {[
            "HTML / CSS / JS",
            "React / TypeScript",
            "Node.js / Express",
            "MongoDB / PostgreSQL",
            "Git / Docker",
            "Framer Motion / GSAP",
          ].map((skill, i) => (
            <motion.div
              key={i}
              className="skill__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about__values">
        <h2>Ma philosophie</h2>
        <p>
          Pour moi, le code est une forme d’art : une manière de concevoir des
          expériences <span>intuitives</span>, <span>immersives</span> et{" "}
          <span>élégantes</span>.  
          Je crois en la <span>curiosité</span>, la <span>rigueur</span> et la{" "}
          <span>créativité</span> comme moteurs de chaque projet réussi.
        </p>
      </section>
    </main>
  );
}
