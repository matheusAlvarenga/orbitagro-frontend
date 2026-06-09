import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { TelemetryReading } from "../data/telemetryData";
import { getTelemetry } from "../services/api/telemetry";
import { useFarm } from "./FarmContext";

interface TelemetryContextValue {
	telemetry: TelemetryReading | null;
	loading: boolean;
	error: string | null;
}

const TelemetryContext = createContext<TelemetryContextValue | null>(null);

export const TelemetryProvider = ({ children }: { children: ReactNode }) => {
	const { selectedFarmId } = useFarm();
	const [telemetry, setTelemetry] = useState<TelemetryReading | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (selectedFarmId === null) {
			setTelemetry(null);
			setError(null);
			return;
		}
		setLoading(true);
		setError(null);
		getTelemetry()
			.then(setTelemetry)
			.catch(() =>
				setError("Não foi possível carregar os dados de telemetria."),
			)
			.finally(() => setLoading(false));
	}, [selectedFarmId]);

	return (
		<TelemetryContext.Provider value={{ telemetry, loading, error }}>
			{children}
		</TelemetryContext.Provider>
	);
};

export const useTelemetry = (): TelemetryContextValue => {
	const ctx = useContext(TelemetryContext);
	if (!ctx)
		throw new Error("useTelemetry must be used inside TelemetryProvider");
	return ctx;
};
