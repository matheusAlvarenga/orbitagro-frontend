import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
	children: ReactNode;
	type?: "button" | "submit";
	showArrow?: boolean;
	onClick?: () => void;
}

export const Button = ({
	children,
	type = "button",
	showArrow = true,
	onClick,
}: ButtonProps) => {
	return (
		<button type={type} className={styles.button} onClick={onClick}>
			{children}
			{showArrow && (
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
					<path d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			)}
		</button>
	);
};
