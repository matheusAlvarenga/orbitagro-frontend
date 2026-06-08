import styles from "./PredictiveAIBanner.module.css";

interface PredictiveAIBannerProps {
	text: string;
}

const SparkleIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#f57c00"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
		<path d="M5 3l.8 2.2L8 6l-2.2.8L5 9l-.8-2.2L2 6l2.2-.8z" />
		<path d="M19 13l.8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8z" />
	</svg>
);

export const PredictiveAIBanner = ({ text }: PredictiveAIBannerProps) => {
	return (
		<div className={styles.banner}>
			<div className={styles.accentBar} />
			<div className={styles.iconWrapper}>
				<SparkleIcon />
			</div>
			<div className={styles.content}>
				<span className={styles.title}>Análise Preditiva</span>
				<p className={styles.text}>{text}</p>
			</div>
		</div>
	);
};
