import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isSticky, setIsSticky] = useState<Boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    
    useEffect(() => {
        const handleScroll = () => {
            const shouldBeSticky = window.scrollY > 0;
            setIsSticky(prev => (prev !== shouldBeSticky ? shouldBeSticky : prev));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fermer le menu au clic sur un lien
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    
    return (
        <header className={isSticky ? "header sticky" : "header"}>
            <Link to="/" onClick={closeMobileMenu}>
                <h2>Kt.</h2>
            </Link>
            
            <button 
                className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
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