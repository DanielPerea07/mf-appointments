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
        setIframeUrl("http://localhost:8081/colsanitas/findCustomer/external/mobileApp/aktBdHR4Y1ljc2VCOEhhb0ZoNFpPcGt0d3VZUHpReHhJOU40TXo1K0lOdHlwbWVqTTJxaElIdFd1eG80Vk82WnBVdUZKTDZhUnp0OFZxNzJzQ25pTHBQNW5ZanRnOFg5c3Q0RmRNZXc4NlF1OVhBbEl3NE5ScFI0UHVDWkZObFJVazJ1OXRBVHkyWUxRWHJnc1NlYkpZZ2Z5STdMbDB1UDdqQTVUQjFVQzZ4WG9uWENsRG9rMFFOWEdiVjdyRGRHS0ZCdHd3RUhJRFU1T00vUVJaUzBWS1FST0xJb2lUemd4UEhIc2ZWVTNTVW5xQXQrMGJ5MmJmOUdJUFZSZFMvaWZpK3pzeksvT2xOeEJRUUgvMGRGTjcra25wcW1QOWdRVDRvSVVjSGpydmxCbVI1a0tRb0I2Z3JZVHBsSmJnSDZYelhQMVJ0c1AyMVc1QlU2SnYzQ05JYTFYL0hxR0R1Tm4rOWJKMmsxK2hUWlJyRk4xbm9admdxSExGWlgrQXpRLzR3RW9nVHQxUmZPMWdPczhlODlkZUxWYWVRNG5naTM=");
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
