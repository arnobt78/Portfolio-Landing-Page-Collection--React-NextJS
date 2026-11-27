import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Projects from "./Projects";

// jsdom does not implement the native modal dialog methods.
beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  HTMLDialogElement.prototype.showModal = vi.fn(function () { this.setAttribute("open", ""); });
  HTMLDialogElement.prototype.close = vi.fn(function () { this.removeAttribute("open"); });
});

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("project details", () => {
  it.each([
    ["StudyHub – Learning Platform", "Enter"],
    ["Job Application Portal", " "],
    ["Smart Shopping Cart", "Enter"],
  ])("opens %s by keyboard and restores focus after Escape", (title, key) => {
    render(<Projects />);
    const card = screen.getByRole("button", { name: `View details for ${title}` });
    card.focus();
    fireEvent.keyDown(card, { key });
    const dialog = screen.getByRole("dialog", { name: title });
    expect(dialog.hasAttribute("open")).toBe(true);
    fireEvent(dialog, new Event("cancel", { bubbles: false, cancelable: true }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(card);
  });

  it("closes from the backdrop and returns focus to the opening card", () => {
    render(<Projects />);
    const card = screen.getByRole("button", { name: /View details for StudyHub/ });
    fireEvent.click(card);
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(card);
  });
});
