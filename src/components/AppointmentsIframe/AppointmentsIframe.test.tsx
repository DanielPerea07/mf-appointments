import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppointmentsIframe } from "./AppointmentsIframe";
import { useAppointments } from "../../hooks/useAppointments";
import type { AppointmentUser, AppointmentTenantConfig } from "../../types/appointments.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock("../../hooks/useAppointments");

const mockUser: AppointmentUser = { documentType: "CC", documentNumber: "123456789" };
const mockConfig: AppointmentTenantConfig = {
  bukealaHashUrl: "http://bff/hash",
  bukealaBaseUrl: "https://bukeala.com"
};

describe("AppointmentsIframe", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should show loading when isLoading is true", () => {
    vi.mocked(useAppointments).mockReturnValue({ iframeUrl: null, isLoading: true, error: null });
    render(<AppointmentsIframe user={mockUser} config={mockConfig} />);
    expect(screen.getByText("appointment.loading")).toBeInTheDocument();
  });

  it("should show error message when error is set", () => {
    vi.mocked(useAppointments).mockReturnValue({ iframeUrl: null, isLoading: false, error: "appointment.error" });
    render(<AppointmentsIframe user={mockUser} config={mockConfig} />);
    expect(screen.getByText("appointment.error")).toBeInTheDocument();
  });

  it("should show empty message when no iframeUrl and no error", () => {
    vi.mocked(useAppointments).mockReturnValue({ iframeUrl: null, isLoading: false, error: null });
    render(<AppointmentsIframe user={mockUser} config={mockConfig} />);
    expect(screen.getByText("appointment.empty")).toBeInTheDocument();
  });

  it("should render iframe with correct src", () => {
    vi.mocked(useAppointments).mockReturnValue({ iframeUrl: "https://bukeala.com/abc123", isLoading: false, error: null });
    render(<AppointmentsIframe user={mockUser} config={mockConfig} />);
    const iframe = screen.getByTitle("appointment.scheduled");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "https://bukeala.com/abc123");
  });

  it("should prioritize loading over error", () => {
    vi.mocked(useAppointments).mockReturnValue({ iframeUrl: null, isLoading: true, error: "appointment.error" });
    render(<AppointmentsIframe user={mockUser} config={mockConfig} />);
    expect(screen.getByText("appointment.loading")).toBeInTheDocument();
    expect(screen.queryByText("appointment.error")).not.toBeInTheDocument();
  });
});
