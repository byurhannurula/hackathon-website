import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Toast } from "@/components/ui/toast";

describe("Toast", () => {
  it("renders the message", () => {
    render(<Toast message="Операцията е успешна" type="ok" />);
    expect(screen.getByText("Операцията е успешна")).toBeInTheDocument();
  });

  it("applies success styles for ok type", () => {
    const { container } = render(<Toast message="Success" type="ok" />);
    const toast = container.firstChild as HTMLElement;
    expect(toast.className).toContain("bg-emerald-950");
    expect(toast.className).toContain("text-emerald-400");
  });

  it("applies error styles for error type", () => {
    const { container } = render(<Toast message="Error" type="error" />);
    const toast = container.firstChild as HTMLElement;
    expect(toast.className).toContain("bg-red-950");
    expect(toast.className).toContain("text-red-400");
  });
});
