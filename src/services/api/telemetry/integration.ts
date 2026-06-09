import type { TelemetryReading } from "../../../data/telemetryData";
import { apiClient } from "../client";
import type { GetTelemetry } from ".";

export const getTelemetry: GetTelemetry = () =>
	apiClient.getData<TelemetryReading>("/iot-telemetry/latest");
