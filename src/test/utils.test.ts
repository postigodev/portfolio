import { describe, expect, it } from "vitest";
import { normalizeText } from "@/lib/utils";

describe("normalizeText", () => {
  it("restores mojibake strings produced by UTF-8 decoded as latin1", () => {
    expect(
      normalizeText("Key systems I designed and built â€” not side projects."),
    ).toBe("Key systems I designed and built — not side projects.");
  });

  it("leaves plain ascii strings unchanged", () => {
    expect(normalizeText("Software Engineer")).toBe("Software Engineer");
  });
});
