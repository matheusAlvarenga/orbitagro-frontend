import { apiClient } from "../client";
import type { GetDashboard } from ".";

interface RawDashboard {
	historical_rainfall_6m: { month: string; rainfall_mm: number }[];
	weekly_temperature_variation: { day: string; temp: number }[];
}

export const getDashboard: GetDashboard = (farmId) =>
	apiClient.getData<RawDashboard>(`/dashboard/${farmId}`).then((raw) => ({
		rain: raw.historical_rainfall_6m.map(({ month, rainfall_mm }) => ({
			month,
			value: rainfall_mm,
		})),
		temperature: raw.weekly_temperature_variation.map(({ day, temp }) => ({
			month: day,
			value: temp,
		})),
	}));
