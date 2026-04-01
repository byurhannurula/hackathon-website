import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { StatusBadge } from "@/components/admin/status-badge";

afterEach(cleanup);

describe("StatusBadge", () => {
  it("renders pending status with correct label", () => {
    const { getByText } = render(<StatusBadge status="pending" />);
    expect(getByText("Изчакващ")).toBeInTheDocument();
  });

  it("renders approved status with correct label", () => {
    const { getByText } = render(<StatusBadge status="approved" />);
    expect(getByText("Одобрен")).toBeInTheDocument();
  });

  it("renders rejected status with correct label", () => {
    const { getByText } = render(<StatusBadge status="rejected" />);
    expect(getByText("Отхвърлен")).toBeInTheDocument();
  });

  it("applies pending styles", () => {
    const { getByText } = render(<StatusBadge status="pending" />);
    const badge = getByText("Изчакващ");
    expect(badge.className).toContain("bg-white/10");
    expect(badge.className).toContain("text-white/70");
  });

  it("applies approved styles", () => {
    const { getByText } = render(<StatusBadge status="approved" />);
    const badge = getByText("Одобрен");
    expect(badge.className).toContain("bg-emerald-500/15");
    expect(badge.className).toContain("text-emerald-400");
  });

  it("applies rejected styles", () => {
    const { getByText } = render(<StatusBadge status="rejected" />);
    const badge = getByText("Отхвърлен");
    expect(badge.className).toContain("bg-red-500/15");
    expect(badge.className).toContain("text-red-400");
  });
});
