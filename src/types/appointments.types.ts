export interface AppointmentUser {
  documentType: string;
  documentNumber: string;
  fullName?: string;
}

export interface BukealaHashRequest {
  documentType: string;
  documentNumber: string;
}

export interface BukealaHashResponse {
  iframeUrl: string;
}

export interface AppointmentTenantConfig {
  bukealaHashUrl: string;
  bukealaBaseUrl: string;
}
