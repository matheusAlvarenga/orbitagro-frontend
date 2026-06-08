import { createContext, type ReactNode, useContext, useState } from "react";
import { FARMS, type Farm } from "../data/farmData";

interface FarmsContextValue {
	farms: Farm[];
	addFarm: (farm: Omit<Farm, "id">) => void;
	removeFarm: (id: number) => void;
}

const FarmsContext = createContext<FarmsContextValue | null>(null);

export const FarmsProvider = ({ children }: { children: ReactNode }) => {
	const [farms, setFarms] = useState<Farm[]>(FARMS);

	const addFarm = (data: Omit<Farm, "id">) => {
		const id = Math.max(...farms.map((f) => f.id), 0) + 1;
		setFarms((prev) => [...prev, { id, ...data }]);
	};

	const removeFarm = (id: number) => {
		setFarms((prev) => prev.filter((f) => f.id !== id));
	};

	return (
		<FarmsContext.Provider value={{ farms, addFarm, removeFarm }}>
			{children}
		</FarmsContext.Provider>
	);
};

export const useFarms = (): FarmsContextValue => {
	const ctx = useContext(FarmsContext);
	if (!ctx) throw new Error("useFarms must be used inside FarmsProvider");
	return ctx;
};
