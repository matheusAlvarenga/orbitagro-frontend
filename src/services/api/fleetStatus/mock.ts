import { FLEET_STATUS } from "../../../data/fleetStatusData";
import { freeze } from "../../time/freeze";
import type { GetFleetStatus } from ".";

export const getFleetStatus: GetFleetStatus = async (_farmId) => {
	await freeze(1000);
	return FLEET_STATUS;
};
