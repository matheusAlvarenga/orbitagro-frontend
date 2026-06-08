import { createPortal } from "react-dom";
import styles from "./Toast.module.css";

interface Toast {
	id: string;
	message: string;
	type: "success" | "error";
}

const CheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<polyline points="20 6 9 17 4 12" />
	</svg>
);

const ErrorIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
);

export const ToastList = ({ toasts }: { toasts: Toast[] }) => {
	if (toasts.length === 0) return null;

	return createPortal(
		<div className={styles.toastList} aria-live="polite" aria-atomic="false">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					role="status"
					className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`}
				>
					<span
						className={`${styles.icon} ${toast.type === "success" ? styles.iconSuccess : styles.iconError}`}
					>
						{toast.type === "success" ? <CheckIcon /> : <ErrorIcon />}
					</span>
					<span className={styles.message}>{toast.message}</span>
				</div>
			))}
		</div>,
		document.body,
	);
};
