import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import App from "./App";

vi.mock("framer-motion", () => ({ MotionConfig: ({ children }) => children }));
vi.mock("./components/Navbar", () => ({ default: () => null }));
vi.mock("./components/Hero", () => ({ default: () => null }));
vi.mock("./components/About", () => ({ default: () => null }));
vi.mock("./components/Skills", () => ({ default: () => null }));
vi.mock("./components/Projects", () => ({ default: () => <section id="projects" /> }));
vi.mock("./components/Education", () => ({ default: () => null }));
vi.mock("./components/Contact", () => ({ default: () => null }));
vi.mock("./components/Footer", () => ({ default: () => null }));

beforeEach(() => {
  window.history.replaceState(null, "", "/#projects");
  vi.spyOn(document, "readyState", "get").mockReturnValue("interactive");
  vi.stubGlobal("scrollY", 100);
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

it("does not pull the visitor back to the initial hash after they scroll", () => {
  render(<App />);
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  vi.stubGlobal("scrollY", 0);
  window.dispatchEvent(new Event("load"));
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});

it("realigns the initial section after load if navigation has not changed", () => {
  render(<App />);
  window.dispatchEvent(new Event("load"));
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
});
