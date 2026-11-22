/**
 * Root App component. Wraps the entire site in Lenis for smooth scrolling and
 * shows non-blocking progress while Three.js assets (e.g. Hero planet) load.
 */
import React, { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";

const App = () => {
  // useProgress() comes from React Three Fiber/Drei; tracks loading of 3D assets (used in Hero)
  const { progress, errors } = useProgress();
  const [sceneFailed, setSceneFailed] = useState(false);
  // A failed decorative model must not prevent visitors from using the portfolio.
  const isReady = progress === 100 || errors.length > 0 || sceneFailed;

  return (
    // Lenis provides smooth, momentum-based scrolling; root makes it the scroll container
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {/* Decorative assets must never block the page, even on a stalled connection. */}
      {!isReady && (
        <div role="status" className="pointer-events-none fixed bottom-4 right-4 z-[999] flex flex-col items-center rounded bg-black/80 p-4 text-white font-light">
          <p className="mb-2 text-sm tracking-widest">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Section order defines page flow independently of the decorative model. */}
      <div>
        <Navbar />
        <Hero onSceneError={() => setSceneFailed(true)} />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
