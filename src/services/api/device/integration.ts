import type { FleetDevice } from "../../../data/fleetData";
import { apiClient } from "../client";
import type { AddDevice, DeleteDevice, GetDevices } from ".";

export const getDevices: GetDevices = () =>
	apiClient.get<FleetDevice[]>("/devices");

export const addDevice: AddDevice = (payload) =>
	apiClient.post<FleetDevice>("/devices", payload);

export const deleteDevice: DeleteDevice = (id) =>
	apiClient.delete<void>(`/devices/${id}`);
