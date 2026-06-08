export interface MonthPoint {
	month: string;
	value: number;
}

export interface FarmMetrics {
	humidity: number;
	soilTemp: number;
	airTemp: number;
	luminosity: number;
	rain: MonthPoint[];
	temperature: MonthPoint[];
}

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

export const FARM_METRICS: Record<string, FarmMetrics> = {
	"1": {
		humidity: 42,
		soilTemp: 24,
		airTemp: 28,
		luminosity: 850,
		rain: [67, 100, 178, 45, 133, 200].map((v, i) => ({
			month: MONTHS[i],
			value: v,
		})),
		temperature: [18, 21, 25, 23, 27, 26].map((v, i) => ({
			month: MONTHS[i],
			value: v,
		})),
	},
	"2": {
		humidity: 68,
		soilTemp: 22,
		airTemp: 31,
		luminosity: 620,
		rain: [45, 89, 156, 78, 112, 167].map((v, i) => ({
			month: MONTHS[i],
			value: v,
		})),
		temperature: [16, 20, 24, 27, 29, 25].map((v, i) => ({
			month: MONTHS[i],
			value: v,
		})),
	},
	"3": {
		humidity: 31,
		soilTemp: 27,
		airTemp: 36,
		luminosity: 1200,
		rain: [34, 56, 89, 23, 78, 134].map((v, i) => ({
			month: MONTHS[i],
			value: v,
		})),
		temperature: [22, 26, 31, 28, 33, 30].map((v, i) => ({
			month: MONTHS[i],
			value: v,
		})),
	},
};

// --- Color thresholds ---

export const getHumidityColor = (v: number): string =>
	v < 40 ? "#b31c0f" : v < 60 ? "#f57c00" : "#0d631b";

export const getSoilTempColor = (v: number): string =>
	v > 35 ? "#b31c0f" : v < 10 ? "#005db7" : "#0d631b";

export const getAirTempColor = (v: number): string =>
	v > 35 ? "#b31c0f" : v > 30 ? "#f57c00" : "#0d631b";

export const getLuminosityColor = (v: number): string =>
	v > 1000 ? "#b31c0f" : v > 800 ? "#f57c00" : "#0d631b";

// --- Predictive AI text ---

export const generatePrediction = (m: FarmMetrics): string => {
	if (m.humidity < 40) {
		return `Cruzando a baixa umidade atual do solo (${m.humidity}%) com a previsão de estiagem para os próximos 15 dias, recomenda-se acionar o sistema de irrigação do Setor Sul imediatamente.`;
	}
	if (m.airTemp > 35) {
		return `Temperatura do ar acima do limite crítico (${m.airTemp}°C). Recomenda-se aumentar a irrigação e verificar o sombreamento das culturas sensíveis ao calor.`;
	}
	if (m.luminosity > 1000) {
		return `Alta luminosidade detectada (${m.luminosity} lux). Considere proteger as mudas jovens e ajustar os horários de irrigação para o período mais fresco do dia.`;
	}
	return `Condições gerais favoráveis. Umidade ${m.humidity}%, temperatura ${m.airTemp}°C. Continue monitorando os indicadores para otimização da produção.`;
};
