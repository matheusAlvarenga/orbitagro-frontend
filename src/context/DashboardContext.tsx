import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { DashboardData } from "../data/dashboardData";
import { getDashboard } from "../services/api/dashboard";
import { useFarm } from "./FarmContext";

interface DashboardContextValue {
	dashboard: DashboardData | null;
	loading: boolean;
	error: string | null;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
	const { selectedFarmId } = useFarm();
	const [dashboard, setDashboard] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (selectedFarmId === null) {
			setDashboard(null);
			setError(null);
			return;
		}
		setLoading(true);
		setError(null);
		getDashboard(selectedFarmId)
			.then(setDashboard)
			.catch(() => setError("Não foi possível carregar os dados do painel."))
			.finally(() => setLoading(false));
	}, [selectedFarmId]);

	return (
		<DashboardContext.Provider value={{ dashboard, loading, error }}>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboard = (): DashboardContextValue => {
	const ctx = useContext(DashboardContext);
	if (!ctx)
		throw new Error("useDashboard must be used inside DashboardProvider");
	return ctx;
};
