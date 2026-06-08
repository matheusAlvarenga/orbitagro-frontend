import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteModal } from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { useFarm } from "../../context/FarmContext";
import { useFarms } from "../../context/FarmsContext";
import { useToast } from "../../context/ToastContext";
import type { Farm } from "../../data/farmData";
import styles from "./FarmsPage.module.css";

const FarmRowIcon = () => (
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
		<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
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

const SkeletonRows = () => (
	<>
		{[1, 2, 3].map((n) => (
			<div key={n} className={styles.tableRow}>
				<div className={styles.farmCell}>
					<div className={`${styles.skeletonBox} ${styles.skeletonIcon}`} />
					<div className={styles.farmInfo}>
						<div className={`${styles.skeletonBox} ${styles.skeletonTextLg}`} />
						<div className={`${styles.skeletonBox} ${styles.skeletonTextSm}`} />
					</div>
				</div>
				<div className={`${styles.skeletonBox} ${styles.skeletonTextMd}`} />
				<div className={`${styles.skeletonBox} ${styles.skeletonBtn}`} />
			</div>
		))}
	</>
);

export const FarmsPage = () => {
	const { farms, loading, error, removeFarm } = useFarms();
	const { showToast } = useToast();
	const [farmToDelete, setFarmToDelete] = useState<Farm | null>(null);
	const { selectedFarmId, setSelectedFarmId } = useFarm();
	const navigate = useNavigate();

	const handleConfirmDelete = () => {
		if (farmToDelete) {
			removeFarm(farmToDelete._id);
			if (String(farmToDelete._id) === selectedFarmId) {
				setSelectedFarmId(null);
			}
			showToast(`${farmToDelete.name} removida com sucesso.`);
		}
		setFarmToDelete(null);
	};

	return (
		<>
			<DashboardLayout title="Minhas Fazendas">
				<div className={styles.page}>
					<div className={styles.pageHeader}>
						<div>
							<h1 className={styles.title}>Listagem de Propriedades</h1>
							<p className={styles.subtitle}>
								Monitore e gerencie os detalhes de suas áreas produtivas.
							</p>
						</div>
						<button
							type="button"
							className={styles.addButton}
							onClick={() => navigate("/farms/create")}
						>
							<PlusIcon />
							Adicionar Fazenda
						</button>
					</div>

					<div className={styles.tableCard}>
						<div className={styles.tableHeader}>
							<span className={styles.colName}>Nome da Fazenda</span>
							<span className={styles.colLocation}>Localização</span>
							<span className={styles.colActions}>Ações</span>
						</div>

						<div className={styles.tableBody}>
							{error ? (
								<p className={styles.errorRow}>{error}</p>
							) : loading ? (
								<SkeletonRows />
							) : (
								farms.map((farm) => (
									<div key={farm._id} className={styles.tableRow}>
										<div className={styles.farmCell}>
											<div className={styles.farmIconBox}>
												<FarmRowIcon />
											</div>
											<div className={styles.farmInfo}>
												<span className={styles.farmName}>{farm.name}</span>
												<span className={styles.farmId}>ID: #{farm._id}</span>
											</div>
										</div>
										<div className={styles.locationCell}>
											{farm.city}, {farm.state}
										</div>
										<div className={styles.actionsCell}>
											<button
												type="button"
												className={styles.deleteButton}
												onClick={() => setFarmToDelete(farm)}
												aria-label={`Remover ${farm.name}`}
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
									? "Carregando fazendas..."
									: `Mostrando ${farms.length} ${farms.length === 1 ? "fazenda" : "fazendas"}`}
							</span>
						</div>
					</div>
				</div>
			</DashboardLayout>

			{farmToDelete && (
				<ConfirmDeleteModal
					farmName={farmToDelete.name}
					onConfirm={handleConfirmDelete}
					onCancel={() => setFarmToDelete(null)}
				/>
			)}
		</>
	);
};
