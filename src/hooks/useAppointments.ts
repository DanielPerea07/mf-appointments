import { useEffect, useState } from "react";
import type {
  AppointmentTenantConfig,
  AppointmentUser
} from "../types/appointments.types";
import { getBukealaUrl } from "../services/bukeala.service";

interface UseAppointmentsState {
  iframeUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAppointments = (
  user: AppointmentUser,
  config: AppointmentTenantConfig
): UseAppointmentsState => {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBukealaUrl = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        // const url = await getBukealaUrl(user, config);
        setIframeUrl("https://precolsanitas.bukeala.com/colsanitas/findCustomer/external/mobileApp/MzFoV1MrMWdRODdBQnNMaklVTUNaUkZxRHRsNFYzZ3BFWGtFS3hoYnJVNzEvczVUanNtSkdlYW9EQlpMSkZHTGozanIwaGJSaEVpTlc4M09NU2w5NzE5b09EemVwSEdiMGw3VGdZUmdvVnVWd0ZxNy80dmtxY3hmRGpDQy9yemNwcm03T1RBcS9SMnRTcTdoak1rQ3Z4ZWxod0x3ZjNva0VpZnl0eGFmdnhJVjdZRWY0K3hnNFVsRUJ5QjltdkFDRkI4c0RKWXZJOWFqb0hkdEJYQmFDM1hmMGxxeXo4anUvY1Nka1EveDFyQzk5NjdnWlA3WTVZaE9aT09tT0VXRUEzT3AweHVBbkIvT0p3dWZjQk5aMmZhcVpHcDNwYkhncnY1dGd3aitiWXVnT2oraUUzd0p6RTNlUDBiQ0hHTXQ0Y0ZvUElGYnE3R1NiV1FPc0pkUUYwSjJ3MC9qaml4VDFqWlhvSUdGQVZmVFl3c08yQjJ2UjFuTVFNU1NtN1hCTWhCNjlHQkwrNTBFSGJyb0F2eXlGUEMwcUVFdGIzZDU=");
      } catch {
        setError("appointment.error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBukealaUrl();
  }, [user.documentType, user.documentNumber, config.bukealaHashUrl]);

  return { iframeUrl, isLoading, error };
};
