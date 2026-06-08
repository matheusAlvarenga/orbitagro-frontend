import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { FormField } from "../../components/FormField/FormField";
import { useFarms } from "../../context/FarmsContext";
import { useFleet } from "../../context/FleetContext";
import { useToast } from "../../context/ToastContext";
import styles from "./CreateFleetPage.module.css";

const ChevronIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="12"
		height="8"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<polyline points="6 9 12 15 18 9" />
	</svg>
);

export const CreateFleetPage = () => {
	const { farms } = useFarms();
	const { addDevice } = useFleet();
	const { showToast } = useToast();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [farmId, setFarmId] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !farmId) return;
		setSubmitting(true);
		try {
			await addDevice({ name: name.trim(), farm_id: farmId, status: "Ativo" });
			showToast("Rastreador adicionado com sucesso!");
			navigate("/fleet");
		} catch {
			showToast("Erro ao adicionar rastreador. Tente novamente.", "error");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<DashboardLayout title="Minha Frota">
			<div className={styles.page}>
				<div className={styles.pageHeader}>
					<h1 className={styles.title}>Novo Rastreador</h1>
					<p className={styles.subtitle}>
						Preencha as informações básicas para começar o monitoramento via
						satélite.
					</p>
				</div>

				<form className={styles.card} onSubmit={handleSubmit}>
					<div className={styles.formGrid}>
						<div className={styles.fullWidth}>
							<FormField
								id="name"
								label="Nome do Rastreador"
								type="text"
								placeholder="Ex: Trator JD-8R 370"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className={styles.fullWidth}>
							<label htmlFor="farmId" className={styles.selectLabel}>
								Fazenda
							</label>
							<div className={styles.selectWrapper}>
								<select
									id="farmId"
									className={`${styles.select} ${!farmId ? styles.selectEmpty : ""}`}
									value={farmId}
									onChange={(e) => setFarmId(e.target.value)}
								>
									<option value="" disabled>
										Selecione uma fazenda
									</option>
									{farms.map((farm) => (
										<option key={farm._id} value={String(farm._id)}>
											{farm.name}
										</option>
									))}
								</select>
								<span className={styles.selectChevron} aria-hidden="true">
									<ChevronIcon />
								</span>
							</div>
						</div>
					</div>

					<div className={styles.actions}>
						<button
							type="button"
							className={styles.cancelButton}
							onClick={() => navigate("/fleet")}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className={styles.saveButton}
							disabled={submitting}
						>
							{submitting ? "Salvando..." : "Salvar e Continuar"}
						</button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
};
