import type { TelemetryReading } from "../../../data/telemetryData";
import { getTelemetry as getTelemetryIntegration } from "./integration";
import { getTelemetry as getTelemetryMock } from "./mock";

export type GetTelemetry = () => Promise<TelemetryReading>;

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const getTelemetry: GetTelemetry = useMocks
	? getTelemetryMock
	: getTelemetryIntegration;
