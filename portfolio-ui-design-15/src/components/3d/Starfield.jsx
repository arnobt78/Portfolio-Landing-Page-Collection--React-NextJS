import { Component, lazy, Suspense, useEffect, useState } from "react";

const FloatingShapes = lazy(() => import("./FloatingShapes"));

// The decorative scene must never prevent the portfolio from rendering.
class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Starfield() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event) => setReducedMotion(event.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return reducedMotion ? null : (
    <SceneBoundary>
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>
    </SceneBoundary>
  );
}
