export interface TelemetryReading {
	_id: string;
	farm_id: string;
	rainfall_mm: number;
	soil_moisture_pct: number;
	soil_temp: number;
	ambient_temp: number;
	luminosity: number;
	createdAt: string;
	updatedAt: string;
}

export const MOCK_TELEMETRY: TelemetryReading = {
	_id: "mock-telemetry-1",
	farm_id: "1",
	rainfall_mm: 0,
	soil_moisture_pct: 42,
	soil_temp: 24,
	ambient_temp: 28,
	luminosity: 850,
	createdAt: "2026-06-07T11:19:58.309Z",
	updatedAt: "2026-06-07T11:19:58.309Z",
};
