import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { FleetStatusPanel } from "../../components/FleetStatusPanel/FleetStatusPanel";
import { MapPlaceholder } from "../../components/MapPlaceholder/MapPlaceholder";
import { useFarm } from "../../context/FarmContext";
import styles from "./MapPage.module.css";

export const MapPage = () => {
	const { selectedFarmId } = useFarm();

	return (
		<DashboardLayout title="Mapa das Fazendas">
			{selectedFarmId === null ? (
				<EmptyState />
			) : (
				<div className={styles.page}>
					<header className={styles.pageHeader}>
						<h2 className={styles.pageTitle}>
							Rastreamento de Maquinário (Satélite)
						</h2>
						<p className={styles.pageSubtitle}>
							Monitoramento em tempo real das operações de campo e status da
							frota conectada.
						</p>
					</header>

					<div className={styles.body}>
						<MapPlaceholder />
						<FleetStatusPanel />
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};
