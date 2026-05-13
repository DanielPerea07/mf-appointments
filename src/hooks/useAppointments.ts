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
        setIframeUrl("https://precolsanitas.bukeala.com/colsanitas/findCustomer/external/mobileApp/Qy82OTdBejVqV1gvL0tjcElHOXpTZklOR2xjYmhyVmJ0LzFMVkZCU0pSQWJHT0oxeU1HTlhYTGxiUlVpaGhkcGp3dERSditBczd4SkRIRjFPMUFENitVYW1iSXhyY1UzdXZjaDh0dTJaZWVPa3pjUytkcFZCNmdBVmx3YW00R2ZDeFkvMjdKYkgxdUg2OVg2ZG55bnhxMUI4b0VWWmNWNjBvT29nSzV2TWoxQUhmOHFvdjl0UmF0TWxqbjc1SGE2NDUyK1dxOFBNN0I5OUNYdjdTbml1Qmx4ZXFCWjlGL0s1amcwZmpwb2lVSHRsY3dSdnBRc1lYMVAxeS9UUlUzZUdOZWd3cFJHaFJ2djdoOEFFc1krRURZelg5dHEzRWNndXprV0ZldkYwZXpUdW5OQzUyYjNmZG92OWtYclljbkJUMmtUV0l2Q3VHaTRlenRJTWtGcGNqTWZBazQrWURnZVVQRUR5dzhhMUMvMHkvNHhmZCtXMkt2WHdqM1ppMWpPeTdiNXdPbVJ2U1pETVJzaHdpKzFtNGlsQlcwQ3lybjQ=");
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
