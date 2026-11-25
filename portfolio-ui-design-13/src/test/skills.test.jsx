// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import Skills from "../sections/Skills";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  return {
    useMotionValue: () => ({ get: () => 0, set: () => {} }),
    motion: new Proxy({}, { get: (_, tag) => ({ initial: _initial, whileInView: _whileInView, transition: _transition, ...props }) => React.createElement(tag, props) }),
  };
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("shows every skill without animation and follows changes to the motion preference", () => {
  let listener;
  const query = { matches: true, addEventListener: (_type, fn) => { listener = fn; }, removeEventListener: () => {} };
  vi.stubGlobal("matchMedia", () => query);
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} });
  render(<Skills />);
  expect(screen.getAllByLabelText("Angular")).toHaveLength(1);
  act(() => listener({ matches: false }));
  expect(screen.getAllByLabelText("Angular")).toHaveLength(2);
  act(() => listener({ matches: true }));
  expect(screen.getAllByLabelText("Angular")).toHaveLength(1);
});
