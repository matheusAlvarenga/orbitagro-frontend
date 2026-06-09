import { MOCK_TELEMETRY } from "../../../data/telemetryData";
import { freeze } from "../../time/freeze";
import type { GetTelemetry } from ".";

export const getTelemetry: GetTelemetry = async () => {
	await freeze(1000);
	return MOCK_TELEMETRY;
};
