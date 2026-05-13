import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAppointments } from "./useAppointments";
import * as bukealaService from "../services/bukeala.service";
import type {
  AppointmentUser,
  AppointmentTenantConfig
} from "../types/appointments.types";

vi.mock("../services/bukeala.service");

const mockUser: AppointmentUser = {
  documentType: "CC",
  documentNumber: "123456789"
};

const mockConfig: AppointmentTenantConfig = {
  bukealaHashUrl: "http://bff/hash",
  bukealaBaseUrl: "https://bukeala.com"
};

describe("useAppointments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start with loading state", () => {
    vi.spyOn(bukealaService, "getBukealaUrl").mockResolvedValueOnce(
      "https://bukeala.com/abc123"
    );

    const { result } = renderHook(() => useAppointments(mockUser, mockConfig));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.iframeUrl).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should set iframeUrl on success", async () => {
    vi.spyOn(bukealaService, "getBukealaUrl").mockResolvedValueOnce(
      "https://bukeala.com/abc123"
    );

    const { result } = renderHook(() => useAppointments(mockUser, mockConfig));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.iframeUrl).toBe("https://bukeala.com/abc123");
    expect(result.current.error).toBeNull();
  });

  it("should set error key on failure", async () => {
    vi.spyOn(bukealaService, "getBukealaUrl").mockRejectedValueOnce(
      new Error("BFF error")
    );

    const { result } = renderHook(() => useAppointments(mockUser, mockConfig));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe("appointment.error");
    expect(result.current.iframeUrl).toBeNull();
  });
});
