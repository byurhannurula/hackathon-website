import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { StatsGrid } from "@/components/admin/stats-grid";

afterEach(cleanup);

const mockStats = {
  total: 100,
  pending: 40,
  approved: 50,
  rejected: 10,
};

describe("StatsGrid", () => {
  it("renders all four stat cards", () => {
    const { getByText } = render(<StatsGrid stats={mockStats} />);
    expect(getByText("Общо")).toBeInTheDocument();
    expect(getByText("Изчакващи")).toBeInTheDocument();
    expect(getByText("Одобрени")).toBeInTheDocument();
    expect(getByText("Отхвърлени")).toBeInTheDocument();
  });

  it("displays correct stat values", () => {
    const { getByText } = render(<StatsGrid stats={mockStats} />);
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("40")).toBeInTheDocument();
    expect(getByText("50")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });

  it("applies emerald color to approved value", () => {
    const { getByText } = render(<StatsGrid stats={mockStats} />);
    expect(getByText("50").className).toContain("text-emerald-400");
  });

  it("applies red color to rejected value", () => {
    const { getByText } = render(<StatsGrid stats={mockStats} />);
    expect(getByText("10").className).toContain("text-red-400");
  });

  it("renders zero stats correctly", () => {
    const zeroStats = { total: 0, pending: 0, approved: 0, rejected: 0 };
    const { getAllByText } = render(<StatsGrid stats={zeroStats} />);
    expect(getAllByText("0")).toHaveLength(4);
  });
});
