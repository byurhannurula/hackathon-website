import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ConfirmModal } from "@/components/admin/confirm-modal";

afterEach(cleanup);

const mockReg = {
  id: "uuid-1",
  full_name: "Иван Иванов",
  email: "ivan@example.com",
  registration_status: "pending" as const,
};

describe("ConfirmModal", () => {
  it("renders approve dialog title for approved status", () => {
    const { getByText } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "approved" }}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(getByText("ОДОБРЯВАНЕ")).toBeInTheDocument();
  });

  it("renders reject dialog title for rejected status", () => {
    const { getByText } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "rejected" }}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(getByText("ОТХВЪРЛЯНЕ")).toBeInTheDocument();
  });

  it("displays the registrant name", () => {
    const { getByText } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "approved" }}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(getByText("Иван Иванов")).toBeInTheDocument();
  });

  it("displays the registrant email", () => {
    const { getByText } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "approved" }}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(getByText(/ivan@example\.com/)).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    const { getByText } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "approved" }}
        onCancel={onCancel}
        onConfirm={vi.fn()}
      />
    );
    getByText("Отказ").click();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when approve button is clicked", () => {
    const onConfirm = vi.fn();
    const { getByText } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "approved" }}
        onCancel={vi.fn()}
        onConfirm={onConfirm}
      />
    );
    getByText("Одобри").click();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when reject button is clicked", () => {
    const onConfirm = vi.fn();
    const { getByText } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "rejected" }}
        onCancel={vi.fn()}
        onConfirm={onConfirm}
      />
    );
    getByText("Отхвърли").click();
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when backdrop is clicked", () => {
    const onCancel = vi.fn();
    const { container } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "approved" }}
        onCancel={onCancel}
        onConfirm={vi.fn()}
      />
    );
    // First child is the backdrop
    const backdrop = container.firstChild as HTMLElement;
    backdrop.click();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("has correct aria attributes for accessibility", () => {
    const { container } = render(
      <ConfirmModal
        confirmAction={{ reg: mockReg as any, status: "approved" }}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toBeInTheDocument();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.getAttribute("aria-labelledby")).toBe("confirm-dialog-title");
  });
});
