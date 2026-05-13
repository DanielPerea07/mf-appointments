import { describe, it, expect } from "vitest";
import { resolveTenant } from "./tenant.util";
import { Tenant } from "../constants/tenant.constants";

describe("resolveTenant", () => {
  it('should return EPS when tenant prop is "eps"', () => {
    expect(resolveTenant("eps")).toBe(Tenant.EPS);
  });

  it('should return MP when tenant prop is "mp"', () => {
    expect(resolveTenant("mp")).toBe(Tenant.MP);
  });

  it("should fallback to EPS when tenant prop is undefined", () => {
    expect(resolveTenant(undefined)).toBe(Tenant.EPS);
  });

  it("should fallback to EPS when tenant prop is invalid", () => {
    expect(resolveTenant("invalid-tenant")).toBe(Tenant.EPS);
  });

  it("should fallback to EPS when tenant prop is empty string", () => {
    expect(resolveTenant("")).toBe(Tenant.EPS);
  });
});
