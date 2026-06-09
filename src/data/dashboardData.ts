import type { MonthPoint } from "./farmData";

export interface DashboardData {
	rain: MonthPoint[];
	temperature: MonthPoint[];
}

export const MOCK_DASHBOARD: DashboardData = {
	rain: [
		{ month: "Jan", value: 120.5 },
		{ month: "Fev", value: 150.0 },
		{ month: "Mar", value: 210.0 },
		{ month: "Abr", value: 80.0 },
		{ month: "Mai", value: 190.0 },
		{ month: "Jun", value: 220.0 },
	],
	temperature: [
		{ month: "Seg", value: 22.0 },
		{ month: "Ter", value: 24.5 },
		{ month: "Qua", value: 28.0 },
		{ month: "Qui", value: 26.0 },
		{ month: "Sex", value: 31.0 },
		{ month: "Sab", value: 29.0 },
	],
};
