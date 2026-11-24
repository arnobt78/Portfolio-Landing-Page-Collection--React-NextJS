// @vitest-environment jsdom
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import Contact from "../sections/Contact";

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));
vi.mock("../components/ParticlesBackground.jsx", () => ({ default: () => null }));
vi.mock("framer-motion", async () => {
  const React = await import("react");
  return { motion: new Proxy({}, { get: (_, tag) => ({ initial: _initial, whileInView: _whileInView, whileHover: _whileHover, whileTap: _whileTap, transition: _transition, animate: _animate, ...props }) => React.createElement(tag, props) }) };
});

function fill(service = "Others") {
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByLabelText(/^Service Needed/), { target: { value: service } });
  fireEvent.change(screen.getByLabelText(/^Idea/), { target: { value: "Project idea" } });
}
const submit = () => fireEvent.submit(screen.getByRole("button", { name: /Send Message|Sending/ }).closest("form"));
beforeEach(() => {
  for (const key of ["VITE_SERVICE_ID", "VITE_TEMPLATE_ID", "VITE_PUBLIC_KEY"]) vi.stubEnv(key, "");
});
afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("contact form", () => {
  it("allows Others without a budget and reports demo mode without sending", () => {
    render(<Contact />); fill();
    expect(screen.queryByLabelText(/^Budget/)).toBeNull();
    submit();
    expect(screen.getByRole("status").textContent).toContain("disabled in demo mode");
    expect(emailjs.send).not.toHaveBeenCalled();
  });
  it("requires a budget for web development", () => {
    render(<Contact />); fill("Web Development"); submit();
    expect(screen.getByLabelText(/^Budget/)).toBeTruthy();
    expect(screen.getByText("Fill this field")).toBeTruthy();
    expect(screen.getByLabelText(/^Budget/).getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByLabelText(/^Budget/).getAttribute("aria-describedby")).toBe("budget-error");
    expect(emailjs.send).not.toHaveBeenCalled();
  });
  it("does not send a hidden budget after switching to Others", async () => {
    for (const key of ["VITE_SERVICE_ID", "VITE_TEMPLATE_ID", "VITE_PUBLIC_KEY"]) vi.stubEnv(key, "public-value");
    emailjs.send.mockResolvedValue({});
    render(<Contact />); fill("Web Development");
    fireEvent.change(screen.getByLabelText(/^Budget/), { target: { value: "500" } });
    fireEvent.change(screen.getByLabelText(/^Service Needed/), { target: { value: "Others" } });
    submit();
    await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1));
    expect(emailjs.send.mock.calls[0][2].budget).toBe("");
  });
  it.each([true, false])("handles a pending send, success=%s", async (success) => {
    for (const key of ["VITE_SERVICE_ID", "VITE_TEMPLATE_ID", "VITE_PUBLIC_KEY"]) vi.stubEnv(key, "public-value");
    let finish;
    emailjs.send.mockImplementation(() => new Promise((resolve, reject) => { finish = success ? resolve : reject; }));
    render(<Contact />); fill(); submit(); submit();
    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText(/^Idea/).disabled).toBe(true);
    finish();
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain(success ? "successfully" : "wrong"));
    expect(screen.getByLabelText(/^Idea/).value).toBe(success ? "" : "Project idea");
    expect(screen.getByLabelText(/^Idea/).disabled).toBe(false);
  });
});
