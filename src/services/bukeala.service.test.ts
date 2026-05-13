import { describe, it, expect, vi, beforeEach } from "vitest";
import { getBukealaUrl } from "./bukeala.service";
import { apiClient } from "../api/apiClient";
import type {
    AppointmentUser,
    AppointmentTenantConfig
} from "../types/appointments.types";

vi.mock("../api/apiClient", () => ({
    apiClient: {
        post: vi.fn()
    }
}));

const mockUser: AppointmentUser = {
    documentType: "CC",
    documentNumber: "123456789"
};

const mockConfig: AppointmentTenantConfig = {
    bukealaHashUrl: "http://bff/hash",
    bukealaBaseUrl: "https://bukeala.com"
};

describe("getBukealaUrl", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return the full bukeala URL when BFF responds with iframeUrl", async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: { iframeUrl: "https://bukeala.com/abc123" }
        });

        const result = await getBukealaUrl(mockUser, mockConfig);

        expect(result).toBe("https://bukeala.com/abc123");
    });

    it("should call BFF with correct payload", async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: { iframeUrl: "https://bukeala.com/abc123" }
        });

        await getBukealaUrl(mockUser, mockConfig);

        expect(apiClient.post).toHaveBeenCalledWith("http://bff/hash", {
            documentType: "CC",
            documentNumber: "123456789"
        });
    });

    it("should throw when BFF response has no iframeUrl", async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: { iframeUrl: "" }
        });

        await expect(getBukealaUrl(mockUser, mockConfig)).rejects.toThrow(
            "No iframeUrl received from BFF"
        );
    });

    it("should throw when BFF call fails", async () => {
        vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("Network error"));

        await expect(getBukealaUrl(mockUser, mockConfig)).rejects.toThrow(
            "Network error"
        );
    });
});
