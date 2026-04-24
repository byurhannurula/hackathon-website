import { render, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { AdminNav } from "@/components/admin/admin-nav";
import { RegistrationToggleCard } from "@/components/admin/registration-toggle-card";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => "/kcah-ia-esur",
  useRouter: () => ({ push: pushMock, replace: vi.fn(), back: vi.fn() }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("AdminNav", () => {
  it("renders RUSE AI HACK brand", () => {
    const { getByText } = render(<AdminNav />);
    expect(getByText("RUSE")).toBeInTheDocument();
    expect(getByText(/AI HACK/)).toBeInTheDocument();
  });

  it("renders ADMIN label", () => {
    const { getByText } = render(<AdminNav />);
    expect(getByText("ADMIN")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    const { getByText } = render(<AdminNav />);
    expect(getByText("Регистрации")).toBeInTheDocument();
    expect(getByText("Статистика")).toBeInTheDocument();
    expect(getByText("Отбори")).toBeInTheDocument();
  });

  it("triggers logout fetch when logout button is clicked", () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(new Response());
    const { getByText } = render(<AdminNav />);
    fireEvent.click(getByText("Изход"));
    expect(fetchSpy).toHaveBeenCalledWith("/api/kcah-ia-esur/auth", { method: "DELETE" });
    fetchSpy.mockRestore();
  });

  it("renders optional actions slot", () => {
    const { getByText } = render(<AdminNav actions={<span>EXTRA</span>} />);
    expect(getByText("EXTRA")).toBeInTheDocument();
  });
});

describe("RegistrationToggleCard", () => {
  const defaultProps = { regOpen: true, loading: false, onClick: vi.fn() };

  it("shows ОТВОРЕНА when registration is open", () => {
    const { getByText } = render(<RegistrationToggleCard {...defaultProps} regOpen={true} />);
    expect(getByText("ОТВОРЕНА")).toBeInTheDocument();
  });

  it("shows ЗАТВОРЕНА when registration is closed", () => {
    const { getByText } = render(<RegistrationToggleCard {...defaultProps} regOpen={false} />);
    expect(getByText("ЗАТВОРЕНА")).toBeInTheDocument();
  });

  it("calls onClick when toggle is clicked", () => {
    const onClick = vi.fn();
    const { getByLabelText } = render(
      <RegistrationToggleCard {...defaultProps} onClick={onClick} />
    );
    fireEvent.click(getByLabelText("Превключи регистрация"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables toggle when loading", () => {
    const { getByLabelText } = render(<RegistrationToggleCard {...defaultProps} loading={true} />);
    expect((getByLabelText("Превключи регистрация") as HTMLButtonElement).disabled).toBe(true);
  });

  it("applies emerald styling when registration is open", () => {
    const { getByLabelText } = render(<RegistrationToggleCard {...defaultProps} regOpen={true} />);
    expect(getByLabelText("Превключи регистрация").className).toContain("emerald");
  });

  it("applies red styling when registration is closed", () => {
    const { getByLabelText } = render(<RegistrationToggleCard {...defaultProps} regOpen={false} />);
    expect(getByLabelText("Превключи регистрация").className).toContain("red");
  });
});
