import type { Map as LeafletMap } from "leaflet";
import { useCallback, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
	CircleMarker,
	MapContainer,
	Polygon,
	Polyline,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/DashboardLayout/DashboardLayout";
import { FormField } from "../../components/FormField/FormField";
import { useFarms } from "../../context/FarmsContext";
import { useToast } from "../../context/ToastContext";
import styles from "./CreateFarmPage.module.css";

const InfoIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#0d631b"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="10" />
		<line x1="12" y1="8" x2="12" y2="12" />
		<line x1="12" y1="16" x2="12.01" y2="16" />
	</svg>
);

const PolygonDrawer = ({ onAdd }: { onAdd: (p: [number, number]) => void }) => {
	useMapEvents({
		click: (e) => onAdd([e.latlng.lat, e.latlng.lng]),
	});
	return null;
};

export const CreateFarmPage = () => {
	const { addFarm } = useFarms();
	const { showToast } = useToast();
	const navigate = useNavigate();
	const mapRef = useRef<LeafletMap | null>(null);

	const [name, setName] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [polygon, setPolygon] = useState<
		Array<{ id: string; coords: [number, number] }>
	>([]);

	const handleAddPoint = useCallback((p: [number, number]) => {
		setPolygon((prev) => [...prev, { id: crypto.randomUUID(), coords: p }]);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !city.trim() || !state.trim() || polygon.length < 3)
			return;
		setSubmitting(true);
		try {
			const coordinates: number[][][] = [
				[
					...polygon.map(({ coords: [lat, lng] }) => [lng, lat]),
					[polygon[0].coords[1], polygon[0].coords[0]],
				],
			];
			await addFarm({
				name: name.trim(),
				city: city.trim(),
				state: state.trim(),
				polygon: { type: "Polygon", coordinates },
			});
			showToast("Fazenda criada com sucesso!");
			navigate("/farms");
		} catch {
			showToast("Erro ao criar fazenda. Tente novamente.", "error");
		} finally {
			setSubmitting(false);
		}
	};

	const hintText =
		polygon.length === 0
			? "Clique no mapa para iniciar o desenho do polígono"
			: polygon.length < 3
				? `Adicione mais ${3 - polygon.length} ${3 - polygon.length === 1 ? "ponto" : "pontos"} para fechar`
				: `${polygon.length} pontos definidos`;

	return (
		<DashboardLayout title="Minhas Fazendas">
			<div className={styles.page}>
				<div className={styles.pageHeader}>
					<h1 className={styles.title}>Nova Unidade Produtiva</h1>
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
								label="Nome da Fazenda"
								type="text"
								placeholder="Ex: Fazenda Bela Vista"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<FormField
							id="city"
							label="Cidade"
							type="text"
							placeholder="Ex: Sorriso"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>

						<FormField
							id="state"
							label="Estado"
							type="text"
							placeholder="Ex: MT"
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>

						<div className={styles.fullWidth}>
							<p className={styles.mapLabel}>Delimitação de Área</p>

							<div className={styles.mapPlaceholder}>
								<MapContainer
									ref={mapRef}
									center={[-14, -51]}
									zoom={4}
									zoomControl={false}
									style={{ height: "100%", width: "100%" }}
								>
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									<PolygonDrawer onAdd={handleAddPoint} />
									{polygon.length >= 3 && (
										<Polygon
											positions={polygon.map((p) => p.coords)}
											pathOptions={{
												color: "#0d631b",
												weight: 2,
												fillOpacity: 0.15,
											}}
										/>
									)}
									{polygon.length === 2 && (
										<Polyline
											positions={polygon.map((p) => p.coords)}
											pathOptions={{ color: "#0d631b", weight: 2 }}
										/>
									)}
									{polygon.map((pt) => (
										<CircleMarker
											key={pt.id}
											center={pt.coords}
											radius={4}
											pathOptions={{
												color: "#0d631b",
												fillColor: "#0d631b",
												fillOpacity: 1,
											}}
										/>
									))}
								</MapContainer>

								<div className={styles.mapZoomControls}>
									<button
										type="button"
										className={styles.mapControlBtn}
										aria-label="Aumentar zoom"
										onClick={() => mapRef.current?.zoomIn()}
									>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											aria-hidden="true"
										>
											<line x1="12" y1="5" x2="12" y2="19" />
											<line x1="5" y1="12" x2="19" y2="12" />
										</svg>
									</button>
									<div className={styles.mapControlDivider} />
									<button
										type="button"
										className={styles.mapControlBtn}
										aria-label="Diminuir zoom"
										onClick={() => mapRef.current?.zoomOut()}
									>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											aria-hidden="true"
										>
											<line x1="5" y1="12" x2="19" y2="12" />
										</svg>
									</button>
								</div>

								<div className={styles.mapDrawingTools}>
									<button
										type="button"
										className={`${styles.mapToolBtn} ${styles.mapToolActive}`}
										aria-label="Polígono"
									>
										<svg
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
											<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
										</svg>
									</button>
									<button
										type="button"
										className={styles.mapToolBtn}
										aria-label="Apagar pontos"
										onClick={() => {
											setPolygon([]);
										}}
									>
										<svg
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
											<path d="M20 20H7L3 16l9-9 8 8-2.5 2.5" />
											<path d="M6.5 17.5l5-5" />
										</svg>
									</button>
								</div>

								<div className={styles.mapHint}>
									<span className={styles.mapHintDot} />
									{hintText}
								</div>
							</div>
						</div>

						<div className={styles.fullWidth}>
							<div className={styles.infoChip}>
								<InfoIcon />
								<div>
									<p className={styles.infoTitle}>Configuração de Perímetro</p>
									<p className={styles.infoText}>
										Utilize a ferramenta de desenho para marcar os limites
										exatos da sua unidade produtiva diretamente no mapa
										satelital.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.actions}>
						<button
							type="button"
							className={styles.cancelButton}
							onClick={() => navigate("/farms")}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className={styles.saveButton}
							disabled={submitting || polygon.length < 3}
						>
							{submitting ? "Salvando..." : "Salvar e Continuar"}
						</button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
};
