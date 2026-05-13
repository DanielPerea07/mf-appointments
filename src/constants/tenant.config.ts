import type { AppointmentTenantConfig } from "../types/appointments.types";
import { Tenant } from "./tenant.constants";

interface TenantConfig extends AppointmentTenantConfig {
  apiBase: string;
  theme: string;
  title: string;
}

export const TENANT_CONFIG: Record<Tenant, TenantConfig> = {
  [Tenant.EPS]: {
    apiBase: import.meta.env.VITE_API_BASE_URL as string,
    theme: Tenant.EPS,
    title: "EPS",
    bukealaHashUrl: import.meta.env.VITE_BUKEALA_HASH_URL_EPS as string,
    bukealaBaseUrl: import.meta.env.VITE_BUKEALA_BASE_URL_EPS as string
  },

  [Tenant.MP]: {
    apiBase: import.meta.env.VITE_API_BASE_URL as string,
    theme: Tenant.MP,
    title: "Medicina Prepagada",
    bukealaHashUrl: import.meta.env.VITE_BUKEALA_HASH_URL_MP as string,
    bukealaBaseUrl: import.meta.env.VITE_BUKEALA_BASE_URL_MP as string
  }
};
