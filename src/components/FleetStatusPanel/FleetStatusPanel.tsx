import { useFleetStatus } from "../../context/FleetStatusContext";
import { getDeviceColor } from "../../utils/deviceColors";
import styles from "./FleetStatusPanel.module.css";

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

const SkeletonItem = () => (
	<div className={styles.item}>
		<div className={`${styles.skeletonBox} ${styles.skeletonIcon}`} />
		<div className={styles.itemInfo}>
			<div className={`${styles.skeletonBox} ${styles.skeletonTextLg}`} />
			<div className={`${styles.skeletonBox} ${styles.skeletonTextSm}`} />
		</div>
	</div>
);

export const FleetStatusPanel = () => {
	const { fleetStatus, loading, error } = useFleetStatus();

	return (
		<div className={styles.panel}>
			<div className={styles.header}>
				<span className={styles.headerTitle}>Status da Frota</span>
				<FilterIcon />
			</div>

			<div className={styles.list}>
				{error ? (
					<p className={styles.errorText}>{error}</p>
				) : loading ? (
					<>
						<SkeletonItem />
						<SkeletonItem />
						<SkeletonItem />
					</>
				) : (
					fleetStatus.map((device, index) => {
						const isStopped = device.status_label
							.toLowerCase()
							.includes("parado");
						const color = getDeviceColor(index);
						return (
							<div
								key={device.device_id}
								className={`${styles.item} ${isStopped ? styles.itemStopped : ""}`}
							>
								{isStopped && <div className={styles.alertBar} />}
								<div
									className={styles.iconWrapper}
									style={{ backgroundColor: `${color}1a`, color }}
								>
									<TractorIcon />
								</div>
								<div className={styles.itemInfo}>
									<span className={styles.itemId}>{device.name}</span>
									<span className={styles.itemStatus}>
										<span
											className={styles.statusDot}
											style={{ backgroundColor: color }}
										/>
										{device.status_label}
									</span>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
