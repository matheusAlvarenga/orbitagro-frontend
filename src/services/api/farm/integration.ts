import type { Farm } from "../../../data/farmData";
import { apiClient } from "../client";
import type { AddFarm, GetFarms } from ".";

const MOCK_POLYGON = {
	type: "Polygon" as const,
	coordinates: [
		[
			[-46.6, -23.5],
			[-46.5, -23.5],
			[-46.5, -23.6],
			[-46.6, -23.6],
			[-46.6, -23.5],
		],
	],
};

export const getFarms: GetFarms = () => apiClient.get<Farm[]>("/farms");

export const addFarm: AddFarm = (payload) =>
	apiClient.post<Farm>("/farms", { ...payload, polygon: MOCK_POLYGON });
