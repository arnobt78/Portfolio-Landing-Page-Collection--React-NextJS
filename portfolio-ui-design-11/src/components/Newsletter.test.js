import { fireEvent, render, screen } from "@testing-library/react";
import { Newsletter } from "./Newsletter";

test("keeps newsletter email on failure and clears only after success", () => {
  const submit = vi.fn();
  const { rerender } = render(<Newsletter configured onValidated={submit} />);
  const input = screen.getByRole("textbox", { name: /newsletter email/i });
  fireEvent.change(input, { target: { value: "visitor@example.com" } });
  fireEvent.submit(input.closest("form"));
  fireEvent.submit(input.closest("form"));
  expect(submit).toHaveBeenCalledOnce();
  rerender(<Newsletter configured onValidated={submit} status="error" message="Failed" />);
  expect(input).toHaveValue("visitor@example.com");
  fireEvent.submit(input.closest("form"));
  expect(submit).toHaveBeenCalledTimes(2);
  rerender(<Newsletter configured onValidated={submit} status="success" message="Done" />);
  expect(input).toHaveValue("");
});

test("does not submit without newsletter configuration", () => {
  render(<Newsletter configured={false} />);
  expect(screen.getByText(/not configured/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
});
