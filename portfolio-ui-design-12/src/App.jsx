import { lazy, Suspense, useEffect } from "react";
import styled from "styled-components";
import SectionBoundary from "./components/SectionBoundary";
const Contact = lazy(() => import("./components/Contact"));
import Hero from "./components/Hero";
const Who = lazy(() => import("./components/Who"));
const Works = lazy(() => import("./components/Works"));

/* Main scroll container: full viewport height, vertical scroll-snap so each section snaps into view. */
const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  @media (prefers-reduced-motion: reduce) { scroll-behavior: auto; }
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("/img/bg.jpeg");
  &::-webkit-scrollbar{
    display: none;
  }
`;

/** Root layout: four full-page sections in order (Hero → Who → Works → Contact). Single route, no router. */
function App() {
  // The browser may resolve the initial hash before React has mounted its anchors.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (["home", "studio", "works", "contact"].includes(id)) {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return (
    <Container>
      <Hero />
      {[
        ["studio", "Who we Are", Who],
        ["works", "Works", Works],
        ["contact", "Contact Us", Contact],
      ].map(([id, title, Section]) => (
        <div id={id} key={id} style={{ scrollSnapAlign: "start" }}>
          <SectionBoundary>
            <Suspense fallback={<div style={{ minHeight: "100vh", padding: "2rem" }}><h2>{title}</h2></div>}>
              <Section />
            </Suspense>
          </SectionBoundary>
        </div>
      ))}
    </Container>
  );
}

export default App;
