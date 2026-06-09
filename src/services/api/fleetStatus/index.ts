import type { FleetStatusDevice } from "../../../data/fleetStatusData";
import { getFleetStatus as getFleetStatusIntegration } from "./integration";
import { getFleetStatus as getFleetStatusMock } from "./mock";

export type GetFleetStatus = (
	farmId: string | number,
) => Promise<FleetStatusDevice[]>;

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const getFleetStatus: GetFleetStatus = useMocks
	? getFleetStatusMock
	: getFleetStatusIntegration;
