import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import FollowPointer from "./components/FollowPointer/FollowPointer";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import NotFound from "./pages/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader/Preloader";
import Project from "./pages/Project/Project";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

export default function App() {
  const [isIntroductionComplete, setIsIntroductionComplete] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  const finishIntroduction = useCallback(() => {
    setIsIntroductionComplete(true);
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Aller au contenu principal</a>
      <Preloader onComplete={finishIntroduction} />
      <ParticlesBackground />
      <ScrollToTop />
      <Header />
      {isIntroductionComplete && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      {isDesktop && <FollowPointer />}
      <Footer />
    </div>
  );
}
