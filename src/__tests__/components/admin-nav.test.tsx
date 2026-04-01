import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { AdminNav } from "@/components/admin/admin-nav";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

afterEach(cleanup);

const defaultProps = {
  regOpen: true,
  regToggleLoading: false,
  onToggleClick: vi.fn(),
  onLogout: vi.fn(),
};

describe("AdminNav", () => {
  it("renders RUSE AI HACK brand", () => {
    const { getByText } = render(<AdminNav {...defaultProps} />);
    expect(getByText("RUSE")).toBeInTheDocument();
    expect(getByText(/AI HACK/)).toBeInTheDocument();
  });

  it("renders ADMIN label", () => {
    const { getByText } = render(<AdminNav {...defaultProps} />);
    expect(getByText("ADMIN")).toBeInTheDocument();
  });

  it("shows ON when registration is open", () => {
    const { getByText } = render(<AdminNav {...defaultProps} regOpen={true} />);
    expect(getByText("ON")).toBeInTheDocument();
  });

  it("shows OFF when registration is closed", () => {
    const { getByText } = render(<AdminNav {...defaultProps} regOpen={false} />);
    expect(getByText("OFF")).toBeInTheDocument();
  });

  it("calls onToggleClick when toggle button is clicked", () => {
    const onToggleClick = vi.fn();
    const { container } = render(<AdminNav {...defaultProps} onToggleClick={onToggleClick} />);
    const toggleBtn = container.querySelector("button");
    toggleBtn?.click();
    expect(onToggleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onLogout when logout button is clicked", () => {
    const onLogout = vi.fn();
    const { getByText } = render(<AdminNav {...defaultProps} onLogout={onLogout} />);
    getByText("Изход").click();
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("disables toggle button when loading", () => {
    const { container } = render(<AdminNav {...defaultProps} regToggleLoading={true} />);
    const toggleBtn = container.querySelector("button");
    expect(toggleBtn?.disabled).toBe(true);
  });

  it("applies emerald styling when registration is open", () => {
    const { container } = render(<AdminNav {...defaultProps} regOpen={true} />);
    const toggleBtn = container.querySelector("button");
    expect(toggleBtn?.className).toContain("emerald");
  });

  it("applies red styling when registration is closed", () => {
    const { container } = render(<AdminNav {...defaultProps} regOpen={false} />);
    const toggleBtn = container.querySelector("button");
    expect(toggleBtn?.className).toContain("red");
  });
});
