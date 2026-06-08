import styles from "./EmptyState.module.css";

export const EmptyState = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Bem-vindo ao OrbitAgro</h2>
			<p className={styles.subtitle}>
				Para começar a monitorar sua produção e visualizar dados de telemetria,
				por favor selecione uma fazenda no menu superior.
			</p>
		</div>
	);
};
