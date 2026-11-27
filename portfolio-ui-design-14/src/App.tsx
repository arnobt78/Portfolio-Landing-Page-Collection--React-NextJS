import { lazy, Suspense } from "react";
import "./App.css";
import { LoadingProvider, useLoading } from "./context/LoadingProvider";
import ErrorBoundary from "./components/ErrorBoundary";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));

function Portfolio() {
  const { finishLoading } = useLoading();
  return (
    <ErrorBoundary onError={finishLoading} fallback={<p role="alert">The portfolio could not be loaded. Please reload the page.</p>}>
      <Suspense fallback={null}>
        <MainContainer>
          <ErrorBoundary onError={finishLoading} fallback={<p role="status">3D character unavailable.</p>}>
            <Suspense fallback={null}><CharacterModel /></Suspense>
          </ErrorBoundary>
        </MainContainer>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return <LoadingProvider><Portfolio /></LoadingProvider>;
}
