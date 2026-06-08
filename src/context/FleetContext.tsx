import { createContext, type ReactNode, useContext, useState } from "react";
import { FLEET, type FleetDevice } from "../data/fleetData";

interface FleetContextValue {
	fleet: FleetDevice[];
	addDevice: (device: Omit<FleetDevice, "id">) => void;
	removeDevice: (id: number) => void;
}

const FleetContext = createContext<FleetContextValue | null>(null);

export const FleetProvider = ({ children }: { children: ReactNode }) => {
	const [fleet, setFleet] = useState<FleetDevice[]>(FLEET);

	const addDevice = (data: Omit<FleetDevice, "id">) => {
		const id = Math.max(...fleet.map((d) => d.id), 0) + 1;
		setFleet((prev) => [...prev, { id, ...data }]);
	};

	const removeDevice = (id: number) => {
		setFleet((prev) => prev.filter((d) => d.id !== id));
	};

	return (
		<FleetContext.Provider value={{ fleet, addDevice, removeDevice }}>
			{children}
		</FleetContext.Provider>
	);
};

export const useFleet = (): FleetContextValue => {
	const ctx = useContext(FleetContext);
	if (!ctx) throw new Error("useFleet must be used inside FleetProvider");
	return ctx;
};
