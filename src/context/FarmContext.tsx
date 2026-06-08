import { createContext, type ReactNode, useContext, useState } from "react";

interface FarmContextValue {
	selectedFarmId: string | null;
	setSelectedFarmId: (id: string | null) => void;
}

const FarmContext = createContext<FarmContextValue | null>(null);

export const FarmProvider = ({ children }: { children: ReactNode }) => {
	const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

	return (
		<FarmContext.Provider value={{ selectedFarmId, setSelectedFarmId }}>
			{children}
		</FarmContext.Provider>
	);
};

export const useFarm = (): FarmContextValue => {
	const ctx = useContext(FarmContext);
	if (!ctx) throw new Error("useFarm must be used inside FarmProvider");
	return ctx;
};
