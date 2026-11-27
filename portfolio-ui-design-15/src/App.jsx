/**
 * Root layout component. Composes the single-page portfolio: fixed Navbar, scrollable
 * main sections (Hero → About → Skills → Projects → Education → Contact), and Footer.
 * selection:bg-blue-500/30 styles the text selection highlight.
 */
import React, { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // The section elements are rendered by React after the browser's first hash lookup.
    const initialHash = window.location.hash;
    if (!initialHash) return;
    const scrollToInitialSection = () => {
      const id = initialHash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    };
    scrollToInitialSection();
    const initialScrollY = window.scrollY;
    const realignIfUnchanged = () => {
      if (window.location.hash === initialHash && Math.abs(window.scrollY - initialScrollY) < 2) {
        scrollToInitialSection();
      }
    };
    if (document.readyState !== "complete") {
      window.addEventListener("load", realignIfUnchanged, { once: true });
    }
    return () => window.removeEventListener("load", realignIfUnchanged);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
    </MotionConfig>
  );
}

export default App;
