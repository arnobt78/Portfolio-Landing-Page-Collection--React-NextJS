import { createContext, type PropsWithChildren, useCallback, useContext, useRef, useState } from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
  finishLoading: (mode?: "ready" | "fallback") => void;
  skipEntrance: boolean;
}

// Shared loader controls allow the page to recover independently of WebGL.
// eslint-disable-next-line react-refresh/only-export-components
export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);
  const [skipEntrance, setSkipEntrance] = useState(false);
  const finished = useRef(false);

  const finishLoading = useCallback((mode: "ready" | "fallback" = "fallback") => {
    if (finished.current) {
      // A later WebGL failure must reveal sections formerly driven by the 3D timeline.
      if (mode === "fallback") {
        setSkipEntrance(true);
        document.body.classList.add("portfolio-no-intro");
        document.querySelector("main")?.classList.remove("main-active");
        document.body.style.overflowY = "auto";
      }
      return;
    }
    finished.current = true;
    const skip = mode === "fallback" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    setSkipEntrance(skip);
    document.body.classList.toggle("portfolio-no-intro", skip);
    document.body.style.overflowY = "auto";
    if (!skip) document.querySelector("main")?.classList.add("main-active");
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, setLoading, finishLoading, skipEntrance }}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};
