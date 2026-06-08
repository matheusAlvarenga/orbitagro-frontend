import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ConfirmDeleteModal.module.css";

interface ConfirmDeleteModalProps {
	farmName: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const WarningIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="30"
		height="26"
		viewBox="0 0 30 26"
		fill="none"
		aria-hidden="true"
	>
		<path
			d="M12.572 2.002a2.833 2.833 0 0 1 4.856 0l11.24 19.5A2.833 2.833 0 0 1 26.24 26H3.76a2.833 2.833 0 0 1-2.428-4.498L12.572 2.002z"
			fill="#ba1a1a"
		/>
		<path
			d="M15 10v5M15 18.5v.5"
			stroke="#ffffff"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

export const ConfirmDeleteModal = ({
	farmName,
	onConfirm,
	onCancel,
}: ConfirmDeleteModalProps) => {
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onCancel();
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [onCancel]);

	return createPortal(
		<div className={styles.backdrop} onClick={onCancel} aria-hidden="true">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="confirm-delete-title"
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<div className={styles.iconRow}>
					<WarningIcon />
				</div>
				<h2 id="confirm-delete-title" className={styles.heading}>
					Excluir Propriedade?
				</h2>
				<p className={styles.body}>
					Tem certeza que deseja excluir a <strong>{farmName}</strong>? Esta
					ação não pode ser desfeita e todos os dados de monitoramento serão
					perdidos.
				</p>
				<div className={styles.actions}>
					<button
						type="button"
						className={styles.cancelButton}
						onClick={onCancel}
					>
						Cancelar
					</button>
					<button
						type="button"
						className={styles.deleteButton}
						onClick={onConfirm}
					>
						Excluir
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
};
