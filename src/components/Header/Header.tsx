import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    
    useEffect(() => {
        const handleScroll = () => {
            const shouldBeSticky = window.scrollY > 0;
            setIsSticky(prev => (prev !== shouldBeSticky ? shouldBeSticky : prev));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            setIsMobileMenuOpen(false);
            menuButtonRef.current?.focus();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobileMenuOpen]);

    // Fermer le menu au clic sur un lien
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    
    return (
        <header className={isSticky ? "header sticky" : "header"}>
            <Link to="/" onClick={closeMobileMenu}>
                <span className="header__logo">Kt.</span>
            </Link>
            
            <button
                ref={menuButtonRef}
                type="button"
                className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Fermer le menu principal" : "Ouvrir le menu principal"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="main-navigation"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <Navbar 
                isMobileMenuOpen={isMobileMenuOpen} 
                closeMobileMenu={closeMobileMenu}
            />
        </header>
    )
}
