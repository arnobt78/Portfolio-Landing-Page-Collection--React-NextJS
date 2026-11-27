/**
 * Main layout: cursor, navbar, social icons, and scrollable sections.
 * children = Character (3D) on desktop only. TechStack is lazy-loaded for desktop.
 * On resize, setSplitText re-applies GSAP split-text and isDesktopView is updated.
 */
import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingProvider";
import ErrorBoundary from "./ErrorBoundary";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText, { clearSplitText } from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const { isLoading, skipEntrance } = useLoading();
  const entranceStarted = useRef(false);
  // If the layout itself was delayed, begin the entrance when it has actually mounted.
  useEffect(() => {
    if (isLoading || skipEntrance || entranceStarted.current) return;
    let active = true;
    void import("./utils/initialFX").then(({ initialFX }) => {
      if (active && !entranceStarted.current) {
        entranceStarted.current = true;
        initialFX();
      }
    }).catch(() => {});
    return () => { active = false; };
  }, [isLoading, skipEntrance]);

  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [showTechStack, setShowTechStack] = useState(false);
  const techRef = useRef<HTMLDivElement>(null);

  // Avoid starting the heavy physics scene until its reserved section is nearby.
  useEffect(() => {
    const node = techRef.current;
    if (!isDesktopView || showTechStack || !node) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setShowTechStack(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShowTechStack(true); observer.disconnect(); }
    }, { rootMargin: "600px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [isDesktopView, showTechStack]);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", resizeHandler);
    preference.addEventListener("change", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      preference.removeEventListener("change", resizeHandler);
      clearSplitText();
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {/* 3D character only on desktop; on mobile it is rendered inside Landing as children */}
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {/* 3D tech spheres section; lazy-loaded and desktop-only */}
            {isDesktopView && (
              <div ref={techRef}>
                <ErrorBoundary fallback={<div className="techstack"><h2>My Techstack</h2><p role="status">3D technology preview unavailable.</p></div>}>
                  {showTechStack ? (
                    <Suspense fallback={<div className="techstack"><h2>My Techstack</h2></div>}>
                      <TechStack />
                    </Suspense>
                  ) : <div className="techstack"><h2>My Techstack</h2></div>}
                </ErrorBoundary>
              </div>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
