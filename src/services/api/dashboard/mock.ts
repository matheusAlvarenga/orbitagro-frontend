import { MOCK_DASHBOARD } from "../../../data/dashboardData";
import { freeze } from "../../time/freeze";
import type { GetDashboard } from ".";

export const getDashboard: GetDashboard = async (_farmId) => {
	await freeze(1000);
	return MOCK_DASHBOARD;
};
