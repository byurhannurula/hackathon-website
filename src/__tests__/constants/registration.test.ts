import { describe, it, expect } from "vitest";
import { STATUS_LABELS, STATUS_COLORS } from "@/constants";

describe("registration constants", () => {
  describe("STATUS_LABELS", () => {
    it("has labels for all statuses", () => {
      expect(STATUS_LABELS.pending).toBe("Изчакващ");
      expect(STATUS_LABELS.approved).toBe("Одобрен");
      expect(STATUS_LABELS.rejected).toBe("Отхвърлен");
    });

    it("has exactly 3 statuses", () => {
      expect(Object.keys(STATUS_LABELS)).toHaveLength(3);
    });
  });

  describe("STATUS_COLORS", () => {
    it("has colors for all statuses", () => {
      expect(STATUS_COLORS.pending).toBeDefined();
      expect(STATUS_COLORS.approved).toBeDefined();
      expect(STATUS_COLORS.rejected).toBeDefined();
    });

    it("has exactly 3 statuses", () => {
      expect(Object.keys(STATUS_COLORS)).toHaveLength(3);
    });

    it("approved uses emerald color", () => {
      expect(STATUS_COLORS.approved).toContain("emerald");
    });

    it("rejected uses red color", () => {
      expect(STATUS_COLORS.rejected).toContain("red");
    });
  });
});
