import type { FleetStatusDevice } from "../../../data/fleetStatusData";
import { apiClient } from "../client";
import type { GetFleetStatus } from ".";

export const getFleetStatus: GetFleetStatus = (farmId) =>
	apiClient
		.getData<{ fleet_status: FleetStatusDevice[] }>(`/map/${farmId}`)
		.then((res) => res.fleet_status);
