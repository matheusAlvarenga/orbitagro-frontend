import styles from "./MapPlaceholder.module.css";

const PinIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6z" />
		<circle cx="12" cy="8" r="2.5" />
	</svg>
);

export const MapPlaceholder = () => {
	return (
		<div className={styles.container}>
			<div className={styles.legend}>
				<span className={styles.legendItem}>
					<span className={styles.dotGreen} />
					Ativo
				</span>
				<span className={styles.legendItem}>
					<span className={styles.dotOrange} />
					Alerta
				</span>
			</div>

			<div className={styles.placeholder}>
				<PinIcon />
				<p className={styles.placeholderText}>Mapa integrado em breve</p>
				<p className={styles.placeholderSub}>
					O polígono da fazenda e o rastreamento de maquinário serão exibidos
					aqui.
				</p>
			</div>

			<div className={styles.controls}>
				<button
					type="button"
					className={styles.controlBtn}
					aria-label="Aproximar"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>
				</button>
				<span className={styles.controlDivider} />
				<button
					type="button"
					className={styles.controlBtn}
					aria-label="Afastar"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="2"
						viewBox="0 0 14 2"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<line x1="0" y1="1" x2="14" y2="1" />
					</svg>
				</button>
				<span className={styles.controlDivider} />
				<button
					type="button"
					className={styles.controlBtn}
					aria-label="Camadas"
				>
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
						<polygon points="12 2 2 7 12 12 22 7 12 2" />
						<polyline points="2 17 12 22 22 17" />
						<polyline points="2 12 12 17 22 12" />
					</svg>
				</button>
			</div>
		</div>
	);
};
