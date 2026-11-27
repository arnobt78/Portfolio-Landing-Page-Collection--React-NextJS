/** Loader with a normal entrance transition and a bounded fallback for slow 3D assets. */
import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import MarqueeImport from "react-fast-marquee";

// Vite 8 may expose this CommonJS package through a nested default export.
const marqueeModule: unknown = MarqueeImport;
const Marquee = (typeof marqueeModule === "object" && marqueeModule !== null && "default" in marqueeModule
  ? marqueeModule.default
  : marqueeModule) as typeof MarqueeImport;

const Loading = ({ percent }: { percent: number }) => {
  const { finishLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const completed = percent >= 100;

  // A stalled asset never blocks the portfolio indefinitely.
  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 8000);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  // Schedule the existing success transition once, outside render.
  useEffect(() => {
    if (!completed) return;
    const ready = setTimeout(() => setLoaded(true), 600);
    const animate = setTimeout(() => setClicked(true), 1600);
    const done = setTimeout(() => finishLoading("ready"), 2500);
    return () => { clearTimeout(ready); clearTimeout(animate); clearTimeout(done); };
  }, [completed, finishLoading]);

  /** Track mouse for CSS --mouse-x/--mouse-y (e.g. button hover effect) */
  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Logo
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <button type="button" className="loading-continue" onClick={() => finishLoading()}>Continue without 3D</button>
        <div className="loading-marquee">
          <Marquee>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
            <span> A Creative Developer</span> <span>A Creative Designer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

/**
 * Shared with Character scene: returns { loaded, percent, clear }. Intervals
 * drive percent 0→100; loaded() returns a Promise that resolves when percent
 * reaches 100. Character calls setProgress(callback) and uses loaded().then(...).
 */
// Shared with Character scene; separate export for compatibility
// eslint-disable-next-line react-refresh/only-export-components
export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  function cancel() { clearInterval(interval); }
  return { loaded, percent, clear, cancel };
};
