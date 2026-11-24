/**
 * Root layout: single-page portfolio. Renders intro (until onFinish), then all sections in order.
 * introDone state controls whether IntroAnimation is shown; Home receives it for optional reveal logic.
 */
import { useEffect, useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // React mounts the section anchors after the browser's initial hash lookup.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!["home", "about", "skills", "projects", "experience", "testimonials", "contact"].includes(id)) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative animated-gradient text-white">
      <CustomCursor />
      <Navbar />
      <MusicPlayer />

      {/* Intro always on top until it finishes */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/* Homepage always present (masked reveal) */}
      <Home introDone={introDone} />

      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
