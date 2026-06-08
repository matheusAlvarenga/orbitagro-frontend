import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { MonthPoint } from "../../data/farmData";
import styles from "./RainChart.module.css";

interface RainChartProps {
	data: MonthPoint[];
}

export const RainChart = ({ data }: RainChartProps) => {
	const max = Math.max(...data.map((d) => d.value));
	const yMax = Math.ceil(max / 50) * 50;

	return (
		<div className={styles.card}>
			<h3 className={styles.title}>Histórico de Chuvas (Últimos 6 meses)</h3>
			<ResponsiveContainer width="100%" height={232}>
				<BarChart
					data={data}
					margin={{ top: 16, right: 0, left: -24, bottom: 0 }}
					barCategoryGap="28%"
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
						domain={[0, yMax]}
						tickCount={5}
						axisLine={false}
						tickLine={false}
						tick={{
							fill: "#40493d",
							fontFamily: "Work Sans, sans-serif",
							fontSize: 12,
						}}
						tickFormatter={(v) => `${v}mm`}
					/>
					<Tooltip
						formatter={(value: number) => [`${value} mm`, "Chuva"]}
						contentStyle={{
							fontFamily: "Work Sans, sans-serif",
							fontSize: 13,
							borderRadius: 8,
							border: "1px solid #bfcaba",
							boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
						}}
						cursor={{ fill: "rgba(191,202,186,0.12)" }}
					/>
					<Bar dataKey="value" fill="#64a1ff" radius={[3, 3, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
