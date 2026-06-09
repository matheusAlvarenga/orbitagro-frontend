import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { FleetStatusDevice } from "../data/fleetStatusData";
import { getFleetStatus } from "../services/api/fleetStatus";
import { useFarm } from "./FarmContext";

interface FleetStatusContextValue {
	fleetStatus: FleetStatusDevice[];
	loading: boolean;
	error: string | null;
}

const FleetStatusContext = createContext<FleetStatusContextValue | null>(null);

export const FleetStatusProvider = ({ children }: { children: ReactNode }) => {
	const { selectedFarmId } = useFarm();
	const [fleetStatus, setFleetStatus] = useState<FleetStatusDevice[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (selectedFarmId === null) {
			setFleetStatus([]);
			setError(null);
			return;
		}
		setLoading(true);
		setError(null);
		getFleetStatus(selectedFarmId)
			.then(setFleetStatus)
			.catch(() => setError("Não foi possível carregar o status da frota."))
			.finally(() => setLoading(false));
	}, [selectedFarmId]);

	return (
		<FleetStatusContext.Provider value={{ fleetStatus, loading, error }}>
			{children}
		</FleetStatusContext.Provider>
	);
};

export const useFleetStatus = (): FleetStatusContextValue => {
	const ctx = useContext(FleetStatusContext);
	if (!ctx)
		throw new Error("useFleetStatus must be used inside FleetStatusProvider");
	return ctx;
};
