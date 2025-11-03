import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isSticky, setIsSticky] = useState<Boolean>(false);
    
    useEffect(() => {
        const handleScroll = () => {
            const shouldBeSticky = window.scrollY > 0;
            setIsSticky(prev => (prev !== shouldBeSticky ? shouldBeSticky : prev));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    return (
        <header className={isSticky ? "header sticky" : "header"}>
            <Link to="/">
                <h2>Kt.</h2>
            </Link>
            <Navbar />
        </header>
    )
}