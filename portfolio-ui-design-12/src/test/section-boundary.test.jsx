// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import SectionBoundary from "../components/SectionBoundary";

// A failed lazy section must leave unrelated page content available.
it("isolates a failed section and offers a reload", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  const BrokenSection = () => { throw new Error("Chunk unavailable"); };
  render(<><p>Navigation remains available</p><SectionBoundary><BrokenSection /></SectionBoundary></>);
  expect(screen.getByText("Navigation remains available")).toBeTruthy();
  expect(screen.getByRole("alert").textContent).toContain("could not be loaded");
  expect(screen.getByRole("button", { name: "Reload page" })).toBeTruthy();
  error.mockRestore();
});
afterEach(cleanup);
