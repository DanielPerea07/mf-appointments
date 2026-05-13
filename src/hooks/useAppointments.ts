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
        const url = await getBukealaUrl(user, config);
        setIframeUrl(url);
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
