import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { PredictiveAIBanner } from "../../components/PredictiveAIBanner/PredictiveAIBanner";
import { RainChart } from "../../components/RainChart/RainChart";
import { TelemetryCard } from "../../components/TelemetryCard/TelemetryCard";
import { TemperatureChart } from "../../components/TemperatureChart/TemperatureChart";
import { useDashboard } from "../../context/DashboardContext";
import { useFarm } from "../../context/FarmContext";
import { useTelemetry } from "../../context/TelemetryContext";
import {
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
	const {
		telemetry,
		loading: telemetryLoading,
		error: telemetryError,
	} = useTelemetry();
	const {
		dashboard,
		loading: chartsLoading,
		error: chartsError,
	} = useDashboard();

	if (selectedFarmId === null) {
		return (
			<DashboardLayout title="Painel de Controle">
				<EmptyState />
			</DashboardLayout>
		);
	}

	const humidity =
		telemetry != null ? Math.round(telemetry.soil_moisture_pct) : null;
	const soilTemp = telemetry != null ? Math.round(telemetry.soil_temp) : null;
	const airTemp = telemetry != null ? Math.round(telemetry.ambient_temp) : null;
	const luminosity =
		telemetry != null ? Math.round(telemetry.luminosity) : null;

	const predictionMetrics = telemetry
		? {
				humidity: telemetry.soil_moisture_pct,
				soilTemp: telemetry.soil_temp,
				airTemp: telemetry.ambient_temp,
				luminosity: telemetry.luminosity,
				rain: dashboard?.rain ?? [],
				temperature: dashboard?.temperature ?? [],
			}
		: null;

	return (
		<DashboardLayout title="Painel de Controle">
			<div className={styles.page}>
				<div className={styles.telemetryGrid}>
					<TelemetryCard
						label="Umidade do Solo"
						value={
							telemetryLoading
								? "..."
								: telemetryError || humidity === null
									? "--"
									: `${humidity}%`
						}
						color={humidity !== null ? getHumidityColor(humidity) : "#bfcaba"}
						icon={<HumidityIcon />}
					/>
					<TelemetryCard
						label="Temperatura do Solo"
						value={
							telemetryLoading
								? "..."
								: telemetryError || soilTemp === null
									? "--"
									: `${soilTemp}°C`
						}
						color={soilTemp !== null ? getSoilTempColor(soilTemp) : "#bfcaba"}
						icon={<ThermometerIcon />}
					/>
					<TelemetryCard
						label="Temperatura Geral"
						value={
							telemetryLoading
								? "..."
								: telemetryError || airTemp === null
									? "--"
									: `${airTemp}°C`
						}
						color={airTemp !== null ? getAirTempColor(airTemp) : "#bfcaba"}
						icon={<SunIcon />}
					/>
					<TelemetryCard
						label="Luminosidade"
						value={
							telemetryLoading
								? "..."
								: telemetryError || luminosity === null
									? "--"
									: `${luminosity} lux`
						}
						color={
							luminosity !== null ? getLuminosityColor(luminosity) : "#bfcaba"
						}
						icon={<LuxIcon />}
					/>
				</div>

				{predictionMetrics && (
					<PredictiveAIBanner text={generatePrediction(predictionMetrics)} />
				)}

				{dashboard ? (
					<div className={styles.charts}>
						<RainChart data={dashboard.rain} />
						<TemperatureChart data={dashboard.temperature} />
					</div>
				) : chartsLoading ? (
					<div className={styles.charts}>
						<div className={styles.chartSkeleton} />
						<div className={styles.chartSkeleton} />
					</div>
				) : chartsError ? (
					<p className={styles.errorText}>{chartsError}</p>
				) : null}
			</div>
		</DashboardLayout>
	);
};
