import type { DashboardData } from "../../../data/dashboardData";
import { getDashboard as getDashboardIntegration } from "./integration";
import { getDashboard as getDashboardMock } from "./mock";

export type GetDashboard = (farmId: string | number) => Promise<DashboardData>;

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const getDashboard: GetDashboard = useMocks
	? getDashboardMock
	: getDashboardIntegration;
