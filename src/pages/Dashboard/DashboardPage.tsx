import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { PredictiveAIBanner } from "../../components/PredictiveAIBanner/PredictiveAIBanner";
import { RainChart } from "../../components/RainChart/RainChart";
import { TelemetryCard } from "../../components/TelemetryCard/TelemetryCard";
import { TemperatureChart } from "../../components/TemperatureChart/TemperatureChart";
import { useFarm } from "../../context/FarmContext";
import {
	FARM_METRICS,
	generatePrediction,
	getAirTempColor,
	getHumidityColor,
	getLuminosityColor,
	getSoilTempColor,
} from "../../data/farmData";
import styles from "./DashboardPage.module.css";

const HumidityIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="20"
		viewBox="0 0 16 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M8 2C8 2 2 9 2 14a6 6 0 0 0 12 0C14 9 8 2 8 2z" />
	</svg>
);

const ThermometerIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
	</svg>
);

const SunIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="4" />
		<line x1="12" y1="2" x2="12" y2="4" />
		<line x1="12" y1="20" x2="12" y2="22" />
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
		<line x1="2" y1="12" x2="4" y2="12" />
		<line x1="20" y1="12" x2="22" y2="12" />
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	</svg>
);

const LuxIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="19"
		height="19"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="5" />
		<line x1="12" y1="1" x2="12" y2="3" />
		<line x1="12" y1="21" x2="12" y2="23" />
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
		<line x1="1" y1="12" x2="3" y2="12" />
		<line x1="21" y1="12" x2="23" y2="12" />
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	</svg>
);

export const DashboardPage = () => {
	const { selectedFarmId } = useFarm();

	if (selectedFarmId === null) {
		return (
			<DashboardLayout title="Painel de Controle">
				<EmptyState />
			</DashboardLayout>
		);
	}

	const metrics = FARM_METRICS[selectedFarmId];

	return (
		<DashboardLayout title="Painel de Controle">
			<div className={styles.page}>
				<div className={styles.telemetryGrid}>
					<TelemetryCard
						label="Umidade do Solo"
						value={`${metrics.humidity}%`}
						color={getHumidityColor(metrics.humidity)}
						icon={<HumidityIcon />}
					/>
					<TelemetryCard
						label="Temperatura do Solo"
						value={`${metrics.soilTemp}°C`}
						color={getSoilTempColor(metrics.soilTemp)}
						icon={<ThermometerIcon />}
					/>
					<TelemetryCard
						label="Temperatura Geral"
						value={`${metrics.airTemp}°C`}
						color={getAirTempColor(metrics.airTemp)}
						icon={<SunIcon />}
					/>
					<TelemetryCard
						label="Luminosidade"
						value={`${metrics.luminosity} lux`}
						color={getLuminosityColor(metrics.luminosity)}
						icon={<LuxIcon />}
					/>
				</div>

				<PredictiveAIBanner text={generatePrediction(metrics)} />

				<div className={styles.charts}>
					<RainChart data={metrics.rain} />
					<TemperatureChart data={metrics.temperature} />
				</div>
			</div>
		</DashboardLayout>
	);
};
