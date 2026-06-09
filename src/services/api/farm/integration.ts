import type { Farm } from "../../../data/farmData";
import { apiClient } from "../client";
import type { AddFarm, DeleteFarm, GetFarms } from ".";

export const getFarms: GetFarms = () => apiClient.get<Farm[]>("/farms");

export const addFarm: AddFarm = (payload) =>
	apiClient.post<Farm>("/farms", payload);

export const deleteFarm: DeleteFarm = (id) =>
	apiClient.delete<void>(`/farms/${id}`);
