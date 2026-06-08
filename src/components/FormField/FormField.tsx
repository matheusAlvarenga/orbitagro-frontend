import type { ReactNode } from "react";
import styles from "./FormField.module.css";

interface FormFieldProps {
	id: string;
	label: string;
	type: string;
	placeholder: string;
	icon: ReactNode;
}

export const FormField = ({
	id,
	label,
	type,
	placeholder,
	icon,
}: FormFieldProps) => {
	return (
		<div className={styles.field}>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<div className={styles.inputWrapper}>
				<span className={styles.icon}>{icon}</span>
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					className={styles.input}
				/>
			</div>
		</div>
	);
};
