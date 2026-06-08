import styles from "./FleetStatusPanel.module.css";

type FleetStatus = "operating" | "stopped";

interface FleetItem {
	id: string;
	label: string;
	status: FleetStatus;
}

const FLEET: FleetItem[] = [
	{ id: "TRC-101", label: "TRC-101", status: "operating" },
	{ id: "TRC-102", label: "TRC-102", status: "operating" },
	{ id: "TRC-103", label: "TRC-103", status: "stopped" },
];

const TractorIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M3 4h9l1 7H3z" />
		<circle cx="6" cy="17" r="3" />
		<circle cx="16" cy="18" r="2" />
		<path d="M13 11V6l4 1 2 4h-6z" />
	</svg>
);

const FilterIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="12"
		viewBox="0 0 18 12"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		aria-hidden="true"
	>
		<line x1="0" y1="1" x2="18" y2="1" />
		<line x1="3" y1="6" x2="15" y2="6" />
		<line x1="6" y1="11" x2="12" y2="11" />
	</svg>
);

const STATUS_LABELS: Record<FleetStatus, string> = {
	operating: "Em operação",
	stopped: "Parado",
};

export const FleetStatusPanel = () => {
	return (
		<div className={styles.panel}>
			<div className={styles.header}>
				<span className={styles.headerTitle}>Status da Frota</span>
				<FilterIcon />
			</div>

			<div className={styles.list}>
				{FLEET.map((item) => (
					<div
						key={item.id}
						className={`${styles.item} ${item.status === "stopped" ? styles.itemStopped : ""}`}
					>
						{item.status === "stopped" && <div className={styles.alertBar} />}
						<div
							className={`${styles.iconWrapper} ${item.status === "stopped" ? styles.iconWrapperStopped : styles.iconWrapperOperating}`}
						>
							<TractorIcon />
						</div>
						<div className={styles.itemInfo}>
							<span className={styles.itemId}>{item.label}</span>
							<span className={styles.itemStatus}>
								<span
									className={`${styles.statusDot} ${item.status === "stopped" ? styles.statusDotStopped : styles.statusDotOperating}`}
								/>
								{STATUS_LABELS[item.status]}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
