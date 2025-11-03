import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="app">
      <Preloader setIsLoading={setIsLoading} />
      <ParticlesBackground />
      <ScrollToTop />
      <Header />
      { isLoading ? "" : 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes> }
      <FollowPointer />
      <Footer />
    </div>
  );
}