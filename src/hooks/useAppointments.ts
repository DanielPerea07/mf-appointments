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
        setIframeUrl("https://precolsanitas.bukeala.com/colsanitas/findCustomer/external/mobileApp/NG1QL2pjNWx1MVo0djJvelhMVWl2T3EwQ3dTZkU1d3FpdmxiM0doZHZucFBMNXgwWDR1NVlYbHJVMFV0MmVLUUdJM3duV1Y2NXJoak1QQW1tQUV4ZTNYdUZNRS9tMFRWczJ3OUhRSlQ0NHFqdjdaTUJrdlNOUkFxWG5VcUh1QU16cXA0WWtJb2ZFelplZTM4d1IyeExoSmhBdEJIeGpzS29TMHYyQmZHNHdFcVlHYnhUcFhIaUZQb0F4LzZuYUJBTWNrUTRKdnFZeXdxODhyM2VuZFRNaVloalpNdHFYYUUraTIvdEV3MUJKaTRqMlp1Sy9SUFl1QlA5WTBnTE56TkFTZmpEZHZYVEcyNTVUcnRDd2NIVmRHdGYrdkFUWjA0NXk1d3o2eDlmSzY1UkcxN3praVR6aCtkUXVMVnc0c1liOVRFcENTZHlOb3ljMnllMzlqS3VuZG9TcytRN1FJbCtlZlIvNURHUXRGS0RDbEY5SmRrZ1VyNkhmRXlucWpkU1ZGY2NLQUIzTkNRTFRSeHpYaDJ1WVJqUCt5TEFZc0g=");
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
