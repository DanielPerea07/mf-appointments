import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppointmentsPage } from "./AppointmentsPage";
import type { AppointmentUser, AppointmentTenantConfig } from "../../types/appointments.types";

vi.mock("../../components/AppointmentsIframe/AppointmentsIframe", () => ({
  AppointmentsIframe: () => <div data-testid="appointments-iframe" />
}));

const mockUser: AppointmentUser = { documentType: "CC", documentNumber: "123456789" };
const mockConfig: AppointmentTenantConfig = {
  bukealaHashUrl: "http://bff/hash",
  bukealaBaseUrl: "https://bukeala.com"
};

describe("AppointmentsPage", () => {
  it("should render AppointmentsIframe", () => {
    render(<AppointmentsPage user={mockUser} config={mockConfig} />);
    expect(screen.getByTestId("appointments-iframe")).toBeInTheDocument();
  });
});
