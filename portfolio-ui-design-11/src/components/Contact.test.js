import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Contact } from "./Contact";

function fillForm() {
  for (const [name, value] of [["First Name", "Alex"], ["Last Name", "Example"], ["Email Address", "alex@example.com"], ["Message", "Hello"]]) {
    fireEvent.change(screen.getByRole("textbox", { name }), { target: { value } });
  }
}

afterEach(() => vi.unstubAllGlobals());

test("preserves contact details after a network failure", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
  render(<Contact />);
  fillForm();
  fireEvent.submit(screen.getByRole("button", { name: "Send" }).closest("form"));
  expect(await screen.findByRole("status")).toHaveTextContent(/something went wrong/i);
  expect(screen.getByRole("textbox", { name: "Message" })).toHaveValue("Hello");
  expect(screen.getByRole("button", { name: "Send" })).toBeEnabled();
});

test("prevents duplicate requests and clears only after success", async () => {
  let resolveRequest;
  const request = vi.fn().mockReturnValue(new Promise((resolve) => { resolveRequest = resolve; }));
  vi.stubGlobal("fetch", request);
  render(<Contact />);
  fillForm();
  const form = screen.getByRole("button", { name: "Send" }).closest("form");
  fireEvent.submit(form);
  fireEvent.submit(form);
  expect(request).toHaveBeenCalledOnce();
  expect(screen.getByRole("textbox", { name: "Message" })).toBeDisabled();
  resolveRequest({ ok: true, json: async () => ({ code: 200 }) });
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/message sent successfully/i));
  expect(screen.getByRole("textbox", { name: "Message" })).toHaveValue("");
});
