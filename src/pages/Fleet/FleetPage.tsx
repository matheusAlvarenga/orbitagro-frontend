import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteModal } from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { useFleet } from "../../context/FleetContext";
import { useToast } from "../../context/ToastContext";
import type { FleetDevice } from "../../data/fleetData";
import styles from "./FleetPage.module.css";

const DeviceIcon = () => (
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
		<circle cx="12" cy="12" r="3" />
		<path d="M6.3 6.3a8 8 0 0 0 0 11.4" />
		<path d="M17.7 6.3a8 8 0 0 1 0 11.4" />
		<path d="M9.2 9.2a4 4 0 0 0 0 5.6" />
		<path d="M14.8 9.2a4 4 0 0 1 0 5.6" />
	</svg>
);

const TrashIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
		<path d="M10 11v6M14 11v6" />
		<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
	</svg>
);

const PlusIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);

function getStatusClass(status: string): string {
	const s = status.toLowerCase();
	if (s.includes("ativo") || s.includes("opera")) return styles.statusAtivo;
	if (s.includes("nsito")) return styles.statusEmTransito;
	if (s.includes("manut")) return styles.statusManutencao;
	return styles.statusOffline;
}

const StatusBadge = ({ status }: { status: string }) => (
	<div className={`${styles.statusBadge} ${getStatusClass(status)}`}>
		<span className={styles.statusDot} aria-hidden="true" />
		{status}
	</div>
);

const SkeletonRows = () => (
	<>
		{[1, 2, 3].map((n) => (
			<div key={n} className={styles.tableRow}>
				<div className={styles.assetCell}>
					<div className={`${styles.skeletonBox} ${styles.skeletonIcon}`} />
					<div className={styles.deviceInfo}>
						<div className={`${styles.skeletonBox} ${styles.skeletonTextLg}`} />
						<div className={`${styles.skeletonBox} ${styles.skeletonTextSm}`} />
					</div>
				</div>
				<div className={`${styles.skeletonBox} ${styles.skeletonTextMd}`} />
				<div className={`${styles.skeletonBox} ${styles.skeletonStatus}`} />
				<div className={`${styles.skeletonBox} ${styles.skeletonBtn}`} />
			</div>
		))}
	</>
);

export const FleetPage = () => {
	const { fleet, loading, error, removeDevice } = useFleet();
	const { showToast } = useToast();
	const [deviceToDelete, setDeviceToDelete] = useState<FleetDevice | null>(
		null,
	);
	const [deleting, setDeleting] = useState(false);
	const navigate = useNavigate();

	const handleConfirmDelete = async () => {
		if (!deviceToDelete) return;
		setDeleting(true);
		try {
			await removeDevice(deviceToDelete._id);
			showToast(`${deviceToDelete.name} removido.`);
			setDeviceToDelete(null);
		} catch {
			showToast("Erro ao remover rastreador. Tente novamente.", "error");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<>
			<DashboardLayout title="Minha Frota">
				<div className={styles.page}>
					<div className={styles.pageHeader}>
						<div>
							<h1 className={styles.title}>Minha Frota</h1>
							<p className={styles.subtitle}>Monitore e gerencie sua frota.</p>
						</div>
						<button
							type="button"
							className={styles.addButton}
							onClick={() => navigate("/fleet/create")}
						>
							<PlusIcon />
							Adicionar Rastreador
						</button>
					</div>

					<div className={styles.tableCard}>
						<div className={styles.tableHeader}>
							<span className={styles.colAsset}>Nome do Ativo</span>
							<span className={styles.colFarm}>Fazenda</span>
							<span className={styles.colStatus}>Status</span>
							<span className={styles.colActions}>Ações</span>
						</div>

						<div className={styles.tableBody}>
							{error ? (
								<p className={styles.errorRow}>{error}</p>
							) : loading ? (
								<SkeletonRows />
							) : (
								fleet.map((device) => (
									<div key={device._id} className={styles.tableRow}>
										<div className={styles.assetCell}>
											<div className={styles.iconBox}>
												<DeviceIcon />
											</div>
											<div className={styles.deviceInfo}>
												<span className={styles.deviceName}>{device.name}</span>
												<span className={styles.deviceSubId}>
													ID: {device._id}
												</span>
											</div>
										</div>
										<div className={styles.farmCell}>{device.farm_id}</div>
										<div className={styles.statusCell}>
											<StatusBadge status={device.status} />
										</div>
										<div className={styles.actionsCell}>
											<button
												type="button"
												className={styles.deleteButton}
												onClick={() => setDeviceToDelete(device)}
												aria-label={`Remover ${device.name}`}
											>
												<TrashIcon />
											</button>
										</div>
									</div>
								))
							)}
						</div>

						<div className={styles.tableFooter}>
							<span>
								{loading
									? "Carregando rastreadores..."
									: `Mostrando ${fleet.length} ${fleet.length === 1 ? "rastreador" : "rastreadores"}`}
							</span>
						</div>
					</div>
				</div>
			</DashboardLayout>

			{deviceToDelete && (
				<ConfirmDeleteModal
					farmName={deviceToDelete.name}
					onConfirm={handleConfirmDelete}
					onCancel={() => setDeviceToDelete(null)}
					loading={deleting}
				/>
			)}
		</>
	);
};
