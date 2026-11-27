// @vitest-environment jsdom
import { StrictMode } from "react";
import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import WhatIDo from "../components/WhatIDo";

afterEach(cleanup);

it("toggles cards once under StrictMode using pointer and keyboard", () => {
  render(<StrictMode><WhatIDo /></StrictMode>);
  const develop = screen.getByRole("button", { name: /develop/i });
  const design = screen.getByRole("button", { name: /design/i });
  fireEvent.click(develop);
  expect(develop.getAttribute("aria-expanded")).toBe("true");
  expect(develop.closest(".what-box-in")?.classList.contains("what-has-active")).toBe(true);
  expect(design.getAttribute("aria-expanded")).toBe("false");
  fireEvent.keyDown(design, { key: "Enter" });
  expect(design.getAttribute("aria-expanded")).toBe("true");
  expect(develop.getAttribute("aria-expanded")).toBe("false");
  fireEvent.keyDown(design, { key: " " });
  expect(design.getAttribute("aria-expanded")).toBe("false");
  expect(design.closest(".what-box-in")?.classList.contains("what-has-active")).toBe(false);
});
