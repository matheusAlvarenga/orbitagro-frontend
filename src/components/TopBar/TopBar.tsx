import { FarmSelector } from "../FarmSelector/FarmSelector";
import styles from "./TopBar.module.css";

interface TopBarProps {
	title: string;
}

export const TopBar = ({ title }: TopBarProps) => {
	return (
		<header className={styles.topbar}>
			<h1 className={styles.title}>{title}</h1>
			<FarmSelector />
		</header>
	);
};
