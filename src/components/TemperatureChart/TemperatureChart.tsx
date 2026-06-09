import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { MonthPoint } from "../../data/farmData";
import styles from "./TemperatureChart.module.css";

interface TemperatureChartProps {
	data: MonthPoint[];
}

export const TemperatureChart = ({ data }: TemperatureChartProps) => {
	const values = data.map((d) => d.value);
	const min = Math.floor(Math.min(...values) / 5) * 5;
	const max = Math.ceil(Math.max(...values) / 5) * 5;

	return (
		<div className={styles.card}>
			<h3 className={styles.title}>Variação de Temperatura Semanal</h3>
			<ResponsiveContainer width="100%" height={232}>
				<LineChart
					data={data}
					margin={{ top: 16, right: 8, left: -24, bottom: 0 }}
				>
					<CartesianGrid
						stroke="rgba(191,202,186,0.3)"
						horizontal
						vertical={false}
					/>
					<XAxis
						dataKey="month"
						axisLine={false}
						tickLine={false}
						tick={{
							fill: "#40493d",
							fontFamily: "Work Sans, sans-serif",
							fontSize: 14,
						}}
						dy={8}
					/>
					<YAxis
						domain={[min, max]}
						tickCount={5}
						axisLine={false}
						tickLine={false}
						tick={{
							fill: "#40493d",
							fontFamily: "Work Sans, sans-serif",
							fontSize: 12,
						}}
						tickFormatter={(v) => `${v}°`}
					/>
					<Tooltip
						formatter={(value) => [`${value}°C`, "Temperatura"]}
						contentStyle={{
							fontFamily: "Work Sans, sans-serif",
							fontSize: 13,
							borderRadius: 8,
							border: "1px solid #bfcaba",
							boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
						}}
						cursor={{ stroke: "rgba(191,202,186,0.4)" }}
					/>
					<Line
						type="linear"
						dataKey="value"
						stroke="#2e7d32"
						strokeWidth={2.5}
						dot={{ fill: "#2e7d32", r: 3, strokeWidth: 0 }}
						activeDot={{ r: 5, fill: "#2e7d32" }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
