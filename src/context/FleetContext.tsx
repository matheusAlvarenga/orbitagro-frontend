import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { FleetDevice } from "../data/fleetData";
import {
	type AddDevicePayload,
	addDevice as addDeviceService,
	deleteDevice as deleteDeviceService,
	getDevices,
} from "../services/api/device";

interface FleetContextValue {
	fleet: FleetDevice[];
	loading: boolean;
	error: string | null;
	addDevice: (payload: AddDevicePayload) => Promise<void>;
	removeDevice: (id: string) => Promise<void>;
}

const FleetContext = createContext<FleetContextValue | null>(null);

export const FleetProvider = ({ children }: { children: ReactNode }) => {
	const [fleet, setFleet] = useState<FleetDevice[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getDevices()
			.then(setFleet)
			.catch(() => setError("Não foi possível carregar os rastreadores."))
			.finally(() => setLoading(false));
	}, []);

	const addDevice = useCallback(
		async (payload: AddDevicePayload): Promise<void> => {
			const created = await addDeviceService(payload);
			setFleet((prev) => [...prev, created]);
		},
		[],
	);

	const removeDevice = useCallback(async (id: string): Promise<void> => {
		await deleteDeviceService(id);
		setFleet((prev) => prev.filter((d) => d._id !== id));
	}, []);

	return (
		<FleetContext.Provider
			value={{ fleet, loading, error, addDevice, removeDevice }}
		>
			{children}
		</FleetContext.Provider>
	);
};

export const useFleet = (): FleetContextValue => {
	const ctx = useContext(FleetContext);
	if (!ctx) throw new Error("useFleet must be used inside FleetProvider");
	return ctx;
};
