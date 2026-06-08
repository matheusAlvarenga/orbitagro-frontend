import type { ReactNode } from "react";
import styles from "./TelemetryCard.module.css";

interface TelemetryCardProps {
	label: string;
	value: string;
	color: string;
	icon: ReactNode;
}

export const TelemetryCard = ({
	label,
	value,
	color,
	icon,
}: TelemetryCardProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.icon}>{icon}</span>
				<span className={styles.label}>{label}</span>
			</div>
			<span className={styles.value} style={{ color }}>
				{value}
			</span>
		</div>
	);
};
