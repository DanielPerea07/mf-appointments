import type {
    AppointmentTenantConfig,
    AppointmentUser,
    BukealaHashRequest,
    BukealaHashResponse
} from "../types/appointments.types";
import { apiClient } from "../api/apiClient";

export const getBukealaUrl = async (
    user: AppointmentUser,
    config: AppointmentTenantConfig
): Promise<string> => {
    const payload: BukealaHashRequest = {
        documentType: user.documentType,
        documentNumber: user.documentNumber
    };

    const { data } = await apiClient.post<BukealaHashResponse>(
        config.bukealaHashUrl,
        payload
    );

    if (!data.iframeUrl) {
        throw new Error("No iframeUrl received from BFF");
    }

    return data.iframeUrl;
};
