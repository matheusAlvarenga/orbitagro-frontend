import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { Farm } from "../data/farmData";
import {
	type AddFarmPayload,
	addFarm as addFarmService,
	getFarms,
} from "../services/api/farm";

interface FarmsContextValue {
	farms: Farm[];
	loading: boolean;
	addFarm: (payload: AddFarmPayload) => Promise<void>;
	removeFarm: (id: number) => void;
}

const FarmsContext = createContext<FarmsContextValue | null>(null);

export const FarmsProvider = ({ children }: { children: ReactNode }) => {
	const [farms, setFarms] = useState<Farm[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getFarms()
			.then(setFarms)
			.finally(() => setLoading(false));
	}, []);

	const addFarm = async (payload: AddFarmPayload): Promise<void> => {
		const created = await addFarmService(payload);
		setFarms((prev) => [...prev, created]);
	};

	const removeFarm = (id: number) => {
		setFarms((prev) => prev.filter((f) => f._id !== id));
	};

	return (
		<FarmsContext.Provider value={{ farms, loading, addFarm, removeFarm }}>
			{children}
		</FarmsContext.Provider>
	);
};

export const useFarms = (): FarmsContextValue => {
	const ctx = useContext(FarmsContext);
	if (!ctx) throw new Error("useFarms must be used inside FarmsProvider");
	return ctx;
};
