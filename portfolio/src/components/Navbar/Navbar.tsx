import "./Navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <section className="navbar">
            <NavLink
                to="/"
                className={({ isActive }) => isActive  ? "active" : "" }
            >
                Accueil
            </NavLink>
            <NavLink
                to="/projects"
                className={({ isActive }) => isActive  ? "active" : "" }
            >
                Projets
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) => isActive  ? "active" : "" }
            >
                À propos
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) => isActive  ? "active" : "" }
            >
                Contact
            </NavLink>
        </section>
    )
}