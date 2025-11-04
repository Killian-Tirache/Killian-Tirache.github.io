import "./Navbar.css";
import { NavLink } from "react-router-dom";

interface NavbarProps {
    isMobileMenuOpen: boolean;
    closeMobileMenu: () => void;
}

export default function Navbar({ isMobileMenuOpen, closeMobileMenu }: NavbarProps) {
    return (
        <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMobileMenu}
            >
                Accueil
            </NavLink>
            <NavLink
                to="/projects"
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMobileMenu}
            >
                Projets
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMobileMenu}
            >
                À propos
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMobileMenu}
            >
                Contact
            </NavLink>
        </nav>
    )
}