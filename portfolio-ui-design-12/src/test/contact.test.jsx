// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Contact from "../components/Contact";
import emailjs from "@emailjs/browser";

vi.mock("../components/Map", () => ({ default: () => null }));
vi.mock("@emailjs/browser", () => ({ default: { sendForm: vi.fn() } }));

function fillForm() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
}

beforeEach(() => {
  vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "");
  vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "");
  vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "");
});
afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("contact form", () => {
  it("explains missing configuration without sending", () => {
    render(<Contact />);
    fillForm();
    fireEvent.submit(screen.getByRole("button", { name: "Send" }).closest("form"));
    expect(screen.getByRole("status").textContent).toContain("not configured");
    expect(emailjs.sendForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Message").value).toBe("Hello");
  });

  it.each([true, false])("handles a configured send, success=%s", async (success) => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "template");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "public");
    let finish;
    emailjs.sendForm.mockImplementation(() => new Promise((resolve, reject) => { finish = success ? resolve : reject; }));
    render(<Contact />);
    fillForm();
    const form = screen.getByRole("button", { name: "Send" }).closest("form");
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Sending…" }).disabled).toBe(true);
    expect(screen.getByLabelText("Name").disabled).toBe(true);
    expect(screen.getByLabelText("Email").disabled).toBe(true);
    expect(screen.getByLabelText("Message").disabled).toBe(true);
    finish();
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain(success ? "has been sent" : "could not be sent"));
    expect(screen.getByLabelText("Message").value).toBe(success ? "" : "Hello");
    expect(screen.getByLabelText("Message").disabled).toBe(false);
  });
});
