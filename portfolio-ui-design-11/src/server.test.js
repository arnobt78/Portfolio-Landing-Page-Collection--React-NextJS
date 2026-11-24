// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { createContactApp } from "../server.js";

const valid = { firstName: "Alex", lastName: "Example", email: "alex@example.com", phone: "", message: "<script>example</script>" };
let server;
afterEach(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
  server = undefined;
});

async function start(options) {
  const app = createContactApp(options);
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  return `http://127.0.0.1:${server.address().port}/contact`;
}

const post = (url, body) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

describe("contact endpoint", () => {
  it("sends plain text using the configured sender and preserves the success contract", async () => {
    const sendMail = vi.fn().mockResolvedValue({});
    const response = await post(await start({ sendMail, emailUser: "sender@example.com", emailTo: "owner@example.com" }), valid);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ code: 200, status: "Message Sent" });
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail.mock.calls[0][0]).toMatchObject({ from: "sender@example.com", to: "owner@example.com", replyTo: valid.email, text: expect.stringContaining(valid.message) });
    expect(sendMail.mock.calls[0][0]).not.toHaveProperty("html");
  });

  it("rejects invalid, malformed, and oversized requests before sending", async () => {
    const sendMail = vi.fn();
    const url = await start({ sendMail, emailUser: "sender@example.com", emailTo: "owner@example.com" });
    for (const body of [{ ...valid, email: "bad" }, { ...valid, message: 42 }, { ...valid, message: "x".repeat(5001) }]) {
      expect((await post(url, body)).status).toBe(400);
    }
    expect((await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" })).status).toBe(400);
    expect((await post(url, { ...valid, message: "x".repeat(20000) })).status).toBe(413);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns generic provider and missing-configuration errors", async () => {
    const url = await start({ sendMail: vi.fn().mockRejectedValue(new Error("secret provider detail")), emailUser: "sender@example.com", emailTo: "owner@example.com" });
    const response = await post(url, valid);
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("secret provider detail");
  });

  it("returns unavailable without SMTP configuration", async () => {
    expect((await post(await start({}), valid)).status).toBe(503);
  });

  it("accepts a contact request without an optional phone", async () => {
    const sendMail = vi.fn().mockResolvedValue({});
    const { phone, ...withoutPhone } = valid;
    expect(phone).toBe("");
    expect((await post(await start({ sendMail, emailUser: "sender@example.com", emailTo: "owner@example.com" }), withoutPhone)).status).toBe(200);
  });

  it("limits browser CORS headers when an origin allowlist is configured", async () => {
    const url = await start({ allowedOrigins: ["https://allowed.example"] });
    const request = (origin) => fetch(url, {
      method: "OPTIONS", headers: { Origin: origin, "Access-Control-Request-Method": "POST" },
    });
    expect((await request("https://allowed.example")).headers.get("access-control-allow-origin")).toBe("https://allowed.example");
    expect((await request("https://other.example")).headers.get("access-control-allow-origin")).toBeNull();
  });
});
