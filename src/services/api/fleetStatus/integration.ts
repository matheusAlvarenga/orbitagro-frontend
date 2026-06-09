import type { FleetStatusDevice } from "../../../data/fleetStatusData";
import { apiClient } from "../client";
import type { GetFleetStatus } from ".";

export const getFleetStatus: GetFleetStatus = (farmId) =>
	apiClient
		.get<{ fleet_status: FleetStatusDevice[] }>(`/farms/${farmId}/fleet_status`)
		.then((res) => res.fleet_status);
