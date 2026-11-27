// @vitest-environment jsdom
import { StrictMode, type ReactNode } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadingProvider, useLoading } from "../context/LoadingProvider";
import { setProgress } from "../components/Loading";

vi.mock("react-fast-marquee", () => ({ default: ({ children }: { children: ReactNode }) => <div>{children}</div> }));

const Content = () => {
  const { finishLoading, setLoading, isFallback } = useLoading();
  return <><output data-testid="fallback-state">{String(isFallback())}</output><h1>Portfolio content</h1><button onClick={() => { finishLoading(); finishLoading(); }}>Complete twice</button><button onClick={() => setLoading(100)}>Asset ready</button><button onClick={() => finishLoading("ready")}>Ready now</button></>;
};

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.body.classList.remove("portfolio-no-intro");
  document.body.style.overflowY = "";
});

// REQ-0007/0009: model loading failures and slow networks must not block the portfolio.
describe("portfolio loading", () => {
  it("lets a visitor immediately continue without the 3D scene", async () => {
    render(<LoadingProvider><Content /></LoadingProvider>);
    expect(screen.getByRole("button", { name: /continue without 3d/i })).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /continue without 3d/i }));
      await Promise.resolve();
    });
    expect(screen.queryByRole("button", { name: /continue without 3d/i })).toBeNull();
    expect(screen.getByRole("heading", { name: "Portfolio content" })).toBeTruthy();
    expect(document.body.classList.contains("portfolio-no-intro")).toBe(true);
    expect(document.querySelector("main")?.classList.contains("main-active")).toBe(false);
  });

  it("automatically makes the portfolio usable after eight seconds", async () => {
    render(<LoadingProvider><Content /></LoadingProvider>);
    await act(async () => { await vi.advanceTimersByTimeAsync(7999); });
    expect(screen.getByRole("button", { name: /continue without 3d/i })).toBeTruthy();
    await act(async () => { await vi.advanceTimersByTimeAsync(1); });
    expect(screen.queryByRole("button", { name: /continue without 3d/i })).toBeNull();
    expect(screen.getByRole("heading", { name: "Portfolio content" })).toBeTruthy();
  });

  it("finishes once even if multiple completion events arrive", async () => {
    render(<LoadingProvider><Content /></LoadingProvider>);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Complete twice" }));
      await Promise.resolve();
    });
    expect(screen.queryByRole("button", { name: /continue without 3d/i })).toBeNull();
    expect(screen.getByRole("heading", { name: "Portfolio content" })).toBeTruthy();
  });

  it("completes the normal success transition before the stall timeout", async () => {
    render(<LoadingProvider><Content /></LoadingProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Asset ready" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(2500); });
    expect(screen.queryByRole("button", { name: /continue without 3d/i })).toBeNull();
    expect(screen.getByRole("heading", { name: "Portfolio content" })).toBeTruthy();
  });

  it("reveals fallback content when 3D fails after normal completion", () => {
    render(<LoadingProvider><Content /></LoadingProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Ready now" }));
    expect(document.body.classList.contains("portfolio-no-intro")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Complete twice" }));
    expect(document.body.classList.contains("portfolio-no-intro")).toBe(true);
    expect(document.querySelector("main")?.classList.contains("main-active")).toBe(false);
    expect(document.body.style.overflowY).toBe("auto");
  });

  it("skips the entrance fade for a reduced-motion preference", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(<LoadingProvider><Content /></LoadingProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Asset ready" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(2500); });
    expect(document.body.classList.contains("portfolio-no-intro")).toBe(true);
    expect(document.querySelector("main")?.classList.contains("main-active")).toBe(false);
  });

  it("distinguishes reduced motion from actual model fallback", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(<LoadingProvider><Content /></LoadingProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Ready now" }));
    expect(screen.getByTestId("fallback-state").textContent).toBe("false");
    fireEvent.click(screen.getByRole("button", { name: "Complete twice" }));
    expect(screen.getByTestId("fallback-state").textContent).toBe("true");
  });

  it("stops progress callbacks when the scene is disposed", async () => {
    const update = vi.fn();
    const progress = setProgress(update);
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(update).toHaveBeenCalled();
    progress.cancel();
    update.mockClear();
    await act(async () => { await vi.advanceTimersByTimeAsync(10000); });
    expect(update).not.toHaveBeenCalled();
  });

  it("cleans up the automatic timeout when unmounted", async () => {
    const view = render(<StrictMode><LoadingProvider><Content /></LoadingProvider></StrictMode>);
    view.unmount();
    await act(async () => { await vi.advanceTimersByTimeAsync(9000); });
    expect(vi.getTimerCount()).toBe(0);
  });
});
